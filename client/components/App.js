import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import GodsList from "./gods/GodsList";
import GodCreate from "./create/GodCreate";
import EmblemCreate from "./create/EmblemCreate";
import AbodeCreate from "./create/AbodeCreate";
import Create from "./create/Create";

const App = () => (
  <div>
    <nav className="nav-links">
      <Link to="/">God Index</Link>
      <Link to="/new">Create</Link>
    </nav>
    <Switch>
      <Route exact path="/" component={GodsList} />
      <Route exact path="/new" component={Create}/>
    </Switch>
  </div>
);

export default App;
