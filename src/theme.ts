import { createTheme } from '@mui/material';
import { green, purple, grey, yellow } from '@mui/material/colors';

export enum Theme {
    DARK = 'dark',
    LIGHT = 'light',
}
const lightTheme = createTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: yellow[200],
        },
        secondary: {
            main: yellow[500],
        },
    },
});

const themes = {
    [Theme.DARK]: darkTheme,
    [Theme.LIGHT]: lightTheme,
};

export const getTheme = (theme: Theme) => {
    return themes[theme];
};
