import React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { addUser } from '../../reducers/usersSlice';
import { flexbox } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddUser() {
  const dispatch = useDispatch();
  const handleAddUser = (user) => {
    dispatch(addUser(user));
  };
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddUser(input);
    handleClose();
  };
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add User
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" gutterBottom component="div">
            Adding new user
          </Typography>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            autoComplete="off"
            action="/"
            method="POST"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <TextField
                // error
                required
                id="name"
                name="name"
                type="text"
                label="Your name"
                placeholder="Your name"
                onChange={handleInputChange}
              />
              <TextField
                required
                id="email"
                name="email"
                type="email"
                label="Your email"
                placeholder="Your email"
                onChange={handleInputChange}
              />
            </div>
            <Box
              sx={{
                padding: '10px',
              }}
            >
              <Button
                sx={{
                  marginRight: '15px',
                }}
                type="submit"
                variant="contained"
              >
                Confirm
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
