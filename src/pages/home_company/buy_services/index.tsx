import React, { useState } from 'react';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';

import ProfileHeader from 'src/components/profile_bar/header';
import theme from 'src/theme';
import { formatPrice } from 'src/utils/function';

const CServices = [
  {
    name: 'Đăng tin cơ bản',
    price: 100000,
    type: 'tháng',
    id: 'DTCBM',
  },
  {
    name: 'Đăng tin cơ bản',
    price: 250000,
    type: '3 tháng',
    id: 'DTCBQ',
  },
  {
    name: 'Đăng tin cơ bản',
    price: 1000000,
    type: 'năm',
    id: 'DTCBY',
  },
  {
    name: 'Trang chủ - Tuyển gấp',
    price: 150000,
    type: 'tháng',
    id: 'TCTGM',
  },
  {
    name: 'Trang chủ - Tuyển gấp',
    price: 350000,
    type: '3 tháng',
    id: 'TCTGQ',
  },
  {
    name: 'Trang chủ - Tuyển gấp',
    price: 1300000,
    type: 'năm',
    id: 'TCTGY',
  },
];

const BuyServices = () => {
  const [selected, setSelected] = useState(CServices[0].id);
  return (
    <Box>
      <ProfileHeader fullName="Mua dịch vụ đăng tin tuyển dụng" title="" />
      <Paper>
        <Box p={2}>
          <Grid container columnSpacing={1}>
            <Grid item xs={6}>
              <Box display="flex" gap={2} alignItems="center" pb={2}>
                <Typography fontWeight="600" fontSize="16px">
                  Danh sách dịch vụ
                </Typography>
              </Box>
              <Box display="flex" gap={2} flexWrap="wrap">
                {CServices.map((service) => (
                  <BuyServicesItem
                    service={service}
                    selected={selected}
                    onSelected={(id: string) => setSelected(id)}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Box display="flex" gap={2} alignItems="center" pb={2}>
                  <Typography fontWeight="600" fontSize="16px">
                    Chi tiết dịch vụ
                  </Typography>
                </Box>
                <Box>
                  <Typography>
                    <b>Số lượng:</b> 10 tin / 1 tháng
                  </Typography>
                  <Typography>Được đăng trên trang chủ của hệ thông</Typography>

                  <Button variant="contained" sx={{ mt: 2 }}>
                    Mua ngay
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default BuyServices;

const BuyServicesItem = ({
  service,
  selected,
  onSelected,
}: {
  selected: string;
  service: {
    name: string;
    price: number;
    id: string;
    type: string;
  };
  onSelected: (id: string) => void;
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="48%"
      bgcolor={
        service.id === selected
          ? theme.palette.primary.contrastText
          : theme.palette.grey[300]
      }
      py={2}
      borderRadius="5px"
      sx={{
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onClick={() => onSelected(service.id)}
    >
      <Typography fontWeight="600" fontSize="14px">
        Tên dịch vụ: {service.name}
      </Typography>
      <Typography fontWeight="600" fontSize="12px">
        Giá: {formatPrice(service.price)} / {service.type}
      </Typography>
    </Box>
  );
};
