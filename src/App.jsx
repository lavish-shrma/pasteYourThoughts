import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ViewPaste from "./components/ViewPaste";
import Home from "./components/Home";
import Paste from "./components/Paste";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div>
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    path: "/paste/:id",
    element: (
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    ),
  },
]);

const pasteYourThoughts = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default pasteYourThoughts;
