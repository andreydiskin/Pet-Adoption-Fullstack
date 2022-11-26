import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function MyTable({ tableColumns, data, onRowClick }) {
  return (
    <div className="infoTable">
      <TableContainer
        className="tableContainer"
        component={Paper}
        elevation={0}
      >
        <Table className="userTableCon" size="small" aria-label="simple table">
          <TableHead>
            <TableRow className="table">
              {tableColumns.map((tableHeader, index) => (
                <TableCell key={index} className="cell" size="small">
                  {tableHeader.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0 ? (
              <TableRow className="noRowsDisplay">
                <TableCell colSpan={tableColumns.length}>
                  No records to display
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow
                  onClick={() => {
                    return onRowClick ? onRowClick(row) : null;
                  }}
                  className="userTableRow"
                  hover
                  key={"row" + rowIndex}
                >
                  {tableColumns.map((Column, ColumnIndex) => (
                    <TableCell
                      key={ColumnIndex + rowIndex}
                      className="cell"
                      size="small"
                    >
                      {row[Column.ref]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
