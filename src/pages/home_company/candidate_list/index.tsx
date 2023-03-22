import React from 'react';
import { Box, Button, Link, Paper, Typography, Grid } from '@mui/material';
import {
  FavoriteRounded,
  LocalPhoneOutlined,
  BadgeOutlined,
  EmailOutlined,
  AssignmentOutlined,
} from '@mui/icons-material';
import { useAppSelector } from 'src/hooks';
import ProfileHeader from 'src/components/profile_bar/header';
import { JobCompany } from 'src/components/job_company';
import EmptyData from 'src/components/empty_data';
import theme from 'src/theme';
import { CandidateInfo } from '../saved_profile';
import { FormSelect, FormInput } from 'src/components/hook_form';
import { useForm } from 'react-hook-form';

const CandidateList = () => {
  const {
    saveJobList: { savedList },
    me,
  } = useAppSelector((state) => state.userSlice);
  const {
    companyfield,
    experiencefield,
    typerankfield,
    rangewagefield,
    workingformfield,
    cityfield,
  } = useAppSelector((state) => state.commonSlice.fieldList);

  const { control } = useForm({});
  return (
    <Box>
      <ProfileHeader fullName="Tìm kiếm ứng viên" title="" />
      <Paper>
        <Typography p={2} pb={0} fontWeight="600">
          Tìm kiếm lọc:
        </Typography>
        <Box display="flex" gap={2} alignItems="center" px={2} py={1}>
          <FormInput
            control={control}
            name="searchKeyword"
            placeholder="Tìm theo tên ứng viên"
            sx={{
              backgroundColor: theme.palette.common.white,
              borderRadius: '4px',
            }}
          />
          <FormSelect
            control={control}
            name="companyfield"
            placeholder="Tất cả nghề nghiệp"
            options={companyfield}
            keyOption="id_companyField"
            labelOption="name_field"
            sx={{
              backgroundColor: theme.palette.common.white,
              borderRadius: '4px',
            }}
          />
          <FormSelect
            control={control}
            name="city"
            placeholder="Tất cả tỉnh thành"
            options={cityfield}
            keyOption="id_city"
            labelOption="name_city"
            sx={{
              backgroundColor: theme.palette.common.white,
              borderRadius: '4px',
              color: theme.palette.common.white,
            }}
          />
          <Box height="38px">
            <Button
              variant="contained"
              sx={{
                padding: '8px',
                minWidth: '100px!important',
                backgroundColor: '#2c95ff',
              }}
            >
              Tìm kiếm
            </Button>
          </Box>
        </Box>

        <Box
          p={2}
          sx={{
            borderBottom: '1px solid #adbebf',
          }}
        >
          <Typography fontSize="18px" fontWeight="600">
            Danh sách ứng viên
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Grid container columnSpacing={1}>
            <CandidateInfo />
            <CandidateInfo />
            <CandidateInfo />
          </Grid>
          {/* ) : (
            <EmptyData title="Bạn chưa có việc làm đã lưu" />
          )} */}
        </Box>
      </Paper>
    </Box>
  );
};
export default CandidateList;
