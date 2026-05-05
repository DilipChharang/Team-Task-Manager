const TaskCard = ({ task, updateStatus }) => {
  const handleChange = async (status) => {
    await updateStatus(task._id, status);
  };

  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">

      <div>
        <h3 className="font-bold">{task.title}</h3>
        <p className="text-sm text-gray-500">{task.description}</p>
      </div>

      <select
        value={task.status}
        onChange={(e) => handleChange(e.target.value)}
        className="border p-1 rounded"
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

    </div>
  );
};

export default TaskCard;