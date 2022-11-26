import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storeIsLoggedIn, storeLogin, storeLogout } from "../Auth/user";
import { fetchUrl } from "../Lib/axios";

export const authContext = createContext();

export const AuthContextProvider = (props) => {
  const [isUser, setIsUser] = useState(storeIsLoggedIn());
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (isUser) {
      fetchUrl("/users/me")
        .then((u) => {
          setUser(u);
        })
        .catch(setUser({}));
    }
  }, [isUser]);

  const refreshUser = () => {
    if (isUser) {
      fetchUrl("/users/me")
        .then((u) => {
          setUser(u);
        })
        .catch(setUser({}));
    }
  };

  const login = (token) => {
    storeLogin(token);
    setIsUser(storeIsLoggedIn());
    navigate("/mypets");
  };

  const logout = () => {
    storeLogout();
    setIsUser(storeIsLoggedIn());
    navigate("/");
  };

  const updateUser = () => {
    fetchUrl("/users/me")
      .then((u) => {
        setUser(u);
      })
      .catch(setUser({}));
  };

  const value = {
    isUser,
    login,
    logout,
    user,
    updateUser,
    refreshUser,
  };

  return (
    <authContext.Provider value={value}>{props.children}</authContext.Provider>
  );
};
