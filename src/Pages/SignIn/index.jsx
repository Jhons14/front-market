import { useState } from 'react';
import './index.css';
import { signIn } from '../../utils';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(email, password);
    console.log(sessionStorage.getItem('token'));

    if (!!sessionStorage.getItem('token')) {
      window.location.reload();
    } else {
      window.alert('Invalid email or password');
    }
  };

  return (
    <div className='signIn-container'>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          name='Sapo'
          id='email'
          placeholder='Email'
          autoComplete='username'
          onChange={handleEmail}
          value={email}
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='Sapo'
          id='password'
          placeholder='Password'
          onChange={handlePassword}
          autoComplete='current-password'
          value={password}
        />
        <button type='submit'>Sign In</button>
      </form>
    </div>
  );
}

export { SignIn };
