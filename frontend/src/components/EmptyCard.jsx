
import React from 'react';
import { NotebookPen } from 'lucide-react';

const EmptyCard = () => {
    return (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 transition-all hover:border-blue-400 hover:bg-blue-50">
            <div className="mb-4 p-3 bg-gray-100 rounded-full">
                <NotebookPen size={32} className="text-gray-400" />
            </div>
            <p className="text-lg font-medium text-gray-700 mb-2">No notes yet</p>
            <p className="text-gray-500 text-center max-w-xs">Create your first note by clicking the "New Note" button above</p>
        </div>
    );
};

export default EmptyCard;