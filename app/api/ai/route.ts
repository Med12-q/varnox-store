import { NextResponse } from 'next/server'

const DEVELOPER_NAME = 'VARNOX PRIME TECH OFFICIAL'

// POST /api/ai - Chat with AI assistant
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, language = 'en' } = body

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      )
    }

    // Generate response based on message content
    const response = generateAIResponse(message, language)

    // In production, this would connect to OpenAI or similar API:
    // const openaiResponse = await openai.chat.completions.create({
    //   model: 'gpt-4',
    //   messages: [
    //     { role: 'system', content: 'You are the VARNOX STORE AI assistant...' },
    //     { role: 'user', content: message }
    //   ],
    // })

    return NextResponse.json({
      success: true,
      data: {
        message: response,
        timestamp: new Date().toISOString(),
      },
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to process message' },
      { status: 500 }
    )
  }
}

function generateAIResponse(message: string, language: string): string {
  const lowerMessage = message.toLowerCase()

  // Developer question
  if (
    lowerMessage.includes('développeur') ||
    lowerMessage.includes('developer') ||
    lowerMessage.includes('créateur') ||
    lowerMessage.includes('creator') ||
    lowerMessage.includes('qui t\'a créé') ||
    lowerMessage.includes('who created') ||
    lowerMessage.includes('who made')
  ) {
    return language === 'fr'
      ? `Mon développeur est ${DEVELOPER_NAME}. Il a créé VARNOX STORE pour vous offrir les meilleurs scripts et bots d'automatisation.`
      : `My developer is ${DEVELOPER_NAME}. He created VARNOX STORE to offer you the best automation scripts and bots.`
  }

  // Products
  if (
    lowerMessage.includes('produit') ||
    lowerMessage.includes('product') ||
    lowerMessage.includes('bot') ||
    lowerMessage.includes('script')
  ) {
    return language === 'fr'
      ? 'Nous proposons plusieurs produits : des bots WhatsApp, des bots Telegram, des outils d\'automatisation et des scripts IA. Visitez notre page Produits pour en savoir plus !'
      : 'We offer several products: WhatsApp bots, Telegram bots, automation tools, and AI scripts. Visit our Products page to learn more!'
  }

  // Prices
  if (
    lowerMessage.includes('prix') ||
    lowerMessage.includes('price') ||
    lowerMessage.includes('coût') ||
    lowerMessage.includes('cost')
  ) {
    return language === 'fr'
      ? 'Nos prix varient de $39.99 à $89.99 selon le produit. Chaque script inclut un support 24/7 et des mises à jour gratuites.'
      : 'Our prices range from $39.99 to $89.99 depending on the product. Each script includes 24/7 support and free updates.'
  }

  // Help
  if (
    lowerMessage.includes('aide') ||
    lowerMessage.includes('help') ||
    lowerMessage.includes('comment') ||
    lowerMessage.includes('how')
  ) {
    return language === 'fr'
      ? 'Je peux vous aider avec : informations sur les produits, prix, processus d\'achat, et support technique. Que souhaitez-vous savoir ?'
      : 'I can help you with: product information, pricing, purchase process, and technical support. What would you like to know?'
  }

  // Greetings
  if (
    lowerMessage.includes('bonjour') ||
    lowerMessage.includes('hello') ||
    lowerMessage.includes('salut') ||
    lowerMessage.includes('hi')
  ) {
    return language === 'fr'
      ? 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?'
      : 'Hello! How can I help you today?'
  }

  // Default
  return language === 'fr'
    ? 'Je suis l\'assistant IA de VARNOX STORE. Je peux vous renseigner sur nos produits, les prix, et répondre à vos questions. Que puis-je faire pour vous ?'
    : 'I\'m the VARNOX STORE AI assistant. I can inform you about our products, pricing, and answer your questions. What can I do for you?'
}
