#!/bin/sh

echo "Waiting for database connection..."
until nc -z -v -w30 database 3306; do
  echo "Waiting for MySQL..."
  sleep 5
done

echo "Database is up. Running migrations and seeders..."

# Rum generate
npx prisma generate

# Run migrations
npx prisma migrate dev

# Run seeders (if you have seed scripts)
npx prisma db seed

echo "Starting application..."
exec npm run start:dev
