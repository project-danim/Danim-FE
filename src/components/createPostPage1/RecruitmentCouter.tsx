import { useState, useEffect } from "react";

function RecruitmentCouter() {
  const [count, setCount] = useState<number>(2);

  const incrementCount = () => {
    setCount((prevCount) => (prevCount < 10 ? prevCount + 1 : prevCount));
  };

  const decrementCount = () => {
    setCount((prevCount) => (prevCount > 2 ? prevCount - 1 : prevCount));
  };

  useEffect(() => {
    if (count < 2) {
      setCount(2);
    } else if (count > 10) {
      setCount(10);
    }
  }, [count]);
  return (
    <div>
      <button type="button" onClick={incrementCount}>
        +
      </button>
      <button type="button" onClick={decrementCount}>
        -
      </button>
      <p>Count : {count}</p>
    </div>
  );
}

export default RecruitmentCouter;
