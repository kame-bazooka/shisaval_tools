/**
 * 「成功、または失敗」のどちらかの値を持つクラスです。
 */
export class Either<L, R> {
  static left<L, R>(p_left: L): Either<L, R> {
    let vResult = new Either<L, R>();
    vResult.FIsRight = false;
    vResult.FLeft = p_left;
    vResult.FRight = undefined;
    return vResult;
  }

  static right<L, R>(p_right: R): Either<L, R> {
    let vResult = new Either<L, R>();
    vResult.FIsRight = true;
    vResult.FLeft = undefined;
    vResult.FRight = p_right;
    return vResult;
  }

  public getRight(): R {
    if (this.FIsRight && this.FRight) {
      return this.FRight;
    } else {
      throw new Error("non-integrated");
    }
  }

  public getLeft(): L {
    if (!this.FIsRight && this.FLeft) {
      return this.FLeft;
    } else {
      throw new Error("non-integrated");
    }
  }

  public isLeft(): boolean {
    return !this.FIsRight;
  }

  public isRight(): boolean {
    return this.FIsRight;
  }

  public swap(): Either<R, L> {
    return this.FIsRight ? Either.left<R, L>(this.getRight()) : Either.right<R, L>(this.getLeft());
  }

  public fold<T>(p_left: (p_left_val: L) => T, p_right: (p_right_val: R) => T): T {
    return this.FIsRight ? p_right(this.getRight()) : p_left(this.getLeft());
  }

  public flatMap<T>(p_function: (p_currnet: R) => Either<L, T>): Either<L, T> {
    return this.FIsRight ? p_function(this.getRight()) : Either.left<L, T>(this.getLeft());
  }

  public map<T>(p_function: (p_currnet: R) => T): Either<L, T> {
    return this.FIsRight ? Either.right<L, T>(p_function(this.getRight())) : Either.left<L, T>(this.getLeft());
  }

  /**
   * コンストラクタです
   *
   * Either は Either#left か Either#right で作るので
   * コンストラクタは private になっておりユーザーは使えません。
   */
  private constructor() {
    this.FIsRight = false;
    this.FLeft = undefined;
    this.FRight = undefined;
  }

  private FIsRight: boolean;
  private FLeft: L | undefined;
  private FRight: R | undefined;
}
