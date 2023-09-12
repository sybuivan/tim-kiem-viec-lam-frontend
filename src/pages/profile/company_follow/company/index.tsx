import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { unFollowCompany } from 'src/redux_store/user/user_action';
import { IFollowCompany } from 'src/types/user';
import { baseURL } from 'src/config';
import theme from 'src/theme';

const Company = ({ company }: { company: IFollowCompany }) => {
  const {
    me: { id_user },
  } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleOnNavigate = () => {
    navigate(`/cong-ty/${company.id_company}`);
  };

  const handleUnFollow = () => {
    dispatch(
      unFollowCompany({
        id_user,
        id_company: company.id_company,
      })
    );
  };
  return (
    <Box
      sx={{
        borderBottom: '1px solid #adbebf',
        py: 2,
        '&:last-child': {
          borderBottom: 'none',
        },
        [theme.breakpoints.down('md')]: {
          py: 1,
        },
      }}
    >
      <Grid container alignItems="center" rowSpacing={1}>
        <Grid item lg={6} md={6} sm={8} xs={12} display="flex" gap={1}>
          <img
            src={`${baseURL}/${company.logo}`}
            alt=""
            width="100px"
            height="100px"
            style={{
              borderRadius: '10px',
              border: '1px solid #c1c1c1',
              cursor: 'pointer',
            }}
            onClick={handleOnNavigate}
          />
          <Box>
            <Typography
              fontWeight="600"
              py={0.5}
              sx={{
                fontSize: '15px',
                cursor: 'pointer',
                margin: 0,
                [theme.breakpoints.up('lg')]: {
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  maxWidth: '330px',
                },
              }}
              onClick={handleOnNavigate}
            >
              {company.name_company}
            </Typography>
            <Typography
              title={company.address}
              sx={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                fontSize: '15px',
                margin: 0,
                maxWidth: '330px',
              }}
              py={0.5}
            >
              {company.address}
            </Typography>
            <Typography>Trên {company.total_people} người</Typography>
          </Box>
        </Grid>

        <Grid item lg={2} md={2} sm={4} xs={12} display="flex">
          <Typography fontWeight="600" textAlign="center">
            Đang tuyển:
          </Typography>
          <Typography pl="15px" fontWeight="600">
            {company.total} vị trí
          </Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={6} xs={12} display="flex">
          <Typography fontWeight="600" textAlign="center">
            Ngày theo dõi:{' '}
          </Typography>
          <Typography pl="10px">
            {moment(company.created_at).format('DD/MM/YYYY')}
          </Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={6} xs={12}>
          <Button variant="outlined" onClick={handleUnFollow}>
            Hủy theo dõi
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Company;
