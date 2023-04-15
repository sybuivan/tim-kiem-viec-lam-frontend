import { MODAL_IDS } from 'src/constants';
import { useAppDispatch } from 'src/hooks';
import LoginForm from 'src/pages/auth/login_form';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import { saveJob, unSavedJob } from 'src/redux_store/user/user_action';
import { unSaveJobById } from 'src/redux_store/user/user_slice';
import { toastMessage } from 'src/utils/toast';
import { socketIo } from 'src/clients/socket';

export const useSaveJob = (token: string, id_job: string, id_user: string) => {
  const dispatch = useAppDispatch();

  const handleOnSave = () => {
    if (token) {
      dispatch(
        saveJob({
          id_job,
          id_user,
        })
      )
        .unwrap()
        .then(() => {
          toastMessage.success('Lưu thành công');
        });
    } else {
      dispatch(
        openModal({
          modalId: MODAL_IDS.login,
          dialogComponent: <LoginForm socket={socketIo} />,
        })
      );
    }
  };
  const handleOnUnSaved = () => {
    if (token) {
      dispatch(
        unSavedJob({
          id_job,
          id_user,
        })
      )
        .unwrap()
        .then(() => {
          toastMessage.success('Bỏ lưu thành công');
          dispatch(unSaveJobById(id_job));
        });
    }
  };
  return {
    handleOnUnSaved,
    handleOnSave,
  };
};
