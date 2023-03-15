import React, { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch } from 'src/hooks';
import LoginForm from 'src/pages/auth/login_form';
import { openModal } from 'src/redux_store/common/modal/modal_slice';

export const PrivateUser = ({
  token,
  children,
}: {
  token: any;
  children: any;
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) {
      dispatch(
        openModal({
          modalId: MODAL_IDS.login,
          dialogComponent: <LoginForm />,
        })
      );
    }
  }, []);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};
