# Fullstack Project

![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.4-hotpink)
![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1.9-brown)
![.NET Core](https://img.shields.io/badge/.NET%20Core-v.7-purple)
![EF Core](https://img.shields.io/badge/EF%20Core-v.7-cyan)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v.14-drakblue)

* Frontend: SASS, TypeScript, React, Redux Toolkit
* Backend: ASP .NET Core, Entity Framework Core, PostgreSQL

You can follow the same topics as your backend project. It is also possible to select a different topic

## Setting Up for folder `Backend`

1. Create `appsettings.json` (and `appsettings.*.json` if needed) file in the root of folder `Backend`. You can refer to the content of file `example.json`
2. Install all the needed packages:
    * AutoMapper
    * AutoMapper.Extensions.Microsoft.DependencyInjection
    * Microsoft.EntityFrameworkCore
    * Microsoft.EntityFrameworkCore.Design
    * Npgsql.EntityFrameworkCore.PostgreSQL
    \
   *You can add more packages when necessary.*
3. You can change .NET Core version to be compatible with your local machine

## Requirements

Below are the steps that you need to finish in order to finish this module

1. Your full stack project should have one git repo to manage both frontend and backend. The shared .git in the root directory is used to push commits to the remote repo. In case you need to deploy frontend and backend to different server, you can inittiate another `.git` folder in each repository. Syntax: `cd frontend` -> `git init` (similar to backend folder). Remember to add `.gitignore` for each folder when you intiate `git` repo.
2. `frontend` folder is for the react frontend. Start with `backend` first before moving on to `frontend`.
3. `backend` should have proper file structure, naming convention, and comply with Rest API.
4. Each topic would have different features. However, the main routes should have CRUD operations, authentication and authorization.
5. You need to deploy the fullstack project, rewrite `README.md` as instructed earlier in the course.
