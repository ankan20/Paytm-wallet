import React, { useEffect, useState } from 'react';

const FlashMessage = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose();
        }, 2000); // Auto dismiss after 3 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    const handleClose = () => {
        setVisible(false);
        onClose();
    };
    let color = type ==="error" ? "red" : "green";

    return (
        <div
            className={`fixed top-0 left-0 right-0 p-4 bg-${color}-500 ${color=="red" && "bg-red-500"}  text-white z-50 ${
                visible ? 'translate-y-0' : '-translate-y-full'
            } transition-transform duration-500 ease-in-out`}
        >
            <div className="flex justify-between items-center">
                <div>{message}</div>
                <button onClick={handleClose} className="text-white focus:outline-none">
                    <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default FlashMessage;
