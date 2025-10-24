// INFO about this file in https://github.com/timarney/react-app-rewired
/* eslint @typescript-eslint/no-var-requires: "off" */
const {
  override,
  addWebpackResolve,
  addWebpackPlugin,
  overrideDevServer
} = require("customize-cra");
const webpack = require("webpack");

const devServerConfig = () => (config) => {
  return {
    ...config,
    open: ["/#/dev"]
  };
};

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: override(
    (config) => {
      config.ignoreWarnings = [
        /Failed to parse source map/,
        /Critical dependency: Accessing import\.meta directly is unsupported \(only property access or destructuring is supported\)/
      ];
      return config;
    },
    addWebpackResolve({
      fallback: {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        path: require.resolve("path-browserify"),
        constants: require.resolve("constants-browserify"),
        fs: require.resolve("browserify-fs"),
        assert: require.resolve("assert"),
        buffer: require.resolve("buffer"),
        vm: require.resolve("vm-browserify")
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
    ),
    (config) => {
      if (config.module) {
        config.module.rules = config.module.rules?.map((rule) => {
          if (!("test" in rule) && "oneOf" in rule) {
            const r = {
              ...rule,
              oneOf: rule.oneOf.map((innerRule) => {
                return "test" in innerRule &&
                  ((typeof innerRule.test === "function" &&
                    innerRule.test(".svg")) ||
                    (innerRule.test[0] &&
                      typeof innerRule.test[0].test === "function" &&
                      innerRule.test[0].test(".svg")))
                  ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    { ...innerRule, exclude: /assets.+\.svg$/ }
                  : innerRule;
              })
            };
            r.oneOf.unshift({
              test: /\.svg$/,
              // use: ["@svgr/webpack"]
              use: [
                {
                  loader: "@svgr/webpack",
                  options: {
                    svgoConfig: {
                      plugins: [
                        {
                          name: "preset-default",
                          params: {
                            overrides: {
                              // disable plugins
                              removeViewBox: false
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            });
            return r;
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return "test" in rule && rule.test.test(".svg")
            ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              { ...rule, exclude: /assets.+\.svg$/ }
            : rule;
        });
      }
      config.plugins = config.plugins?.filter((plugin) => !!plugin);
      return config;
    }
  ),
  devServer: overrideDevServer(devServerConfig())
};
