import { Navbar, Container, Nav, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { successLoginUsers } from '../store/actionCreator';
import Swal from 'sweetalert2';
import Notifications from './Notification';

const NavBar = () => {
  const { loggedInUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(successLoginUsers(''));
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `Logged Out`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <Navbar bg="dark" className="mb-4" style={{ height: '3.75rem' }}>
      <Container>
        <h3>
          <Link to="/" className="link-light text-decoration-none">
            Simple Chat App
          </Link>
        </h3>
        {loggedInUser && <span className="h5 text-success">Logged in as : {loggedInUser}</span>}
        <Nav>
          <Stack direction="horizontal" gap={4}>
            {!loggedInUser && (
              <>
                <Link to="/login" className="link-light text-decoration-none">
                  Login
                </Link>
                <Link to="/register" className="link-light text-decoration-none">
                  Register
                </Link>
              </>
            )}
            {loggedInUser && (
              <>
                <Notifications />
                <Link
                  onClick={() => {
                    handleLogout();
                  }}
                  to="/login"
                  className="link-light text-decoration-none">
                  Logout
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
