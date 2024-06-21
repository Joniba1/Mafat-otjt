import { useState, useEffect } from 'react';
import './TasksGraph.scss';
import { Task, Day } from '../../types';
import useTodoTasks from '../Tasks/TodoTasks/UseTodoTasks';
import Days from './Days/Days';

const getCurrentMonth = () => new Date().toISOString().slice(0, 7);

const daysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
};

const noSearchTasks: Task[] = [];

const TasksGraph = () => {
    const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonth());
    const { todoTasks } = useTodoTasks(noSearchTasks);
    const [totalTasksCount, setTotalTasksCount] = useState<number>(todoTasks.length);
    const [days, setDays] = useState<Day[]>([]);
    const [year, month] = selectedMonth.split('-').map(Number);

    const updateGraph = (year: number, month: number) => {
        const totalDays = daysInMonth(year, month);
        const data: Day[] = [];

        for (let day = 1; day <= totalDays; day++) {
            const tasksInDayCount = todoTasks.filter(task => {
                const taskDate = new Date(task.deadline);
                return (
                    taskDate.getFullYear() === year &&
                    taskDate.getMonth() + 1 === month &&
                    taskDate.getDate() === day
                );
            }).length;

            data.push({ day: day, tasksInDayCount: tasksInDayCount });
        }
        setDays(data);
    };

    useEffect(() => {
        setTotalTasksCount(todoTasks.filter(task => task.deadline).length);
    }, [todoTasks]);

    useEffect(() => {
        updateGraph(year, month);
    }, [selectedMonth, todoTasks]);

    return (
        <>
            <div className="graph-container">
                <div className='icon-labels'>
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    />
                </div>

                <div className="graph">
                    <div className='days-container'>

                        <hr />
                        <hr className='gridline-1' />
                        <hr className='gridline-2' />

                        <Days days={days} totalTasksCount={totalTasksCount} selectedMonth={selectedMonth} todoTasks={todoTasks} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TasksGraph;