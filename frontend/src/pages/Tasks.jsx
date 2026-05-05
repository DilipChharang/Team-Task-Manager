import { useEffect, useState } from "react";
import API from "../services/api";
import TaskCard from "../components/TaskCard";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]); // 👈 filtered members

  const [form, setForm] = useState({
    title: "",
    description: "",
    projectId: "",
    assignedTo: "",
    deadline: "",
  });

  // 🔥 FETCH DATA
  const fetchData = async () => {
    try {
      const t = await API.get("/tasks");
      const p = await API.get("/projects");

      setTasks(t.data);
      setProjects(p.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 PROJECT SELECT → LOAD MEMBERS (REMOVE ADMIN)
  const handleProjectChange = (projectId) => {
    setForm({ ...form, projectId, assignedTo: "" });

    const selectedProject = projects.find((p) => p._id === projectId);

    if (selectedProject) {
      // ❌ REMOVE ADMIN
      const filteredMembers = selectedProject.members.filter(
        (m) => m._id !== selectedProject.admin?._id
      );

      setMembers(filteredMembers);
    } else {
      setMembers([]);
    }
  };

  // ✅ CREATE TASK
  const createTask = async (e) => {
    e.preventDefault();

    if (!form.title || !form.projectId || !form.assignedTo || !form.deadline) {
      return alert("All fields required");
    }

    try {
      await API.post("/tasks", form);

      alert("✅ Task created successfully");

      setForm({
        title: "",
        description: "",
        projectId: "",
        assignedTo: "",
        deadline: "",
      });

      setMembers([]);
      fetchData();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("❌ Task creation failed");
    }
  };

  // ✅ UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Create Task</h2>

        <form onSubmit={createTask} className="grid grid-cols-2 gap-4">

          {/* TITLE */}
          <input
            className="border p-2 rounded"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          {/* DESCRIPTION */}
          <input
            className="border p-2 rounded"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* PROJECT SELECT */}
          <select
            className="border p-2 rounded"
            value={form.projectId}
            onChange={(e) => handleProjectChange(e.target.value)}
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* 👥 MEMBER DROPDOWN (FINAL FIX) */}
          <select
            className="border p-2 rounded"
            value={form.assignedTo}
            onChange={(e) =>
              setForm({ ...form, assignedTo: e.target.value })
            }
          >
            <option value="">Assign Member</option>

            {members.map((m) => (
              <option key={m._id} value={m._id}>
                {m.name}
              </option>
            ))}
          </select>

          {/* DEADLINE */}
          <input
            type="date"
            className="border p-2 rounded"
            value={form.deadline}
            onChange={(e) =>
              setForm({ ...form, deadline: e.target.value })
            }
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Create Task
          </button>

        </form>
      </div>

      {/* TASK LIST */}
      <div className="space-y-4">
        {tasks.map((t) => (
          <TaskCard key={t._id} task={t} updateStatus={updateStatus} />
        ))}
      </div>

    </div>
  );
};

export default Tasks;