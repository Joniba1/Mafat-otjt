import useFormHandlers from "./useFormHandlers";


interface ModalContentProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    toggleModal: () => void;

    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setDate: React.Dispatch<React.SetStateAction<string>>;
    setTime: React.Dispatch<React.SetStateAction<string>>;

    title: string;
    description: string;
    date: string;
    time: string;
}

const ModalContent: React.FC<ModalContentProps> = ({ handleSubmit, toggleModal, setDate, setTime, setTitle, setDescription, title, description, date, time }) => {
    const {
        handleTitleChange,
        handleDescriptionChange,
        handleDateChange,
        handleTimeChange,
        handleKeyDown
    } = useFormHandlers({
        setTitle,
        setDescription,
        setDate,
        setTime
    });

    return (
        <>
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
                            value={description}
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

        </>
    );
}

export default ModalContent;