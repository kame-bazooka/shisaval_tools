/**
 * 汎用ユーティリティ
 *
 * @author kame-bazooka
 * @license MIT License
 */

/**
 * 曜日の日本語名。インデックス値は{@link getDayIndex}と対応します。
 */
export const DAYS_LABEL: Array<string> = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"];

/**
 * システム日付の曜日インデックスを返します。{@link DAYS_LABEL}と対応します。
 *
 * @returns 現在の曜日のインデックス値を返します。0が月曜で、6が日曜です。
 */
export function getDayIndex(): number {
  // 日曜が0なので
  const vDayIdx: number = (new Date()).getDay();
  return (vDayIdx === 0) ? 6 : vDayIdx - 1;
}

/**
 * 「0」から「指定の数値 - 1」までの値を持つ配列を作って返します。
 *
 * @param p_count 要素を何個作るか。
 * @returns 0 ～ p_count - 1までの要素が入った配列。
 */
export function getRangeArray(p_count: number): number[] {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return [...Array(p_count < 0 ? 0 : p_count)].map((_, i) => i);
}
