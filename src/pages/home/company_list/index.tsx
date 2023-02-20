import { Box, Grid } from '@mui/material';
import React from 'react';
import CompanyItem from 'src/components/company_item';
import { ICompanyList } from 'src/types/company';

const CompanyList = ({ dataList }: { dataList: ICompanyList }) => {
  return (
    <Box mb={3}>
      <Grid container>
        {dataList.data.map((item, index) => (
          <CompanyItem company={item} key={index} />
        ))}
      </Grid>
    </Box>
  );
};

export default CompanyList;
