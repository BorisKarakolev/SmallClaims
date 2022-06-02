import { useContext, useEffect, useState } from "react";
import { Alert, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import TableNotes from "./Table";
import { Notes } from "../types/Types";
import { NotesDataContext } from "../context/NotesContext";
import { downloadData } from "../utils/DownloadData";

const App = () => {
  const { notes, setNotes } = useContext(NotesDataContext);
  const [isFetching, setIsFetching] = useState<boolean>(false);

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
        return <Alert variant="danger">Can't get your notes</Alert>;
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
