import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import logo from "../../assets/logo-web.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUser } from "@fortawesome/free-solid-svg-icons";

import Modal from "../Modal";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [venderCarro, setVenderCarro] = useState(false);
  const user = localStorage.getItem("user");
  const userId = localStorage.getItem("id");

  const menuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (role === "USER") {
      setVenderCarro(true);
    }
    if (role === "ADMIN") {
      setShowItem(true);
    }
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    localStorage.clear();
    window.location.reload();
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="container-NavBar">
      <div className="container-logo">
        <a className="logo" href="/">
          <img src={logo} alt="Imagem da logo da empresa" />
        </a>
      </div>

      <div className="container-menu">
        <ul className="horizontal-list">
          {!showItem ? (
            <li>
              <a href="/">Comprar Carro</a>
            </li>
          ) : null}
          {!showItem && venderCarro ? (
            <li>
              <a href="/car-sale">Vender Carro</a>
            </li>
          ) : null}
          {!isLoggedIn ? (
            <li>
              <a href="/login">Vender Carro</a>
            </li>
          ) : null}
          {showItem ? (
            <li>
              <Modal buttonName="Adicionar Carro" modaTitle="Adicionar Carro" />
            </li>
          ) : null}
          {!showItem ? <li>Sobre Nós</li> : null}
          {isLoggedIn ? (
            <li className="li-logout" onClick={handleMenuClick} ref={menuRef}>
              <FontAwesomeIcon icon={faUser} /> {user}
              {showMenu && (
                <ul className="dropdown-menu">
                  <li className="dropdown-content" onClick={handleLogout}>
                    Logout
                  </li>
                  <li className="dropdown-content">
                    <a href={`/change-password/${userId}`}>Mudar Senha</a>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li>
              <a href="/login">
                <FontAwesomeIcon icon={faSignInAlt} /> Login{" "}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
