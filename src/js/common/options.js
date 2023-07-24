const options = {
  autoScroll: true,
};

export function getOptions() {
  return options;
}

export function setOptions(props) {
  Object.assign(options, props);
}
