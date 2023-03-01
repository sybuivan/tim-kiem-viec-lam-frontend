import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from 'src/routes';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
import { getSavedListByUser } from './redux_store/user/user_action';

function App() {
  const { token, me } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      dispatch(getSavedListByUser(me?.id_user));
    }
  }, []);

  return useRoutes(routes(token));
}

export default App;
