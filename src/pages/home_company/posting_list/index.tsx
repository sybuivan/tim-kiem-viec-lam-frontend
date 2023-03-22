import React, { useEffect } from 'react';
import { Grid, Box, Typography, Paper, IconButton, Chip } from '@mui/material';
import AutoFixNormalOutlinedIcon from '@mui/icons-material/AutoFixNormalOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
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
  } = useAppSelector((state) => state.companySlice);
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
                  Khác
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box>
            {jobListCompany.data.length > 0 ? (
              <>
                {jobListCompany.data.map((job) => (
                  <PostItem job={job} />
                ))}{' '}
              </>
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
  } = useAppSelector((state) => state.companySlice);
  const handelOnpenModalDelete = () => {
    dispatch(
      openModal({
        dialogComponent: (
          <ModalDeletePost id_job={job.id_job} id_company={id_company} />
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
        <Grid item xs={4}>
          <Box>
            <Typography fontWeight="600">{job.name_job}</Typography>

            <Box display="flex" gap={1}>
              Mã tin: <Typography fontWeight="600">{job.id_job}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Typography fontWeight="500">
            {moment(job.created_at).format('DD/MM/YYYY')}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          {' '}
          <Typography fontWeight="500" textAlign="center">
            {moment(job.deadline).format('DD/MM/YYYY')}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography fontWeight="500" textAlign="center">
            20
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Chip
            variant="outlined"
            label="Thành công"
            sx={{
              background: theme.palette.success.main,
              color: theme.palette.common.white,
              display: 'flex',
              justifyContent: 'center',
              margin: 'auto',
              maxWidth: '80%',
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" gap={2} justifyContent="center">
            <IconButton
              onClick={() =>
                navigate(`/company/home/chinh-sua-tin-tuyen-dung/${job.id_job}`)
              }
            >
              <AutoFixNormalOutlinedIcon />
            </IconButton>
            <IconButton onClick={handelOnpenModalDelete}>
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostingList;
