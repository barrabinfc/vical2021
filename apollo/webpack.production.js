const path = require("path");

const cleanWebpackPlugin = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");

const common = require("./webpack.common");

module.exports = merge(common, {
  devtool: "source-map",
  entry: [path.join(__dirname, "src/gcf.ts")],
  output: {
    filename: "gcf.js",
    path: path.resolve(__dirname, "dist"),
  },
  externals: [nodeExternals({})],
  mode: "production",
  plugins: [new cleanWebpackPlugin.CleanWebpackPlugin()],
});
