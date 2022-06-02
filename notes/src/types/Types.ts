import { TableRowProps } from "react-table";

export interface SomeProps {
  notes: Notes[];
  setNotes: (notes: Notes[]) => unknown;
}

export interface Notes {
  name: string;
  date: number;
  contents: string;
  id: number;
}

export interface Show {
  show: boolean;
  handleClose: () => void;
  row: any
}
