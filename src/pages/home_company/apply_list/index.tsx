import React, { useEffect } from 'react';
import { Grid, Box, Typography, Paper, Button } from '@mui/material';
import { AssignmentOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import ProfileHeader from 'src/components/profile_bar/header';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import { getListJobByCompany } from 'src/redux_store/job/job_action';
import theme from 'src/theme';
import { FormSelect } from 'src/components/hook_form';
import { COptionStatusApply, COptionJobs } from 'src/constants/common';

const ApplyList = () => {
  const dispatch = useAppDispatch();
  const { control } = useForm({});

  const {
    me: { id_company },
  } = useAppSelector((state) => state.companySlice);

  useEffect(() => {
    dispatch(getListJobByCompany(id_company));
  }, []);
  return (
    <Box>
      <ProfileHeader fullName="Hồ sơ ứng tuyển" title="" />

      <Paper
        sx={{
          p: 2,
          mt: 3,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={2}
          pb={4}
          sx={{
            borderBottom: '1px solid #c1c1c1',
          }}
        >
          <Box display="flex" gap={0.5}>
            <Typography variant="h6" fontWeight="600">
              Trợ lý dự án(Project Assistant)
            </Typography>
            <Typography variant="h6" color={theme.palette.error.main}>
              (5 hồ sơ nộp)
            </Typography>
          </Box>
          <Box>
            <FormSelect
              name="status"
              placeholder="Chọn vị trí"
              control={control}
              options={COptionJobs}
              keyOption="status"
              labelOption="label"
            />
          </Box>
          <Box>
            <Button variant="contained"> Gửi</Button>
          </Box>
        </Box>

        <Box>
          <Box
            py={2}
            sx={{
              borderBottom: '1px solid #c1c1c1',
            }}
          >
            <Grid container>
              <Grid item xs={3}>
                <Typography fontWeight="600">Tên hồ sơ</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography fontWeight="600">Vị trí ứng tuyền</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography fontWeight="600" textAlign="center">
                  Thời gian nộp
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontWeight="600" textAlign="center">
                  Loại hồ sơ
                </Typography>
              </Grid>
              <Grid item xs={1.5}>
                <Typography fontWeight="600" textAlign="center">
                  Trạng thái
                </Typography>
              </Grid>
              <Grid item xs={1.5}>
                <Typography fontWeight="600" textAlign="center">
                  Nhắn tin
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <ProfileItem />
            <ProfileItem />
            <ProfileItem />
            {/* <EmptyData title="Chưa có bài đăng tuyển dụng nào" /> */}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

const ProfileItem = ({
  fullName,
  age,
  position,
  position_nominee,
}: {
  fullName?: string;
  age?: number;
  position?: string;
  position_nominee?: string;
}) => {
  const dispatch = useAppDispatch();

  const { control } = useForm({});

  return (
    <Box
      py={2}
      sx={{
        borderBottom: '1px solid #c1c1c1',
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <Box>
            <Box display="flex" gap={1}>
              <Typography fontWeight="600">Bùi văn sỷ</Typography>
              <Typography fontWeight="500" color={theme.palette.grey[500]}>
                (25 tuổi)
              </Typography>
            </Box>
            <Box display="flex" gap={0.5}>
              <AssignmentOutlined
                sx={{
                  color: theme.palette.primary.light,
                  fontSize: '20px',
                }}
              />
              <Typography fontWeight="600">Project Mangager</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Typography fontWeight="500">
            Tro ly du an(Project Assistant)
          </Typography>
        </Grid>

        <Grid item xs={1}>
          <Typography textAlign="center">
            {moment(new Date()).format('MM/DD/YYYY')}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography textAlign="center">Nộp trực tuyến</Typography>
        </Grid>
        <Grid item xs={1.5}>
          <FormSelect
            name="status"
            placeholder="Chọn"
            control={control}
            options={COptionStatusApply}
            keyOption="status"
            labelOption="label"
          />
        </Grid>
        <Grid item xs={1.5}>
          <Button
            variant="outlined"
            startIcon={
              <SmsOutlinedIcon
                sx={{
                  color: theme.palette.success.main,
                }}
              />
            }
            sx={{
              ml: 1,
              color: theme.palette.success.main,
            }}
          >
            Nhắn tin
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApplyList;
