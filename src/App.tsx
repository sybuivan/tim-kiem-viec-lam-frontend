import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from 'src/routes';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
import {
  getAllFollowUser,
  getSavedListByUser,
} from './redux_store/user/user_action';
import { getApplyList } from './redux_store/apply/apply_actions';
import { getAllField } from './redux_store/common/field/field_actions';
import { checkRoleUser } from './utils/common';

function App() {
  const { token, me } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (checkRoleUser(me?.id_role, token)) {
      dispatch(getSavedListByUser(me?.id_user));
      dispatch(getApplyList(me?.id_user));
      dispatch(getAllFollowUser(me?.id_user));
      dispatch(getAllField());
    }
  }, []);

  return useRoutes(routes(token));
}

export default App;
