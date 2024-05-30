//Libraries
import { useEffect, useState } from 'react';
//Scripts
import { deleteTask } from '../../../deleteTask';
import { setCompleted, setRelevance } from '../../../setState';
import { Tooltip } from 'react-tooltip';
import { TasksProps } from '../../ComponentsManager/ComponentsManager';

//CSS
import './ResolvedTasks.scss'

//React icons
import { TbNotesOff } from 'react-icons/tb';
import { FaRegTrashAlt } from "react-icons/fa";
import { BiTaskX } from 'react-icons/bi';
import { Task } from '../../../types';
import api from '../../../api';



const CompletedTasks: React.FC<TasksProps> = ({
    searchedTasks,
    setSelectedTaskTitle,
    setSelectedTaskDeadline,
    setSelectedTaskDescription,
    toggleModal,
}) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleEdit = (title: string, description: string, deadline: string) => {
        toggleModal();
        setSelectedTaskTitle(title);
        setSelectedTaskDescription(description);
        setSelectedTaskDeadline(deadline)
    };

    const fetchCompletedTasks = async () => {
        try {
            const response = await api.get('/tasks/completed');

            if (response.data) {
                setTasks(response.data);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchCompletedTasks();
        window.addEventListener('fetch-completed-tasks', fetchCompletedTasks);

        return () => {
            window.removeEventListener('fetch-completed-tasks', fetchCompletedTasks);
        }

    }, []);

    useEffect(() => {
        const handleSearch = async () => {
            const filteredTasks: Task[] = searchedTasks.filter(task => task.completed && task.relevance);
            setTasks(filteredTasks);
        };

        handleSearch();
    }, [searchedTasks]);


    const handleSetRelevance = async (title: string, deadline: string) => {
        await setRelevance(title);
        fetchCompletedTasks();
        window.dispatchEvent(new Event('fetch-irrelevant-tasks'));
        if (deadline) {
            window.dispatchEvent(new Event('update-graph'));
        }
    };

    const handleSetCompleted = async (title: string, deadline: string) => {
        await setCompleted(title);
        fetchCompletedTasks();
        window.dispatchEvent(new Event('fetch-todo-tasks'));
        if (deadline) {
            window.dispatchEvent(new Event('update-graph'));
        }
    };


    const handleDelete = async (title: string) => {
        await deleteTask(title);
        fetchCompletedTasks();
    };

    return (
        <>
            <div className="columns-container columns-container-resolved">
                <div className='column-header'>
                    <h1>Done</h1>
                    <h1 className='tasks-count'>{tasks.length}</h1>
                </div>
                <div className="tasks-container">
                    <div className="column">
                        {tasks.map((task: Task, index: number) => {
                            return (
                                <div key={index} className="task">
                                    <p className="task-title" onClick={() => handleEdit(task.title, task.description, task.deadline)}>{task.title}</p>
                                    <p className="task-description">{task.description}</p>


                                    <div className='task-utilities'>
                                        {task.deadline && (
                                            <div className='due_text-container'>
                                                <p className='due-text'>Due: {new Date(task.deadline).toLocaleDateString()}</p>
                                            </div>
                                        )}
                                        <div className='buttons'>
                                            <p className="setRelevanceButton" data-tooltip-id="tooltipCompleted" data-tooltip-content="Irrelevant" onClick={() => handleSetRelevance(task.title, task.deadline)}><TbNotesOff /></p>
                                            <p className="setCompletedButton" data-tooltip-id="tooltipCompleted" data-tooltip-content="Incomplete" onClick={() => handleSetCompleted(task.title, task.deadline)}><BiTaskX /></p>
                                            <p className="deleteButton" data-tooltip-id="tooltipCompleted" data-tooltip-content="Delete" onClick={() => handleDelete(task.title)}><FaRegTrashAlt /></p>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Tooltip id="tooltipCompleted" place="bottom" style={{ fontFamily: "Roboto" }} />
        </>
    );
};

export default CompletedTasks;

