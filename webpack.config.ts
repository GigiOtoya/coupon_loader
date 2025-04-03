import path from "path";
import webpack from "webpack";

const config: webpack.Configuration = {
  entry: {
    background: "./src/background/background.ts",
    popup: "./src/popup/popup.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
