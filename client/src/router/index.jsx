import { createBrowserRouter, redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ChatPage from '../pages/ChatPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/login',
        loader: () => {
          if (localStorage.getItem('access_token')) {
            throw redirect('/');
          }
          return null;
        },
        element: <LoginPage />,
      },
      {
        path: '/register',
        loader: () => {
          if (localStorage.getItem('access_token')) {
            throw redirect('/');
          }
          return null;
        },
        element: <RegisterPage />,
      },
      {
        path: '/',
        name: 'chat',
        loader: () => {
          if (!localStorage.getItem('access_token')) {
            throw redirect('/login');
          }
          return null;
        },
        element: <ChatPage />,
      },
    ],
  },
]);

export default router;
