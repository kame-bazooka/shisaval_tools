/**
 * トッページで使うバリデーション
 *
 * @author kame-bazooka
 * @license MIT License
 */
import { Maybe } from "../../lib/maybe";

/**
 * オーダーフラッグの最大値はどう転んでも25枚なので、それを超過していないかを調べます。
 *
 * @param p_beat_count 指定されたBeat!!!フラッグの数
 * @param p_action_count 指定されたAction!フラッグの数
 * @param p_try_count 指定されたTry!!フラッグの数
 * @returns エラーがあれば、その内容の入った{@link Maybe}、ないならエラーの無い{@link Maybe}
 */
const checkMax25 = (p_beat_count: number, p_action_count: number, p_try_count: number): Maybe<string> => {
  if (p_beat_count + p_action_count + p_try_count > 25) {
    return Maybe.just("オーダーフラッグの総枚数は25枚以下にしてください。");
  } else {
    return Maybe.nothing();
  }
};

/**
 * オーダーフラッグの最小値は一人でも5枚なので、それを下回っていないかを調べます。
 *
 * @param p_beat_count 指定されたBeat!!!フラッグの数
 * @param p_action_count 指定されたAction!フラッグの数
 * @param p_try_count 指定されたTry!!フラッグの数
 * @returns エラーがあれば、その内容の入った{@link Maybe}、ないならエラーの無い{@link Maybe}
 */
const checkMin5 = (p_beat_count: number, p_action_count: number, p_try_count: number): Maybe<string> => {
  if (p_beat_count + p_action_count + p_try_count < 5) {
    return Maybe.just("オーダーフラッグの総枚数は5枚以上にしてください。");
  } else {
    return Maybe.nothing();
  }
};

/**
 * オーダーフラッグは必ず5の倍数になるので、そこがズレていないかを調べます。
 *
 * @param p_beat_count 指定されたBeat!!!フラッグの数
 * @param p_action_count 指定されたAction!フラッグの数
 * @param p_try_count 指定されたTry!!フラッグの数
 * @returns エラーがあれば、その内容の入った{@link Maybe}、ないならエラーの無い{@link Maybe}
 */
const checkMultiple5 = (p_beat_count: number, p_action_count: number, p_try_count: number): Maybe<string> => {
  if ((p_beat_count + p_action_count + p_try_count) % 5 !== 0) {
    return Maybe.just("オーダーフラッグの総枚数は5の倍数にしてください。");
  } else {
    return Maybe.nothing();
  }
};

/**
 * 戦闘開始画面のバリデーションを行うクラスです。
 *
 * @param p_beat_count 指定されたBeat!!!フラッグの数
 * @param p_action_count 指定されたAction!フラッグの数
 * @param p_try_count 指定されたTry!!フラッグの数
 * @returns エラーがあれば、その内容の入った{@link Maybe}、ないならエラーの無い{@link Maybe}
 */
export default function BattleSetupValidator(p_beat_count: number, p_action_count: number, p_try_count: number): Maybe<string> {
  // チェックしたい処理の一覧
  const vCheckers = [checkMultiple5, checkMin5, checkMax25];

  // チェックを流して一個でも引っかかったら終了
  for (const vChecker of vCheckers) {
    const vCheckResult: Maybe<string> = vChecker(p_beat_count, p_action_count, p_try_count);
    if (vCheckResult.hasValue()) {
      return vCheckResult;
    }
  }

  return Maybe.nothing();
}
