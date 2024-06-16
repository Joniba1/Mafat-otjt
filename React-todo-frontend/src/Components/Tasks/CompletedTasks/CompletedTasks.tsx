//Scripts
import { TasksProps } from '../../ComponentsManager/ComponentsManager';

//React icons
import { Task } from '../../../types';
import TaskItem from '../TaskItem';
import useCompletedTasks from './UseCompletedTasks';

import '../ResolvedTasks.scss';


const CompletedTasks: React.FC<TasksProps> = ({
    searchedTasks,
    setSelectedTaskTitle,
    setSelectedTaskDeadline,
    setSelectedTaskDescription,
    toggleModal,
}) => {
    const { completedTasks } = useCompletedTasks(searchedTasks);

    return (
        <>
            <div className="columns-container columns-container-resolved">
                <div className='column-header'>
                    <h1>Done</h1>
                    <h1 className='tasks-count'>{completedTasks.length}</h1>
                </div>
                <div className="tasks-container">
                    <div className="column">
                        {completedTasks.map((task: Task, index: number) => {
                            return (
                                <div key={index} className="task">
                                    <TaskItem
                                        task={task}
                                        setSelectedTaskTitle={setSelectedTaskTitle}
                                        setSelectedTaskDeadline={setSelectedTaskDeadline}
                                        setSelectedTaskDescription={setSelectedTaskDescription}
                                        toggleModal={toggleModal}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompletedTasks;

