import React from "react";
import "./App.css";
import HomePage from "./Components/HomePage";
import CharacterPage from "./Components/CharacterPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/character/:id" component={CharacterPage} />
      </Switch>
    </Router>
  );
}

export default App;
