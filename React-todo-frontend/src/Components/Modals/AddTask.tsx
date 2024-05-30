//Libraries
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

//CSS
import './Modal.scss';
import { MdError } from 'react-icons/md';
import api from '../../api';

interface AddTaskProps {
  toggleModal: () => void;
  modal: boolean;
}

const AddTask: React.FC<AddTaskProps> = ({ toggleModal }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    setTitle(inputValue);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    setDescription(inputValue);
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setDate(inputValue);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setTime(inputValue);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const username = Cookies.get('username');
      let formattedDeadline = null;

      if (date && time) {
        formattedDeadline = `${date} ${time}`;
      } else if (date && !time) {
        formattedDeadline = `${date} 00:00:00`;
      }

      const response = await api.post('/tasks/add', {
        title: title,
        deadline: formattedDeadline,
        description: description,
        username: username
      });

      if (response.status === 201) {
        setTitle('');
        setDate('');
        setTime('');
        toggleModal();
        window.dispatchEvent(new Event('fetch-todo-tasks'));
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
        <div className='error-message error-message-right'>
          <MdError />
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="overlay" onClick={toggleModal}></div>
      <div className="modal">
        <div className='modal-title'>
          <p>Add Task</p>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="textarea-wrapper">
              <textarea
                className="title"
                placeholder="Task name"
                value={title}
                onChange={handleTitleChange}
                onKeyDown={handleKeyDown}
                maxLength={130}
                required
              />
              <textarea
                className="description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Task description"
                maxLength={300}
              />

              <div className="date-picker">
                <input type="date" className='date' value={date} onChange={handleDateChange} />
                <input type="time" className='time' value={time} onChange={handleTimeChange} />
              </div>

              <div className='modal-buttons'>
                <button className="submit-task">Add task</button>
                <button className="nevermind" onClick={toggleModal}>Nevermind</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};



export default AddTask;