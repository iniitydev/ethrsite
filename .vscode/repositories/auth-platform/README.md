# Ethr Platform Development Environment

A comprehensive development setup for the Ethr enterprise platform, including EthrSITE, EthrAUTH, EthrPLATFORM, and EthrSYNC components.

## 🎯 Overview

This repository provides a complete development environment configuration for working with the Ethr platform ecosystem. It includes:

- **EthrSITE**: Next.js-based frontend with PayloadCMS
- **EthrAUTH**: Authentication service using Keycloak
- **EthrPLATFORM**: Core platform services (ZITADEL, NetBird, Nextcloud)
- **EthrSYNC**: Go-based synchronization service

## 📋 Prerequisites

### Core Dependencies

```bash
# Install Docker and Docker Compose
sudo apt-get update
sudo apt-get install docker.io docker-compose

# Install Node.js (for EthrSITE)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Install Go (for EthrSYNC and future services)
wget https://go.dev/dl/go1.21.0.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
echo 'export GOPATH=$HOME/go' >> ~/.bashrc
echo 'export PATH=$PATH:$GOPATH/bin' >> ~/.bashrc
source ~/.bashrc

# Install Git
sudo apt-get install git
```

## 🚀 Repository Setup

```bash
# Create development directory
mkdir -p ~/ethr-platform && cd ~/ethr-platform

# Clone all repositories
git clone https://github.com/iniitydev/ethrsite.git
git clone https://github.com/iniitydev/ethrauth.git
git clone https://github.com/iniitydev/ethr-platform.git
git clone https://github.com/iniitydev/ethr-sync.git

# Set up GitHub credentials for pushing
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## ⚙️ Environment Configuration

### EthrPLATFORM Setup

```bash
cd ~/ethr-platform/ethr-platform
cp .env.example .env

# Edit .env with your actual values
nano .env  # or use your preferred editor

# Key variables to set:
# POSTGRES_ZITADEL_PASSWORD=your-secure-password
# POSTGRES_NETBIRD_PASSWORD=your-secure-password
# POSTGRES_NEXTCLOUD_PASSWORD=your-secure-password
# NEXTCLOUD_ADMIN_PASSWORD=your-admin-password
# DOMAIN=yourdomain.com (or localhost for development)
# PROTOCOL=http (or https for production)
```

### EthrSITE Setup

```bash
cd ~/ethr-platform/ethrsite
cp .env.example .env

# Edit .env with your actual values
nano .env

# Key variables to set:
# DATABASE_URL=postgresql://username:password@localhost:5432/ethrsite
# PAYLOAD_SECRET=your-payload-secret
# KEYCLOAK_URL=http://localhost:8080
# KEYCLOAK_REALM=your-realm
# KEYCLOAK_CLIENT_ID=ethrsite-frontend
# KEYCLOAK_CLIENT_SECRET=your-client-secret
```

## 🐳 Docker Services Startup

```bash
cd ~/ethr-platform/ethr-platform
docker-compose up -d

# Verify services are running
docker-compose ps

# Check logs if needed
docker-compose logs -f
```

### Service URLs (after startup):

- **ZITADEL Admin**: http://localhost:8080
- **NetBird Management**: http://localhost:8081
- **Nextcloud**: http://localhost:8082

## 🔧 Development Workflow

### EthrSITE Development

```bash
cd ~/ethr-platform/ethrsite
npm install
npm run dev
# Access: http://localhost:3000
```

### EthrAUTH Development

```bash
cd ~/ethr-platform/ethrauth
docker-compose up -d
# Access Keycloak: http://localhost:8080
```

### EthrSYNC Development (Go Service)

```bash
cd ~/ethr-platform/ethr-sync
go mod download
go run cmd/sync/main.go
```

## 🛠️ VS Code Configuration

### Recommended Extensions

```json
// .vscode/extensions.json
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

### Workspace Settings

```json
// .vscode/settings.json
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

## 📊 Health Checks

```bash
# Check ZITADEL health
curl http://localhost:8080/healthz

# Check NetBird health
curl http://localhost:8081/health

# Check Nextcloud status
curl http://localhost:8082/status.php
```

## 🚀 Production Deployment Prep

### Environment Switch

```bash
# For production, use the production compose file
cd ~/ethr-platform/ethr-platform
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Update .env for production
DOMAIN=yourdomain.com
PROTOCOL=https
```

## 📚 Learning Resources

- **ZITADEL Docs**: https://zitadel.com/docs
- **NetBird Docs**: https://netbird.io/docs
- **Nextcloud Docs**: https://nextcloud.com/docs
- **PayloadCMS Docs**: https://payloadcms.com/docs

## 🛠️ Quick Commands Reference

```bash
# Restart services
docker-compose restart

# View logs
docker-compose logs -f [service]

# Run database migrations (EthrSITE)
npm run migrate:create
npm run migrate:up
```

## 🤖 AI Assistant Configuration

This repository includes Byterover MCP rules for enhanced AI-assisted development. The rules ensure consistent knowledge management across different AI development tools.

See [`byterover-rules.md`](byterover-rules.md) for detailed configuration.
