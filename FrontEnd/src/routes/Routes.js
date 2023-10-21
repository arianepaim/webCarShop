import HomePage from "../pages/HomePage"
import Login from "../pages/Login"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

const Rotas = () => {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    </Router>
  );
}
export default Rotas;