import { useState } from "react";

function Gender() {
  const ageOptions = ["남", "여"];
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleOptionToggle = (ageOption: string) => {
    if (selectedValues.includes(ageOption)) {
      setSelectedValues(selectedValues.filter((value) => value !== ageOption));
    } else {
      setSelectedValues([...selectedValues, ageOption]);
    }
  };

  // console.log(`선택된 나이대s`, selectedValues);

  return (
    <div>
      {ageOptions.map((ageOption) => (
        <button
          key={ageOption}
          type="button"
          onClick={() => handleOptionToggle(ageOption)}
          style={{
            background: selectedValues.includes(ageOption) ? "green" : "gray",
          }}
        >
          {ageOption}
        </button>
      ))}
    </div>
  );
}

export default Gender;
