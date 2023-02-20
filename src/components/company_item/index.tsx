import { Box, Typography, Grid } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import React from 'react';
import { ICompany } from 'src/types/company';

const CompanyItem = ({ company }: { company: ICompany }) => {
  return (
    <Grid item xs={2}>
      <Box
        sx={{
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          pb: 1,
          cursor: 'pointer',
        }}
      >
        <Box display="flex" justifyContent="center">
          <img
            alt=""
            src={company.avatar}
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
