import { createTheme } from "@mui/material";
import { red } from '@mui/material/colors';

export const Theme = createTheme({
    palette: {
        primary: {
            main: red[700],
            dark: red[800],
            light: red[500],
            contrastText: '#000'
        }
    },
    typography: {
        fontFamily: 'JetBrains Mono'
    }
});