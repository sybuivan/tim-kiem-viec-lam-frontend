import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import EmptyData from 'src/components/empty_data';
import { FormInput, FormSelect } from 'src/components/hook_form';
import ProfileHeader from 'src/components/profile_bar/header';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { getCandidateList } from 'src/redux_store/company/company_action';
import { changeFiltersCandidate } from 'src/redux_store/company/company_slices';
import theme from 'src/theme';
import { CandidateInfo } from '../saved_profile/candidate_info';

const CandidateList = () => {
  const {
    candidateList: { data },
    filtersCandidate,
  } = useAppSelector((state) => state.companySlice);
  const { me } = useAppSelector((state) => state.authSlice);

  const { companyfield, cityfield } = useAppSelector(
    (state) => state.commonSlice.fieldList
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCandidateList(filtersCandidate));
  }, []);

  const handleOnChange = (name: string, value: string) => {
    dispatch(
      changeFiltersCandidate({
        ...filtersCandidate,
        [name]: value,
      })
    );
  };

  const handleOnSearch = () => {
    dispatch(getCandidateList(filtersCandidate));
  };

  const { control } = useForm({});
  return (
    <Box>
      <ProfileHeader fullName="Tìm kiếm ứng viên" title="" />
      <Paper>
        <Typography p={2} pb={0} fontWeight="600">
          Tìm kiếm lọc:
        </Typography>
        <Box display="flex" gap={2} alignItems="center" px={2} py={1}>
          <FormInput
            control={control}
            name="searchKeyword"
            placeholder="Tìm theo tên ứng viên"
            sx={{
              backgroundColor: theme.palette.common.white,
              borderRadius: '4px',
            }}
          />
          <FormSelect
            control={control}
            name="id_company_field"
            placeholder="Tất cả nghề nghiệp"
            options={companyfield}
            keyOption="id_companyField"
            labelOption="name_field"
            sx={{
              backgroundColor: theme.palette.common.white,
              borderRadius: '4px',
            }}
            handleChange={handleOnChange}
          />
          <FormSelect
            control={control}
            name="id_city"
            placeholder="Tất cả tỉnh thành"
            options={cityfield}
            keyOption="id_city"
            labelOption="name_city"
            sx={{
              backgroundColor: theme.palette.common.white,
              borderRadius: '4px',
              color: theme.palette.common.white,
            }}
            handleChange={handleOnChange}
          />
          <Box height="38px">
            <Button
              variant="contained"
              sx={{
                padding: '8px',
                minWidth: '100px!important',
                backgroundColor: '#2c95ff',
              }}
              onClick={handleOnSearch}
            >
              Tìm kiếm
            </Button>
          </Box>
        </Box>

        <Box
          p={2}
          sx={{
            borderBottom: '1px solid #adbebf',
          }}
        >
          <Typography fontSize="18px" fontWeight="600">
            Danh sách ứng viên
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Grid container columnSpacing={1}>
            {data.length > 0 ? (
              data.map((candidate) => (
                <CandidateInfo candidate={candidate} key={candidate.file_cv} />
              ))
            ) : (
              <EmptyData title="Bạn chưa lưu ứng viên nào" />
            )}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};
export default CandidateList;
