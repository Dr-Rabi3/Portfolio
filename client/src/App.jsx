import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./Util/http.js";

import Home from "./pages/Home.jsx";
import RootLayout from "./components/shared/RootLayout.jsx";
import About from "./pages/About.jsx";
import Project from "./pages/Project_details.jsx";
import Work from "./pages/Work.jsx";
import NotSupported from "./pages/NotSupported.jsx";
import CustomMouse from "./components/shared/CustomMouse.jsx";
import { CopyTextProvider } from "./store/CopyTextProvider.js";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/work",
        element: <Work />,
      },
      {
        path: "/project-details",
        element: <Project />,
      },
    ],
  },
  {
    path: "/not-supported",
    element: <NotSupported />,
  },
  {
    path: "*",
    element: <NotFound/>
  }
]);

function App() {

  return (
    <>
      <CopyTextProvider>
        <CustomMouse />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </CopyTextProvider>
    </>
  );
}

export default App;
