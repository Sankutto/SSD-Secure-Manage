@echo off
echo ========================================
echo   SecureManage - Skaffold Setup
echo ========================================
echo.

:: Check if Docker is running
docker version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not running. Please start Docker Desktop.
    pause
    exit /b 1
)

:: Check if kubectl is available
kubectl version --client >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: kubectl is not installed or not in PATH.
    echo Please install kubectl and ensure it's in your PATH.
    pause
    exit /b 1
)

:: Check if Skaffold is available
skaffold version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Skaffold is not installed or not in PATH.
    echo Please install Skaffold from https://skaffold.dev/docs/install/
    pause
    exit /b 1
)

echo All prerequisites are available! ✓
echo.
echo Current Kubernetes context:
kubectl config current-context
echo.
echo WARNING: You are connected to a remote cluster.
echo For local development, consider switching to docker-desktop context if available.
echo.
echo Starting SecureManage with Skaffold...
echo.
echo You can access the application at:
echo - Frontend: http://localhost:3000
echo - API Gateway: http://localhost:8800
echo - MongoDB: localhost:27017
echo.
echo Press Ctrl+C to stop the application.
echo.

skaffold dev -f skaffold-local.yaml