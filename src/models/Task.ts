import mongoose, { Document } from 'mongoose';

interface Task extends Document {
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
}

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, required: true },
});

const TaskModel = mongoose.model<Task>('Task', TaskSchema);

export default TaskModel;