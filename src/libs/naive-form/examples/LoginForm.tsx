import React, { useCallback, useState } from 'react';
import { Form, V } from '..';

interface LoginData {
  email: string;
  username: string;
}

const config: Form.Config = [
  { label: 'Email', fns: [V.req, V.email] },
  { label: 'Password', fns: [V.req, V.min(4), V.max(20)] }
];

const logIn = (data: LoginData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

const [EMAIL, PASSWORD] = [0, 1];

const LoginForm = () => {
  const [pending, setPending] = useState(false);

  const [{ fields, dirty, invalid }, change, directChange, submit] = Form.useManager(config);

  const handleSubmit = useCallback(
    async (e: Form.Events.Submit) => {
      const invalid = submit(e);

      if (!invalid) {
        setPending(true);

        await logIn({
          email: fields[0].value,
          username: fields[1].value
        });

        setPending(false);
      }
    },
    [fields]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input data-idx={EMAIL} value={fields[EMAIL].value} onChange={change} />
      <span>{dirty ? fields[EMAIL].error : ''}</span>

      <input data-idx={PASSWORD} value={fields[PASSWORD].value} onChange={change} />
      <span>{dirty ? fields[PASSWORD].error : ''}</span>

      <button type="submit" disabled={pending || (dirty && invalid)}>
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
