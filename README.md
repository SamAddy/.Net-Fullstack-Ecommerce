# Fullstack Project

![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.4-hotpink)
![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1.9-brown)
![.NET Core](https://img.shields.io/badge/.NET%20Core-v.7-purple)
![EF Core](https://img.shields.io/badge/EF%20Core-v.7-cyan)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v.14-drakblue)

This project involves creating a Fullstack project with React and Redux on the frontend and ASP.NET Core 7 on the backend. The goal is to provide a seamless experience for users, along with robust management system for administrators.

- Frontend: SASS, TypeScript, React, Redux Toolkit
- Backend: ASP .NET Core, Entity Framework Core, PostgreSQL

You can follow the same topics as your backend project or choose the alternative one, between E-commerce and Library. You can reuse the previous frontend project, with necessary modification, or make a new layout to fit your backend server.

## Table of Contents

1. [Features](#features)
   - [Mandatory features](#mandatory-features)
   - [Extra features](#extra-features)
2. [Requirements](#requirements)
3. [Getting Started](#getting-started)
4. [Testing](#testing)

## Features

### Mandatory features

#### User Functionalities

1. User Management: Users should be able to register for an account and log in. Users cannot register themselves as admin.
2. Browse Products: Users should be able to view all available products and single product, search and sort products.
3. Add to Cart: Users should be able to add products to a shopping cart, and manage cart.
5. Checkout: Users should be able to place order.

#### Admin Functionalities

1. User Management: Admins should be able to view and delete users.
2. Product Management: Admins should be able to view, edit, delete and add new products.
3. Order Management: Admins should be able to view all orders

### Extra features

#### User Functionalities

1. User Management: Users should be able to view and edit only certain properties in their accounts. They also can unregister their own accounts.
2. Authentication and account registration with Google Oauth.
3. Order Management: Users should be able to view their order history, track the status of their orders, and potentially cancel orders within a certain timeframe.

#### Admin Functionalities

1. User Management: Admins should be able to edit users' role and create new users.
2. Order Management: Admins should be able to update order status, view order details, handle returns/refunds, and cancel orders.

And any other extra features that you want to implement ...

## Requirements

1. Apply CLEAN architecture in your backend. In README file, explain the architecture of your project as well.
2. Implement Error Handling Middleware: This will ensure any exceptions thrown in your application are handled appropriately and helpful error messages are returned.
3. Document with Swagger: Make sure to annotate your API endpoints and generate a Swagger UI for easier testing and documentation.
4. Project should have proper file structure, naming convention, and comply with Rest API.
5. `README` file should sufficiently describe the project, as well as the deployment.

## Getting Started

1. Your full stack project should have one git repo to manage both frontend and backend. The shared .git in the root directory is used to push commits to the remote repo. In case you need to deploy frontend and backend to different server, you can inittiate another `.git` folder in each repository. Syntax: `cd frontend` -> `git init` (similar to backend folder). Remember to add `.gitignore` for each folder when you intiate `git` repo.
2. `frontend` folder is for the react frontend. Start with `backend` first before moving to `frontend`.
3. In the `backend`, here is the recommended order:

   - Plan Your Database Schema before start coding

   - Set Up the Project Structure

   - Build the models

   - Create the Repositories

   - Build the Services

   - Set Up Authentication & Authorization

   - Build the Controllers

   - Implement Error Handling Middleware

Testing should be done along the development circle, early and regularly.

## Testing

Unit testing, and optionally integration testing, must be included for both frontend and backend code. Aim for high test coverage and ensure all major functionalities are covered.
