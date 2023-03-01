import React from 'react';
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
} from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

import theme from 'src/theme';
import { FormInput, FormSelect, FormSwitch } from 'src/components/hook_form';
import { CCitisOption } from 'src/constants/common';

const ProfileOnline = () => {
  const { control } = useForm({});
  const navigate = useNavigate();

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
              <Button
                variant="outlined"
                startIcon={<FileUploadOutlined />}
                component="label"
              >
                Tải file
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  //  onChange={handleOnChangeFile}
                />
              </Button>

              <Typography
                sx={{
                  color: theme.palette.secondary.contrastText,
                  py: 1,
                }}
              >
                Định dạng file .doc, .docx, .pdf
              </Typography>
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
                  Sỹ Bùi Văn
                </Typography>
                <Typography>Số điện thoại: 0947895039</Typography>
                <Typography>31/01/2001 - Nam - Độc thân</Typography>
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
                    name="fullName"
                    placeholder="E.g. Nhân viên kinh doanh"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormSelect
                    control={control}
                    name="city"
                    label="Nghề nghiệp "
                    placeholder="Chọn"
                    options={CCitisOption}
                    keyOption="name"
                    labelOption="name_with_type"
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormSelect
                    control={control}
                    name="city"
                    label="Cấp bậc hiện tại "
                    placeholder="Chọn"
                    options={CCitisOption}
                    keyOption="name"
                    labelOption="name_with_type"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormSelect
                    control={control}
                    name="city"
                    label="Cấp bậc mong muốn "
                    placeholder="Chọn"
                    options={CCitisOption}
                    keyOption="name"
                    labelOption="name_with_type"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    control={control}
                    label="Mức lương mong muốn"
                    name="fullName"
                    placeholder="0.0"
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormSelect
                    control={control}
                    name="city"
                    label="Trình độ học vấn "
                    placeholder="Chọn"
                    options={CCitisOption}
                    keyOption="name"
                    labelOption="name_with_type"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormSelect
                    control={control}
                    name="city"
                    label="Số năm kinh nghiệm"
                    placeholder="Chọn"
                    options={CCitisOption}
                    keyOption="name"
                    labelOption="name_with_type"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormSelect
                    control={control}
                    name="city"
                    label="Địa điểm làm việc"
                    placeholder="Chọn"
                    options={CCitisOption}
                    keyOption="name"
                    labelOption="name_with_type"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormSelect
                    control={control}
                    name="city"
                    label="Hình thức làm việc"
                    placeholder="Chọn"
                    options={CCitisOption}
                    keyOption="name"
                    labelOption="name_with_type"
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
                  <Chip label="Bắt buộc" size="small" />
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
                  <Chip label="Bắt buộc" size="small" />
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
                  <Chip label="Bắt buộc" size="small" />
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
              name="public"
              control={control}
              label="Cho phép nhà tuyển dụng tìm kiếm hồ sơ trực tuyến của bạn"
            />
            <Button
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
