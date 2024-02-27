import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import TaskModel from './models/Task';

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskmanagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as mongoose.ConnectOptions)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Adding middleware  to parse incoming JSON requests.
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Create a new task
app.post('/tasks', async (req: Request, res: Response) => {
    try {
        const { title, description, dueDate, priority } = req.body;
        const newTask = new TaskModel({ title, description, dueDate, priority });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Retrieve all tasks
app.get('/tasks', async (req: Request, res: Response) => {
    try {
      const tasks = await TaskModel.find();
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error retrieving tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
