import React, { useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLoginSubmit = (e) => {
    e.preventDefault();

    return axios.post('/api/auth/login', { username, password })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={onLoginSubmit}>
        <label>
          Username
          <input
            onChange={({ target: { value } }) => setUsername(value)}
          />
        </label>
        <label>
          Password
          <input
            onChange={({ target: { value } }) => setPassword(value)}
            type="password"
          />
        </label>
        <button>Login</button>
      </form>
    </>
  );
}

ReactDOM.render(
  <HomePage />,
  document.querySelector('#app'),
  () => {
    console.log('Application has rendered!');
  },
);
