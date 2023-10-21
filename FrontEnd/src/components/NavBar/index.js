import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import logo from "../../assets/logo-web.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const user = localStorage.getItem("user");
  const menuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
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
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);

  };

  return (
    <div className="container-NavBar">
      <div className="container-logo">
        <img className="logo" src={logo} alt="Imagem da logo da empresa" />
      </div>

      <div className="container-menu">
        <ul className="horizontal-list">
          <li>Comprar Carro</li>
          <li>Vender Carro</li>
          <li>Sobre Nós</li>
          {isLoggedIn ? (
            <li className="li-logout" onClick={handleMenuClick} ref={menuRef}>
              <FontAwesomeIcon icon={faUser} /> {user}
              {showMenu && (
                <ul className="dropdown-menu">
                  <li className="dropdown-content" onClick={handleLogout}>
                    Logout
                  </li>
                  <li className="dropdown-content" >
                    Mudar Senha
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
