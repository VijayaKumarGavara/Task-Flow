import timeToMinutes from "./timeToMinutes";
// console.log(timeToMinutes);
export default function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
  });
}
