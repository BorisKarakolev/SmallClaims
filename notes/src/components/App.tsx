import React, { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import TableNotes from "./Table";
import { Notes } from "./Types";

const App = () => {
  const [data, setData] = useState<Notes[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

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
  if (isFetching) return <Spinner animation="grow" variant="dark" style={{width: '100px', height: '100px', margin: '50px'}} />;
  return (
    <div style={{ width: "40%", margin: "20px" }}>
      <TableNotes data={data} />
    </div>
  );
};

export default App;
