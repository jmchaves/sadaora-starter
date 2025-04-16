import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  
  const existing = await prisma.user.findFirst({ where: { email: 'john@example.com' } })
  if (existing) {
    console.log('Users already seeded, skipping.')
    return
  }

  const SALT_ROUNDS = 10
  const plainPassword = 'password123'
  const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS)

  const randonPassword = faker.internet.password()
  const randormHashedPassword = await bcrypt.hash(randonPassword, SALT_ROUNDS)

  const avatarUrls = [
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1546456073-6712f79251bb?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
  ]

  // Create 2 fixed users
  await prisma.user.create({
    data: {
      email: 'john@example.com',
      password: hashedPassword,
      profile: {
        create: {
          name: 'John Vincent',
          headline: 'Software Engineer',
          bio: 'Passionate about code and coffee.',
          photoUrl: avatarUrls[0],
          interests: ['React', 'Chess', 'Backend'],
        },
      },
    },
  })

  await prisma.user.create({
    data: {
      email: 'luisa@example.com',
      password: hashedPassword,
      profile: {
        create: {
          name: 'Luisa Olea',
          headline: 'System Admin',
          bio: 'Manages the platform.',
          photoUrl: avatarUrls[1],
          interests: ['Security', 'DevOps', 'Cloud'],
        },
      },
    },
  })

  // Generate 18 random users
  for (let i = 0; i < 18; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: randormHashedPassword,
        profile: {
          create: {
            name: faker.person.fullName(),
            headline: faker.person.jobTitle(),
            bio: faker.lorem.sentences(2),
            photoUrl: avatarUrls[(i + 2) % avatarUrls.length],
            interests: faker.helpers.arrayElements(
              ['React', 'Chess', 'Health', 'Travel', 'Coffee', 'Node.js', 'UI Design', 'Angular', 'Blockchain'],
              3
            ),
          },
        },
      },
    })
  }

  console.log('Seed complete')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
