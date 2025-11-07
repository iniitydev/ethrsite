import { buildConfig } from 'payload/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'

import Sites from './collections/Sites_simplified'
import Users from './collections/Users_simplified'
import Pages from './collections/Pages'
import Posts from './collections/Posts'
import Components from './collections/Components_simplified'

// Simplified plugin - only natural language communications
import { simpleNaturalLanguage } from './plugins/natural-language-comms_simplified'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
      titleSuffix: ' | EthrSITE',
      favicon: '/favicon.ico',
      ogImage: '/og-image.png',
    },
  },
  editor: slateEditor({}),
  collections: [
    Users,
    Sites,
    Pages,
    Posts,
    Components,
  ],
  typescript: {
    outputFile: './payload-types.ts',
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  plugins: [
    simpleNaturalLanguage({
      openaiApiKey: process.env.OPENAI_API_KEY,
      defaultModel: 'gpt-3.5-turbo',
    }),
  ],
  cors: [
    process.env.PAYLOAD_PUBLIC_DOMAIN || 'http://localhost:3000',
    'https://ethr.cloud',
    'https://ideploy.space',
    'https://www.ethr.cloud',
    'https://www.ideploy.space',
  ],
  csrf: [
    process.env.PAYLOAD_PUBLIC_DOMAIN || 'http://localhost:3000',
    'https://ethr.cloud',
    'https://ideploy.space',
    'https://www.ethr.cloud',
    'https://www.ideploy.space',
  ],
  security: {
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
})