# VS Code Workspace Configuration

## Recommended Extensions

```json
{
  "recommendations": [
    "ms-vscode.vscode-json",
    "ms-vscode.vscode-typescript-next",
    "golang.go",
    "ms-azuretools.vscode-docker",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-js-profile-flame"
  ]
}
```

## Workspace Settings

```json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "files.exclude": {
    "**/node_modules": true,
    "**/.git": true,
    "**/dist": true
  }
}
```

## Environment Templates

### .env.example for EthrPLATFORM

```bash
# Database Configuration
POSTGRES_ZITADEL_PASSWORD=your-secure-password
POSTGRES_NETBIRD_PASSWORD=your-secure-password
POSTGRES_NEXTCLOUD_PASSWORD=your-secure-password

# Nextcloud Configuration
NEXTCLOUD_ADMIN_PASSWORD=your-admin-password

# Domain Configuration
DOMAIN=localhost
PROTOCOL=http

# SSL Configuration (for production)
SSL_CERT_PATH=/path/to/cert.pem
SSL_KEY_PATH=/path/to/key.pem
```

### .env.example for EthrSITE

```bash
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/ethrsite

# PayloadCMS Configuration
PAYLOAD_SECRET=your-payload-secret

# Keycloak Configuration
KEYCLOAK_URL=http://localhost:8080
KEYCLOAK_REALM=your-realm
KEYCLOAK_CLIENT_ID=ethrsite-frontend
KEYCLOAK_CLIENT_SECRET=your-client-secret

# Development Configuration
NODE_ENV=development
```

## Health Check Scripts

### health-check.sh

```bash
#!/bin/bash

echo "🔍 Checking Ethr Platform Services Health..."

# Check ZITADEL
echo "Checking ZITADEL..."
if curl -s http://localhost:8080/healthz > /dev/null; then
    echo "✅ ZITADEL is healthy"
else
    echo "❌ ZITADEL is not responding"
fi

# Check NetBird
echo "Checking NetBird..."
if curl -s http://localhost:8081/health > /dev/null; then
    echo "✅ NetBird is healthy"
else
    echo "❌ NetBird is not responding"
fi

# Check Nextcloud
echo "Checking Nextcloud..."
if curl -s http://localhost:8082/status.php > /dev/null; then
    echo "✅ Nextcloud is healthy"
else
    echo "❌ Nextcloud is not responding"
fi

echo "Health check complete."
```

### docker-status.sh

```bash
#!/bin/bash

echo "🐳 Docker Services Status..."

cd ~/ethr-platform/ethr-platform
docker-compose ps

echo ""
echo "📊 Resource Usage:"
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

## Development Workflow Scripts

### start-dev.sh

```bash
#!/bin/bash

echo "🚀 Starting Ethr Platform Development Environment..."

# Start platform services
echo "Starting platform services..."
cd ~/ethr-platform/ethr-platform
docker-compose up -d

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 10

# Start EthrSITE
echo "Starting EthrSITE..."
cd ~/ethr-platform/ethrsite
npm run dev &

# Start EthrAUTH
echo "Starting EthrAUTH..."
cd ~/ethr-platform/ethrauth
docker-compose up -d &

echo "✅ Development environment started!"
echo "🌐 Service URLs:"
echo "  ZITADEL Admin: http://localhost:8080"
echo "  NetBird Management: http://localhost:8081"
echo "  Nextcloud: http://localhost:8082"
echo "  EthrSITE: http://localhost:3000"
```

### stop-dev.sh

```bash
#!/bin/bash

echo "🛑 Stopping Ethr Platform Development Environment..."

# Stop EthrSITE
echo "Stopping EthrSITE..."
pkill -f "npm run dev"

# Stop platform services
echo "Stopping platform services..."
cd ~/ethr-platform/ethr-platform
docker-compose down

# Stop EthrAUTH
echo "Stopping EthrAUTH..."
cd ~/ethr-platform/ethrauth
docker-compose down

echo "✅ Development environment stopped."
```

## Quick Setup Commands

```bash
# Make scripts executable
chmod +x health-check.sh
chmod +x docker-status.sh
chmod +x start-dev.sh
chmod +x stop-dev.sh

# Quick health check
./health-check.sh

# Start development environment
./start-dev.sh

# Check Docker status
./docker-status.sh

# Stop development environment
./stop-dev.sh
```
