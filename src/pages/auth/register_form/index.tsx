import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useIsRequestPending } from 'src/hooks';
import { FormInput } from 'src/components/hook_form';
import { IPayloadRegister } from 'src/types/auth';
import { LoadingButton } from '@mui/lab';

const initRegisterForm: IPayloadRegister = {
  email: '',
  password: '',
  fullName: '',
};

const schemaRegister = yup.object().shape({
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Email không được bỏ trống.'),
  password: yup.string().required('Xin vui lòng nhập lại mật khẩu.').min(8),
  fullName: yup.string().required('Họ và tên không được bỏ trống'),
  confirmPassword: yup
    .string()
    .required('Password không được bỏ trống.')
    .min(8, 'Mật khẩu cần ít nhất 8 ký tự')
    .when('password', (password: string, field: any) =>
      password
        ? field
            .required('Mật khẩu không khớp.')
            .oneOf([yup.ref('password')], 'Mật khẩu không khớp.')
        : field
    ),
});

const RegisterForm = ({
  onSubmit,
}: {
  onSubmit: (data: IPayloadRegister) => void;
}) => {
  const isLoading = useIsRequestPending('user', 'registerUser');

  const { control, handleSubmit } = useForm({
    defaultValues: initRegisterForm,
    resolver: yupResolver(schemaRegister),
  });

  const handleOnSubmit = (data: IPayloadRegister) => {
    onSubmit(data);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1.5}
      mb={2}
      component="form"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <FormInput control={control} name="email" label="Địa chỉ email" />
      <FormInput control={control} name="fullName" label="Nhập họ và tên" />

      <FormInput
        control={control}
        type="password"
        name="password"
        label="Nhập mật khẩu"
      />

      <FormInput
        control={control}
        type="password"
        name="confirmPassword"
        label="Nhập lại mật khẩu"
      />
      <LoadingButton
        onClick={handleSubmit(handleOnSubmit)}
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
  );
};

export default RegisterForm;
