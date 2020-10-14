import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/UI/Header/Header";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      {/* routes => /login, /signup, /dashboard */}
      <Router>
        <Header />
        <div className="Container">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
