import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import {
  DateRangeOutlined,
  NotificationsOutlined,
  TimerOutlined,
  FavoriteBorderOutlined,
} from '@mui/icons-material';
import theme from 'src/theme';
import { useNavigate } from 'react-router';

const JobInfo = () => {
  const navigate = useNavigate();
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
          src="https://cdn1.vieclam24h.vn/images/default/2021/07/02/images/img_vieclam24h_vn_162519654614.png"
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
            Chi Nhánh Công Ty TNHH Transcosmos Việt Nam Tại Thành Phố Hồ Chí
            Minh
          </Typography>
          <Typography>Trên 300 người</Typography>
        </Box>
      </Box>

      <Box>
        <Box my={2}>
          <Typography fontSize="20px" fontWeight="600" py={2}>
            Chi Nhánh Công Ty TNHH Transcosmos Việt Nam Tại Thành Phố Hồ Chí
            Minh
          </Typography>
          <Box display="flex" gap={2}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <DateRangeOutlined />
              <Typography>Hạn nộp hồ sơ: 11/03/2023</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <NotificationsOutlined />
              <Typography>Lượt xem: 1495</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <TimerOutlined />
              <Typography>Đăng ngày: 21/02/2023</Typography>
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
          >
            Nộp hồ sơ
          </Button>
          <Button startIcon={<FavoriteBorderOutlined />} variant="outlined">
            Lưu hồ sơ
          </Button>
        </Box>
        <Box
          borderTop={`1px solid ${theme.palette.primary.dark}`}
          my={4}
          borderBottom={`1px solid ${theme.palette.primary.dark}`}
          display="flex"
          justifyContent="space-between"
        >
          <Box py={2} borderRight="1px solid #c1c1c1" pr="45px">
            <Typography color={theme.palette.grey[600]} pb={2}>
              Yêu cầu kinh nghiệm
            </Typography>
            <Typography fontWeight="600">Dưới 1 năm</Typography>
          </Box>
          <Box py={2} borderRight="1px solid #c1c1c1" pr="45px">
            <Typography color={theme.palette.grey[600]} pb={2}>
              Mức lương
            </Typography>
            <Typography fontWeight="600">9 - 25 triệu</Typography>
          </Box>
          <Box py={2} borderRight="1px solid #c1c1c1" pr="45px">
            <Typography color={theme.palette.grey[600]} pb={2}>
              Cấp bậc
            </Typography>
            <Typography fontWeight="600">Chuyên viên- nhân viên</Typography>
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
                <Typography fontWeight="600">
                  Tài chính - Đầu tư/Bảo hiểm/Ngân hàng
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="space-evenly">
                <Typography fontWeight="500" minWidth="40%">
                  Khu vực tuyển:
                </Typography>
                <Typography fontWeight="600">
                  Hà Nội,Thái Bình,Hưng Yên,Cao Bằng,Quảng Bình
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex">
                <Typography fontWeight="500" minWidth="40%">
                  Số lượng tuyển:
                </Typography>
                <Typography fontWeight="600">3</Typography>
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
                <Typography fontWeight="600">07/03/2023</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default JobInfo;
