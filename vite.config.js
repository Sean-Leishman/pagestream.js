const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/js/main.js"),
      name: "folding.js",
      fileName: (format) => `folding.${format}.js`,
    },
  },
});
