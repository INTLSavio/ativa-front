import { BrowserRouter, Routes as Router, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { CarList } from '../pages/CarList';
import { CarAppointment } from '../pages/CarAppointment';
import { Success } from "../pages/Success";

export function Routes() {
  return (
    <BrowserRouter>
        <Router>
        <Route path="/" element={<Home />} />
        <Route path="/carros" element={<CarList />} />
        <Route path="/agendar/:id" element={<CarAppointment />} />
        <Route path="/sucesso" element={<Success />} />
        </Router>
    </BrowserRouter>
  );
}