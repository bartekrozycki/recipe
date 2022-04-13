import {AppBar, Box, Container, CssBaseline, Toolbar} from "@mui/material";
import Logo from './assets/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Outlet} from "react-router-dom";

function App() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color={"default"}>
                <Container maxWidth={"lg"}>
                    <Toolbar sx={{
                        justifyContent: "center",
                    }}>
                        <Box
                            component="img"
                            sx={{
                                height: "54px",
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                            alt="Logo"
                            src={Logo}
                        />
                        <Box sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}>
                            <AccountCircleIcon fontSize={"large"} sx={{
                                cursor: "pointer"
                            }}/>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Outlet/>
        </Box>
    );
}

export default App;
