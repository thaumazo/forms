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


export default function ThemeProvider({
  theme = "light", // light | dark | auto
  children
}) {

  let chosenTheme = lightTheme;
  if (theme === "dark") {
    chosenTheme = darkTheme
  } else if (theme === 'auto') {
    chosenTheme = useDarkMode() ? darkTheme : lightTheme
  }

  return (
    <Provider theme={ chosenTheme }>
      <CssBaseline />
        { children }
    </Provider>
  );
}
