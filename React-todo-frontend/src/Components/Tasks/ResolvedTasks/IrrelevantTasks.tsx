// Libraries
import { useEffect, useState } from 'react';

// Scripts
import { deleteTask } from '../../../deleteTask';
import { setRelevance } from '../../../setState';
import { Task } from '../../../types';
import { Tooltip } from 'react-tooltip';
import { TasksProps } from '../../ComponentsManager/ComponentsManager';
import api from '../../../api';

// React icons
import { FaRegTrashAlt } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";

// CSS
import './ResolvedTasks.scss';

const IrrelevantTasks: React.FC<TasksProps> = ({
    searchedTasks,
    setSelectedTaskTitle,
    setSelectedTaskDeadline,
    setSelectedTaskDescription,
    toggleModal,
}) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchIrrelevantTasks = async () => {
        try {
            const response = await api.get('/tasks/irrelevant');

            if (response.data) {
                setTasks(response.data);
            }

        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchIrrelevantTasks();
        window.addEventListener('fetch-irrelevant-tasks', fetchIrrelevantTasks);

        return () => {
            window.removeEventListener('fetch-irrelevant-tasks', fetchIrrelevantTasks);
        }

    }, []);

    useEffect(() => {
        const handleSearch = async () => {
            const filteredTasks: Task[] = searchedTasks.filter(task => !task.relevance);
            setTasks(filteredTasks);
        };

        handleSearch();
    }, [searchedTasks]);



    //Handles
    const handleEdit = (title: string, description: string, deadline: string) => {
        toggleModal();
        setSelectedTaskTitle(title);
        setSelectedTaskDescription(description);
        setSelectedTaskDeadline(deadline);
    };

    const handleDelete = async (title: string) => {
        await deleteTask(title);
        fetchIrrelevantTasks();
    };

    const handleSetRelevance = async (title: string, completed: boolean, deadline: string) => {
        await setRelevance(title);
        fetchIrrelevantTasks();
        completed ? window.dispatchEvent(new Event('fetch-completed-tasks')) : window.dispatchEvent(new Event('fetch-todo-tasks'));
        if (deadline) {
            window.dispatchEvent(new Event('update-graph'));
        }
    };


    useEffect(() => {
        fetchIrrelevantTasks();
    }, []);

    return (
        <>
            <div className="columns-container columns-container-resolved columns-container-irrelevant">
                <div className='column-header'>
                    <h1>Irrelevant</h1>
                    <h1 className='tasks-count'>{tasks.length}</h1>
                </div>
                <div className="tasks-container">
                    <div className="column">
                        {tasks.map((task: Task, index: number) => (
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
                                        <p className="setRelevanceButton" data-tooltip-id="tooltipIrrelevant" data-tooltip-content="Relevant" onClick={() => handleSetRelevance(task.title, task.completed, task.deadline)}><TbNotes /></p>
                                        <p className="deleteButton" data-tooltip-id="tooltipIrrelevant" data-tooltip-content="Delete" onClick={() => handleDelete(task.title)}><FaRegTrashAlt /></p>
                                    </div>
                                </div>







                            </div>
                        ))}
                    </div>
                </div>
            </div >

            <Tooltip id="tooltipIrrelevant" place="bottom" style={{ fontFamily: "Roboto" }} />

        </>
    );
};

export default IrrelevantTasks;
