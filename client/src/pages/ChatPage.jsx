import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserChats, fetchUsers, successFetchUsers, updateCurrentChat } from '../store/actionCreator';
import { Container, Stack } from 'react-bootstrap';
import ava from '../assets/undraw_male_avatar_g98d.svg';
import UserOnline from '../components/UserOnline';
import ChatBox from './ChatBox';
import { chatNotifCounter } from '../utils/helpers';

const ChatPage = () => {
  const { loggedInUser, userChats, notifications } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserChats());
  }, []);

  useEffect(() => {
    dispatch(fetchUsers()).then((data) => {
      let users = data.filter((user) => user.username !== loggedInUser);
      dispatch(successFetchUsers(users));
    });
  }, [userChats]);

  return (
    <Container>
      <UserOnline />
      <Stack direction="horizontal" gap={4} className="align-items-start">
        <Stack className="flex-grow-0 message-box" gap={3}>
          {userChats.length > 0 &&
            userChats.map((chat, idx) => {
              let otherUser;
              if (chat.userOne === loggedInUser) {
                otherUser = chat.userTwo;
              } else {
                otherUser = chat.userOne;
              }

              return (
                <Stack
                  key={idx}
                  direction="horizontal"
                  className="user-card align-item-center justify-content-between p-2"
                  role="button"
                  onClick={(event) => {
                    event.preventDefault();
                    dispatch(updateCurrentChat(chat));
                  }}>
                  <div className="d-flex">
                    <div className="me-2">
                      <img src={ava} alt="avatar" height={'40px'} />
                    </div>
                    <div className="text-content">
                      <div className="name">{otherUser}</div>
                      <div className="text">Text Message</div>
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <div className="date">20/12/2023</div>

                    <div className="this-user-notifications">{chatNotifCounter(notifications, otherUser)}</div>
                  </div>
                </Stack>
              );
            })}
        </Stack>
        <ChatBox />
      </Stack>
    </Container>
  );
};

export default ChatPage;
