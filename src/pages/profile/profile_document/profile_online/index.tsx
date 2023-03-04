import React, { useEffect, useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  IconButton,
  Grid,
  Paper,
  Button,
  Chip,
} from '@mui/material';
import {
  ArrowBackIosNewOutlined,
  FileUploadOutlined,
  EditOutlined,
  ContactPageOutlined,
  WorkOutlineOutlined,
  DeleteForeverOutlined,
  CheckCircleRounded,
} from '@mui/icons-material';
import * as yup from 'yup';
import { toastMessage } from 'src/utils/toast';

import { useAppDispatch, useAppSelector } from 'src/hooks';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

import theme from 'src/theme';
import { FormInput, FormSelect, FormSwitch } from 'src/components/hook_form';
import {
  CCitisOption,
  CCompanyField,
  CExperience,
  CTypeRank,
  CWorkingForm,
} from 'src/constants/common';
import moment from 'moment';
import { messageRequired } from 'src/utils/common';
import { yupResolver } from '@hookform/resolvers/yup';
import { IPayLoadCV } from 'src/types/user';
import { createCV, getProfileCV } from 'src/redux_store/user/user_action';

const typeFile = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
];

const schema = yup.object().shape({
  career_goals: yup.string().required(messageRequired('Vị trí mong muốn')),
  id_company_field: yup.string().required(messageRequired('Nghề nghiệp')),
  id_type_current: yup.string().required(messageRequired('Cấp bậc hiện tại')),
  id_type_desired: yup.string().required(messageRequired('Cấp bậc mong muốn')),
  desired_salary: yup.number().required(messageRequired('Mức lương mong muốn')),
  id_experience: yup.string().required(messageRequired('Số năm kinh nghiệm')),
  id_working_form: yup.string().required(messageRequired('Hình thức làm việc')),
});

const ProfileOnline = () => {
  const { me, profileCV } = useAppSelector((state) => state.userSlice);
  const {
    control,
    handleSubmit,
    formState: { isDirty, dirtyFields, isValid },
  } = useForm<IPayLoadCV>({
    defaultValues: profileCV,
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isInvalidFile, setIsInvalidFile] = useState<boolean>(false);
  const [file, setFile] = useState<any>();

  const handleOnChangeFile = (e: any) => {
    if (typeFile.includes(e.target.files[0].type)) {
      //
      setFile(e.target.files[0]);
      setIsInvalidFile(false);
    } else {
      setIsInvalidFile(true);

      setFile(null);
    }
  };

  const handleOnSubmit = (data: IPayLoadCV) => {
    const {
      id_company_field,
      id_working_form,
      id_experience,
      desired_salary,
      id_type_current,
      id_type_desired,
      career_goals,
      is_public,
    } = data;
    const is_publicCV: any = is_public ? 1 : 0;
    const formData = new FormData();
    if (file) {
      formData.append('id_user', me.id_user);
      formData.append('id_type_current', id_type_current);
      formData.append('id_type_desired', id_type_desired);
      formData.append('career_goals', career_goals);
      formData.append('desired_salary', desired_salary);
      formData.append('id_experience', id_experience);
      formData.append('id_working_form', id_working_form);
      formData.append('id_company_field', id_company_field);
      formData.append('is_public', is_publicCV);
      formData.append('file_cv', file, file.name);
      formData.append('file_name', file.name);
      dispatch(createCV(formData))
        .unwrap()
        .then(() => {
          toastMessage.success('Lưu hồ sơ thành công');
        });
    } else {
      toastMessage.error('File CV không được bỏ trống');
    }
  };

  useEffect(() => {
    dispatch(getProfileCV(me.id_user));
  }, []);

  return (
    <Box pb="90px">
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          my: 2,
        }}
      >
        <Link underline="hover" color="inherit" href="/">
          Tài khoản của bạn
        </Link>
        <Typography color={theme.palette.primary.main} fontWeight="600">
          Tạo hồ sơ trực tuyến
        </Typography>
      </Breadcrumbs>

      <Box display="flex" alignItems="center" py={2}>
        <IconButton>
          <ArrowBackIosNewOutlined />
        </IconButton>

        <Typography fontSize="20px">Tạo hồ sơ đính kèm</Typography>
      </Box>

      <Grid container columnSpacing={3}>
        <Grid item xs={8}>
          <Paper
            sx={{
              mb: 2,
            }}
          >
            <Box
              p={2}
              sx={{
                borderBottom: '1px solid #adbebf',
              }}
            >
              <Typography fontSize="18px" fontWeight="600">
                Tải CV đính kèm
              </Typography>
            </Box>
            <Box p={2}>
              {(file || profileCV.file_cv) && (
                <Box
                  sx={{
                    border: '1px solid rgba(234,240,246,1)',
                    px: 2,
                    py: 1,
                    mb: 2,
                    borderRadius: '4px',
                    fontWeight: '600',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography fontWeight="600">
                      {file?.name || profileCV.file_cv}
                    </Typography>
                    <Link href={`http://localhost:5000/${profileCV.file_cv}`}>
                      Xem hồ sơ
                    </Link>
                  </Box>
                  <IconButton
                    onClick={() => {
                      setFile(null);
                      setIsInvalidFile(false);
                    }}
                  >
                    <DeleteForeverOutlined
                      sx={{
                        color: theme.palette.error.main,
                      }}
                    />
                  </IconButton>
                </Box>
              )}
              <Button
                variant="outlined"
                startIcon={<FileUploadOutlined />}
                component="label"
              >
                Tải file
                <input hidden type="file" onChange={handleOnChangeFile} />
              </Button>

              <Typography
                sx={{
                  color: theme.palette.secondary.contrastText,
                  py: 1,
                }}
              >
                Định dạng file .doc, .docx, .pdf
              </Typography>
              {isInvalidFile && (
                <Typography
                  sx={{
                    color: theme.palette.error.main,
                    py: 1,
                    fontWeight: '600',
                  }}
                >
                  File upload không hợp lệ. File phải có định dạng .pdf, .doc,
                  .docx
                </Typography>
              )}
            </Box>
          </Paper>

          <Paper
            sx={{
              mb: 2,
            }}
          >
            <Box
              p={2}
              sx={{
                borderBottom: '1px solid #adbebf',
              }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography fontSize="18px" fontWeight="600">
                Thông tin cá nhân
              </Typography>

              <Box
                onClick={() => {
                  navigate('/thong-tin-ca-nhan');
                }}
                display="flex"
                alignItems="center"
                gap={0.5}
                sx={{
                  cursor: 'pointer',
                  color: theme.palette.primary.main,
                  fontWeight: '600',
                }}
              >
                <EditOutlined />
                <Typography fontWeight="600">Cập nhật</Typography>
              </Box>
            </Box>

            <Box p={2} display="flex" gap={2} alignItems="center">
              <img
                width="100"
                height="100"
                style={{
                  borderRadius: '50%',
                }}
                alt=""
                src="https://cdn1.vieclam24h.vn/images/default/2023/02/28/B%C3%B9i%20V%C4%83n%20S%E1%BB%B7%20-%20Intern%20%20FE%20Nodejs%20-%20%C4%90%C3%A0%20N%E1%BA%B5ng_167755333021.jpg"
              />

              <Box>
                <Typography fontWeight="600" fontSize="17px">
                  {me.fullName}
                </Typography>
                <Typography>Số điện thoại: {me.phone}</Typography>
                <Typography>
                  {moment(me.birthday).format('DD/MM/YYYY')} - {me.gender}
                </Typography>
                <Typography>Quảng Trị Da nang</Typography>
              </Box>
            </Box>
          </Paper>

          <Paper>
            <Box
              p={2}
              sx={{
                borderBottom: '1px solid #adbebf',
              }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography fontSize="18px" fontWeight="600">
                Thông tin chung
              </Typography>
            </Box>

            <Box p={2} alignItems="center">
              <Grid container rowSpacing={1} columnSpacing={2}>
                <Grid item xs={12}>
                  <FormInput
                    control={control}
                    label="Vị trí mong muốn"
                    name="career_goals"
                    placeholder="E.g. Nhân viên kinh doanh"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormSelect
                    control={control}
                    name="id_company_field"
                    label="Nghề nghiệp "
                    placeholder="Chọn"
                    options={CCompanyField}
                    keyOption="id"
                    labelOption="label"
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormSelect
                    control={control}
                    name="id_type_current"
                    label="Cấp bậc hiện tại "
                    placeholder="Chọn"
                    options={CTypeRank}
                    keyOption="id"
                    labelOption="label"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormSelect
                    control={control}
                    name="id_type_desired"
                    label="Cấp bậc mong muốn "
                    placeholder="Chọn"
                    options={CTypeRank}
                    keyOption="id"
                    labelOption="label"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    control={control}
                    label="Mức lương mong muốn"
                    name="desired_salary"
                    placeholder="0.0"
                    type="number"
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormSelect
                    control={control}
                    name="id_experience"
                    label="Số năm kinh nghiệm"
                    placeholder="Chọn"
                    options={CExperience}
                    keyOption="id"
                    labelOption="label"
                  />
                </Grid>
                {/* <Grid item xs={6}>
                  <FormSelect
                    control={control}
                    name="city"
                    label="Địa điểm làm việc"
                    placeholder="Chọn"
                    options={CCitisOption}
                    keyOption="name"
                    labelOption="name_with_type"
                  />
                </Grid> */}
                <Grid item xs={6}>
                  <FormSelect
                    control={control}
                    name="id_working_form"
                    label="Hình thức làm việc"
                    placeholder="Chọn"
                    options={CWorkingForm}
                    keyOption="id"
                    labelOption="label"
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Box>
              <Typography
                fontWeight="600"
                fontSize="20px"
                textAlign="center"
                py={1}
              >
                Hồ sơ đính kèm của bạn
              </Typography>

              <Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  px={2}
                  py={1}
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.palette.grey[200],
                      cursor: 'pointer',
                    },
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <FileUploadOutlined
                      sx={{
                        color: theme.palette.secondary.main,
                      }}
                    />
                    <Typography>Tải CV đính kèm</Typography>
                  </Box>
                  {file || profileCV.file_cv ? (
                    <CheckCircleRounded
                      sx={{
                        color: theme.palette.success.main,
                      }}
                    />
                  ) : (
                    <Chip label="Bắt buộc" size="small" />
                  )}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  px={2}
                  py={1}
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.palette.grey[200],
                      cursor: 'pointer',
                    },
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <ContactPageOutlined
                      sx={{
                        color: theme.palette.secondary.main,
                      }}
                    />
                    <Typography>Thông tin cá nhân</Typography>
                  </Box>
                  {me.is_update_profle === 1 ? (
                    <CheckCircleRounded
                      sx={{
                        color: theme.palette.success.main,
                      }}
                    />
                  ) : (
                    <Chip label="Bắt buộc" size="small" />
                  )}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  px={2}
                  py={1}
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.palette.grey[200],
                      cursor: 'pointer',
                    },
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <WorkOutlineOutlined
                      sx={{
                        color: theme.palette.secondary.main,
                      }}
                    />
                    <Typography>Thông tin chung</Typography>
                  </Box>
                  {isValid ? (
                    <CheckCircleRounded
                      sx={{
                        color: theme.palette.success.main,
                      }}
                    />
                  ) : (
                    <Chip label="Bắt buộc" size="small" />
                  )}
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box position="fixed" bottom="0" right="0" left="330px">
        <Paper
          sx={{
            p: 2,
          }}
          variant="elevation"
        >
          <Box display="flex" justifyContent="space-between">
            <FormSwitch
              name="is_public"
              control={control}
              label="Cho phép nhà tuyển dụng tìm kiếm hồ sơ trực tuyến của bạn"
            />
            <Button
              onClick={handleSubmit(handleOnSubmit)}
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                minWidth: '180px',
              }}
            >
              Lưu và đăng hồ sơ
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProfileOnline;
