'use client';
import TaskCard from './components/TaskCard';
import './globals.css';
import { useEffect, useState } from 'react';
import API from './lib/api';
import Button from './components/Button';
import { useRouter } from "next/navigation";
import Header from './components/Header';
import icon from '../../public/clipboard.png';
import Image from 'next/image';

type Task = {
  id: string;
  title: string;
  color: string;
  completed: boolean;
};


export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks'); 
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-6 bg-neutral-900 min-h-screen">
      <div className="bg-black w-full py-12 lex flex-col items-center">
        <Header />
      </div>
      <Button 
            type="submit" 
            className="w-full max-w-sm mx-auto flex justify-center gap-1 -mt-12"
            onClick={() => router.push("/tasks/new")}
          >
          Create Task ⊕
        </Button>

      <div className='flex justify-between text-gray-600 font-medium'>
        <p className="text-sky-500 m-8">Tasks {total}</p>
        <p className="text-indigo-400 m-8">Completed {completed}</p>
      </div>

      <hr className='m-6'/>

     
      <div className="m-8">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={() => setTasks(prev => prev.filter(t => t.id !== task.id))} />
        ))}
        {tasks.length === 0 && (
          <div className="flex flex-col items-center gap-2">
            <Image src={icon} alt="clipboard" width={160} height={160} className='object-contain'/>
            <p className="text-center text-gray-400">You don't have any tasks registered yet. </p>
            <p className="text-center text-gray-400">Create tasks and organize your to-do items. </p>
          </div>
        )}
      </div>
    </div>
  )
}