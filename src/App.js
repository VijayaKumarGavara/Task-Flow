import { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

import TasksContext from "./utils/temp";
import ToastContext from "./utils/toastContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import ErrorPage from "./components/ErrorPage";

import Planning from "./pages/Planning";
import Track from "./pages/Track";
import Insights from "./pages/Insights";
function AppTemplate() {
  const [taskList, setTaskList] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });

  return (
    <>
      <ToastContext.Provider value={{ message, setMessage }}>
        <TasksContext.Provider value={{ taskList, setTaskList }}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex grow">
              <Outlet />
            </main>

            <Footer />
            {message.text && (
              <div
                className={`fixed top-32 right-6 px-4 py-2 rounded-lg shadow-lg text-white font-medium transition-all duration-300
      ${
        message.type === "success"
          ? "bg-green-500"
          : message.type === "error"
          ? "bg-red-500"
          : message.type === "warning"
          ? "bg-yellow-500"
          : "bg-blue-500"
      }`}
              >
                {message.text}
              </div>
            )}
          </div>
        </TasksContext.Provider>
      </ToastContext.Provider>
    </>
  );
}

export default function App() {
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
          path: "/plan",
          element: <Planning />,
        },
        {
          path: "/track",
          Component: Track,
        },
        {
          path: "/insights",
          Component: Insights,
        },
      ],
    },
  ]);
  return <RouterProvider router={appRouter} />;
}
