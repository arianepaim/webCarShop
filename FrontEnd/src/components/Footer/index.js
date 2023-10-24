import React from "react";
import "./styles.css";

const Footer = () => {
  return (
    <footer>
      <div>
        <h3>Contato</h3>
        <p>Endereço: Rua dos Carros, 123</p>
        <p>Telefone: (99) 9999-9999</p>
        <p>Email: contato@vendadecarros.com</p>
      </div>
      <div>
        <h3>Redes Sociais</h3>
        <ul>
          <li>
            <a href="https://www.facebook.com">Facebook</a>
          </li>
          <li>
            <a href="https://www.twitter.com">Twitter</a>
          </li>
          <li>
            <a href="https://www.instagram.com">Instagram</a>
          </li>
        </ul>
      </div>
      <div>
        <h3>Links Úteis</h3>
        <ul>
          <li>
            <a href="/sobre">Sobre Nós</a>
          </li>
          <li>
            <a href="/termos">Termos e Condições</a>
          </li>
          <li>
            <a href="/privacidade">Política de Privacidade</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
