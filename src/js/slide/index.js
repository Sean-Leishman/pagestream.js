import { EventEmitter } from "../common/eventEmitter";
import { events } from "../common/events";
import { addButtonHandler } from "./button";

EventEmitter.on(events.bindEvents, bindEvents);

function bindEvents() {
  addButtonHandler();
}
