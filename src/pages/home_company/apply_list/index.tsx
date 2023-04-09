import React, { useEffect, useMemo, useState } from 'react';
import { Grid, Box, Typography, Paper, Button } from '@mui/material';
import { AssignmentOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import ProfileHeader from 'src/components/profile_bar/header';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import theme from 'src/theme';
import { FormSelect } from 'src/components/hook_form';
import { COptionStatusApply } from 'src/constants/common';
import {
  getAllJobByIdCompany,
  getProfileAppliedByJob,
} from 'src/redux_store/company/company_action';
import EmptyData from 'src/components/empty_data';

const ApplyList = () => {
  const dispatch = useAppDispatch();
  const { control } = useForm({});
  const [job, setJob] = useState<{
    name_job: string;
    id_job: string;
  }>({
    name_job: '',
    id_job: '',
  });
  const {
    me: { id_company },
    jobList: { jobs },
    appliedJob: { applied, total },
  } = useAppSelector((state) => state.companySlice);

  useEffect(() => {
    dispatch(getAllJobByIdCompany(id_company));
  }, []);

  useEffect(() => {
    dispatch(
      getProfileAppliedByJob({
        id_company,
        id_job: job.id_job,
      })
    );
  }, [job]);

  const handleOnChange = (name_job: string, id_job: string) => {
    setJob({
      id_job,
      name_job: applied[0].name_job,
    });
  };

  const jobsOption = useMemo(
    () =>
      jobs.map((job) => {
        return {
          name_job: `${job.name_job} - ${moment(job.deadline).format(
            'DD/MM/YYYY'
          )}`,
          id_job: job.id_job,
        };
      }),
    [jobs]
  );

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
              {job.name_job ? job.name_job : 'Tất cả vị trí'}
            </Typography>
            <Typography variant="h6" color={theme.palette.error.main}>
              ({total} hồ sơ nộp)
            </Typography>
          </Box>
          <Box>
            <FormSelect
              name="status"
              placeholder="Tất cả vị trí"
              control={control}
              options={jobsOption}
              keyOption="id_job"
              labelOption="name_job"
              handleChange={handleOnChange}
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
            {applied.length > 0 ? (
              applied.map((apply) => <ProfileItem />)
            ) : (
              <EmptyData title="Chưa có người ứng tuyển" />
            )}
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
