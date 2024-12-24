import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
import { parse } from 'pg-connection-string'; 
import SpeedometerValues from "../models/speedometer-model";



dotenv.config();


const dbUrl = process.env.DB_URL || '';
const dbConfig = parse(dbUrl); 


const sequelize = new Sequelize({
    database: dbConfig.database as string,
    dialect: "postgres",
    username: dbConfig.user as string,
    password: dbConfig.password as string,
    host: dbConfig.host as string,
    models: [SpeedometerValues],  
    logging: false
});


export const startDb = async (): Promise<void> => {
    try {
        
        await sequelize.authenticate();
        console.log("Database connected successfully.");

        
        await sequelize.sync({ force: false }).then(() => {
            console.log('Database synced!');
        }).catch((error) => {
            console.error('Error syncing database:', error);
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);  
    }
};


export const closeDb = async (): Promise<void> => {
    try {
        await sequelize.close();  
        console.log("Database connection closed.");
    } catch (error) {
        console.error("Error closing the database connection:", error);
    }
};

export default sequelize;