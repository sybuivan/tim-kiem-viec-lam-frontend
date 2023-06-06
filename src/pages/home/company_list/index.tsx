import { Box, Grid } from '@mui/material';
import React from 'react';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import CompanyItem from 'src/components/company_item';
import { ICompany } from 'src/types/company';
import HeadTitle from 'src/components/head_title';

interface ICompanyList {
  dataList: ICompany[];
}

const CompanyList = ({ dataList }: ICompanyList) => {
  return (
    <Box my={4}>
      <HeadTitle title="Top công ty nổi bật" icon={<ApartmentOutlinedIcon />} />

      <Grid container columnSpacing={1} rowSpacing={1}>
        {dataList.map((item, index) => (
          <CompanyItem company={item} key={index} />
        ))}
      </Grid>
    </Box>
  );
};

export default CompanyList;
