import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import "./UserTable.css";

export default function UserTable(props) {
  return (
    <TableContainer className="tableContainer" component={Paper} elevation={0}>
      <Table className="userTableCon">
        <TableHead>
          <TableRow>
            {props.headers.map((value) => (
              <TableCell key={value}>{value}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {Object.keys(props.data).map((value) => (
              <TableCell key={value}>{props.data[value]}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
