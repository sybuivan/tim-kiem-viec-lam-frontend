import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';

import ProfileHeader from 'src/components/profile_bar/header';
import theme from 'src/theme';
import { formatPrice } from 'src/utils/function';
import { useAppDispatch, useGetStatus, useAppSelector } from 'src/hooks';
import { getService } from 'src/redux_store/service/service_action';
import { IService } from 'src/types/service';

const BuyServices = () => {
  const [serviceSelected, setService] = useState<IService>({
    name_service: '',
    description: '',
    id_service: '',
    number_of_months: 0,
    price: 0,
    total_news: 0,
  });
  const [isLoading] = useGetStatus('service', 'getService');
  const dispatch = useAppDispatch();
  const {
    serviceList: { services },
  } = useAppSelector((state) => state.serviceSlice);
  useEffect(() => {
    dispatch(getService())
      .unwrap()
      .then((data) => {
        setService(data.services[0]);
      });
  }, []);

  if (isLoading) return <h1>Loading.. </h1>;
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
                {services.map((service) => (
                  <BuyServicesItem
                    key={service.id_service}
                    service={service}
                    selected={serviceSelected}
                    onSelected={(service) => setService(service)}
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
                    <b>Số lượng:</b> {serviceSelected.total_news} tin /{' '}
                    {serviceSelected.number_of_months} tháng
                  </Typography>
                  <Typography>{serviceSelected.description}</Typography>

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
  selected: IService;
  service: IService;
  onSelected: (service: IService) => void;
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="48%"
      bgcolor={
        service.id_service === selected.id_service
          ? theme.palette.primary.contrastText
          : theme.palette.grey[300]
      }
      py={2}
      borderRadius="5px"
      sx={{
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onClick={() => onSelected(service)}
    >
      <Typography fontWeight="600" fontSize="14px">
        Tên dịch vụ: {service.name_service}
      </Typography>
      <Typography fontWeight="600" fontSize="12px">
        Giá: {formatPrice(service.price)} / {service.number_of_months} tháng
      </Typography>
    </Box>
  );
};
