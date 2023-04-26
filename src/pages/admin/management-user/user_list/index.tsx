import {
  TableContainer,
  Table,
  TableHead,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
} from '@mui/material';
import React from 'react';
import { IUser } from 'src/types/admin';
import UserItem from '../user_item';

const UserList = ({ users }: { users: IUser[] }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên người dùng</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Thành phố</TableCell>
            <TableCell align="right">Vai trò</TableCell>
            <TableCell>Ảnh</TableCell>
            <TableCell align="right">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UserItem user={user} key={user.id_user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
