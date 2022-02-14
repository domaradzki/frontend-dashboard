import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import React from 'react';

const WrapperPaper = styled(Paper)`
  max-width: 1170px;
  margin: 20px auto;
`;

export default function Dashborad() {
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
          <TableRow>
            <TableCell variant="body">Id</TableCell>
            <TableCell variant="body">Name</TableCell>
            <TableCell variant="body">Username</TableCell>
            <TableCell variant="body">City</TableCell>
            <TableCell variant="body">Email</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </WrapperPaper>
  );
}
