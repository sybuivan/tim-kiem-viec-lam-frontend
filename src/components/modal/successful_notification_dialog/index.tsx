import React from 'react';
import { Dialog, DialogTitle, Button, Box } from '@mui/material';
import { Done } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import { IModalState } from 'src/types/modal';

import DialogTopIcon from '../dialog_top_icon';
import { useStyles } from './styles';

interface ISuccessfulNotificationDialogProps {
  content: string;
}

function SuccessfulNotificationDialog(props: ISuccessfulNotificationDialogProps) {
  const classes = useStyles();
  const modalState = useAppSelector(({ modalSlice }: { modalSlice: IModalState }) => modalSlice);
  const dispatch = useAppDispatch();
  const modal = modalState['successfulNotification'];

  const handleClose = () => {
    dispatch(closeModal({ modalId: 'successfulNotification' }));
  };

  return (
    <Dialog open={modal.open} classes={{ paper: classes.paper }}>
      <Box className={classes.dialog}>
        <DialogTopIcon icon={<Done fontSize="large" color="success" />} />
        <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}>
          {props.content}
        </DialogTitle>
        <Box className={classes.actionButton}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            OK
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

export default SuccessfulNotificationDialog;
