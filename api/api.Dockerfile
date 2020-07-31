FROM mcr.microsoft.com/dotnet/core/sdk:3.1 as build
WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT Development
COPY . ./
RUN dotnet publish Koudou.Api -c Debug -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 as runtime
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "Koudou.Api.dll"]