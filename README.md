# ETS Zemun

## Overview

**ETS Zemun** is a website tailored for a Serbian highschool named **Elektrotehnička Škola Zemun**. It was originally created by 2 students and was intended to be a simple react website showcasing the school, it's facilities, and all of what it had to offer to it's students but it quickly grew into something much larger.

Now, the project consists of 3 services:

- **The main website** serving the original purpose and dynamically showcasing information about the school in multiple languages
- **An admin panel** acting like a CMS that allows for easy management of the website's data
- **A dedicated backend API** that allows for easy communication between the frontend and the database

## Website

### Features

- **Basic Information at a Glance**  
  Potential Students and their Parents can get a quick overview of the school by just visiting the website's frontpage. By displaying key information about the school, such as it's mission, and statistics, we hoped to provide a clear and concise overview of what the school has to offer in order to build trust and help potential students make an informed decision.

- **Increased Transparency**  
  Everyone, including potential and current students, parents, teachers and staff, can access information about exactly who is teaching at the school, what their qualifications are, what subjects are taught to each class, all awards students have won, and much more. This information shows that the school has nothing to hide and is committed to transparency and growth.

- **News**  
  The website features a news section that displays the latest news, and updates from the school in form of blog posts. These posts can be read by everyone and created by the school's staff through the admin panel, helping keep those interested in the school's activities updated.

### Technologies Used

- [Next.js](https://nextjs.org/) for building the user interface, server-side rendering, and so much more.
- [TypeScript](https://www.typescriptlang.org/) for type-safe development.
- [SCSS](https://sass-lang.com/) for styling.

### Implementation Details

The website was originally created using React, with react router, and scss, but after the initial deployment, I ([Andrej235](https://github.com/andrej235)) decided to migrate it to Next.js for better performance and ISR (Incremental Static Regeneration).
ISR allows the server to generate and cache pages at build time, which in turn allows for faster initial load times and better user experience, but unlike SSG (Static Site Generation) ISR is regenerates these pages every 24 hours. This allows for a good balance between performance and being up-to-date.

### Contributors

- [Andrej235](https://github.com/andrej235)
- [andjelic-a](https://github.com/andjelic-a)

## Admin Panel

### Features

- **CRUD Operations**  
  The admin panel contains a user interface that allows for easy management of the website's data, such as adding, editing, and deleting news posts, teachers, awards, and more.

- **Authentication and Authorization**  
  To get access to the admin panel, users must first register and verify their email address, after which they are instructed to request access from an administrator. After the administrator approves the request, the user is granted a role of a moderator, which allows them to modify all content on the main website, but not user's permissions.

### Technologies Used

- [Next.js](https://nextjs.org/) for building the user interface, server-side rendering, and so much more.
- [TypeScript](https://www.typescriptlang.org/) for type-safe development.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
- [Shadcn UI](https://ui.shadcn.com/) for UI components and faster development.
- [Jodit](https://xdsoft.net/jodit/) for WYSIWYG editor.

### Implementation Details

Unlike the main website, here the user experience is less important than always having the most up-to-date data, so the admin panel does not leverage ISR and instead only relies on SSR (Server Side Rendering). The next's middleware is used to restrict access to the admin panel only to users with the role of a moderator or an administrator.

### Contributors

- [Andrej235](https://github.com/andrej235)

## Backend

### Features

- **CRUD Operations**
  The API allows for easy management of the website's data, such as adding, editing, and deleting news posts, teachers, awards, and more.

- **Authentication and Authorization**  
  ASP.NET's identity simplifies authentication and authorization and allows for easy management of user roles and permissions.

- **Rate Limiting**
  It also uses ASP.NET's rate limiting middleware to limit the number of requests that can be made to the API per minute in order to prevent abuse.

### Technologies Used

- [ASP.NET](https://dotnet.microsoft.com/) for everything.
- [C#](https://docs.microsoft.com/en-us/dotnet/csharp/) also for everything as ASP.NET is a framework for C#.

### Implementation Details

The API is a simple and clean implementation of a CRUD API using the controller architecture. It mostly abids by SOLID principles and should be easy to read and understand.

### Contributors

- [Andrej235](https://github.com/andrej235)

## License

This project is licensed under the **MIT License**.

## Contributors

The **ETS Zemun** project is developed and maintained by:

- [Andrej235](https://github.com/andrej235)
- [andjelic-a](https://github.com/andjelic-a)
