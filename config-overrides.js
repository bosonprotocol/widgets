// INFO about this file in https://github.com/timarney/react-app-rewired
/* eslint @typescript-eslint/no-var-requires: "off" */
const {
  override,
  addWebpackResolve,
  addWebpackPlugin
} = require("customize-cra");
const webpack = require("webpack");

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: override(
    addWebpackResolve({
      fallback: {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        path: require.resolve("path-browserify"),
        constants: require.resolve("constants-browserify"),
        fs: require.resolve("browserify-fs"),
        assert: require.resolve("assert"),
        buffer: require.resolve("buffer")
      }
    }),
    // Work around for Buffer is undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    addWebpackPlugin(
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"]
      })
      // ),
      // addWebpackPlugin(
      //   new webpack.ProvidePlugin({
      //     process: "process/browser"
      //   })
    )
  )
};
