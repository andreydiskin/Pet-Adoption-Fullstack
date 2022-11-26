import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext";

export default function NavBar(props) {
  const { isUser, user, logout } = useContext(authContext);
  const navigate = useNavigate();

  const handleModalSignUp = () => {
    props.setIsLoginModalOpen(true);
    props.setIsLogin(1);
  };

  const handleModalLogin = () => {
    props.setIsLoginModalOpen(true);
    props.setIsLogin(0);
  };

  return (
    <AppBar className="mainNavBar" position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => props.setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
          {isUser && (
            <>
              Welcome {user.firstName} {user.lastName}
            </>
          )}
        </Typography>
        {isUser ? (
          <Button onClick={() => logout()} color="inherit">
            Logout
          </Button>
        ) : (
          <>
            <Button onClick={handleModalSignUp} color="inherit">
              Sign up
            </Button>
            <Button onClick={handleModalLogin} color="inherit">
              Login
            </Button>
          </>
        )}
        {isUser && (
          <Button onClick={() => navigate("./profile")} color="inherit">
            Profile
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
