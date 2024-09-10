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
    authenticate(email, password);
  };

  return (
    <div className='signIn-container'>
      <div>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <span>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                name='Sapo'
                id='email'
                placeholder='Email'
                onChange={handleEmail}
                autoComplete='user-name'
                value={email}
              />
            </span>
            <span>
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
            </span>
          </div>
          <button type='submit'>Sign In</button>
        </form>
      </div>
    </div>
  );
}

export { SignIn };
