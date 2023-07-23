import { getState, setState } from "./common/state";
import { EventEmitter } from "./common/eventEmitter";
import { events } from "./common/events";
import * as utils from "./common/utils";
import { scrollPage } from "./scroll/scrollTo";

let container = document.getElementById("pagestream");
const sections = document.querySelectorAll("#pagestream .section");

EventEmitter.on(events.initialise, initialiseState);
EventEmitter.on(events.bindEvents, bindEvents);

function bindEvents() {
  container.addEventListener("transitionend", function (e) {
    getState().canScroll = true;
    console.log("transition end");
  });
}

function initialiseState() {
  let sectionObjs = [];
  let isActive = false;
  let state = {};

  // Possibly store old location as a cookie. For now use first container

  for (let [idx, el] of sections.entries()) {
    if (idx == 0) {
      //container.offsetTop === el.offsetTop) {
      isActive = true;
    } else {
      isActive = false;
    }

    sectionObjs.push({
      item: el,
      isActive: isActive,
      prev: sectionObjs[idx - 1],
    });

    if (idx > 0) {
      sectionObjs[idx - 1].next = sectionObjs[idx];
    }
  }
  state.activeSection = sectionObjs[0];
  state.sections = sectionObjs;

  setState(state);

  // scrollToActiveSection();
}

export function updateState() {
  getState().activeSection = null;
  getState().sections.map((el) => {
    let isActive = utils.hasClass(el.item, "active");
    getState().isActive = isActive;

    if (isActive) {
      getState().activeSection = el;
    }
  });

  getState().canScroll = false;
  scrollToActiveSection();
}

function scrollToActiveSection() {
  scrollPage(getState().activeSection);
}
