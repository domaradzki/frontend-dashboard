import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Container, Paper, Stack, Typography } from '@mui/material';

import UserList from '../UsersList/UserList';

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
          <Button variant="contained">Add User</Button>
        </Stack>
      </Item>
      <Item>
        <UserList />
      </Item>
    </Container>
  );
}
