// roomId를 받아서 채팅 알람 배열의 roomId에 해당하는 알람 수 반환하는 함수

const getAlarmCount = (roomId: number) => {
  // 로컬에 저장된 채팅 알람 배열
  const stringChatAlarmArray = localStorage.getItem("chatAlarms");
  const stringRoomId = String(roomId); // includes 메서드 사용하기 위해 문자열 변환

  if (stringChatAlarmArray !== null) {
    // 문자열을 JSON 객체로 변환
    const chatAlarmArray = JSON.parse(stringChatAlarmArray);
    // 배열 안의 객체를 하나의 객체로 변환
    const mergedObject = Object.assign({}, ...chatAlarmArray); // assign(대상 객체, 출처 객체)-> 츨처 객체를 복사해서 대상객체에게 덮어씌움
    // 객체 안의 roomId들을 하나의 배열로 변환
    const roomIdArray = Object.keys(mergedObject); // [31, 36, 45...] 이런 형태임
    // roomId가 해당 배열에 있는지 검사
    if (roomIdArray.includes(stringRoomId)) {
      return mergedObject[stringRoomId];
    }
  }
  return false;
};
export default getAlarmCount;
