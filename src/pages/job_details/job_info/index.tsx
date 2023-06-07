import {
  DateRangeOutlined,
  FavoriteBorderOutlined,
  FavoriteRounded,
  NotificationsOutlined,
  TimerOutlined,
} from '@mui/icons-material';
import { BsFillChatDotsFill } from 'react-icons/bs';

import { Box, Button, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router';
import { socketIo } from 'src/clients/socket';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch, useAppSelector, useSaveJob } from 'src/hooks';
import LoginForm from 'src/pages/auth/login_form';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import theme from 'src/theme';
import { IJob } from 'src/types/job';
import { checkIsApply, checkIsSaveJob } from 'src/utils/common';
import ApplyModal from '../apply_modal';
import { IMessageJob } from 'src/types/chat';
import MessageJob from 'src/components/message_job';
import { baseURL } from 'src/config';

const JobInfo = ({ jobDetail }: { jobDetail: IJob }) => {
  const {
    saveJobList: { savedList },
  } = useAppSelector((state) => state.userSlice);
  const { token, me } = useAppSelector((state) => state.authSlice);

  const {
    applyList: { data },
  } = useAppSelector((state) => state.applySlice);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleOnSave, handleOnUnSaved } = useSaveJob(
    token,
    jobDetail.id_job,
    me?.id_user
  );

  const handleOnpenApply = () => {
    if (me?.id_user && jobDetail.name_company) {
      dispatch(
        openModal({
          modalId: MODAL_IDS.apply,
          dialogComponent: (
            <ApplyModal
              id_job={jobDetail.id_job}
              name_company={jobDetail.name_company}
              name_job={jobDetail.name_job}
            />
          ),
        })
      );
    } else {
      dispatch(
        openModal({
          modalId: MODAL_IDS.login,
          dialogComponent: <LoginForm socket={socketIo} />,
        })
      );
    }
  };

  const handleOpenMessage = () => {
    const { logo, name_job, name_company, id_company, id_job } = jobDetail;
    if (me?.id_user && name_company && logo && id_company) {
      const messageJob: IMessageJob = {
        id_company,
        id_job,
        id_user: me.id_user,
        logo,
        name_company,
        name_job,
      };

      dispatch(
        openModal({
          dialogComponent: <MessageJob job={messageJob} />,
          modalId: MODAL_IDS.messageJob,
        })
      );
    } else {
      dispatch(
        openModal({
          modalId: MODAL_IDS.login,
          dialogComponent: <LoginForm socket={socketIo} />,
        })
      );
    }
  };

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
          navigate(`/cong-ty/${jobDetail.id_company}`);
        }}
      >
        <img
          src={`${baseURL}/${jobDetail.logo}`}
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
              <TimerOutlined />
              <Typography>
                Đăng ngày: {moment(jobDetail.created_at).format('DD/MM/YYYY')}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box display="flex" gap={2}>
          {checkIsApply(data, jobDetail.id_job) ? (
            <Box
              sx={{
                color: theme.palette.warning.main,
                px: 6,
                py: 2,
                border: `1px solid ${theme.palette.warning.main}`,
                borderRadius: '4px',
                '&:hover': {
                  cursor: 'no-drop',
                },
              }}
            >
              Đã nộp hồ sơ
            </Box>
          ) : (
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
          )}
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
          <Button
            startIcon={<BsFillChatDotsFill />}
            variant="outlined"
            sx={{
              px: 5,
            }}
            onClick={handleOpenMessage}
          >
            Nhăn tin
          </Button>
        </Box>
        <Box
          borderTop={`1px solid ${theme.palette.primary.dark}`}
          my={4}
          borderBottom={`1px solid ${theme.palette.primary.dark}`}
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Box
            py={2}
            borderRight="1px solid #c1c1c1"
            pr="110px"
            sx={{
              [theme.breakpoints.down('sm')]: {
                border: 'none',
              },
            }}
          >
            <Typography color={theme.palette.grey[600]} pb={2}>
              Yêu cầu kinh nghiệm
            </Typography>
            <Typography fontWeight="600">
              {jobDetail.name_experience}
            </Typography>
          </Box>
          <Box
            py={2}
            borderRight="1px solid #c1c1c1"
            pr="45px"
            sx={{
              [theme.breakpoints.down('sm')]: {
                border: 'none',
              },
            }}
          >
            <Typography color={theme.palette.grey[600]} pb={2}>
              Mức lương
            </Typography>
            <Typography fontWeight="600">{jobDetail.name_range}</Typography>
          </Box>
          <Box
            py={2}
            borderRight="1px solid #c1c1c1"
            pr="45px"
            sx={{
              [theme.breakpoints.down('sm')]: {
                border: 'none',
              },
            }}
          >
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
            <Grid item lg={6} sm={6} xs={6}>
              <Box display="flex">
                <Typography fontWeight="500" minWidth="40%">
                  Nghề nghiệp:
                </Typography>
                <Typography fontWeight="600">{jobDetail.name_field}</Typography>
              </Box>
            </Grid>
            <Grid item lg={6} sm={6} xs={6}>
              <Box display="flex">
                <Typography fontWeight="500" minWidth="40%">
                  Địa điểm làm việc:
                </Typography>
                <Typography fontWeight="600">
                  {jobDetail.work_location}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={6} sm={6} xs={6}>
              <Box display="flex">
                <Typography fontWeight="500" minWidth="40%">
                  Số lượng tuyển:
                </Typography>
                <Typography fontWeight="600">
                  {jobDetail.size_number}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={6} sm={6} xs={6}>
              <Box display="flex">
                <Typography fontWeight="500" minWidth="40%">
                  Hạn nộp hồ sơ:
                </Typography>
                <Typography fontWeight="600">
                  {moment(jobDetail.deadline).format('DD/MM/YYYY')}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={6} sm={6} xs={6}>
              <Box display="flex">
                <Typography fontWeight="500" minWidth="40%">
                  Tỉnh thành:
                </Typography>
                <Typography fontWeight="600">
                  {jobDetail.cities?.map((item) => item.name_city).join(', ')}
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
