import { Fields, Field, Fn } from '..';

describe('Fields', () => {
  const minLength = (ln: number): Fn<string | any[]> => (value) => value.length < ln;

  it('assigns fields', () => {
    const config = {
      email: new Field('', []),
      username: new Field('', []),
      code: new Field(222, [])
    };

    expect(Fields.init(config).data).toEqual(config);
    expect(new Fields(config).data).toEqual(config);
  });

  it('validates all', () => {
    (() => {
      const config = {
        email: new Field('', []),
        username: new Field('', []),
        code: new Field(222, [])
      };

      expect(Fields.init(config).invalid).toBeFalsy();
      expect(new Fields(config).invalid).toBeFalsy();
    })();

    (() => {
      const config = {
        email: new Field('', [minLength(2)]),
        username: new Field('', []),
        code: new Field(222, [])
      };

      expect(Fields.init(config).invalid).toBeTruthy();
      expect(new Fields(config).invalid).toBeTruthy();
    })();
  });

  it('partially updates data', () => {
    const config = {
      email: new Field('', []),
      username: new Field('', []),
      code: new Field(222, [])
    };

    const { set } = new Fields(config);

    expect(set({ email: 'piotr1994@gmail', username: '' }).data).toEqual({
      ...config,
      email: new Field('piotr1994@gmail')
    });
  });

  it('validates changed fields', () => {
    const config = {
      email: new Field('', [minLength(2)]),
      username: new Field('', []),
      code: new Field(222, [])
    };

    const { set } = new Fields(config);

    const updatedFields = set({ email: 'p', username: '' });

    expect(updatedFields.data).toEqual({
      ...config,
      email: new Field('p', [minLength(2)])
    });
    expect(updatedFields.invalid).toBeTruthy();
  });
});
