import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./_layout";
import Login from "./login";
import Home from "./auth/home";
import UsersList from "./auth/users";
import BranchesList from "./auth/branches";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        element: <Home />,
        path: "/home",
      },
      {
        element: <UsersList />,
        path: "/users",
      },
      {
        element: <BranchesList />,
        path: "/branches",
      },
    ],
  },
]);

export default Routes;
