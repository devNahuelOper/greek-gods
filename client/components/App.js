import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import GodsList from "./gods/GodsList";
import GodCreate from "./create/GodCreate";
import EmblemCreate from "./create/EmblemCreate";
import AbodeCreate from "./create/AbodeCreate";

const App = () => (
  <div>
    <nav className="nav-links">
      <Link to="/">God Index</Link>
      <Link to="/emblems/new">Create Emblem</Link>
      <Link to="/abodes/new">Create Abode</Link>
    </nav>
    <Switch>
      <Route exact path="/" component={GodsList} />
      <Route path="/gods/new" component={GodCreate} />
      <Route path="/emblems/new" component={EmblemCreate} />
      <Route path="/abodes/new" component={AbodeCreate} />
    </Switch>
  </div>
);

export default App;
