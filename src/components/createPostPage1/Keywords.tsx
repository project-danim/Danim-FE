import { useRecoilState } from "recoil";
import { selectedKeywordState } from "../../recoil/post/postState";

function Keywords() {
  const keywordOptions = ["맛집탐방", "투어", "포토스팟", "성지순례", "쇼핑"];
  const [selectedValue, setSelectedValue] = useRecoilState(selectedKeywordState);

  const handleOptionToggle = (keywordOption: string) => {
    setSelectedValue(keywordOption);
  };
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

export default Keywords;
