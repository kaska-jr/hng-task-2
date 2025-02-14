import React from "react";
import BuyTicket from "../pages/BuyTicket/BuyTicket";
import { Route, Routes } from "react-router";
import Home from "../pages/Home/Home";

const AppRoute = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/buy-ticket" element={<BuyTicket />} />
    </Routes>
  );
};

export default AppRoute;
