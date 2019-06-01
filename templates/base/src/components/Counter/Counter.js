import React, { useCallback, useState } from "react";
import s from "./Counter.module.css";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const handleIncrease = useCallback(() => {
    setCounter(counter => counter + 1);
  }, []);
  const handleDecrease = useCallback(() => {
    setCounter(counter => counter - 1);
  }, []);
  return (
    <div className={s["container"]}>
      <button onClick={handleDecrease}> Decrease </button>
      {counter}
      <button onClick={handleIncrease}> Increase </button>
    </div>
  );
};

export default Counter;