export type Errors<D> = {
  [K in keyof D]: boolean;
};

export interface Data {
  [key: string]: any;
}

export type Fn<T> = (value: T) => boolean;

export type Config<D> = {
  [K in keyof D]?: Fn<D[K]>[];
};

export class Form<D extends Data> {
  static init = <D extends Data>(data: D, config: Config<D> = {}): Form<D> => {
    return new Form<D>(data, config);
  };

  errors: Errors<D>;

  invalid = false;

  keys: (keyof D)[];

  constructor(public data: D, private _config: Config<D> = {}) {
    this._prepare();
  }

  private _prepare = () => {
    this._setKeys();
    this._setConfig();
    this._setErrors();
    this._setInvalid();
  };

  private _setKeys = () => {
    this.keys = Object.keys(this.data);
  };

  private _setConfig = (): void => {
    this._config = this.keys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: this._config[key] || []
      }),
      this._config
    );
  };

  private _setErrors = (): void => {
    this.errors = this.keys.reduce(
      (acc, key): Errors<D> => ({
        ...acc,
        [key]: this._config[key].some((fn) => fn(this.data[key]))
      }),
      {} as Errors<D>
    );
  };

  private _setInvalid = (): void => {
    this.invalid = this.keys.some((key) => this.errors[key]);
  };

  private _setData = (data: Partial<D>): void => {
    this.data = {
      ...this.data,
      ...data
    };
  };

  set = (data: Partial<D>): void => {
    this._setData(data);
    this._setErrors();
    this._setInvalid();
  };
}
