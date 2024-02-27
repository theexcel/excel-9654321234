"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const processListings_1 = require("../controllers/processListings");
const eventEmitter = new events_1.default();
eventEmitter.on('there is a new event', () => (0, processListings_1.processListings)());
exports.default = eventEmitter;
