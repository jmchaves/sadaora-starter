'use client'

import { useEffect, useState } from 'react'
import Tags from './Tags'
import { getMyProfile, updateMyProfile } from '@/app/lib/profileApi'
import Loading from './Loading'
import Alert from './Alert'
import { useRouter } from 'next/navigation'
import PhotoUpload from './PhotoUpload'
import Image from 'next/image'
import { profileSchema } from '@/app/validators/profile'

export default function EditProfileForm() {
  const router = useRouter()
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : ''

  const [form, setForm] = useState({
    name: '',
    headline: '',
    bio: '',
    photoUrl: '',
    interests: [] as string[],
  })
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  useEffect(() => {

    if (!token) {
      router.push('/login')
    }

    getMyProfile(token)
      .then((user) => {
        const profile = user.profile || {}
        setForm({
          name: profile.name || '',
          headline: profile.headline || '',
          bio: profile.bio || '',
          photoUrl: profile.photoUrl || '',
          interests: profile.interests || [],
        })
        setEmail(user.email || '')
      })
      .catch((err) => console.error('Failed to load profile:', err.message))
  }, [])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleInterestsChange(tags: string[]) {
    setForm((prev) => ({ ...prev, interests: tags }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await submitForm()
  }
  
  async function photoUploaded(url: string) {
    const updated = { ...form, photoUrl: url }
    setForm(updated)
    localStorage.setItem('photoUrl', url);
    window.dispatchEvent(new Event('photo-updated'))
    await submitForm(updated)
  }

  async function submitForm(data = form) {
    const token = localStorage.getItem('token') || ''
    setErrors({})
  
    const result = profileSchema.safeParse(data)
  
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors(fieldErrors)
      return
    }
    setLoading(true)
    try {
      await updateMyProfile(result.data, token)
      setShowSuccessMsg(true)
      setTimeout(() => setShowSuccessMsg(false), 3000)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      if (err.message.includes('Invalid token')) {
        localStorage.removeItem('token')
        router.push('/login')
      }
    } finally {
      setLoading(false)
    }
  }  

  return  (
    <form onSubmit={handleSubmit} className="mx-auto min-[470px]:w-[400px]">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8">
        <div className="col-span-full flex items-center gap-x-8">
          {
            form.photoUrl &&
            <Image width={150} height={150}
              alt=""
              src={form.photoUrl}
              className="w-24 h-24 rounded-lg object-cover bg-gray-200"
            />
          }
          <PhotoUpload token={token} onUpload={(url) => photoUploaded(url)}></PhotoUpload>
        </div>

        <div className="col-span-full">
          <span className="font-bold">{email}</span>
        </div>

        <div className="col-span-full">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            max={100}
            placeholder="Type a name"
            value={form.name}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name[0]}</p>
          )}
        </div>

        <div className="col-span-full">
          <label htmlFor="headline" className="block text-sm font-medium text-gray-700">
            Headline
          </label>
          <input
            id="headline"
            name="headline"
            type="text"
            max={100}
            required
            placeholder="Type a headline"
            value={form.headline}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.headline && (
            <p className="mt-1 text-sm text-red-600">{errors.headline[0]}</p>
          )}
        </div>

        <div className="col-span-full">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            maxLength={1000}
            placeholder="Type anything about you..."
            value={form.bio}
            onChange={handleChange}
            rows={4}
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.bio && (
            <p className="mt-1 text-sm text-red-600">{errors.bio[0]}</p>
          )}
        </div>

        <div className="col-span-full">
          <Tags initialTags={form.interests} onChange={handleInterestsChange} />
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className="min-w-[65px] cursor-pointer rounded-md bg-indigo-600 px-4 mb-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {loading ? <Loading size={18} color="text-white" /> : 'Save'}
        </button>

        {
          showSuccessMsg && <Alert msg='Successfully saved!'></Alert>
        }
        
      </div>
    </form>
  )
}
