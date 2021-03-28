import React from "react";
import { Route } from "react-router-dom";
import GodsList from "./gods/GodsList";
import GodCreate from "./create/GodCreate";
import EmblemCreate from "./create/EmblemCreate";

const App = () => (
  <div>
    <Route exact path="/" component={GodsList} />
    <Route path="/gods/new" component={GodCreate}/>
    <Route path="/emblems/new" component={EmblemCreate}/>
  </div>
);

export default App;
