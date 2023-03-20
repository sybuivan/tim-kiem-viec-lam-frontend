import React, { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { checkRoleCompany } from 'src/utils/common';

export const PrivateCompany = ({ children }: { children: any }) => {
  const { me, token } = useAppSelector((state) => state.companySlice);

  if (checkRoleCompany(me?.id_role, token)) {
    return <Navigate to="/company/home/ho-so-cong-ty" replace />;
  }

  return children;
};

export const PrivateLoginCompany = ({ children }: { children: any }) => {
  const { me, token } = useAppSelector((state) => state.companySlice);

  if (!checkRoleCompany(me?.id_role, token)) {
    return <Navigate to="/company/login" replace />;
  }

  return children;
};
