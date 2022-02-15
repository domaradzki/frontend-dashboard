import React, { useEffect, useState } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

import EditUser from '../EditUser/Edituser';
import DeleteUser from '../DeleteUser/DeleteUser';

export default function UserList() {
  const users = useSelector((state) => state.users);

  const [active, setActive] = useState(false);
  const [direction, setDirection] = useState('asc');
  const [data, setData] = useState(users.data);

  const handleActiveSort = () => {
    if (direction === 'asc' && !active) {
      const ASCdata = [...data];
      ASCdata.sort((a, b) => {
        if (a.username < b.username) return -1;
        if (a.username > b.username) return 1;
        return 0;
      });
      setActive(!active);
      setData(ASCdata);
    } else if (direction === 'asc' && active) {
      const DESCdata = [...data];
      DESCdata.sort((a, b) => {
        if (a.username < b.username) return 1;
        if (a.username > b.username) return -1;
        return 0;
      });
      setDirection('desc');
      setData(DESCdata);
    } else if (direction === 'desc') {
      setActive(!active);
      setDirection('asc');
      setData(users.data);
    }
  };

  useEffect(() => {
    setData(users.data);
    setActive(false);
    setDirection('asc');
  }, [users]);

  return (
    <Paper elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">Id</TableCell>
            <TableCell variant="head">Name</TableCell>
            <TableCell variant="head">
              <TableSortLabel
                active={active}
                direction={direction}
                onClick={() => handleActiveSort()}
              >
                Username
              </TableSortLabel>
            </TableCell>
            <TableCell variant="head">City</TableCell>
            <TableCell variant="head">Email</TableCell>
            <TableCell variant="head">Edit</TableCell>
            <TableCell variant="head">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell variant="body">{user.id}</TableCell>
              <TableCell variant="body">{user.name}</TableCell>
              <TableCell variant="body">{user.username}</TableCell>
              <TableCell variant="body">{user.address?.city}</TableCell>
              <TableCell variant="body">{user.email}</TableCell>
              <TableCell variant="body">
                <EditUser user={user} />
              </TableCell>
              <TableCell variant="body">
                <DeleteUser id={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {users.data.length === 0 && (
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          sx={{
            padding: '20px',
          }}
        >
          No data to display
        </Typography>
      )}
    </Paper>
  );
}
