import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput, FormSelect } from 'src/components/hook_form';
import { useForm } from 'react-hook-form';
import theme from 'src/theme';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { CPersonnelSize } from 'src/constants/common';
import { useAppDispatch, useAppSelector, useGetStatus } from 'src/hooks';
import { IPayloadRegisterCompany } from 'src/types/company';
import { LoadingButton } from '@mui/lab';
import { registerCompany } from 'src/redux_store/company/company_action';
import { toastMessage } from 'src/utils/toast';

const schemaRegister = yup.object().shape({
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Email không được bỏ trống.'),
  password: yup.string().required('Xin vui lòng nhập lại mật khẩu.').min(6),
  fullName: yup.string().required('Họ và tên không được bỏ trống'),

  phone: yup.number().required('Số điện thoại không được bỏ trống'),
  name_company: yup.string().required('Tên công ty không được bỏ trống'),
  total_people: yup.string().required('Quy mô nhân sự không được bỏ trống'),
  city: yup.string().required('Địa điểm không được bỏ trống'),
  address: yup.string().required('Địa chỉ công ty không được bỏ trống'),
  fieldOfActivity: yup
    .string()
    .required('Lĩnh vực hoạt động không được bỏ trống'),
});

const RegisterFormCompany = () => {
  const { cityfield, companyfield } = useAppSelector(
    (state) => state.commonSlice.fieldList
  );
  const [isLoading] = useGetStatus('company', 'registerCompany');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<IPayloadRegisterCompany>({
    defaultValues: {
      address: '',
      city: '',
      email: '',
      faxCode: '',
      fieldOfActivity: '',
      fullName: '',
      name_company: '',
      password: '',
      total_people: '',
    },

    resolver: yupResolver(schemaRegister),
  });

  const handleOnSubmit = (data: IPayloadRegisterCompany) => {
    dispatch(registerCompany(data))
      .unwrap()
      .then(() => {
        toastMessage.success('Đăng ký tài khoản thành công');
        navigate('/company/login');
      });
  };
  return (
    <Box
      sx={{
        width: '35rem',
        borderRadius: 2,
        padding: 3,
        bgcolor: theme.palette.common.white,
        margin: '0 auto',
        mt: '1rem',
        '& .MuiFormLabel-asterisk': {
          color: theme.palette.error.main,
        },
      }}
    >
      <Box>
        <Typography fontWeight="600" fontSize="18px" textAlign="center">
          Đăng ký tài khoản nhà tuyển dụng
        </Typography>
        <Typography textAlign="center">
          Đăng ký tài khoản nhà tuyển dụng
          <Link
            to="/company/login"
            style={{
              color: theme.palette.primary.main,
              paddingLeft: '5px',
              fontWeight: 600,
            }}
          >
            Đăng nhập
          </Link>
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap={1.5}
        mb={2}
        component="form"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <FormInput
          control={control}
          name="email"
          label="Địa chỉ email"
          placeholder="Nhập địa chỉ email"
          required
        />

        <FormInput
          control={control}
          type="password"
          name="password"
          placeholder="Mật khẩu ít nhất 8 ký tự"
          label="Nhập mật khẩu"
          required
        />

        <FormInput
          control={control}
          name="fullName"
          label="Họ và tên"
          placeholder="Nhập họ và tên"
          required
        />
        <FormInput
          control={control}
          name="phone"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          type="number"
          required
        />
        <FormInput
          control={control}
          name="name_company"
          label="Tên công ty"
          placeholder="Tên công ty theo giấy phép đăng ký kinh doanh"
          required
        />
        <FormInput
          control={control}
          name="faxCode"
          label="Mã số thuế"
          placeholder="Nhập mã số thuế"
        />
        <FormSelect
          control={control}
          name="total_people"
          options={CPersonnelSize}
          keyOption="value"
          label="Quy mô nhân sự"
          labelOption="value"
          required
        />
        <FormSelect
          control={control}
          name="city"
          options={cityfield}
          label="Địa điểm"
          keyOption="id_city"
          labelOption="name_city"
          required
        />
        <FormInput
          control={control}
          name="address"
          label="Địa chỉ công ty"
          placeholder="Nhập địa chỉ công ty"
          required
        />
        <FormSelect
          control={control}
          name="fieldOfActivity"
          options={companyfield}
          label="Lĩnh vực hoạt động"
          keyOption="id_companyField"
          labelOption="name_field"
          required
        />
        <LoadingButton
          variant="contained"
          loading={isLoading}
          type="submit"
          sx={{
            width: '100%',
            py: 1.5,
            fontSize: '16px',
          }}
        >
          Đăng ký
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default RegisterFormCompany;