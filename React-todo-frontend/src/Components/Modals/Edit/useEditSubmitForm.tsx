import axios from "axios";
import { useState } from "react";
import api from "../../../api";

const useEditSubmitForm = (
    selectedTaskTitle: string,
    newTitle: string,
    newDescription: string,
    date: string,
    time: string,
    toggleModal: () => void
) => {
    const [errorMsg, seterrorMsg] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            let formattedDeadline = null;

            if (date && time) {
                formattedDeadline = `${date} ${time}`;
            } else if (date && !time) {
                formattedDeadline = `${date} 00:00:00`;
            }

            const response = await api.put('/tasks/edit', {
                title: selectedTaskTitle,
                updatedTask: {
                    title: newTitle,
                    deadline: formattedDeadline,
                    description: newDescription
                }
            });

            if (response.status === 200) {
                toggleModal();
                window.dispatchEvent(new Event('fetch-todo-tasks'));
                window.dispatchEvent(new Event('fetch-irrelevant-tasks'));
                window.dispatchEvent(new Event('fetch-completed-tasks'));
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { errorCode } = error.response.data;
                if (errorCode === 'DUPLICATE_TASKS') {
                    seterrorMsg('Task title already exists!');
                }
            }
        }
    };

    return { errorMsg, handleSubmit };
};

export default useEditSubmitForm;