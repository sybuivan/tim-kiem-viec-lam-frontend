import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from 'src/routes';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
import { getNotification, getMeUser } from './redux_store/user/user_action';
import { getApplyList } from './redux_store/apply/apply_actions';
import { getAllField } from './redux_store/common/field/field_actions';
import { checkRoleCompany, checkRoleUser } from './utils/common';
import { socketIo } from './clients/socket';
import { toastMessage } from './utils/toast';
import { changeNotification, logout } from './redux_store/user/user_slice';
import { resetState } from './redux_store/auth/authSlice';
import { INotification } from './types/user';

function App() {
  const { token, me } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
  console.log(process.env.REACT_APP_DEV_API_URL);
  useEffect(() => {
    if (checkRoleUser(me?.id_role, token)) {
      socketIo.emit('user_id', me?.id_user);
      dispatch(getApplyList(me?.id_user));
      dispatch(getAllField());
      dispatch(
        getMeUser({
          email: me?.email,
          id_role: me?.id_role,
        })
      )
        .unwrap()
        .catch((e: any) => {
          dispatch(logout(''));
          dispatch(resetState());
        });
    }

    if (checkRoleCompany(me?.id_role, token)) {
      socketIo.emit('user_id', me?.id_company);
      dispatch(getNotification(me?.id_company));
    }
    dispatch(getAllField());
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
