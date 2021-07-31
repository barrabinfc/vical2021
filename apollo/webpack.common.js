const path = require("path");
const { ESBuildMinifyPlugin } = require("esbuild-loader");

module.exports = {
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "esbuild-loader",
      },
      {
        test: /\.ts$/,
        loader: "esbuild-loader",
        options: {
          loader: "ts",
        },
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
    ],
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: "es2015",
      }),
    ],
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
};
