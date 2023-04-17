import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from 'src/routes';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
import {
  getAllFollowUser,
  getSavedListByUser,
  getNotification,
  getSuggetJobForYou,
} from './redux_store/user/user_action';
import { getApplyList } from './redux_store/apply/apply_actions';
import { getAllField } from './redux_store/common/field/field_actions';
import { checkRoleUser } from './utils/common';
import { socketIo } from './clients/socket';
import { toastMessage } from './utils/toast';
import { changeNotification } from './redux_store/user/user_slice';
import { INotification } from './types/user';

function App() {
  const { token, me } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (checkRoleUser(me?.id_role, token)) {
      socketIo.emit('user_id', me?.id_user);
      dispatch(getSavedListByUser(me?.id_user));
      dispatch(getApplyList(me?.id_user));
      dispatch(getAllFollowUser(me?.id_user));
      dispatch(getAllField());
      dispatch(getNotification(me?.id_user));
      dispatch(getSuggetJobForYou());
    }
  }, []);

  useEffect(() => {
    socketIo.on(
      'notification',
      ({ message, notifi }: { message: string; notifi: INotification }) => {
        toastMessage.success(message);
        dispatch(changeNotification(notifi));
      }
    );
  }, [socketIo]);

  return useRoutes(routes(token));
}

export default App;
