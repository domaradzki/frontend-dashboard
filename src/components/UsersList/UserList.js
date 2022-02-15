import React, { useEffect } from 'react';

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { fetchData } from '../../reducers/usersSlice';

export default function UserList() {
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch(fetchData());

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <Paper elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">Id</TableCell>
            <TableCell variant="head">Name</TableCell>
            <TableCell variant="head">Username</TableCell>
            <TableCell variant="head">City</TableCell>
            <TableCell variant="head">Email</TableCell>
            <TableCell variant="head">Edit</TableCell>
            <TableCell variant="head">Delete</TableCell>
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
              <TableCell variant="body">
                <Button variant="contained" color="secondary" size="small">
                  Edit
                </Button>
              </TableCell>
              <TableCell variant="body">
                <Button variant="contained" color="error" size="small">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
