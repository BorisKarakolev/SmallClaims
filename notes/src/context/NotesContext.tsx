import React, { useState, createContext } from "react";
import { SomeProps, Notes } from "../types/Types";

export const NotesDataContext = createContext({} as SomeProps);

export const NotesDataProvider: React.FC<{ children: any }> = (props) => {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [alertSuccess, setAlertSuccess] = useState<boolean>(false)
  const [alertFail, setAlertFail] = useState<boolean>(false)

  return (
    <NotesDataContext.Provider
      value={{
        notes,
        setNotes,
        alertSuccess,
        setAlertSuccess,
        alertFail,
        setAlertFail
      }}
    >
      {props.children}
    </NotesDataContext.Provider>
  );
};
