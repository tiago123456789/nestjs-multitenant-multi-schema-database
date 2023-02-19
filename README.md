About the project
==================

The project is study project for understand how to implement multi-tenant(multi schema) application in Nest.js. How to implement multi-tenant to both public and private areas.

Instructions to run backend:
==============================

- Clone repository
- Access directory **backend**
- Execute command **npm install** 
- Create **.env** file based **.env.example**
- Execute command **npm run start:dev** to run backend
- Execute command **npm run build && node ./dist/main.command.js tenant-migrations --schema schema_name_here --type RUN** to run migrations for specific schema.
- Execute command **npm run build && node ./dist/main.command.js tenant-migrations --schema schema_name_here --type DOWN** to rollback migrations for specific schema.
- Execute command **npm run build && node ./dist/main.command.js tenant-all-migrations --type RUN** to run migrations for all schemas.
- Execute command **npm run build && node ./dist/main.command.js tenant-all-migrations --type DOWN** to rollback migrations for all schemas.


Instructions to run private-frontend:
=========================================

- Clone repository
- Access directory **private-frontend**
- Execute command **npm install** 
- Create **.env** file based **.env.example**
- Execute command **npm run start** to run the application


Instructions to run public-frontend:
=========================================

- Clone repository
- Access directory **public-frontend**
- Execute command **npm install** 
- Create **.env** file based **.env.example**
- Execute command **npm run dev** to run the application


