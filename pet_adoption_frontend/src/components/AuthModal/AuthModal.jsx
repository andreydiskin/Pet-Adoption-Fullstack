import React from "react";
import Modal from "@mui/material/Modal";
import AuthForm from "../AuthForm/AuthForm";
import "./AuthModal.css";
export default function AuthModal(props) {
  const handleClose = () => props.setIsLoginModalOpen(false);
  return (
    <Modal
      className="AuthModalCon"
      open={props.isLoginModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <AuthForm
          isLogin={props.isLogin}
          isLoginModalOpen={props.isLoginModalOpen}
          setIsLoginModalOpen={handleClose}
        />
      </>
    </Modal>
  );
}
