//Libraries
import { useState } from 'react';
import Cookies from 'js-cookie';

//Components
import AddTaskForm from '../Modals/AddTask';

//CSS
import './Sidebar.scss';

//React icons
import { RiAddLargeLine, RiLogoutBoxLine } from 'react-icons/ri';


const Sidebar = () => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleLogout = () => {
        Cookies.remove('jwt'); // Remove the token cookie
        window.dispatchEvent(new Event('logged-out')); // Dispatch a custom event if needed
    };

    return (
        <>
            {modal && <AddTaskForm toggleModal={toggleModal} modal={modal} />}

            <div className="sidebar">
                <p className="react-icon logout-button" onClick={handleLogout}><RiLogoutBoxLine /></p>
                <p className="react-icon add-task-button" onClick={toggleModal}><RiAddLargeLine /></p>
            </div>
        </>
    )
}

export default Sidebar;
