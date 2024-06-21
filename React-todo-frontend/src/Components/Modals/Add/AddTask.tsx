import React, { useState } from 'react';
import '../Modal.scss';
import useAddSubmitForm from './useAddSubmitForm';
import ErrorMsg from '../../ErrorMsg/ErrorMsg';
import ModalContent from '../ModalContent';

interface AddTaskProps {
  toggleModal: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ toggleModal }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const { handleSubmit, errorMsg } = useAddSubmitForm(title, description, date, time, toggleModal);

  return (
    <>
      <ErrorMsg errorMsg={errorMsg} side="right" />

      <div className="overlay" onClick={toggleModal}></div>
      <div className="modal">
        <div className="modal-title">
          <p>Add Task</p>
        </div>
        <ModalContent
          handleSubmit={handleSubmit}
          toggleModal={toggleModal}
          setTitle={setTitle}
          setDescription={setDescription}
          setDate={setDate}
          setTime={setTime}
          title={title}
          description={description}
          date={date}
          time={time}
        />
      </div>
    </>
  );
};

export default AddTask;