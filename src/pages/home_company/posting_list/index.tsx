import React, { useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  Paper,
  IconButton,
  Chip,
  Tooltip,
} from '@mui/material';
import AutoFixNormalOutlinedIcon from '@mui/icons-material/AutoFixNormalOutlined';
import { AutoFixNormalOutlined, LockOpenOutlined } from '@mui/icons-material';

import moment from 'moment';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import ProfileHeader from 'src/components/profile_bar/header';

import { getListJobByCompany } from 'src/redux_store/job/job_action';
import { IJob } from 'src/types/job';
import theme from 'src/theme';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import ModalDeletePost from './modal_delete';
import { MODAL_IDS } from 'src/constants';
import EmptyData from 'src/components/empty_data';
import { useNavigate } from 'react-router';

const PostingList = () => {
  const dispatch = useAppDispatch();
  const {
    me: { id_company },
  } = useAppSelector((state) => state.authSlice);
  const { jobListCompany } = useAppSelector((state) => state.jobSlice);

  useEffect(() => {
    dispatch(getListJobByCompany(id_company));
  }, []);
  return (
    <Box>
      <ProfileHeader fullName="Danh sách đăng tin" title="" />

      <Paper
        sx={{
          p: 2,
          mt: 3,
        }}
      >
        <Box>
          <Box
            py={2}
            sx={{
              borderBottom: '1px solid #c1c1c1',
              [theme.breakpoints.down('md')]: { display: 'none' },
            }}
          >
            <Grid container>
              <Grid item xs={4}>
                <Typography fontWeight="600">Tên tin</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography fontWeight="600">Ngày đăng</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontWeight="600" textAlign="center">
                  Thời hạn nộp
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography fontWeight="600" textAlign="center">
                  Lượt nộp
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontWeight="600" textAlign="center">
                  Trạng thái
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontWeight="600" textAlign="center">
                  Hành động
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box>
            {jobListCompany.data.length > 0 ? (
              <Grid container columnSpacing={1}>
                {jobListCompany.data.map((job) => (
                  <Grid item lg={12} md={12} sm={6} xs={6}>
                    <PostItem job={job} key={job.id_job} />
                  </Grid>
                ))}{' '}
              </Grid>
            ) : (
              <EmptyData title="Chưa có bài đăng tuyển dụng nào" />
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

const PostItem = ({ job }: { job: IJob }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    me: { id_company },
  } = useAppSelector((state) => state.authSlice);

  const handelOnpenModalDelete = () => {
    dispatch(
      openModal({
        dialogComponent: (
          <ModalDeletePost
            id_job={job.id_job}
            id_company={id_company}
            is_lock={job.is_lock === 0 ? 1 : 0}
            title={
              job.is_lock === 1
                ? 'Bạn có mở khóa bài tin này không?'
                : 'Bạn có muốn khóa tin này không?'
            }
          />
        ),
        modalId: MODAL_IDS.deleteJob,
      })
    );
  };
  return (
    <Box
      py={2}
      sx={{
        borderBottom: '1px solid #c1c1c1',
      }}
    >
      <Grid container alignItems="center">
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Box>
            <Typography
              fontWeight="600"
              sx={{
                [theme.breakpoints.down('md')]: {
                  display: '-webkit-box',
                  '-webkit-line-clamp': '2',
                  '-webkit-box-orient': 'vertical',
                  overflow: 'hidden',
                  minHeight: '42px',
                },
              }}
            >
              {job.name_job}
            </Typography>

            <Box display="flex" gap={1}>
              Mã tin: <Typography fontWeight="600">{job.id_job}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={1} md={1} sm={12} xs={12}>
          <Typography fontWeight="500">
            {moment(job.created_at).format('DD/MM/YYYY')}
          </Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={12} xs={12}>
          <Typography
            fontWeight="500"
            sx={{
              [theme.breakpoints.up('md')]: {
                textAlign: 'center',
              },
            }}
          >
            {moment(job.deadline).format('DD/MM/YYYY')}
          </Typography>
        </Grid>
        <Grid item lg={1} md={1} sm={12} xs={12}>
          <Typography fontWeight="500">{job.countJob || 0}</Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={12} xs={12}>
          <Chip
            variant="outlined"
            label={job.is_lock === 0 ? 'Thành công' : 'Đã khóa'}
            sx={{
              background:
                job.is_lock === 0
                  ? theme.palette.success.main
                  : theme.palette.grey[300],
              color:
                job.is_lock === 0
                  ? theme.palette.common.white
                  : theme.palette.error.main,
              display: 'flex',
              justifyContent: 'center',
              margin: 'auto',
              maxWidth: '80%',
              fontWeight: 600,
            }}
          />
        </Grid>
        <Grid item lg={2} md={2} sm={12} xs={12}>
          <Box display="flex" gap={2} justifyContent="center">
            <IconButton
              onClick={() =>
                navigate(`/company/home/chinh-sua-tin-tuyen-dung/${job.id_job}`)
              }
            >
              <AutoFixNormalOutlined />
            </IconButton>
            <Tooltip
              title={job.is_lock === 0 ? 'Khóa tin' : 'Mở khóa tin'}
              arrow
            >
              <IconButton
                onClick={handelOnpenModalDelete}
                sx={{
                  color:
                    job.is_lock === 0
                      ? theme.palette.success.main
                      : theme.palette.error.main,
                }}
              >
                <LockOpenOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostingList;
