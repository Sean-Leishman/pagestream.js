import { getState, setState } from "./common/state";
import { EventEmitter } from "./common/eventEmitter";
import { events } from "./common/events";
import * as utils from "./common/utils";
import { scrollPage } from "./scroll/scrollTo";
import { slidePage } from "./slide/slideTo";

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

  let slides;
  let slideObjs = [];
  let activeSlide;
  // Possibly store old location as a cookie. For now use first container

  for (let [idx, el] of sections.entries()) {
    if (idx == 0) {
      //container.offsetTop === el.offsetTop) {
      isActive = true;
    } else {
      isActive = false;
    }

    slides = el.querySelectorAll(".slide");
    if (slides && slides.length > 0) {
      el.style.width = slides.length * 100 + "%";
      for (let [slideIdx, slide] of slides.entries()) {
        slide.style.width = 100 / slides.length + "%";
        let isActive = utils.hasClass(slide, "active");
        slideObjs.push({
          item: slide,
          index: slideIdx,
          isActive: isActive,
          prev: slideObjs[slideIdx - 1],
        });
        if (slideIdx > 0) {
          slideObjs[slideIdx - 1].next = slideObjs[idx];
        }

        if (isActive) {
          activeSlide = slideObjs[idx];
        }
      }
      if (!activeSlide) {
        activeSlide = slideObjs[0];
        slideObjs[0].isActive = true;
      }
    }

    sectionObjs.push({
      item: el,
      isActive: isActive,
      slides: slideObjs,
      activeSlide: activeSlide,
      prev: sectionObjs[idx - 1],
    });

    if (idx > 0) {
      sectionObjs[idx - 1].next = sectionObjs[idx];
    }

    slideObjs = [];
    activeSlide = null;
  }
  state.activeSection = sectionObjs[0];
  state.currentXScroll = 0;
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

      if (el.activeSlide) {
        el.slides.map((slide) => {
          let isSlideActive = utils.hasClass(slide.item, "active");
          slide.isActive = isSlideActive;

          if (isSlideActive) {
            getState().activeSection.activeSlide = slide;
          }
        });
      }
    }
  });

  getState().canScroll = false;
  scrollToActiveSection();
  scrollToActiveSlide();
}

function scrollToActiveSection() {
  scrollPage(getState().activeSection);
}

function scrollToActiveSlide() {
  if (getState().activeSection.activeSlide) {
    slidePage(getState().activeSection.activeSlide);
  }
}
