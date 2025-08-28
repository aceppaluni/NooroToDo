"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "./../../lib/api";
import Header from "@/app/components/Header";
import ColorPicker from "../../components/ColorPicker";
import BackButton from "@/app/components/BackButton";

export default function EditTaskPage() {
    const { id } = useParams();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("blue");
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        API.put(`/tasks/${id}`).then((res) => {
        setTitle(res.data.title);
        setColor(res.data.color);
        setCompleted(res.data.completed);
        });
    }, [id]);

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await API.put(`/tasks/${id}`, { title, color, completed });
        router.push("/");
        router.refresh();
    };
    
    return (
        <div>
            <Header />
            <form onSubmit={handleEditSubmit} className="p-6 max-w-xl mx-auto space-y-4">
                <BackButton label="←" />
                <h1 className="text-xl font-bold">Edit Task</h1>
                <input 
                    className="w-full border p-2 rounded"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <ColorPicker color={color} setColor={setColor} />
                
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox" 
                        checked={completed} 
                        onChange={(e) => setCompleted(e.target.checked)}
                    />
                    Completed
                </label>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update </button>
            </form>
        </div>
    );
}