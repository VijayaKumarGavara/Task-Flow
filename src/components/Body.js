import { Link } from "react-router";
const Body = () => {
  return (
    <>
      
      <div className="h-[calc(100vh-5rem)] w-full flex flex-col justify-center items-center bg-linear-to-b from-blue-50 to-white">
        <h1 className="mt-20 font-bold text-5xl text-blue-600 tracking-wide text-center">
          Organize your day like a pro.
        </h1>
        <p className="text-lg font-medium text-slate-600 mt-3">
          Plan, manage, and complete tasks seamlessly.
        </p>
        <div className="flex justify-center gap-6 mt-8">
          <Link to="/planning">
            <button className="px-6 py-3 bg-blue-500 rounded-3xl text-white font-semibold hover:bg-blue-600 transition-all">
              Start Planning
            </button>
          </Link>
          <Link to="/tasks">
            <button className="px-6 py-3 bg-white border-2 border-slate-200 text-blue-500 rounded-3xl font-semibold hover:bg-blue-500 hover:text-white transition-all">
              Today Plans
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Body;
