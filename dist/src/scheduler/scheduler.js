"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const fetchAndProcessEvents_1 = require("../controllers/fetchAndProcessEvents");
const fetchAndProcessEvents_2 = require("../controllers/fetchAndProcessEvents");
const bunyanlogger_1 = __importDefault(require("../../bunyanlogger"));
const job = node_cron_1.default.schedule("* * * * *", async () => {
    try {
        let continuation = null;
        const currentTime = new Date();
        const endTimestamp = Math.floor(currentTime.getTime() / 1000);
        const startTimestamp = endTimestamp - 60;
        do {
            const { events, nextContinuation } = await (0, fetchAndProcessEvents_1.fetchEvents)(startTimestamp, endTimestamp, continuation);
            await (0, fetchAndProcessEvents_2.processEvents)(events);
            continuation = nextContinuation;
        } while (continuation);
    }
    catch (error) {
        bunyanlogger_1.default.error("Error fetching events", error);
    }
});
exports.default = job;
