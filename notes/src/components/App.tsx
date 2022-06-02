import { useContext, useEffect, useState } from "react";
import { Alert, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import TableNotes from "./Table";
import { Notes } from "../types/Types";
import { NotesDataContext } from "../context/NotesContext";
import { downloadData } from "../utils/DownloadData";

const App = () => {
  const { notes, setNotes, alertSuccess, alertFail } =
    useContext(NotesDataContext);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [getAlert, setGetAlert] = useState<boolean>(false);

  useEffect(() => {
    setIsFetching(true);
    axios
      .get<Notes[]>("http://localhost:4200/")
      .then((res) => {
        setNotes(res.data);
        setIsFetching(false);
      })
      .catch((err) => {
        setIsFetching(false);
        setGetAlert(true);
      });
  }, []);

  if (!notes) return <div className="text-center">There is no notes!</div>;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "relative",
      }}
    >
      {isFetching ? (
        <Spinner
          animation="grow"
          variant="dark"
          style={{ width: "100px", height: "100px", margin: "50px" }}
        />
      ) : (
        <>
          <Alert
            style={{ position: "absolute", placeSelf: "center", top: "10px" }}
            show={getAlert}
            variant="danger"
          >
            <strong>Sorry!</strong> Can't get your notes
          </Alert>
          <Alert
            style={{ position: "absolute", placeSelf: "center", top: "10px" }}
            show={alertSuccess}
            variant="success"
          >
            <strong>Success!</strong> Note has been updated
          </Alert>
          <Alert
            style={{ position: "absolute", placeSelf: "center", top: "10px" }}
            show={alertFail}
            variant="danger"
          >
            <strong>Oops!</strong> Can't update your note
          </Alert>
          <TableNotes />
          <Button
            onClick={() => downloadData(JSON.stringify(notes))}
            variant="dark"
            style={{ width: "20%" }}
          >
            CSV
          </Button>
        </>
      )}
    </div>
  );
};

export default App;
