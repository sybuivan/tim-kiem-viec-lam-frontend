import React, { useEffect } from 'react';
import { Box, Button, Paper, Typography, Grid, Chip } from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from 'src/hooks';
import ProfileHeader from 'src/components/profile_bar/header';
import EmptyData from 'src/components/empty_data';
import theme from 'src/theme';
import {
  getServiceByCompany,
  activatedService,
} from 'src/redux_store/service/service_action';
import { resetData } from 'src/redux_store/service/service_slice';
import { IServiceDetail } from 'src/types/service';
import { toastMessage } from 'src/utils/toast';

const PurchaseHistory = () => {
  const { me } = useAppSelector((state) => state.authSlice);

  const {
    serviceBuyList: { total, services },
  } = useAppSelector((state) => state.serviceSlice);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getServiceByCompany(me?.id_company));

    return () => {
      dispatch(resetData());
    };
  }, []);
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
              {total}
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
            {services.length > 0 ? (
              services.map((service) => (
                <PurchaseHistoryItem
                  history={service}
                  key={service.id_history}
                />
              ))
            ) : (
              <EmptyData title="Chưa mua dịch vụ nào" />
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default PurchaseHistory;

const PurchaseHistoryItem = ({ history }: { history: IServiceDetail }) => {
  const {
    name_service,
    created_at,
    expiry,
    total_news,
    activated,
    id_company,
    id_history,
    remaining_news,
    used,
  } = history;
  const dispatch = useAppDispatch();

  const handleActivated = () => {
    dispatch(activatedService({ id_company, id_history }))
      .unwrap()
      .then(() => {
        toastMessage.success('Kích hoạt dịch vụ thành công');
      });
  };

  const renderStatus = (activated: number, remaining_news?: any) => {
    if (activated === 0)
      return (
        <Chip
          label="Chưa kích hoạt"
          sx={{
            color: theme.palette.error.main,
            fontWeight: '600',
          }}
        />
      );

    if (activated === 1)
      return (
        <Chip
          label="Đã kich hoạt"
          sx={{
            color: theme.palette.grey[200],
            fontWeight: '600',
            background: theme.palette.success.main,
          }}
        />
      );
    if (activated === 1 && remaining_news === 0)
      return (
        <Chip
          label="Đã hết tin"
          sx={{
            color: theme.palette.grey[200],
            fontWeight: '600',
            background: theme.palette.error.main,
          }}
        />
      );
  };
  return (
    <Box
      sx={{
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        px: 2,
        pt: 1,
        borderRadius: '6px',
        mb: 2,
      }}
    >
      <Chip
        label={id_history}
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
            {created_at && moment(created_at).format('DD-MM-YYYY')}
          </strong>
          - Hạn sử dụng:{' '}
          <strong
            style={{
              color: theme.palette.primary.main,
            }}
          >
            {expiry && moment(expiry).format('DD-MM-YYYY')}
          </strong>
        </Typography>
      </Box>
      <Box p={1} bgcolor={theme.palette.grey[200]}>
        <Grid container>
          <Grid item xs={2}>
            <Typography fontWeight="600">Tên dịch vụ</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontWeight="600">Số lượng</Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography fontWeight="600">Đã sử dụng</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontWeight="600">Chưa sử dụng</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontWeight="600">Trạng thái</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontWeight="600">Hành động</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box p={1}>
        <Grid container>
          <Grid item xs={2}>
            <Typography>{name_service}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{total_news} Tin</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{used} Tin</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{remaining_news} Tin</Typography>
          </Grid>
          <Grid item xs={2}>
            {renderStatus(activated, remaining_news)}
          </Grid>
          <Grid item xs={2}>
            {activated === 0 && (
              <Button variant="outlined" onClick={handleActivated}>
                Kích hoạt
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
