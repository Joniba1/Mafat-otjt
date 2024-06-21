import { useState, useEffect } from 'react';
import api from '../../../api';
import { Task } from '../../../types';

const useIrrelevantTasks = (searchedTasks: Task[]) => {
    const [irrelevantTasks, setIrrelevantTasks] = useState<Task[]>([]);

    const filterIrrelevantTasks = (tasks: Task[]) => {
        return tasks.filter((task: Task) => !task.relevance);
    }

    const fetchIrrelevantTasks = async () => {
        try {
            const response = await api.get('/tasks/irrelevant');
            const tasks = response.data;

            if (tasks) {
                setIrrelevantTasks(tasks);
            }

        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        setIrrelevantTasks(filterIrrelevantTasks(searchedTasks));
    }, [searchedTasks])

    useEffect(() => {
        window.addEventListener('fetch-irrelevant-tasks', fetchIrrelevantTasks);

        return () => {
            window.removeEventListener('fetch-irrelevant-tasks', fetchIrrelevantTasks);
        };
    }, []);

    return { irrelevantTasks };
};

export default useIrrelevantTasks;