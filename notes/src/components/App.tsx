import React, { useEffect, useState } from "react";
import { Alert, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import TableNotes from "./Table";
import { Notes } from "./Types";

const App = () => {
  const [data, setData] = useState<Notes[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const downloadData = (data: string, name: string = "notes.csv") => {
    const blob = new Blob([data], { type: "octet-stream" });
    const href = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href,
      style: "display:none",
      download: name,
    });
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(href);
    a.remove();
  };

  useEffect(() => {
    setIsFetching(true);
    axios
      .get<Notes[]>("http://localhost:4200/")
      .then((res) => {
        setData(res.data);
        setIsFetching(false);
      })
      .catch((err) => {
        setIsFetching(false);
        return <Alert variant="danger">Can't get your notes</Alert>;
      });
  }, []);

  if (!data) return <div className="text-center">There is no notes!</div>;
  if (isFetching)
    return (
      <Spinner
        animation="grow"
        variant="dark"
        style={{ width: "100px", height: "100px", margin: "50px" }}
      />
    );
  return (
    <div style={{ width: "40%", margin: "20px" }}>
      <TableNotes data={data} />
      <Button onClick={() => downloadData(JSON.stringify(data))} variant="primary">CSV</Button>
    </div>
  );
};

export default App;
