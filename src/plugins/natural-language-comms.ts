import { Plugin } from 'payload/types'
import OpenAI from 'openai'
import { Request, Response } from 'express'

interface NaturalLanguageConfig {
  openaiApiKey?: string
  defaultModel?: string
  maxTokens?: number
  temperature?: number
}

interface UserContext {
  userId: string
  userProfile?: any
  conversationHistory: Array<{
    role: 'user' | 'assistant' | 'system'
    content: string
    timestamp: Date
  }>
  currentPage?: string
  userIntent?: string
}

interface NLResponse {
  message: string
  actions?: Array<{
    type: 'navigate' | 'show_content' | 'suggest_content' | 'trigger_workflow'
    data: any
  }>
  followUpQuestions?: string[]
  userIntent?: string
}

class NaturalLanguageComms {
  private openai: OpenAI | null = null
  private config: NaturalLanguageConfig

  constructor(config: NaturalLanguageConfig = {}) {
    this.config = {
      defaultModel: 'gpt-4',
      maxTokens: 500,
      temperature: 0.7,
      ...config,
    }

    if (this.config.openaiApiKey) {
      this.openai = new OpenAI({
        apiKey: this.config.openaiApiKey,
      })
    }
  }

  async processUserMessage(message: string, context: UserContext): Promise<NLResponse> {
    if (!this.openai) {
      return {
        message: 'Natural language features are not configured. Please check your OpenAI API key.',
      }
    }

    try {
      const conversationContext = this.buildConversationContext(context)
      const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
        {
          type: 'function',
          function: {
            name: 'navigate',
            description: 'Navigate to a specific page on the website.',
            parameters: {
              type: 'object',
              properties: {
                path: {
                  type: 'string',
                  description: 'The path to navigate to (e.g., "/", "/about", "/contact").',
                },
              },
              required: ['path'],
            },
          },
        },
        {
          type: 'function',
          function: {
            name: 'show_content',
            description: 'Show specific content to the user.',
            parameters: {
              type: 'object',
              properties: {
                contentType: {
                  type: 'string',
                  description: 'The type of content to show (e.g., "latest_articles", "pricing_plans").',
                },
              },
              required: ['contentType'],
            },
          },
        },
      ]

      const completion = await this.openai.chat.completions.create({
        model: this.config.defaultModel!,
        messages: [
          {
            role: 'system',
            content: `You are EthrSITE's AI assistant. Help users navigate the platform, find content, and accomplish their goals. Call the available functions to perform actions.`,
          },
          ...conversationContext,
          {
            role: 'user',
            content: message,
          },
        ],
        tools: tools,
        tool_choice: 'auto',
      })

      const responseMessage = completion.choices[0].message
      const toolCalls = responseMessage.tool_calls
      const actions: NLResponse['actions'] = []
      let userIntent: string | undefined

      if (toolCalls) {
        for (const toolCall of toolCalls) {
          const functionName = toolCall.function.name
          const functionArgs = JSON.parse(toolCall.function.arguments)
          userIntent = functionName

          if (functionName === 'navigate') {
            actions.push({ type: 'navigate', data: { path: functionArgs.path } })
          } else if (functionName === 'show_content') {
            actions.push({ type: 'show_content', data: { contentType: functionArgs.contentType } })
          }
        }
      }

      return {
        message: responseMessage.content || 'How can I help you further?',
        actions,
        userIntent,
      }
    } catch (error) {
      console.error('Error processing natural language message:', error)
      return {
        message: 'I apologize, but I encountered an error processing your request. Please try again.',
      }
    }
  }

  private buildConversationContext(context: UserContext): Array<{ role: string; content: string }> {
    const messages: Array<{ role: string; content: string }> = []

    // Add user profile context if available
    if (context.userProfile) {
      messages.push({
        role: 'system',
        content: `User profile: ${JSON.stringify(context.userProfile)}`,
      })
    }

    // Add conversation history
    context.conversationHistory.forEach(msg => {
      messages.push({
        role: msg.role,
        content: msg.content,
      })
    })

    return messages
  }


  async generatePersonalizedContent(userId: string, contentType: string): Promise<string> {
    // This would integrate with Unomi and Tracardi for personalized content
    // For now, return a placeholder
    return `Personalized ${contentType} content for user ${userId}`
  }

  async trackUserInteraction(userId: string, interaction: {
    type: string
    message: string
    response: string
    intent?: string
    timestamp: Date
  }) {
    // This would integrate with Tracardi and Unomi for tracking
    console.log('Tracking user interaction:', { userId, ...interaction })
  }
}

// Payload CMS Plugin
export const naturalLanguageComms = (config?: NaturalLanguageConfig): Plugin => {
  const nlComms = new NaturalLanguageComms(config)

  return (incomingConfig): Plugin => {
    return {
      ...incomingConfig,
      endpoints: [
        ...(incomingConfig.endpoints || []),
        {
          path: '/nl-chat',
          method: 'post',
          handler: async (req: Request, res: Response) => {
            try {
              const { message, context } = req.body

              if (!message) {
                return res.status(400).json({ error: 'Message is required' })
              }

              const response = await nlComms.processUserMessage(message, context)

              // Track the interaction
              await nlComms.trackUserInteraction(context.userId, {
                type: 'chat_message',
                message,
                response: response.message,
                intent: response.userIntent,
                timestamp: new Date(),
              })

              return res.json(response)
            } catch (error) {
              console.error('Error in NL chat endpoint:', error)
              return res.status(500).json({ error: 'Internal server error' })
            }
          },
        },
        {
          path: '/nl-personalize',
          method: 'post',
          handler: async (req: Request, res: Response) => {
            try {
              const { userId, contentType } = req.body

              if (!userId || !contentType) {
                return res.status(400).json({ error: 'User ID and content type are required' })
              }

              const content = await nlComms.generatePersonalizedContent(userId, contentType)
              return res.json({ content })
            } catch (error) {
              console.error('Error in NL personalize endpoint:', error)
              return res.status(500).json({ error: 'Internal server error' })
            }
          },
        },
      ],
    }
  }
}

export default naturalLanguageComms
