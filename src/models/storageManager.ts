/**
 * @module StorageManager
 * @author kame-bazooka
 * @license MIT License
 */

import { DAYS_LABEL } from "./utils";

/**
 * {@link StorageManager.loadDayFlag}で使うパラメータ
 */
export type DayFlagParamType = {
  /**
   * Beat!!!フラッグの数
   */
  beatCount: number;

  /**
   * Action!フラッグの数
   */
  actionCount: number;

  /**
   * Try!!フラッグの数
   */
  tryCount: number;
};

/**
 * localStorageにいろいろ書く処理をまとめたクラスです。
 * メソッドは全部 static
 */
export default class StorageManager {
  /**
   * メモとフラッグ情報と花丸情報が書かれたJSONを生成します。
   * @returns JSON文字列
   */
  static getSettingJSON(): string {
    return JSON.stringify(
      Object.assign(
        {},
        ...DAYS_LABEL.map((_, p_day: number) => ({[`flower_${p_day}`]: StorageManager.loadDayWhiteFlower(p_day)})),
        ...DAYS_LABEL.map((_, p_day: number) => ({[`flag_${p_day}`]: StorageManager.loadDayFlag(p_day)})),
        ...DAYS_LABEL.map((_, p_day: number) => ({[`memo_${p_day}`]: StorageManager.loadDayStrategyMemo(p_day)}))
      )
    );
  }

  /**
   * メモとフラッグと花丸情報をJSONから読み出します。
   *
   * 読み込みをした後は、一度リロードを入れてください。
   *
   * @param p_json JSON文字列。
   */
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  static loadSettingJSON(p_json: string) {
    const vSetting: any = JSON.parse(p_json);
    DAYS_LABEL.forEach((_, p_day: number) => {
      if (vSetting[`flower_${p_day}`]) {
        StorageManager.saveDayWhiteFlower(p_day, vSetting[`flower_${p_day}`]);
      }
      if (vSetting[`flag_${p_day}`]) {
        if (vSetting[`flag_${p_day}`]["beatCount"]) {
          StorageManager.saveDayBeatFlag(p_day, vSetting[`flag_${p_day}`]["beatCount"]);
        }
        if (vSetting[`flag_${p_day}`]["actionCount"]) {
          StorageManager.saveDayActionFlag(p_day, vSetting[`flag_${p_day}`]["actionCount"]);
        }
        if (vSetting[`flag_${p_day}`]["tryCount"]) {
          StorageManager.saveDayTryFlag(p_day, vSetting[`flag_${p_day}`]["tryCount"]);
        }
      }
      if (vSetting[`memo_${p_day}`]) {
        StorageManager.saveDayStrategyMemo(p_day, vSetting[`memo_${p_day}`]);
      }
    });
  }
  /* eslint-enable @typescript-eslint/explicit-module-boundary-types */
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */

  /**
   * 日ごとの攻略メモの高さを保存します。
   * @param p_day_index 曜日番号。{@link utils.ts#DAYS_LABEL} と対応
   * @param p_height メモの高さ
   */
  static saveDayMemoHeight(p_day_index: number, p_height: number): void {
    localStorage.setItem(`memo_height_${p_day_index}`, `${p_height}`);
  }

  /**
   * 日ごとの攻略メモの高さを取得します。
   *
   * @param p_day_index 曜日番号。{@link utils.ts#DAYS_LABEL} と対応
   * @returns メモの高さ。nullの場合はまだ未設定です。
   */
  static loadDayMemoHeight(p_day_index: number): number | null {
    const vHeight = localStorage.getItem(`memo_height_${p_day_index}`);
    return vHeight == null ? null : parseInt(vHeight, 10);
  }

  /**
   * 日ごとの攻略メモの高さ設定を消します。
   *
   * @param p_day_index 曜日番号。{@link utils.ts#DAYS_LABEL} と対応
   */
  static deleteDayMemoHeight(p_day_index: number): void {
    localStorage.removeItem(`memo_height_${p_day_index}`);
  }

  /**
   * 曜日ごとに花丸を立てたり取ったりします。
   * @param p_day_index 曜日番号。{@link utils.ts#DAYS_LABEL} と対応
   * @param p_value trueなら花丸が立つ、falseなら取れる
   */
  static saveDayWhiteFlower(p_day_index: number, p_value: boolean): void {
    localStorage.setItem(`flower_${p_day_index}`, p_value ? "1" : "0");
  }

  /**
   * 曜日ごとの花丸状態を読み出します。
   *
   * @param p_day_index 曜日番号。{@link utils.ts#DAYS_LABEL} と対応
   * @return trueなら花丸、falseなら立ってない
   */
  static loadDayWhiteFlower(p_day_index: number): boolean {
    return (localStorage.getItem(`flower_${p_day_index}`) === "1");
  }

  /**
   * 指定曜日の花丸状態を消します。
   * @param p_day_index 
   */
  static deleteDayWhiteFlower(p_day_index: number): void {
    localStorage.removeItem(`flower_${p_day_index}`);
  }

  /**
   * 曜日ごとに指定した、Beat!!!フラッグ数を記録します。
   *
   * @param p_day_index 曜日番号。{@link utils.ts#DAYS_LABEL} と対応
   * @param p_value 書き込みたい値。
   */
  static saveDayBeatFlag(p_day_index: number, p_value: number): void {
    localStorage.setItem(`flag_${p_day_index}_beat`, p_value.toString());
  }

  /**
   * 曜日ごとに指定した、Action!フラッグ数を記録します。
   *
   * @param p_day_index 曜日番号。{@link utils.ts#DAYS_LABEL} と対応
   * @param p_value 書き込みたい値。
   */
  static saveDayActionFlag(p_day_index: number, p_value: number): void {
    localStorage.setItem(`flag_${p_day_index}_action`, p_value.toString());
  }

  /**
   * 曜日ごとに指定した、Try!フラッグ数を記録します。
   *
   * @param p_day_index 曜日番号。{@link utils.ts#DAYS_LABEL} と対応
   * @param p_value 書き込みたい値。
   */
  static saveDayTryFlag(p_day_index: number, p_value: number): void {
    localStorage.setItem(`flag_${p_day_index}_try`, p_value.toString());
  }

  /**
   * 曜日ごとに指定した、フラッグ数を読み出します。
   *
   * @param p_day_index 曜日番号。{@link utils.ts#DAYS_LABEL} と対応
   * @returns この曜日で指定したフラッグ数
   */
  static loadDayFlag(p_day_index: number): DayFlagParamType {
    const vBeat: number = parseInt(localStorage.getItem(`flag_${p_day_index}_beat`) ?? "1", 10);
    const vAction: number = parseInt(localStorage.getItem(`flag_${p_day_index}_action`) ?? "1", 10);
    const vTry: number = parseInt(localStorage.getItem(`flag_${p_day_index}_try`) ?? "1", 10);

    return {
      beatCount: isNaN(vBeat) ? 1 : vBeat,
      actionCount: isNaN(vAction) ? 1 : vAction,
      tryCount: isNaN(vTry) ? 1 : vTry
    };
  }

  /**
   * 曜日ごとに指定したフラッグ数を全部消します。
   *
   * @param p_day_index 曜日番号。{@link utils.ts#DAYS_LABEL} と対応
   */
  static deleteDayFlag(p_day_index: number): void {
    localStorage.removeItem(`flag_${p_day_index}_beat`);
    localStorage.removeItem(`flag_${p_day_index}_action`);
    localStorage.removeItem(`flag_${p_day_index}_try`);
  }

  /**
   * 日ごとの攻略メモを保存します。
   * @param p_day_index 曜日番号。{@link utils.ts#DAYS_LABEL} と対応
   * @param p_value 書き込む値
   */
  static saveDayStrategyMemo(p_day_index: number, p_value: string): void {
    localStorage.setItem(`memo_${p_day_index}`, p_value);
  }

  /**
   * 日ごとの攻略メモを読み出します。
   * @param p_day_index  曜日番号。{@link utils.ts#DAYS_LABEL} と対応
   * @returns 攻略メモ
   */
  static loadDayStrategyMemo(p_day_index: number): string {
    return localStorage.getItem(`memo_${p_day_index}`) ?? "";
  }

  /**
   * 曜日ごとの攻略メモを消します。
   *
   * @param p_day_index 曜日番号。{@link utils.ts#DAYS_LABEL} と対応
   */
  static deleteDayStrategyMemo(p_day_index: number): void {
    localStorage.removeItem(`memo_${p_day_index}`);
  }
}
