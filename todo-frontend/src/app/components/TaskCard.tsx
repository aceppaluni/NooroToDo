"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  onDelete: () => void;
  onToggle: (updated: Task) => void;
};

export default function TaskCard({ task, onDelete, onToggle }: TaskCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggleComplete = async () => {
    setLoading(true);
      try {
        const updated = { ...task, completed: !task.completed };
        await API.put(`/tasks/${task.id}`, updated);
        onToggle(updated);
      } finally {
        setLoading(false);
    }
  };

  const deleteTask = async () => {
    if (confirm("Delete this task?")) {
      try {
          console.log("attempting...");
          await API.delete(`/tasks/${task.id}`);
          onDelete(); 
        } catch (err) {
            console.error("Failed to delete task:", err);
            alert("Could not delete task. Please try again.");
      }
    }
  };

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
      className={`flex justify-between items-center p-4 rounded-xl shadow-sm border-l-4 ${borderColorClass} bg-white hover:bg-gray-50 transition cursor-pointer`}>
      <div className="flex items-center gap-3" >
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
          onClick={(e) => {
            e.stopPropagation(); 
            router.push(`/tasks/${task.id}`);
          }} 
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
  );
}