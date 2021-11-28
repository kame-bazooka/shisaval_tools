/**
 * @module StorageManager
 * @author kame-bazooka
 * @license MIT License
 */

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
    return (localStorage.getItem(`memo_${p_day_index}`) === "1");
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

  /**
   * 日ごとのターンごとの攻略メモを保存します。
   * @param p_day_index 曜日番号。{@link utils.ts#DAYS_LABEL} と対応
   * @param p_turn_index ターン番号
   * @param p_value 書き込む値
   */
  static saveDayTurnStrategyMemo(p_day_index: number, p_turn_index: number, p_value: string): void {
    localStorage.setItem(`memo_${p_day_index}_${p_turn_index}`, p_value);
  }

  /**
   * 日ごとのターンごとの攻略メモを読み出します。
   * @param p_day_index  曜日番号。{@link utils.ts#DAYS_LABEL} と対応
   * @param p_turn_index ターン番号
   * @returns 攻略メモ
   */
  static loadDayTurnStrategyMemo(p_day_index: number, p_turn_index: number): string {
    return localStorage.getItem(`memo_${p_day_index}_${p_turn_index}`) ?? "";
  }

  /**
   * 日ごとのターンごとの攻略メモを消します。
   * @param p_day_index  曜日番号。{@link utils.ts#DAYS_LABEL} と対応
   * @param p_turn_index ターン番号
   */
  static deleteDayTurnStrategyMemo(p_day_index: number, p_turn_index: number): void {
    localStorage.removeItem(`memo_${p_day_index}_${p_turn_index}`);
  }
}
