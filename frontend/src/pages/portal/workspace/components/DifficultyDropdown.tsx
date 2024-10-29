import React from "react"

type DifficultyDropdownProps = {
  selectedDifficulty: string
  onDifficultyChange: (difficulty: string) => void
}

const DifficultyDropdown: React.FC<DifficultyDropdownProps> = ({
  selectedDifficulty,
  onDifficultyChange,
}) => {
  return (
    <select
      value={selectedDifficulty}
      onChange={(e) => onDifficultyChange(e.target.value)}
      className="border px-2 py-2 rounded"
    >
      <option value="">All</option>
      <option value="easy">Easy</option>
      <option value="moderate">Moderate</option>
      <option value="hard">Hard</option>
    </select>
  )
}

export default DifficultyDropdown
