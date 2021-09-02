/**
 * OrderFlagZone の動作テスト
 *
 * @author kame-bazooka
 * @license MIT License
 */
import OrderFlagZone from "../../src/models/orderFlagZone";
import { OrderFlag, OrderFlagType } from "../../src/models/types/orderFlag";

describe("初期化", () => {
  it("山札は指定したフラッグで初期化されること。", () => {
    const vFlag: OrderFlagZone = new OrderFlagZone(
      [
        new OrderFlag(OrderFlagType.Beat),
        new OrderFlag(OrderFlagType.Action, 10),
        new OrderFlag(OrderFlagType.Action, 20),
        new OrderFlag(OrderFlagType.Try, 5),
        new OrderFlag(OrderFlagType.Try, 15),
        new OrderFlag(OrderFlagType.Try, 25)
      ]
    );

    expect(vFlag.getFlagCount()).toBe(6);
    expect(vFlag.getBeatFlags()).toEqual([
      new OrderFlag(OrderFlagType.Beat)
    ]);
    expect(vFlag.getActionFlags()).toEqual([
      new OrderFlag(OrderFlagType.Action, 10),
      new OrderFlag(OrderFlagType.Action, 20)
    ]);
    expect(vFlag.getTryFlags()).toEqual([
      new OrderFlag(OrderFlagType.Try, 5),
      new OrderFlag(OrderFlagType.Try, 15),
      new OrderFlag(OrderFlagType.Try, 25)
    ]);
  });
});

describe("#inclimentFlag", () => {
  it("呼び出した回数だけオーダーフラッグが増えること", () => {
    const vFlag: OrderFlagZone = new OrderFlagZone([]);
    vFlag.inclimentFlag(new OrderFlag(OrderFlagType.Beat));
    vFlag.inclimentFlag(new OrderFlag(OrderFlagType.Action, 10));
    vFlag.inclimentFlag(new OrderFlag(OrderFlagType.Action, 20));
    vFlag.inclimentFlag(new OrderFlag(OrderFlagType.Try, 5));
    vFlag.inclimentFlag(new OrderFlag(OrderFlagType.Try, 15));
    expect(vFlag.getFlagCount()).toBe(5);
    expect(vFlag.getBeatFlags()).toEqual([
      new OrderFlag(OrderFlagType.Beat)
    ]);
    expect(vFlag.getActionFlags()).toEqual([
      new OrderFlag(OrderFlagType.Action, 10),
      new OrderFlag(OrderFlagType.Action, 20)
    ]);
    expect(vFlag.getTryFlags()).toEqual([
      new OrderFlag(OrderFlagType.Try, 5),
      new OrderFlag(OrderFlagType.Try, 15)
    ]);
  });
});

describe("#declimentFlag", () => {
  it("呼ぶたびにオーダーフラッグが減ること", () => {
    const vFlag: OrderFlagZone = new OrderFlagZone(
      [
        new OrderFlag(OrderFlagType.Beat),
        new OrderFlag(OrderFlagType.Beat),
        new OrderFlag(OrderFlagType.Beat),
        new OrderFlag(OrderFlagType.Action, 10),
        new OrderFlag(OrderFlagType.Action, 20),
        new OrderFlag(OrderFlagType.Action, 10),
        new OrderFlag(OrderFlagType.Try, 5),
        new OrderFlag(OrderFlagType.Try, 15),
        new OrderFlag(OrderFlagType.Try, 5)
      ]
    );
    vFlag.declimentFlag(new OrderFlag(OrderFlagType.Beat));
    vFlag.declimentFlag(new OrderFlag(OrderFlagType.Beat));
    vFlag.declimentFlag(new OrderFlag(OrderFlagType.Action, 20));
    vFlag.declimentFlag(new OrderFlag(OrderFlagType.Try, 5));
    vFlag.declimentFlag(new OrderFlag(OrderFlagType.Try, 5));
    vFlag.declimentFlag(new OrderFlag(OrderFlagType.Try, 15));
    expect(vFlag.getBeatFlags()).toEqual([
      new OrderFlag(OrderFlagType.Beat)
    ]);
    expect(vFlag.getActionFlags()).toEqual([
      new OrderFlag(OrderFlagType.Action, 10),
      new OrderFlag(OrderFlagType.Action, 10)
    ]);
    expect(vFlag.getTryFlags()).toEqual([
    ]);
  });

  it("オーダーフラッグが0枚になると引かれずにfalseが戻ること", () => {
    const vFlag: OrderFlagZone = new OrderFlagZone([new OrderFlag(OrderFlagType.Beat)]);
    expect(vFlag.declimentFlag(new OrderFlag(OrderFlagType.Beat))).toBe(true);
    expect(vFlag.getBeatFlags().length).toBe(0);
    expect(vFlag.declimentFlag(new OrderFlag(OrderFlagType.Beat))).toBe(false);
    expect(vFlag.getBeatFlags().length).toBe(0);
  });

  it("組み合わせがないオーダーフラッグを指定すると引かれずにfalseが戻ること", () => {
    const vFlag: OrderFlagZone = new OrderFlagZone([new OrderFlag(OrderFlagType.Action, 10)]);
    expect(vFlag.declimentFlag(new OrderFlag(OrderFlagType.Action, 5))).toBe(false);
    expect(vFlag.getActionFlags().length).toBe(1);
  });
});

describe("#isEmpty", () => {
  it("全てのフラッグが0枚になるとtrueを返すこと", () => {
    const vFlag: OrderFlagZone = new OrderFlagZone([
      new OrderFlag(OrderFlagType.Beat),
      new OrderFlag(OrderFlagType.Action),
      new OrderFlag(OrderFlagType.Try)
    ]);
    vFlag.declimentFlag(new OrderFlag(OrderFlagType.Beat));
    expect(vFlag.isEmpty()).toBe(false);
    vFlag.declimentFlag(new OrderFlag(OrderFlagType.Action));
    expect(vFlag.isEmpty()).toBe(false);
    vFlag.declimentFlag(new OrderFlag(OrderFlagType.Try));
    expect(vFlag.isEmpty()).toBe(true);
  });
});

describe("#clone", () => {
  it("現在の値を持つ別インスタンスが生成されること", () => {
    const vFlag: OrderFlagZone = new OrderFlagZone(
      [
        new OrderFlag(OrderFlagType.Beat),
        new OrderFlag(OrderFlagType.Action, 10),
        new OrderFlag(OrderFlagType.Action, 20),
        new OrderFlag(OrderFlagType.Try, 5),
        new OrderFlag(OrderFlagType.Try, 15)
      ]
    );
    const vCloneFlag: OrderFlagZone = vFlag.clone();

    expect(vFlag === vCloneFlag).toBe(false);
    expect(vFlag).toEqual(vCloneFlag);
  });
});
