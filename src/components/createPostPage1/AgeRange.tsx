import { useState } from "react";

function AgeRange() {
  const ageOptions = ["10대(성인)", "20대", "30대", "40대", "50대", "60대이상"];
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

export default AgeRange;
