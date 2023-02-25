import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormInput, FormSelect } from 'src/components/hook_form';
import theme from 'src/theme';

const JobListFilters = () => {
  const { control } = useForm();
  return (
    <Box
      bgcolor={theme.palette.primary.main}
      p={3}
      pb={8}
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
        />
        <FormSelect
          control={control}
          name="name"
          placeholder="Tất cả nghề nghiệp"
          options={[]}
          keyOption="id"
          labelOption="name"
          sx={{
            backgroundColor: theme.palette.common.white,
            borderRadius: '4px',
            // maxWidth: '165px',
          }}
        />
        <FormSelect
          control={control}
          name="name"
          placeholder="Tất cả tỉnh thành"
          options={[]}
          keyOption="id"
          labelOption="name"
          sx={{
            backgroundColor: theme.palette.common.white,
            borderRadius: '4px',
            color: theme.palette.common.white,
          }}
        />
        <Box height="38px">
          <Button
            variant="contained"
            sx={{
              padding: '8px',
              minWidth: '100px!important',
            }}
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
            }}
          >
            Tìm kiếm nâng cao
          </Button>
        </Box>
      </Box>

      <Box
        display="flex"
        bgcolor={theme.palette.common.white}
        borderRadius="10px"
        alignItems="center"
        padding={1}
        position="absolute"
        bottom="-34px"
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        gap={1}
        width="99%"
        left={0}
      >
        <Typography>Lọc nâng cao:</Typography>
        <Box display="flex" gap={1}>
          <FormSelect
            control={control}
            name="name"
            placeholder="Tất cả kinh nghiệm"
            options={[]}
            keyOption="id"
            labelOption="name"
            sx={{
              backgroundColor: theme.palette.common.white,
              borderRadius: '4px',
            }}
          />
          <FormSelect
            control={control}
            name="name"
            placeholder="Tất cả mức lương"
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
            name="name"
            placeholder="Tất cả cấp bậc"
            options={[]}
            keyOption="id"
            labelOption="name"
            sx={{
              backgroundColor: theme.palette.common.white,
              borderRadius: '4px',
            }}
          />
          <FormSelect
            control={control}
            name="name"
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
            name="name"
            placeholder="Loại công việc"
            options={[]}
            keyOption="id"
            labelOption="name"
            sx={{
              backgroundColor: theme.palette.common.white,
              borderRadius: '4px',
            }}
          />
          <FormSelect
            control={control}
            name="name"
            placeholder="Tất cả giới tính"
            options={[]}
            keyOption="id"
            labelOption="name"
            sx={{
              backgroundColor: theme.palette.common.white,
              borderRadius: '4px',
              color: theme.palette.common.white,
              maxWidth: '165px',
            }}
          />
        </Box>
        <Box
          sx={{
            color: theme.palette.error.main,
            fontWeight: '600',
            cursor: 'pointer',
            paddingRight: 1,
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
          }}
        >
          Đóng
        </Box>
      </Box>
    </Box>
  );
};

export default JobListFilters;
