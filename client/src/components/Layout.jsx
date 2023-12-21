import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { findUser, successLoginUsers } from '../store/actionCreator';

export default function Layout() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      dispatch(findUser()).then((data) => {
        dispatch(successLoginUsers(data.username));
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <Container style={{ height: '80vh' }}>
        <Outlet />
      </Container>
    </>
  );
}
