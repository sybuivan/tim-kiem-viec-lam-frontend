import React from 'react';
import { Box, Button, Paper, Typography, Grid, Chip } from '@mui/material';

import { useAppSelector } from 'src/hooks';
import ProfileHeader from 'src/components/profile_bar/header';
import EmptyData from 'src/components/empty_data';
import theme from 'src/theme';
import { useNavigate } from 'react-router';

const PurchaseHistory = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <ProfileHeader fullName="Lịch sử mua hàng" title="" />
      <Paper>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderBottom: '1px solid #c1c1c1',
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="30%"
            bgcolor={theme.palette.primary.contrastText}
            py={2}
            borderRadius="5px"
          >
            <Typography fontWeight="600" fontSize="16px">
              Số lần mua dịch vụ
            </Typography>
            <Typography fontWeight="600" fontSize="16px">
              8
            </Typography>
          </Box>
        </Box>

        <Box p={2}>
          <Box display="flex" gap={2} alignItems="center" pb={2}>
            <Typography fontWeight="600" fontSize="16px">
              Danh sách dịch vụ
            </Typography>

            <Button
              variant="contained"
              onClick={() => {
                navigate('/company/home/mua-dich-vu');
              }}
            >
              Đăng ký dịch vụ
            </Button>
          </Box>

          <Box>
            <PurchaseHistoryItem name_service="Đăng tin cơ bản" />
            <PurchaseHistoryItem name_service="Trang chủ - Tuyển gấp" />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default PurchaseHistory;

const PurchaseHistoryItem = ({ name_service }: { name_service: string }) => {
  return (
    <Box
      sx={{
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        p: 2,
        borderRadius: '6px',
        mb: 2,
      }}
    >
      <Chip
        label="MP-011121212"
        sx={{
          color: theme.palette.primary.main,
          fontWeight: '600',
        }}
      />

      <Box>
        <Typography py={1} fontWeight="600">
          Ngày ghi nhận:{' '}
          <strong
            style={{
              color: theme.palette.primary.main,
            }}
          >
            01/10/2021
          </strong>{' '}
          - Hạn sử dụng:
          <strong
            style={{
              color: theme.palette.primary.main,
            }}
          >
            01/10/2021
          </strong>
        </Typography>
      </Box>
      <Box p={1} bgcolor={theme.palette.grey[200]}>
        <Grid container>
          <Grid item xs={4}>
            <Typography fontWeight="600">Tên dịch vụ</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontWeight="600">Số lượng</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontWeight="600">Thời gian</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontWeight="600">Đã sử dụng</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontWeight="600">Chưa sử dụng</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box p={1}>
        <Grid container>
          <Grid item xs={4}>
            <Typography>{name_service}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>10 Tin</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>4 Tuần</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>2 Tin</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>8 Tin</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
