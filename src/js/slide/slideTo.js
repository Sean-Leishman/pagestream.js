import * as utils from "../common/utils";

let container = document.getElementById("pagestream");

function performSlide(v) {
  let translate = "translate3d(" + -Math.round(v.horizontal) + "px, 0px, 0px)";

  utils.addAnimation(container);
  utils.css(container, utils.getTransforms(translate));
}

function getMovementVector(origin, dest) {
  return {
    horizontal: origin.clientWidth,
    //direction: dest.slideIdx > origin.slideIdx ? 1 : -1,
  };
}

export function slidePage(destination_slide) {
  let dest_el = destination_slide.item;

  let v = getMovementVector(dest_el);
  performSlide(v);
}
