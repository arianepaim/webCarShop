import React, { useState } from 'react';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';


function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/users/login", { email, password });    
      const data = await response.data;
      console.log('data', data.user.name)
      localStorage.setItem('token', data.token); 
      localStorage.setItem('user', data.user.name); 
      navigate('/');
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  }

  return (
    <div className='container-login'>
      <div className="box-login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
