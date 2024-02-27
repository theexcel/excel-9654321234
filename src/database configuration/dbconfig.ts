// import mysql from 'mysql2'
import { DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
import { Activity } from '../entities/Activity';
import { Token } from '../entities/Token';

dotenv.config();

const dbPort: number | undefined = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined;

const dbConfig: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: dbPort,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASENAME as string,
    synchronize: true,
    logging: true,
    entities: [Activity, Token],
    subscribers: [],
    migrations: []
};

export default dbConfig;

