import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Image from 'next/image'

interface ProfileCardProps {
  name: string
  email?: string
  headline?: string
  bio?: string
  photoUrl?: string
  interests?: string[]
  onFollow: () => Promise<void>
  isFollowing?: boolean
}

export default function ProfileCard({
  name,
  email,
  headline,
  bio,
  photoUrl,
  interests = [],
  onFollow,
  isFollowing = false,
}: ProfileCardProps) {
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  const handleClick = async () => {
    setLoading(true)
    try {
      await onFollow()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative bg-white shadow-md rounded-lg p-4 w-full max-w-md mx-auto">
      {token && (
        <button
          onClick={handleClick}
          disabled={loading}
          className={`hidden min-w-[68px] cursor-pointer sm:flex justify-center items-center absolute top-4 right-4 rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm transition-colors ${isFollowing ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
        >
          {loading ? (
            <Loading size={16} color="text-white" />
          ) : (
            <span>{isFollowing ? 'Following' : 'Follow'}</span>
          )}
        </button>
      )}

      <div className="flex items-center space-x-4">
        <Image width={100} height={100}
          src={photoUrl || '/default-avatar.png'}
          alt={`${name}'s avatar`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          {headline && <p className="text-sm text-gray-600">{headline}</p>}
          {token && (
            <button
              onClick={handleClick}
              disabled={loading}
              className={`sm:hidden min-w-[68px] cursor-pointer flex justify-center items-center mt-2 rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm transition-colors ${isFollowing ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
            >
              {loading ? (
                <Loading size={16} color="text-white" />
              ) : (
                <span>{isFollowing ? 'Following' : 'Follow'}</span>
              )}
            </button>
          )}
        </div>
      </div>

      {bio && <p className="mt-4 text-gray-700">{bio}</p>}

      {interests.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {interests.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {email && (
        <div className="mt-4">
          <a
            href={`mailto:${email}`}
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            Send Email
          </a>
        </div>
      )}
    </div>
  )
}
