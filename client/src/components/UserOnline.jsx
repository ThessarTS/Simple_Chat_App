import { useDispatch, useSelector } from 'react-redux';
import { findOrCreateChat } from '../store/actionCreator';

const UserOnline = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);

  return (
    <div className="all-users">
      {users.length > 0 &&
        users.map((user, idx) => {
          return (
            <div
              className="single-user"
              key={idx}
              onClick={(event) => {
                event.preventDefault();
                dispatch(findOrCreateChat({ userTwo: user.username }));
              }}>
              {user.username}
            </div>
          );
        })}
    </div>
  );
};

export default UserOnline;
