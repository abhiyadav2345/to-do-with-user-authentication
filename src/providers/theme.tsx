import { createContext, FC, ReactNode, useState } from 'react';
import { Theme, getTheme } from '../theme';
import { ThemeProvider } from '@mui/material';

type ThemeContextType = {
    currentTheme: Theme;
    setTheme: ((theme: Theme) => void) | null;
};
export const AppThemeContext = createContext<ThemeContextType>({
    currentTheme: Theme.LIGHT,
    setTheme: null,
});
type Props = {
    children: ReactNode;
};
export const AppThemeProvider: FC<Props> = ({ children }) => {
    const currentTheme = sessionStorage.getItem('theme')
        ? (sessionStorage.getItem('theme') as Theme)
        : Theme.LIGHT;
    const [theme, _setCurrentTheme] = useState<Theme>(currentTheme);
    const setTheme = () => {
        sessionStorage.setItem('theme', theme);
        _setCurrentTheme(theme);
    };
    const value = {
        currentTheme: theme,
        setTheme,
    };
    return (
        <AppThemeContext.Provider value={value}>
            <ThemeProvider theme={getTheme(theme)}>{children}</ThemeProvider>
        </AppThemeContext.Provider>
    );
};
