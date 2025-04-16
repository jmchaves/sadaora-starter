export async function uploadPhoto(file: File, token: string): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Upload failed')
  }

  return data.url
}
