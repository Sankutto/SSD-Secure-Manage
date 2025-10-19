# SecureManage - Automated Development Setup

This project provides two ways to automate the development and deployment process for the SecureManage microservices application:

1. **Docker Compose** - Simple local development (Recommended for beginners)
2. **Skaffold** - Advanced Kubernetes development with hot reloading

## 🚀 Quick Start Options

### Option 1: Docker Compose (Recommended)

**Easiest way to get started:**

```cmd
# Double-click this file or run:
start-docker-compose.bat
```

This will automatically:
- Build all Docker images
- Start all services with proper networking
- Set up MongoDB with persistent storage
- Expose all services on localhost

**Access URLs:**
- Frontend: http://localhost:3000
- API Gateway: http://localhost:8800
- MongoDB: localhost:27017

### Option 2: Skaffold (Advanced)

For Kubernetes development with hot reloading:

```cmd
# Double-click this file or run:
start-skaffold.bat
```

**Stop Services:**
```cmd
# To stop all services:
stop-services.bat
```

## 📋 Prerequisites

### For Docker Compose:
- **Docker Desktop** - Download from [docker.com](https://www.docker.com/products/docker-desktop)

### For Skaffold:
- **Docker Desktop** with Kubernetes enabled
- **kubectl** - Kubernetes command-line tool  
- **Skaffold** - Download from [skaffold.dev](https://skaffold.dev/docs/install/)

## 🏗️ Project Architecture

This is a microservices-based MERN stack application with:

- **Frontend (React)** - Port 3000
- **API Gateway** - Port 8800 
- **User Management Service** - Port 3001
- **Course Management Service** - Port 3002
- **Payment Management Service** - Port 3003
- **Enrollment Management Service** - Port 3004
- **MongoDB Database** - Port 27017

## File Structure

```
SecureManage/
├── skaffold.yaml                    # Main Skaffold configuration
├── k8s/                            # Kubernetes manifests
│   ├── client.yaml
│   ├── api-gateway.yaml
│   ├── user-management.yaml
│   ├── course-management.yaml
│   ├── payment-management.yaml
│   ├── enrollment-management.yaml
│   └── mongodb.yaml
├── client/
│   └── Dockerfile
├── api-gateway/
│   └── Dockerfile
├── UserManagementService/
│   └── Dockerfile
├── CourseManagementService/
│   └── Dockerfile
├── PaymentManagementService/
│   └── Dockerfile
└── EnrollmentManagementService/
    └── Dockerfile
```

## Environment Variables

Make sure to set up the following environment variables for production:

### User Management Service
- `MONGODB_URL`
- `JWT_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### Course Management Service
- `MONGODB_URL`
- `JWT_SECRET`
- `FIREBASE_SERVICE_ACCOUNT_KEY`

### Payment Management Service
- `MONGODB_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`

### Enrollment Management Service
- `MONGODB_URL`
- `JWT_SECRET`

You can create a `.env` file in each service directory or set them in the Kubernetes manifests.

## Skaffold Commands

### Basic Commands
```bash
# Start development with file watching
skaffold dev

# Deploy once without watching
skaffold run

# Delete deployed resources
skaffold delete

# Build images only
skaffold build

# Get status of deployed resources
kubectl get pods
kubectl get services
```

### Debugging Commands
```bash
# View logs from all services
skaffold dev --tail

# View logs from specific service
kubectl logs -f deployment/user-management-deployment

# Get service information
kubectl describe service api-gateway-service

# Access pod shell
kubectl exec -it <pod-name> -- /bin/sh
```

## Profiles

The Skaffold configuration includes two profiles:

### Development Profile (default)
- Local build without pushing to registry
- File sync for hot reloading
- Port forwarding enabled

### Production Profile
```bash
skaffold run -p production
```
- Pushes images to registry
- Uses git commit for tagging
- Production-ready configuration

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   netstat -ano | findstr :3000
   
   # Kill the process
   taskkill /PID <process_id> /F
   ```

2. **Docker build fails**
   ```bash
   # Clean up Docker
   docker system prune -a
   
   # Restart Docker Desktop
   ```

3. **Kubernetes pods not starting**
   ```bash
   # Check pod status
   kubectl get pods
   
   # Check pod logs
   kubectl logs <pod-name>
   
   # Describe pod for events
   kubectl describe pod <pod-name>
   ```

4. **File sync not working**
   - Make sure your files are saved
   - Check if the file paths in `skaffold.yaml` are correct
   - Restart Skaffold with `Ctrl+C` and `skaffold dev`

### Reset Everything
```bash
# Stop Skaffold
Ctrl+C

# Delete all resources
skaffold delete

# Clean up Docker
docker system prune -a

# Restart
skaffold dev
```

## Hot Reloading

Skaffold is configured to sync file changes automatically:

- **React files** (`src/**/*.js`, `src/**/*.jsx`, `src/**/*.css`) → Frontend container
- **Server files** (`src/**/*.js`) → Backend service containers
- **Gateway files** (`*.js`) → API Gateway container

Changes will be reflected automatically without rebuilding the entire container.

## Production Deployment

For production deployment to a cloud Kubernetes cluster:

1. Update the image registry in `skaffold.yaml`
2. Configure your Kubernetes context to point to your production cluster
3. Set up proper environment variables and secrets
4. Run: `skaffold run -p production`

## Support

If you encounter any issues:

1. Check the Skaffold logs for errors
2. Verify all prerequisites are installed
3. Ensure Docker Desktop and Kubernetes are running
4. Check that all required ports are available

For more information, visit the [Skaffold documentation](https://skaffold.dev/docs/).