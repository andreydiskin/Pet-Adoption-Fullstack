import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import "./AuthForm.css";
import LoginForm from "../LoginForm/LoginForm";
import SignUpForm from "../SignUpForm/SignUpForm";

export default function AuthForm(props) {
  const [value, setValue] = useState(props.isLogin);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="formAuthCon">
      <AppBar position="static">
        <Tabs
          className="tabsCon"
          value={value}
          indicatorColor="secondary"
          textColor="inherit"
          variant="standard"
          aria-label="full width tabs example"
          onChange={handleChange}
        >
          <Tab className="FormAuthTab" label="Login" value={0} />
          <Tab className="FormAuthTab" label="Sign up" value={1} />
        </Tabs>
        {value === 0 ? (
          <Paper className="authPaper" elevation={0}>
            <LoginForm setIsLoginModalOpen={props.setIsLoginModalOpen} />
          </Paper>
        ) : (
          <Paper className="authPaper" elevation={0}>
            <SignUpForm setIsLoginModalOpen={props.setIsLoginModalOpen} />
          </Paper>
        )}
      </AppBar>
    </Box>
  );
}
