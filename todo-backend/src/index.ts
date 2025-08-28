import express = require("express");
import cors = require("cors");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(cors());    
app.use(express.json());

//Get all tasks
app.get('/tasks', async (req, res) => {
    const tasks = await prisma.task.findMany({orderBy: {createdAt: 'desc'}});
    res.json(tasks);
});

//Post created task
app.post('/tasks', async (req, res) => {
    const { title, color } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const task = await prisma.task.create({data: {title, color}});
    res.json(task);
})

//Put update task
app.put('/tasks/:id', async (req, res) => {
    const {id} = req.params;
    const {title, color, completed} = req.body || {};

    try {
        const task = await prisma.task.update({
            where: { id: Number(id) },
            data: {title, color, completed}
        });
        res.json(task)
    } catch (error) {
        res.status(404).json({error: 'Task not found'});
    }
});

//Delete
app.delete('/tasks/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await prisma.task.delete({
            where: {id: Number(id)}
        });
        res.json({message: 'Task deleted'});
    } catch (error) {
        res.status(404).json({error: 'Task not found'});
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});