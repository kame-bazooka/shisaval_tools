/**
 * @module OrderFlagZone
 * @author kame-bazooka
 * @license MIT License
 */
import { OrderFlag, OrderFlagType } from "./types/orderFlag";

/**
 * 山札または墓地中のフラッグ枚数を扱うクラスです。
 *
 * 山札と墓地を相互に管理するような機能は
 * {@link OrderFlagManager} に実装されているので、基本はそちらを使います。
 */
export default class OrderFlagZone {
  /**
   * コンストラクタ
   *
   * @param p_flags 初期フラッグを全部指定します。
   */
  constructor(p_flags: Array<OrderFlag>) {
    this.FFlags = p_flags;
  }

  /**
   * フラッグを1枚足します。
   * 足す枚数は上限がありません。
   *
   * @param p_flag 増やしたいオーダーフラッグ
   */
  public inclimentFlag(p_flag: OrderFlag): void {
    this.FFlags.push(p_flag);
  }

  /**
   * フラッグを1枚だけ減らします。
   * 既に0枚のフラッグは減らせません。
   *
   * @param p_flag 減らしたいオーダーフラッグ
   * @returns
   *   減らすことに成功すると true, すでに札がないなどで減らせなかった場合は false
   */
  public declimentFlag(p_flag: OrderFlag): boolean {
    for (let i = 0; i < this.FFlags.length; ++i) {
      if ((this.FFlags[i].getType() === p_flag.getType())
            && (this.FFlags[i].getNumber() === p_flag.getNumber()))
      {
        this.FFlags.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  /**
   * この場が空っぽかどうかを調べます。
   *
   * @returns 空ならtrue, まだなにかあれば false
   */
  public isEmpty(): boolean {
    return (this.getFlagCount() === 0);
  }

  /**
   * フラッグの総数を取得します。
   *
   * @returns フラッグ数
   */
  public getFlagCount(): number {
    return this.FFlags.length;
  }

  /**
   * この場にはいっているBeat!!!フラッグだけを抽出します。
   * @returns Beat!!!フラッグの配列。
   */
  public getBeatFlags(): Array<OrderFlag> {
    return this.FFlags.filter(
      (p_value: OrderFlag) => p_value.getType() === OrderFlagType.Beat
    );
  }

  /**
   * この場にはいっているAction!フラッグだけを抽出します。
   * @returns Action!フラッグの配列。
   */
  public getActionFlags(): Array<OrderFlag> {
    return this.FFlags.filter(
      (p_value: OrderFlag) => p_value.getType() === OrderFlagType.Action
    );
  }

  /**
   * この場にはいっているTry!!フラッグだけを抽出します。
   * @returns Try!!フラッグの配列。
   */
  public getTryFlags(): Array<OrderFlag> {
    return this.FFlags.filter(
      (p_value: OrderFlag) => p_value.getType() === OrderFlagType.Try
    );
  }

  /**
   * このクラスの内容をコピーした新たなインスタンスを作ります。
   * このコピーはディープコピーです。
   *
   * @returns 内容をコピーした新たなインスタンス
   */
  public clone(): OrderFlagZone {
    return new OrderFlagZone([...this.FFlags]);
  }

  private FFlags: Array<OrderFlag>;
}