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

import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";

// 画面部品
import Header from "./parts/header";
import Body from "../battleSetup/battleSetup";

ReactDOM.render(
  <ChakraProvider>
    <Grid templateRows="auto 1fr" w="100%" h="100vh">
      <GridItem zIndex="sticky" boxShadow="lg">
        <Header />
      </GridItem>
      <GridItem>
        <Body />
      </GridItem>
    </Grid>
  </ChakraProvider>,
  document.getElementById("react-application")
);