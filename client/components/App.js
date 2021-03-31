import React from "react";
import { Route, Switch } from "react-router-dom";
import GodsList from "./gods/GodsList";
import AbodesList from "./navigation/AbodesList";
import AbodeDetail from "./abode/AbodeDetail";
import EmblemsList from "./navigation/EmblemsList";
import Create from "./create/Create";
import Navigation from "./navigation/Navigation";
import GodDetail from "./gods/GodDetail";

const App = () => (
  <div>
    <Navigation />
    <Switch>
      <Route exact path="/" component={GodsList} />
      <Route path="/gods/:godId" component={GodDetail}/>
      <Route exact path="/gods" component={GodsList} />
      <Route path="/abodes/:abodeId" component={AbodeDetail} />
      <Route path="/abodes" component={AbodesList} />
      <Route path="/emblems" component={EmblemsList} />
      <Route exact path="/new" component={Create} />
    </Switch>
  </div>
);

export default App;
