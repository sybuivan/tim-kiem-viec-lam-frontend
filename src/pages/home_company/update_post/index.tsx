// CreateJobPostings

import { yupResolver } from '@hookform/resolvers/yup';
import { DeleteOutlineOutlined, SaveOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
  FormDatePicker,
  FormInput,
  FormSelect,
  FormTextarea,
} from 'src/components/hook_form';
import { useAppDispatch, useAppSelector, useGetStatus } from 'src/hooks';
import {
  updateJob,
  getJobById,
  getJobByIdCompany,
} from 'src/redux_store/job/job_action';
import { IPayloadJob } from 'src/types/job';
import { toastMessage } from 'src/utils/toast';
import { schema } from '../create_post';

const UpdateJobPostings = () => {
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.companySlice);
  const [isLoading] = useGetStatus('job', 'updateJob');
  const { id_job } = useParams();
  const {
    cityfield,
    companyfield,
    workingformfield,
    experiencefield,
    rangewagefield,
    typerankfield,
  } = useAppSelector((state) => state.commonSlice.fieldList);

  const { control, handleSubmit, reset } = useForm<IPayloadJob>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id_job)
      dispatch(getJobByIdCompany(id_job))
        .unwrap()
        .then((data) => {
          const { created_at, urgent_recruitment, ...other } = data.job;
          reset({
            ...other,
          });
        });
  }, []);

  const handleOnSubmit = (data: IPayloadJob) => {
    if (id_job)
      dispatch(updateJob({ id_job, payload: data }))
        .unwrap()
        .then(() => {
          toastMessage.success('Chỉnh sửa bài đăng tuyển dụng thành công');
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
            Chỉnh sửa bài đăng tuyển dụng
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
                      Chỉnh sủa tin
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

export default UpdateJobPostings;
