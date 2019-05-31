import React, { useCallback } from "react";

import { CounterProps } from ".";

const Counter = ({ counter, increase, decrease, asyncIncrease }: CounterProps) => {
  const handleIncrease = useCallback(() => {
    increase(1);
  }, []);
  const handleDecrease = useCallback(() => {
    decrease(1);
  }, []);
  const handleAsyncIncrease = useCallback(() => {
    asyncIncrease(1);
  }, []);

  return (
    <div>
      <button onClick={handleDecrease} > Decrease </button>
      {counter}
      <button onClick={handleIncrease}> Increase </button>
      <button onClick={handleAsyncIncrease} > AsyncIncrease </button>
    </div>
  );
};
      
export default Counter;