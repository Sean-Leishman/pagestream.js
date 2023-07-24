import { getState } from "../common/state";
import * as utils from "../common/utils";
import { updateState } from "../state";

export function moveSlideRight() {
  let section = getState().activeSection;
  let currentSlide = section.activeSlide;
  let newSlide = currentSlide.next;

  utils.removeClass(currentSlide.item, "active");
  utils.addClass(newSlide.item, "active");

  updateState();
}

export function moveSlideLeft() {
  let section = getState().activeSection;
  let currentSlide = section.activeSlide;
  let newSlide = currentSlide.prev;

  utils.removeClass(currentSlide.item, "active");
  utils.addClass(newSlide.item, "active");

  updateState();
}
