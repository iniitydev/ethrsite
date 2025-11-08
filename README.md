# EthrSITE - Modern Website Builder Platform

EthrSITE is a comprehensive website builder platform built with PayloadCMS, featuring natural language communication, integrated marketing tools, and a modular architecture for easy extensibility.

## 🚀 Features

- **Natural Language Communication**: AI-powered chat interface for user assistance
- **Website Builder**: Drag-and-drop website creation with templates and components
- **Integrated Marketing Stack**: Tracardi CDP, Unomi profiles, Dittofeed campaigns, Postiz social
- **Modular Architecture**: Plugin-based system for easy feature extensions
- **Self-Sovereign Identity**: Personal hosting and VM provisioning
- **Production Ready**: Designed for immediate deployment with EthrAUTH and EthrSECRETS

## 🏗️ Architecture

### Core Components

- **PayloadCMS**: Headless CMS for content and website management
- **Natural Language Comms**: OpenAI-powered chat and content personalization
- **Marketing Integration**: Tracardi, Unomi, Dittofeed, Postiz
- **Website Builder**: Templates, components, and site management
- **Authentication**: Keycloak + Authentik (EthrAUTH)
- **Secrets Management**: Infisical + Vaultwarden (EthrSECRETS)

### Collections

- **Users**: Platform users with roles and preferences
- **Pages**: Website pages with rich content and SEO
- **Posts**: Blog posts and articles
- **UserProfiles**: Extended user data and marketing profiles
- **Campaigns**: Marketing campaigns and automation
- **Templates**: Website templates for quick setup
- **Components**: Reusable UI components
- **Sites**: Complete website configurations

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- OpenAI API key (for natural language features)
- Keycloak instance (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ethrsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Database setup**
   ```bash
   # Create PostgreSQL database
   createdb ethrsite_development
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

### Environment Variables

See [`.env.example`](.env.example) for all required environment variables.

## 📁 Project Structure

```
ethrsite/
├── src/
│   ├── collections/          # PayloadCMS collections
│   │   ├── Users.ts
│   │   ├── Pages.ts
│   │   ├── Posts.ts
│   │   ├── UserProfiles.ts
│   │   ├── Campaigns.ts
│   │   ├── Templates.ts
│   │   ├── Components.ts
│   │   └── Sites.ts
│   ├── plugins/              # Custom plugins
│   │   └── natural-language-comms.ts
│   ├── payload.config.ts     # Main Payload configuration
│   └── server.ts            # Express server entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Serve production build
- `npm run generate:types` - Generate TypeScript types
- `npm run db:seed` - Seed database with sample data

### Adding New Collections

1. Create collection in `src/collections/`
2. Import and add to `src/payload.config.ts`
3. Restart development server

### Creating Plugins

1. Create plugin in `src/plugins/`
2. Import and add to `src/payload.config.ts`
3. Implement plugin interface with endpoints or hooks

## 🚢 Deployment

### Production Deployment

1. **Set up production environment**
   ```bash
   # Set NODE_ENV to production
   export NODE_ENV=production
   ```

2. **Build the application**
   ```bash
   npm run build
   ```

3. **Start production server**
   ```bash
   npm run serve
   ```

### Docker Deployment

```yaml
# docker-compose.production.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - PAYLOAD_SECRET=${PAYLOAD_SECRET}
    depends_on:
      - postgres

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=ethrsite
      - POSTGRES_USER=ethrsite
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 🔐 Security

### Authentication (EthrAUTH)

- **Keycloak**: Centralized identity management
- **Authentik**: Multi-provider authentication
- **Role-based access control**

### Secrets Management (EthrSECRETS)

- **Infisical**: Environment secrets and configuration
- **Vaultwarden**: Secure credential storage
- **API key rotation**

## 📊 Marketing Integration

### Available Tools

- **Tracardi**: Customer Data Platform for event tracking
- **Unomi**: User profiling and segmentation
- **Dittofeed**: Email campaign management
- **Postiz**: Social media automation

### Integration Points

- User behavior tracking
- Personalized content delivery
- Automated campaign triggers
- Multi-channel communication

## 🤖 Natural Language Features

### Chat Interface

- AI-powered assistance
- Context-aware responses
- User intent detection
- Actionable suggestions

### Content Personalization

- User preference-based content
- Behavior-driven recommendations
- Dynamic content generation

## 🔄 API Endpoints

### Natural Language Communication

- `POST /api/nl-chat` - Process user messages
- `POST /api/nl-personalize` - Generate personalized content

### Website Management

- `GET /api/sites` - List user sites
- `POST /api/sites` - Create new site
- `PUT /api/sites/:id` - Update site
- `POST /api/sites/:id/deploy` - Deploy site

## 📈 Monitoring & Analytics

- Built-in performance tracking
- User engagement metrics
- Campaign performance
- Site visitor analytics

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check documentation in `/docs` folder
- Contact the development team

## 🗺️ Roadmap

### Phase 1: Foundation
- [x] PayloadCMS setup
- [x] Basic collections
- [x] Natural language communication
- [ ] Marketing tools integration

### Phase 2: Website Builder
- [ ] Drag-and-drop interface
- [ ] Template system
- [ ] Component library
- [ ] Auto-deployment

### Phase 3: Advanced Features
- [ ] Personal identity hosting
- [ ] Mini-VM provisioning
- [ ] Advanced analytics
- [ ] Multi-language support

### Phase 4: Scale & Optimize
- [ ] Performance optimization
- [ ] Advanced AI features
- [ ] Marketplace integration
- [ ] Blockchain identity