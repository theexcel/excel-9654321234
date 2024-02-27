import express from "express";
import expressBunyanLogger from 'express-bunyan-logger'
import "reflect-metadata"
import dbConfig from "./src/database configuration/dbconfig";
import { createConnection } from "typeorm"
import job from "./src/scheduler/scheduler";
import logger from "./bunyanlogger";
import mysql from 'mysql2/promise';

// const logger = bunyan.createLogger({ name: 'application-logger' });

const app = express();
const port = process.env.PORT || 8001;

app.use(expressBunyanLogger({
    name: 'express',
    logger: logger,
    excludes: ['req', 'res', 'req-headers', 'res-headers', 'user-agent', 'body', 'short-body', 'incoming', 'response-hrtime']
}));

const connectDb = dbConfig.initialize();


connectDb.then( async () => {
    logger.info(`connected to MySQL database`)
    job.start()
}).catch(error => {
    logger.error('Database connection error:', error)
})

app.listen(port, () => {
  logger.info(`server is running on port ${port}`);
});
