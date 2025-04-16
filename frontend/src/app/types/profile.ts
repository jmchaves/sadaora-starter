export interface Profile {
  id: number
  email: string,
  isFollowedByMe?:boolean
  profile: {
    name?: string
    headline?: string
    bio?: string
    photoUrl?: string
    interests?: string[]
  }
}
