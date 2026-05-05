import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Member" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      alert("Account created! Please login.");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Create Account</h2>
        <div className="space-y-4">
          <input
            placeholder="Full Name"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <select 
            className="w-full p-3 border border-slate-300 rounded-lg bg-white outline-none"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="Member">Team Member</option>
            <option value="Admin">Project Admin</option>
          </select>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-300">
            Register
          </button>
        </div>
        <p className="mt-4 text-center text-slate-600">
          Already have an account? <Link to="/" className="text-indigo-600 font-semibold">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;