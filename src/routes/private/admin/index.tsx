import React from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from 'src/hooks';
import { checkRoleAdmin } from 'src/utils/common';

export const PrivateAdmin = ({ children }: { children: any }) => {
  const { me, token } = useAppSelector((state) => state.userSlice);

  if (checkRoleAdmin(me?.id_role, token)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export const PrivateLoginAdmin = ({ children }: { children: any }) => {
  const { me, token } = useAppSelector((state) => state.companySlice);

  if (!checkRoleAdmin(me?.id_role, token)) {
    return <Navigate to="/auth/admin/login" replace />;
  }
  return children;
};
