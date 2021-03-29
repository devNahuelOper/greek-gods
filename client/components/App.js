import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import GodsList from "./gods/GodsList";
import AbodesList from "./navigation/AbodesList";
import EmblemsList from "./navigation/EmblemsList";
import Create from "./create/Create";
// import "../../public/style.scss"; 

const App = () => (
  <div>
    <nav className="nav-links">
      <Link to="/">God Index</Link>
      <Link to="/new">Create</Link>
    </nav>
    <Switch>
      <Route exact path="/" component={GodsList} />
      <Route path="/abodes" component={AbodesList} />
      <Route path="/emblems" component={EmblemsList}/>
      <Route exact path="/new" component={Create}/>
    </Switch>
  </div>
);

export default App;
