/**
 * OrderFlagManager の動作テスト
 *
 * @author kame-bazooka
 * @license MIT License
 */
import OrderFlagManager from "../../src/models/orderFlagManager";
import { OrderFlagType, OrderFlag } from "../../src/models/types/orderFlag";

describe("初期化", () => {
  it("山札は指定したフラッグで初期化されること。", () => {
    const vFlag: OrderFlagManager = new OrderFlagManager(
      [
        new OrderFlag(OrderFlagType.Beat),
        new OrderFlag(OrderFlagType.Action, 10),
        new OrderFlag(OrderFlagType.Action, 20),
        new OrderFlag(OrderFlagType.Try, 5),
        new OrderFlag(OrderFlagType.Try, 15),
        new OrderFlag(OrderFlagType.Try, 25)
      ]
    );

    expect(vFlag.stack().getFlagCount()).toBe(6);
    expect(vFlag.stack().getBeatFlags()).toEqual([
      new OrderFlag(OrderFlagType.Beat)
    ]);
    expect(vFlag.stack().getActionFlags()).toEqual([
      new OrderFlag(OrderFlagType.Action, 10),
      new OrderFlag(OrderFlagType.Action, 20)
    ]);
    expect(vFlag.stack().getTryFlags()).toEqual([
      new OrderFlag(OrderFlagType.Try, 5),
      new OrderFlag(OrderFlagType.Try, 15),
      new OrderFlag(OrderFlagType.Try, 25)
    ]);
  });

  it("墓地は全てのフラッグが0枚で初期化されていること", () => {
    const vFlag: OrderFlagManager = new OrderFlagManager(
      [
        new OrderFlag(OrderFlagType.Beat),
        new OrderFlag(OrderFlagType.Action),
        new OrderFlag(OrderFlagType.Try)
      ]
    );
    expect(vFlag.graveyard().getBeatFlags().length).toBe(0);
    expect(vFlag.graveyard().getActionFlags().length).toBe(0);
    expect(vFlag.graveyard().getTryFlags().length).toBe(0);
  });
});

describe("#renewStack", () => {
  it("前ターンの墓地の中身が新山札になること", () => {
    const vFlag: OrderFlagManager = new OrderFlagManager(
      [
        new OrderFlag(OrderFlagType.Beat),
        new OrderFlag(OrderFlagType.Beat),
        new OrderFlag(OrderFlagType.Beat),
        new OrderFlag(OrderFlagType.Beat),
        new OrderFlag(OrderFlagType.Beat),
        new OrderFlag(OrderFlagType.Action, 1),
        new OrderFlag(OrderFlagType.Action, 2),
        new OrderFlag(OrderFlagType.Action, 3),
        new OrderFlag(OrderFlagType.Action, 4),
        new OrderFlag(OrderFlagType.Action, 5),
        new OrderFlag(OrderFlagType.Try, 10),
        new OrderFlag(OrderFlagType.Try, 20),
        new OrderFlag(OrderFlagType.Try, 30),
        new OrderFlag(OrderFlagType.Try, 40),
        new OrderFlag(OrderFlagType.Try, 50)
      ]
    );
    vFlag.graveyard().inclimentFlag(new OrderFlag(OrderFlagType.Try, 10));
    vFlag.graveyard().inclimentFlag(new OrderFlag(OrderFlagType.Action, 5));
    vFlag.graveyard().inclimentFlag(new OrderFlag(OrderFlagType.Action, 4));
    vFlag.graveyard().inclimentFlag(new OrderFlag(OrderFlagType.Beat));
    vFlag.graveyard().inclimentFlag(new OrderFlag(OrderFlagType.Beat));
    vFlag.graveyard().inclimentFlag(new OrderFlag(OrderFlagType.Beat));
    vFlag.renewStack();
    expect(vFlag.stack().getBeatFlags()).toEqual([
      new OrderFlag(OrderFlagType.Beat),
      new OrderFlag(OrderFlagType.Beat),
      new OrderFlag(OrderFlagType.Beat)
    ]);
    expect(vFlag.stack().getActionFlags()).toEqual([
      new OrderFlag(OrderFlagType.Action, 5),
      new OrderFlag(OrderFlagType.Action, 4)
    ]);
    expect(vFlag.stack().getTryFlags()).toEqual([
      new OrderFlag(OrderFlagType.Try, 10)
    ]);
  });
});

describe("#clone", () => {
  it("墓地と山札も含めて別インスタンスのコピーが作られること", () => {
    let vFlag: OrderFlagManager = new OrderFlagManager([
      new OrderFlag(OrderFlagType.Beat),
      new OrderFlag(OrderFlagType.Beat),
      new OrderFlag(OrderFlagType.Action, 10),
      new OrderFlag(OrderFlagType.Action, 20),
      new OrderFlag(OrderFlagType.Try, 5),
      new OrderFlag(OrderFlagType.Try, 15),
      new OrderFlag(OrderFlagType.Try, 25)
    ]);
    vFlag.stack().declimentFlag(new OrderFlag(OrderFlagType.Beat));
    vFlag.graveyard().inclimentFlag(new OrderFlag(OrderFlagType.Beat));
    vFlag.stack().declimentFlag(new OrderFlag(OrderFlagType.Action, 10));
    vFlag.graveyard().inclimentFlag(new OrderFlag(OrderFlagType.Action, 10));
    vFlag.stack().declimentFlag(new OrderFlag(OrderFlagType.Try, 15));
    vFlag.graveyard().inclimentFlag(new OrderFlag(OrderFlagType.Try, 15));
    vFlag.stack().declimentFlag(new OrderFlag(OrderFlagType.Try, 5));
    vFlag.graveyard().inclimentFlag(new OrderFlag(OrderFlagType.Try, 5));

    let vCloneFlag: OrderFlagManager = vFlag.clone();
    expect(vFlag === vCloneFlag).toBe(false);
    expect(vFlag.stack() === vCloneFlag.stack()).toBe(false);
    expect(vFlag.stack()).toEqual(vCloneFlag.stack());
    expect(vFlag.graveyard() === vCloneFlag.graveyard()).toBe(false);
    expect(vFlag.graveyard()).toEqual(vCloneFlag.graveyard());
  });
});
