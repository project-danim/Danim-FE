import { useQuery } from "react-query";
import { getMyPostChatRoomList } from "../../api/chat";
// import * as Styled from "./ChatListTapComponentStyle";

// interface Post {
//   id: string;
//   title: string;
//   date: string;
//   author: string;
//   content: string;
// }

function MyPostChatList() {
  const {
    data: chatLists,
    isLoading,
    isError,
  } = useQuery("myPostChatRoomList", getMyPostChatRoomList);
  console.log(chatLists);

  // 대화하기 버튼 - 채팅창으로 이동
  // const handleClick = (postId: string) => {
  //   window.location.href = `api/${postId}`;
  // };

  if (isLoading) {
    return <div>로딩중 입니다</div>;
  }

  if (isError) {
    return <div>데이터를 불러오는 도중 문제가 발생했습니다.</div>;
  }

  return (
    <div>
      아아아아
      {/* {chatLists} */}
      {/* {chatLists.map((chat) => (
        <Styled.Container key={post.id}>
          <Styled.Title>{post.title}</Styled.Title>
          <Styled.Date>{post.date}</Styled.Date>
          <Styled.Author>{post.author}</Styled.Author>
          <Styled.Content>{post.content}</Styled.Content>
          <Styled.Button onClick={() => handleClick(post.id)}>버튼</Styled.Button>
        </Styled.Container>
      ))} */}
    </div>
  );
}

export default MyPostChatList;
