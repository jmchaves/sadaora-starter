#!/bin/sh

echo " Waiting for database to be ready..."
until npx prisma db push; do
  echo " Database not ready, retrying in 3s..."
  sleep 3
done

echo " Database is ready. Running Prisma generate, seed, and starting server..."
npx prisma generate
npm run seed
npm run dev
