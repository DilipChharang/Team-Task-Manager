import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-gray-900 text-white p-5 min-h-screen">
      <h2 className="text-2xl font-bold mb-8">TeamFlow</h2>

      <ul className="space-y-4">

        {/* Dashboard */}
        <li
          className="cursor-pointer hover:text-gray-300"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </li>

        {/* 👑 Only Admin */}
        {user?.role === "Admin" && (
          <>
            <li onClick={() => navigate("/projects")} className="cursor-pointer hover:text-gray-300">
              Projects
            </li>

            <li onClick={() => navigate("/tasks")} className="cursor-pointer hover:text-gray-300">
              Tasks
            </li>
          </>
        )}

      </ul>
    </div>
  );
};

export default Sidebar;