import express from "express";
import path from "path";

const app = express();

// build folder serve karo
app.use(express.static("dist"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("dist/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Frontend running on", PORT);
});