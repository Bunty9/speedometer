## Speedometer Sensor ⏲️ Application 

A real-time speedometer simulation application that streams random speed data via WebSockets, stores it in a PostgreSQL database, and displays it on the frontend.
- Real-Time Data Streaming: Simulated speed data generated every second for multiple sensors.
- WebSocket Integration: Broadcasts live speed data to connected clients over WebSocket.
- Database Storage: Stores all generated speed data in a PostgreSQL database.
- REST API: Provides endpoints for retrieving and managing stored speed data.
- Data Retention: Automatically deletes stale data older than 3 days.
- Frontend Integration: Visualizes real-time speed updates on a speedometer UI.
- Dockerized Deployment: Fully containerized application for easy setup and deployment.


## Start Your Server 🚀

Follow these steps to set up and explore the Speedometer Application:

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/Bunty9/speedometer.git
    ```

    Clone the repository to your local machine using the provided repository URL.

2. **Launch Application in Docker**:

    ```bash
    docker-compose up --build
    ```

    Start the frontend and backend server. Run this command within the main `speedometer` directory. The server will be live at the specified port.

## Directory Structure

```bash
speedometer
│
├── frontend
│   ├── public
│   │   ├── index.html                  # HTML entry point
│   ├── src
│   │   ├── components
│   │   │   ├── Header.tsx                   # Header component 
│   │   │   ├── HistorialDataGrid.tsx      # History page component for displaying historical data (data grid Material UI)
│   │   ├── pages
│   │   │   ├── HistoryPage.tsx             # Data History Page
│   │   │   ├── HomePage.tsx             # Home Page Speedometer gauge component (Material UI)
│   │   ├── App.tsx                             # Main React component 
│   │   ├── routes-config.tsx                # React Router for handling routing
│   │   ├── main.tsx                             # Entry point for React app
│   ├── .env                                  # Environment variables (e.g., BACKEND_URL)
│   ├── Dockerfile                       # Docker configration for frontend
│   └── package.json                  # Frontend dependencies and scripts
│
├── backend
│   ├── index.ts                                         # Express server setup
│   ├── src
│   │   ├── controllers
│   │   │   ├── speedometer-controller.ts        # Controller handling speedometer-related API routes
│   │   ├── router
│   │   │   ├── public-routes.ts                        # Routes for public API endpoints for testing
│   │   │   ├── speedometer-routes.ts            # Routes for speedometer-related API endpoints
│   │   ├── models
│   │   │   ├── speedometer-model.ts             # PostgreSQL model for speed data
│   │   ├── service
│   │   │   ├── db-service.ts                               # PostgreSQL db connection handler
│   ├── test
│   │   ├── socket-test.js              # WebSocket test script for testing
│   ├── .env                                    # Backend environment variables (DB_URL)
│   ├── Dockerfile                          # Backend Docker configration
│   └── package.json                  # Backend dependencies and scripts
│
└── docker-compose.yaml
```

## MIT License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


[![https://github.com/Bunty9](https://img.shields.io/badge/Made%20With%20❤️%20By-Bunty9-red)](https://github.com/Bunty9)