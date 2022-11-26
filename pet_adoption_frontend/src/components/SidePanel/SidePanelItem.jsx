import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { Securelink } from "../../Auth/SecureRoute";

export default function SidePanelItem(props) {
  return (
    <List>
      <ListItem key={props.linkName} disablePadding>
        {props.secured ? (
          <Securelink className={"navLink"} to={props.to} role={props.role}>
            <ListItemButton>
              <ListItemIcon>{props.iconCompoment}</ListItemIcon>
              <ListItemText primary={props.linkName} />
            </ListItemButton>
          </Securelink>
        ) : (
          <NavLink className={"navLink"} to={props.to}>
            <ListItemButton>
              <ListItemIcon>{props.iconCompoment}</ListItemIcon>
              <ListItemText primary={props.linkName} />
            </ListItemButton>
          </NavLink>
        )}
      </ListItem>
    </List>
  );
}
