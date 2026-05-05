const adminOnly = (req, res, next) => {
  try {
    // check user exists (protect middleware se aata hai)
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // check role
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    next(); // allowed
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default adminOnly;