import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import api from '../../../api';


const useAddSubmitForm = (
  title: string,
  description: string,
  date: string,
  time: string,
  toggleModal: () => void) => {
  const [errorMsg, seterrorMsg] = useState<string>('');

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
        toggleModal();
        window.dispatchEvent(new Event('fetch-todo-tasks'));
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

  return { handleSubmit, errorMsg };
};

export default useAddSubmitForm;