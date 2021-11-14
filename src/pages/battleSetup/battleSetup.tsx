/**
 * @module BattleSetup
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import { Box } from "@chakra-ui/react";

import BattleSetupValidator from "../../models/pages/battleSetupValidator";
import { getDayIndex } from "../../models/utils";
import StorageManager from "../../models/storageManager";
import { OrderFlag, OrderFlagType } from "../../models/types/orderFlag";

import { Maybe } from "../../lib/maybe";

import WeeklyTabs from "./parts/weeklyTabs";
import Battle from "../battle/battle";
import ErrorDialog from "./parts/errorDialog";

/**
* トップページです
*
* @returns トップページです。
*/
export default function BattleSetup(): JSX.Element {
  /**
  * バトル中の場合は「true」
  */
  const [FIsBattleMode, setBattleMode] = React.useState(false);

  /**
  * バトル開始時に、今の曜日で入力されていたBeat!!!フラッグの数
  */
  const [FBeatFlagCount, setBeatFlagCount] = React.useState(0);

  /**
  * バトル開始時に、今の曜日で入力されていたAction!フラッグの数
  */
  const [FActionFlagCount, setActionFlagCount] = React.useState(0);

  /**
  * バトル開始時に、今の曜日で入力されていたTry!!フラッグの数
  */
  const [FTryFlagCount, setTryFlagCount] = React.useState(0);

  /**
  * エラーメッセージ
  */
  const [FErrorDialogMessage, setErrorDialogMessage] = React.useState("");

  /**
  * エラーダイアログを表示するか。trueなら表示する。
  */
  const [FErrorDialogOpen, setErrorDialogOpen] = React.useState(false);

  /**
  * 戦闘を開始する曜日インデックス
  */
  const [FBattleDayIndex, setBattleDayIndex] = React.useState(0);

  /**
  * エラーダイアログを閉じる必要がある時に呼ばれるイベントハンドラ
  */
  const onErrorDialogClose = () => {
    setErrorDialogOpen(false);
  };

  /**
  * バトル開始ボタンが押されると呼ばれるイベントハンドラ
  *
  * @param p_day_index バトルを始める曜日インデックス
  * @param p_beat_count 入力された初期Beat!!!フラッグ数
  * @param p_action_count 入力された初期Action!フラッグ数
  * @param p_try_count 入力された初期Try!!フラッグ数
  */
  const onBattleStart = (p_day_index: number, p_beat_count: number, p_action_count: number, p_try_count: number) => {
    // エラーチェック
    const vCheckResult: Maybe<string> = BattleSetupValidator(p_beat_count, p_action_count, p_try_count);
    if (vCheckResult.hasValue()) {
      // エラーがあればダイアログ
      setErrorDialogMessage(vCheckResult.get());
      setErrorDialogOpen(true);
    }
    else {
      // なければバトルモードに入る
      setBattleDayIndex(p_day_index);
      setBeatFlagCount(p_beat_count);
      setActionFlagCount(p_action_count);
      setTryFlagCount(p_try_count);
      setBattleMode(true);
    }
  };

  /**
  * タブシートの初期化時に呼ばれるイベントハンドラ
  * @param p_day_index 曜日インデックス
  * @returns このタブシート用の情報
  */
  const onInitializeTabSheet = (p_day_index: number) => {
    const {beatCount, actionCount, tryCount} = StorageManager.loadDayFlag(p_day_index);

    return {
      beatFlagCount: beatCount,
      actionFlagCount: actionCount,
      tryFlagCount: tryCount
    };
  }

  /**
  * 入力数から実際にオーダーフラッグオブジェクトを作ります。
  * 今の所数字部は見ないので、全部「0」です。
  *
  * @param p_beat_count 作るBeat!!!フラッグ数
  * @param p_action_count 作るAction!!!フラッグ数
  * @param p_try_count 作るTry!!!フラッグ数
  * @returns 各種フラッグを詰め込んだ配列
  */
  const funcMakeInitialFlags = (p_beat_count: number, p_action_count: number, p_try_count: number) => {
    // 今は数字部は見てないので、全部0でフラッグを作る
    return (
      [...Array<number>(p_beat_count)].map(() => (new OrderFlag(OrderFlagType.Beat)))
        .concat(
          [...Array<number>(p_action_count)].map(() => (new OrderFlag(OrderFlagType.Action, 0))))
        .concat(
          [...Array<number>(p_try_count)].map(() => (new OrderFlag(OrderFlagType.Try, 0)))
        )
    );
  }

  /**
  * 表示ページを状態にあわせて切り替えます。
  *
  * @returns 戦闘時なら{@link Battle}、初期状態なら{@link WeeklyTabs}を戻します。
  */
  const funcGetCurrentPage = () => {
    return FIsBattleMode
            ? <Battle dayIndex={FBattleDayIndex} initialFlags={funcMakeInitialFlags(FBeatFlagCount, FActionFlagCount, FTryFlagCount)} />
            : <WeeklyTabs selectedDayIndex={getDayIndex()} onStartButtonClick={onBattleStart} onIntialize={onInitializeTabSheet} />;
  };

  // コンポーネント作って返す
  return (
    <Box p={6}>
      {funcGetCurrentPage()}
      <ErrorDialog dialogMessage={FErrorDialogMessage} isOpen={FErrorDialogOpen} onDialogClose={onErrorDialogClose} />
    </Box>
  );
}
