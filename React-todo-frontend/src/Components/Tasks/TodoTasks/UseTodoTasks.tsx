import { useState, useEffect } from 'react';
import api from '../../../api';
import { Task } from '../../../types';

const useTodoTasks = (searchedTasks: Task[]) => {
    const [todoTasks, setTodoTasks] = useState<Task[]>([]);

    const filterTodoTasks = (tasks: Task[]) => {
        return tasks.filter((task: Task) => !task.completed && task.relevance);
    }

    const fetchTodoTasks = async () => {
        try {
            const response = await api.get('/tasks');
            const tasks = response.data;

            if (tasks) {
                setTodoTasks(filterTodoTasks(tasks));
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        setTodoTasks(filterTodoTasks(searchedTasks));
    }, [searchedTasks])

    useEffect(() => {
        window.addEventListener('fetch-todo-tasks', fetchTodoTasks);

        return () => {
            window.removeEventListener('fetch-todo-tasks', fetchTodoTasks);
        };
    }, []);


    return { todoTasks, fetchTodoTasks };
};

export default useTodoTasks;