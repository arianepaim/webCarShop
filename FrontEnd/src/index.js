import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Rotas from './routes/Routes';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>    
    <Rotas />
  </React.StrictMode>
);
