"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processEvents = exports.fetchEvents = void 0;
const axios_1 = __importDefault(require("axios"));
const typeorm_1 = require("typeorm");
const Activity_1 = require("../entities/Activity");
const events_1 = __importDefault(require("../emitter/events"));
const bunyanlogger_1 = __importDefault(require("../../bunyanlogger"));
async function fetchEvents(startTimestamp, endTimestamp, continuation = null) {
    try {
        let apiUrl = `https://api.reservoir.tools/events/asks/v3?limit=1000&startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}`;
        if (continuation) {
            apiUrl += `&continuation=${continuation}`;
        }
        const response = await axios_1.default.get(apiUrl);
        const { events, continuation: nextContinuation } = response.data;
        return { events, nextContinuation };
    }
    catch (error) {
        bunyanlogger_1.default.error(error);
        throw error;
    }
}
exports.fetchEvents = fetchEvents;
async function processEvents(events) {
    const activityRepository = (0, typeorm_1.getRepository)(Activity_1.Activity);
    const newOrderEvents = events.filter((event) => event.event.kind === "new-order");
    const activityEntities = newOrderEvents.map((event) => {
        const { order, event: { kind, createdAt }, } = event;
        const { contract, criteria: { data: { token: { tokenId }, }, }, price: { amount: { native }, }, maker, validFrom, validTo, } = order;
        return {
            contract_address: contract,
            token_index: tokenId,
            listing_price: native,
            maker,
            listing_from: new Date(validFrom),
            listing_to: new Date(validTo),
            event_timestamp: new Date(createdAt),
        };
    });
    try {
        await activityRepository.save(activityEntities);
        events_1.default.emit("there is a new event");
    }
    catch (error) {
        bunyanlogger_1.default.error("Error saving activity entities:", error);
        throw error;
    }
}
exports.processEvents = processEvents;
