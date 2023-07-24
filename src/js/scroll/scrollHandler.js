import { getOptions } from "../common/options";
import { getState } from "../common/state";
import { moveSectionUp, moveSectionDown } from "./moveSection";
import * as utils from "../common/utils";

export function scrollHandler(direction) {
  if (getOptions().autoScroll) {
    if (direction === "up") {
      moveSectionUp();
    } else if (direction === "down") {
      moveSectionDown();
    }
  } else {
    let middle_screen_y = utils.getScrollTop() + window.innerHeight / 2;

    let visible_section;

    for (let section of getState().sections) {
      if (section.item.offsetTop <= middle_screen_y) {
        visible_section = section;
      }
    }

    // Scroll to visible section
  }
}
