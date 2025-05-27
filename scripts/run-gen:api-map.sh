dotnet clean
dotnet restore
dotnet build
dotnet build /t:GenerateOpenApiDocuments

node `pwd`/scripts/run-gen:api-typescript-map.cjs `pwd`/apps/asp-backend/api-docs/open-api-documentation.json `pwd`/apps/website/api-dsl/api-map.ts `pwd`/apps/admin/api-dsl/api-map.ts
