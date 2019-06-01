import React, { useCallback } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import s from "./App.module.css";
import Home from "pages/Home";
import Profile from "pages/Profile";
import ErrorPage from "pages/ErrorPage";
export default function App() {
  const inputHandler = useCallback(e => {
    const {
      value,
    } = e.target;
    console.log("inputHandler -> value", value);
  }, []);
  return (
    <div className={s["app"]}>
      <div className={s["header"]}>
        <div className={s["nav"]}>
          <NavLink exact to="/" activeClassName={s["active"]}>Home</NavLink>
          <NavLink exact to="/profile" activeClassName={s["active"]}>Profile</NavLink>
          <NavLink exact to="/profile/john" activeClassName={s["active"]}>John</NavLink>
        </div>
        <input className={s["search-input"]} type="search" placeholder="Search..." onInput={inputHandler} />
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile/:user?" component={Profile} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}