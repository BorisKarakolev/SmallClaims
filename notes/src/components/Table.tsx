import React, { useMemo } from "react";

import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useTable, useSortBy } from "react-table";
import { Notes } from "./Types";
import { columns } from "./Columns";

type Props = {
  data: Notes[];
};

const TableNotes = (props: Props) => {
  const data = useMemo(() => props.data, [props.data]);
  const { getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy
  );
  return (
    <Table striped bordered hover responsive className="text-center">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                scope="col"
              >
                {column.render("Header")}
                {column.Header !== "SmallClaims Notes Organizer"
                  ? column.isSorted
                    ? column.isSortedDesc
                      ? " ▼"
                      : " ▲"
                    : ""
                  : null}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableNotes;
