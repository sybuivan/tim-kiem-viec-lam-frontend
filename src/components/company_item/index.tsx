import { Box, Typography, Grid } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import React from 'react';
import { ICompany } from 'src/types/company';
import theme from 'src/theme';
import { useNavigate } from 'react-router';

const CompanyItem = ({ company }: { company: ICompany }) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={2}>
      <Box
        bgcolor={theme.palette.common.white}
        sx={{
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          pb: 1,
          cursor: 'pointer',
        }}
        onClick={() => navigate(`/cong-ty/${company.id_company}`)}
      >
        <Box display="flex" justifyContent="center">
          <img
            alt=""
            src={company.logo}
            style={{
              maxHeight: '90px',
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

export default CompanyItem;
