import { getState } from "../common/state";
import { updateState } from "../state";
import { scrollPage } from "./scrollTo";
import * as utils from "../common/utils";

export function moveSectionDown() {
  let next = getState().activeSection.next;
  if (!next) {
    return;
  }

  utils.removeClass(getState().activeSection.item, "active");
  utils.addClass(next.item, "active");
  //scrollPage(next);
  updateState();
}

export function moveSectionUp() {
  let prev = getState().activeSection.prev;
  if (!prev) {
    return;
  }

  utils.removeClass(getState().activeSection.item, "active");
  utils.addClass(prev.item, "active");

  updateState();
  //scrollPage(prev);
}
