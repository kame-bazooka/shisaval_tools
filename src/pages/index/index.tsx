/**
 * このアプリケーションのエントリポイント
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

import { Grid } from "@material-ui/core";

// 画面部品
import Header from "./parts/header";
import Body from "../battleSetup/battleSetup";

ReactDOM.render(
  <Grid container direction="column">
    <Grid item>
      <Header />
    </Grid>
    <Grid item container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Body />
      </Grid>
      <Grid item xs={1} />
    </Grid>
  </Grid>,
  document.getElementById("react-application")
);
