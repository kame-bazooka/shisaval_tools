/**
 * @module WeeklyTabSheet
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import StorageManager from "../../../models/storageManager";
import { DAYS_LABEL, getRangeArray } from "../../../models/utils";

import FlagInputPanel from "./flagInputPanel";
import StrategyMemo from "./strategyMemo";
import TurnStrategyMemo from "../../battle/parts/turnStrategyMemo";

/**
 * タブシートの初期値として必要な値をまとめた型です。
 */
export type WeeklyTabSheetInitializeType = {
  /**
   * Beat!!!フラッグの設定数
   */
  beatFlagCount: number;

  /**
   * Action!フラッグの設定数
   */
  actionFlagCount: number;

  /**
   * Try!!フラッグの設定数
   */
  tryFlagCount: number;
}

/**
 * {@link WeeklyTabSheet}コンポーネントのプロパティです。
 */
export interface WeeklyTabSheetProps {
  /**
   * このタブに対応する曜日インデックス
   */
  dayIndex: number;

  /**
   * 選択状態にしたいタブインデックス
   */
  currentSelectedIndex: number;

  /**
   * 戦闘開始ボタンが押された時に呼ばれるイベントハンドラ
   *
   * 第一引数が曜日番号、後は初期フラッグの数です。
   */
  onStartButtonClick: (p_day_index: number, p_beat_count: number, p_action_count: number, p_try_count: number) => void;

  /**
   * タブシートが初期化を求めている時に呼ばれるイベントハンドラです。
   *
   * 第一引数に曜日番号が入っているので、それを受けてストレージから保存されたデータを読み出して
   * {@link WeeklyTabSheetInitializeType} を作って返します。
   */
  onIntialize: (p_day_index: number) => WeeklyTabSheetInitializeType;
}

/**
 * トップページのタブのシートを切り出したコンポーネント
 *
 * @param props {@link WeeklyTabSheetProps}型のプロパティ
 * @returns タブシート
 */
export default function WeeklyTabSheet(props: WeeklyTabSheetProps): JSX.Element {
  /**
   * 初期設定値
   */
  const vInitialize: WeeklyTabSheetInitializeType = props.onIntialize(props.dayIndex);

  /**
   * 今選択されているBeat!!!フラッグの枚数
   */
  const [FBeatFlagCount, setBeatFlagCount] = React.useState<number | undefined>(vInitialize.beatFlagCount);

  /**
   * 今選択されているAction!フラッグの枚数
   */
  const [FActionFlagCount, setActionFlagCount] = React.useState<number | undefined>(vInitialize.actionFlagCount);

  /**
   * 今選択されているTry!!フラッグの枚数
   */
  const [FTryFlagCount, setTryFlagCount] = React.useState<number | undefined>(vInitialize.tryFlagCount);

  /**
   * Beat!!!フラッグの数が変わるたびに呼ばれるイベントハンドラ
   *
   * @param p_count 入力値
   */
  const onChangeBeatFlag = (p_count: number | undefined) => {
    setBeatFlagCount(p_count);

    if (p_count) {
      StorageManager.saveDayBeatFlag(props.dayIndex, p_count);
    }
  }

  /**
   * Action!フラッグの数が変わるたびに呼ばれるイベントハンドラ
   *
   * @param p_count 入力値
   */
  const onChangeActionFlag = (p_count: number | undefined) => {
    setActionFlagCount(p_count);

    if (p_count) {
      StorageManager.saveDayActionFlag(props.dayIndex, p_count);
    }
  }

  /**
   * Try!!フラッグの数が変わるたびに呼ばれるイベントハンドラ
   *
   * @param p_count 入力値
   */
  const onChangeTryFlag = (p_count: number | undefined) => {
    setTryFlagCount(p_count);

    if (p_count) {
      StorageManager.saveDayTryFlag(props.dayIndex, p_count);
    }
  }

  // コンポーネント作って返す
  return (
    <div role="tabpanel" hidden={props.currentSelectedIndex !== props.dayIndex} id={`vertical-tabpanel-${props.dayIndex}`} aria-labelledby={`vertical-tab-${props.dayIndex}`}>
      {props.currentSelectedIndex === props.dayIndex && (
        <Box p={3}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid item container xs={12}>
              <FlagInputPanel
                dayName={DAYS_LABEL[props.dayIndex]}
                beatFlagCount={FBeatFlagCount}
                onBeatFlagChange={onChangeBeatFlag}
                actionFlagCount={FActionFlagCount}
                onActionFlagChange={onChangeActionFlag}
                tryFlagCount={FTryFlagCount}
                onTryFlagChange={onChangeTryFlag}
              />
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs />
              <Grid item xs={10}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => props.onStartButtonClick(props.dayIndex, FBeatFlagCount ?? 1, FActionFlagCount ?? 1, FTryFlagCount ?? 1)}
                  fullWidth={true}
                >
                  開始
                </Button>
              </Grid>
              <Grid item xs />
            </Grid>
            <Grid item xs={12}>
              <hr />
            </Grid>
            <Grid item container xs={12}>
              <StrategyMemo dayIndex={props.dayIndex} />
            </Grid>
            <Grid item xs={12}>
              <hr />
            </Grid>
            <Grid item container xs={12} spacing={2}>
            {
              getRangeArray(10).map((_, index) => (
                <Grid item xs={3} key={index}>
                  <TurnStrategyMemo dayIndex={props.dayIndex} turnIndex={index + 1} />
                </Grid>
              ))
            }
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}
