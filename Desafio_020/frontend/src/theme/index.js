import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    background: {
      default: 'white',
      primary: '#805AD5',
      secondary: 'blue',
      info: '#F6C324',
      red: '#FF8855',
      success: '#e8faff',
      warning: '#F6C324',
    },
    primary: {
      main: '#805AD5',
    },
  },
  shadows: [
    'none',
    '0 10px 20px rgba(0,0,0,0.08), 0 4px 4px rgba(0,0,0,0.15);',
    '0 20px 30px rgb(0 0 0 / 20%), 0 6px 6px rgb(0 0 0 / 35%);',
  ],
  typography: {
    fontFamily: ['Open Sans'].join(','),
  },
});

export default theme;
