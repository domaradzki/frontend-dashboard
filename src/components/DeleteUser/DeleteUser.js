import React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { deleteUser } from '../../reducers/usersSlice';

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

export default function DeleteUser({ id }) {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteUser(id));
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={handleOpen}
      >
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" gutterBottom component="div">
            Confirm to delete this user?
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
                color="error"
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
