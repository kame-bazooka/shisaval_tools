/**
 * @module Flag
 * @author kame-bazooka
 * @license MIT License
 */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { Box, Text } from "@chakra-ui/react";

import { BeatFlagClickableStyle, BeatFlagStyle } from "./flag.css/beatFlag.css";
import { ActionFlagClickableStyle, ActionFlagStyle } from "./flag.css/actionFlag.css";
import { TryFlagClickableStyle, TryFlagStyle } from "./flag.css/tryFlag.css";

import { OrderFlag, OrderFlagType } from "../models/types/orderFlag";

/**
 * {@link Flag}コンポーネントのプロパティ
 */
export interface FlagProp {
  /**
   * レンダリングしたいフラッグを指定します。
   */
  flag: OrderFlag;

  /**
   * （省略可能）フラッグをクリックした時に呼ばれるイベントハンドラ。
   * これを指定すると、マウスカーソルがポインタになります。
   *
   * 引数には選択されたオーダーフラッグが入っています。
   */
  onClick?: (p_flag: OrderFlag) => void;
}

/**
 * フラッグを描画するコンポーネント
 *
 * @param props {@link FlagProp}型のプロパティ
 * @returns フラッグ
 */
export default function Flag(props: FlagProp): JSX.Element {
  /**
   * オーダーフラッグの種類に合わせたスタイルを返します。
   *
   * @param p_order_flag オーダーフラッグの種類
   * @returns オーダーフラッグにあわせたスタイル
   */
  const funcMakeStyle = (p_order_flag_type: OrderFlagType) => {
    switch (p_order_flag_type) {
      case OrderFlagType.Beat:
        return props.onClick ? BeatFlagClickableStyle : BeatFlagStyle;
      case OrderFlagType.Action:
        return props.onClick ? ActionFlagClickableStyle : ActionFlagStyle;
      case OrderFlagType.Try:
        return props.onClick ? TryFlagClickableStyle : TryFlagStyle;
    }
  }

  /**
   * オーダーフラッグに合わせたキャプションを生成します。
   *
   * @param p_order_flag オーダーフラッグ
   */
  const funcMakeCaption = (p_order_flag: OrderFlag) => {
    switch (p_order_flag.getType()) {
      case OrderFlagType.Beat:
        return "Beat!!!";
      case OrderFlagType.Action:
        return "Action!";
      case OrderFlagType.Try:
        return "Try!!";
    }
  }

  /**
   * フラッグがクリックされたときのクリックイベントを発火させます。
   */
  const onClick = () => {
    if (props.onClick) {
      props.onClick(props.flag);
    }
  }

  // コンポーネント作って返す
  return (
    <Box onClick={onClick} width="6em" ml="auto" mr="auto" mt={2} mb={2} userSelect="none" {...funcMakeStyle(props.flag.getType())}>
      <Text>{ funcMakeCaption(props.flag) }</Text>
    </Box>
  );
}
