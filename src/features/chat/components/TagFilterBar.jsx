import React from 'react';

const defaultTags = ['Support', 'Sales', 'Internal', 'Marketing', 'HR'];

const TagFilterBar = ({ onFilter }) => {
  const [activeTag, setActiveTag] = React.useState('');

  const toggleFilter = (tag) => {
    const newTag = tag === activeTag ? '' : tag;
    setActiveTag(newTag);
    onFilter(newTag);
  };

  return (
    <div className="flex gap-2 mb-6 flex-wrap justify-center">
      {defaultTags.map((tag) => (
        <button
          key={tag}
          onClick={() => toggleFilter(tag)}
          className={`px-3 py-1 rounded-full text-sm border cursor-pointer
            ${
              activeTag === tag
                ? 'bg-blue-600 text-white'
                : 'bg-primary text-primary border-gray-400 text-gray-600 '
            }
          `}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilterBar;
