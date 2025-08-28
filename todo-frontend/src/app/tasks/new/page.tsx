"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "./../../lib/api";
import ColorPicker from "../../components/ColorPicker";
import BackButton from "@/app/components/BackButton";
import Header from "@/app/components/Header";

export default function NewTaskPage() {
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("blue");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await API.post("/tasks", { title, color});
        router.push("/");
        router.refresh();
    };

    return (
        <div>
           <Header />
            <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto space-y-4">
                <BackButton label="←" />
                <h1 className="text-xl font-bold">Create Task</h1>
                <input 
                    className="w-full border p-2 rounded"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            
                <ColorPicker color={color} setColor={setColor} />
            
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            </form>
        </div>
    );
}