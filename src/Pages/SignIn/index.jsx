import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './index.css';
import { authenticate } from '../../utils';

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      authenticate(email, password);
    } catch (error) {
      console.log(error);
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
          onChange={handleEmail}
          autocomplete='user-name'
          value={email}
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='Sapo'
          id='password'
          placeholder='Password'
          onChange={handlePassword}
          autocomplete='current-password'
          value={password}
        />
        <button type='submit'>Sign In</button>
      </form>
    </div>
  );
}

export { SignIn };
