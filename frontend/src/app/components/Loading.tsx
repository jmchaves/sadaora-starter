"use client"

import React from 'react'

interface LoadingProps {
  display?: boolean
  size?: number
  color?: string
}

export default function Loading({ display = true, size = 24, color = 'text-white-600' }: LoadingProps) {
  if (!display) return null

  return (
    <div>
      <svg
        className={`animate-spin ${color}`}
        style={{ width: size, height: size }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
    </div>
  )
}
