/* eslint-disable */
const path = require("path");
const webpack = require("webpack");

module.exports = (env, options) => {
  return {
    mode: `${options.mode}`,
    target: ["web", "es5"], // Webpackが生成するコードもES5になる
    entry: {
      index: "./src/pages/index/index.tsx", // アプリケーション本体
      help: "./src/pages/index/help.tsx"    // ヘルプページ
    },
    output: {
      // 変換後の出力先
      path: path.resolve(__dirname, "docs"),
      filename: "[name].bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.(tsx?|jsx?)$/, // このルールを適用するファイル
          include: [
            // 変換するソースフォルダ
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "__test__"),
          ],
          use: {
            // TypeScriptを使う
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
            },
          },
        },
        {
          test: /\.md$/i,   // ヘルプのmarkdownを埋めるのに使っている
          use: "raw-loader"
        }
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      fallback: {
        // Webpack5からは明示的に書かないと動かない
        "assert": require.resolve("assert/")
      }
    },
    plugins: [
      // Webpack5からは明示的に書かないと動かない
      new webpack.ProvidePlugin({
        process: "process/browser"
      }),
    ],
    devServer: {
      static: {
        directory: path.resolve(__dirname, "docs")
      },
      host: "local-ip",
      open: "index.htm"
    },
    devtool: options.mode === "production" ? undefined : "inline-source-map" // ブレークポイントを止めるのにいる
  }
};
