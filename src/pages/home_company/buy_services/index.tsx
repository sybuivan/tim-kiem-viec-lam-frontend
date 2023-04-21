import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router';

import ProfileHeader from 'src/components/profile_bar/header';
import { useAppDispatch, useGetStatus, useAppSelector } from 'src/hooks';
import { buyService, getService } from 'src/redux_store/service/service_action';
import { IService, IBuyService } from 'src/types/service';
import ServiceDetail from './service_detail';
import BuyButton from './buy_button';
import { convertToUSD } from 'src/utils/function';

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
  const navigate = useNavigate();
  const {
    serviceList: { services },
  } = useAppSelector((state) => state.serviceSlice);
  const { me } = useAppSelector((state) => state.companySlice);
  useEffect(() => {
    dispatch(getService())
      .unwrap()
      .then((data) => {
        setService(data.services[0]);
      });
  }, []);

  const handleOnBuyService = async (id_history: string) => {
    const payload: IBuyService = {
      id_company: me?.id_company,
      id_history,
      id_service: serviceSelected.id_service,
    };
    dispatch(buyService(payload))
      .unwrap()
      .then(() => {
        navigate('/company/home/lich-su-mua-hang');
      });
  };

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
                  <ServiceDetail
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

                  <BuyButton
                    amount={convertToUSD(serviceSelected.price, 23000) + ''}
                    onBuyService={handleOnBuyService}
                  />
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
