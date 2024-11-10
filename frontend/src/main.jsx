import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LogIn from "./pages/LogIn.jsx";
import SignUp from "./pages/SignUp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SignUp />
  </StrictMode>,
);
