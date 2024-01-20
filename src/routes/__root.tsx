import {
    Outlet,
    RootRoute,
} from '@tanstack/react-router';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const Route = new RootRoute({
  component: () => {
    const defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
            <Outlet />
        </ThemeProvider>
    )},
})
