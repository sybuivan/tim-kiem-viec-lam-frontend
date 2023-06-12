import { yupResolver } from '@hookform/resolvers/yup';
import {
  ArrowBackIosNewOutlined,
  CheckCircleRounded,
  ContactPageOutlined,
  DeleteForeverOutlined,
  EditOutlined,
  FileUploadOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Grid,
  IconButton,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { FormInput, FormSelect, FormSwitch } from 'src/components/hook_form';
import { baseURL } from 'src/config';
import { schemaProfileCV, typeFile } from 'src/constants/schema';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { getProfileCVById, updateCV } from 'src/redux_store/user/user_action';
import { resetProfileDetails } from 'src/redux_store/user/user_slice';
import theme from 'src/theme';
import { IPayLoadCV } from 'src/types/user';
import { toastMessage } from 'src/utils/toast';

const UpdateProfileOnline = () => {
  const { id_profile } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isInvalidFile, setIsInvalidFile] = useState<boolean>(false);
  const [file, setFile] = useState<any>();

  const { me } = useAppSelector((state) => state.authSlice);
  const { profile_detail } = useAppSelector((state) => state.userSlice);

  const {
    fieldList: {
      typerankfield,
      companyfield,
      experiencefield,
      workingformfield,
      cityfield,
    },
  } = useAppSelector((state) => state.commonSlice);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = useForm<IPayLoadCV>({
    defaultValues: profile_detail,
    resolver: yupResolver(schemaProfileCV),
  });

  useEffect(() => {
    if (id_profile)
      dispatch(getProfileCVById(id_profile))
        .unwrap()
        .then((profile_cv) => {
          reset(profile_cv);
        });

    return () => {
      dispatch(resetProfileDetails());
    };
  }, [id_profile]);

  const handleOnChangeFile = (e: any) => {
    if (typeFile.includes(e.target.files[0].type)) {
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
      id_city,
      file_name,
    } = data;
    const is_publicCV: any = is_public ? 1 : 0;
    const formData = new FormData();

    formData.append('id_user', me.id_user);
    formData.append('id_type_current', id_type_current);
    formData.append('id_type_desired', id_type_desired);
    formData.append('career_goals', career_goals);
    formData.append('desired_salary', desired_salary);
    formData.append('id_experience', id_experience);
    formData.append('id_working_form', id_working_form);
    formData.append('id_company_field', id_company_field);
    formData.append('is_public', is_publicCV);
    formData.append('id_city', id_city);
    if (profile_detail?.id_profile)
      formData.append('id_profile', profile_detail?.id_profile);

    if (!getValues('file_name'))
      return toastMessage.error('File CV không được bỏ trống');

    if (file) {
      formData.append('file_cv', file, file.name);
      formData.append('file_name', file.name);
    }
    dispatch(updateCV(formData))
      .unwrap()
      .then((data) => {
        toastMessage.success('Lưu hồ sơ thành công');
        navigate('/thong-tin-ca-nhan/ho-so');
      });
  };

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
          Chỉnh sửa hồ sơ trực tuyến
        </Typography>
      </Breadcrumbs>

      <Box display="flex" alignItems="center" py={2}>
        <IconButton>
          <ArrowBackIosNewOutlined />
        </IconButton>

        <Typography fontSize="20px">Chỉnh sửa hồ sơ đính kèm</Typography>
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
              {(file || getValues('file_name')) && (
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
                      {file?.name || profile_detail?.file_name}
                    </Typography>
                    <Link href={`${profile_detail?.file_cv}`} target="_blank">
                      Xem hồ sơ
                    </Link>
                  </Box>
                  <IconButton
                    onClick={() => {
                      setFile(null);
                      setIsInvalidFile(false);
                      setValue('file_name', '');
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
                src={`${baseURL}/${me?.avatar}`}
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
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormInput
                    control={control}
                    label="Vị trí mong muốn"
                    name="career_goals"
                    placeholder="E.g. Nhân viên kinh doanh"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormSelect
                    control={control}
                    name="id_company_field"
                    label="Nghề nghiệp "
                    placeholder="Chọn"
                    options={companyfield}
                    keyOption="id_companyField"
                    labelOption="name_field"
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormSelect
                    control={control}
                    name="id_type_current"
                    label="Cấp bậc hiện tại "
                    placeholder="Chọn"
                    options={typerankfield}
                    keyOption="id_rank"
                    labelOption="name_rank"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormSelect
                    control={control}
                    name="id_type_desired"
                    label="Cấp bậc mong muốn "
                    placeholder="Chọn"
                    options={typerankfield}
                    keyOption="id_rank"
                    labelOption="name_rank"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormInput
                    control={control}
                    label="Mức lương mong muốn"
                    name="desired_salary"
                    placeholder="0.0"
                    type="number"
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormSelect
                    control={control}
                    name="id_experience"
                    label="Số năm kinh nghiệm"
                    placeholder="Chọn"
                    options={experiencefield}
                    keyOption="id_experience"
                    labelOption="name_experience"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormSelect
                    control={control}
                    name="id_city"
                    label="Địa điểm làm việc"
                    placeholder="Chọn"
                    options={cityfield}
                    keyOption="id_city"
                    labelOption="name_city"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormSelect
                    control={control}
                    name="id_working_form"
                    label="Hình thức làm việc"
                    placeholder="Chọn"
                    options={workingformfield}
                    keyOption="id_working_form"
                    labelOption="name_working_form"
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
                  {file || getValues('file_name') ? (
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

      <Box
        position="fixed"
        bottom="0"
        right="0"
        sx={{
          left: '300px',
          [theme.breakpoints.down('md')]: {
            left: 0,
          },
        }}
      >
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

export default UpdateProfileOnline;
