/**
 * @module OrderFlagManager
 * @author kame-bazooka
 * @license MIT License
 */
import { OrderFlag } from "./types/orderFlag";
import OrderFlagZone from "./orderFlagZone";

/**
 * オーダーフラッグの山札と墓地を管理するクラスです
 *
 * あくまでフラッグの管理しかしないので、実際のバトルにあわせたインタフェースで操作をしたい場合
 * ラップクラスである{@link BattleManager} を使います。
 */
export default class OrderFlagManager {
  /**
   * コンストラクタ
   *
   * @param p_flags 初期フラッグを全部指定します。
   */
  constructor(p_flags: Array<OrderFlag>) {
    // 初期値は一応覚えておく
    this.FInitializeFlags = [...p_flags];

    // 墓地は全部0枚、山札は初期フラッグを積む
    this.FStack = new OrderFlagZone(this.FInitializeFlags);
    this.FGraveyard = new OrderFlagZone([]);
    this.FReserveStack = new OrderFlagZone([]);
  }

  /**
   * 初期フラッグを見ます
   *
   * @returns 初期フラッグの配列
   */
  public getInitializeFlags() : Array<OrderFlag> {
    return this.FInitializeFlags;
  }

  /**
   * 山札を現在の墓地の状態をもとに再生成します。
   *
   * ただし、すでに{@link reserveRenewStack}を呼び出している場合
   * そこで予約した山札を単に新山札に差し替えるだけとなります。
   */
  public renewStack(): void {
    if (this.FReserveStack.isEmpty()) {
      // 新山札は前ターンの墓地の札
      this.FStack = this.FGraveyard.clone();
      this.FGraveyard = new OrderFlagZone([]);
    }
    else {
      // 予約分があれば、それを新山札にして墓地は何もしない
      this.FStack = this.FReserveStack.clone();
      this.FReserveStack = new OrderFlagZone([]);
    }
  }

  /**
   * 現在の墓地の状態を山札として予約します。墓地は空になります。
   *
   * {@link renewStack}と違い、これを呼び出した段階ではまだ山札は入れ替えません。
   * あくまで実際の入れ替えが走るのは、次回{@link renewStack}を呼び出した時になります。
   */
  public reserveRenewStack(): void {
    this.FReserveStack = this.FGraveyard.clone();
    this.FGraveyard = new OrderFlagZone([]);
  }

  /**
   * すでに予約済みの山札があるかを返します。
   *
   * @returns true ならもうある、 false ならまだない。
   */
  public isReservedRenewStack(): boolean {
    return !this.FReserveStack.isEmpty();
  }

  /**
   * 山札の参照を返します。
   *
   * 中身を直接触る時は整合性に注意してください。
   *
   * @returns 山札の参照
   */
  public stack(): OrderFlagZone {
    return this.FStack;
  }

  /**
   * 墓地の参照を返します。
   *
   * 中身を直接触る時は整合性に注意してください。
   *
   * @returns 墓地の参照
   */
  public graveyard(): OrderFlagZone {
    return this.FGraveyard;
  }

  /**
   * 現在のインスタンスの値をコピーした、新たなインスタンスを作って返します。
   * このコピーはディープコピーです。
   *
   * @returns 現在のインスタンスの値をコピーした別インスタンス
   */
  public clone(): OrderFlagManager {
    let vResult: OrderFlagManager = new OrderFlagManager(
      this.FInitializeFlags
    );
    vResult.FGraveyard = this.FGraveyard.clone();
    vResult.FStack = this.FStack.clone();
    vResult.FReserveStack = this.FReserveStack.clone();

    return vResult;
  }

  private FStack: OrderFlagZone;
  private FGraveyard: OrderFlagZone;
  private FReserveStack: OrderFlagZone;
  private readonly FInitializeFlags: Array<OrderFlag>;
}
