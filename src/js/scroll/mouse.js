import { EventEmitter } from "../common/eventEmitter";
import { events } from "../common/events";
import { getOptions } from "../common/options";
import { state } from "../common/state";
import { moveSectionDown, moveSectionUp } from "./moveSection";
import { getAverage } from "../common/utils";
import { scrollHandler } from "./scrollHandler";

let oldPageY = 0;
let prevTime = 0;
let priorScrolls = [];

function mouseMoveHandler(event) {
  // Check for auto scroll (if so return)
  if (getOptions().autoScroll) {
    return;
  }

  if (state.canScroll) {
    if (event.pageY < oldPageY) {
      moveSectionUp();
    } else if (event.pageY > oldPageY) {
      moveSectionDown();
    }
  }
}

export function addMiddleWheelHandler() {
  window.addEventListener("mousedown", mouseDownHandler);
  window.addEventListener("mouseup", mouseUpHandler);
}

function mouseDownHandler(e) {
  if (e.which == 2) {
    setOldPageY(e.pageY);
    window.addEventListener("mousemove", mouseMoveHandler);
  }
}

function mouseUpHandler(e) {
  if (e.which == 2) {
    window.removeEventListener("mousemove", mouseMoveHandler);
  }
}

export function addMouseWheelHandler() {
  window.addEventListener("wheel", mouseWheelHandler);
}

function mouseWheelHandler(e) {
  let currTime = new Date().getTime();

  e = e || win.event;
  let value = e.wheelDelta || -e.deltaY || -e.detail;
  let delta = Math.max(-1, Math.min(1, value));

  let horizontalDetection =
    typeof e.wheelDeltaX !== "undefined" || typeof e.deltaX !== "undefined";
  let isScrollingVertically =
    Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta) ||
    Math.abs(e.deltaX) < Math.abs(e.deltaY) ||
    !horizontalDetection;
  let direction = delta < 0 ? "down" : delta > 0 ? "up" : "none";

  if (priorScrolls.length > 149) {
    priorScrolls.shift();
  }

  priorScrolls.push(Math.abs(value));

  let timeDiff = currTime - prevTime;
  prevTime = currTime;

  if (timeDiff > 200) {
    priorScrolls = [];
  }

  if (state.canScroll) {
    let avgEnd = getAverage(priorScrolls, 10);
    let avgMiddle = getAverage(priorScrolls, 70);
    let isAccelerating = avgEnd >= avgMiddle;

    if (isAccelerating && isScrollingVertically) {
      scrollHandler(direction);
    }
  }
}

function setOldPageY(pageY) {
  oldPageY = pageY;
}
