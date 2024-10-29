import React from "react"
import { Input } from "@/components/ui/input.tsx"
import { FaSearch } from "react-icons/fa"

type SearchBarProps = {
  searchTerm: string
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
        <FaSearch />
      </span>
      <Input
        placeholder="Search by name"
        value={searchTerm}
        onChange={onSearchChange}
        className="pl-10" // Add left padding to make room for the icon
      />
    </div>
  )
}

export default SearchBar
