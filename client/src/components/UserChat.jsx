import { Stack } from 'react-bootstrap';

const UserChat = (otherUser) => {
  //   let otherUser;
  //   if (chat.userOne === user) {
  //     otherUser = chat.userTwo;
  //   } else {
  //     otherUser = chat.userOne;
  //   }
  return (
    <Stack direction="horizontal" className="align-item-center justify-content-between otherUser-card" gap={3}>
      <div className="d-flex">
        <div className="me2">avatar</div>
        <div className="text-content">
          <div className="name">{otherUser}</div>
          <div className="text">Text Message</div>
        </div>
      </div>
    </Stack>
  );
};

export default UserChat;
