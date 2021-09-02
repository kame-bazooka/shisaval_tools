/**
 * BattleManager を使ったシナリオテスト
 * 具体的なシナリオは「テストシナリオ.ods」に記載。
 *
 * @author kame-bazooka
 * @license MIT License
 */
import BattleManager from "../../../src/models/battleManager";
import { OrderFlag, OrderFlagType } from "../../../src/models/types/orderFlag";

function BEAT(count: number): OrderFlag[] {
  return Array.from({length: count}, () => new OrderFlag(OrderFlagType.Beat));
}
function ACTION(count: number): OrderFlag[] {
  return Array.from({length: count}, () => new OrderFlag(OrderFlagType.Action));
}
function TRY(count: number): OrderFlag[] {
  return Array.from({length: count}, () => new OrderFlag(OrderFlagType.Try));
}

describe("BattleManager", () => {
  it("5人パーティーで好き放題戦った場合の動きをトレースできること", () => {
    let vBattle: BattleManager = new BattleManager([
      ...BEAT(10), ...ACTION(7), ...TRY(8)
    ]);

    // ターン１
    vBattle.drawHandFlag([...ACTION(1), ...TRY(1), ...TRY(1), ...BEAT(1), ...BEAT(1)]);
    vBattle.drawHandFlagAdd([...ACTION(1), ...ACTION(1)]);
    vBattle.turnEnd();

    expect(vBattle.flags().stack().getBeatFlags()).toEqual([...BEAT(8)]);
    expect(vBattle.flags().stack().getActionFlags()).toEqual([...ACTION(4)]);
    expect(vBattle.flags().stack().getTryFlags()).toEqual([...TRY(6)]);
    expect(vBattle.flags().graveyard().getBeatFlags()).toEqual([...BEAT(2)]);
    expect(vBattle.flags().graveyard().getActionFlags()).toEqual([...ACTION(3)]);
    expect(vBattle.flags().graveyard().getTryFlags()).toEqual([...TRY(2)]);

    // ターン２
    vBattle.drawHandFlag([...TRY(1), ...ACTION(1), ...ACTION(1), ...TRY(1), ...BEAT(1)]);
    vBattle.orderChange(0, new OrderFlag(OrderFlagType.Try));
    vBattle.orderChange(1, new OrderFlag(OrderFlagType.Beat));
    vBattle.orderChange(2, new OrderFlag(OrderFlagType.Try));
    vBattle.orderChange(3, new OrderFlag(OrderFlagType.Beat));
    vBattle.orderChange(4, new OrderFlag(OrderFlagType.Beat));
    vBattle.drawHandFlagAdd([...BEAT(1), ...TRY(1)]);
    vBattle.turnEnd();

    expect(vBattle.flags().stack().getBeatFlags()).toEqual([...BEAT(3)]);
    expect(vBattle.flags().stack().getActionFlags()).toEqual([...ACTION(2)]);
    expect(vBattle.flags().stack().getTryFlags()).toEqual([...TRY(1)]);
    expect(vBattle.flags().graveyard().getBeatFlags()).toEqual([...BEAT(0)]);
    expect(vBattle.flags().graveyard().getActionFlags()).toEqual([...ACTION(0)]);
    expect(vBattle.flags().graveyard().getTryFlags()).toEqual([...TRY(0)]);

    // ターン３
    vBattle.drawHandFlag([...BEAT(1), ...BEAT(1), ...TRY(1), ...ACTION(1), ...BEAT(1)]);
    vBattle.drawHandFlagAdd([...ACTION(1), ...TRY(1)]);
    vBattle.turnEnd();

    expect(vBattle.flags().stack().getBeatFlags()).toEqual([...BEAT(7)]);
    expect(vBattle.flags().stack().getActionFlags()).toEqual([...ACTION(5)]);
    expect(vBattle.flags().stack().getTryFlags()).toEqual([...TRY(6)]);
    expect(vBattle.flags().graveyard().getBeatFlags()).toEqual([...BEAT(3)]);
    expect(vBattle.flags().graveyard().getActionFlags()).toEqual([...ACTION(2)]);
    expect(vBattle.flags().graveyard().getTryFlags()).toEqual([...TRY(2)]);

    // ターン４
    vBattle.drawHandFlag([...TRY(1), ...TRY(1), ...ACTION(1), ...TRY(1), ...BEAT(1)]);
    vBattle.orderChange(2, new OrderFlag(OrderFlagType.Action));
    vBattle.orderChange(2, new OrderFlag(OrderFlagType.Beat));
    vBattle.orderChange(2, new OrderFlag(OrderFlagType.Action));
    vBattle.orderChange(2, new OrderFlag(OrderFlagType.Beat));
    vBattle.orderChange(2, new OrderFlag(OrderFlagType.Try));
    vBattle.drawHandFlagAdd([...TRY(1), ...ACTION(1), ...ACTION(1)]);
    vBattle.turnEnd();

    expect(vBattle.flags().stack().getBeatFlags()).toEqual([...BEAT(4)]);
    expect(vBattle.flags().stack().getActionFlags()).toEqual([...ACTION(0)]);
    expect(vBattle.flags().stack().getTryFlags()).toEqual([...TRY(1)]);
    expect(vBattle.flags().graveyard().getBeatFlags()).toEqual([...BEAT(0)]);
    expect(vBattle.flags().graveyard().getActionFlags()).toEqual([...ACTION(0)]);
    expect(vBattle.flags().graveyard().getTryFlags()).toEqual([...TRY(0)]);

    // ターン５
    vBattle.drawHandFlag([...BEAT(1), ...BEAT(1), ...BEAT(1), ...BEAT(1), ...TRY(1)]);
    vBattle.drawHandFlagAdd([...ACTION(1), ...TRY(1), ...BEAT(1)]);
    vBattle.turnEnd();

    expect(vBattle.flags().stack().getBeatFlags()).toEqual([...BEAT(5)]);
    expect(vBattle.flags().stack().getActionFlags()).toEqual([...ACTION(6)]);
    expect(vBattle.flags().stack().getTryFlags()).toEqual([...TRY(6)]);
    expect(vBattle.flags().graveyard().getBeatFlags()).toEqual([...BEAT(5)]);
    expect(vBattle.flags().graveyard().getActionFlags()).toEqual([...ACTION(1)]);
    expect(vBattle.flags().graveyard().getTryFlags()).toEqual([...TRY(2)]);

    // ターン６
    vBattle.drawHandFlag([...ACTION(1), ...ACTION(1), ...ACTION(1), ...BEAT(1), ...TRY(1)]);
    vBattle.drawHandFlagAdd([...BEAT(1), ...BEAT(1)]);
    vBattle.turnEnd();

    expect(vBattle.flags().stack().getBeatFlags()).toEqual([...BEAT(2)]);
    expect(vBattle.flags().stack().getActionFlags()).toEqual([...ACTION(3)]);
    expect(vBattle.flags().stack().getTryFlags()).toEqual([...TRY(5)]);
    expect(vBattle.flags().graveyard().getBeatFlags()).toEqual([...BEAT(8)]);
    expect(vBattle.flags().graveyard().getActionFlags()).toEqual([...ACTION(4)]);
    expect(vBattle.flags().graveyard().getTryFlags()).toEqual([...TRY(3)]);

    // ターン７
    vBattle.drawHandFlag([...BEAT(1), ...ACTION(1), ...BEAT(1), ...TRY(1), ...ACTION(1)]);
    vBattle.orderChange(1, new OrderFlag(OrderFlagType.Try));
    vBattle.orderChange(1, new OrderFlag(OrderFlagType.Try));
    vBattle.orderChange(1, new OrderFlag(OrderFlagType.Try));
    vBattle.orderChange(1, new OrderFlag(OrderFlagType.Try));
    vBattle.orderChange(1, new OrderFlag(OrderFlagType.Action));
    vBattle.drawHandFlagAdd([...BEAT(1), ...BEAT(1), ...ACTION(1)]);
    vBattle.turnEnd();

    expect(vBattle.flags().stack().getBeatFlags()).toEqual([...BEAT(6)]);
    expect(vBattle.flags().stack().getActionFlags()).toEqual([...ACTION(4)]);
    expect(vBattle.flags().stack().getTryFlags()).toEqual([...TRY(7)]);
    expect(vBattle.flags().graveyard().getBeatFlags()).toEqual([...BEAT(4)]);
    expect(vBattle.flags().graveyard().getActionFlags()).toEqual([...ACTION(3)]);
    expect(vBattle.flags().graveyard().getTryFlags()).toEqual([...TRY(1)]);

    // ターン８
    vBattle.drawHandFlag([...ACTION(1), ...TRY(1), ...TRY(1), ...ACTION(1), ...BEAT(1)]);
    vBattle.drawHandFlagAdd([...TRY(1), ...BEAT(1)]);
    vBattle.turnEnd();

    expect(vBattle.flags().stack().getBeatFlags()).toEqual([...BEAT(4)]);
    expect(vBattle.flags().stack().getActionFlags()).toEqual([...ACTION(2)]);
    expect(vBattle.flags().stack().getTryFlags()).toEqual([...TRY(4)]);
    expect(vBattle.flags().graveyard().getBeatFlags()).toEqual([...BEAT(6)]);
    expect(vBattle.flags().graveyard().getActionFlags()).toEqual([...ACTION(5)]);
    expect(vBattle.flags().graveyard().getTryFlags()).toEqual([...TRY(4)]);

    // ターン９
    vBattle.drawHandFlag([...TRY(1), ...TRY(1), ...BEAT(1), ...ACTION(1), ...ACTION(1)]);
    vBattle.drawHandFlagAdd([...TRY(1), ...BEAT(1)]);
    vBattle.turnEnd();

    expect(vBattle.flags().stack().getBeatFlags()).toEqual([...BEAT(2)]);
    expect(vBattle.flags().stack().getActionFlags()).toEqual([...ACTION(0)]);
    expect(vBattle.flags().stack().getTryFlags()).toEqual([...TRY(1)]);
    expect(vBattle.flags().graveyard().getBeatFlags()).toEqual([...BEAT(0)]);
    expect(vBattle.flags().graveyard().getActionFlags()).toEqual([...ACTION(0)]);
    expect(vBattle.flags().graveyard().getTryFlags()).toEqual([...TRY(0)]);

    // ターン１０
    vBattle.drawHandFlag([...BEAT(1), ...BEAT(1), ...TRY(1), ...BEAT(1), ...TRY(1)]);
    vBattle.drawHandFlagAdd([...TRY(1), ...BEAT(1), ...BEAT(1)]);
    vBattle.turnEnd();

    expect(vBattle.flags().stack().getBeatFlags()).toEqual([...BEAT(5)]);
    expect(vBattle.flags().stack().getActionFlags()).toEqual([...ACTION(7)]);
    expect(vBattle.flags().stack().getTryFlags()).toEqual([...TRY(5)]);
    expect(vBattle.flags().graveyard().getBeatFlags()).toEqual([...BEAT(5)]);
    expect(vBattle.flags().graveyard().getActionFlags()).toEqual([...ACTION(0)]);
    expect(vBattle.flags().graveyard().getTryFlags()).toEqual([...TRY(3)]);

    // ターン１１
    vBattle.drawHandFlag([...TRY(1), ...ACTION(1), ...TRY(1), ...ACTION(1), ...ACTION(1)]);
    vBattle.drawHandFlagAdd([...TRY(1), ...TRY(1)]);
    vBattle.turnEnd();

    expect(vBattle.flags().stack().getBeatFlags()).toEqual([...BEAT(5)]);
    expect(vBattle.flags().stack().getActionFlags()).toEqual([...ACTION(4)]);
    expect(vBattle.flags().stack().getTryFlags()).toEqual([...TRY(1)]);
    expect(vBattle.flags().graveyard().getBeatFlags()).toEqual([...BEAT(5)]);
    expect(vBattle.flags().graveyard().getActionFlags()).toEqual([...ACTION(3)]);
    expect(vBattle.flags().graveyard().getTryFlags()).toEqual([...TRY(7)]);
  });
});
