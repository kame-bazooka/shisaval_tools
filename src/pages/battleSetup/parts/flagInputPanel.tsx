/**
 * @module FlagInputPanel
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { OrderFlag, OrderFlagType } from "../../../models/types/orderFlag";
import Flag from "../../../components/flag";

/**
 * {@link FlagInputPanelItem}コンポーネントのプロパティです。
 */
type FlagInputPanelItemProps = {
  /**
   * ラベルに表示するオーダーフラッグ
   */
  flag: OrderFlag;

  /**
   * 入力されたフラッグの数
   */
  flagCount: number | undefined;

  /**
   * フラッグ数の入力値が変わるたびに呼ばれるイベントハンドラ
   */
  onFlagCountChange: (p_event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * {@link FlagInputPanel} のオーダーフラッグごとの入力欄の１つを切り出したコンポーネントです。
 *
 * @param props {@link FlagInputPanelItemProps}型のプロパティ
 * @returns FlagInputPanel のオーダーフラッグ１個分の入力欄
 */
function FlagInputPanelItem(props: FlagInputPanelItemProps): JSX.Element {
  return (
    <Grid item xs={2}>
      <Flag flag={props.flag} />
      <TextField
        type="number"
        fullWidth={true}
        value={props.flagCount}
        onChange={props.onFlagCountChange}
      />
    </Grid>
  );
}

/**
 * {@link FlagInputPanel}コンポーネントのプロパティです。
 */
export type FlagInputPanelProps = {
  /**
   * メッセージに表示する曜日の日本語名
   */
  dayName: string;

  /**
   * Beat!!!フラッグの数
   */
  beatFlagCount: number | undefined;

  /**
   * Action!フラッグの数
   */
  actionFlagCount: number | undefined;

  /**
   * Try!!フラッグの数
   */
  tryFlagCount: number | undefined;

  /**
   * Beat!!!フラッグの入力値が変化するたびに呼ばれるイベントハンドラ
   */
  onBeatFlagChange: (p_flag_count: number | undefined) => void;

  /**
   * Action!フラッグの入力値が変化するたびに呼ばれるイベントハンドラ
   */
  onActionFlagChange: (p_flag_count: number | undefined) => void;

  /**
   * Try!!フラッグの入力値が変化するたびに呼ばれるイベントハンドラ
   */
  onTryFlagChange: (p_flag_count: number | undefined) => void;
}

/**
 * 初期画面でフラッグ数を入力するところだけ切り出したものです。
 * このコンポーネントは状態を持たないので、値は外から渡す必要があります。
 *
 * @param props {@link FlagInputPanelProps}型のプロパティ
 * @returns フラッグ数入力欄
 */
export default function FlagInputPanel(props: FlagInputPanelProps): JSX.Element {
  /**
   * 入力された値をオーダーフラッグの数的にありえる値に補正します。
   * 具体的には空文字のときの「undefined」か、1～25になります。
   *
   * @param p_value 入力値
   * @returns 1～25に補正された値
   */
  const normalizeFlagCount = (p_value: string): number | undefined => {
    if (p_value === "") {
      return undefined;
    }
    let vIntValue: number = parseInt(p_value, 10);
    vIntValue = isNaN(vIntValue) ? 1 : vIntValue;
    vIntValue = vIntValue <= 0 ? 1 : vIntValue;
    vIntValue = vIntValue >= 25 ? 25 : vIntValue;
    return vIntValue;
  }

  /**
   * Beat!!!フラッグの数が変わると呼ばれるイベントハンドラ
   * @param p_event 入力値
   */
  const onBeatInputChange = (p_event: React.ChangeEvent<HTMLInputElement>) => {
    props.onBeatFlagChange(normalizeFlagCount(p_event.target.value));
  };

  /**
   * Action!フラッグの数が変わると呼ばれるイベントハンドラ
   * @param p_event 入力値
   */
  const onActionInputChange = (p_event: React.ChangeEvent<HTMLInputElement>) => {
    props.onActionFlagChange(normalizeFlagCount(p_event.target.value));
  };

  /**
   * Try!!フラッグの数が変わると呼ばれるイベントハンドラ
   * @param p_event 入力値
   */
  const onTryInputChange = (p_event: React.ChangeEvent<HTMLInputElement>) => {
    props.onTryFlagChange(normalizeFlagCount(p_event.target.value));
  };

  // コンポーネント作って返す
  return (
    <>
      <Grid item xs={12}>
        <Typography>
          {props.dayName}のフラッグの総数を入力してください。
        </Typography>
      </Grid>
      <Grid item container xs={12}>
        <Grid item xs={1} />
        <FlagInputPanelItem flag={new OrderFlag(OrderFlagType.Beat)} flagCount={props.beatFlagCount} onFlagCountChange={onBeatInputChange} />
        <Grid item xs />
        <FlagInputPanelItem flag={new OrderFlag(OrderFlagType.Action)} flagCount={props.actionFlagCount} onFlagCountChange={onActionInputChange} />
        <Grid item xs />
        <FlagInputPanelItem flag={new OrderFlag(OrderFlagType.Try)} flagCount={props.tryFlagCount} onFlagCountChange={onTryInputChange} />
        <Grid item xs={1} />
      </Grid>
    </>
  );
}
