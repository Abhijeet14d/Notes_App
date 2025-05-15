import React, { useEffect } from 'react';
import { LuCheck } from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';

const Toast = ({ isShown, message, type, onClose }) => {
    useEffect(() => {
        if (isShown) {
            const timer = setTimeout(() => {
                onClose(); // Call the onClose function after 3 seconds
            }, 3000);
            return () => {
                clearTimeout(timer); // Clear the timer if the component unmounts
            };
        }
    }, [isShown, onClose]);

    return (
        <div
            className={`fixed top-20 right-6 transition-opacity duration-300 ${
                isShown ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div
                className={`min-w-[200px] max-w-sm bg-white border shadow-lg rounded-md relative overflow-hidden ${
                    type === 'delete' ? 'border-red-500' : 'border-green-500'
                }`}
            >
                <div
                    className={`absolute left-0 top-0 h-full w-1 ${
                        type === 'delete' ? 'bg-red-500' : 'bg-green-500'
                    }`}
                ></div>
                <div className="flex items-center gap-3 py-3 px-4">
                    <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                            type === 'delete' ? 'bg-red-100' : 'bg-green-100'
                        }`}
                    >
                        {type === 'delete' ? (
                            <MdDeleteOutline className="text-xl text-red-500" />
                        ) : (
                            <LuCheck className="text-xl text-green-500" />
                        )}
                    </div>
                    <p className="text-sm text-gray-800">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Toast;