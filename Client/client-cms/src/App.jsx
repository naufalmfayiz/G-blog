import { useState } from "react";
import Category from "./pages/Category";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import AddUpdate from "./pages/AddUpdate";
import PatchImage from "./pages/PatchImage";
import RegisterForm from "./components/RegisterForm";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/add",
        element: <AddUpdate />,
      },
      {
        path: "/update/:id",
        element: <AddUpdate />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/patch/:id",
        element: <PatchImage />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
