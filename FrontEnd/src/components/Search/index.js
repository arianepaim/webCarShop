import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
  return (
    <div className="container-search">
        <input className="input-search" type="text" placeholder="Pesquisa"/>
        <FontAwesomeIcon icon={faSearch} className="icon-search"/>
    </div>
  );
};

export default Search;
