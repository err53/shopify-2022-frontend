import React from "react";
import { BrowserRouter } from "react-router-dom";
import Home from './pages/Home'

const App = () => (
  <BrowserRouter>
      <Home path="/:page" />
      <Home path="/" />
  </BrowserRouter>
)

export default App;
