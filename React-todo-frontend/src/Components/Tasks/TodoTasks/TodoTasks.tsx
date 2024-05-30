import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';


// Scripts
import { setCompleted, setRelevance } from '../../../setState.ts';
import { Task } from '../../../types.ts';
import { deleteTask } from '../../../deleteTask.ts';
import api from '../../../api.ts';
import { TasksProps } from '../../ComponentsManager/ComponentsManager.tsx';

// React icons
import { TbNotesOff } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrCompliance } from 'react-icons/gr';

// CSS
import '../Tasks.scss';


const TodoTasks: React.FC<TasksProps> = ({
  searchedTasks,
  setSelectedTaskTitle,
  setSelectedTaskDeadline,
  setSelectedTaskDescription,
  toggleModal,
}) => {
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);

  const fetchTodoTasks = async () => {
    try {
      const response = await api.get('/tasks');
      const tasks = response.data;

      if (tasks) {
        setTodoTasks(tasks.filter((task: Task) => !task.completed && task.relevance));
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTodoTasks();
    const fetchTodoTasksListener = () => fetchTodoTasks();
    window.addEventListener('fetch-todo-tasks', fetchTodoTasksListener);

    return () => {
      window.removeEventListener('fetch-todo-tasks', fetchTodoTasksListener);
    };
  }, []);

  useEffect(() => {
    setTodoTasks(searchedTasks.filter(task => !task.completed && task.relevance));
  }, [searchedTasks]);

  //Handles
  const handleEdit = (title: string, description: string, deadline: string) => {
    toggleModal();
    setSelectedTaskTitle(title);
    setSelectedTaskDescription(description);
    setSelectedTaskDeadline(deadline);
  };

  const handleDelete = async (title: string, deadline: string) => {
    await deleteTask(title);
    fetchTodoTasks();
    if (deadline) {
      window.dispatchEvent(new Event('update-graph'));
    }
  };

  const handleSetRelevance = async (title: string, deadline: string) => {
    await setRelevance(title);
    fetchTodoTasks();
    window.dispatchEvent(new Event('fetch-irrelevant-tasks'));
    if (deadline) {
      window.dispatchEvent(new Event('update-graph'));
    }
  };

  const handleSetCompleted = async (title: string, deadline: string) => {
    await setCompleted(title);
    fetchTodoTasks();
    window.dispatchEvent(new Event('fetch-completed-tasks'));
    if (deadline) {
      window.dispatchEvent(new Event('update-graph'));
    }
  };

  const didDeadlinePass = (deadline: string) => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate < currentDate;
  };

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
                const deadlinePassed = task.deadline && didDeadlinePass(task.deadline);
                return (
                  <div key={index} className="task">
                    {/* <div className="task-content"> */}
                      <p className="task-title" onClick={() => handleEdit(task.title, task.description, task.deadline)}>{task.title}</p>
                      <p className="task-description">{task.description}</p>

                      <div className='task-utilities'>
                        {task.deadline && (
                          <>
                            <div className='due_text-container'>
                              <p className={`due-text ${deadlinePassed ? 'overdue' : ''}`}>Due: {new Date(task.deadline).toLocaleDateString()}</p>
                            </div>
                          </>

                        )}
                        <div className='buttons'>
                          <p className="setRelevanceButton" data-tooltip-id="tooltipTodo" data-tooltip-content="Irrelevant" onClick={() => handleSetRelevance(task.title, task.deadline)}><TbNotesOff /></p>
                          <p className="setCompletedButton" data-tooltip-id="tooltipTodo" data-tooltip-content="Complete!" onClick={() => handleSetCompleted(task.title, task.deadline)}><GrCompliance /></p>
                          <p className="deleteButton" data-tooltip-id="tooltipTodo" data-tooltip-content="Delete" onClick={() => handleDelete(task.title, task.deadline)}><FaRegTrashAlt /></p>
                        </div>

                      </div>


                    </div>

                  // </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <Tooltip id="tooltipTodo" place="bottom" style={{ fontFamily: "Roboto" }}/>
    </>
  );



};

export default TodoTasks;