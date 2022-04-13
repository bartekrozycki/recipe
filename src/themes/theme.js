import {createTheme} from "@mui/material";
import {red, grey} from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: red,
        secondary: grey
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorDefault: "rgb(233,228,221)"
            }
        },
    },
});