import "../css/style.css";
import "./scroll";
import "./slide";

import "./state";
import { EventEmitter } from "./common/eventEmitter";
import { events } from "./common/events";

function main() {
  window.scrollTo(0, 0);

  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }

  EventEmitter.emit(events.initialise);
  EventEmitter.emit(events.bindEvents);
}

main();

// const nextButtons = document.querySelectorAll(".next");
// const previousButtons = document.querySelectorAll(".previous");
// const sections = document.querySelectorAll("#pagestream .section");

// console.log(sections);

// for (let [idx, previousButton] of previousButtons.entries()) {
//   if (idx > 0) {
//     previousButton.setAttribute(
//       "sectionHeight",
//       sections[idx - 1].clientHeight
//     );
//   }
//   previousButton.addEventListener("click", function () {
//     let options = {
//       left: 0,
//       top: -previousButton.getAttribute("sectionHeight"),
//       behavior: "smooth",
//     };
//     //window.scrollBy(options);
//     scrollPage(sections[idx], sections[idx - 1]);
//   });
// }

// for (let [idx, nextButton] of nextButtons.entries()) {
//   if (idx < sections.length - 1) {
//     nextButton.setAttribute("sectionHeight", sections[idx + 1].clientHeight);
//   }
//   nextButton.addEventListener("click", function () {
//     let options = {
//       left: 0,
//       top: nextButton.getAttribute("sectionHeight"),
//       behavior: "smooth",
//     };
//     //window.scrollBy(options);
//     scrollPage(sections[idx], sections[idx + 1]);
//   });
// }
