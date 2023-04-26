import { Typography } from '@mui/material';
import React from 'react';
import ConfirmationDialog from 'src/components/modal/confirmation_dialog';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import { deleteJob } from 'src/redux_store/job/job_action';
import { toastMessage } from 'src/utils/toast';
import { updateUser } from 'src/redux_store/admin/admin_actions';

const UserLockModal = ({
  id_user,
  title,
  is_lock,
}: {
  id_user: string;
  title: string;
  is_lock: 0 | 1;
}) => {
  const dispatch = useAppDispatch();
  const handelUserLock = () => {
    dispatch(
      updateUser({
        id_user,
        is_lock,
      })
    )
      .unwrap()
      .then(() => {
        toastMessage.success(
          `${is_lock === 0 ? 'Mở khóa' : 'Khóa'} người dùng thành công`
        );
        dispatch(closeModal({ modalId: MODAL_IDS.userLockModal }));
      });
  };
  return (
    <ConfirmationDialog
      modalId={MODAL_IDS.userLockModal}
      describe={
        <Typography fontWeight="600" textAlign="center" fontSize="20px">
          {title}
        </Typography>
      }
      sliceName="job"
      functionName="deleteJob"
      callback={handelUserLock}
    />
  );
};

export default UserLockModal;
