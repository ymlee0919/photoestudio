# Photograph Study - Administration and Client Application

## Overview

This project is a full-stack application for a photography business, featuring:
- **Administration Panel**: A React-based interface for managing accounts, services, offers, and gallery images
- **Client Landing Page**: A Twig-based frontend that displays the photography services to potential clients
- **Backend API**: A NestJS application serving both frontends with Prisma ORM connecting to PostgreSQL

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)


## Features

### Administration Panel
- User authentication and authorization
- CRUD operations for:
  - User accounts
  - Photography services
  - Special offers
  - Gallery images
- Responsive design with TailwindCSS and DaisyUI
- Form handling with react-hook-form
- Client-side routing with react-router-dom

### Client Landing Page
- Display of photography services and offers
- Image gallery showcase
- Contact forms
- Responsive design

### Backend API
- RESTful endpoints for all frontend needs
- Database management with Prisma
- Authentication system
- Image handling with Supabase storage

## Technologies

### Frontend
- **Administration**: React, react-hook-form, react-router-dom, TailwindCSS, DaisyUI
- **Client**: Twig template engine

### Backend
- NestJS framework
- Prisma ORM
- JWT authentication

### Infrastructure
- **Database**: PostgreSQL hosted on Aiven
- **Image Storage**: Supabase Storage
- **Application Hosting**: Render

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Aiven PostgreSQL database connection
- Supabase account for image storage

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ymlee0919/photoestudio.git
   cd photograph-study
   ```

2. Install dependencies for each part:
   ```bash
   # Backend
   cd api
   npm install
   
   # Administration panel
   cd ../admin
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both `api` and `admin` directories
   - Fill in the required values

## Configuration

### Backend
Configure your environment variables in `api/.env`:
```
# Database (Aiven)
#Database
DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?sslmode=require"

# Uploads config
UPLOAD_ROOT="./public/"
UPLOAD_GALLERY_LOCATION="images/gallery/"
UPLOAD_SERVICES_LOCATION="images/services/"
MAX_FILE_SIZE="5"

# Supabase Storage
ACCESS_KEY="SUPABASE_ACCESS_KEY"
SECRET_KEY="SUPABASE_SECRET_KEY"
S3_ENPOINT="https://supabase_public_endpoint.supabase.co/storage/v1/s3"
S3_REGION="S3_REGION"
BUCKET_NAME="BUCKET_NAME"

#JwebToken
JWT_SECRET="your_jwt_secret_key"

#Allowed origins for cors
ALLOWED_ORIGINS="List of allowed origins"
```

### Administration Panel
Configure API base URL in `admin/.env`:
```
# API EndPoint
VITE_API_URL="http://your_endpoint/api"
```

## Development

### Running the backend
```bash
cd api
npm run start:dev
```

### Running the admin panel
```bash
cd admin
npm start
```

### Database migrations
After making changes to the Prisma schema:
```bash
cd server
npx prisma migrate dev --name your_migration_name
```

## Deployment

The application is deployed on Render with the following infrastructure:

1. **Database**: PostgreSQL hosted on Aiven with SSL connection
2. **Image Storage**: Supabase Storage for all gallery images
3. **Application Hosting**: Render with automatic deployments from main branch

Deployment process includes:
- Setting up environment variables
- Configuring build commands:
  - Backend: `npm install && npm run build`
  - Admin: `npm install && npm run build`
- Connecting to Aiven database
- Configuring Supabase storage integration

---

For any questions or support, please contact the project maintainer.