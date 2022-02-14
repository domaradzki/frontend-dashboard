import React, { useEffect } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';

import { fetchData } from '../../reducers/usersSlice';

const WrapperPaper = styled(Paper)`
  max-width: 1170px;
  margin: 20px auto;
`;

export default function Dashborad() {
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch(fetchData());

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <WrapperPaper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">Id</TableCell>
            <TableCell variant="head">Name</TableCell>
            <TableCell variant="head">Username</TableCell>
            <TableCell variant="head">City</TableCell>
            <TableCell variant="head">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell variant="body">{user.id}</TableCell>
              <TableCell variant="body">{user.name}</TableCell>
              <TableCell variant="body">{user.username}</TableCell>
              <TableCell variant="body">{user.address.city}</TableCell>
              <TableCell variant="body">{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </WrapperPaper>
  );
}
