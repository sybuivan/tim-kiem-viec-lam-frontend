import { Box, Avatar, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormInputBase } from 'src/components/hook_form/form_input_base';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { MODAL_IDS } from 'src/constants';
import theme from 'src/theme';

const UserModal = () => {
  const { control } = useForm();
  return (
    <DialogWrapper modalId={MODAL_IDS.userMessage} minWidth={400}>
      <Box p={1}>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          justifyContent="space-between"
          mb={1}
        >
          <Typography fontWeight="600">Người dùng:</Typography>
          <Box
            sx={{
              border: '1px solid #c1c1c1',
              width: '75%',
              borderRadius: '4px',
            }}
          >
            <FormInputBase name="user" control={control} />
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '4px',
              p: 1,
              '&:hover': {
                cursor: 'pointer',
                background: theme.palette.grey[200],
              },
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={`http://localhost:5000/v1/}`}
              sx={{ width: '50px', height: '50px', mr: 2 }}
            />

            <Typography>Bùi Văn Sỷ</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '4px',
              p: 1,
              '&:hover': {
                cursor: 'pointer',
                background: theme.palette.grey[200],
              },
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={`http://localhost:5000/v1/}`}
              sx={{ width: '50px', height: '50px', mr: 2 }}
            />

            <Typography>Bùi Văn Sỷ</Typography>
          </Box>
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default UserModal;
