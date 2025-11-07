import { buildConfig } from 'payload/config'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import Users from './collections/Users'
import Pages from './collections/Pages'
import Posts from './collections/Posts'
import Navigation from './collections/Navigation'
import UserProfiles from './collections/UserProfiles'
import Campaigns from './collections/Campaigns'
import AnalyticsEvents from './collections/AnalyticsEvents'
import Templates from './collections/Templates'
import Components from './collections/Components'
import Sites from './collections/Sites'

// Plugins
import { naturalLanguageComms } from './plugins/natural-language-comms'
import { tracardiIntegration } from './plugins/tracardi-integration'
import { unomiProfiles } from './plugins/unomi-profiles'
import { dittofeedCampaigns } from './plugins/dittofeed-campaigns'
import { postizSocial } from './plugins/postiz-social'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- EthrSITE Admin',
      favicon: '/assets/favicon.ico',
      ogImage: '/assets/logo.png',
    },
  },
  editor: lexicalEditor({}),
  collections: [
    Users,
    Pages,
    Posts,
    Navigation,
    UserProfiles,
    Campaigns,
    AnalyticsEvents,
    Templates,
    Components,
    Sites,
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  plugins: [
    naturalLanguageComms(),
    tracardiIntegration(),
    unomiProfiles(),
    dittofeedCampaigns(),
    postizSocial(),
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    'https://ethrsite.com',
    'https://cms.ethrsite.com',
  ].filter(Boolean),
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    'https://ethrsite.com',
    'https://cms.ethrsite.com',
  ].filter(Boolean),
})