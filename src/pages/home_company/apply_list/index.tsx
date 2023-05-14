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
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch, useAppSelector, useGetStatus } from 'src/hooks';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import {
  getAllJobByIdCompany,
  getProfileAppliedByJob,
} from 'src/redux_store/company/company_action';
import { setPayloadMail } from 'src/redux_store/company/company_slices';

import { COptionStatusApply } from 'src/constants/common';
import { IApplyUser } from 'src/types/apply';
import { findNameJob } from 'src/utils/function';
import { toastMessage } from 'src/utils/toast';
import theme from 'src/theme';
import ApplyItem from './apply_item';
import MailerModal, { messageMail } from './mailer_modal';

const ApplyList = ({ socket }: { socket: any }) => {
  const dispatch = useAppDispatch();
  const [isLoading] = useGetStatus('company', 'getProfileAppliedByJob');
  const {
    me: { id_company, name_company, phone, address },
    jobList: { jobs },
    appliedJob: { applied, total },
  } = useAppSelector((state) => state.companySlice);

  const [selectedApplied, setSelectedApplied] = useState<IApplyUser[]>([]);
  const [statusJob, setStatusJob] = useState<any>('');

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
        status_job: statusJob,
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
  }, [job, statusJob]);

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

  const changeOnChangeStatus = (name: string, value: string) => {
    setStatusJob(value);
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

  const handleOnSubmit = (data: any) => {};

  const handleOnChangeSelect = (id_apply: string, value: number) => {
    const newFields = [...fields];
    const index = newFields.findIndex((item) => item.id_apply === id_apply);
    const newSelected = {
      ...newFields[index],
      status: value,
    };
    newFields[index] = newSelected;
    replace(newFields);
    setSelectedApplied(newFields.filter((item) => item.checked));
  };

  const [times, setTimes] = useState<
    { id_apply: string; hour: string; date: string }[]
  >([]);

  const handleChangeTime = (name: string, value: string, index: number) => {};

  const handleOpenModal = () => {
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
        email: string;
        id_user: string;
        status: number | string | any;
        name_job: string;
        fullName: string;
        date?: any;
        hour?: any;
        messageMailer: string;
      }[] = selectedApplied.map((item) => {
        return {
          id_apply: item.id_apply,
          fullName: item.fullName,
          status: item.status,
          id_user: item.id_user,
          name_job: item.name_job,
          email: item.email,
          messageMailer: messageMail(
            item.status,
            item.name_job,
            item.fullName,
            phone,
            name_company,
            address,
            moment(new Date()).format('DD/MM/YYYY'),
            moment(new Date()).format('HH:mm')
          ),
        };
      });

      dispatch(setPayloadMail(payload));

      dispatch(
        openModal({
          modalId: MODAL_IDS.mailerModal,
          dialogComponent: <MailerModal />,
        })
      );
    }
  };

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
          sx={{
            borderBottom: '1px solid #c1c1c1',
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={2}
          >
            <Grid container columnSpacing={1} alignItems="center">
              <Grid item xs={5}>
                <FormSelect
                  name="position"
                  placeholder="Tất cả vị trí"
                  control={control}
                  options={jobsOption}
                  keyOption="id_job"
                  labelOption="name_job"
                  handleChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={4}>
                <FormSelect
                  name="status"
                  placeholder="Tất cả trạng thái"
                  control={control}
                  options={[
                    ...COptionStatusApply,
                    {
                      label: 'Chưa xem',
                      status: 0,
                    },
                  ]}
                  keyOption="status"
                  labelOption="label"
                  handleChange={changeOnChangeStatus}
                />
              </Grid>
              {selectedApplied.length > 0 && (
                <Grid item xs={3}>
                  <Button variant="contained" onClick={handleOpenModal}>
                    Xác nhận và gửi mail
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
          <Box display="flex" gap={0.5} mb={2}>
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
