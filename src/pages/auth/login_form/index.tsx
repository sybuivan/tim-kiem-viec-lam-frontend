import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormInput } from 'src/components/hook_form';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch, useIsRequestPending } from 'src/hooks';
import { setLoginInfo } from 'src/redux_store/auth/authSlice';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import { loginUser, registerUser } from 'src/redux_store/user/user_action';
import { getApplyList } from 'src/redux_store/apply/apply_actions';
import theme from 'src/theme';
import { IPayloadLogin, IPayloadRegister } from 'src/types/auth';
import { toastMessage } from 'src/utils/toast';
import * as yup from 'yup';
import RegisterForm from '../register_form';

const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Email không được bỏ trống.'),
  password: yup.string().required('Xin vui lòng nhập lại mật khẩu.').min(8),
});

const LoginForm = ({ socket }: { socket: any }) => {
  const isLoading = useIsRequestPending('user', 'loginUser');

  const dispatch = useAppDispatch();
  const initLoginForm: IPayloadLogin = {
    email: '',
    password: '',
  };

  const [isRegister, setIsRegister] = useState<boolean>(false);

  const { control, handleSubmit } = useForm({
    defaultValues: initLoginForm,
    resolver: yupResolver(schemaLogin),
  });
  const handleOnSubmit = (data: IPayloadLogin) => {
    dispatch(loginUser(data))
      .unwrap()
      .then((data) => {
        const { accessToken, users } = data;
        dispatch(setLoginInfo({ users, accessToken }));
        dispatch(getApplyList(users.id_user));
        toastMessage.success('Đăng nhập tài khoản thành công');
        dispatch(
          closeModal({
            modalId: MODAL_IDS.login,
          })
        );
        socket.emit('user_id', data.users.id_user);
      });
  };

  const handleOnSubmitRegister = (data: IPayloadRegister) => {
    const { email, password, fullName } = data;
    dispatch(
      registerUser({
        email,
        password,
        fullName,
      })
    )
      .unwrap()
      .then((data) => {
        toastMessage.success('Đăng ký tài khoản thành công');
      });
  };
  return (
    <DialogWrapper modalId={MODAL_IDS.login} minWidth={875}>
      <Box
        display="flex"
        alignItems="center"
        component="form"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Box flex="1" p={2}>
          <Box py={1}>
            <Typography fontSize="18px" textAlign="center">
              Người tìm việc
            </Typography>
            <Typography fontSize="20px" textAlign="center" fontWeight="600">
              {isRegister
                ? 'Đăng ký tài khoản với tìm kiếm việc làm'
                : ' Đăng nhập với tìm kiếm việc làm'}
            </Typography>
          </Box>
          {isRegister ? (
            <RegisterForm onSubmit={handleOnSubmitRegister} />
          ) : (
            <>
              <Box display="flex" flexDirection="column" gap={1.5} mb={2}>
                <FormInput
                  control={control}
                  name="email"
                  label="Địa chỉ email"
                />

                <FormInput
                  control={control}
                  type="password"
                  name="password"
                  label="Nhập mật khẩu"
                />
              </Box>
              <LoadingButton
                type="submit"
                loading={isLoading}
                variant="contained"
                sx={{
                  width: '100%',
                  py: 1.5,
                  fontSize: '16px',
                }}
              >
                Đăng nhập
              </LoadingButton>
            </>
          )}

          <Typography pt={2} pb={1} fontSize="16px" textAlign="end">
            Bạn chưa có tài khoản?
            <Typography
              fontSize="16px"
              sx={{
                fontWeight: '600',
                cursor: 'pointer',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
              onClick={() => setIsRegister((pre) => !pre)}
            >
              {isRegister ? 'Đăng nhập ngay' : 'Đăng ký ngay'}
            </Typography>
          </Typography>
        </Box>
        <Box flex="1" height="395px">
          <img
            width="100%"
            src="https://img.timvieckysu.com/2021/08/quy-trinh-tuyen-dung.jpg"
            alt=""
            height="100%"
            style={{
              display: 'block',
            }}
          />
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default LoginForm;
