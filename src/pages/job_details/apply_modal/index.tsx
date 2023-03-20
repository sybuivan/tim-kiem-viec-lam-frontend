import { Typography, Box, Button, IconButton, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BootstrapDialogTitle from 'src/components/modal/dialog_title';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import {
  CircleOutlined,
  FileUploadOutlined,
  CheckCircleOutlineOutlined,
  PictureAsPdfOutlined,
} from '@mui/icons-material';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { MODAL_IDS } from 'src/constants';
import theme from 'src/theme';
import { FormInput } from 'src/components/hook_form';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import { LoadingButton } from '@mui/lab';
import moment from 'moment';
import { IApply } from 'src/types/apply';
import { applyJob } from 'src/redux_store/apply/apply_actions';
import { toastMessage } from 'src/utils/toast';

const ApplyModal = ({ id_job }: { id_job: string }) => {
  const dispatch = useAppDispatch();
  const [filePdf, setFilePdf] = useState<any>();

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isActiveFile, setIsActiveFile] = useState<boolean>(false);
  const {
    me,
    profileCV: { file_cv, file_name, created_at },
  } = useAppSelector((state) => state.userSlice);

  const { control, reset, handleSubmit } = useForm<IApply>({});

  useEffect(() => {
    reset(me);
  }, []);

  const handleCloseModal = () => {
    dispatch(
      closeModal({
        modalId: MODAL_IDS.apply,
      })
    );
  };

  const handleOnChangeFile = (e: any) => {
    setFilePdf(e.target.files[0]);
    setIsActive(false);
    setIsActiveFile(true);
  };

  const handleClick = () => {
    setIsActive((pre) => !pre);
    setIsActiveFile(false);
  };

  const handleClickFile = () => {
    setIsActiveFile(true);
    setIsActive(false);
  };

  const handleOnSubmit = (data: IApply) => {
    const { introducing_letter } = data;
    const formData = new FormData();
    if (filePdf) {
      formData.append('cv_file', filePdf, filePdf.name);
    }
    formData.append('id_user', me?.id_user);
    formData.append('id_job', id_job);
    formData.append('introducing_letter', '123');

    dispatch(applyJob(formData))
      .unwrap()
      .then(() => {
        toastMessage.success('Nộp hồ sơ thành công');
        handleCloseModal();
      });
  };
  return (
    <DialogWrapper
      modalId={MODAL_IDS.apply}
      sx={{
        width: '600px',
        height: '100%',
        '& h2 > button': {
          top: '10px!important',
        },
        '& h2': {
          marginBottom: '16px!important',
        },
      }}
    >
      <BootstrapDialogTitle onClose={handleCloseModal}>
        <Typography
          fontWeight="600"
          fontSize="12px"
          color={theme.palette.secondary.contrastText}
        >
          Ứng tuyển vào vị trí
        </Typography>
        <Typography fontWeight="600" fontSize="16px" py={1}>
          Nhân Viên Chăm Sóc Khách Hàng - Đi Làm Ngay
        </Typography>
        <Typography
          fontWeight="600"
          fontSize="12px"
          color={theme.palette.secondary.contrastText}
        >
          Công Ty TNHH Dksh Việt Nam
        </Typography>
      </BootstrapDialogTitle>
      <Box p={2} component="form" onSubmit={handleSubmit(handleOnSubmit)}>
        {filePdf?.name ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
            sx={{
              width: '100%',
              mb: 2,
              p: 1,
              border: '2px solid #2c95ff',
              borderRadius: '4px',
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton onClick={handleClickFile}>
                {isActiveFile ? (
                  <CheckCircleOutlineOutlined
                    sx={{
                      color: '#2c95ff',
                    }}
                  />
                ) : (
                  <CircleOutlined
                    sx={{
                      color: '#2c95ff',
                      cursor: 'pointer',
                    }}
                  />
                )}
              </IconButton>
              <Box>
                <Typography>{filePdf?.name}</Typography>
                <Typography
                  color="#2c95ff"
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  Xem hồ sơ
                </Typography>
              </Box>
            </Box>
            <Button
              startIcon={<FileUploadOutlined />}
              variant="outlined"
              component="label"
              sx={{
                py: 1,
              }}
            >
              Thay thế hồ sơ
              <input hidden type="file" onChange={handleOnChangeFile} />
            </Button>
          </Box>
        ) : (
          <Button
            startIcon={<FileUploadOutlined />}
            variant="outlined"
            component="label"
            sx={{
              width: '100%',
              mb: 2,
              py: 1,
            }}
          >
            Tải hồ sơ có sẵn
            <input hidden type="file" onChange={handleOnChangeFile} />
          </Button>
        )}

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          sx={{
            width: '100%',
            mb: 2,
            p: 1,
            border: '2px solid #2c95ff',
            borderRadius: '4px',
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton onClick={handleClick}>
              {isActive ? (
                <CircleRoundedIcon
                  sx={{
                    color: '#2c95ff',
                    cursor: 'pointer',
                  }}
                />
              ) : (
                <CircleOutlined
                  sx={{
                    color: '#2c95ff',
                    cursor: 'pointer',
                  }}
                />
              )}
            </IconButton>
            <Box>
              <Typography fontWeight="600">{file_name}</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography
                  display="flex"
                  alignItems="center"
                  fontSize="14px"
                  color={theme.palette.secondary.contrastText}
                >
                  <PictureAsPdfOutlined
                    sx={{
                      color: theme.palette.error.main,
                      fontSize: '14px',
                    }}
                  />
                  Hồ sơ đính kèm: {moment(created_at).format('DD/MM/YYYY')}
                </Typography>
                <Link
                  href={`${file_cv}`}
                  target="_blank"
                  color="#2c95ff"
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  Xem hồ sơ
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>

        <FormInput
          name="fullName"
          control={control}
          label="Họ và tên"
          disabled
        />
        <FormInput name="email" control={control} label="Email" disabled />
        <FormInput
          name="phone"
          control={control}
          label="Số điện thoại"
          disabled
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            sx={{ marginTop: 1 }}
            onClick={handleCloseModal}
          >
            Đóng
          </Button>
          <LoadingButton
            type="submit"
            // loading={isLoading}
            variant="contained"
            sx={{ marginTop: 1, ml: 1 }}
          >
            Nộp hồ sơ
          </LoadingButton>
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default ApplyModal;
