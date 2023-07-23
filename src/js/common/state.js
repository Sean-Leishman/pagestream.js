export const state = {
  activeSection: null,
  sections: [],
  canScroll: true,
};

export function getState() {
  return state;
}

export function setState(props) {
  Object.assign(state, props);
}
