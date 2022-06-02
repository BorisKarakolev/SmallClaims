import React, { useMemo, useState } from "react";

import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useTable, useSortBy } from "react-table";
import { Notes } from "./Types";
import { columns } from "./Columns";

import EditModal from "./EditModal";

type Props = {
  data: Notes[];
};

const TableNotes = (props: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [clickedRow, setClickedRow] = useState<object>({})
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const data = useMemo(() => props.data, [props.data]);

  const { getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy
  );
  return (
    <>
      <Table striped bordered hover responsive variant="dark" className="text-center">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  scope="col"
                >
                  {column.render("Header")}
                  {column.Header !== "Edit"
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
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{ position: "relative" }}
                    >
                      {cell.render("Cell")}
                      {cell.column.Header === "Edit" ? (
                        <i
                          className="bi bi-pencil-square"
                          onClick={() => {
                            setClickedRow(row)
                            handleShow()
                          }}
                        ></i>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <EditModal show={show} handleClose={handleClose} row={clickedRow} />
    </>
  );
};

export default TableNotes;
