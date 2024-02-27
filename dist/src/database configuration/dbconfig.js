"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import mysql from 'mysql2'
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const Activity_1 = require("../entities/Activity");
const Token_1 = require("../entities/Token");
dotenv_1.default.config();
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined;
const dbConfig = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: dbPort,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASENAME,
    synchronize: true,
    logging: true,
    entities: [Activity_1.Activity, Token_1.Token],
    subscribers: [],
    migrations: []
});
exports.default = dbConfig;
