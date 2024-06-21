import React from 'react';
import { MdError } from 'react-icons/md';
import './ErrorMsg.scss';

interface ErrorMsgProps {
    errorMsg: string;
    side: 'right' | 'left';
}

const ErrorMsg: React.FC<ErrorMsgProps> = ({ errorMsg, side }) => {
    const cssClass = `error-message error-message-${side}`;

    return (
        <>
            {errorMsg && (
                <div className={cssClass}>
                    <MdError />
                    <p>{errorMsg}</p>
                </div>
            )}
        </>
    );
};

export default ErrorMsg;