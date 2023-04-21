import { SendOutlined } from '@mui/icons-material';
import { Box, Avatar, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { MODAL_IDS } from 'src/constants';
import { Viewer } from '@react-pdf-viewer/core';
import theme from 'src/theme';

import '@react-pdf-viewer/core/lib/styles/index.css';
import { IApplyUser } from 'src/types/apply';
import { useAppDispatch } from 'src/hooks';
import { updateStatusApplied } from 'src/redux_store/company/company_action';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import { updateStatusApllied } from 'src/redux_store/company/company_slices';

const ProfileModal = ({ apply }: { apply: IApplyUser }) => {
  const { id_apply, id_user, name_job, fullName, status } = apply;
  const dispatch = useAppDispatch();
  const handleOnLoad = () => {
    if (status === 0)
      dispatch(
        updateStatusApplied([{ id_apply, status: 2, id_user, name_job }])
      )
        .unwrap()
        .then(() => {
          dispatch(updateStatusApllied({ id_apply, status: 2 }));
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
    dispatch(updateStatusApplied([{ id_apply, status: 3, id_user, name_job }]))
      .unwrap()
      .then(() => {
        dispatch(updateStatusApllied({ id_apply, status: 3 }));
      });
  };

  return (
    <DialogWrapper modalId={MODAL_IDS.profileModal} minWidth={800}>
      <Box p={1}>
        <Typography
          fontSize="16px"
          color={theme.palette.primary.main}
          fontWeight="600"
          my={2}
        >
          CV ứng viên: {fullName}
        </Typography>
        <div
          style={{
            border: '1px solid rgba(0, 0, 0, 0.3)',
            height: '500px',
          }}
        >
          <Viewer
            fileUrl="https://arxiv.org/pdf/quant-ph/0410100.pdf"
            onDocumentLoad={handleOnLoad}
          />
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
