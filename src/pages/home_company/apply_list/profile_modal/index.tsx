import { Box, Button, Typography } from '@mui/material';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import React, { useState } from 'react';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import { updateStatusApplied } from 'src/redux_store/company/company_action';
import { updateStatusApllied } from 'src/redux_store/company/company_slices';
import theme from 'src/theme';
import { IApplyUser } from 'src/types/apply';
import { messageMail } from 'src/utils/common';

const ProfileModal = ({ apply }: { apply: IApplyUser }) => {
  const {
    id_apply,
    id_user,
    name_job,
    fullName,
    status,
    introducing_letter,
    email,
    file_online,
    file_desktop,
  } = apply;
  const {
    me: { phone, name_company, address },
  } = useAppSelector((state) => state.authSlice);
  const [file, setFile] = useState<any>(() => {
    if (file_online) {
      return file_online;
    } else {
      return file_desktop;
    }
  });

  const dispatch = useAppDispatch();
  const handleOnLoad = () => {
    if (status === 0)
      dispatch(
        updateStatusApplied([
          {
            id_apply,
            status: 1,
            id_user,
            name_job,
            email,
            fullName,
            messageMailer: messageMail(
              1,
              name_job,
              fullName,
              phone,
              name_company,
              address
            ),
          },
        ])
      )
        .unwrap()
        .then(() => {
          dispatch(updateStatusApllied({ id_apply, status: 1 }));
        });
  };

  const handleClose = () => [
    dispatch(
      closeModal({
        modalId: MODAL_IDS.profileModal,
      })
    ),
  ];

  const handleOnRefuse = () => {
    dispatch(
      updateStatusApplied([
        {
          id_apply,
          status: 4,
          id_user,
          name_job,
          email,
          fullName,
          messageMailer: messageMail(
            status,
            name_job,
            fullName,
            phone,
            name_company,
            address
          ),
        },
      ])
    )
      .unwrap()
      .then(() => {
        dispatch(updateStatusApllied({ id_apply, status: 4 }));
      });
  };

  console.log({ file });

  return (
    <DialogWrapper modalId={MODAL_IDS.profileModal} minWidth={800}>
      <Box p={1}>
        <Typography
          fontSize="16px"
          color={theme.palette.primary.main}
          fontWeight="600"
          my={1}
        >
          CV ứng viên: {fullName}
        </Typography>

        <Typography
          fontSize="16px"
          color={theme.palette.primary.main}
          fontWeight="600"
          my={2}
        >
          Thư chào:{' '}
          <p
            style={{
              color: theme.palette.common.black,
              fontSize: '14px',
            }}
          >
            {' '}
            {introducing_letter}{' '}
          </p>
        </Typography>
        <div
          style={{
            border: '1px solid rgba(0, 0, 0, 0.3)',
            height: '500px',
          }}
        >
          <Viewer fileUrl={file} onDocumentLoad={handleOnLoad} />
        </div>

        <Box my={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            sx={{
              color: theme.palette.error.main,
            }}
            onClick={handleOnRefuse}
            disabled={status === 3}
          >
            Từ chối
          </Button>
          <Button variant="outlined" sx={{}} onClick={handleClose}>
            Đóng
          </Button>
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default ProfileModal;
