import React from 'react';
import { Grid, Box, Typography, Paper, IconButton, Chip } from '@mui/material';
import AutoFixNormalOutlinedIcon from '@mui/icons-material/AutoFixNormalOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import moment from 'moment';
import ProfileHeader from 'src/components/profile_bar/header';

import theme from 'src/theme';

const PostingList = () => {
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
                <Typography fontWeight="600">Lượt nộp</Typography>
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

          {/*  */}
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </Box>
      </Paper>
    </Box>
  );
};

const PostItem = () => {
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
            <Typography fontWeight="600">
              Nhân viên hỗ trợ người tìm việc
            </Typography>

            <Box display="flex" gap={2}>
              Mã tin: <Typography fontWeight="500">TTD123</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Typography fontWeight="500">
            {moment(new Date()).format('DD/MM/YYYY')}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          {' '}
          <Typography fontWeight="500" textAlign="center">
            {moment(new Date()).format('DD/MM/YYYY')}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography fontWeight="500">20</Typography>
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
            <IconButton>
              <AutoFixNormalOutlinedIcon />
            </IconButton>
            <IconButton>
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostingList;
