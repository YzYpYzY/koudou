# Usefull command

docker-compose -f db.docker-compose.yml up -d
docker-compose -f db.docker-compose.yml down
docker volume prune

dotnet restore

from Data
dotnet ef --startup-project ../Koudou.Api migrations add "Init" -c KoudouContext
dotnet ef --startup-project ../Koudou.Api database update
