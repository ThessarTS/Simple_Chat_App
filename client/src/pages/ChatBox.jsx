import React, { useEffect, useState } from 'react';
import { Send } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, fetchMessages, successfetchMessages, updateNotif } from '../store/actionCreator';
import { io } from 'socket.io-client';
import { Container, Stack } from 'react-bootstrap';
import { otherUserFinder } from '../utils/helpers';
import moment from 'moment';

function ChatBox() {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [input, setInput] = useState();
  const { currentChat, loggedInUser, notifications } = useSelector((state) => state);
  const [socket, setSocket] = useState(null);
  // const [notifications, setNotifications] = useState(null);

  const handdleSend = () => {
    dispatch(createMessage({ message: input, ChatId: currentChat.id }));
    setNewMessage({ message: input, ChatId: currentChat.id, sender: loggedInUser });
    setMessages([...messages, { message: input, ChatId: currentChat.id, sender: loggedInUser }]);
    setInput('');
  };

  console.log(messages);

  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    console.log(newSocket);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [loggedInUser]);

  useEffect(() => {
    if (socket == null) return;
    socket.emit('addNewUser', loggedInUser);
  }, [socket]);

  // send message
  useEffect(() => {
    if (socket === null) return;

    let receiver;
    if (currentChat.userOne === loggedInUser) {
      receiver = currentChat.userTwo;
    } else {
      receiver = currentChat.userOne;
    }

    socket.emit('sendMessage', { ...newMessage, receiver });
  }, [newMessage]);

  // receive message and notifications
  useEffect(() => {
    if (socket === null) return;

    socket.on('getMessage', (res) => {
      if (currentChat.id !== res.ChatId) return;

      setMessages((prev) => [...prev, res]);
    });

    socket.on('getNotification', (res) => {
      if (currentChat.userOne === res.sender || currentChat.userTwo === res.sender) {
        dispatch(updateNotif([{ ...res, isRead: true }, ...notifications]));
      } else {
        dispatch(updateNotif([res, ...notifications]));
      }
    });

    return () => {
      socket.off('getMessage');
      socket.off('getNotification');
    };
  }, [socket, currentChat]);

  useEffect(() => {
    dispatch(fetchMessages(currentChat.id)).then((response) => {
      setMessages(response);
    });
  }, [currentChat]);

  if (!currentChat) return <p style={{ textAlign: 'center', width: '100%' }}>No conversation selected yet..</p>;

  return (
    <Container>
      <Stack gap={4} className="chat-box">
        <div className="chat-header">
          <strong>{otherUserFinder(currentChat, loggedInUser)}</strong>
        </div>
        <Stack gap={3} className="messages scrollbar-none">
          {messages &&
            messages?.map((message, index) => (
              <Stack className={`${message?.sender === loggedInUser ? 'message self align-self-end flex-grow-0' : 'message align-self-start flex-grow-0'}`} key={index} ref={scroll}>
                <span>{message.message}</span>
                <span className="message-footer">{moment(message.createdAt).calendar()}</span>
              </Stack>
            ))}
        </Stack>
        <div className="d-flex pt-3">
          <textarea
            className="form-control shadow-none"
            placeholder="Write message here..."
            value={input}
            id=""
            cols="10"
            rows="1"
            onChange={(e) => {
              e.preventDefault();
              setInput(e.target.value);
            }}></textarea>
          <div className="text-white ms-2 rounded-circle d-flex justify-content-center align-items-center fw-bold" style={{ width: 45, height: 38, backgroundColor: '#266DE0' }} onClick={handdleSend}>
            <Send />
          </div>
        </div>
      </Stack>
    </Container>
  );
}

export default ChatBox;
