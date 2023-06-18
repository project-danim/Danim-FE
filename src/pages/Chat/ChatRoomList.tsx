import { useState } from "react";
import * as Styled from "./ChatRoomListStyle";

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
          Tab 1
        </Styled.TabButton>
        <Styled.TabButton
          active={activeTab === 1}
          onClick={() => handleTabClick(1)}
        >
          Tab 2
        </Styled.TabButton>
      </Styled.TabContainer>
      <Styled.TabContent>
        {activeTab === 0 && <div>Content for Tab 1</div>}
        {activeTab === 1 && <div>Content for Tab 2</div>}
      </Styled.TabContent>
    </div>
  );
}

export default ChatRoomListPage;
