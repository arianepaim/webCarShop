import CarDetailsPage from "../pages/Details";
import HomePage from "../pages/HomePage"
import Login from "../pages/Login"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "../pages/register";
import ChangePassword from "../pages/changePassword";
import CarSalePage from "../pages/CarSalePage";

const Rotas = () => {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/details' element={<CarDetailsPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/change-password/:id' element={<ChangePassword />} />
          <Route path='/car-sale' element={<CarSalePage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    </Router>
  );
}
export default Rotas;