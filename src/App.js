import { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
// App.js

import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import ErrorPage from "./components/ErrorPage";

import Planning from "./pages/Planning";
import Tasks from "./pages/Tasks";
import History from "./pages/History";
function AppTemplate() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex grow">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const appRouter = createBrowserRouter([
    {
      path: "/",
      Component: AppTemplate,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          Component: Body,
        },
        {
          path: "/planning",
          element: <Planning taskList={taskList} setTaskList={setTaskList} />,
        },
        {
          path: "/Tasks",
          Component: Tasks,
        },
        {
          path: "/history",
          Component: History,
        },
      ],
    },
  ]);
  return <RouterProvider router={appRouter} />;
}
