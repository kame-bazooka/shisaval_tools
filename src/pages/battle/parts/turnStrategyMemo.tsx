/**
 * @module TurnStrategyMemo
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import StorageManager from "../../../models/storageManager";

/**
 * {@link TurnStrategyMemo}コンポーネントのプロパティです。
 */
export interface TurnStragegyMemoProps {
  /**
   * メモりたい曜日番号
   */
  dayIndex: number;

  /**
   * メモりたいターン数
   */
  turnIndex: number;
}

/**
 * ターン単位のメモを扱うクラスです。
 *
 * これ単体で状態保持や読み書きまで全て扱うので、貼り付けるだけでメモができます。
 *
 * @param props {@link TurnStragegyMemoProps}型のプロパティ
 * @returns ターンメモコンポーネント
 */
export default function TurnStrategyMemo(props: TurnStragegyMemoProps): JSX.Element {
  /**
   * 現在のメモ
   */
  const [FTurnStrategyMemo, setTurnStrategyMemo] = React.useState(
    StorageManager.loadDayTurnStrategyMemo(props.dayIndex, props.turnIndex)
  );

  /**
   * 親でターンが変わるたびに、メモを読み出しなおす処理
   */
  React.useEffect(
    () => setTurnStrategyMemo(StorageManager.loadDayTurnStrategyMemo(props.dayIndex, props.turnIndex)),
    [ props.turnIndex ]
  );

  /**
   * メモが更新されるたびに呼ばれるイベント
   *
   * @param p_event 入力イベント
   */
  const onTurnStrategyMemoInputChange = (p_event: React.ChangeEvent<HTMLInputElement>) => {
    if (p_event.target.value.length <= 1024) {
      setTurnStrategyMemo(p_event.target.value);

      StorageManager.saveDayTurnStrategyMemo(props.dayIndex, props.turnIndex, p_event.target.value);
    }
  };

  // コンポーネントを作って返す
  return (
    <>
      <Grid item xs={12}>
        <Typography>
          {props.turnIndex}ターン目のメモ
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          fullWidth={true}
          rows={3}
          value={FTurnStrategyMemo}
          placeholder="値を更新するたびに自動保存します。1024文字まで入力可能。"
          variant="outlined"
          onChange={onTurnStrategyMemoInputChange}
          />
      </Grid>
    </>
  );
}