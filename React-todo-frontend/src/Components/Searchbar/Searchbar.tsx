import { useEffect, useState } from "react";
import api from "../../api";
import './Searchbar.scss';
import { BiSearch } from "react-icons/bi";
import { Task } from "../../types";

interface SearchbarProps {
    setSearchedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Searchbar: React.FC<SearchbarProps> = ({ setSearchedTasks }) => {
    const [searchReq, setSearchReq] = useState<string>('');

    const handleSubmit = async () => {
        try {
            const response = await api.get('/tasks/search', {
                params: {
                    searchReq: searchReq
                }
            });
            if (searchReq === '') {
                window.dispatchEvent(new Event('fetch-todo-tasks'));
                window.dispatchEvent(new Event('fetch-completed-tasks'));
                window.dispatchEvent(new Event('fetch-irrelevant-tasks'));
                return;
            }

            setSearchedTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            handleSubmit();
        }, 200);
        
        return () => clearTimeout(debounce);
    }, [searchReq]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSearchReq(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
    };

    return (
        <div className="search-container">
            <BiSearch className="search-icon" />
            <textarea
                className="searchbar"
                placeholder='Search...'
                value={searchReq}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

export default Searchbar;
