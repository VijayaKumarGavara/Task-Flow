// React built in Components
import { useContext, useState, useEffect } from "react";

// Utility Functions
import isOverlap from "../utils/isOverLap";
import sortTasks from "../utils/sortTasks";

// Components
import PlanningForm from "./PlanningForm";
import OverlapModel from "./Overlapmodel";
import TaskCard from "./TaskCard";
import TasksContext from "../utils/temp";
const Planning = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const { taskList, setTaskList } = useContext(TasksContext);
  // const [sortedTasks, setSortedTasks] = useState([]);
  useEffect(() => {
    fetchTodayPlannedTasks();
  }, []);
  async function fetchTodayPlannedTasks() {
    const today = new Date().toISOString().split("T")[0];
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/?createdToday=true`
      );
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const jsonData = await response.json();
      setTaskList(jsonData);
    } catch (err) {
      console.log("Error while fetching the data: ", err.message);
    }
  }
  let sortedTasks = sortTasks(taskList);

  const [showOverlapModal, setShowOverlapModal] = useState(false);
  const [overlapData, setOverlapData] = useState([]);

  const [editableTask, setEditableTask] = useState(null);

  // To Close PlanningForm
  function handleCancel() {
    setFormOpen(false);
  }

  // Edit & Delete Options of Each Task Card
  function handleEdit(task) {
    setEditableTask(task);
    setFormOpen(true);
    // console.log(task);
  }
  async function handleDelete(task) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${task.taskId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        const updated = taskList.filter((t) => t.taskId != task.taskId);
        setTaskList(updated);
        // console.log("Task deleted successfully");
      } else {
        // console.log("Failed to delete task:", await await response.json());
      }
    } catch (error) {
      console.log("Error deleting task:", error);
    }
    // setSortedTasks(sortTasks(updated));
  }
  async function handleSubmit(newTask) {
    
    const overlapTasks = isOverlap(newTask, taskList);

    if (overlapTasks.length > 0) {
      setOverlapData([newTask, ...overlapTasks]);
      setShowOverlapModal(true);
      return;
    } 
    if (editableTask) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/tasks/${editableTask.taskId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
          }
        );

        if (!response.ok) throw new Error("Failed to update the task");

        const updatedTask = await response.json();

        // Update in UI
        const updatedList = taskList.map((t) =>
          t.taskId === editableTask.taskId ? updatedTask : t
        );

        setTaskList(updatedList);
        setEditableTask(null);
        setFormOpen(false);

        // console.log("✅ Task updated successfully");
        return;
      } catch (error) {
        console.log("Error while updating task:", error.message);
        return;
      }
    }
    else {
      try {
        const response = await fetch("http://localhost:5000/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
        if (!response.ok) throw new Error("Failed to add the task");
        const savedTask = await response.json();

        setTaskList([...taskList, savedTask]);
        // console.log("New Task Added: ", newTask);
      } catch (error) {
        console.log("Error while adding task:", error.message);
      }
    }
  }

  if (taskList.length === 0 && !isFormOpen) {
    return (
      <>
        <div className="flex justify-center items-center max-h-screen h-16 w-full text-center mt-32 gap-4">
          <h2 className="text-2xl text-slate-600 ">No tasks planned yet.</h2>
          <button
            className="px-2 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all"
            onClick={() => setFormOpen(true)}
          >
            Plan Now
          </button>
        </div>
      </>
    );
  } else if (taskList.length > 0 && !isFormOpen) {
    return (
      <>
        <div className="w-5/12 mx-auto mt-32 flex flex-col items-center">
          <div className="w-full h-20 flex flex-row justify-center gap-x-8 items-center">
            <h3 className="text-2xl font-semibold text-blue-500 ">
              Your Plannings
            </h3>
            <button
              className="px-2 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all"
              onClick={() => setFormOpen(true)}
            >
              +Add More
            </button>
          </div>
          <div className="w-3/4 flex flex-col items-center gap-y-4">
            {sortedTasks.map((task, index) => {
              return (
                <TaskCard
                  key={index}
                  taskDetails={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="w-full h-11/12 max-h-screen mt-24 text-center">
        <PlanningForm
          onCancel={handleCancel}
          handleSubmit={handleSubmit}
          editableTask={editableTask}
        />
      </div>
      {showOverlapModal && (
        <OverlapModel
          data={overlapData}
          onClose={() => setShowOverlapModal(false)}
          onKeep={async () => {
            try {
              const response = await fetch("http://localhost:5000/api/tasks", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(overlapData[0]),
              });
              if (!response.ok) throw new Error("Failed to add the task");
              const savedTask = await response.json();

              setTaskList([...taskList, savedTask]);
              //console.log("New Task Added: ", newTask);
            } catch (error) {
              console.log("Error while adding task:", error.message);
            }
            //const updatedTasks = [...taskList, overlapData[0]];
            //setTaskList(updatedTasks);
            // sortedTasks=sortTasks(updatedTasks);
            setShowOverlapModal(false);
          }}
          onEdit={() => {
            setEditableTask(overlapData[0]); // send newTask to form
            setShowOverlapModal(false);
            setFormOpen(true); // reopen form with that data
          }}
        />
      )}
    </>
  );
};

export default Planning;
