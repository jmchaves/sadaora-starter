"use client"

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getMyProfile } from '@/app/lib/profileApi'
import Image from 'next/image'

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null)
  const [email, setEmail] = useState<string>('')
  const [photoUrl, setPhotoUrl] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : ''
    const cachedPhoto = typeof window !== 'undefined' ? localStorage.getItem('photoUrl') : ''
    setToken(storedToken)
    if (cachedPhoto) setPhotoUrl(cachedPhoto)
  
    if (storedToken) {
      getMyProfile(storedToken)
        .then((user) => {
          setEmail(user.email)
          setPhotoUrl(user.profile?.photoUrl || '')
          localStorage.setItem('photoUrl', user.profile?.photoUrl || '')
        })
        .catch((e) => {
          if (e.message.includes("Invalid token")) {
            localStorage.removeItem('token')
            router.push('/login')
          }
        })
    }

    const updatePhoto = () => {
      const newPhoto = localStorage.getItem('photoUrl')
      if (newPhoto) setPhotoUrl(newPhoto)
    }
  
    window.addEventListener('photo-updated', updatePhoto) // custom same-tab event
    window.addEventListener('storage', updatePhoto)        // cross-tab support
  
    return () => {
      window.removeEventListener('photo-updated', updatePhoto)
      window.removeEventListener('storage', updatePhoto)
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="shrink-0">
              <Image width={100} height={100}
                alt="Sadaora"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <button onClick={() => router.push('/')} className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white cursor-pointer">Feed</button>
              </div>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:block">
            <div className="flex items-center">
              {token ? (
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="cursor-pointer relative flex rounded-full bg-gray-800 text-sm">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Image width={100} height={100}
                        alt="Profile"
                        src={photoUrl || '/default-avatar.png'}
                        className="size-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none"
                  >
                    <MenuItem>
                      <button onClick={() => router.push('/profile')} className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={handleSignOut}
                        className="block w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <button
                  onClick={() => router.push('/login')}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500 cursor-pointer"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          <div className="-mr-2 flex sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <DisclosureButton as="button" onClick={() => router.push('/')} className="block w-full text-left rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white">Feed</DisclosureButton>
        </div>
        {token ? (
          <div className="border-t border-gray-700 pt-4 pb-3">
            <div className="flex items-center px-5">
              <div className="shrink-0">
                <Image width={100} height={100}
                  alt="Profile"
                  src={photoUrl || '/default-avatar.png'}
                  className="size-10 rounded-full"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">{email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <DisclosureButton as="button" onClick={() => router.push('/profile')} className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Your Profile</DisclosureButton>
              <DisclosureButton
                as="button"
                onClick={handleSignOut}
                className="cursor-pointer block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                Sign out
              </DisclosureButton>
            </div>
          </div>
        ) : (
          <div className="border-t border-gray-700 pt-4 pb-3 px-2">
            <button
              onClick={() => router.push('/login')}
              className="cursor-pointer block w-full rounded-md bg-indigo-600 px-3 py-2 text-base font-medium text-white text-center hover:bg-indigo-500"
            >
              Login
            </button>
          </div>
        )}
      </DisclosurePanel>
    </Disclosure>
  )
}
