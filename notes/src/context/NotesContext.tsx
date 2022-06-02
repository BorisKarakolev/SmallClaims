import React, { useState, createContext } from "react";
import { SomeProps, Notes } from "../types/Types";

export const NotesDataContext = createContext({} as SomeProps);

export const NotesDataProvider: React.FC<{ children: any }> = (props) => {
  const [notes, setNotes] = useState<Notes[]>([]);

  return (
    <NotesDataContext.Provider
      value={{
        notes,
        setNotes,
      }}
    >
      {props.children}
    </NotesDataContext.Provider>
  );
};
