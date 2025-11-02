// React built in Components
import { useState } from "react";

// Utility Functions
import isOverlap from "../utils/isOverLap";
import sortTasks from "../utils/sortTasks";

// Components
import PlanningForm from "./PlanningForm";
import OverlapModel from "./OverLapmodel";
import TaskCard from "./TaskCard";
const Planning = ({ taskList, setTaskList }) => {
  const [isFormOpen, setFormOpen] = useState(false);
  // const [taskList, setTaskList] = useState([]);
  // const [sortedTasks, setSortedTasks] = useState([]);
  const sortedTasks = sortTasks(taskList);

  const [showOverlapModal, setShowOverlapModal] = useState(false);
  const [overlapData, setOverlapData] = useState([]);

  const [editableTask, setEditableTask] = useState(null);

  function handleCanel() {
    setFormOpen(false);
  }

  function handleEdit(task) {
    setEditableTask(task);
    setFormOpen(true);
    // console.log(task);
  }

  function handleDelete(task) {
    const updated = taskList.filter((t) => t != task);
    setTaskList(updated);
    // setSortedTasks(sortTasks(updated));
  }
  function handleSubmit(newTask) {
    const overlapTasks = isOverlap(newTask, taskList);
    if (editableTask) {
      // Editing mode: replace old task
      const updated = taskList.map((t) => (t === editableTask ? newTask : t));
      setTaskList(updated);
      // setSortedTasks(sortTasks(updated));
      setEditableTask(null);
      setFormOpen(false);
      return;
    }
    if (overlapTasks.length > 0) {
      setOverlapData([newTask, ...overlapTasks]);
      setShowOverlapModal(true);
    } else {
      const updated = [...taskList, newTask];
      setTaskList(updated);
      // setSortedTasks(sortTasks(updated));
      console.log("New Task Added: ", newTask);
    }
    // setFormOpen(false);
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
          onCancel={handleCanel}
          handleSubmit={handleSubmit}
          editableTask={editableTask}
        />
      </div>
      {showOverlapModal && (
        <OverlapModel
          data={overlapData}
          onClose={() => setShowOverlapModal(false)}
          onKeep={() => {
            const updatedTasks = [...taskList, overlapData[0]];
            setTaskList(updatedTasks);
            setSortedTasks(sortTasks(updatedTasks));
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
