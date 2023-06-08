// 검색 키워드 인터페이스
interface SearchKeyword {
  keyword?: string | null;
  searchKeyword?: string | null;
  location?: string | null;
  ageRange?: string | null;
  groupSize?: number | null;
}
export default SearchKeyword;
