import { Avatar, Box, Button, Grid, Typography, Link } from '@mui/material';
import '@react-pdf-viewer/core/lib/styles/index.css';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { ReactComponent as PdfSvg } from 'src/assets/svg/pdf.svg';
import { LabelOptions } from 'src/components/hook_form/label_options';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import { getCandidateDetail } from 'src/redux_store/company/company_action';
import { formatPrice } from 'src/utils/function';
import theme from 'src/theme';
import { baseURL } from 'src/config';

export const FieldItem = ({
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
  const [value, setValue] = useState('0');

  const {
    profileModal: { profileCV, user_info },
  } = useAppSelector((state) => state.companySlice);

  const {
    fieldList: {
      cityfield,
      companyfield,
      experiencefield,
      workingformfield,
      typerankfield,
    },
  } = useAppSelector((state) => state.commonSlice);
  const { reset } = useForm({
    defaultValues: user_info,
  });

  const handleClose = () => [
    dispatch(
      closeModal({
        modalId: MODAL_IDS.profileUserModal,
      })
    ),
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getCandidateDetail(id_user))
      .unwrap()
      .then((data) => {
        const { user_info } = data;
        reset(user_info);
      });
  }, []);

  return (
    <DialogWrapper
      modalId={MODAL_IDS.profileUserModal}
      maxWidth={1000}
      minWidth={1000}
    >
      <Box p={2}>
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
              src={`${baseURL}/${user_info.avatar}`}
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
              {user_info.fullName}
            </Typography>
          </Box>
          <Grid container rowSpacing={2}>
            <Grid item xs={4}>
              <FieldItem title="Số điện thoại" content={user_info.phone} />
            </Grid>
            <Grid item xs={4}>
              <FieldItem title="Email" content={user_info.email} />
            </Grid>
            <Grid item xs={4}>
              <FieldItem
                title="Ngày sinh"
                content={moment(user_info.birthDay).format('DD/MM/YYYY')}
              />
            </Grid>
            <Grid item xs={4}>
              <FieldItem title="Giới tính" content={user_info.gender} />
            </Grid>
            <Grid item xs={4}>
              <FieldItem title="Tỉnh / Thành phố" content={user_info.city} />
            </Grid>
            <Grid item xs={4}>
              <FieldItem title="Địa chỉ" content={user_info.address} />
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

          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                {profileCV.map((item, index) => (
                  <Tab
                    label={`Hồ sơ ${index + 1}`}
                    value={`${index}`}
                    key={item.id_profile}
                  />
                ))}
              </TabList>
            </Box>
            {profileCV.map((item, index) => (
              <TabPanel
                value={`${index}`}
                key={item.id_profile}
                sx={{
                  px: 0,
                }}
              >
                <Box
                  sx={{
                    border: '1px solid #c1c1c1',
                    borderRadius: '8px',
                    p: 2,
                  }}
                >
                  <Grid container rowSpacing={2}>
                    <Grid item xs={4}>
                      <Box gap={2} display="flex" alignItems="center">
                        <PdfSvg />
                        <Box>
                          <Typography fontWeight="600">
                            {item.file_name}
                          </Typography>
                          <Link href={`${item.file_cv}`} target="_blank">
                            Xem hồ sơ
                          </Link>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <FieldItem
                        title="Vị trí mong muốn"
                        content={item.career_goals}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <LabelOptions
                        value={item.id_type_current}
                        options={typerankfield}
                        title="Cấp bậc hiện tại"
                        keyOption="id_rank"
                        labelOption="name_rank"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <LabelOptions
                        value={item.id_type_current}
                        options={typerankfield}
                        title="Cấp bậc mong muốn"
                        keyOption="id_rank"
                        labelOption="name_rank"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FieldItem
                        title="Mức lương mong muốn"
                        content={formatPrice(item.desired_salary)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <LabelOptions
                        value={item.id_experience}
                        options={experiencefield}
                        title="Số năm kinh nghiệm"
                        keyOption="id_experience"
                        labelOption="name_experience"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <LabelOptions
                        value={item.id_working_form}
                        options={workingformfield}
                        title="Hình thức làm việc"
                        keyOption="id_working_form"
                        labelOption="name_working_form"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <LabelOptions
                        value={item.id_company_field}
                        options={companyfield}
                        title="Nghề nghiệp"
                        keyOption="id_companyField"
                        labelOption="name_field"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <LabelOptions
                        value={item.id_city}
                        options={cityfield}
                        title="Địa điểm làm việc"
                        keyOption="id_city"
                        labelOption="name_city"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>
            ))}
          </TabContext>
        </Box>

        <Box my={1} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" sx={{}} onClick={handleClose}>
            Đóng
          </Button>
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default ProfileUserModal;
