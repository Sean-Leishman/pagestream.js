import * as utils from "../common/utils.js";

let container = document.getElementById("pagestream");

// Perform vertical movement by v
function performScroll(v) {
  let translate = "translate3d(0px, " + -Math.round(v.dtop) + "px, " + "0px";

  utils.addAnimation(container);
  utils.css(container, utils.getTransforms(translate));
}

function getOffset(section) {
  return {
    dtop: section.offsetTop,
  };
}

export function scrollPage(destination_section) {
  console.log("scroll triggered");

  let dest_el = destination_section.item;

  let v = getOffset(dest_el);
  performScroll(v);
}
