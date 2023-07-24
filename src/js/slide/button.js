import { moveSlideLeft, moveSlideRight } from "./slideHandler";

const nextButtons = document.querySelectorAll(".next");
const prevButtons = document.querySelectorAll(".prev");

export function addButtonHandler() {
  for (let el of nextButtons) {
    el.addEventListener("click", moveSlideRight);
  }

  for (let el of prevButtons) {
    el.addEventListener("click", moveSlideLeft);
  }
}
