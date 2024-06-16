import { Task } from '../../../types';
import { TasksProps } from '../../ComponentsManager/ComponentsManager';
import useIrrelevantTasks from './UseIrrelevantTasks';
import '../ResolvedTasks.scss';
import TaskItem from '../TaskItem';

const IrrelevantTasks: React.FC<TasksProps> = ({
    searchedTasks,
    setSelectedTaskTitle,
    setSelectedTaskDeadline,
    setSelectedTaskDescription,
    toggleModal,
}) => {
    const { irrelevantTasks } = useIrrelevantTasks(searchedTasks);

    return (
        <>
            <div className="columns-container columns-container-resolved columns-container-irrelevant">
                <div className='column-header'>
                    <h1>Irrelevant</h1>
                    <h1 className='tasks-count'>{irrelevantTasks.length}</h1>
                </div>
                <div className="tasks-container">
                    <div className="column">
                        {irrelevantTasks.map((task: Task, index: number) => {
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
            </div >
        </>
    );
};

export default IrrelevantTasks;