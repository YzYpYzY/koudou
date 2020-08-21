FROM mcr.microsoft.com/dotnet/core/sdk:3.1 as build
WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT Release

COPY ./Koudou.Api/Koudou.Api.csproj ./Koudou.Api/
COPY ./Koudou.Data/Koudou.Data.csproj ./Koudou.Data/
COPY ./Koudou.Security/Koudou.Security.csproj ./Koudou.Security/
RUN dotnet restore ./Koudou.Api/Koudou.Api.csproj

COPY . ./
RUN dotnet publish Koudou.Api -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 as runtime
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "Koudou.Api.dll"]