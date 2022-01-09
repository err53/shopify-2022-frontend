import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:page" element={<Home />} />
    </Routes>
  </HashRouter>
)

export default App;
