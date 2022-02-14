import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#11152a',
    },
    secondary: {
      main: '#219288',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
