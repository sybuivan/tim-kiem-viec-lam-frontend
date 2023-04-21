import React from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from 'src/hooks';
import { checkRoleAdmin, checkRoleCompany } from 'src/utils/common';

export const PrivateCompany = ({ children }: { children: any }) => {
  const { me, token } = useAppSelector((state) => state.companySlice);
  const id_role = useAppSelector((state) => state.userSlice.me?.id_role);
  const token_admin = useAppSelector((state) => state.userSlice.token);

  console.log({ id_role: me?.id_role, token });
  if (checkRoleCompany(me?.id_role, token)) {
    return <Navigate to="/company/home/ho-so-cong-ty" replace />;
  }
  if (checkRoleAdmin(id_role, token_admin)) {
    return <Navigate to="/admin/dashboard" replace />;
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
