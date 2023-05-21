import { Box, Grid } from '@mui/material';
import React from 'react';
import { useAppSelector } from 'src/hooks';
import SettingField from './setting_field';

const SettingSystem = () => {
  const {
    fieldList: {
      cityfield,
      companyfield,
      experiencefield,
      rangewagefield,
      typerankfield,
      workingformfield,
    },
  } = useAppSelector((state) => state.commonSlice);
  return (
    <Box>
      <Box>
        <Grid container columnSpacing={2}>
          <Grid item xs={3}>
            <SettingField
              title_field="nghề nghiệp"
              fields={companyfield.map((item) => {
                return {
                  id: item.id_companyField,
                  name: item.name_field,
                };
              })}
              name="name_filed"
              id="id_companyField"
              type="companyfield"
            />
          </Grid>
          <Grid item xs={3}>
            <SettingField
              title_field="kinh nghiệm"
              fields={experiencefield.map((item) => {
                return {
                  id: item.id_experience,
                  name: item.name_experience,
                };
              })}
              id="id_experience"
              name="name_experience"
              type="experience"
            />
          </Grid>
          <Grid item xs={3}>
            <SettingField
              title_field="mức lương"
              fields={rangewagefield.map((item) => {
                return {
                  id: item.id_range,
                  name: item.name_range,
                };
              })}
              id="id_range"
              name="name_range"
              type="rangewage"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SettingSystem;
