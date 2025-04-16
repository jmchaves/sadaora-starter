import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'

interface TagsProps {
  initialTags?: string[]
  onChange?: (tags: string[]) => void
}

export default function Tags({ initialTags = [], onChange }: TagsProps) {
  const [tags, setTags] = useState<string[]>(initialTags)
  const [inputValue, setInputValue] = useState<string>('')

  // Keep tags in sync if parent updates initialTags
  useEffect(() => {
    setTags(initialTags)
  }, [initialTags])

  const updateTags = (newTags: string[]) => {
    setTags(newTags)
    onChange?.(newTags)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
      e.preventDefault()
      updateTags([...tags, inputValue.trim()])
      setInputValue('')
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      updateTags(tags.slice(0, -1))
    }
  }

  const removeTag = (index: number) => {
    updateTags(tags.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full max-w-xl">
      <label className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
      <div className="flex flex-wrap items-center gap-2 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:ring-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center gap-1 rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-sm font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-indigo-400 hover:text-indigo-600 cursor-pointer"
              aria-label="Remove tag"
            >
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="flex-grow border-0 focus:ring-0 text-sm text-gray-800 bg-transparent min-w-[120px] outline-none"
          placeholder="Add a tag"
          max={50}
          maxLength={50}
        />
      </div>
      <p className="mt-1 text-xs text-gray-500">Press Enter or comma to add. Backspace to remove last.</p>
    </div>
  )
}
