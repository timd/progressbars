# Railway Deployment Guide

This guide explains how to deploy the Life Progress app to Railway.

## Prerequisites

- Railway account ([railway.app](https://railway.app))
- GitHub repository connected to Railway

## Local Testing

Before deploying, test the production build locally:

```bash
# Build the client
cd client
npm install
npm run build

# Build the server
cd ../server
npm install
npm run build

# Start the production server
npm start
```

The app should be accessible at `http://localhost:3001`.

## Railway Deployment

### Initial Setup

1. **Create a new project** in Railway
2. **Connect your GitHub repository**
3. **Configure the service**:
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Root Directory: `/` (leave as default)

### Environment Variables

Railway will automatically set the `PORT` environment variable. No additional configuration is required.

### Health Check

The application exposes a health check endpoint at `/api/health` which Railway uses to monitor the service.

## Deployment Process

Railway will automatically:

1. Install dependencies for both client and server (via npm workspaces)
2. Build the React frontend (`client/npm run build`)
3. Compile the TypeScript server (`server/npm run build`)
4. Start the Express server which serves both the static frontend and API endpoints

## Verifying Deployment

After deployment:

1. Visit your Railway-provided URL
2. Verify the app loads and displays progress bars
3. Test theme toggle functionality
4. Confirm real-time progress updates work
5. Check the health endpoint: `https://your-app.railway.app/api/health`

## Troubleshooting

### Build Failures

- Check Railway build logs for errors
- Ensure all dependencies are listed in `package.json`
- Verify TypeScript compilation succeeds locally

### Runtime Issues

- Check Railway deployment logs
- Verify the `dist` directory exists after build
- Ensure the client `dist` folder is at `client/dist`

## Local Development

For local development, continue using the separate dev servers:

```bash
# Terminal 1: Frontend dev server
cd client && npm run dev

# Terminal 2: Backend dev server  
cd server && npm run dev
```

The client dev server (port 5173) will proxy API requests to the backend (port 3001).
