@echo off
echo ========================================
echo   SecureManage - Docker Compose Setup
echo ========================================
echo.

:: Check if Docker is running
docker version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not running. Please start Docker Desktop.
    pause
    exit /b 1
)

echo Docker is running ✓
echo.
echo Starting SecureManage with Docker Compose...
echo This will build and start all services:
echo - MongoDB Database (Port 27017)
echo - User Management Service (Port 3001)
echo - Course Management Service (Port 3002)
echo - Payment Management Service (Port 3003)
echo - Enrollment Management Service (Port 3004)
echo - API Gateway (Port 8800)
echo - React Frontend (Port 3000)
echo.
echo Building and starting services...
echo.

docker-compose up --build

echo.
echo Services stopped. Run this script again to restart.
pause