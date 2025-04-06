# Blue Spring Dashboard Deployment Guide

This guide explains how to deploy the Blue Spring Dashboard application with Supabase integration.

## Prerequisites

- Node.js v18+ (v20 recommended)
- Docker and Docker Compose (for containerized deployment)
- A Supabase project

## Environment Variables

The following environment variables are required for the application to connect to Supabase:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous (public) API key
- `NEXT_PUBLIC_APP_URL`: The URL where your app is deployed (e.g., https://dashboard.example.com)

## Deployment Options

### Option 1: Standard Node.js Deployment

1. Clone the repository
2. Create a `.env.local` file with the required environment variables
3. Install dependencies:
   ```
   npm install
   ```
4. Build the application:
   ```
   npm run build
   ```
5. Start the production server:
   ```
   npm start
   ```

### Option 2: Docker Deployment

1. Clone the repository
2. Create a `.env` file in the root directory with the required environment variables
3. Build and start the Docker container:
   ```
   docker-compose up -d
   ```

### Option 3: Vercel or Netlify Deployment

1. Connect your Git repository to Vercel/Netlify
2. Configure the environment variables in the Vercel/Netlify dashboard
3. Deploy the application

## Configuring Supabase Auth

For proper authentication functionality, you need to configure your Supabase project:

1. In your Supabase dashboard, go to Authentication → URL Configuration
2. Add your site URL to the Site URL field (e.g., https://dashboard.example.com)
3. Add the following redirect URLs:
   - https://dashboard.example.com/login
   - https://dashboard.example.com/signup
   - https://dashboard.example.com/update-password
   - https://dashboard.example.com/profile

## Testing Your Deployment

After deployment, you should:

1. Test user registration
2. Test user login
3. Test the password reset flow
4. Verify that authenticated pages are accessible
5. Verify that unauthenticated users are redirected to login

## Troubleshooting

If you encounter issues with authentication:

1. Check that your environment variables are correctly set
2. Verify that the redirect URLs are properly configured in Supabase
3. Check browser console for any errors
4. Make sure you're using the latest version of the Supabase JS client

## Security Considerations

- Never expose your service role key; only use the anon key for client-side code
- Ensure row-level security (RLS) is properly configured in your Supabase tables
- Use HTTPS in production environments
- Keep your dependencies updated regularly 