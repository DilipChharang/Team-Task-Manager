import { useEffect, useState } from "react";
import API from "../services/api";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    members: [],
  });

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/auth/users");
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();

    if (!form.name) return alert("Project name required");

    try {
      await API.post("/projects", form);

      alert("✅ Project created");

      setForm({ name: "", description: "", members: [] });
      fetchProjects();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("❌ Error creating project");
    }
  };

  const deleteProject = async (id) => {
    await API.delete(`/projects/${id}`);
    fetchProjects();
  };

  return (
    <div className="p-6">

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Create Project</h2>

        <form onSubmit={createProject} className="grid grid-cols-2 gap-4">

          <input
            className="border p-2 rounded"
            placeholder="Project Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <div className="col-span-2">
  <p className="mb-2 font-medium">Select Team Members</p>

  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-3 rounded">

    {users
      .filter((u) => u.role === "Member")
      .map((u) => (
        <label key={u._id} className="flex items-center gap-2">

          <input
            type="checkbox"
            value={u._id}
            checked={form.members.includes(u._id)}
            onChange={(e) => {
              if (e.target.checked) {
                setForm({
                  ...form,
                  members: [...form.members, u._id],
                });
              } else {
                setForm({
                  ...form,
                  members: form.members.filter((id) => id !== u._id),
                });
              }
            }}
          />

          {u.name}

        </label>
      ))}

  </div>
</div>

          <button className="col-span-2 bg-blue-600 text-white py-2 rounded">
            Create Project
          </button>

        </form>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p._id} project={p} onDelete={deleteProject} />
        ))}
      </div>

    </div>
  );
};

export default Projects;