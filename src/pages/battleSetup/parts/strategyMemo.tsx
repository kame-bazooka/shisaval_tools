/**
 * @module StrategyMemo
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

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
  const onStrategyMemoInputChange = (p_event: React.ChangeEvent<HTMLInputElement>) => {
    if (p_event.target.value.length <= 4096) {
      setStrategyMemo(p_event.target.value);

      StorageManager.saveDayStrategyMemo(props.dayIndex, p_event.target.value);
    }
  };

  // コンポーネント作って返す
  return (
    <>
      <Grid item xs={12}>
        <Typography>
          {DAYS_LABEL[props.dayIndex]}の攻略メモ
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          fullWidth={true}
          rows={10}
          value={FStrategyMemo}
          placeholder="値を更新するたびに自動保存します。4096文字まで入力可能。"
          variant="outlined"
          onChange={onStrategyMemoInputChange}
          />
      </Grid>
    </>
  );
}
