export interface Notes {
  name: string,
  date: number,
  contents: string
}

export interface Show {
  show: boolean,
  handleClose: () => void,
  row: any
}
