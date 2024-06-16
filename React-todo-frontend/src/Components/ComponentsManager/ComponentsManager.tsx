import { useState } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import TodoTasks from '../Tasks/TodoTasks/TodoTasks';
import { Task } from '../../types';
import Sidebar from '../Sidebar/Sidebar';
import CompletedTasks from '../Tasks/CompletedTasks/CompletedTasks';
import IrrelevantTasks from '../Tasks/IrrelevantTasks/IrrelevantTasks';
import TasksGraph from '../TasksGraph/TasksGraph';
import './ComponentsManager.scss';
import EditTask from '../Modals/Edit/EditTask';

export interface TasksProps {
    searchedTasks: Task[];
    setSelectedTaskTitle: React.Dispatch<React.SetStateAction<string>>;
    setSelectedTaskDeadline: React.Dispatch<React.SetStateAction<string>>;
    setSelectedTaskDescription: React.Dispatch<React.SetStateAction<string>>;
    toggleModal: () => void;
}

const ComponentsManager = () => {
    const [searchedTasks, setSearchedTasks] = useState<Task[]>([]);
    const [selectedTaskTitle, setSelectedTaskTitle] = useState<string>('');
    const [selectedTaskDeadline, setSelectedTaskDeadline] = useState<string>('');
    const [selectedTaskDescription, setSelectedTaskDescription] = useState<string>('');
    const [modal, setModal] = useState<boolean>(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <>
            {modal && (
                <EditTask
                    toggleModal={toggleModal}
                    modal={modal}
                    selectedTask={{ title: selectedTaskTitle, deadline: selectedTaskDeadline, description: selectedTaskDescription }}
                />
            )}

            <div className='components-container'>
                <Sidebar />

                <div className='todotasks_graph-container'>

                    <TasksGraph />

                    <TodoTasks
                        searchedTasks={searchedTasks}
                        setSelectedTaskTitle={setSelectedTaskTitle}
                        setSelectedTaskDeadline={setSelectedTaskDeadline}
                        setSelectedTaskDescription={setSelectedTaskDescription}
                        toggleModal={toggleModal}
                    />
                </div>

                <div className='resolvedtasks_searchbar-container'>

                    <Searchbar setSearchedTasks={setSearchedTasks} />

                    <div className='resolvedtasks-container'>

                        <CompletedTasks
                            searchedTasks={searchedTasks}
                            setSelectedTaskTitle={setSelectedTaskTitle}
                            setSelectedTaskDeadline={setSelectedTaskDeadline}
                            setSelectedTaskDescription={setSelectedTaskDescription}
                            toggleModal={toggleModal}
                        />
                        <IrrelevantTasks
                            searchedTasks={searchedTasks}
                            setSelectedTaskTitle={setSelectedTaskTitle}
                            setSelectedTaskDeadline={setSelectedTaskDeadline}
                            setSelectedTaskDescription={setSelectedTaskDescription}
                            toggleModal={toggleModal}
                        />
                    </div>

                </div>

            </div>
        </>
    );
}

export default ComponentsManager;
