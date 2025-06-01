# ETS Zemun

## Overview

**ETS Zemun** is a website tailored for a Serbian highschool named **Elektrotehnička Škola Zemun**. It was created by 2 students and was originally intended to be a simple react website showcasing the school, its facilities, and all of what it had to offer to its students but has evolved into a full-featured ecosystem including a CMS-like admin panel and a secure backend API.

Now, the project consists of 3 services:

- **Main website** - A dynamic and multilingual showcase of the school.
- **Admin panel** - A CMS-style interface for managing website content.
- **Backend API** - A secure, structured API that handles communication between frontend and database.

## Website

### Features

- **Basic Information at a Glance**  
  Potential Students and their Parents can get a quick overview of the school by just visiting the website's frontpage. By displaying key information about the school, such as its mission, and statistics, we hoped to provide a clear and concise overview of what the school has to offer in order to build trust and help potential students make an informed decision.

- **Increased Transparency**  
  Everyone, including potential and current students, parents, teachers and staff, can access information about exactly who is teaching at the school, what their qualifications are, what subjects are taught to each class, all awards students have won, and much more. This information shows that the school has nothing to hide and is committed to transparency and growth.

- **News**  
  The website features a news section that displays the latest news, and updates from the school in form of blog posts. These posts can be read by everyone and created by the school's staff through the admin panel, helping keep those interested in the school's activities updated.

### Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)

### Implementation Details

Originally built with React, React Router, and SCSS, the site was later migrated to Next.js by [Andrej235](https://github.com/andrej235) to enable **Incremental Static Regeneration (ISR)** for improved performance and SEO. Pages are regenerated every 24 hours to balance caching and real-time updates.

### Contributors

- [Andrej235](https://github.com/andrej235)
- [andjelic-a](https://github.com/andjelic-a)

## Admin Panel

### Features

- **Full CMS Interface**  
  Create, edit, and delete teachers, awards, news posts, and more through a secure and easy-to-use interface.

- **Authentication and Authorization**  
  Users must verify their email addresses before requesting access. Admins can grant the "moderator" role to verified users, allowing them to manage content without administrative privileges.

### Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Jodit Editor](https://xdsoft.net/jodit/)

### Implementation Details

Since content must always be up to date, the admin panel relies exclusively on **Server-Side Rendering (SSR)**. Middleware is used to restrict access based on user roles.

### Security Measures:

- Only verified email accounts can be granted access.
- Login tokens are stored as HttpOnly, Secure cookies, scoped to the .ets-zemun.edu.rs domain.

### Contributors

- [Andrej235](https://github.com/andrej235)

## Backend

### Features

- **Full CRUD API**  
  Handles all operations for the website content and user data.

- **Authentication and Authorization**  
  Built using ASP.NET Identity, with role-based access control.

- **Rate Limiting**
  Uses ASP.NET’s built-in middleware to prevent abuse by limiting request frequency.

### Technologies Used

- [ASP.NET](https://dotnet.microsoft.com/)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
- [C#](https://docs.microsoft.com/en-us/dotnet/csharp/)
- [PostgreSQL](https://www.postgresql.org/)

### Implementation Details

Follows a clean **controller-based architecture** aligned with **SOLID principles** for maintainability and readability.

### Contributors

- [Andrej235](https://github.com/andrej235)

---

## Project Structure

```
.
├── apps
│   ├── admin/          # Admin panel (Next.js + Tailwind)
│   ├── website/        # Public website (Next.js + SCSS)
│   └── asp-backend/    # ASP.NET Core API
└── top-level files
```

## Local Setup

> Docker setup is not available - setup must be done manually.

### Pre-requisites

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/)
- [Next.js](https://nextjs.org/)
- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/)
- [PostgreSQL](https://www.postgresql.org/) (locally or externally hosted)

### Required Files

> Example files are included in the repository.

- `apps/website/.env`
- `apps/admin/.env`
- `apps/asp-backend/secrets.json`

### Installation

- Clone the repository: `git clone https://github.com/andrej235/ets-zemun.git`
- Navigate to the project directory: `cd ets-zemun`
- Install dependencies for website and admin panel: `npm run deps`

### Running the Project

- Start the backend: `cd apps/asp-backend && dotnet run EtsZemun.csproj`
- Start the website: `cd apps/website && npm run dev`
- Start the admin panel: `cd apps/admin && npm run dev`

## Deployment

All services are deployed and live:

- **Website**: [ets-zemun.edu.rs](https://www.ets-zemun.edu.rs/en)
- **Admin Panel**: [admin.ets-zemun.edu.rs](https://admin.ets-zemun.edu.rs)
- **API**: [api.ets-zemun.edu.rs](https://api.ets-zemun.edu.rs)

Deployment services:

- **Vercel** - Used for deploying both frontend services with CI/CD.
- **Render** - Used for Dockerized deployment of the backend API.

## License

This project is licensed under the **MIT License**.

## Contributors

The **ETS Zemun** project is developed and maintained by:

- [Andrej235](https://github.com/andrej235)
- [andjelic-a](https://github.com/andjelic-a)
