import Task from "../models/Task.js";
import Project from "../models/Project.js";


// ✅ CREATE TASK (Admin only)
export const createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, deadline } = req.body;

    if (!title || !projectId || !assignedTo || !deadline) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Only admin can create task" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ check member
    const isMember = project.members.some(
      (m) => m.toString() === assignedTo.toString()
    );

    if (!isMember) {
      return res.status(400).json({ message: "User not in project" });
    }

    const task = await Task.create({
      title,
      description,
      project: projectId,
      assignedTo,
      assignedBy: req.user._id,
      deadline,
      status: "Pending",
    });

    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("assignedBy", "name") // 👈 NEW
      .populate({
        path: "project",
        select: "name members",
        populate: {
          path: "members",
          select: "name",
        },
      });

    res.status(201).json(populatedTask);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ GET TASKS (FIXED)
export const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "Admin") {
      // 🔥 ONLY OWN TASKS
      tasks = await Task.find({ assignedBy: req.user._id })
        .populate("assignedTo", "name email")
        .populate("assignedBy", "name")
        .populate({
          path: "project",
          select: "name members",
          populate: {
            path: "members",
            select: "name",
          },
        });

    } else {
      // 🔥 MEMBER → ONLY THEIR TASKS
      tasks = await Task.find({ assignedTo: req.user._id })
        .populate("assignedBy", "name")
        .populate({
          path: "project",
          select: "name members",
          populate: {
            path: "members",
            select: "name",
          },
        });
    }

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ UPDATE STATUS
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["Pending", "In Progress", "Completed"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔒 member restriction
    if (
      req.user.role !== "Admin" &&
      task.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.status = status;
    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("assignedBy", "name")
      .populate({
        path: "project",
        select: "name members",
        populate: {
          path: "members",
          select: "name",
        },
      });

    res.json(updatedTask);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ OVERDUE TASKS (FILTERED)
export const getOverdueTasks = async (req, res) => {
  try {
    const today = new Date();
    let tasks;

    if (req.user.role === "Admin") {
      tasks = await Task.find({
        assignedBy: req.user._id, // 👈 FIX
        deadline: { $lt: today },
        status: { $ne: "Completed" },
      })
        .populate("assignedTo", "name")
        .populate("assignedBy", "name")
        .populate("project", "name");

    } else {
      tasks = await Task.find({
        assignedTo: req.user._id,
        deadline: { $lt: today },
        status: { $ne: "Completed" },
      })
        .populate("assignedBy", "name")
        .populate("project", "name");
    }

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};