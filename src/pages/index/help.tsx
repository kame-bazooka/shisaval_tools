/**
 * ヘルプページのエントリポイント
 *
 * @author kame-bazooka
 * @license MIT License
 */

// IE11向けポリフィル
import "core-js/stable";
import "react-app-polyfill/ie11";

// 通常のコード
import React from "react";
import ReactDOM from "react-dom";

// ヘルプのレンダリング
import ReactMarkdown from "react-markdown";

// ヘルプファイル
import HelpFile from "../../../readme.md";

ReactDOM.render(
  <ReactMarkdown linkTarget={"_blank"}>
    {HelpFile}
  </ReactMarkdown>,
  document.getElementById("react-application")
);
