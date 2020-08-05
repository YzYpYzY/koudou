# Create docker network web
- npm run docker:create-network

# Start Db in docker
- npm run db:init
- npm run db:update
- npm run db:seed

# Remove Db
- npm run db:clean

# Start Api in docker
- npm run api:start

# Rebuild Api in docker
- npm run api:rebuild

# Stop Api in docker
- npm run api:stop