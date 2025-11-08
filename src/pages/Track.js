import { useState, useEffect, useContext } from "react";
import ToastContext from "../utils/toastContext";
import getTaskStatus from "../utils/getTaskStatus";
const Track = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const todayDate = today.toISOString().split("T")[0];
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [todayWorks, setTodayWorks] = useState([]);
  const { message, setMessage } = useContext(ToastContext);

  function showMessage(text, type = "info") {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 2000);
  }
  useEffect(() => {
    fetchTodayWorks();
    let timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 30000);

    return () => clearInterval(timer);
  }, []);
  async function fetchTodayWorks() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/?date=${todayDate}`
      );
      if (!response.ok) {
        const errText = await response.text();
        showMessage(`Failed to fetch today's tasks: ${errText}`, "error");
        throw new Error(errText);
      }

      const jsonData = await response.json();
      if (jsonData.length === 0)
        showMessage("No tasks planned for today", "info");
      else showMessage("Tasks fetched successfully", "success");

      setTodayWorks(jsonData);
    } catch (err) {
      showMessage(`Error while fetching the data: ${err.message}`, "error");
      console.log("Error while fetching the data: ", err.message);
    }
  }
  async function markAsComplete(task) {
    console.log("Clicked");
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${task.taskId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isCompleted: true }),
        }
      );
      if (!response.ok) {
        const errText = await response.text();
        showMessage(`Failed to update the task: ${errText}`, "error");
        throw new Error(errText);
      }

      const updatedTask = await response.json();

      const updated = todayWorks.map((t) =>
        t.taskId === task.taskId ? updatedTask : t
      );
      setTodayWorks(updated);
      showMessage(`Task Marked as Completed`, "success");
      return;
    } catch (error) {
      showMessage(`Error while Marking the task: ${error.message}`, "error");

      console.log("Error while Marking the task:", error.message);
      return;
    }
  }
  if (todayWorks.length == 0) {
    return (
      <>
        <div className="w-5/12 max-w-5/12 mx-auto flex flex-col items-center grow my-30">
          <h1 className="font-bold text-2xl my-5 text-blue-500 tracking-wide">
            You don't have any plans for Today. Chill 😎
          </h1>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="w-5/12 max-w-5/12 mx-auto flex flex-col items-center grow my-30 ">
        <h1 className="font-bold text-2xl my-5 text-blue-500 tracking-wide">
          Your Plans For Today
        </h1>
        <div className="flex flex-col gap-y-2">
          {todayWorks.map((task) => {
            
            const status = getTaskStatus(task.endTime, new Date(currentTime));
            
             return (
              <div
                key={task.taskId}
                className={`flex flex-row justify-center mx-2 h-28 max-h-28  transition-all `}
              >
                <div className="w-80 border rounded-lg p-2">
                  <div className="w-full flex justify-between items-center mb-2">
                    <span className="font-semibold text-slate-700">
                      {task.title}
                    </span>
                    <span className="text-sm text-gray-500">
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-gray-600">{task.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {task.startTime} - {task.endTime}
                  </p>
                </div>

                <div className="flex flex-col justify-center mx-4">
                  <button
                    className={`border h-10 w-52 px-4 rounded-lg text-lg font-medium transition-all
        ${
          task.isCompleted
            ? "bg-green-400 text-white"
            : status === "active"
            ? "bg-yellow-300 hover:bg-yellow-400"
            : status === "upcoming"
            ? "bg-slate-300 cursor-not-allowed"
            : "bg-red-300 cursor-not-allowed"
        }`}
                    disabled={status !== "active" || task.isCompleted}
                    onClick={() => markAsComplete(task)}
                  >
                    {task.isCompleted
                      ? "✅ Completed"
                      : status === "active"
                      ? "Mark as Done"
                      : status === "missed"
                      ? "❌ Missed"
                      : "⏳ Upcoming"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Track;
