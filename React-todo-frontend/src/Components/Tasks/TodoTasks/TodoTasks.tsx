import { TasksProps } from '../../ComponentsManager/ComponentsManager.tsx';
import TaskItem from '../TaskItem.tsx';
import useTodoTasks from './UseTodoTasks.tsx';
import '../Tasks.scss';

const TodoTasks: React.FC<TasksProps> = ({
  searchedTasks,
  setSelectedTaskTitle,
  setSelectedTaskDeadline,
  setSelectedTaskDescription,
  toggleModal,
}) => {
  const { todoTasks } = useTodoTasks(searchedTasks);

  return (
    <>
      <div className="columns-container">
        <div className='tasks-header'>
          <h1>To Do</h1>
          <h1 className='tasks-count'>{todoTasks.length}</h1>
        </div>
        <div className="tasks-container">
          {[0, 1].map((column) => (
            <div key={column} className={`column column-${column}`}>
              {todoTasks.filter((_, index) => index % 2 === column).map((task, index) => {
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
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoTasks;