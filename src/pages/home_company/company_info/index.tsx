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
import { FormInput, FormSelect } from 'src/components/hook_form';
import { useAppSelector, useAppDispatch, useGetStatus } from 'src/hooks';
import { LoadingButton } from '@mui/lab';
import { updateProfile } from 'src/redux_store/company/company_action';
import { toastMessage } from 'src/utils/toast';
import ProfileHeader from 'src/components/profile_bar/header';
import { CPersonnelSize } from 'src/constants/common';
import { IPayloadCompanyInfo } from 'src/types/company';
import { schemaProfileCompany } from 'src/constants/schema';
import SunEditorComponent from 'src/components/suneditor';

const CompanyInfoAdmin = () => {
  const dispatch = useAppDispatch();
  const [isLoading] = useGetStatus('user', 'updateProfile');
  const { me } = useAppSelector((state) => state.authSlice);
  const { cityfield, companyfield } = useAppSelector(
    (state) => state.commonSlice.fieldList
  );
  const [introduce, setIntroduce] = useState<string>(me?.introduce);
  const [privewImage, setPrivewImage] = useState<string>(me.logo || '');
  const [coverImage, setPreCoverImage] = useState<string>(me.cover_image || '');

  const [file, setFile] = useState<any>();
  const [fileCover, setFileCover] = useState<any>();

  const { control, handleSubmit } = useForm<IPayloadCompanyInfo>({
    defaultValues: me,
    resolver: yupResolver(schemaProfileCompany),
  });

  const handleOnChangeFile = (e: any) => {
    setFile(e.target.files[0]);
    setPrivewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleOnChangeCoverImage = (e: any) => {
    setFileCover(e.target.files[0]);
    setPreCoverImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (content: string) => {
    setIntroduce(content);
  };

  const handleOnSubmit = (data: IPayloadCompanyInfo) => {
    console.log({ data });

    const {
      address,
      faxCode,
      city,
      email,
      fullName,
      name_company,
      phone,
      total_people,
      lat,
      lng,
      link_website,
      idCompanyField,
    } = data;
    const formData = new FormData();
    if (!introduce)
      return toastMessage.error('Giới thiệu công ty không được bỏ trống');

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
      <Box gap={2} position="relative" mb={2}>
        <Box bgcolor={theme.palette.grey[200]} py={1}>
          {coverImage ? (
            <div
              style={{
                backgroundImage: `url(${coverImage})`,
                width: '100%',
                height: '300px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'contain',
              }}
            ></div>
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
            backgroundColor: theme.palette.success.main,
            color: theme.palette.common.white,
            position: 'absolute',
            bottom: '10px',
            right: '10px',
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
      </Box>
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
                    <img
                      src={privewImage}
                      alt=""
                      width="100px"
                      height="100px"
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
                  disabled
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
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <SunEditorComponent
                  onChange={handleChange}
                  content={me?.introduce}
                  label="Giới thiệu công ty"
                />
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
