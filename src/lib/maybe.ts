/**
 * 「値がある、またはない」のどちらかの値を持つクラスです。
 */
export class Maybe<T> {
  static just<T>(p_value: T): Maybe<T> {
    let vResult = new Maybe<T>();
    vResult.FHasValue = true;
    vResult.FValue = p_value;
    return vResult;
  }

  static ofNullable<T>(p_value: T | undefined | null): Maybe<T> {
    return p_value ? this.just(p_value) : this.nothing();
  }

  static nothing<T>(): Maybe<T> {
    return new Maybe<T>();
  }

  public getOrElse(p_nothing_call_func: () => T): T;
  public getOrElse(p_value: T): T;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public getOrElse(p_value: any): T {
    if (this.FHasValue && this.FValue) {
      return this.FValue;
    } else if (typeof p_value === "function") {
      return p_value();
    } else {
      return p_value;
    }
  }

  public get(): T {
    if (this.FHasValue && this.FValue) {
      return this.FValue;
    } else {
      throw new Error("non-integrated");
    }
  }

  public hasValue(): boolean {
    return this.FHasValue;
  }

  private constructor() {
    this.FHasValue = false;
    this.FValue = undefined;
  }

  private FHasValue: boolean;
  private FValue: T | undefined;
}
