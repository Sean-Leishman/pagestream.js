import { EventEmitter } from "../common/eventEmitter";
import { events } from "../common/events";
import { addMiddleWheelHandler, addMouseWheelHandler } from "./mouse";

EventEmitter.on(events.bindEvents, bindEvents);

function bindEvents() {
  // document.addEventListener("scroll", scrollHandler);
  addMiddleWheelHandler();
  addMouseWheelHandler();
}
