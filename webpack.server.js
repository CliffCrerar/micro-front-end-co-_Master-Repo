
const path = require("path");

module.exports = function (env) {
  // console.log('env: ', env);
  // const mode = env ? 
  return {
    target: "node",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "server.js",
    },
  };
};
