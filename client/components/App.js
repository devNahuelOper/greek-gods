import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import GodsList from "./gods/GodsList";
import AbodesList from "./navigation/AbodesList";
import EmblemsList from "./navigation/EmblemsList";
import Create from "./create/Create";
import Navigation from "./navigation/Navigation";
// import "../../public/style.scss"; 

const App = () => (
  <div>
    <Navigation />
    <Switch>
      <Route exact path="/" component={GodsList} />
      <Route path="/gods" component={GodsList} />
      <Route path="/abodes" component={AbodesList} />
      <Route path="/emblems" component={EmblemsList} />
      <Route exact path="/new" component={Create} />
    </Switch>
  </div>
);

export default App;
