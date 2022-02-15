import React from 'react';
import { styled } from '@mui/material/styles';

import { Container, Paper, Stack, Typography } from '@mui/material';

import UserList from '../UsersList/UserList';
import AddUser from '../AddUser/AddUser';

const Item = styled(Paper)`
  padding: 20px;
`;

export default function Dashborad() {
  return (
    <Container>
      <Item>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Typography variant="h4" gutterBottom component="div">
            Users List
          </Typography>

          <AddUser />
        </Stack>
      </Item>
      <Item>
        <UserList />
      </Item>
    </Container>
  );
}
