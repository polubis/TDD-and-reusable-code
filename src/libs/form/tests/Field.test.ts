import { Field } from '.';

describe('Field', () => {
  const req = (value: any): boolean => !value;

  it('assigns the correct values', () => {
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
  });

  it('validates', () => {
    expect(new Field(2223).invalid).toBeFalsy();
    expect(new Field('', []).invalid).toBeFalsy();
    expect(new Field('', [req]).invalid).toBeTruthy();
  });

  it('updates value', () => {
    expect(new Field(2223).set(222)).toBe(222);
    expect(new Field('').set('d')).toBe('d');
    expect(new Field('').set('')).toBe('');
  });
});
