import { useRecoilState } from "recoil";
import { selectedAgeRangeState } from "../../recoil/post/postState";

function AgeRange() {
  const ageOptions = ["10대(성인)", "20대", "30대", "40대", "50대", "60대이상"];
  const [selectedValues, setSelectedValues] = useRecoilState(selectedAgeRangeState);

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

export default AgeRange;
