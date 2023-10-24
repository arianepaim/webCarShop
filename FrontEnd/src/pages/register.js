import React, { useState } from 'react';
import '../styles/register.css';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const validatePassword = (password) => {
    const validation = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[@#$%^&+=]/.test(password),
    };
    setPasswordValidation(validation);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      // Enviar os dados de registro para o servidor

      const response = await api.post('/users', {
        name,
        email,
        password,
      });
      
      if (response.status === 201) { // 201 é o código de status para criação bem-sucedida
        // Registro bem-sucedido, redirecionar para a página de login
        navigate('/login');
      } else {
        // Lidar com erros de registro
        const errorData = response.data;
        alert(errorData.message);
      }
      
    } catch (error) {
      console.error('Erro ao registrar:', error);
      alert('Ocorreu um erro ao registrar. Por favor, tente novamente mais tarde.');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container-register">
      <div className="box-register">
        <h1>Registro</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="password-validation">
              <ul>
                <li className={passwordValidation.length ? 'valid' : 'invalid'}>
                  A senha deve conter pelo menos 8 caracteres.
                </li>
                <li className={passwordValidation.lowercase ? 'valid' : 'invalid'}>
                  A senha deve conter pelo menos uma letra minúscula.
                </li>
                <li className={passwordValidation.uppercase ? 'valid' : 'invalid'}>
                  A senha deve conter pelo menos uma letra maiúscula.
                </li>
                <li className={passwordValidation.number ? 'valid' : 'invalid'}>
                  A senha deve conter pelo menos um número.
                </li>
                <li className={passwordValidation.specialChar ? 'valid' : 'invalid'}>
                  A senha deve conter pelo menos um caractere especial (@#$%^&+=).
                </li>
              </ul>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Registrar</button>
        </form>
        <div className="login-link">
          <p>Já tem uma conta? <button className="login-button" onClick={handleLogin}>Faça login</button></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
