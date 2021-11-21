/**
 * @module FlagChorusView
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import { Grid, Box } from "@chakra-ui/react";

import { OrderFlag } from "../models/types/orderFlag";
import Flag from "./flag";

/**
* {@link FlagChorusView}コンポーネントのプロパティです。
*/
export interface FlagChorusViewProps {
  /**
  * レンダリングしたいオーダーフラッグの配列を指定します。
  */
  flags: Array<OrderFlag>;

  /**
  * オーダーフラッグをクリックした時に呼び出したいイベントハンドラです。
  *
  * 引数には選択された項目のインデックス値が入っています。
  */
  onSelect: (p_flag_index: number) => void;

  /**
  * （省略可能）これにインデックス値を指定すると、そのインデックスのフラッグが選択状態になります。
  */
  highlightIndex?: number;
}

/**
* フラッグを５枚まで選択して並べるUIを提供するコンポーネントです。
*
* @param props {@link FlagChorusViewProps}型のプロパティ
* @returns フラッグ選択コンポーネント
*/
export default function FlagChorusView(props: FlagChorusViewProps): JSX.Element {
  const FlagChorusViewStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: "10px",
    paddingRight: "10px"
  };

  const FlagChorusViewHighlightStyle = {
    border: `2px solid blue`
  };

  /**
  * 選択モードの時に、選択されているフラッグを枠で囲ったコンポーネントを返します。
  *
  * @param p_element コンポーネント
  * @param p_idx テストしたいインデックス値
  * @returns
  *   FlagChooserProps#highlightIndex と p_idx が同じ値なら
  *   p_elementに枠をつけたコンポーネントを返します。
  *
  *   そうでないなら p_element がそのまま戻ってきます。
  */
  const funcMakeHighlight = (p_element: JSX.Element, p_idx: number): JSX.Element => {
    return (p_idx !== props.highlightIndex) ? p_element :
              <Box { ...FlagChorusViewHighlightStyle }>
                { p_element }
              </Box>;
  }

  /**
  * オーダーフラッグを一枚作ります。
  *
  * @param p_flag 作りたいフラッグ
  * @param p_idx このフラッグのインデックス値
  * @returns オーダーフラッグコンポーネント
  */
  const funcMakeOrderFlag = (p_flag: OrderFlag, p_idx: number): JSX.Element => {
    const vOnClick = () => {
      props.onSelect(p_idx);
    };

    return <Flag flag={p_flag} onClick={vOnClick} />;
  }

  /**
  * オーダーフラッグを指定された数だけ並べます。
  * 結果は{@link Grid}の要素として使います。
  *
  * @param p_flags 作りたいオーダーフラッグの一覧
  * @returns オーダーフラッグコンポーネントの配列
  */
  const funcBuildFlags = (p_flags: Array<OrderFlag>): Array<JSX.Element> => {
    return p_flags.map((p_value: OrderFlag, p_idx: number) =>
      funcMakeHighlight(funcMakeOrderFlag(p_value, p_idx), p_idx)
    );
  };

  // コンポーネント作って返す
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={2} {...FlagChorusViewStyle}>
      { ...funcBuildFlags(props.flags) }
    </Grid>
  );
}
