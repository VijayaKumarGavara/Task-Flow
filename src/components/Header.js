import { Link } from "react-router";
export default function Header() {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-row items-center h-20 w-11/12 bg-white border-2 border-slate-200 rounded-lg shadow-lg my-2 fixed top-0 left-1/2 -translate-x-1/2 z-50  backdrop-blur-sm">
          <div className="mx-8 w-3/12 flex items-center hover:cursor-pointer">
            <div className="w-14 h-14">
              <img
                // src="../assets/task-flow-logo.jpg"
                src="https://res.cloudinary.com/dicmdo152/image/upload/v1761838191/favicon_p8iaxl.svg"
                alt="Logo"
                height="150"
                className="w-full h-full object-cover border-2 border-blue-500 rounded-lg"
              ></img>
            </div>
            <div className="mx-4 text-blue-500 text-3xl font-bold">
              Task Flow
            </div>
          </div>
          <div className="w-9/12 flex justify-around">
            <Link
              to="/"
              className="p-2 text-blue-500 text-2xl font-bold hover:border-transparent hover:bg-blue-500 hover:text-white hover:rounded-lg"
            >
              Home
            </Link>
            <Link
              className="p-2 text-blue-500 text-2xl font-bold hover:border-transparent hover:bg-blue-500 hover:text-white hover:rounded-lg"
              to="/planning"
            >
              Planning
            </Link>
            <Link
              className="p-2 text-blue-500 text-2xl font-bold hover:border-transparent hover:bg-blue-500 hover:text-white hover:rounded-lg"
              to="/tasks"
            >
              Tasks
            </Link>
            <Link
              className="p-2 text-blue-500 text-2xl font-bold hover:border-transparent hover:bg-blue-500 hover:text-white hover:rounded-lg"
              to="/history"
            >
              History
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
