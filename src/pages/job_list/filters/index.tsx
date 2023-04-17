import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import queryString from 'query-string';

import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { FormInput, FormSelect } from 'src/components/hook_form';
import { CGenderOption } from 'src/constants/common';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { changeHomeFilter } from 'src/redux_store/job/job_slices';
import theme from 'src/theme';
import { getJobListFilters } from 'src/redux_store/job/job_action';

const JobListFilters = ({
  isOpenFilters,
  onOpenFilters,
}: {
  isOpenFilters: boolean;
  onOpenFilters: () => void;
}) => {
  const location = useLocation();
  const { control } = useForm({
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

  return (
    <Box
      bgcolor={theme.palette.primary.main}
      p={3}
      borderRadius="10px"
      mt={2}
      position="relative"
    >
      <Box display="flex" gap={2} alignItems="center">
        <FormInput
          control={control}
          name="searchKeyword"
          placeholder="Tìm kiếm cơ hội việc làm"
          sx={{
            backgroundColor: theme.palette.common.white,
            borderRadius: '4px',
          }}
          handleChange={handleOnChange}
        />
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
        <Box height="37px">
          <Button
            variant="contained"
            sx={{
              padding: '8px',
              minWidth: '200px!important',
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
      </Box>
      {isOpenFilters && (
        <Box
          display="flex"
          bgcolor={theme.palette.common.white}
          borderRadius="10px"
          alignItems="center"
          padding={1}
          position="absolute"
          bottom="-50px"
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          gap={1}
          width="99%"
          left={0}
        >
          <Typography>Lọc nâng cao:</Typography>
          <Box display="flex" gap={1} flex={1}>
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
            <FormSelect
              control={control}
              name="id"
              placeholder="Tất cả trình độ"
              options={[]}
              keyOption="id"
              labelOption="name"
              sx={{
                backgroundColor: theme.palette.common.white,
                borderRadius: '4px',
                color: theme.palette.common.white,
              }}
            />
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
            <FormSelect
              control={control}
              name="id_gender"
              placeholder="Tất cả giới tính"
              options={CGenderOption}
              keyOption="value"
              labelOption="label"
              sx={{
                backgroundColor: theme.palette.common.white,
                borderRadius: '4px',
                color: theme.palette.common.white,
                maxWidth: '165px',
              }}
            />
          </Box>
          <Box display="flex">
            <Box
              sx={{
                color: theme.palette.error.main,
                fontWeight: '600',
                cursor: 'pointer',
                pr: 1,
                borderRight: '2px solid #c1c1c1',
              }}
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
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default JobListFilters;
