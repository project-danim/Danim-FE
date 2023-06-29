import FilterBar from "../FilterBar";
import st from "./FilterBarMobileST";

function FilterBarMobile() {
  return (
    <div>
      <st.DanimSearchText>다님 검색하기</st.DanimSearchText>
      <FilterBar />
    </div>
  );
}
export default FilterBarMobile;
