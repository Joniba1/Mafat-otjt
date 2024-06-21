interface FormHandlersProps {
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setDate: React.Dispatch<React.SetStateAction<string>>;
    setTime: React.Dispatch<React.SetStateAction<string>>;
}

const useFormHandlers = ({ setTitle, setDescription, setDate, setTime }: FormHandlersProps) => {
    const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTime(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    return {
        handleTitleChange,
        handleDescriptionChange,
        handleDateChange,
        handleTimeChange,
        handleKeyDown
    };
};

export default useFormHandlers;
