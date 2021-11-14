/**
 * @module WeeklyTabs
 * @author kame-bazooka
 * @license MIT License
 */

/* eslint-disable @typescript-eslint/ban-types */
import React from "react";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import WeeklyTabSheet from "./weeklyTabSheet";
import { WeeklyTabSheetInitializeType } from "./weeklyTabSheet";

import { DAYS_LABEL } from "../../../models/utils";

/**
 * {@link WeeklyTabs}コンポーネントのプロパティです。
 */
export interface WeeklyTabsProps {
  /**
   * 初期選択する曜日タブインデックス
   */
  selectedDayIndex: number;

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
 * トップページのタブの枠を切り出したコンポーネント。
 * 曜日ごとのタブの中身は{@link WeeklyTabSheet}にあります。
 *
 * @param props {@link WeeklyTabsProps}型のプロパティ
 * @returns タブの枠
 */
export default function WeeklyTabs(props: WeeklyTabsProps): JSX.Element {
  /**
   * 今選択されているタブインデックス
   */
  const [FCurrentIndex, setCurrentIndex] = React.useState(props.selectedDayIndex);

  /**
   * タブが切り替わるたびに呼ばれるイベントハンドラ
   *
   * @param p_event タブイベント
   * @param p_new_index 新たに選択されたタブのインデックス値
   */
  const onChangeTab = (p_new_index: number) => {
    setCurrentIndex(p_new_index);
  };

  /**
   * 曜日ラベルを渡すと、それに対応するタブを作る
   *
   * @param p_days_label 曜日ラベル
   * @returns タブの配列
   */
  const funcBuildTab = (p_days_label: Array<string>): Array<JSX.Element> => {
    return p_days_label.map((p_day: string, p_index: number) => {
      return (
        <Tab key={p_index.toString()}>{p_day}</Tab>
      );
    });
  };

  /**
   * 曜日ラベルを渡すと、それに対応するタブシートを作る
   *
   * @param p_current_index
   *   今選択されているタブインデックス。これと一致したタブが初期表示されます。
   * @param p_days_label 曜日ラベル
   * @returns タブシートの配列
   */
  const funcBuildTabSheet = (p_current_index: number, p_days_label: Array<string>): Array<JSX.Element> => {
    return p_days_label.map((_, p_index: number) => {
      return (
        <TabPanel key={p_index.toString()}>
          <WeeklyTabSheet
            dayIndex={p_index}
            onStartButtonClick={props.onStartButtonClick}
            onIntialize={props.onIntialize}
          />
        </TabPanel>
      );
    });
  };

  // コンポーネント作って返す
  return (
    <Tabs orientation="vertical" onChange={onChangeTab} defaultIndex={FCurrentIndex}>
      <TabList width="8em">
        {...funcBuildTab(DAYS_LABEL)}
      </TabList>
      <TabPanels>
        {...funcBuildTabSheet(FCurrentIndex, DAYS_LABEL)}
      </TabPanels>
    </Tabs>
  );
}
