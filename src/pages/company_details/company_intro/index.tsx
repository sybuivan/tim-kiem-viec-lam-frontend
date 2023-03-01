import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import {
  LocationOnOutlined,
  Groups2Outlined,
  FactoryOutlined,
  HourglassBottomOutlined,
} from '@mui/icons-material';
import theme from 'src/theme';
import { useAppSelector } from 'src/hooks';

const CompanyIntro = () => {
  const {
    companyDetail: {
      company: { introduce },
    },
  } = useAppSelector((state) => state.companySlice);
  return (
    <Paper
      sx={{
        p: 1,
        mt: '40px',
      }}
    >
      <Container
        sx={{
          maxWidth: '1000px!important',
        }}
      >
        <Box my={4}>
          <Typography fontWeight="600" fontSize="24px" mb={2}>
            Giới thiệu doanh nghiệp
          </Typography>

          <Typography fontWeight="500" fontSize="16px">
            {introduce}
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};

export default CompanyIntro;
