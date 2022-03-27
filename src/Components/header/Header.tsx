import { Avatar, Button, AppBar as MuiAppBar, Stack, Toolbar, styled, InputBase, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Search from "../input/Search";
import { AccountContext } from "../../context/AccountState";

const AppBar = styled(MuiAppBar)({
    display: "flex",
    justifyContent: "cenetr",
    backdropFilter: "blur(20px)",
});

export const Header = () => {
    // const [id, setId] = useState(undefined);
    const location = useLocation();
    const nav = useNavigate();
    // useEffect(() => {
    //     setId(localStorage.getItem("account"))
    // }, [])

    const { account, connect } = useContext(AccountContext);

    return (
        <AppBar position="fixed" color="transparent" elevation={0}>
            <Toolbar sx={{ display: "flex", gap: 4 }}>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} />
                <Search placeholder="Search NFTs" />
                <Button 
                    variant="text" 
                    color={location.pathname === '/' ? 'primary' : 'secondary'} 
                    size="large" 
                    onClick={() => nav("/")}
                    >
                        Explore
                </Button>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} />
                <Button 
                    variant="text" 
                    size="large" 
                    color={location.pathname === '/create' ? 'primary' : 'secondary'} 
                    onClick={() => nav("/create")}
                >
                    Create
                </Button>
                {account ?
                    <Avatar /> :
                    <Button variant="contained" onClick={() => {
                        connect();
                    }}>Sign In</Button>
                }
                <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} />
            </Toolbar>
        </AppBar>
    );
}