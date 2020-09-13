import { Form, Errors, Config } from '..';

describe('Form', () => {
  interface RegisterData {
    code: number;
    email: string;
    username: string;
  }

  const minLength = (ln: number) => (value: string | any[]) => value.length < ln;

  describe('on init', () => {
    it('assigns values', () => {
      const initData: RegisterData = { code: 2223, email: '', username: 'piotr1994' };

      const run = ({ data, errors, keys, invalid }: Form<RegisterData>): void => {
        expect(data).toEqual(initData);
        expect(errors).toEqual({ code: false, email: false, username: false } as Errors<
          RegisterData
        >);
        expect(invalid).toBeFalsy();
        expect(keys).toEqual(Object.keys(data));
      };

      run(new Form(initData));
      run(Form.init(initData));
    });

    it('validates', () => {
      const initData: RegisterData = { code: 2223, email: '', username: '' };
      const config: Config<RegisterData> = { username: [minLength(4)] };

      const run = ({ errors, invalid }: Form<RegisterData>): void => {
        expect(errors).toEqual({ code: false, email: false, username: true } as Errors<
          RegisterData
        >);
        expect(invalid).toBeTruthy();
      };

      run(new Form(initData, config));
      run(Form.init(initData, config));
    });
  });

  describe('set()', () => {
    const initData: RegisterData = { code: 2223, email: '', username: '' };
    const testData: Partial<RegisterData> = {
      email: 'example@gmail.com',
      username: 'example-user'
    };

    it('updates data', () => {
      const test = (form: Form<RegisterData>): void => {
        form.set(testData);

        expect(form.data).toEqual({
          ...initData,
          ...testData
        });
      };

      test(new Form(initData));
      test(Form.init(initData));
    });

    it('validates', () => {
      const config: Config<RegisterData> = {
        code: [(value) => !value],
        email: [minLength(4)],
        username: [minLength(8)]
      };

      const test = (form: Form<RegisterData>): void => {
        form.set(testData);

        expect(form.errors).toEqual({
          code: false,
          email: false,
          username: false
        } as Errors<RegisterData>);
        expect(form.invalid).toBeFalsy();
      };

      test(new Form(initData, config));
      test(Form.init(initData, config));
    });
  });
});
