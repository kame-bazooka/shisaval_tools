/**
 * BattleManager の動作そのもののテスト
 *
 * @author kame-bazooka
 * @license MIT License
 */
import BattleManager from "../../src/models/battleManager";
import { OrderFlag, OrderFlagType } from "../../src/models/types/orderFlag";

function BEAT(count: number): OrderFlag[] {
  return Array.from({length: count}, () => new OrderFlag(OrderFlagType.Beat));
}
function ACTION(count: number): OrderFlag[] {
  return Array.from({length: count}, () => new OrderFlag(OrderFlagType.Action));
}
function TRY(count: number): OrderFlag[] {
  return Array.from({length: count}, () => new OrderFlag(OrderFlagType.Try));
}

describe("開始ターンの山札", () => {
  it("ターン開始時に山札が人数+4枚なら、山札を仮生成しないこと", () => {
    // 2人パーティー
    let vBattle: BattleManager = new BattleManager([
      ...BEAT(3), ...ACTION(3), ...TRY(4)
    ]);

    // 次ターン開始時に6枚残っている
    vBattle.drawHandFlag([...BEAT(1), ...ACTION(1)]);
    vBattle.drawHandFlagAdd([...TRY(1), ...TRY(1)]);
    vBattle.turnEnd();

    expect(vBattle.flags().stack().getBeatFlags()).toEqual([...BEAT(2)]);
    expect(vBattle.flags().stack().getActionFlags()).toEqual([...ACTION(2)]);
    expect(vBattle.flags().stack().getTryFlags()).toEqual([...TRY(2)]);
    expect(vBattle.flags().graveyard().getBeatFlags()).toEqual([...BEAT(1)]);
    expect(vBattle.flags().graveyard().getActionFlags()).toEqual([...ACTION(1)]);
    expect(vBattle.flags().graveyard().getTryFlags()).toEqual([...TRY(2)]);

    // この場合、山札を捨てた後で作るので、捨てた手札が新山札に含まれる
    vBattle.drawHandFlag([...BEAT(2), ...ACTION(2)]);
    vBattle.drawHandFlagAdd([...TRY(2)]);
    vBattle.turnEnd();

    expect(vBattle.flags().stack().getBeatFlags()).toEqual([...BEAT(3)]);
    expect(vBattle.flags().stack().getActionFlags()).toEqual([...ACTION(3)]);
    expect(vBattle.flags().stack().getTryFlags()).toEqual([...TRY(4)]);
  });

  it("ターン開始時に山札が人数+3枚なら、山札を仮生成すること", () => {
    // 2人パーティー
    let vBattle: BattleManager = new BattleManager([
      ...BEAT(3), ...ACTION(3), ...TRY(4)
    ]);

    // 次ターン開始時に5枚残っている
    vBattle.drawHandFlag([...BEAT(1), ...ACTION(1)]);
    vBattle.drawHandFlagAdd([...TRY(1), ...TRY(1), ...BEAT(1)]);
    vBattle.turnEnd();

    expect(vBattle.flags().stack().getBeatFlags()).toEqual([...BEAT(1)]);
    expect(vBattle.flags().stack().getActionFlags()).toEqual([...ACTION(2)]);
    expect(vBattle.flags().stack().getTryFlags()).toEqual([...TRY(2)]);
    expect(vBattle.flags().graveyard().getBeatFlags()).toEqual([...BEAT(0)]);
    expect(vBattle.flags().graveyard().getActionFlags()).toEqual([...ACTION(0)]);
    expect(vBattle.flags().graveyard().getTryFlags()).toEqual([...TRY(0)]);

    // この場合、ターン最初の山札を使うので、捨てた手札が新山札に含まれない
    vBattle.drawHandFlag([...BEAT(1), ...ACTION(2)]);
    vBattle.drawHandFlagAdd([...TRY(2)]);
    vBattle.turnEnd();

    expect(vBattle.flags().stack().getBeatFlags()).toEqual([...BEAT(2)]);
    expect(vBattle.flags().stack().getActionFlags()).toEqual([...ACTION(1)]);
    expect(vBattle.flags().stack().getTryFlags()).toEqual([...TRY(2)]);
  });
});
