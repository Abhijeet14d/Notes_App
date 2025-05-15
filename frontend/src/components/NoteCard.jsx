import moment from 'moment';
import React from 'react';
import { MdOutlinePushPin } from 'react-icons/md';
import { MdCreate, MdDelete } from 'react-icons/md';

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onDelete,
  onEdit,
  onPinNote,
}) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-base font-semibold text-gray-800">{title}</h5>
          <span className="text-xs text-gray-500">{moment(date).format('DD MM YYY')}</span>
        </div>
        <MdOutlinePushPin
          className={`cursor-pointer text-lg ${
            isPinned ? 'text-yellow-500' : 'text-gray-300'
          }`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-sm text-gray-600 mt-3">
        {content?.slice(0, 60)}{content?.length > 60 && '...'}
      </p>
      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-gray-500">{tags.map((item)=> `#${item}`)}</div>
        <div className="flex items-center gap-3">
          <MdCreate
            className="cursor-pointer text-gray-500 hover:text-green-500 transition-colors duration-150"
            onClick={onEdit}
          />
          <MdDelete
            className="cursor-pointer text-gray-500 hover:text-red-500 transition-colors duration-150"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;