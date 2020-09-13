import { Field, Fn } from '..';

describe('Field', () => {
  const req: Fn<any> = (value) => !value;

  it('assigns the correct values', () => {
    (() => {
      const fields = {
        code: new Field(2223),
        email: new Field('', []),
        username: new Field('', [req])
      };

      expect(fields.code.value).toBe(2223);
      expect(fields.email.value).toBe('');
      expect(fields.username.value).toBe('');
      expect(fields.code.invalid).toBeFalsy();
      expect(fields.email.invalid).toBeFalsy();
      expect(fields.username.invalid).toBeTruthy();
    })();

    (() => {
      const fields = {
        code: Field.init(2223),
        email: Field.init('', []),
        username: Field.init('', [req])
      };

      expect(fields.code.value).toBe(2223);
      expect(fields.email.value).toBe('');
      expect(fields.username.value).toBe('');
      expect(fields.code.invalid).toBeFalsy();
      expect(fields.email.invalid).toBeFalsy();
      expect(fields.username.invalid).toBeTruthy();
    })();
  });

  it('validates', () => {
    expect(Field.init(2223).invalid).toBeFalsy();
    expect(Field.init('', []).invalid).toBeFalsy();
    expect(Field.init('', [req]).invalid).toBeTruthy();
    expect(new Field(2223).invalid).toBeFalsy();
    expect(new Field('', []).invalid).toBeFalsy();
    expect(new Field('', [req]).invalid).toBeTruthy();
  });

  it('sets values', () => {
    expect(Field.init(2223).set(222).value).toBe(222);
    expect(Field.init('').set('d').value).toBe('d');
    expect(Field.init('').set('').value).toBe('');
    expect(new Field(2223).set(222).value).toBe(222);
    expect(new Field('').set('d').value).toBe('d');
    expect(new Field('').set('').value).toBe('');
  });
});