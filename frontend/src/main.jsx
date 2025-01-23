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

const router = createBrowserRouter(
  [
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
    // {
    //   path: "*",
    //   element: <h1>Hmm, page not found</h1>,
    // }
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
      v7_normalizeFormMethod: true,
    },
  },
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <RouterProvider router={router} future={{ v7_startTransition: true }}/>
  </StrictMode>,
);
