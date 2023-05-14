import React from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from 'src/hooks';
import { checkRoleAdmin, checkRoleCompany } from 'src/utils/common';

export const PrivateCompany = ({ children }: { children: any }) => {
  const { me, token } = useAppSelector((state) => state.authSlice);
  if (checkRoleCompany(me?.id_role, token)) {
    return <Navigate to="/company/home/ho-so-cong-ty" replace />;
  }
  if (checkRoleAdmin(me?.id_role, token)) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return children;
};

export const PrivateLoginCompany = ({ children }: { children: any }) => {
  const { me, token } = useAppSelector((state) => state.authSlice);

  if (!checkRoleCompany(me?.id_role, token))
    return <Navigate to="/company/login" replace />;

  return children;
};
