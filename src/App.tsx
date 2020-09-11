import React from 'react';

import NaiveLoginForm from './libs/naive-form/examples/LoginForm';

import csx from './App.scss';

const App = () => {
  return (
    <div className={csx.app}>
      <div className={csx.wrapper} style={{ background: '#f6f6f6' }}>
        <h1>Naive implementation</h1>

        <NaiveLoginForm />
      </div>
    </div>
  );
};

export default App;
