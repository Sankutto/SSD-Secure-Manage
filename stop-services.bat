@echo off
echo ========================================
echo   SecureManage - Stop All Services
echo ========================================
echo.

echo Stopping Docker Compose services...
docker-compose down

echo.
echo Stopping any running containers...
docker stop securemanage-mongodb securemanage-user-service securemanage-course-service securemanage-payment-service securemanage-enrollment-service securemanage-api-gateway securemanage-client 2>nul

echo.
echo Cleaning up unused containers and networks...
docker system prune -f

echo.
echo All services stopped and cleaned up! ✓
pause