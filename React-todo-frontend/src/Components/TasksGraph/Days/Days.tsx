import React from 'react';
import { Task, Day } from '../../../types';
import DayBar from './DayItem';
import './Days.scss';

interface DaysProps {
    days: Day[];
    totalTasksCount: number;
    selectedMonth: string;
    todoTasks: Task[];
}

const Days: React.FC<DaysProps> = ({ days, totalTasksCount, selectedMonth, todoTasks }) => {

    return (
        <>
            {days.map(({ day, tasksInDayCount }) => {

                todoTasks.find((task) => {
                    const taskDate = new Date(task.deadline);
                    return (
                        taskDate.getFullYear() === new Date(selectedMonth).getFullYear() &&
                        taskDate.getMonth() + 1 === new Date(selectedMonth).getMonth() + 1 &&
                        taskDate.getDate() === day
                    );
                });

                const maxHeight = 4.5;
                const barHeight = tasksInDayCount > 0 ? `${(tasksInDayCount / totalTasksCount) * maxHeight}em` : '0%';

                return (
                    <DayBar key={day} day={day} barHeight={barHeight} />
                );
            })}
        </>
    );
};

export default Days;