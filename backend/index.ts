require("dotenv").config();
import express from "express";
import { startDb, closeDb } from "./src/service/db-service";
import cors from "cors";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 5000;
import speedRouter from "./src/router/speedometer-routes";
import publicRouter from "./src/router/public-routes";
import { createValue } from "./src/controllers/speedometer-controller";
import http from "http"
import WebSocket from "ws";

const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
    cors({
        origin: "*", 
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    })
);

//routes
app.use("/api/public", publicRouter);
app.use("/api/speed", speedRouter);

//funtion to generate random speed values instead use a sensor (between 60 and 100)
const emulateSpeedSensor = () => {
    return Math.floor(Math.random() * (100 - 60 + 1)) + 60;
};

const wsserver = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws) => {
    console.log("WebSocket client connected");

    const intervalId = setInterval(async () => {
        const speed = emulateSpeedSensor();
        ws.send(JSON.stringify({ speed }));

        // Save to database
        try {
            await createValue({ body: { value: speed.toString() } } as any, {
                status: () => ({ json: () => {} }),
            } as any)
        } catch (error) {
            console.error("Failed to save speed value:", error);
        }
    }, 1000); //interval to update values

    ws.on("close", () => {
        clearInterval(intervalId);
        console.log("WebSocket client disconnected");
    });
});

//upgrate http request to ws connection for /speedometer
wsserver.on("upgrade", (req, socket, head) => {
    if (req.url === "/speedometer") {
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit("connection", ws, req);
        });
    } else {
        socket.destroy(); // Reject connections to other routes
    }
});

const startServer = async () => {
    try {
        // Start the database connection
        await startDb();

        // Start the server
        const server = wsserver.listen(PORT, () => {
            console.log(`Server started on PORT = ${PORT}`);
        });

        // Graceful shutdown
        process.on("SIGINT", async () => {
            console.log("\nShutting down gracefully...");
            await closeDb(); // Close the database connection
            server.close(() => {
                console.log("Server closed.");
                process.exit(0);
            });
        });

        process.on("SIGTERM", async () => {
            console.log("\nShutting down gracefully...");
            await closeDb(); // Close the database connection
            server.close(() => {
                console.log("Server closed.");
                process.exit(0);
            });
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
        process.exit(1); // Exit with failure
    }
};

startServer();
