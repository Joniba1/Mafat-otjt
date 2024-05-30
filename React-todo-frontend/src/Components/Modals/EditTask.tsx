
import React, { useState } from 'react';
import './Modal.scss';
import api from '../../api';
import axios from 'axios';
import { MdError } from 'react-icons/md';

interface EditTaskFormProps {
    toggleModal: () => void;
    modal: boolean;
    selectedTask: {
        title: string;
        deadline: string;
        description: string;
    };
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ toggleModal, selectedTask }) => {

    const [newTitle, setNewTitle] = useState<string>(selectedTask.title);
    const [newDescription, setNewDescription] = useState<string>(selectedTask.description);
    const [errorMessage, setErrorMessage] = useState<string>('');


    const [date, setDate] = useState<string>(() => {
        if (selectedTask.deadline) {
            const localDate = new Date(selectedTask.deadline);
            localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
            return localDate.toISOString().split('T')[0];
        } else {
            return '';
        }
    });

    const [time, setTime] = useState<string>(() => {
        if (selectedTask.deadline) {
            const localDate = new Date(selectedTask.deadline);
            localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
            return localDate.toISOString().split('T')[1].slice(0, 5);
        } else {
            return '00:00:00';
        }
    });

    const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewTitle(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewDescription(event.target.value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTime(event.target.value);
    };


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
                title: selectedTask.title,
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
                if (formattedDeadline) {
                    window.dispatchEvent(new Event('update-graph'));
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { errorCode } = error.response.data;
                if (errorCode === 'DUPLICATE_TASKS') {
                    setErrorMessage('Task title already exists!');
                }
                // else if (errorCode === 'EMPTY_TITLE') {
                //   setErrorMessage('Tasks title can`t be empty');
                // }
            }
        }
    };
    



    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    return (
        <>
            {errorMessage && (
                <div className='error-message-right'>
                    <MdError />
                    <p>{errorMessage}</p>
                </div>
            )}
            <div className="overlay" onClick={toggleModal}></div>
            <div className="modal edit-modal">
                <div className='modal-title'>
                    <p>Edit Task</p>
                </div>
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="textarea-wrapper">
                            <textarea
                                className="title"
                                placeholder="Task name"
                                value={newTitle}
                                onChange={handleTitleChange}
                                onKeyDown={handleKeyDown}
                                maxLength={130}
                                required
                            />
                            <textarea
                                value={newDescription}
                                onChange={handleDescriptionChange}
                                className="description"
                                placeholder="Task description"
                                maxLength={300}
                            />
                            <div className="date-picker">
                                <input type="date" className='date' value={date} onChange={handleDateChange} />
                                <input type="time" className='time' value={time} onChange={handleTimeChange} />
                            </div>
                            <div className='modal-buttons'>
                                <button type="submit" className="submit-task">Save</button>
                                <button type="button" className="nevermind" onClick={toggleModal}>Nevermind</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditTaskForm;
