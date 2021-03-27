import React from "react";
import { Route } from "react-router-dom";
import GodsList from "./gods/GodsList";
import GodCreate from "./create/GodCreate";

const App = () => (
  <div>
    <Route exact path="/" component={GodsList} />
    <Route path="/gods/new" component={GodCreate}/>
  </div>
);

export default App;
