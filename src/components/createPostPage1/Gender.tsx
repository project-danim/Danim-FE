import { useRecoilState } from "recoil";
import { selectedGenderState } from "../../recoil/post/postState";

function Gender() {
  const ageOptions = ["남", "여"];
  const [selectedValues, setSelectedValues] = useRecoilState(selectedGenderState);

  const handleOptionToggle = (ageOption: string) => {
    if (selectedValues.includes(ageOption)) {
      setSelectedValues(selectedValues.filter((value) => value !== ageOption));
    } else {
      setSelectedValues([...selectedValues, ageOption]);
    }
  };

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
