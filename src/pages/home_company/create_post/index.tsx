// CreateJobPostings

import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { DeleteOutlineOutlined, SaveOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import theme from 'src/theme';
import {
  FormDatePicker,
  FormInput,
  FormSelect,
  FormTextarea,
} from 'src/components/hook_form';
import { useAppSelector, useAppDispatch, useGetStatus } from 'src/hooks';
import { messageRequired } from 'src/utils/common';
import { LoadingButton } from '@mui/lab';
import { updateProfile } from 'src/redux_store/company/company_action';
import { toastMessage } from 'src/utils/toast';
import ProfileHeader from 'src/components/profile_bar/header';
import { CPersonnelSize } from 'src/constants/common';
import { IPayloadCompanyInfo } from 'src/types/company';
import { IJob, IPayloadJob } from 'src/types/job';
import { createJob } from 'src/redux_store/job/job_action';

export const CInitValues: IPayloadJob = {
  benefits_job: '',
  city: '',
  deadline: '',
  work_location: '',
  description_job: '',
  id_experience: '',
  id_range: '',
  id_type: '',
  id_working_form: '',
  name_job: '',
  required_job: '',
  size_number: 0,
  id_field: '',
  urgent_recruitment: 0,
};

export const schema = yup.object().shape({
  benefits_job: yup.string().required(messageRequired('Quyền lợi')),
  city: yup.string().required(messageRequired('Thành phố')),
  deadline: yup.string().required(messageRequired('Hạn nộp')),
  work_location: yup.string().required(messageRequired('Nơi làm việc')),
  description_job: yup.string().required(messageRequired('Mô tả công việc')),
  id_experience: yup.string().required(messageRequired('Kinh nghiệm')),
  id_field: yup.string().required(messageRequired('Lĩnh vực')),
  id_range: yup.string().required(messageRequired('Mức lương')),
  id_type: yup.string().required(messageRequired('Cập bậc')),
  id_working_form: yup.string().required(messageRequired('Hình thức làm việc')),
  name_job: yup.string().required(messageRequired('Tên công việc')),
  required_job: yup.string().required(messageRequired('Yêu cầu')),
  size_number: yup
    .number(messageRequired('Số lượng tuyển'))
    .typeError(messageRequired('Số lượng tuyển'))
    .required(messageRequired('Số lượng tuyển'))
    .min(1, 'Số lượng phải lớn hơn 1')
    .nullable(),
});

const CreateJobPostings = () => {
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.companySlice);
  const [isLoading] = useGetStatus('job', 'createJob');
  const {
    cityfield,
    companyfield,
    workingformfield,
    experiencefield,
    rangewagefield,
    typerankfield,
  } = useAppSelector((state) => state.commonSlice.fieldList);

  const { control, handleSubmit, reset } = useForm<IPayloadJob>({
    defaultValues: {
      ...CInitValues,
      id_field: me.idCompanyField,
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (data: IPayloadJob) => {
    console.log(data);
    dispatch(createJob({ id_company: me.id_company, payload: data }))
      .unwrap()
      .then(() => {
        toastMessage.success('Tạo bài đăng tuyển dụng thành công');
        reset({
          ...CInitValues,
          id_field: me.idCompanyField,
        });
      });
  };
  return (
    <Box pb="90px">
      <Paper>
        <Box
          p={2}
          sx={{
            borderBottom: '1px solid #adbebf',
          }}
        >
          <Typography fontSize="18px" fontWeight="600">
            Tạo mới bài đăng tuyển dụng
          </Typography>
        </Box>
        <Box
          sx={{
            p: 2,
          }}
        >
          <Box>
            <Grid container columnSpacing={3} rowSpacing={2}>
              <Grid item xs={6}>
                <FormInput
                  control={control}
                  label="Tên việc làm"
                  name="name_job"
                  placeholder="Nhập tên việc làm"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  control={control}
                  label="Số lượng tuyển"
                  name="size_number"
                  placeholder="Nhập số lượng tuyển"
                  type="number"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  control={control}
                  label="Nhập địa chỉ làm việc"
                  name="work_location"
                  placeholder="Ví dụ: Số nhà 98A, phố Ngụy Như Kon Tum, phường ..."
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <FormSelect
                  control={control}
                  name="id_working_form"
                  label="Hình thức làm việc"
                  placeholder="Chọn hình thức làm việc"
                  options={workingformfield}
                  keyOption="id_working_form"
                  labelOption="name_working_form"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormSelect
                  control={control}
                  name="city"
                  label="Tỉnh / Thành phố "
                  placeholder="Chọn tỉnh thành phô"
                  options={cityfield}
                  keyOption="id_city"
                  labelOption="name_city"
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <FormSelect
                  control={control}
                  name="id_range"
                  label="Mức lương"
                  placeholder="Chọn mức lương"
                  options={rangewagefield}
                  keyOption="id_range"
                  labelOption="name_range"
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <FormSelect
                  control={control}
                  name="id_field"
                  options={companyfield}
                  label="Lĩnh vực hoạt động"
                  placeholder="Chọn lĩnh vực hoạt động"
                  keyOption="id_companyField"
                  labelOption="name_field"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormSelect
                  control={control}
                  name="id_experience"
                  options={experiencefield}
                  label="Kinh nghiệm"
                  placeholder="Chọn kinh nghiệm"
                  keyOption="id_experience"
                  labelOption="name_experience"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormSelect
                  control={control}
                  name="id_type"
                  options={typerankfield}
                  label="Cấp bậc"
                  placeholder="Chọn cấp bậc"
                  keyOption="id_rank"
                  labelOption="name_rank"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormDatePicker
                  control={control}
                  label="Hạn nộp hồ sơ"
                  name="deadline"
                  minDate={new Date()}
                  disableFuture={false}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextarea
                  control={control}
                  name="description_job"
                  label="Mô tả công việc"
                  placeholder="Nhập mô tả công việc"
                  minRows={6}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextarea
                  control={control}
                  name="required_job"
                  label="Yêu cầu công việc"
                  placeholder="Nhập yêu cầu công việc"
                  minRows={6}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextarea
                  control={control}
                  name="benefits_job"
                  label="Quyền lợi"
                  placeholder="Nhập quyền lợi"
                  minRows={6}
                  required
                />
              </Grid>
            </Grid>

            <Box position="fixed" bottom="0" right="0" left="330px">
              <Paper
                sx={{
                  p: 2,
                }}
                variant="elevation"
              >
                <Box display="flex" justifyContent="flex-end">
                  <Box display="flex" gap={2} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      startIcon={<DeleteOutlineOutlined />}
                    >
                      Hủy
                    </Button>
                    <LoadingButton
                      loading={isLoading}
                      startIcon={<SaveOutlined />}
                      variant="contained"
                      onClick={handleSubmit(handleOnSubmit)}
                    >
                      Tạo bài đăng
                    </LoadingButton>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateJobPostings;
