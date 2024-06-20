import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { FunctionComponent } from "react";
import Home from "./pages/home/Home";
import RedirectToUrl from "./pages/redirect_to_url/RedirectToUrl";
import SiteLayout from "./components/site_layout/SiteLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ":linkId",
        element: <RedirectToUrl />,
      },
    ],
  },
]);

const AppRouter: FunctionComponent = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
