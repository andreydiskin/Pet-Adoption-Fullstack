import React from "react";
import { Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
