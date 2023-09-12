import { Box, Button, Typography, Grid } from '@mui/material';
import React from 'react';
import queryString from 'query-string';

import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { FormInput, FormSelect } from 'src/components/hook_form';
import { CGenderOption } from 'src/constants/common';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { changeHomeFilter, resetFilter } from 'src/redux_store/job/job_slices';
import theme from 'src/theme';
import { getJobListFilters } from 'src/redux_store/job/job_action';
import { IadvancedFilter } from 'src/types/common';
const CInitAdvancedFilter: IadvancedFilter = {
  city: '',
  companyfield: '',
  keyword: '',
  page: 1,
  id_experience: '',
  id_range: '',
  id_rank: '',
  id_working_form: '',
  created: 'DESC',
};

const optionTimes = [
  {
    id_created: 'DESC',
    name_created: 'Mới nhất',
  },
  {
    id_created: 'ASC',
    name_created: 'Cũ nhất',
  },
];

const JobListFilters = ({
  isOpenFilters,
  onOpenFilters,
}: {
  isOpenFilters: boolean;
  onOpenFilters: () => void;
}) => {
  const location = useLocation();
  const { control, reset } = useForm<IadvancedFilter>({
    defaultValues: queryString.parse(location.search),
  });
  const dispatch = useAppDispatch();

  const {
    companyfield,
    experiencefield,
    typerankfield,
    rangewagefield,
    workingformfield,
    cityfield,
  } = useAppSelector((state) => state.commonSlice.fieldList);
  const navigate = useNavigate();
  const { jobFilters } = useAppSelector((state) => state.jobSlice);

  const handleOnChange = (name: string, value: string) => {
    const newValue = {
      ...jobFilters,
      [name]: value,
    };
    dispatch(changeHomeFilter(newValue));
  };

  const handleOnSearch = () => {
    const stringifiedParams = queryString.stringify({ ...jobFilters, page: 1 });
    navigate(`/co-hoi-viec-lam?${stringifiedParams}`);
    dispatch(
      changeHomeFilter({
        ...jobFilters,
        page: 1,
      })
    );
    dispatch(getJobListFilters({ ...jobFilters, page: 1 }));
  };

  const handleClearFilter = () => {
    dispatch(resetFilter());
    const stringifiedParams = queryString.stringify({ ...CInitAdvancedFilter });
    navigate(`/co-hoi-viec-lam?${stringifiedParams}`);
    reset(CInitAdvancedFilter);
    dispatch(getJobListFilters({ ...CInitAdvancedFilter }));
  };

  return (
    <Box
      bgcolor={theme.palette.primary.main}
      p={3}
      borderRadius="10px"
      mt={2}
      position="relative"
    >
      <Grid container columnSpacing={2} alignItems="center">
        <Grid item lg={2.5} md={2.5} sm={4} xs={12}>
          <FormInput
            control={control}
            name="keyword"
            placeholder="Tìm kiếm cơ hội việc làm"
            sx={{
              backgroundColor: theme.palette.common.white,
              borderRadius: '4px',
            }}
            handleChange={handleOnChange}
          />
        </Grid>

        <Grid item lg={2.5} md={2.5} sm={4} xs={12}>
          <FormSelect
            control={control}
            name="companyfield"
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
        </Grid>

        <Grid item lg={2.5} md={2.5} sm={4} xs={12}>
          <FormSelect
            control={control}
            name="city"
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
        </Grid>

        <Grid item lg={3.5} md={3.5} sm={12} xs={12}>
          <Grid container columnSpacing={2}>
            <Grid item lg={5} md={5} xs={6} sm={6}>
              <Box height="38px">
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    padding: '8px',
                    minWidth: '100px!important',
                    backgroundColor: '#2c95ff',
                  }}
                  onClick={handleOnSearch}
                >
                  Tìm kiếm
                </Button>
              </Box>
            </Grid>

            <Grid item lg={7} md={7} xs={6} sm={6}>
              <Box height="37px">
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#5c27d6',
                    '&:hover': {
                      backgroundColor: '#5c27d6',
                    },
                  }}
                  onClick={() => onOpenFilters()}
                >
                  Tìm kiếm nâng cao
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {isOpenFilters && (
        <Grid
          bgcolor={theme.palette.common.white}
          borderRadius="10px"
          padding={1}
          position="absolute"
          bottom="-50px"
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          columnSpacing={1}
          width="100%"
          left={0}
          container
          alignItems="center"
          sx={{
            [theme.breakpoints.down('md')]: {
              position: 'static',
              mt: '1rem',
            },
          }}
        >
          <Grid item lg={1} md={1} sm={12}>
            <Typography>Lọc nâng cao:</Typography>
          </Grid>
          <Grid item lg={10} md={10} sm={12}>
            <Grid container columnSpacing={1}>
              <Grid item lg={2.4} md={2.4} sm={6} xs={12}>
                <FormSelect
                  control={control}
                  name="id_experience"
                  placeholder="Tất cả kinh nghiệm"
                  options={experiencefield}
                  keyOption="id_experience"
                  labelOption="name_experience"
                  sx={{
                    backgroundColor: theme.palette.common.white,
                    borderRadius: '4px',
                  }}
                  handleChange={handleOnChange}
                />
              </Grid>
              <Grid item lg={2.4} md={2.4} sm={6} xs={12}>
                <FormSelect
                  control={control}
                  name="id_range"
                  placeholder="Tất cả mức lương"
                  options={rangewagefield}
                  keyOption="id_range"
                  labelOption="name_range"
                  sx={{
                    backgroundColor: theme.palette.common.white,
                    borderRadius: '4px',
                    color: theme.palette.common.white,
                  }}
                  handleChange={handleOnChange}
                />
              </Grid>

              <Grid item lg={2.4} md={2.4} sm={6} xs={12}>
                <FormSelect
                  control={control}
                  name="id_rank"
                  placeholder="Tất cả cấp bậc"
                  options={typerankfield}
                  keyOption="id_rank"
                  labelOption="name_rank"
                  sx={{
                    backgroundColor: theme.palette.common.white,
                    borderRadius: '4px',
                  }}
                  handleChange={handleOnChange}
                />
              </Grid>
              <Grid item lg={2.4} md={2.4} sm={6} xs={12}>
                <FormSelect
                  control={control}
                  name="id_working_form"
                  placeholder="Loại công việc"
                  options={workingformfield}
                  keyOption="id_working_form"
                  labelOption="name_working_form"
                  sx={{
                    backgroundColor: theme.palette.common.white,
                    borderRadius: '4px',
                  }}
                  handleChange={handleOnChange}
                />
              </Grid>
              <Grid item lg={2.4} md={2.4} sm={6} xs={12}>
                <FormSelect
                  control={control}
                  name="created"
                  placeholder="Ngày đăng"
                  options={optionTimes}
                  keyOption="id_created"
                  labelOption="name_created"
                  sx={{
                    backgroundColor: theme.palette.common.white,
                    borderRadius: '4px',
                  }}
                  handleChange={handleOnChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={1} md={1} sm={12} display="flex" alignItems="center">
            <Box
              sx={{
                color: theme.palette.error.main,
                fontWeight: '600',
                cursor: 'pointer',
                pr: 1,
                borderRight: '2px solid #c1c1c1',
              }}
              onClick={handleClearFilter}
            >
              Xóa chọn
            </Box>
            <Box
              sx={{
                color: theme.palette.grey[700],
                fontWeight: '600',
                cursor: 'pointer',
                pl: 1,
              }}
              onClick={() => onOpenFilters()}
            >
              Đóng
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default JobListFilters;
