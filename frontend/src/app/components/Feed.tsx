"use client"

import { useEffect, useState } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { fetchProfiles, followProfile, unfollowProfile } from '@/app/lib/profileApi'
import ProfileCard from './ProfileCard'
import type { Profile } from '@/app/types/profile'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Feed() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [error, setError] = useState<string | null>(null)
  const [showWarning, setShowWarning] = useState<boolean>(false)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : ''
  const router = useRouter();


  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    fetchProfiles(token)
    .then((data) => {
      setProfiles(data)
    })
    /* eslint-disable @typescript-eslint/no-explicit-any */
      .catch((err: any) => setError(err.message))

      if (!token) {
        setShowWarning(true)
      }
  }, [token])

  const handleFollow = async (id: number, isFollowing: boolean = false) => {
    try {
      await sleep(1000);
      if (isFollowing) {
        await unfollowProfile(id, token)
      } else {
        await followProfile(id, token)
      }
      // Update local state
      setProfiles((prev) =>
        prev.map((user) =>
          user.id === id
            ? { ...user, isFollowedByMe: !isFollowing }
            : user
        )
      )
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      console.log(`${err.message}`);
      console.log("here");
      if (err.message.includes("Invalid token")) {
        localStorage.removeItem('token')
        router.push('/login')
      }
    }
  }

  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-4 lg:px-8">
      {showWarning && (
        <div className="rounded-md bg-yellow-50 p-4 mb-4">
          <div className="flex">
            <div className="shrink-0">
              <ExclamationTriangleIcon aria-hidden="true" className="size-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p> <Link href="/login" className='underline'>Login</Link> to enjoy more features.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-2 text-red-700">
          {error}
        </div>
      )}


      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.map((user) => (
          <ProfileCard
            key={user.id}
            name={user.profile?.name || user.email}
            email={user.email}
            headline={user.profile?.headline}
            bio={user.profile?.bio}
            photoUrl={user.profile?.photoUrl}
            interests={user.profile?.interests}
            isFollowing={user.isFollowedByMe}
            onFollow={() => handleFollow(user.id, user.isFollowedByMe)}
          />
        ))}
      </div>
    </div>
  )
}
