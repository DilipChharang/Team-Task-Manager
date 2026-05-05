import Project from "../models/Project.js";


// ✅ CREATE PROJECT (Admin only)
export const createProject = async (req, res) => {
  try {
    const { name, description, members = [] } = req.body;

    // 🔥 validation
    if (!name) {
      return res.status(400).json({ message: "Project name required" });
    }

    // 🔒 only admin
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Only admin can create project" });
    }

    // 🔥 ensure admin always included
    const uniqueMembers = [...new Set([req.user._id.toString(), ...members])];

    const project = await Project.create({
      name,
      description,
      admin: req.user._id,
      members: uniqueMembers,
    });

    const populatedProject = await Project.findById(project._id)
      .populate("admin", "name email")
      .populate("members", "name email");

    res.status(201).json(populatedProject);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ GET PROJECTS (only user related)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user._id,
    })
      .populate("admin", "name email")
      .populate("members", "name email");

    res.json(projects);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ ADD MEMBER (Admin only)
export const addMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 🔒 only admin can add
    if (project.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only admin can add members" });
    }

    // 🔥 ObjectId safe check
    const isMember = project.members.some(
      (m) => m.toString() === userId.toString()
    );

    if (isMember) {
      return res.status(400).json({ message: "User already a member" });
    }

    project.members.push(userId);
    await project.save();

    const updatedProject = await Project.findById(project._id)
      .populate("members", "name email");

    res.json({ message: "Member added", project: updatedProject });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ REMOVE MEMBER (Admin only)
export const removeMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 🔒 only admin
    if (project.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only admin can remove members" });
    }

    project.members = project.members.filter(
      (m) => m.toString() !== userId.toString()
    );

    await project.save();

    res.json({ message: "Member removed", project });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ DELETE PROJECT (Admin only)
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 🔒 only admin can delete
    if (project.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await project.deleteOne();

    res.json({ message: "Project deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};