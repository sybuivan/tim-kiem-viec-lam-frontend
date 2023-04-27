import { Box, Button, Typography, Grid, Avatar } from '@mui/material';
import '@react-pdf-viewer/core/lib/styles/index.css';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LabelOptions } from 'src/components/hook_form/label_options';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import { getCandidateDetail } from 'src/redux_store/company/company_action';
import theme from 'src/theme';
import { ICandidateDetail } from 'src/types/company';
import { formatPrice } from 'src/utils/function';

const FieldItem = ({
  title,
  content,
}: {
  title: string;
  content: string | number;
}) => {
  return (
    <Box>
      <Typography fontWeight="600">{title}</Typography>
      <Typography color={theme.palette.grey[600]} fontWeight="600">
        {content}
      </Typography>
    </Box>
  );
};

const ProfileUserModal = ({ id_user }: { id_user: string }) => {
  const dispatch = useAppDispatch();
  const { profileModal } = useAppSelector((state) => state.companySlice);
  const {
    address,
    avatar,
    email,
    fullName,
    id_city,
    city,
    birthDay,
    career_goals,
    desired_salary,
    file_cv,
    file_name,
    gender,
    id_company_field,
    id_experience,
    id_type_current,
    id_type_desired,
    id_working_form,
    phone,
  } = profileModal;
  const {
    fieldList: {
      cityfield,
      companyfield,
      experiencefield,
      workingformfield,
      typerankfield,
    },
  } = useAppSelector((state) => state.commonSlice);
  const { control, reset } = useForm({
    defaultValues: {
      id_type_current,
      id_working_form,
      id_experience,
      id_type_desired,
      id_company_field,
      id_city,
    },
  });

  const handleClose = () => [
    dispatch(
      closeModal({
        modalId: MODAL_IDS.profileModal,
      })
    ),
  ];

  useEffect(() => {
    dispatch(getCandidateDetail(id_user))
      .unwrap()
      .then((data) => {
        const {
          user_info: {
            id_type_current,
            id_working_form,
            id_experience,
            id_type_desired,
            id_company_field,
            id_city,
          },
        } = data;
        console.log({ id_company_field });
        reset({
          id_type_current,
          id_working_form,
          id_experience,
          id_type_desired,
          id_company_field,
          id_city,
        });
      });
  }, []);

  return (
    <DialogWrapper modalId={MODAL_IDS.profileUserModal} minWidth={800}>
      <Box p={6}>
        <Typography
          fontSize="16px"
          color={theme.palette.common.black}
          fontWeight="600"
          my={2}
        >
          Thông tin ứng viên
        </Typography>
        <Box
          sx={{
            border: '1px solid #c1c1c1',
            borderRadius: '8px',
            p: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar
              src={avatar}
              sx={{
                width: '100px',
                height: '100px',
              }}
            />
            <Typography
              fontSize="16px"
              color={theme.palette.common.black}
              fontWeight="600"
              my={2}
            >
              {fullName}
            </Typography>
          </Box>
          <Grid container rowSpacing={2}>
            <Grid item xs={4}>
              <FieldItem title="Số điện thoại" content={phone} />
            </Grid>
            <Grid item xs={4}>
              <FieldItem title="Email" content={email} />
            </Grid>
            <Grid item xs={4}>
              <FieldItem
                title="Ngày sinh"
                content={moment(birthDay).format('DD/MM/YYYY')}
              />
            </Grid>
            <Grid item xs={4}>
              <FieldItem title="Giới tính" content={gender} />
            </Grid>
            <Grid item xs={4}>
              <FieldItem title="Tỉnh / Thành phố" content={city} />
            </Grid>
            <Grid item xs={4}>
              <FieldItem title="Địa chỉ" content={address} />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Typography
            fontSize="16px"
            color={theme.palette.common.black}
            fontWeight="600"
            my={2}
          >
            Hồ sơ đính kèm
          </Typography>
          <Box
            sx={{
              border: '1px solid #c1c1c1',
              borderRadius: '8px',
              p: 2,
            }}
          >
            <Grid container rowSpacing={2}>
              <Grid item xs={4}>
                <FieldItem title="Vị trí mong muốn" content={career_goals} />
              </Grid>
              <Grid item xs={4}>
                <LabelOptions
                  name="id_type_current"
                  control={control}
                  options={typerankfield}
                  title="Cấp bậc hiện tại"
                  keyOption="id_rank"
                  labelOption="name_rank"
                />
              </Grid>
              <Grid item xs={4}>
                <LabelOptions
                  name="id_type_desired"
                  control={control}
                  options={typerankfield}
                  title="Cấp bậc mong muốn"
                  keyOption="id_rank"
                  labelOption="name_rank"
                />
              </Grid>
              <Grid item xs={4}>
                <FieldItem
                  title="Mức lương mong muốn"
                  content={formatPrice(desired_salary)}
                />
              </Grid>
              <Grid item xs={4}>
                <LabelOptions
                  name="id_experience"
                  control={control}
                  options={experiencefield}
                  title="Số năm kinh nghiệm"
                  keyOption="id_experience"
                  labelOption="name_experience"
                />
              </Grid>
              <Grid item xs={4}>
                <LabelOptions
                  name="id_working_form"
                  control={control}
                  options={workingformfield}
                  title="Hình thức làm việc"
                  keyOption="id_working_form"
                  labelOption="name_working_form"
                />
              </Grid>
              <Grid item xs={4}>
                <LabelOptions
                  name="id_company_field"
                  control={control}
                  options={companyfield}
                  title="Nghề nghiệp"
                  keyOption="id_companyField"
                  labelOption="name_field"
                />
              </Grid>
              <Grid item xs={4}>
                <LabelOptions
                  name="id_city"
                  control={control}
                  options={cityfield}
                  title="Địa điểm làm việc"
                  keyOption="id_city"
                  labelOption="name_city"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box my={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" sx={{}} onClick={handleClose}>
            Đóng
          </Button>
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default ProfileUserModal;
