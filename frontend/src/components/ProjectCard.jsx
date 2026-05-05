const ProjectCard = ({ project, onDelete }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">

      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-1">{project.name}</h2>
      <p className="text-gray-500 text-sm mb-3">
        {project.description}
      </p>

      {/* 👑 ADMIN */}
      <p className="text-sm mb-2">
        👑 Admin: {project.admin?.name}
      </p>

      {/* 👥 MEMBERS */}
      <div className="mb-3">
        <p className="text-sm font-medium">👥 Team Members:</p>

        <div className="flex flex-wrap gap-2 mt-1">
          {project.members
  ?.filter((m) => m._id !== project.admin?._id) // ❌ remove admin
  .map((m) => (
    <span
      key={m._id}
      className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
    >
      {m.name}
    </span>
  ))}
        </div>
      </div>

      {/* DELETE */}
      <button
        onClick={() => onDelete(project._id)}
        className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
      >
        Delete
      </button>

    </div>
  );
};

export default ProjectCard;