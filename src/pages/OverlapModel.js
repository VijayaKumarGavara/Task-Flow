export default function OverlapModel(props) {
  const [newTask, ...overlapTasks] = props.data;
    console.log("Overlapped",newTask, overlapTasks);
  return (
    <>
      <div className="mt-36 fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Overlap Detected!
          </h2>
          <p className="mb-2 font-semibold">
            {newTask.title} ({newTask.startTime} - {newTask.endTime})
          </p>
          <h3 className="text-slate-700 mb-2">Conflicts with:</h3>
          <ul className="text-left text-sm text-gray-700 mb-4">
            {overlapTasks.map((t, i) => (
              <li key={i} className="mb-1">
                • {t.title} ({t.startTime}-{t.endTime})
              </li>
            ))}
          </ul>
          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded"
              onClick={props.onClose}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 bg-yellow-400 rounded"
              onClick={props.onEdit}
            >
              Edit Task
            </button>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={props.onKeep}
            >
              Keep Anyway
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
