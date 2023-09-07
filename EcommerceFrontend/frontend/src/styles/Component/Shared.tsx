import { createTheme } from "@mui/material";
import { green } from "@mui/material/colors";

export const defaultTheme = createTheme({
    palette: {
        primary: {
            main: green[900]
        }
    }
});

export const textStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginBottom: '16px', 
    textAlign: 'center',
};

export const linkStyle = {
    color: "white",
    textDecoration: "none",
  };