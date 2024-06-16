import { useState, useEffect } from 'react';
import api from '../../../api';
import { Task } from '../../../types';

const useCompletedTasks = (searchedTasks: Task[]) => {
    const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

    const filterCompletedTasks = (tasks: Task[]) => {
        return tasks.filter((task: Task) => task.completed && task.relevance);
    }

    const fetchCompletedTasks = async () => {
        try {
            const response = await api.get('/tasks/completed');
            const tasks = response.data;

            if (tasks) {
                setCompletedTasks(tasks);
            }

        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        setCompletedTasks(filterCompletedTasks(searchedTasks));
    }, [searchedTasks])

    useEffect(() => {
        window.addEventListener('fetch-completed-tasks', fetchCompletedTasks);

        return () => {
            window.removeEventListener('fetch-completed-tasks', fetchCompletedTasks);
        };
    }, []);

    return { completedTasks };
};

export default useCompletedTasks;