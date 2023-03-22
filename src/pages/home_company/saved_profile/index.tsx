import React from 'react';
import { Box, Button, Link, Paper, Typography, Grid } from '@mui/material';
import {
  FavoriteRounded,
  LocalPhoneOutlined,
  BadgeOutlined,
  EmailOutlined,
  AssignmentOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import { useAppSelector } from 'src/hooks';
import ProfileHeader from 'src/components/profile_bar/header';
import EmptyData from 'src/components/empty_data';
import theme from 'src/theme';

const SavedProfile = () => {
  return (
    <Box>
      <ProfileHeader fullName="Hồ sơ ứng viên đã lưu" title="" />
      <Paper>
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

export const CandidateInfo = () => {
  return (
    <Grid item xs={4}>
      <Box
        sx={{
          boxShadow: ' rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          p: 2,

          borderRadius: '6px',
        }}
      >
        <img
          style={{
            borderRadius: '50%',
            width: '100px',
            height: '100px',
            display: 'flex',
            margin: '8px auto',
          }}
          src="http://localhost:5000/1679315818659log-tifi.jpg"
          alt=""
        />
        <Box
          sx={{
            '& svg': {
              fontSize: '18px',
              color: theme.palette.primary.main,
            },
            pl: 3,
          }}
        >
          <Box display="flex" gap={0.5}>
            <BadgeOutlined />
            <Typography>Họ và tên: </Typography>
            <Typography fontWeight="600">Bùi Văn Sỷ</Typography>
          </Box>
          <Box display="flex" gap={0.5}>
            <LocalPhoneOutlined />
            <Typography>Số điện thoại: </Typography>
            <Typography fontWeight="600">0947895039</Typography>
          </Box>
          <Box display="flex" gap={0.5}>
            <EmailOutlined />
            <Typography>Gmail: </Typography>
            <Typography fontWeight="600">sybuivan1429@gmail.com</Typography>
          </Box>
          <Box display="flex" gap={0.5}>
            <WorkOutlineOutlined />
            <Typography>Nghề nghiệp: </Typography>
            <Typography fontWeight="600">IT phần mềm</Typography>
          </Box>
          <Box display="flex" gap={0.5}>
            <AssignmentOutlined />
            <Typography>CV:</Typography>{' '}
            <Link href="" target="_blank">
              Xem hồ sơ
            </Link>
          </Box>
          <Box display="flex" gap={0.5} mt={1}>
            <Button variant="outlined" startIcon={<FavoriteRounded />}>
              Hủy theo dõi
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default SavedProfile;
