# CSIT BMC Web - Contribution Guide

## Overview

CSIT BMC Web is a Next.js-based web application for managing and displaying notices for the CSIT department. This guide will help you understand how to contribute to the project.

## Tech Stack

- **Frontend**: Next.js 14, TailwindCSS, Shadcn UI
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js
- **Image Storage**: Cloudinary
- **Testing**: Jest and React Testing Library

## Project Structure

```plaintext
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── notices/           # Notice-related pages and components
│   └── auth/              # Authentication pages
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
├── prisma/               # Database schema and migrations
└── types/                # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB database
- Cloudinary account

### Local Development Setup

1. Clone the repository
   ```bash
   git clone https://github.com/sujansince2003/csitabmcweb.git
   cd csitabmcweb
   ```

2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and add the following environment variables:
   ```plaintext
   MONGODB_URI=your_mongodb_uri
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   NEXTAUTH_URL=http://localhost:3000
   ```
4. Run the development server
   ``` 
    npm run dev
    ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Contributing to the project

- Fork the repository
- Follow the existing project structure
- Use meaningful component and variable names
- Add comments for complex logic
- Include proper TypeScript types
- Write tests for new features
- Make sure the code passes the linting and testing checks
- Create a pull request with a detailed description of the changes

### Development Workflow

1. Create a new branch
   ```bash
   git checkout -b feature/new-feature
   ```
2. Make changes to the code
3. Commit the changes
   ```bash
   git add .
   git commit -m "Add new feature"
   ```
4. Push the changes to your fork
   ```bash
   git push origin feature/new-feature
   ```
5. Create a pull request from your fork to the main repository
6. Wait for the maintainers to review your changes

### Need Help?

- Create an issue in the repository
- Check existing documentation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.