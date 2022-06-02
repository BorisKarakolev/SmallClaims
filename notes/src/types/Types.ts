export interface SomeProps {
  notes: Notes[];
  setNotes: (notes: Notes[]) => unknown;
  alertSuccess: boolean;
  setAlertSuccess: Function;
  alertFail: boolean;
  setAlertFail: Function;
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
  row: any;
}
