import useEditSubmitForm from "./useEditSubmitForm";
import { useState } from "react";
import '../Modal.scss';
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import ModalContent from "../ModalContent";

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
    const [title, setTitle] = useState<string>(selectedTask.title);
    const [description, setDescription] = useState<string>(selectedTask.description);

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

    const { errorMsg, handleSubmit } = useEditSubmitForm(
        selectedTask.title,
        title,
        description,
        date,
        time,
        toggleModal
    );

    return (
        <>
            <ErrorMsg errorMsg={errorMsg} side={'right'} />

            <div className="overlay" onClick={toggleModal}></div>
            <div className="modal edit-modal">
                <div className='modal-title'>
                    <p>Edit Task</p>
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

export default EditTaskForm;