export async function safeFetch<T>(
  input: RequestInfo,
  init?: RequestInit,
  context?: string
): Promise<T> {
  try {
    const res = await fetch(input, init)
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(errorData?.error || `Request failed: ${res.status}`)
    }
    return res.json()
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    console.error(`${context || 'API'} error:`, err.message)
    throw err
  }
}
