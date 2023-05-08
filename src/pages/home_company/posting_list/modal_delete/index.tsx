import { Typography } from '@mui/material';
import React from 'react';
import ConfirmationDialog from 'src/components/modal/confirmation_dialog';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import { deleteJob } from 'src/redux_store/job/job_action';
import { deleteJobById } from 'src/redux_store/job/job_slices';
import { toastMessage } from 'src/utils/toast';

const ModalDeletePost = ({
  id_job,
  id_company,
  is_lock,
  title,
}: {
  id_job: string;
  id_company: string;
  is_lock: 0 | 1;
  title: string;
}) => {
  const dispatch = useAppDispatch();
  const handelDelete = () => {
    dispatch(
      deleteJob({
        id_company,
        id_job,
        is_lock,
      })
    )
      .unwrap()
      .then(() => {
        toastMessage.success('Đã khóa thành công');
        dispatch(deleteJobById(id_job));
        dispatch(closeModal({ modalId: MODAL_IDS.deleteJob }));
      });
  };
  return (
    <ConfirmationDialog
      modalId={MODAL_IDS.deleteJob}
      describe={
        <Typography fontWeight="600" textAlign="center" fontSize="20px">
          {title}
        </Typography>
      }
      sliceName="job"
      functionName="deleteJob"
      callback={handelDelete}
    />
  );
};

export default ModalDeletePost;
