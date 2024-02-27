import EventEmitter from "events";
import { processListings } from "../controllers/processListings";

const eventEmitter = new EventEmitter();

eventEmitter.on('there is a new event', () => processListings());


export default eventEmitter;