# Set environment variables for SQLite
$env:DATABASE_CLIENT = "sqlite"
$env:DATABASE_FILENAME = ".tmp/data.db"

# Start Strapi
npm run develop 