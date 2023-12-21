import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Stack, Row, Col, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { registerUser } from '../store/actionCreator';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [regForm, setRegForm] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    setRegForm({
      ...regForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    dispatch(registerUser(regForm))
      .then((data) => {
        localStorage.setItem('access_token', data.access_token);
        navigate('/');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Success register, Welcome ${data.username}`,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: `${error.response.data.message}`,
        });
      });
  };

  return (
    <>
      <Form onSubmit={handleRegister}>
        <Row
          style={{
            height: '80vh',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Col xs={5}>
            <Stack gap={3}>
              <h2 className="display-4 text-center text-light">Register</h2>
              <Form.Control type="text" placeholder="Username" name="username" onChange={handleChange} />
              <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
              <Button type="submit">Register</Button>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default RegisterPage;
