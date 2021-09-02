/**
 * BattleSetupValidator のテストコード
 *
 * @author kame-bazooka
 * @license MIT License
 */
import BattleSetupValidator from "../../../src/models/pages/battleSetupValidator";

describe("フラッグ枚数系", () => {
  it("フラッグ総数が5の倍数でないなら、倍数チェックにひっかかる。", () => {
    expect(BattleSetupValidator(3, 3, 3).get()).toEqual("オーダーフラッグの総枚数は5の倍数にしてください。");
    expect(BattleSetupValidator(3, 3, 1).get()).toEqual("オーダーフラッグの総枚数は5の倍数にしてください。");
  });

  it("フラッグ総数が4枚以下なら、最小チェックにひっかかる", () => {
    expect(BattleSetupValidator(0, 0, 0).get()).toEqual("オーダーフラッグの総枚数は5枚以上にしてください。");
    expect(BattleSetupValidator(0, 0, -5).get()).toEqual("オーダーフラッグの総枚数は5枚以上にしてください。");
  });

  it("フラッグ総数が26枚以上なら、最大チェックにひっかかる", () => {
    expect(BattleSetupValidator(10, 10, 10).get()).toEqual("オーダーフラッグの総枚数は25枚以下にしてください。");
  });

  it("問題ない想定の値ならパスする", () => {
    expect(BattleSetupValidator(5, 0, 0).hasValue()).toEqual(false);
    expect(BattleSetupValidator(5, 5, 0).hasValue()).toEqual(false);
    expect(BattleSetupValidator(5, 5, 5).hasValue()).toEqual(false);
    expect(BattleSetupValidator(10, 5, 5).hasValue()).toEqual(false);
    expect(BattleSetupValidator(10, 10, 5).hasValue()).toEqual(false);
  });
});
