import React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { updateUser } from '../../reducers/usersSlice';

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

export default function EditUser({ user }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState(user);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleInputChange = (event) => {
    if (event.target.name === 'city') {
      setInput({
        ...input,
        address: { [event.target.name]: event.target.value },
      });
    } else {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(input));
    handleClose();
  };
  const handleEditUser = (e) => {
    handleOpen();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleEditUser}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" gutterBottom component="div">
            Editing the user
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
                required
                id="name"
                name="name"
                type="text"
                label="Your name"
                value={input.name}
                placeholder="Your name"
                onChange={handleInputChange}
              />
              <TextField
                required
                id="email"
                name="email"
                type="email"
                label="Your email"
                value={input.email}
                placeholder="Your email"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <TextField
                id="username"
                name="username"
                type="text"
                label="Your username"
                value={input.username || ''}
                placeholder="Your username"
                onChange={handleInputChange}
              />
              <TextField
                id="city"
                name="city"
                type="text"
                label="Your city"
                value={input.address?.city || ''}
                placeholder="Your city"
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
