# Development Scripts and Automation

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

## Database Management Scripts

### db-migrate.sh

```bash
#!/bin/bash

echo "🗄️ Running EthrSITE Database Migrations..."

cd ~/ethr-platform/ethrsite

# Create migration if needed
echo "Creating migration..."
npm run migrate:create

# Run migrations
echo "Running migrations..."
npm run migrate:up

echo "✅ Database migrations complete."
```

### db-reset.sh

```bash
#!/bin/bash

echo "⚠️  WARNING: This will reset the database!"
read -p "Are you sure you want to continue? (y/N): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔄 Resetting database..."

    cd ~/ethr-platform/ethrsite

    # Reset database
    npm run db:reset

    echo "✅ Database reset complete."
else
    echo "Operation cancelled."
fi
```

## Deployment Scripts

### deploy-local.sh

```bash
#!/bin/bash

echo "🚀 Deploying Ethr Platform Locally..."

# Build EthrSITE
echo "Building EthrSITE..."
cd ~/ethr-platform/ethrsite
npm run build

# Start all services
echo "Starting all services..."
cd ~/ethr-platform/ethr-platform
docker-compose -f docker-compose.yml up -d

echo "✅ Local deployment complete!"
echo "🌐 Access your application at: http://localhost:3000"
```

### deploy-prod.sh

```bash
#!/bin/bash

echo "🚀 Deploying Ethr Platform to Production..."

# Build EthrSITE for production
echo "Building EthrSITE for production..."
cd ~/ethr-platform/ethrsite
npm run build

# Deploy using production compose
echo "Starting production services..."
cd ~/ethr-platform/ethr-platform
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

echo "✅ Production deployment complete!"
```

## Monitoring Scripts

### logs.sh

```bash
#!/bin/bash

SERVICE=${1:-"all"}

echo "📋 Showing logs for: $SERVICE"

cd ~/ethr-platform/ethr-platform

if [ "$SERVICE" = "all" ]; then
    docker-compose logs -f
else
    docker-compose logs -f $SERVICE
fi
```

### monitor.sh

```bash
#!/bin/bash

echo "📊 Monitoring Ethr Platform Services..."
echo "Press Ctrl+C to stop monitoring"
echo ""

while true; do
    clear
    echo "=== Ethr Platform Status ==="
    date
    echo ""

    # Service status
    echo "🐳 Docker Services:"
    cd ~/ethr-platform/ethr-platform
    docker-compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
    echo ""

    # Health checks
    echo "🔍 Health Status:"
    if curl -s http://localhost:8080/healthz > /dev/null; then
        echo "✅ ZITADEL: Healthy"
    else
        echo "❌ ZITADEL: Unhealthy"
    fi

    if curl -s http://localhost:8081/health > /dev/null; then
        echo "✅ NetBird: Healthy"
    else
        echo "❌ NetBird: Unhealthy"
    fi

    if curl -s http://localhost:8082/status.php > /dev/null; then
        echo "✅ Nextcloud: Healthy"
    else
        echo "❌ Nextcloud: Unhealthy"
    fi

    echo ""
    echo "💾 Resource Usage:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"

    sleep 5
done
```

## Quick Setup Commands

```bash
# Make all scripts executable
chmod +x scripts/*.sh

# Quick health check
./scripts/health-check.sh

# Start development environment
./scripts/start-dev.sh

# Check Docker status
./scripts/docker-status.sh

# Monitor services
./scripts/monitor.sh

# View logs
./scripts/logs.sh [service-name]

# Stop development environment
./scripts/stop-dev.sh
```
