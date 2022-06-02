import { createRoot } from "react-dom/client";
import App from "./components/App";
import { NotesDataProvider } from "./context/NotesContext";

const container = document.querySelector("#root");
const root = createRoot(container!);
root.render(
  <NotesDataProvider>
    <App />
  </NotesDataProvider>
);