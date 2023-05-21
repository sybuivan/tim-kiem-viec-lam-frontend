import { SendOutlined } from '@mui/icons-material';
import { Box, Avatar, Typography, Button } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormTextarea } from 'src/components/hook_form';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { createNewMessage } from 'src/redux_store/chat/chat_actions';
import theme from 'src/theme';
import { IApplyUser } from 'src/types/apply';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';

const MessageModal = ({ apply }: { apply: IApplyUser }) => {
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.authSlice);
  const {
    control,
    handleSubmit,
    formState: { isDirty, dirtyFields },
  } = useForm({
    defaultValues: {
      message: '',
    },
  });

  const handleOnSubmit = ({ message }: { message: string }) => {
    dispatch(
      createNewMessage({
        id_company: me.id_company,
        id_user: apply.id_user,
        message,
        sender: 'company',
        id_job: apply.id_job,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(closeModal({ modalId: MODAL_IDS.messageApplied }));
      });
  };

  return (
    <DialogWrapper modalId={MODAL_IDS.messageApplied} minWidth={800}>
      <Box p={1}>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          justifyContent="space-between"
          mb={1}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #c1c1c1',
              padding: '0 8px',
              height: ' 60px',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                '& h5': { fontWeight: '600' },
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src={apply.avatar}
                sx={{ width: '40px', height: '40px', mr: 2 }}
              />
              <Box>
                <Typography fontSize="16px" fontWeight="600">
                  {apply.fullName}
                </Typography>
                <Box display="flex" gap={1}>
                  <Typography
                    fontSize="14px"
                    fontWeight="600"
                    color={theme.palette.primary.main}
                  >
                    <strong
                      style={{
                        color: theme.palette.common.black,
                      }}
                    >
                      Vị trí:{' '}
                    </strong>
                    {apply.name_job}
                  </Typography>
                  <Typography
                    fontSize="14px"
                    fontWeight="600"
                    color={theme.palette.error.main}
                  >
                    <strong
                      style={{
                        color: theme.palette.common.black,
                      }}
                    >
                      Thời gian nộp:{' '}
                    </strong>
                    {moment(apply.created_at).format('MM/DD/YYYY')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box>
          <FormTextarea name="message" control={control} minRows={10} />

          <Box display="flex" justifyContent="flex-end" my={1}>
            <Button
              variant="contained"
              disabled={!dirtyFields.message}
              onClick={handleSubmit(handleOnSubmit)}
              endIcon={
                <SendOutlined
                  sx={{
                    color: theme.palette.common.white,
                  }}
                />
              }
              sx={{
                '&:hover': {
                  background: theme.palette.primary.main,
                },
              }}
            >
              Gửi tin nhắn
            </Button>
          </Box>
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default MessageModal;
