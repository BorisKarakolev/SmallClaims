import React from "react";
import { UseTableRowProps } from "react-table";

export interface SomeProps {
  notes: Notes[];
  setNotes: (notes: Notes[]) => unknown;
  alertSuccess: boolean;
  alertFail: boolean;
  setAlertSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertFail: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Notes {
  name: string;
  date: number;
  contents: string;
  id: number;
}

export interface ClickedRow extends UseTableRowProps<object> {}

export interface Show {
  show: boolean;
  handleClose: () => void;
  row : ClickedRow['values']
}
