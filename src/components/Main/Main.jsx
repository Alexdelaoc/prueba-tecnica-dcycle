import React from "react";
import Prueba1 from "./Prueba1/Prueba1";
import Prueba2 from "./Prueba2/Prueba2";

import { Route, Routes } from "react-router-dom";

const Main = () => {
  return(
    <main className="main">
      <Routes>
        <Route element={<Prueba1/>} path="/prueba1"/>
        <Route element={<Prueba2/>} path="/prueba2"/>
      </Routes>
    </main>
  )
};

export default Main;
