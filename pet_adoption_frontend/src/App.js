import React, { useState } from "react";

import "./App.css";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import SidePanel from "./components/SidePanel/SidePanel";
import HomePage from "./pages/HomePage/HomePage";
import AuthModal from "./components/AuthModal/AuthModal";
import SearchPage from "./pages/Search/SearchPage";
import PetPage from "./pages/PetPage/PetPage";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";
import MyPetsPage from "./pages/MyPetsPage/MyPetsPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminDashBoard from "./components/Admin/AddPetForm/AdminDashBoard/AdminDashBoard";
import AddPetForm from "./components/Admin/AddPetForm/AddPetForm";
import UserDetails from "./pages/UserDetails/UserDetails";
import EditPetPage from "./pages/EditPetPage/EditPetPage";
import { SecureRoute } from "./Auth/SecureRoute";
import { Typography } from "@mui/material";
import { ToastContextProvider } from "./context/toastContext";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <CssBaseline />
      <Container className="con" maxWidth="100%" disableGutters>
        <ToastContextProvider>
          <NavBar
            setIsLoginModalOpen={setIsLoginModalOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            setIsLogin={setIsLogin}
          />

          <SidePanel
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />

          <Routes>
            <Route path="/" element={<HomePage />} />
            {
              <Route
                path="/profile/"
                element={
                  <SecureRoute role="user">
                    {" "}
                    <ProfileSettings />
                  </SecureRoute>
                }
              />
            }

            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/:id" element={<PetPage />} />
            <Route path="/pets/edit/:id" element={<EditPetPage />} />
            <Route
              path="/mypets"
              element={
                <SecureRoute role="user">
                  {" "}
                  <MyPetsPage />
                </SecureRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <SecureRoute role="admin">
                  <AdminPage />
                </SecureRoute>
              }
            >
              <Route path="" element={<AdminDashBoard />} />

              <Route path="addpet" element={<AddPetForm />} />
              <Route path="user/:id" element={<UserDetails />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
              {/* for the modal opeaning logic */}
          <AuthModal
            isLoginModalOpen={isLoginModalOpen}
            isLogin={isLogin}
            setIsLoginModalOpen={setIsLoginModalOpen}
          />
        </ToastContextProvider>
      </Container>

      <footer className="footer">
        <Typography align="center" gutterBottom>
          © Andrey Diskin 2022
        </Typography>
      </footer>
    </>
  );
}

export default App;
