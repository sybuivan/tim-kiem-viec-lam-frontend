import { LoadingButton } from '@mui/lab';
import { Box, Button, Chip, Tooltip, Typography } from '@mui/material';
import '@react-pdf-viewer/core/lib/styles/index.css';
import moment from 'moment';
import React, { useState } from 'react';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import SunEditorComponent from 'src/components/suneditor';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch, useAppSelector, useIsRequestPending } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import { updateStatusApplied } from 'src/redux_store/company/company_action';
import {
  changePayloadMail,
  resetMail,
} from 'src/redux_store/company/company_slices';
import theme from 'src/theme';
import { messageMail } from 'src/utils/common';
import { renderColorStatus, renderLabelStatus } from 'src/utils/function';
import { toastMessage } from 'src/utils/toast';

const MailerModal = () => {
  const dispatch = useAppDispatch();
  const {
    me: { id_company, name_company, phone, address },
  } = useAppSelector((state) => state.authSlice);
  const { timeMail } = useAppSelector((state) => state.companySlice);
  const isLoading = useIsRequestPending('company', 'updateStatusApplied');
  const [indexSelected, setIndex] = useState<number>(0);

  const handleClose = () => [
    dispatch(
      closeModal({
        modalId: MODAL_IDS.mailerModal,
      })
    ),
    dispatch(resetMail()),
  ];

  const handleOnSubmit = () => {
    dispatch(updateStatusApplied(timeMail))
      .unwrap()
      .then(() => {
        toastMessage.success('Xác nhận và gửi mail hồ sơ thành công');
        handleClose();
      });
  };

  const handleOnChange = (value: string, index: number) => {
    const newPayload = {
      ...timeMail[index],
      index,
      messageMailer: value,
    };
    dispatch(changePayloadMail(newPayload));
  };

  return (
    <DialogWrapper modalId={MODAL_IDS.mailerModal} minWidth={400}>
      <Box p={1}>
        <Box display="flex" gap={1} alignItems="center" mb={3}>
          <Typography fontSize="16px" fontWeight="600" my={1}>
            Xác nhận và gửi mail đến ứng viên:
          </Typography>
          <Box display="flex" gap={1}>
            {timeMail.map((item, index) => (
              <Tooltip title={renderLabelStatus(item.status)} arrow>
                <Chip
                  variant="outlined"
                  key={item.id_apply}
                  label={item.email}
                  onClick={() => setIndex(index)}
                  sx={{
                    background: renderColorStatus(item.status),
                    border: `1px solid ${
                      index === indexSelected
                    } ? #000 : #fff`,
                    color:
                      item.status === 0
                        ? theme.palette.common.black
                        : theme.palette.common.white,
                    '&:hover': {
                      background: `${renderColorStatus(item.status)}!important`,
                    },
                  }}
                />
              </Tooltip>
            ))}
          </Box>
        </Box>

        {timeMail.map((item, index) => (
          <>
            {indexSelected === index && (
              <>
                <SunEditorComponent
                  content={messageMail(
                    item.status,
                    item.name_job,
                    item.fullName,
                    phone,
                    name_company,
                    address,
                    moment(item.date).format('DD/MM/YYYY'),
                    moment(item.hour).format('HH:mm')
                  )}
                  onChange={(value: string) => handleOnChange(value, index)}
                  height="40vh"
                  key={item.id_apply}
                />
              </>
            )}
          </>
        ))}

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
