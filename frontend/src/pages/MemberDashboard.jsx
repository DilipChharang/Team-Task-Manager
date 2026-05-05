import { useEffect, useState } from "react";
import API from "../services/api";

const MemberDashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  // 📊 STATS
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6 mb-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Total Tasks</p>
          <h2 className="text-2xl font-bold">{total}</h2>
        </div>

        <div className="bg-green-100 p-5 rounded-xl shadow">
          <p className="text-gray-500">Completed</p>
          <h2 className="text-2xl font-bold">{completed}</h2>
        </div>

        <div className="bg-blue-100 p-5 rounded-xl shadow">
          <p className="text-gray-500">Progress</p>
          <h2 className="text-2xl font-bold">{progress}%</h2>
        </div>

      </div>

      {/* PROGRESS BAR */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm mt-2">{progress}% completed</p>
      </div>

      {/* TASKS */}
      <div className="grid grid-cols-3 gap-6">

        {tasks.map(task => (
          <div key={task._id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">

            <h2 className="font-semibold text-lg">{task.title}</h2>
            <p className="text-gray-500 text-sm">{task.description}</p>

            {/* 📁 PROJECT */}
            <p className="text-sm mt-2">
              📁 {task.project?.name}
            </p>

            {/* 👑 ADMIN */}
            <p className="text-sm">
              👑 Assigned by: {task.assignedBy?.name}
            </p>

            {/* 👥 TEAM */}
            <div className="mt-2">
              <p className="text-sm font-medium">👥 Team:</p>

              <div className="flex flex-wrap gap-2 mt-1">
                {task.project?.members?.map(m => (
                  <span
                    key={m._id}
                    className="bg-blue-100 px-2 py-1 text-xs rounded"
                  >
                    {m.name}
                  </span>
                ))}
              </div>
            </div>

            {/* 📅 DEADLINE */}
            <p className="text-sm mt-2">
              📅 {task.deadline
                ? new Date(task.deadline).toLocaleDateString()
                : "No deadline"}
            </p>

            {/* STATUS */}
            <span className={`inline-block mt-2 px-2 py-1 text-sm rounded ${
              task.status === "Completed"
                ? "bg-green-200"
                : task.status === "In Progress"
                ? "bg-yellow-200"
                : "bg-gray-200"
            }`}>
              {task.status}
            </span>

            {/* UPDATE */}
            <select
              value={task.status}
              onChange={(e) => updateStatus(task._id, e.target.value)}
              className="mt-3 w-full border p-2 rounded"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

          </div>
        ))}

      </div>

    </div>
  );
};

export default MemberDashboard;