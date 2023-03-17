// INFO about this file in https://github.com/timarney/react-app-rewired
/* eslint @typescript-eslint/no-var-requires: "off" */
const {
  override,
  addWebpackResolve
} = require("customize-cra");

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: override(
    addWebpackResolve({
      fallback: {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
      }
    }))
};
