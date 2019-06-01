import React, { useCallback } from "react";
import s from "./Counter.module.css";

import { CounterProps } from ".";

const Counter = ({ counter, increase, decrease }: CounterProps) => {
  const handleIncrease = useCallback(() => {
    increase(1);
  }, [increase]);
  const handleDecrease = useCallback(() => {
    decrease(1);
  }, [decrease]);

  return (
    <div className={s["container"]}>
      <button onClick={handleDecrease} > Decrease </button>
      {counter}
      <button onClick={handleIncrease}> Increase </button>
    </div>
  );
};

export default Counter;