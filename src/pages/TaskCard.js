export default function TaskCard(props) {
  let { title, description, priority, date, startTime, endTime } =
    props.taskDetails;
  if (priority === "High") {
    priority = "🔴 " + priority;
  } else if (priority === "Medium") {
    priority = "🟡 " + priority;
  } else {
    priority = "🟢 " + priority;
  }
  date = date.split("-").reverse().join("-");
  return (
    <>
      <div className="w-4/5 m-2 p-2 border-2 border-slate-300 rounded-lg transition-all duration-200 ease-in-out
">
        <div>
          <div className="flex flex-col justify-center">
            <div className="flex justify-around">
              <span className="text-lg font-semibold">{'🗹 '+title}</span>
              <span className="text-lg font-semibold">{priority}</span>
            </div>
            <div className="flex justify-around text-slate-900">
              <span>📅{date}</span>
              <span>
                🕒
                {startTime}-{endTime}
              </span>
            </div>
          </div>
        </div>
        <div>
          <p className="mx-4 my-2">{description}</p>
        </div>
        <div className="w-full flex flex-row justify-evenly">
          <button
            onClick={() => props.onEdit(props.taskDetails)}
            className="border-2 border-blue-300 rounded-lg px-2 font-semibold text-blue-500 hover:bg-blue-50 hover:scale-105 transition-all"
          >
            Edit
          </button>
          <button
            onClick={() => props.onDelete(props.taskDetails)}
            className="border-2 border-slate-300 rounded-lg px-2 font-semibold text-red-500 hover:bg-red-50 hover:scale-105"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
