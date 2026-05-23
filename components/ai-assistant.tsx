'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useLanguage } from '@/lib/language-context'
import { products } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Send, Mic, MicOff, Volume2, VolumeX, Bot, User, Sparkles } from 'lucide-react'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const DEVELOPER_NAME = 'VARNOX PRIME TECH OFFICIAL'

export function AIAssistant() {
  const { language, t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis

      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognitionAPI) {
        recognitionRef.current = new SpeechRecognitionAPI()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = language === 'fr' ? 'fr-FR' : 'en-US'

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript
          setInput(transcript)
          setIsListening(false)
        }

        recognitionRef.current.onerror = () => {
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }

    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: t.assistant.welcome,
          timestamp: new Date(),
        },
      ])
    }
  }, [language, t.assistant.welcome, messages.length])

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language === 'fr' ? 'fr-FR' : 'en-US'
    }
  }, [language])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const speak = useCallback((text: string) => {
    if (synthRef.current && voiceEnabled) {
      synthRef.current.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === 'fr' ? 'fr-FR' : 'en-US'
      utterance.rate = 0.9
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      synthRef.current.speak(utterance)
    }
  }, [language, voiceEnabled])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      recognitionRef.current?.start()
      setIsListening(true)
    }
  }

  const stopSpeaking = () => {
    synthRef.current?.cancel()
    setIsSpeaking(false)
  }

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Developer question
    if (
      lowerMessage.includes('developpeur') ||
      lowerMessage.includes('développeur') ||
      lowerMessage.includes('developer') ||
      lowerMessage.includes('createur') ||
      lowerMessage.includes('créateur') ||
      lowerMessage.includes('creator') ||
      lowerMessage.includes('qui t\'a cree') ||
      lowerMessage.includes('qui t\'a créé') ||
      lowerMessage.includes('who created') ||
      lowerMessage.includes('who made') ||
      lowerMessage.includes('ton nom') ||
      lowerMessage.includes('your name')
    ) {
      return language === 'fr'
        ? `Mon developpeur est ${DEVELOPER_NAME}. Il a cree VARNOX STORE pour vous offrir les meilleurs scripts et bots d'automatisation du marche.`
        : `My developer is ${DEVELOPER_NAME}. He created VARNOX STORE to offer you the best automation scripts and bots on the market.`
    }

    // WhatsApp specific products
    if (lowerMessage.includes('whatsapp')) {
      if (lowerMessage.includes('ban') || lowerMessage.includes('unban') || lowerMessage.includes('debannir')) {
        return language === 'fr'
          ? 'Notre methode Ban & Unban WhatsApp ($79.99) vous permet de debannir votre compte et inclut des techniques de protection contre les futurs bannissements. Garantie de resultat !'
          : 'Our WhatsApp Ban & Unban Method ($79.99) allows you to unban your account and includes protection techniques against future bans. Result guaranteed!'
      }
      if (lowerMessage.includes('certif') || lowerMessage.includes('business') || lowerMessage.includes('badge')) {
        return language === 'fr'
          ? 'La Certification WhatsApp Business ($149.99) vous donne le badge verifie officiel, un compte business professionnel, et un catalogue produits illimite. Augmentez votre credibilite !'
          : 'WhatsApp Business Certification ($149.99) gives you the official verified badge, a professional business account, and unlimited product catalog. Boost your credibility!'
      }
      if (lowerMessage.includes('mass') || lowerMessage.includes('bulk') || lowerMessage.includes('envoi')) {
        return language === 'fr'
          ? 'Le Mass Sender Pro ($69.99) permet d\'envoyer des messages en masse avec des delais intelligents pour eviter les bans. Import CSV/Excel et rapport de livraison inclus.'
          : 'Mass Sender Pro ($69.99) allows you to send bulk messages with smart delays to avoid bans. CSV/Excel import and delivery report included.'
      }
      if (lowerMessage.includes('extract') || lowerMessage.includes('groupe') || lowerMessage.includes('group')) {
        return language === 'fr'
          ? 'Le Group Extractor ($39.99) extrait tous les membres de vos groupes WhatsApp avec export CSV/Excel. Parfait pour vos campagnes marketing !'
          : 'The Group Extractor ($39.99) extracts all members from your WhatsApp groups with CSV/Excel export. Perfect for your marketing campaigns!'
      }
      return language === 'fr'
        ? 'Nous avons plusieurs produits WhatsApp : Bot Multi-Device ($49.99), Certification Business ($149.99), Ban & Unban Method ($79.99), CRM Bot ($89.99), Mass Sender Pro ($69.99), Group Extractor ($39.99). Lequel vous interesse ?'
        : 'We have several WhatsApp products: Multi-Device Bot ($49.99), Business Certification ($149.99), Ban & Unban Method ($79.99), CRM Bot ($89.99), Mass Sender Pro ($69.99), Group Extractor ($39.99). Which one interests you?'
    }

    // Telegram products
    if (lowerMessage.includes('telegram')) {
      return language === 'fr'
        ? 'Nos produits Telegram incluent : Bot Automation ($39.99) pour la moderation automatique et gestion de canaux, et Shop Bot ($69.99) pour creer une boutique complete sur Telegram avec paiement integre.'
        : 'Our Telegram products include: Automation Bot ($39.99) for auto-moderation and channel management, and Shop Bot ($69.99) to create a complete store on Telegram with integrated payment.'
    }

    // Virtual numbers
    if (lowerMessage.includes('numero') || lowerMessage.includes('number') || lowerMessage.includes('virtuel') || lowerMessage.includes('virtual')) {
      return language === 'fr'
        ? 'Nos packs de numeros virtuels : Pack Standard ($29.99) avec 10 numeros multi-pays, Pack Premium ($59.99) avec 25 numeros a duree illimitee et SMS illimites. Parfait pour les verifications WhatsApp et Telegram !'
        : 'Our virtual number packs: Standard Pack ($29.99) with 10 multi-country numbers, Premium Pack ($59.99) with 25 unlimited duration numbers and unlimited SMS. Perfect for WhatsApp and Telegram verifications!'
    }

    // Bug bot / Security
    if (lowerMessage.includes('bug') || lowerMessage.includes('securite') || lowerMessage.includes('security') || lowerMessage.includes('crash')) {
      return language === 'fr'
        ? 'Nos outils de securite : Bug Bot Detector ($44.99) pour scanner les vulnerabilites de vos bots, Crash Bot Protection ($34.99) pour une protection anti-crash avec recuperation automatique et monitoring 24/7.'
        : 'Our security tools: Bug Bot Detector ($44.99) to scan vulnerabilities in your bots, Crash Bot Protection ($34.99) for anti-crash protection with automatic recovery and 24/7 monitoring.'
    }

    // AI products
    if (lowerMessage.includes('ia') || lowerMessage.includes('ai') || lowerMessage.includes('intelligence')) {
      return language === 'fr'
        ? 'Nos produits IA : AI Chatbot Script ($79.99) avec IA conversationnelle et apprentissage continu, AI Content Generator ($59.99) pour generer du contenu pour vos reseaux sociaux et marketing.'
        : 'Our AI products: AI Chatbot Script ($79.99) with conversational AI and continuous learning, AI Content Generator ($59.99) to generate content for your social media and marketing.'
    }

    // All products
    if (
      lowerMessage.includes('produit') ||
      lowerMessage.includes('product') ||
      lowerMessage.includes('bot') ||
      lowerMessage.includes('script') ||
      lowerMessage.includes('catalogue') ||
      lowerMessage.includes('catalog')
    ) {
      const productCount = products.length
      return language === 'fr'
        ? `VARNOX STORE propose ${productCount} produits dans 6 categories : WhatsApp (6 produits), Telegram (2), Numeros Virtuels (2), Securite (2), IA (2), et Automatisation (2). Visitez notre page Produits pour voir tout !`
        : `VARNOX STORE offers ${productCount} products in 6 categories: WhatsApp (6 products), Telegram (2), Virtual Numbers (2), Security (2), AI (2), and Automation (2). Visit our Products page to see everything!`
    }

    // Prices
    if (
      lowerMessage.includes('prix') ||
      lowerMessage.includes('price') ||
      lowerMessage.includes('cout') ||
      lowerMessage.includes('coût') ||
      lowerMessage.includes('cost') ||
      lowerMessage.includes('tarif') ||
      lowerMessage.includes('combien')
    ) {
      return language === 'fr'
        ? 'Nos prix varient de $29.99 (Pack Numeros Virtuels) a $149.99 (Certification WhatsApp Business). Tous les scripts incluent un support 24/7 et des mises a jour gratuites a vie !'
        : 'Our prices range from $29.99 (Virtual Numbers Pack) to $149.99 (WhatsApp Business Certification). All scripts include 24/7 support and free lifetime updates!'
    }

    // Payment
    if (lowerMessage.includes('paiement') || lowerMessage.includes('payment') || lowerMessage.includes('payer') || lowerMessage.includes('pay')) {
      return language === 'fr'
        ? 'Nous acceptons plusieurs methodes de paiement. Apres l\'achat, vous recevez un acces instantane au script avec documentation et support. Contactez-nous sur WhatsApp ou Telegram pour finaliser votre commande !'
        : 'We accept multiple payment methods. After purchase, you receive instant access to the script with documentation and support. Contact us on WhatsApp or Telegram to finalize your order!'
    }

    // Support
    if (lowerMessage.includes('support') || lowerMessage.includes('aide') || lowerMessage.includes('help') || lowerMessage.includes('contact')) {
      return language === 'fr'
        ? 'Notre support est disponible 24/7 ! Contactez-nous sur WhatsApp (+224669288332) ou Telegram (@Varnox_Or_novark). Nous repondons rapidement a toutes vos questions.'
        : 'Our support is available 24/7! Contact us on WhatsApp (+224669288332) or Telegram (@Varnox_Or_novark). We respond quickly to all your questions.'
    }

    // Greetings
    if (
      lowerMessage.includes('bonjour') ||
      lowerMessage.includes('hello') ||
      lowerMessage.includes('salut') ||
      lowerMessage.includes('hi') ||
      lowerMessage.includes('hey')
    ) {
      return language === 'fr'
        ? 'Bonjour et bienvenue sur VARNOX STORE ! Je suis votre assistant IA. Comment puis-je vous aider aujourd\'hui ? Vous pouvez me demander des infos sur nos produits, prix, ou support.'
        : 'Hello and welcome to VARNOX STORE! I\'m your AI assistant. How can I help you today? You can ask me about our products, prices, or support.'
    }

    // Thank you
    if (lowerMessage.includes('merci') || lowerMessage.includes('thank')) {
      return language === 'fr'
        ? 'Je vous en prie ! N\'hesitez pas si vous avez d\'autres questions. Bonne journee et a bientot sur VARNOX STORE !'
        : 'You\'re welcome! Feel free to ask if you have any other questions. Have a great day and see you soon on VARNOX STORE!'
    }

    // Bye
    if (lowerMessage.includes('bye') || lowerMessage.includes('au revoir') || lowerMessage.includes('ciao')) {
      return language === 'fr'
        ? 'Au revoir ! Merci de votre visite sur VARNOX STORE. N\'hesitez pas a revenir si vous avez des questions !'
        : 'Goodbye! Thank you for visiting VARNOX STORE. Feel free to come back if you have any questions!'
    }

    // Default
    return language === 'fr'
      ? 'Je suis l\'assistant IA de VARNOX STORE, cree par ' + DEVELOPER_NAME + '. Je peux vous renseigner sur nos produits (WhatsApp, Telegram, IA, Securite, Numeros Virtuels), les prix, et le support. Que puis-je faire pour vous ?'
      : 'I\'m the VARNOX STORE AI assistant, created by ' + DEVELOPER_NAME + '. I can inform you about our products (WhatsApp, Telegram, AI, Security, Virtual Numbers), pricing, and support. What can I do for you?'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 800))

    const responseText = generateResponse(userMessage.content)
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)

    if (voiceEnabled) {
      speak(responseText)
    }
  }

  return (
    <Card className="glass border-border/50 flex flex-col h-[600px] max-h-[80vh]">
      {/* Header */}
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center relative">
            <Bot className="w-5 h-5 text-accent" />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{t.assistant.title}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              {language === 'fr' ? 'En ligne' : 'Online'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={voiceEnabled ? 'text-accent' : 'text-muted-foreground'}
            title={voiceEnabled ? 'Disable voice' : 'Enable voice'}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          {isSpeaking && (
            <Button variant="ghost" size="icon" onClick={stopSpeaking} className="text-primary animate-pulse">
              <VolumeX className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' ? 'bg-primary/20' : 'bg-accent/20'
              }`}
            >
              {message.role === 'user' ? (
                <User className="w-4 h-4 text-primary" />
              ) : (
                <Sparkles className="w-4 h-4 text-accent" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'bg-secondary text-secondary-foreground rounded-tl-sm'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className="text-[10px] opacity-60 mt-1">
                {message.timestamp.toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={toggleListening}
            className={`border-border ${isListening ? 'bg-primary text-primary-foreground animate-pulse' : 'hover:border-primary'}`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? t.assistant.listening : t.assistant.placeholder}
            className="flex-1 bg-input border-border focus:border-primary"
            disabled={isListening}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {isListening && (
          <p className="text-xs text-primary mt-2 text-center animate-pulse">{t.assistant.listening}</p>
        )}
      </form>
    </Card>
  )
}

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
  }
}
