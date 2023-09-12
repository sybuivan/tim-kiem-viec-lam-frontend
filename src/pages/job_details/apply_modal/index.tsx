import { Typography, Box, Button, IconButton, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BootstrapDialogTitle from 'src/components/modal/dialog_title';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import {
  CircleOutlined,
  FileUploadOutlined,
  CheckCircleOutlineOutlined,
} from '@mui/icons-material';
import { MODAL_IDS } from 'src/constants';
import theme from 'src/theme';
import { FormInput, FormTextarea } from 'src/components/hook_form';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import { LoadingButton } from '@mui/lab';
import { IApply } from 'src/types/apply';
import { applyJob } from 'src/redux_store/apply/apply_actions';
import { toastMessage } from 'src/utils/toast';
import ChooseFileCV from './choose_file_cv';

const ApplyModal = ({
  id_job,
  name_company,
  name_job,
}: {
  id_job: string;
  name_company: string;
  name_job: string;
}) => {
  const dispatch = useAppDispatch();
  const [filePdf, setFilePdf] = useState<any>();

  const [idProfile, setIdProfile] = useState<string>('');
  const [isActiveFile, setIsActiveFile] = useState<boolean>(false);
  const { profileCV } = useAppSelector((state) => state.userSlice);
  const { me } = useAppSelector((state) => state.authSlice);

  const { control, reset, handleSubmit } = useForm<IApply>({});

  const renderProfile = () => {
    if (profileCV.length > 0) {
      return (
        <>
          {profileCV.map((item) => (
            <ChooseFileCV
              document={item}
              onClick={handleClick}
              idProfile={idProfile}
              key={item.id_profile}
            />
          ))}
        </>
      );
    }

    return <h1>Chọn</h1>;
  };

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
    setIdProfile('');
    setIsActiveFile(true);
  };

  const handleClick = (id_profile: string) => {
    setIdProfile(id_profile);
    setIsActiveFile(false);
  };

  const handleClickFile = () => {
    setIsActiveFile(true);
    setIdProfile('');
  };

  const handleOnSubmit = (data: IApply) => {
    const { introducing_letter } = data;
    const formData = new FormData();
    if (filePdf) {
      formData.append('cv_file', filePdf, filePdf.name);
    }
    if (idProfile) {
      formData.append('id_profile', idProfile);
    }

    if (!filePdf && !idProfile)
      return toastMessage.error('File CV không được bỏ trống');

    formData.append('id_user', me?.id_user);
    formData.append('id_job', id_job);
    formData.append('introducing_letter', introducing_letter);

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
        [theme.breakpoints.down('sm')]: {
          width: '100%',
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
          {name_job}
        </Typography>
        <Typography
          fontWeight="600"
          fontSize="12px"
          color={theme.palette.secondary.contrastText}
        >
          {name_company}
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

        {renderProfile()}

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
        <FormTextarea
          control={control}
          name="introducing_letter"
          label="Thư chào nhà tuyển dụng"
          placeholder="Nhập thư chào nhà tuyển dụng"
          minRows={6}
          required
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
