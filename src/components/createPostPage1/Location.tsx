import { useState } from "react";

function Location() {
  const keywordOptions = ["서울", "경기도", "인천", "대전", "대구", "부산", "울산", "광주", "제주", "강원도"];
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleOptionToggle = (keywordOption: string) => {
    setSelectedValue(keywordOption);
  };
  // console.log(`선택된 keywords`, selectedValue);
  return (
    <div>
      {keywordOptions.map((keywordOption) => (
        <button
          key={keywordOption}
          type="button"
          onClick={() => handleOptionToggle(keywordOption)}
          style={{
            background: selectedValue === keywordOption ? "green" : "gray",
          }}
        >
          {keywordOption}
        </button>
      ))}
    </div>
  );
}

export default Location;
