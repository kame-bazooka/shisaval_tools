/**
 * @module BattleManager
 * @author kame-bazooka
 * @license MIT License
 */
import OrderFlagManager from "./orderFlagManager";
import { OrderFlag } from "./types/orderFlag";

/**
 * バトルにあわせたオーダーフラッグ管理のインタフェースを提供するクラスです。
 * ターンの管理なども含めた戦闘のすべてはこのクラスが担います。
 */
export default class BattleManager {
  /**
   * コンストラクタ
   *
   * @param p_flags 初期フラッグを指定します。
   */
  constructor(p_flags: Array<OrderFlag>) {
    this.FFlags = new OrderFlagManager(p_flags);
    this.FCurrentTurn = 1;
    this.FTurnSnapShot = [];
    this.FHands = [];
    this.FAddHands = [];
    this.FNumberOfPeople = p_flags.length / 5;
  }

  /**
   * 山札から引いた手札を指定することで、山札から引きます。墓地には送りません。
   * 引いた後の手札は{@link BattleManager.hands}で参照できます。
   *
   * この引く処理の直前に山札が空だった場合は、その時点の墓地から山札を再生成します。
   *
   * @param p_hands 山札から引きたい札の配列
   */
  public drawHandFlag(p_hands: Array<OrderFlag>): void {
    p_hands.forEach((p_flag) => {
      this.FHands.push(this.drawFlag(p_flag));
    });
  }

  /**
   * 札を選んだことで追加で山札から引いた札を指定します。
   * ここで指定した札は{@link BattleManager.hands}とは別のところで管理され、外からは見られません。
   *
   * この引く処理の直前に山札が空だった場合は、その時点の墓地から山札を再生成します。
   *
   * @param p_flags 山札から引きたい札の配列
   */
  public drawHandFlagAdd(p_flags: Array<OrderFlag>): void {
    p_flags.forEach((p_flag) => {
      this.FAddHands.push(this.drawFlag(p_flag));
    });
  }

  /**
   * 手札のうち一枚をオーダーチェンジします。
   * オーダーチェンジで捨てた札は速攻で墓地に行きます。
   *
   * オーダーチェンジで札を捨てた後、山札をひこうとした時に山札が空なら
   * 再生成を行います。
   *
   * @param p_change_index 手札のどれをオーダーチェンジするかインデックス値で指定します。
   * @param p_new_flag オーダーチェンジで出てきたフラッグ
   */
  public orderChange(p_change_index: number, p_new_flag: OrderFlag): void {
    // 手札は先に捨てる
    this.flags().graveyard().inclimentFlag(this.hands()[p_change_index]);

    // 山札が空なら再生成する
    if (this.FFlags.stack().isEmpty()) {
      this.FFlags.renewStack();
    }

    // 次に新たに山札から引いて手札と置き換える。
    this.hands().splice(p_change_index, 1, this.drawFlag(p_new_flag));
  }

  /**
   * 手札一式を墓地送りにして、ターンを終了します。
   * 現在の手札状況は初期化されます。
   */
  public turnEnd(): void {
    // 手札を墓地送り
    this.FHands.forEach((p_flag) => {
      this.FFlags.graveyard().inclimentFlag(p_flag);
    });
    this.FAddHands.forEach((p_flag) => {
      this.FFlags.graveyard().inclimentFlag(p_flag);
    });

    // 山札が空なら再生成
    if (this.FFlags.stack().isEmpty()) {
      this.FFlags.renewStack();
    }

    // スナップショットを記録しておく
    this.FTurnSnapShot.push(this.clone());

    // 初期化
    this.FHands = [];
    this.FAddHands = []
    this.FCurrentTurn += 1;

    // もし山札を最初に作る条件を満たしているのなら、この段階で先に山札再生成をする
    if (this.isStackRegeneration()) {
      this.FFlags.reserveRenewStack();
    }
  }

  /**
   * 手札を山札から一枚引きます。墓地には送りません。
   * 引いた後の手札は{@link BattleManager.hands}で参照できます。
   *
   * この引く処理の直前に山札が空だった場合は、その時点の墓地から山札を再生成します。
   *
   * @param p_flag 引きたいフラッグ
   * @returns p_flag がそのまま戻ってきます。
   */
  public drawFlag(p_flag: OrderFlag): OrderFlag {
    // 山札が空っぽだったら、今の墓地の状態から作り直す。
    if (this.FFlags.stack().isEmpty()) {
      this.FFlags.renewStack();
    }

    // まだ墓地には送らない
    this.FFlags.stack().declimentFlag(p_flag);

    return p_flag;
  }

  /**
   * 現在の山札及び墓地を参照します。
   * 基本的に直接書き換えるようなことはしないでください。
   *
   * @returns 現在の山札と墓地
   */
  public flags(): Readonly<OrderFlagManager> {
    return this.FFlags;
  }

  /**
   * 現在の手札を取得します。
   * 基本的に直接書き換えるようなことはしないでください。
   *
   * @returns 手札の配列
   */
  public hands(): OrderFlag[] {
    return this.FHands;
  }

  /**
   * 現在のターン番号を取得します。ターンは「1」から始まります。
   * @returns 今のターン数
   */
  public getCurrentTurn(): number {
    return this.FCurrentTurn;
  }

  /**
   * 現在の状態を複製した、新しい{@link BattleManager}のインスタンスを作ります。
   * このコピーはディープコピーです。
   *
   * @returns 現在の状態をコピーした新たな {@link BattleManager}
   */
  public clone(): BattleManager {
    let vNew: BattleManager = new BattleManager([]);
    vNew.FHands = [...this.FHands];
    vNew.FAddHands = [...this.FAddHands];
    vNew.FFlags = this.FFlags.clone();
    vNew.FTurnSnapShot = [...this.FTurnSnapShot];
    vNew.FCurrentTurn = this.FCurrentTurn;
    vNew.FNumberOfPeople = this.FNumberOfPeople;
    return vNew;
  }

  /**
   * ターン最初の山札予約をする必要があるかどうかを判定します。
   *
   * 具体的には、まだ予約山札を作っておらず、なおかつパーティー人数+3枚しか残っていない場合は墓地から山札を作らないといけません。
   * 4枚以上あれば作ってはいけません。
   *
   * @returns 予約の必要があればtrue、なければfalse
   */
  private isStackRegeneration(): boolean {
    return (!this.FFlags.isReservedRenewStack())
              && (this.FFlags.stack().getFlagCount() <= this.FNumberOfPeople + 3);
  }

  private FHands: OrderFlag[];
  private FAddHands: OrderFlag[];
  private FFlags: OrderFlagManager;
  private FTurnSnapShot: BattleManager[];
  private FCurrentTurn: number;
  private FNumberOfPeople: number;
}
