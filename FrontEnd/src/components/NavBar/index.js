import "./styles.css";
import logo from '../../assets/logo-web.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
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
          <li><FontAwesomeIcon icon={faSignInAlt} /> Login </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
