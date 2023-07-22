import * as utils from "../common/utils.js";

let container = document.getElementById("pagestream");

// Perform vertical movement by v
function performScroll(v) {
  let translate = "translate3d(0px, " + -Math.round(v.dtop) + "px, " + "0px";

  utils.addAnimation(container);
  utils.css(container, utils.getTransforms(translate));
}

function getOffset(section1, section2) {
  return {
    dtop: section2.offsetTop,
  };
}

export function scrollPage(origin_section, destination_section) {
  let origin_el = origin_section;
  let dest_el = destination_section;

  let v = getOffset(origin_section, destination_section);
  performScroll(v);
}
