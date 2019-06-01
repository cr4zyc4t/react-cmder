import React, { useCallback } from "react";
import s from "./App.module.css";
import Section from "components/Section";
import Counter from "components/Counter";
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
          <a href="/" className={s["active"]}>Counter</a>
        </div>
        <input className={s["search-input"]} type="search" placeholder="Search..." onInput={inputHandler} />
      </div>
      <Section>
        <Counter />
      </Section>
    </div>
  );
}