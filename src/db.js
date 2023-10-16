import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPort = process.env.DB_PORT;
const dbPass = process.env.DB_PASSWORD;
const dbData = process.env.DB_DATABASE;


export const db = mysql.createConnection({
    
    host: dbHost,
    user: dbUser,
    port: dbPort,
    password: dbPass,
    database: dbData
    
})
