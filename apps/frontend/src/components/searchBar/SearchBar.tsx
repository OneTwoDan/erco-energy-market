import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full mb-6">
      <Input
        type="text"
        placeholder="Search by seller name..."
        value={input}
        onChange={handleChange}
        className="pl-10 border-[#a7da01] focus:ring-[#a7da01] rounded-3xl bg-white"
      />
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a7da01] h-5 w-5 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
};

export default SearchBar;