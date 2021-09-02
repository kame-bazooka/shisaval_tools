/**
 * @module FlagChooser
 * @author kame-bazooka
 * @license MIT License
 */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";

import { FlagChooserStyle } from "./flagChooser.css";

import { Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import { OrderFlag, OrderFlagType } from "../models/types/orderFlag";
import { getRangeArray } from "../models/utils";
import Flag from "./flag";

/**
 * {@link FlagChooser}コンポーネントのプロパティです。
 */
export interface FlagChooserProps {
  /**
   * Beat!!!フラッグ列に表示したいフラッグを指定します。
   *
   * 選択インタフェースを実装する時は1個だけダミーのオーダーフラッグを入れます。
   */
  beatFlags: Array<OrderFlag>;

  /**
   * Action!フラッグ列に表示したいフラッグを指定します。
   *
   * 選択インタフェースを実装する時は1個だけダミーのオーダーフラッグを入れます。
   */
  actionFlags: Array<OrderFlag>;

  /**
   * Try!フラッグ列に表示したいフラッグを指定します。
   *
   * 選択インタフェースを実装する時は1個だけダミーのオーダーフラッグを入れます。
   */
  tryFlags: Array<OrderFlag>;

  /**
   * （省略可能）ここにフラッグを指定すると、同種のフラッグがハイライト強調されます。
   *
   * 基本的に選択状態で使うためのものです。
   */
  highlightFlag?: OrderFlag;

  /**
   * （省略可能）フラッグをクリックして選択した時に呼ばれるイベントです。
   *
   * 引数には選択されたフラッグが入っています。
   */
  onSelect?: (p_flag_type: OrderFlag) => void;
}

/**
 * フラッグをBeatとActionとFlagの3列にわけて
 * 一覧表示及び、選択インタフェースを提供するコンポーネントです。
 *
 * @param props {@link FlagChooserProps}型のプロパティ
 * @returns フラッグ選択コンポーネント
 */
export default function FlagChooser(props: FlagChooserProps): JSX.Element {
  /**
   * スタイルシート
   */
  const styleSheet = FlagChooserStyle();

  /**
   * フラッグがクリックされた時のイベントを発火します。
   *
   * @param p_flag 選択されたフラッグ
   */
  const onFlagClick = (p_flag: OrderFlag) => {
    if (props.onSelect) {
      props.onSelect(p_flag);
    }
  }

  /**
   * 選択モードの時に、選択されているフラッグを枠で囲ったコンポーネントを返します。
   *
   * @param p_element コンポーネント
   * @param p_flag 選択状態されたフラッグ
   * @returns
   *   FlagChooserProps#highlightFlag と p_flag が同じ種類のフラッグなら
   *   p_elementに枠をつけたコンポーネントを返します。
   *
   *   そうでないなら p_element がそのまま戻ってきます。
   */
  const funcMakeHighlight = (p_element: JSX.Element, p_flag: OrderFlag): JSX.Element => {
    return (props.highlightFlag && p_flag.getType() === props.highlightFlag.getType()) ?
              <Box className={styleSheet.highlight}>
                { p_element }
              </Box> : p_element;
  }

  /**
   * 指定のフラッグを指定個作った配列を返します。
   *
   * @param p_flag_count 作りたい数
   * @param p_flag 作りたいオーダーフラッグ
   * @returns オーダーフラッグコントロールの配列
   */
  const funcBuildFlag = (p_flag_count: number, p_flag: OrderFlag): JSX.Element[] => {
    return getRangeArray(p_flag_count).map((p_number: number) => {
      return (
        <Grid item xs key={p_number.toString()}>
          { funcMakeHighlight(<Flag flag={p_flag} onClick={props.onSelect ? onFlagClick : undefined} />, p_flag) }
        </Grid>
      );
    });
  };

  // コンポーネント作って返す
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      className={styleSheet.root}
    >
      <Grid
        item
        container
        xs={4}
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {...funcBuildFlag(props.beatFlags.length, new OrderFlag(OrderFlagType.Beat))}
      </Grid>
      <Grid
        item
        container
        xs={4}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        {...funcBuildFlag(props.actionFlags.length, new OrderFlag(OrderFlagType.Action))}
      </Grid>
      <Grid
        item
        container
        xs={4}
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-end"
      >
        {...funcBuildFlag(props.tryFlags.length, new OrderFlag(OrderFlagType.Try))}
      </Grid>
    </Grid>
  );
}
