import React, { useContext, useEffect, useState } from "react";
import "./AdminDashBoard.css";

import { useNavigate } from "react-router-dom";
import MyTable from "../../../common/MyTable";
import AdminPetList from "../AdminPetList/AdminPetList";
import { getAllUsersService } from "../../../../services/usersApiCalls";
import { toastContext } from "../../../../context/toastContext";

export default function AdminDashBoard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { openToast } = useContext(toastContext);

  useEffect(() => {
    const getUsers = async () => {
      try {
        await getAllUsersService(setUsers);
      } catch (error) {
        openToast(error.message, "error");
      }
    };
    getUsers();
  }, []);

  const config = [
    { header: "Email", ref: "email" },
    { header: "First", ref: "firstName" },
    { header: "Last", ref: "lastName" },
    { header: "Phone", ref: "phoneNumber" },
    { header: "Bio", ref: "bio" },
  ];

  const onClick = (row) => {
    navigate(`/admin/user/${row._id}`);
  };

  return (
    <>
      <MyTable tableColumns={config} data={users} onRowClick={onClick} />
      <AdminPetList />
    </>
  );
}
