import React from "react";

import Drawer from "@mui/material/Drawer";

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PetsIcon from "@mui/icons-material/Pets";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import "./SidePanel.css";
import SidePanelItem from "./SidePanelItem";
import { Divider } from "@mui/material";

export default function SidePanel(props) {
  return (
    <Drawer
      className="drawer"
      anchor={"left"}
      open={props.isDrawerOpen}
      onClose={() => props.setIsDrawerOpen(false)}
    >
      <SidePanelItem linkName="Home" to="/" iconCompoment={<HomeIcon />} />
      <SidePanelItem
        linkName="Search"
        to="/search"
        iconCompoment={<SearchIcon />}
      />
      <SidePanelItem
        secured={true}
        role="user"
        linkName="My Pets"
        to="/mypets"
        iconCompoment={<PetsIcon />}
      />
      <Divider />
      <SidePanelItem
        secured={true}
        role="admin"
        linkName="Add Pet"
        to="/admin/addpet"
        iconCompoment={<AdminPanelSettingsIcon />}
      />

      <SidePanelItem
        secured={true}
        role="admin"
        linkName="Admin"
        to="/admin"
        iconCompoment={<AdminPanelSettingsIcon />}
      />
    </Drawer>
  );
}
