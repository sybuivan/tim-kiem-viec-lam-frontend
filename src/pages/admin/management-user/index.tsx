import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import { getAllUsers } from 'src/redux_store/admin/admin_actions';
import { resetData } from 'src/redux_store/admin/admin_slice';
import UserList from './user_list';

const ManagementUser = () => {
  const {
    usersList: { total, users },
  } = useAppSelector((state) => state.adminSlice);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUsers('admin'));

    return () => {
      dispatch(resetData());
    };
  }, []);

  return (
    <div>
      <UserList users={users} />
    </div>
  );
};

export default ManagementUser;
