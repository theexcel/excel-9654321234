"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processListings = void 0;
const typeorm_1 = require("typeorm");
const dbconfig_1 = __importDefault(require("../database configuration/dbconfig"));
const Token_1 = require("../entities/Token");
const Activity_1 = require("../entities/Activity");
const bunyanlogger_1 = __importDefault(require("../../bunyanlogger"));
const processListings = async () => {
    try {
        const activityRepository = dbconfig_1.default.getRepository(Activity_1.Activity);
        const tokenRepository = dbconfig_1.default.getRepository(Token_1.Token);
        const activities = await activityRepository.find();
        for (const activity of activities) {
            const { contract_address, token_index, listing_to, listing_price } = activity;
            let token = await tokenRepository.findOne({ where: { index: token_index, contract_address } });
            if (!token) {
                token = new Token_1.Token();
                token.index = token_index;
                token.contract_address = contract_address;
                token.current_price = listing_price;
                await tokenRepository.save(token);
            }
            else {
                if (listing_to && listing_to < new Date()) {
                    const activeListings = await activityRepository.count({ where: { contract_address, token_index, listing_to: (0, typeorm_1.MoreThan)(new Date()) } });
                    if (activeListings === 0) {
                        token.current_price = null;
                    }
                }
                else {
                    const lowestPriceActivity = await activityRepository.findOne({ where: { contract_address, token_index }, order: { listing_price: 'ASC' } });
                    if (lowestPriceActivity && lowestPriceActivity.listing_price && lowestPriceActivity.listing_price < token.current_price) {
                        token.current_price = lowestPriceActivity.listing_price;
                    }
                }
                await tokenRepository.save(token);
            }
        }
    }
    catch (error) {
        bunyanlogger_1.default.error('Error processing tokens:', error);
    }
};
exports.processListings = processListings;
