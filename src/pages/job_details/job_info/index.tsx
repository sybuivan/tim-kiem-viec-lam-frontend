import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import {
  DateRangeOutlined,
  NotificationsOutlined,
  TimerOutlined,
  FavoriteBorderOutlined,
  FavoriteRounded,
} from '@mui/icons-material';
import theme from 'src/theme';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector, useSaveJob } from 'src/hooks';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import { MODAL_IDS } from 'src/constants';
import ApplyModal from '../apply_modal';
import { IJob } from 'src/types/job';
import moment from 'moment';
import { saveJob, unSavedJob } from 'src/redux_store/user/user_action';
import { toastMessage } from 'src/utils/toast';
import LoginForm from 'src/pages/auth/login_form';
import { checkIsSaveJob } from 'src/utils/common';
import { unSaveJobById } from 'src/redux_store/user/user_slice';

const JobInfo = ({ jobDetail }: { jobDetail: IJob }) => {
  const {
    token,
    me,
    saveJobList: { savedList },
  } = useAppSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleOnSave, handleOnUnSaved } = useSaveJob(
    token,
    jobDetail.id_job,
    me.id_user
  );

  const handleOnpenApply = () => {
    dispatch(
      openModal({
        modalId: MODAL_IDS.apply,
        dialogComponent: <ApplyModal />,
      })
    );
  };
  // const handleOnSave = () => {
  //   if (token) {
  //     dispatch(
  //       saveJob({
  //         id_job: jobDetail.id_job,
  //         id_user: me?.id_user,
  //       })
  //     )
  //       .unwrap()
  //       .then(() => {
  //         toastMessage.success('Lưu thành công');
  //       });
  //   } else {
  //     dispatch(
  //       openModal({
  //         modalId: MODAL_IDS.login,
  //         dialogComponent: <LoginForm />,
  //       })
  //     );
  //   }
  // };

  // const handleOnUnSaved = () => {
  //   if (token) {
  //     dispatch(
  //       unSavedJob({
  //         id_job: jobDetail.id_job,
  //         id_user: me?.id_user,
  //       })
  //     )
  //       .unwrap()
  //       .then(() => {
  //         toastMessage.success('Bỏ lưu thành công');
  //         dispatch(unSaveJobById(jobDetail.id_job));
  //       });
  //   }
  // };
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        py={3}
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => {
          navigate('/cong-ty/abc');
        }}
      >
        <img
          src={jobDetail.logo}
          alt=""
          width="100"
          height="100"
          style={{
            border: '1px solid #c1c1c1',
            borderRadius: '4px',
          }}
        />
        <Box display="flex" flexDirection="column">
          <Typography fontSize="20px" fontWeight="600">
            {jobDetail.name_company}
          </Typography>
          <Typography>Trên {jobDetail.total_people} người</Typography>
        </Box>
      </Box>

      <Box>
        <Box my={2}>
          <Typography fontSize="20px" fontWeight="600" py={2}>
            {jobDetail.name_job}
          </Typography>
          <Box display="flex" gap={2}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <DateRangeOutlined />
              <Typography>
                Hạn nộp hồ sơ: {moment(jobDetail.deadline).format('DD/MM/YYYY')}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <NotificationsOutlined />
              <Typography>Lượt xem: 1495</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <TimerOutlined />
              <Typography>
                Đăng ngày: {moment(jobDetail.created_at).format('DD/MM/YYYY')}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              px: 6,
              py: 2,
            }}
            onClick={handleOnpenApply}
          >
            Nộp hồ sơ
          </Button>
          {checkIsSaveJob(savedList, jobDetail.id_job) ? (
            <Button
              startIcon={<FavoriteRounded />}
              variant="outlined"
              sx={{
                px: 5,
                color: theme.palette.primary.main,
              }}
              onClick={handleOnUnSaved}
            >
              Đã lưu
            </Button>
          ) : (
            <>
              <Button
                startIcon={<FavoriteBorderOutlined />}
                variant="outlined"
                sx={{
                  px: 5,
                }}
                onClick={handleOnSave}
              >
                Lưu
              </Button>
            </>
          )}
        </Box>
        <Box
          borderTop={`1px solid ${theme.palette.primary.dark}`}
          my={4}
          borderBottom={`1px solid ${theme.palette.primary.dark}`}
          display="flex"
          justifyContent="space-between"
        >
          <Box py={2} borderRight="1px solid #c1c1c1" pr="110px">
            <Typography color={theme.palette.grey[600]} pb={2}>
              Yêu cầu kinh nghiệm
            </Typography>
            <Typography fontWeight="600">
              {jobDetail.name_experience}
            </Typography>
          </Box>
          <Box py={2} borderRight="1px solid #c1c1c1" pr="45px">
            <Typography color={theme.palette.grey[600]} pb={2}>
              Mức lương
            </Typography>
            <Typography fontWeight="600">{jobDetail.name_range}</Typography>
          </Box>
          <Box py={2} borderRight="1px solid #c1c1c1" pr="45px">
            <Typography color={theme.palette.grey[600]} pb={2}>
              Cấp bậc
            </Typography>
            <Typography fontWeight="600">{jobDetail.name_rank}</Typography>
          </Box>
          <Box py={2} pr="45px">
            <Typography color={theme.palette.grey[600]} pb={2}>
              Hình thức làm việc
            </Typography>
            <Typography fontWeight="600">Toàn thời gian cố định</Typography>
          </Box>
        </Box>

        <Box>
          <Typography fontWeight="600">Thông tin</Typography>

          <Grid container columnSpacing={1} rowSpacing={2}>
            <Grid item xs={6}>
              <Box display="flex">
                <Typography fontWeight="500" minWidth="40%">
                  Nghề nghiệp:
                </Typography>
                <Typography fontWeight="600">{jobDetail.name_field}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex">
                <Typography fontWeight="500" minWidth="40%">
                  Khu vực tuyển:
                </Typography>
                <Typography fontWeight="600">
                  {jobDetail.work_location}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex">
                <Typography fontWeight="500" minWidth="40%">
                  Số lượng tuyển:
                </Typography>
                <Typography fontWeight="600">
                  {jobDetail.total_number}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex">
                <Typography fontWeight="500" minWidth="40%">
                  Yêu cầu bằng cấp:
                </Typography>
                <Typography fontWeight="600">Cao đẳng</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex">
                <Typography fontWeight="500" minWidth="40%">
                  Hạn nộp hồ sơ:
                </Typography>
                <Typography fontWeight="600">
                  {moment(jobDetail.deadline).format('DD/MM/YYYY')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default JobInfo;
