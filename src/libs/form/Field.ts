export type Fn<T> = (value: T) => boolean;

export class Field<T> {
  static init = <T>(value: T, fns: Fn<T>[] = []): Field<T> => new Field<T>(value, fns);

  public invalid: boolean;

  constructor(public value: T, private _fns: Fn<T>[] = []) {
    this.invalid = this._isInvalid(value);
  }

  private _isInvalid = (value: T): boolean => this._fns.some((fn) => fn(value));

  public set = (value: T): Field<T> => Field.init(value, this._fns);
}

export default Field;
