import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import ProfileHeader from 'src/components/profile_bar/header';
import { getServiceActivated } from 'src/redux_store/company/company_action';
import { useAppDispatch, useAppSelector, useGetStatus } from 'src/hooks';
import LoadingLinear from 'src/components/loading/loading_linear';
import EmptyData from 'src/components/empty_data';
import { useNavigate } from 'react-router';
import theme from 'src/theme';
import moment from 'moment';
import CreateJobPostings from '..';

interface IService {
  name_service: string;
  id_history: string;
  remaining_news: number;
  expiry: string | Date;
  created_at: string | Date;
}

const ChooseService = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.authSlice);
  const [isLoading] = useGetStatus('company', 'getServiceActivated');
  const [service, setService] = useState<IService[]>([]);
  const [selectedId, setselectedId] = useState<string>('');

  useEffect(() => {
    dispatch(getServiceActivated(me?.id_company))
      .unwrap()
      .then((data) => {
        setService(data.service);
      });
  }, []);

  if (isLoading) return <LoadingLinear />;

  return (
    <>
      {selectedId ? (
        <CreateJobPostings id_history={selectedId} />
      ) : (
        <Box>
          <ProfileHeader fullName="Chọn dịch vụ" title="" />

          <Box bgcolor={theme.palette.common.white}>
            {service.length > 0 ? (
              <Box p={2}>
                <Box display="flex" gap={2} alignItems="center" pb={2}>
                  <Typography fontWeight="600" fontSize="16px">
                    Danh sách dịch vụ
                  </Typography>
                </Box>
                <Grid container columnSpacing={2} rowSpacing={2}>
                  {service.map((item) => (
                    <Grid item xs={6} lg={3} md={4} sm={4}>
                      <Box
                        p={2}
                        bgcolor={theme.palette.grey[300]}
                        borderRadius={2}
                        sx={{
                          cursor: `${
                            item.remaining_news === 0 ? 'no-drop' : 'pointer'
                          }`,
                          userSelect: 'none',
                          '&:hover': {
                            backgroundColor: theme.palette.primary.contrastText,
                            transition: '0.3s all',
                          },
                        }}
                        onClick={() => {
                          if (item.remaining_news > 0)
                            setselectedId(item.id_history);
                        }}
                      >
                        <Typography textAlign="center" fontWeight="600">
                          {item.name_service}
                        </Typography>
                        <Typography fontWeight="600" textAlign="center">
                          Tin chưa sử dụng:{' '}
                          <Typography color="red" display="inline">
                            {item.remaining_news}
                          </Typography>
                        </Typography>
                        <Typography fontWeight="600" textAlign="center">
                          Hạn sử dụng:{' '}
                          <Typography color="red" display="inline">
                            {moment(item.expiry).format('DD/MM/YYYY')}
                          </Typography>
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <>
                <EmptyData title="Chưa có dịch vụ nào" />

                <Box display="flex" justifyContent="center" my={2}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate('/company/home/mua-dich-vu');
                    }}
                    sx={{
                      mb: 1,
                    }}
                  >
                    Đăng ký dịch vụ
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default ChooseService;
