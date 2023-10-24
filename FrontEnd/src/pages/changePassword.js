import React, { useState } from 'react';
import '../styles/changePassword.css';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api'; 

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setPasswordMatch(false);
      return;
    }

    try {
      const response = await api.post(`/users/${id}/update-password`, {
        oldPassword,
        newPassword,
      });

      if (response.status === 200) {
        alert('Senha alterada com sucesso');
        navigate('/login');
      } else {
        alert('Ocorreu um erro ao alterar a senha. Verifique a senha antiga.');
      }
    } catch (error) {
      console.error('Erro ao alterar a senha:', error);
      alert('Ocorreu um erro ao alterar a senha. Por favor, tente novamente mais tarde.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container-change-password">
      <div className="box-change-password">
        <h1>Alterar Senha</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="oldPassword">Senha Antiga</label>
            <input
              type="password"
              className="form-control"
              id="oldPassword"
              value={oldPassword}
              onChange={handleOldPasswordChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Nova Senha</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmNewPassword">Confirmar Nova Senha</label>
            <input
              type="password"
              className="form-control"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
            />
            {!passwordMatch && <p className="password-match-error">As senhas não coincidem.</p>}
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">Alterar Senha</button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
