import timeToMinutes from "./timeToMinutes";
export default function isOverlap(newTask, taskList) {
  let overlapTasks = [];
  let newStart = timeToMinutes(newTask.startTime);
  let newEnd = timeToMinutes(newTask.endTime);
  for (let t of taskList) {
    if (
      newTask.taskId !== t.taskId &&
      newTask.date === t.date &&
      newStart < timeToMinutes(t.endTime) &&
      newEnd > timeToMinutes(t.startTime)
    ) {
      overlapTasks.push(t);
    }
  }
  return overlapTasks;
}
