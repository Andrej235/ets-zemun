dotnet clean
dotnet restore
dotnet build
dotnet build /t:GenerateOpenApiDocuments

node `pwd`/scripts/run-gen:api-typescript-map.cjs `pwd`/backend/api-docs/open-api-documentation.json `pwd`/website/api-dsl/api-map.ts `pwd`/admin/api-dsl/api-map.ts
