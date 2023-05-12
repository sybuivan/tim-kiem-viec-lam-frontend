import { Box, Button, Chip, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import '@react-pdf-viewer/core/lib/styles/index.css';
import React from 'react';

import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch, useIsRequestPending } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import theme from 'src/theme';
import SunEditorComponent from 'src/components/suneditor';
import { toastMessage } from 'src/utils/toast';
import { updateStatusApplied } from 'src/redux_store/company/company_action';
import { renderColorStatus } from 'src/utils/function';

const messageMail = (status: number | string | any, name_job: string) => {
  return `<p><br>
   </p>
     <p style="text-align: start"><span style="font-size: 15px">Dear Value Candidate,</span></p>
   
     <p style="text-align: start"><span style="font-size: 15px">Thank you for sharing your interest ${name_job} in employment opportunities in Tera Group.</span></p>
   
     <p style="text-align: start"><span style="font-size: 15px">We would like to confirm that we have received your resume. We are going to review it carefully and need time to take the next step.&nbsp;</span></p>
   
     <p style="text-align: start"><span style="font-size: 15px">Please help note that the application with no response received within 2 weeks is considered as there is no vacancy at Tera Group currently matching your profile. However, we will keep your resume in our database for future reference.</span></p>
   
     <p style="text-align: start"><span style="font-size: 15px">If you have any concerns, please feel free to contact us via this email or phone number: 0763 201 051.</span></p>
   
     <p style="text-align: start"><span style="font-size: 15px">Once again, thank you for applying to Tera Group.</span></p>
   `;
};

const MailerModal = ({
  payload,
}: {
  payload: {
    id_apply: string;
    email: string;
    id_user: string;
    status: number | string | any;
    name_job: string;
  }[];
}) => {
  const dispatch = useAppDispatch();
  const isLoading = useIsRequestPending('company', 'updateStatusApplied');

  const handleClose = () => [
    dispatch(
      closeModal({
        modalId: MODAL_IDS.mailerModal,
      })
    ),
  ];

  const handleOnSubmit = () => {
    const newPayload = payload.map((item) => {
      return {
        ...item,
        messageMailer: messageMail(item.status, item.name_job),
      };
    });
    dispatch(updateStatusApplied(newPayload))
      .unwrap()
      .then(() => {
        toastMessage.success('Xác nhận và gửi mail hồ sơ thành công');
        handleClose();
      });
  };

  const handleOnChange = () => {};

  return (
    <DialogWrapper modalId={MODAL_IDS.mailerModal} minWidth={600}>
      <Box p={1}>
        <Box display="flex" gap={1} alignItems="center" mb={3}>
          <Typography fontSize="16px" fontWeight="600" my={1}>
            Xác nhận và gửi mail đến ứng viên:
          </Typography>
          <Box display="flex" gap={1}>
            {payload.map((item) => (
              <Chip
                variant="outlined"
                label={item.email}
                key={item.id_apply}
                sx={{
                  background: renderColorStatus(item.status),
                  color:
                    item.status === 0
                      ? theme.palette.common.black
                      : theme.palette.common.white,
                }}
              />
            ))}
          </Box>
        </Box>

        <SunEditorComponent
          content=""
          onChange={handleOnChange}
          height="30vh"
        />

        <Box my={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            sx={{
              color: theme.palette.error.main,
            }}
            onClick={handleClose}
          >
            Đóng
          </Button>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            sx={{}}
            onClick={handleOnSubmit}
          >
            Xác nhận và gửi mail
          </LoadingButton>
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default MailerModal;
