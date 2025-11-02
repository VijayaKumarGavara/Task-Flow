import { useState, useEffect } from "react";

import timings from "../utils/timingValues";
import timeToMinutes from "../utils/timeToMinutes";

export default function PlanningForm(props) {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const defaultDate = today.toISOString().split("T")[0];
  const [task, setTask] = useState(
    props.editableTask || {
      title: "",
      description: "",
      priority: "High",
      date: defaultDate,
      startTime: "",
      endTime: "",
    }
  );
  useEffect(() => {
    if (props.editableTask) {
      setTask(props.editableTask);
    }
  }, [props.editableTask]);
  function handleChange(e) {
    setTask({ ...task, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (timeToMinutes(task.startTime) >= timeToMinutes(task.endTime)) {
      alert("Start time must be earlier than end time");
      return;
    }
    props.handleSubmit(task);
    setTask({
      title: "",
      description: "",
      priority: "High",
      startTime: "",
      endTime: "",
      date: defaultDate,
    });
    // console.log(task);
  }
  return (
    <>
      <div className="flex justify-center items-center max-h-screen ">
        {/* <form
          onSubmit={handleSubmit}
          className="w-4/12 my-20 bg-slate-100 border-2 border-slate-200 rounded-lg shadow-lg flex flex-col justify-center "
        >
          <h1 className="mt-6 text-2xl font-bold text-blue-500 tracking-wider">
            Enter your plan details
          </h1>
          <div className="mt-4 w-full flex justify-between">
            <label
              htmlFor="title"
              className="ml-6 text-xl  text-blue-500 font-semibold"
            >
              Title
            </label>
            <input
              className="mr-6 w-7/12 h-8 border-2  border-slate-400 rounded-lg px-4 text-lg leading-1 text-slate-400"
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-3 w-full flex justify-between">
            <label
              className="ml-6 text-xl  text-blue-500 font-semibold"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="mr-6 w-7/12 h-8 border-2  border-slate-400 rounded-lg px-4 text-lg leading-1 text-slate-400"
              name="description"
              value={task.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="my-3 w-full flex justify-between">
            <label
              className="ml-6 text-xl  text-blue-500 font-semibold"
              htmlFor="priority"
            >
              Priority
            </label>
            <select
              className="mr-52 border-2 border-slate-400 rounded-lg"
              name="priority"
              value={task.priority}
              onChange={handleChange}
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="my-3  w-full flex justify-between">
            <label
              className="ml-6 text-xl  text-blue-500 font-semibold"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="mr-36 border-2 border-slate-400 rounded-lg"
              type="date"
              name="date"
              value={task.date}
              onChange={handleChange}
              min={defaultDate}
              required
            />
          </div>

          <div className="my-3 w-full flex justify-between">
            <label
              className="ml-6 text-xl  text-blue-500 font-semibold"
              htmlFor="startTime"
            >
              Start Time
            </label>
            <select
              className="mr-48 border-2 border-slate-400 rounded-lg"
              name="startTime"
              value={task.startTime}
              onChange={handleChange}
              required
            >
              <option value="">select</option>
              {timings.map((time, index) => {
                return (
                  <option key={index} value={time}>
                    {time}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="my-3 w-full flex justify-between">
            <label
              className="ml-6 text-xl  text-blue-500 font-semibold"
              htmlFor="endTime"
            >
              End Time
            </label>
            <select
              className="mr-48 border-2 border-slate-400 rounded-lg"
              name="endTime"
              value={task.endTime}
              onChange={handleChange}
              required
            >
              <option value="">select</option>
              {timings.map((time, index) => {
                return (
                  <option key={index} value={time}>
                    {time}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit">Submit</button>
        </form> */}
        <form
          onSubmit={handleSubmit}
          className="w-4/12 my-20 bg-slate-100 border-2 border-slate-200 rounded-lg shadow-lg p-8"
        >
          <h1 className="mb-6 text-2xl font-bold text-blue-500 tracking-wider text-center">
            Enter your plan details
          </h1>

          {/* Grid layout for alignment */}
          <div className="grid grid-cols-3 gap-y-4 items-center">
            <label
              className="text-blue-500 font-semibold text-lg col-span-1"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="col-span-2 border-2 border-slate-300 rounded-lg px-3 py-2 text-slate-600 focus:border-blue-500 outline-none"
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
            />

            <label
              className="text-blue-500 font-semibold text-lg"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="col-span-2 border-2 border-slate-300 rounded-lg px-3 py-2 text-slate-600 focus:border-blue-500 outline-none resize-none"
              name="description"
              rows="2"
              value={task.description}
              onChange={handleChange}
            ></textarea>

            <label
              className="text-blue-500 font-semibold text-lg"
              htmlFor="priority"
            >
              Priority
            </label>
            <select
              className="col-span-2 border-2 border-slate-300 rounded-lg px-3 py-2 text-slate-600 focus:border-blue-500 outline-none"
              name="priority"
              value={task.priority}
              onChange={handleChange}
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <label
              className="text-blue-500 font-semibold text-lg"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="col-span-2 border-2 border-slate-300 rounded-lg px-3 py-2 text-slate-600 focus:border-blue-500 outline-none"
              type="date"
              name="date"
              value={task.date}
              onChange={handleChange}
              min={defaultDate}
              required
            />

            <label
              className="text-blue-500 font-semibold text-lg"
              htmlFor="startTime"
            >
              Start Time
            </label>
            <select
              className="col-span-2 border-2 border-slate-300 rounded-lg px-3 py-2 text-slate-600 focus:border-blue-500 outline-none"
              name="startTime"
              value={task.startTime}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              {timings.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>

            <label
              className="text-blue-500 font-semibold text-lg"
              htmlFor="endTime"
            >
              End Time
            </label>
            <select
              className="col-span-2 border-2 border-slate-300 rounded-lg px-3 py-2 text-slate-600 focus:border-blue-500 outline-none"
              name="endTime"
              value={task.endTime}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              {timings.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-around col-span-2">
            <button
              onClick={props.onCancel}
              className="mt-8 py-2 px-4 bg-white border-2 border-slate-200 text-blue-500 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mt-8 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
