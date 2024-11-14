import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LogIn from "./pages/LogIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import AddCards from "./pages/AddCards.jsx";
import ViewCards from "./pages/ViewCards.jsx";
import Study from "./pages/Study.jsx";
import Index from "./pages/Index.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MathJaxContext } from "better-react-mathjax";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/log-in",
    element: <LogIn />,
  },
  {
    path: "/add-cards",
    element: <AddCards />,
  },
  {
    path: "/view-cards",
    element: <ViewCards />,
  },
  {
    path: "/study",
    element: <Study />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MathJaxContext>
      <RouterProvider router={router} />
    </MathJaxContext>
  </StrictMode>,
);
