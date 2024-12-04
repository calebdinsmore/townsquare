const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  configureWebpack: {
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
    ],
  },
  publicPath: "/",
};
