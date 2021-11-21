/**
 * @module FlagInputPanel
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";
import { Grid, Flex, Text } from "@chakra-ui/react";
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper} from "@chakra-ui/react";

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
  onFlagCountChange: (p_value_str: string, p_value_num: number) => void;
};

/**
 * {@link FlagInputPanel} のオーダーフラッグごとの入力欄の１つを切り出したコンポーネントです。
 *
 * @param props {@link FlagInputPanelItemProps}型のプロパティ
 * @returns FlagInputPanel のオーダーフラッグ１個分の入力欄
 */
function FlagInputPanelItem(props: FlagInputPanelItemProps): JSX.Element {
  return (
    <Flex flexDirection="column">
      <Flag flag={props.flag} />
      <NumberInput size="sm" defaultValue={props.flagCount} min={1} max={25} onChange={props.onFlagCountChange}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Flex>
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
   * Beat!!!フラッグの数が変わると呼ばれるイベントハンドラ
   * @param p_event 入力値
   */
  const onBeatInputChange = (p_value_str: string, p_value_num: number) => {
    props.onBeatFlagChange(p_value_num);
  };

  /**
   * Action!フラッグの数が変わると呼ばれるイベントハンドラ
   * @param p_event 入力値
   */
  const onActionInputChange = (p_value_str: string, p_value_num: number) => {
    props.onActionFlagChange(p_value_num);
  };

  /**
   * Try!!フラッグの数が変わると呼ばれるイベントハンドラ
   * @param p_event 入力値
   */
  const onTryInputChange = (p_value_str: string, p_value_num: number) => {
    props.onTryFlagChange(p_value_num);
  };

  // コンポーネント作って返す
  return (
    <Flex flexDirection="column">
      <Text>{props.dayName}のフラッグの総数を入力してください。</Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={8} ml={10} mr={10}>
        <FlagInputPanelItem flag={new OrderFlag(OrderFlagType.Beat)} flagCount={props.beatFlagCount} onFlagCountChange={onBeatInputChange} />
        <FlagInputPanelItem flag={new OrderFlag(OrderFlagType.Action)} flagCount={props.actionFlagCount} onFlagCountChange={onActionInputChange} />
        <FlagInputPanelItem flag={new OrderFlag(OrderFlagType.Try)} flagCount={props.tryFlagCount} onFlagCountChange={onTryInputChange} />
      </Grid>
    </Flex>
  );
}
