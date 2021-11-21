/**
 * @module WeeklyTabSheet
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import { Box, Button, Divider, Flex, SimpleGrid } from "@chakra-ui/react";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon} from "@chakra-ui/react";

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
  * ターンメモエディタが開いているかどうか
  */
  const [FIsOpenTurnMemoEditor, setIsOpenTurnMemoEditor] = React.useState<boolean>(false);

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
    <Flex flexDirection="column">
      <FlagInputPanel
        dayName={DAYS_LABEL[props.dayIndex]}
        beatFlagCount={FBeatFlagCount}
        onBeatFlagChange={onChangeBeatFlag}
        actionFlagCount={FActionFlagCount}
        onActionFlagChange={onChangeActionFlag}
        tryFlagCount={FTryFlagCount}
        onTryFlagChange={onChangeTryFlag}
      />
      <Button m={4} colorScheme="blue" onClick={() => props.onStartButtonClick(props.dayIndex, FBeatFlagCount ?? 1, FActionFlagCount ?? 1, FTryFlagCount ?? 1)}>
        開始
      </Button>
      <Divider mb={4} />
        <StrategyMemo dayIndex={props.dayIndex} />
      <Divider />
      <Accordion allowToggle mt={4}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                ターンメモの編集
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <SimpleGrid minChildWidth="15em" spacing="40px">
              {
                getRangeArray(10).map((_, index) => (
                  <Box>
                    <TurnStrategyMemo dayIndex={props.dayIndex} turnIndex={index + 1} />
                  </Box>
                ))
              }
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}
