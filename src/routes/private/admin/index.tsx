import React from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from 'src/hooks';
import { checkRoleAdmin } from 'src/utils/common';

export const PrivateAdmin = ({ children }: { children: any }) => {
  const { me, token } = useAppSelector((state) => state.userSlice);

  console.log({ meUser: checkRoleAdmin(me?.id_role, token) });

  if (checkRoleAdmin(me?.id_role, token)) {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
};

export const PrivateDashboard = ({ children }: { children: any }) => {
  const { me, token } = useAppSelector((state) => state.userSlice);

  console.log({ me });

  if (!checkRoleAdmin(me?.id_role, token)) {
    return <Navigate to="/auth/admin/login" replace />;
  }
  return children;
};
