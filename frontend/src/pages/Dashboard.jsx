import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const overdueTasks = tasks.filter(
    (t) =>
      t.deadline &&
      new Date(t.deadline) < new Date() &&
      t.status !== "Completed"
  ).length;

  return (
    <div>
      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-5 rounded shadow">
          <h3 className="text-gray-500">Total Tasks</h3>
          <p className="text-2xl font-bold">{totalTasks}</p>
        </div>

        <div className="bg-green-100 p-5 rounded shadow">
          <h3 className="text-gray-500">Completed</h3>
          <p className="text-2xl font-bold">{completedTasks}</p>
        </div>

        <div className="bg-red-100 p-5 rounded shadow">
          <h3 className="text-gray-500">Overdue</h3>
          <p className="text-2xl font-bold">{overdueTasks}</p>
        </div>

      </div>

      {/* Task List */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Title</th>
              <th>Status</th>
              <th>Deadline</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-b">
                <td className="py-2">{task.title}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      task.status === "Completed"
                        ? "bg-green-200"
                        : task.status === "In Progress"
                        ? "bg-yellow-200"
                        : "bg-gray-200"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>

                <td>
                  {task.deadline
                    ? new Date(task.deadline).toLocaleDateString()
                    : "No date"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;