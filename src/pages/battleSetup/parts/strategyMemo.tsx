/**
 * @module StrategyMemo
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";
import { Flex, Text, Textarea } from "@chakra-ui/react";

import StorageManager from "../../../models/storageManager";
import { DAYS_LABEL } from "../../../models/utils";

/**
 * {@link StrategyMemo}コンポーネントのプロパティです。
 */
export interface StrategyMemoProps {
  /**
   * メモりたい曜日インデックス
   */
  dayIndex: number;
}

/**
 * 日ごとのメモを扱うビューです。
 *
 * これ単体で状態保持や読み書きまで扱うので、貼り付けるだけでメモになります。
 *
 * @param props {@link StrategyMemoProps}型のプロパティ
 * @returns メモコンポーネント
 */
export default function StrategyMemo(props: StrategyMemoProps): JSX.Element {
  /**
   * 現在入力されているメモ
   */
  const [FStrategyMemo, setStrategyMemo] = React.useState(
    StorageManager.loadDayStrategyMemo(props.dayIndex)
  );

  /**
   * メモが書き換わるたびに呼ばれるイベントハンドラ
   *
   * @param p_event 入力値
   */
  const onStrategyMemoInputChange = (p_event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (p_event.target.value.length <= 4096) {
      setStrategyMemo(p_event.target.value);

      StorageManager.saveDayStrategyMemo(props.dayIndex, p_event.target.value);
    }
  };

  // コンポーネント作って返す
  return (
    <Flex flexDirection="column">
      <Text>{DAYS_LABEL[props.dayIndex]}の攻略メモ</Text>
      <Textarea
        mt={2}
        resize="vertical"
        isFullWidth
        rows={10}
        value={FStrategyMemo}
        placeholder="値を更新するたびに自動保存します。4096文字まで入力可能。"
        onChange={onStrategyMemoInputChange}
      />
    </Flex>
  );
}
