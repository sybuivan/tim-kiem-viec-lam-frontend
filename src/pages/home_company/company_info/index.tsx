import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import {
  AccountCircleOutlined,
  FileUploadOutlined,
  DeleteOutlineOutlined,
  SaveOutlined,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import theme from 'src/theme';
import { FormInput, FormSelect, FormTextarea } from 'src/components/hook_form';
import { useAppSelector, useAppDispatch, useGetStatus } from 'src/hooks';
import { messageRequired } from 'src/utils/common';
import { LoadingButton } from '@mui/lab';
import { updateProfile } from 'src/redux_store/company/company_action';
import { toastMessage } from 'src/utils/toast';
import ProfileHeader from 'src/components/profile_bar/header';
import { CPersonnelSize, phoneRegExp } from 'src/constants/common';
import { IPayloadCompanyInfo } from 'src/types/company';

const schema = yup.object().shape({
  fullName: yup.string().required(messageRequired('Họ và tên')),
  city: yup.string().required(messageRequired('Tỉnh thành')),
  phone: yup
    .string()
    .required(messageRequired('Số điện thoại'))
    .matches(phoneRegExp, 'Không đúng định dạng số điện thoại')
    .min(9, 'Không đúng định dạng số điện thoại')
    .max(10, 'Không đúng định dạng số điện thoại'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required(messageRequired('Email')),
  address: yup.string().required(messageRequired('Địa chỉ')),
  idCompanyField: yup.string().required(messageRequired('Lĩnh vực hoạt động')),
  introduce: yup.string().required(messageRequired('Giới thiệu')),
  name_company: yup.string().required(messageRequired('Tên công ty')),
  total_people: yup.string().required(messageRequired('Quy mô')),
  lat: yup.string().required(messageRequired('Kinh độ')),
  lng: yup.string().required(messageRequired('Vĩ độ')),
  //   faxCode: yup.string(),
  //   link_website: yup.string(),
});

const CompanyInfoAdmin = () => {
  const dispatch = useAppDispatch();
  const [isLoading] = useGetStatus('user', 'updateProfile');
  const { me } = useAppSelector((state) => state.companySlice);
  const { cityfield, companyfield } = useAppSelector(
    (state) => state.commonSlice.fieldList
  );

  const [privewImage, setPrivewImage] = useState<string>(me.logo || '');
  const [coverImage, setPreCoverImage] = useState<string>(me.cover_image || '');

  const [file, setFile] = useState<any>();
  const [fileCover, setFileCover] = useState<any>();

  const { control, handleSubmit } = useForm<IPayloadCompanyInfo>({
    defaultValues: me,
    resolver: yupResolver(schema),
  });

  const handleOnChangeFile = (e: any) => {
    setFile(e.target.files[0]);
    setPrivewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleOnChangeCoverImage = (e: any) => {
    setFileCover(e.target.files[0]);
    setPreCoverImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleOnSubmit = (data: IPayloadCompanyInfo) => {
    const {
      address,
      faxCode,
      city,
      email,
      fullName,
      introduce,
      name_company,
      phone,
      total_people,
      lat,
      lng,
      link_website,
      idCompanyField,
    } = data;
    const formData = new FormData();

    formData.append('city', city);
    formData.append('address', address);
    formData.append('fullName', fullName);
    formData.append('phone', phone.toString());
    formData.append('email', email);
    formData.append('faxCode', faxCode ?? '');
    formData.append('idCompanyField', idCompanyField ?? '');
    formData.append('introduce', introduce);
    formData.append('name_company', name_company);
    formData.append('total_people', total_people);
    formData.append('lat', lat?.toString() ?? '');
    formData.append('lng', lng?.toString() ?? '');
    formData.append('link_website', link_website ?? '');
    formData.append('id_company', me.id_company);

    if (fileCover) {
      formData.append('cover_background', fileCover, fileCover.name);
    }

    if (file) {
      formData.append('logo', file, file.name);

      dispatch(
        updateProfile({
          id_company: me.id_company,
          payload: formData,
        })
      )
        .unwrap()
        .then(() => {
          toastMessage.success('Chỉnh sửa thông tin tài khoản thành công');
        });
    } else {
      if (me.logo) {
        dispatch(
          updateProfile({
            id_company: me.id_company,
            payload: formData,
          })
        )
          .unwrap()
          .then(() => {
            toastMessage.success('Chỉnh sửa thông tin tài khoản thành công');
          });
      } else {
        toastMessage.error('Logo không được bỏ trống');
      }
    }
  };
  return (
    <Box>
      <ProfileHeader fullName={me.fullName} />
      <Paper>
        <Box
          p={2}
          sx={{
            borderBottom: '1px solid #adbebf',
          }}
        >
          <Typography fontSize="18px" fontWeight="600">
            Thông tin công ty
          </Typography>
        </Box>
        <Box
          sx={{
            px: 2,
          }}
        >
          <Box py={2} component="form" onSubmit={handleSubmit(handleOnSubmit)}>
            <Typography fontWeight="600" pb={2}>
              Logo
            </Typography>

            <Box display="flex" gap={2} alignItems="center">
              <Box
                width="100px"
                height="100px"
                sx={{
                  backgroundColor: theme.palette.grey[100],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {privewImage ? (
                  <img src={privewImage} alt="" width="100px" height="100px" />
                ) : (
                  <AccountCircleOutlined
                    sx={{
                      color: theme.palette.grey[300],
                      fontSize: '40px',
                    }}
                  />
                )}
              </Box>
              <Button
                variant="contained"
                startIcon={<FileUploadOutlined />}
                component="label"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                }}
              >
                Tải ảnh lên
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleOnChangeFile}
                />
              </Button>
            </Box>
          </Box>

          <Box>
            <Grid container columnSpacing={3} rowSpacing={2}>
              <Grid item xs={6}>
                <FormInput
                  control={control}
                  label="Họ và tên nguời đại diện"
                  name="fullName"
                  placeholder="Nhập họ và tên"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  control={control}
                  label="Tên công ty"
                  name="name_company"
                  placeholder="Nhập tên công ty"
                  required
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  control={control}
                  label="Email"
                  name="email"
                  placeholder="Nhập địa chỉ email"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  control={control}
                  label="Số điện thoại"
                  name="phone"
                  placeholder="Nhập số điện thoại"
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
                  required
                  labelOption="name_city"
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  control={control}
                  label="Nhập địa chỉ"
                  name="address"
                  placeholder="Ví dụ: Số nhà 98A, phố Ngụy Như Kon Tum, phường ..."
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <FormSelect
                  control={control}
                  name="total_people"
                  options={CPersonnelSize}
                  keyOption="value"
                  label="Quy mô nhân sự"
                  labelOption="value"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormSelect
                  control={control}
                  name="idCompanyField"
                  options={companyfield}
                  label="Lĩnh vực hoạt động"
                  keyOption="id_companyField"
                  labelOption="name_field"
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <FormInput
                  control={control}
                  label="Link website"
                  name="link_website"
                  placeholder="Nhập link website"
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  control={control}
                  label="Lat"
                  name="lat"
                  placeholder="Nhập kinh độ"
                  type="number"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  control={control}
                  label="Lng"
                  name="lng"
                  placeholder="Nhập vĩ độ"
                  type="number"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  control={control}
                  name="faxCode"
                  label="Mã số thuế"
                  placeholder="Nhập mã số thuế"
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextarea
                  control={control}
                  name="introduce"
                  label="Giới thiệu công ty"
                  placeholder="Nhập giới đoạn văn giới thiệu công ty"
                  minRows={6}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Button
                    variant="contained"
                    startIcon={<FileUploadOutlined />}
                    component="label"
                    sx={{
                      backgroundColor: theme.palette.success.main,
                      color: theme.palette.common.white,
                    }}
                  >
                    Tải ảnh bìa
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleOnChangeCoverImage}
                    />
                  </Button>
                  <Box>
                    {coverImage ? (
                      <img
                        src={coverImage}
                        alt=""
                        width="500px"
                        height="300px"
                      />
                    ) : (
                      <AccountCircleOutlined
                        sx={{
                          color: theme.palette.grey[300],
                          fontSize: '40px',
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end" py={2}>
              <Box display="flex" gap={2}>
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
                  Lưu thông tin
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CompanyInfoAdmin;
