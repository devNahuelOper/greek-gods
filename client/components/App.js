import React from "react";
import GodsList from "./gods/GodsList";
import { Route } from "react-router-dom";

const App = () => (
  <div>
    <Route exact path="/" component={GodsList} />
  </div>
);

export default App;
