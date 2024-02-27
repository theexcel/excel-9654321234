import axios from "axios";
import { getRepository } from "typeorm";
import { FetchEventsResponse, Event } from "../types/types";
import { Activity } from "../entities/Activity";
import eventEmitter from "../emitter/events";
import logger from "../../bunyanlogger";
import dbConfig from "../database configuration/dbconfig";

export async function fetchEvents(
  startTimestamp: number,
  endTimestamp: number,
  continuation: string | null = null
): Promise<FetchEventsResponse> {
  try {
    let apiUrl = `https://api.reservoir.tools/events/asks/v3?limit=1000&startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}`;
    if (continuation) {
      apiUrl += `&continuation=${continuation}`;
    }
    const response = await axios.get(apiUrl);

    const { events, continuation: nextContinuation } = response.data;
    return { events, nextContinuation };
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function processEvents(events: Event[]): Promise<void> {
  const activityRepository = dbConfig.getRepository(Activity);

  const newOrderEvents = events.filter(
    (event) => event.event.kind === "new-order"
  );

  const activityEntities = newOrderEvents.map((event) => {
    const {
      order,
      event: { kind, createdAt },
    } = event;
    const {
      contract,
      criteria: {
        data: {
          token: { tokenId },
        },
      },
      price: {
        amount: { native },
      },
      maker,
      validFrom,
      validTo,
    } = order;

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

    eventEmitter.emit("there is a new event");
  } catch (error) {
    logger.error("Error saving activity entities:", error);
    throw error;
  }
}
