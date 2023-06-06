import { Container, Grid, Typography, Box } from '@mui/material';
import React, { useEffect } from 'react';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import LoadingAnimation from 'src/components/loading/loading_animation';
import { useGetStatus, useAppSelector, useAppDispatch } from 'src/hooks';
import { getCompanyList } from 'src/redux_store/company/company_action';
import { ICompany } from 'src/types/company';
import theme from 'src/theme';
import { useNavigate } from 'react-router';

const CLIMIT: number = 20;

const CompanyInfo = ({ company }: { company: ICompany }) => {
  const navigate = useNavigate();

  return (
    <Grid item xs={4} lg={3} md={3} sm={4}>
      <Box
        bgcolor={theme.palette.common.white}
        sx={{
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          py: 1,
          cursor: 'pointer',
        }}
        onClick={() => navigate(`/cong-ty/${company.id_company}`)}
      >
        <Typography fontWeight="600" textAlign="center" minHeight="42px">
          {company.name_company}{' '}
        </Typography>
        <Box display="flex" justifyContent="center">
          <img
            alt=""
            src={company.logo}
            style={{
              maxHeight: '90px',
              minHeight: '90px',
              maxWidth: '90px',
            }}
          />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
          <ShoppingBagOutlinedIcon />
          <Typography>{company.totalJob} vị trí đang ứng tuyển</Typography>
        </Box>
      </Box>
    </Grid>
  );
};
const CompanyList = () => {
  const [isLoading, isError] = useGetStatus('job', 'getCompanyList');
  const dispatch = useAppDispatch();
  const {
    companyList: { companyList },
  } = useAppSelector((state) => state.companySlice);

  useEffect(() => {
    dispatch(getCompanyList(CLIMIT));
  }, []);

  const renderContent = () => {
    if (isLoading) return <LoadingAnimation />;

    return (
      <Grid container columnSpacing={2} rowSpacing={2}>
        {companyList.map((company) => (
          <CompanyInfo company={company} key={company.id_company} />
        ))}
      </Grid>
    );
  };
  return (
    <Container sx={{ maxWidth: '1500px!important' }}>
      <Typography textAlign="center" fontSize="22px" py={3} fontWeight="600">
        Danh sách công ty
      </Typography>
      {renderContent()}
    </Container>
  );
};

export default CompanyList;
