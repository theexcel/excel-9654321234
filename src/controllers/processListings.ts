import { getConnection, MoreThan, getRepository } from 'typeorm';
import { Token } from '../entities/Token';
import { Activity } from '../entities/Activity';
import logger from '../../bunyanlogger';

const processListings = async (): Promise<void> => {
    try {
        const activityRepository = getRepository(Activity);
        const tokenRepository = getRepository(Token);

        const activities = await activityRepository.find();

        for (const activity of activities) {
            const { contract_address, token_index, listing_to, listing_price } = activity;

            let token = await tokenRepository.findOne({ where: { index: token_index, contract_address } });

            if (!token) {
                token = new Token();
                token.index = token_index;
                token.contract_address = contract_address;
                token.current_price = listing_price;
                await tokenRepository.save(token);
            } else {
                if (listing_to && listing_to < new Date()) {
                    const activeListings = await activityRepository.count({ where: { contract_address, token_index, listing_to: MoreThan(new Date()) } });

                    if (activeListings === 0) {
                        token.current_price = null;
                    }
                } else {
                    const lowestPriceActivity = await activityRepository.findOne({ where: { contract_address, token_index }, order: { listing_price: 'ASC' } });

                    if (lowestPriceActivity && lowestPriceActivity.listing_price && lowestPriceActivity.listing_price < token.current_price!) {
                        token.current_price = lowestPriceActivity.listing_price;
                    }
                }

                await tokenRepository.save(token);
            }
        }
    } catch (error) {
        logger.error('Error processing tokens:', error);
    }
};

export { processListings };
