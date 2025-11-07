import { Plugin } from 'payload/types'
import OpenAI from 'openai'
import { Request, Response } from 'express'

interface SimpleNLConfig {
  openaiApiKey?: string
  defaultModel?: string
}

interface SimpleChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface SimpleNLResponse {
  message: string
  intent?: string
}

class SimpleNaturalLanguage {
  private openai: OpenAI | null = null
  private config: SimpleNLConfig

  constructor(config: SimpleNLConfig = {}) {
    this.config = {
      defaultModel: 'gpt-3.5-turbo',
      ...config,
    }

    if (this.config.openaiApiKey) {
      this.openai = new OpenAI({
        apiKey: this.config.openaiApiKey,
      })
    }
  }

  async processMessage(message: string, context?: {
    userId?: string
    history?: SimpleChatMessage[]
  }): Promise<SimpleNLResponse> {
    if (!this.openai) {
      return {
        message: 'Natural language features are not configured. Please check your OpenAI API key.',
      }
    }

    try {
      const messages: SimpleChatMessage[] = [
        {
          role: 'system',
          content: 'You are EthrSITE\'s AI assistant. Help users navigate the platform and answer questions about content management, site building, and available features. Be concise and helpful.',
        },
      ]

      // Add conversation history if provided
      if (context?.history) {
        messages.push(...context.history.slice(-5)) // Keep last 5 messages
      }

      messages.push({
        role: 'user',
        content: message,
      })

      const completion = await this.openai.chat.completions.create({
        model: this.config.defaultModel!,
        messages,
        max_tokens: 300,
        temperature: 0.7,
      })

      const responseMessage = completion.choices[0].message

      // Simple intent detection
      let intent: string | undefined
      const content = responseMessage.content?.toLowerCase() || ''
      
      if (content.includes('navigate') || content.includes('go to')) {
        intent = 'navigation'
      } else if (content.includes('create') || content.includes('build') || content.includes('make')) {
        intent = 'creation'
      } else if (content.includes('edit') || content.includes('modify') || content.includes('update')) {
        intent = 'editing'
      } else if (content.includes('help') || content.includes('how to')) {
        intent = 'help'
      }

      return {
        message: responseMessage.content || 'How can I help you with your site today?',
        intent,
      }
    } catch (error) {
      console.error('Error processing natural language message:', error)
      return {
        message: 'I apologize, but I encountered an error. Please try again.',
      }
    }
  }
}

// Simplified Payload CMS Plugin
export const simpleNaturalLanguage = (config?: SimpleNLConfig): Plugin => {
  const nl = new SimpleNaturalLanguage(config)

  return (incomingConfig): Plugin => {
    return {
      ...incomingConfig,
      endpoints: [
        ...(incomingConfig.endpoints || []),
        {
          path: '/api/chat',
          method: 'post',
          handler: async (req: Request, res: Response) => {
            try {
              const { message, context } = req.body

              if (!message) {
                return res.status(400).json({ error: 'Message is required' })
              }

              const response = await nl.processMessage(message, context)

              // Simple logging for analytics
              console.log('Chat interaction:', {
                userId: context?.userId,
                message: message.substring(0, 100),
                intent: response.intent,
                timestamp: new Date().toISOString(),
              })

              return res.json(response)
            } catch (error) {
              console.error('Error in chat endpoint:', error)
              return res.status(500).json({ error: 'Internal server error' })
            }
          },
        },
      ],
    }
  }
}

export default simpleNaturalLanguage