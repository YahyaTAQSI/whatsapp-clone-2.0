import { Avatar, Button, IconButton } from "@material-ui/core";
import { Chat, MoreVert, Search } from "@material-ui/icons";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chats from "./Chats";

export default function Sidebar() {
  const [user] = useAuthState(auth);

  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);

  const [chatsSnapshot] = useCollection(userChatRef);

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  const createChat = (e) => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
        <IconContainer>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </IconContainer>
      </Header>
      <SearchBar>
        <Search />
        <SearchInput placeholder="Search in Chats" />
      </SearchBar>
      <SidebarButton onClick={createChat}> Start a new Chat</SidebarButton>

      {chatsSnapshot?.docs.map((chat) => (
        <Chats key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  min-height: 350px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solide whitesmoke;
`;
const IconContainer = styled.div``;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
