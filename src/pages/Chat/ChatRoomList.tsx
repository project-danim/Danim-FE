import { useState } from "react";
import * as Styled from "./ChatRoomListStyle";
import MyPostChatList from "./MyPostChatList";

function ChatRoomListPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <Styled.TabContainer>
        <Styled.TabButton
          active={activeTab === 0}
          onClick={() => handleTabClick(0)}
        >
          내 게시물 대화
        </Styled.TabButton>
        <Styled.TabButton
          active={activeTab === 1}
          onClick={() => handleTabClick(1)}
        >
          내가 신청한 대화
        </Styled.TabButton>
      </Styled.TabContainer>
      <Styled.TabContent>
        {activeTab === 0 && (
          <div>
            <MyPostChatList />
          </div>
        )}
        {activeTab === 1 && <div>Content for Tab 2</div>}
      </Styled.TabContent>
    </div>
  );
}

export default ChatRoomListPage;
