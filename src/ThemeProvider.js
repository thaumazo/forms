import { ThemeProvider as Provider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import useDarkMode from "./useDarkMode"

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


export default function ThemeProvider({ children }) {
  const theme = useDarkMode() ? darkTheme : lightTheme
  return (
    <Provider theme={theme}>
      <CssBaseline />
        { children }
    </Provider>
  );
}
