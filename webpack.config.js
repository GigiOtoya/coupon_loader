const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: {
    "background/background": "./src/background/background.ts",
    "popup/popup": "./src/popup/popup.ts",
    "content/content": "./src/content/content.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/manifest.json" },
        { from: "src/popup/popup.html", to: "popup" },
        { from: "src/styles", to: "styles" },
        { from: "src/images", to: "images" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  mode: "production",
};
