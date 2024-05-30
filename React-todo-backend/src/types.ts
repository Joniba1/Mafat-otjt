export type User = {
    username: string;
    password: string;
};

export type Task = {
    username: string;
    title: string;
    completed: boolean;
    relevance: boolean;
    deadline: string;
    description: string;
};

export type Day = {
    day: number;
    tasksInDayCount: number;
}