/**
 * @module OrderFlag
 * @author kame-bazooka
 * @license MIT License
 */

/**
 * オーダーフラッグの種類を表す列挙型
 */
export enum OrderFlagType {
  /**
   * Beat!!!フラッグ
   */
  Beat,
  /**
   * Action!フラッグ
   */
  Action,
  /**
   * Try!!フラッグ
   */
  Try
}

/**
 * オーダーフラッグの一枚を表すクラス
 */
export class OrderFlag {
  /**
   * コンストラクタ
   *
   * @param p_type
   *   オーダーフラッグのタイプ
   * @param p_number
   *   オーダーフラッグの数字。Beatの場合は省略してください。たとえ指定しても0扱いになります。
   */
  constructor (p_type: OrderFlagType, p_number?: number) {
    this.FType = p_type;
    this.FNumber = (p_type === OrderFlagType.Beat) ? 0 : (p_number ?? 0);
  }

  /**
   * このオーダーフラッグの種類を取得します。
   *
   * @returns オーダーフラッグの種類。
   */
  public getType(): OrderFlagType {
    return this.FType;
  }

  /**
   * オーダーフラッグの数字部を取得します。
   *
   * @returns このオーダーフラッグにセットされた数字
   */
  public getNumber(): number {
    return this.FNumber;
  }

  private FType: OrderFlagType;
  private FNumber: number;
}