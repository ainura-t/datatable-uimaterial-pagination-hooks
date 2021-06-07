import React, { useState } from "react";
import TableHeader from "../components/TableHeader";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import { TableContainer } from "@material-ui/core";

const rowInformation = [
  { name: "Bob Johnson", age: 69 },
  { name: "Jenny Johnson", age: 25 },
  { name: "Robert Johnson", age: 35 },
  { name: "Cathy Johnson", age: 65 },
  { name: "Alice Johnson", age: 39 }
];

function desccendinComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComarator(order, orderBy) {
  return order === "desc"
    ? (a, b) => desccendinComparator(a, b, orderBy)
    : (a, b) => desccendinComparator(a, b, orderBy);
}

const sortedRowInfo = (rowArray, comparator) => {
  const stabilizedRowArr = rowArray.map((el, idx) => [el, idx]);
  stabilizedRowArr.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return (a[1] = b[1]);
  });
  return stabilizedRowArr.map((el) => el[0]);
};

export default function TableContent() {
  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(1);

  const handleRequestSort = (event, proporty) => {
    const isAscending = valueToOrderBy === proporty && orderDirection === "asc";
    setValueToOrderBy(proporty);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowPerPage(parseInt(e.target.value), 10);
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeader
            valueToOrderBy={valueToOrderBy}
            orderDirection={orderDirection}
            handleRequestSort={handleRequestSort}
          />
          {sortedRowInfo(
            rowInformation,
            getComarator(orderDirection, valueToOrderBy)
          )
            .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
            .map((person, idx) => (
              <TableRow key={idx}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.age}</TableCell>
              </TableRow>
            ))}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 2, 3, 4, 5]}
        component="div"
        count={rowInformation.length}
        rowsPerPage={rowPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
