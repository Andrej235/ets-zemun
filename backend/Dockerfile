FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
RUN mkdir -p /app/keys && \
    chmod 777 /app/keys
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["backend/EtsZemun.csproj", "backend/"]
RUN dotnet restore "backend/EtsZemun.csproj"
COPY . .
WORKDIR "/src/backend"
RUN dotnet build "EtsZemun.csproj" -c "$configuration" -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "EtsZemun.csproj" -c "$configuration" -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EtsZemun.dll"]
