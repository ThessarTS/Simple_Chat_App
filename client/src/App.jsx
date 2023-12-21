import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </>
  );
}

export default App;
