import express from 'express'
import payload from 'payload'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-in-production',
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here

  app.listen(PORT, async () => {
    payload.logger.info(`EthrSITE CMS started on port ${PORT}`)
    payload.logger.info(`Admin panel: http://localhost:${PORT}/admin`)
    payload.logger.info(`API: http://localhost:${PORT}/api`)
  })
}

start()