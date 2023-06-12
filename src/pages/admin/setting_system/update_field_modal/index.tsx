import { DeleteOutlineOutlined, SaveOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import React from 'react';

import BootstrapDialogTitle from 'src/components/modal/dialog_title';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { FormInput } from 'src/components/hook_form';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import { updateSettingCommon } from 'src/redux_store/admin/admin_actions';
import { toastMessage } from 'src/utils/toast';

const UpdateFieldModal = ({
  title_field,
  id,
  name,
  field,
  type,
}: {
  title_field: string;
  id: string;
  name: string;
  field: any;
  type: string;
}) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      [id]: field.id,
      [name]: field.name,
    },
  });
  const dispatch = useAppDispatch();
  const handleOnSubmit = (data: any) => {
    dispatch(
      updateSettingCommon({
        type: type,
        id: data[id],
        name: data[name],
      })
    )
      .unwrap()
      .then(() => {
        toastMessage.success('Sửa thành công');
        handleClose();
      });
  };
  const handleClose = () => {
    dispatch(
      closeModal({
        modalId: MODAL_IDS.updateFiedlModal,
      })
    );
  };
  return (
    <DialogWrapper
      modalId={MODAL_IDS.updateFiedlModal}
      minWidth={400}
      maxWidth={800}
    >
      <Box p={1}>
        <BootstrapDialogTitle onClose={handleClose}>
          <Typography fontSize="16px" fontWeight={600}>
            Chỉnh sửa {title_field}{' '}
          </Typography>
        </BootstrapDialogTitle>

        <Box>
          <Box py={2} component="form" onSubmit={handleSubmit(handleOnSubmit)}>
            <Grid container columnSpacing={3} rowSpacing={2}>
              <Grid item xs={12}>
                <FormInput
                  control={control}
                  label={`Mã ${title_field}`}
                  name={id}
                  placeholder={`Nhập mã ${title_field}`}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  control={control}
                  label={`Tên ${title_field}`}
                  name={name}
                  placeholder={`Nhập tên ${title_field}`}
                />
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end" py={2}>
              <Box display="flex" gap={2}>
                <Button
                  variant="outlined"
                  startIcon={<DeleteOutlineOutlined />}
                >
                  Hủy
                </Button>
                <LoadingButton
                  startIcon={<SaveOutlined />}
                  variant="contained"
                  onClick={handleSubmit(handleOnSubmit)}
                >
                  Sửa
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default UpdateFieldModal;
