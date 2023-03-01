import { Box, Grid } from '@mui/material';
import React from 'react';
import CompanyItem from 'src/components/company_item';
import { ICompany } from 'src/types/company';

interface ICompanyList {
  dataList: ICompany[];
}

const CompanyList = ({ dataList }: ICompanyList) => {
  return (
    <Box mb={3}>
      <Grid container>
        {dataList.map((item, index) => (
          <CompanyItem company={item} key={index} />
        ))}
      </Grid>
    </Box>
  );
};

export default CompanyList;
