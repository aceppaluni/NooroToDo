"use client";
import { useRouter } from "next/navigation";
import API from "../lib/api";
import React from "react";
import Button from "./Button";

type Task = {
    id: string;
    title: string; 
    color: string;
    completed: boolean;
}

type TaskCardProps = {
  task: Task;
  onDelete: () => void; // callback to notify parent
};

export default function TaskCard({ task, onDelete }: TaskCardProps) {
    const router = useRouter();
    //{ task }: { task: Task }
    //{ task, onDelete }: Task

    const toggleComplete = async () => {
        await API.put(`/tasks/${task.id}`, {...task, completed: !task.completed });
        router.refresh();
    };

    const deleteTask = async () => {
       console.log("deleting...")
       if (confirm("Delete this task?")) {
            try {
                console.log("attempting...")
                await API.delete(`/tasks/${task.id}`);
                onDelete(); 
            } catch (err) {
                console.error("Failed to delete task:", err);
                alert("Could not delete task. Please try again.");
            }
        }
    }

    const borderColorClass = {
      red: 'border-red-500',
      orange: 'border-orange-500',
      yellow: 'border-yellow-400',
      green: 'border-green-500',
      blue: 'border-blue-500',
      purple: 'border-purple-500',
      pink: 'border-pink-500',
      brown: 'border-yellow-900',
    }[task.color] || 'border-gray-300';

  

    return (
        <div
            className={`flex justify-between items-center p-4 rounded-xl shadow-sm border-l-4 ${borderColorClass} bg-white hover:bg-gray-50 transition cursor-pointer`}
            onClick={() => router.push(`/tasks/${task.id}`)}
        >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => {
            e.stopPropagation();
            toggleComplete();
          }}
          className="w-5 h-5 accent-blue-500"
        />
        <span
          className={`text-lg font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
        >
          {task.title}
        </span>
      </div>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          deleteTask();
        }}
        className="text-red-500 font-bold text-xl hover:text-red-600 transition"
      >
        ✕
      </Button>
    </div>
    )
}