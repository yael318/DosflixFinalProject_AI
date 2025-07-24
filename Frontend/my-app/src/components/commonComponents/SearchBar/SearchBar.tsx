import React, { ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.scss';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-wrapper">
      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="חפש..."
          onChange={handleChange}
          className="search-input"
        />
      </div>
    </div>
  );
}
