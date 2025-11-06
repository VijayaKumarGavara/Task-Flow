import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  taskId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ["High", "Medium", "Low"], default: "High" },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  date: { type: String, default: () => new Date().toISOString().split("T")[0] },
  isCompleted: { type: Boolean, default: false },
}, { timestamps: true }); // adds createdAt & updatedAt automatically

export default mongoose.model("Task", taskSchema);
