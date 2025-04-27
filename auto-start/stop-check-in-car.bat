@echo off
:: Para backend via pm2
pm2 stop check-in-car-api
pm2 delete check-in-car-api

:: Mata qualquer node.exe na porta 3002 (frontend Vite)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3002') do taskkill /PID %%a /F

exit
