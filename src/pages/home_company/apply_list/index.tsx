import {
  Box,
  Button,
  Checkbox,
  Grid,
  Paper,
  Typography,
  LinearProgress,
} from '@mui/material';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import EmptyData from 'src/components/empty_data';
import { FormSelect } from 'src/components/hook_form';
import ProfileHeader from 'src/components/profile_bar/header';
import { useAppDispatch, useAppSelector, useGetStatus } from 'src/hooks';
import {
  getAllJobByIdCompany,
  getProfileAppliedByJob,
  updateStatusApplied,
} from 'src/redux_store/company/company_action';
import theme from 'src/theme';
import { IApplyUser } from 'src/types/apply';
import { findNameJob } from 'src/utils/function';
import { toastMessage } from 'src/utils/toast';
import ApplyItem from './apply_item';

const ApplyList = ({ socket }: { socket: any }) => {
  const dispatch = useAppDispatch();
  const [isLoading] = useGetStatus('company', 'getProfileAppliedByJob');
  const {
    me: { id_company },
    jobList: { jobs },
    appliedJob: { applied, total },
  } = useAppSelector((state) => state.companySlice);

  const [selectedApplied, setSelectedApplied] = useState<IApplyUser[]>([]);

  const [job, setJob] = useState<{
    name_job: string;
    id_job: string;
  }>({
    name_job: '',
    id_job: '',
  });

  const { handleSubmit, control, watch } = useForm<{
    applied: IApplyUser[];
  }>({
    defaultValues: { applied },
  });
  const { fields, replace } = useFieldArray({
    control,
    name: 'applied',
    shouldUnregister: false,
  });

  useEffect(() => {
    dispatch(getAllJobByIdCompany(id_company));
  }, []);

  useEffect(() => {
    console.log({ applied });
    replace(applied);
  }, [applied]);

  useEffect(() => {
    socket.on('data', ({ applied }: any) => {
      console.log({ applied });
    });
  }, [socket]);

  useEffect(() => {
    dispatch(
      getProfileAppliedByJob({
        id_company,
        id_job: job.id_job,
      })
    )
      .unwrap()
      .then((data) => {
        replace(
          data.applied.map((apply) => {
            return {
              ...apply,
              checked: false,
            };
          })
        );
        setSelectedApplied([]);
      });
  }, [job]);

  const jobsOption = useMemo(
    () =>
      jobs.map((job) => {
        return {
          name_job: `${job.name_job} - ${moment(job.deadline).format(
            'DD/MM/YYYY'
          )}`,
          id_job: job.id_job,
        };
      }),
    [jobs]
  );

  const handleOnChange = (name_job: string, id_job: string) => {
    if (id_job) {
      setJob({
        id_job,
        name_job: findNameJob(jobsOption, id_job),
      });
    } else {
      setJob({
        id_job: '',
        name_job: '',
      });
    }
  };

  const handleOnSelected = () => {
    const checked = selectedApplied.length === 0 ? true : false;
    const newApplied = fields.map((field) => {
      return { ...field, checked };
    });
    replace(newApplied);
    if (selectedApplied.length === 0) setSelectedApplied(newApplied);
    if (selectedApplied.length > 0) setSelectedApplied([]);
  };

  const handleOnCheck = (id_apply: string, checked: boolean) => {
    const newFields = [...fields];
    const index = newFields.findIndex((item) => item.id_apply === id_apply);
    const newSelected = {
      ...newFields[index],
      checked,
    };
    newFields[index] = newSelected;
    replace(newFields);
    setSelectedApplied(newFields.filter((item) => item.checked));
  };

  const handleOnSubmit = (data: any) => {
    const isStatus =
      selectedApplied.filter((item) => item.status === '' || item.status === 0)
        .length > 0
        ? true
        : false;
    if (isStatus) {
      toastMessage.error('Trạng thái không được bỏ trống');
    } else {
      const payload: {
        id_apply: string;
        id_user: string;
        status: number | string | any;
        name_job: string;
      }[] = selectedApplied.map((item) => {
        return {
          id_apply: item.id_apply,
          status: item.status,
          id_user: item.id_user,
          name_job: item.name_job,
        };
      });

      dispatch(updateStatusApplied(payload))
        .unwrap()
        .then(() => {
          toastMessage.success('Xác nhận trạng thái hồ sơ thành công');
        });
    }
  };

  const handleOnChangeSelect = (id_apply: string, value: number) => {
    const newFields = [...fields];
    const index = newFields.findIndex((item) => item.id_apply === id_apply);
    const newSelected = {
      ...newFields[index],
      status: value,
    };
    newFields[index] = newSelected;
    replace(newFields);
    setSelectedApplied(newFields);
  };

  // if (isLoading) return <LinearProgress />;

  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <ProfileHeader fullName="Hồ sơ ứng tuyển" title="" />

      <Paper
        sx={{
          p: 2,
          mt: 3,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={2}
          pb={4}
          sx={{
            borderBottom: '1px solid #c1c1c1',
          }}
        >
          <Box display="flex" gap={0.5}>
            <Typography variant="h6" fontWeight="600" fontSize="15px">
              {job.name_job ? job.name_job : 'Tất cả vị trí'}
            </Typography>
            <Typography
              variant="h6"
              color={theme.palette.error.main}
              fontSize="15px"
            >
              ({total} hồ sơ nộp)
            </Typography>
          </Box>
          <Box>
            <FormSelect
              name="status"
              placeholder="Tất cả vị trí"
              control={control}
              options={jobsOption}
              keyOption="id_job"
              labelOption="name_job"
              handleChange={handleOnChange}
            />
          </Box>
          {selectedApplied.length > 0 && (
            <Box>
              <Button variant="contained" type="submit">
                Xác nhận
              </Button>
            </Box>
          )}
        </Box>
        {fields.length > 0 ? (
          <Box>
            <Box
              py={2}
              sx={{
                borderBottom: '1px solid #c1c1c1',
              }}
            >
              <Grid container>
                <Grid item xs={0.5}>
                  <Checkbox
                    color="primary"
                    onChange={handleOnSelected}
                    checked={selectedApplied.length === fields.length}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Typography fontWeight="600">Tên hồ sơ</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography fontWeight="600">Vị trí ứng tuyền</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography fontWeight="600" textAlign="center">
                    Thời gian nộp
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography fontWeight="600" textAlign="center">
                    Loại hồ sơ
                  </Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <Typography fontWeight="600" textAlign="center">
                    Trạng thái
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography fontWeight="600" textAlign="center">
                    Hành động
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box>
              {fields.map((apply, index) => (
                <ApplyItem
                  key={apply.id_apply}
                  apply={apply}
                  onCheck={handleOnCheck}
                  index={index}
                  control={control}
                  onSelect={handleOnChangeSelect}
                />
              ))}
            </Box>
          </Box>
        ) : (
          <EmptyData title="Chưa có người ứng tuyển" />
        )}
      </Paper>
    </Box>
  );
};

export default ApplyList;