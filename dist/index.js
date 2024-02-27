"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_bunyan_logger_1 = __importDefault(require("express-bunyan-logger"));
require("reflect-metadata");
const dbconfig_1 = __importDefault(require("./src/database configuration/dbconfig"));
const scheduler_1 = __importDefault(require("./src/scheduler/scheduler"));
const bunyanlogger_1 = __importDefault(require("./bunyanlogger"));
// const logger = bunyan.createLogger({ name: 'application-logger' });
const app = (0, express_1.default)();
const port = process.env.PORT || 8001;
app.use((0, express_bunyan_logger_1.default)({
    name: 'express',
    logger: bunyanlogger_1.default,
    excludes: ['req', 'res', 'req-headers', 'res-headers', 'user-agent', 'body', 'short-body', 'incoming', 'response-hrtime']
}));
const connectDb = dbconfig_1.default.initialize();
connectDb.then(async () => {
    bunyanlogger_1.default.info(`connected to MySQL database`);
    scheduler_1.default.start();
}).catch(error => {
    bunyanlogger_1.default.error('Database connection error:', error);
});
app.listen(port, () => {
    bunyanlogger_1.default.info(`server is running on port ${port}`);
});
