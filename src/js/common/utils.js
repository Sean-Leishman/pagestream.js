export function css(items, props) {
  items = [items];

  var key;
  for (key in props) {
    if (props.hasOwnProperty(key)) {
      if (key !== null) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          item.style[key] = props[key];
        }
      }
    }
  }

  return items;
}

function easing() {
  return function (t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t + 2) + b;
  };
}

export function addAnimation(element) {
  //let transition = "transform " + 500 + "ms ease";
  let transition =
    "transform " + 700 + "ms cubic-bezier(0.915, 0.055, 0.000, 1.005)";

  return css(element, {
    "-webkit-transition": transition,
    transition: transition,
  });
}

export function getTransforms(translate3d) {
  return {
    "-webkit-transform": translate3d,
    "-moz-transform": translate3d,
    "-ms-transform": translate3d,
    transform: translate3d,
  };
}

export function getAverage(list, number) {
  let sum = 0;
  let llist = list.slice(Math.max(list.length - number, 1));

  for (let i of llist) {
    sum += i;
  }
  return sum / llist.length;
}

export function addClass(el, className) {
  el.classList.add(className);
}

export function removeClass(el, className) {
  el.classList.remove(className);
}

export function hasClass(el, className) {
  return el.classList.contains(className);
}
