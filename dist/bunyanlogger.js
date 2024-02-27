"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan_1 = __importDefault(require("bunyan"));
function customFormat(record) {
    return `[${record.time.toISOString()}] [${record.level.toUpperCase()}] ${record.msg}`;
}
const logger = bunyan_1.default.createLogger({
    name: 'application-logger',
    streams: [
        {
            level: 'info',
            stream: process.stdout
        }
    ],
    serializers: {
        ...bunyan_1.default.stdSerializers,
        info: customFormat,
        warn: customFormat,
        error: customFormat
    }
});
exports.default = logger;
// logger.info('This is an info message');
// logger.warn('This is a warning message');
// logger.error('This is an error message');
