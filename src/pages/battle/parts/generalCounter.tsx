/**
 * @module GeneralCounter
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

/**
 * 主に強敵を殴った数カウンターコンポーネントです。
 *
 * これ単体で状態を持つので、単に貼り付けるだけでどこでもカウンタになります。
 *
 * @returns 強敵殴った数カウンターコンポーネント
 */
export default function GeneralCounter(): JSX.Element {
  /**
   * 強敵を殴った数
   */
  const [FPunchCount, setPunchCount] = React.useState(0);

  /**
   * カウンタをいじるたびに呼ばれるハンドラ
   * @param p_event 入力イベント
   */
  const onPunchCountChange = (p_event: React.ChangeEvent<HTMLInputElement>) => {
    const vCount: number = parseInt(p_event.target.value, 10) ?? FPunchCount;
    setPunchCount(vCount < 0 ? 0 : vCount);
  };

  // コンポーネントを作って返す
  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
      <Grid item xs={12}>
        <Typography>
          カウンタ
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="number"
          fullWidth={true}
          value={FPunchCount}
          onChange={onPunchCountChange}
        />
      </Grid>
    </Grid>
  );
}
