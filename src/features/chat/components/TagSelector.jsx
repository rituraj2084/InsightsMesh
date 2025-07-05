import React from 'react';
import { useDispatch } from 'react-redux';
import { setTags } from '../chatSlice';

const availableTags = ['Support', 'Sales', 'Internal', 'Marketing', 'HR'];

const TagSelector = ({ sessionId, selectedTags = [] }) => {
  const dispatch = useDispatch();

  const toggleTag = (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    dispatch(setTags({ sessionId, tags: updatedTags }));
  };

  return (
    <div className="flex flex-wrap gap-2 my-4">
      {availableTags.map((tag) => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={`px-3 py-1 rounded-full text-sm border cursor-pointer
            ${
              selectedTags.includes(tag)
                ? 'bg-blue-600 text-white'
                : 'bg-primary border-custom text-secondary'
            }
          `}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagSelector;
