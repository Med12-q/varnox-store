'use client'

import { useLanguage } from '@/lib/language-context'
import { AIAssistant } from '@/components/ai-assistant'
import { Bot, Mic, MessageSquare, Sparkles } from 'lucide-react'

export default function AssistantPage() {
  const { language, t } = useLanguage()

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4 neon-border-blue animate-float">
            <Bot className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-accent text-glow-blue">{t.assistant.title}</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.assistant.subtitle}</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
          {[
            {
              icon: MessageSquare,
              title: { fr: 'Chat en temps réel', en: 'Real-time Chat' },
              description: { fr: 'Réponses instantanées', en: 'Instant responses' },
            },
            {
              icon: Mic,
              title: { fr: 'Commande vocale', en: 'Voice Command' },
              description: { fr: 'Parlez naturellement', en: 'Speak naturally' },
            },
            {
              icon: Sparkles,
              title: { fr: 'IA Intelligente', en: 'Smart AI' },
              description: { fr: 'Assistance personnalisée', en: 'Personalized assistance' },
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="glass rounded-xl p-4 border border-border/50 text-center"
            >
              <feature.icon className="w-6 h-6 text-accent mx-auto mb-2" />
              <h3 className="font-medium text-sm">{feature.title[language]}</h3>
              <p className="text-xs text-muted-foreground">{feature.description[language]}</p>
            </div>
          ))}
        </div>

        {/* AI Assistant */}
        <div className="max-w-2xl mx-auto">
          <AIAssistant />
        </div>

        {/* Tips */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="glass rounded-xl p-6 border border-border/50">
            <h3 className="font-semibold mb-3">
              {language === 'fr' ? 'Conseils d\'utilisation' : 'Usage Tips'}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                {language === 'fr'
                  ? '• Cliquez sur le microphone pour parler à l\'assistant'
                  : '• Click on the microphone to talk to the assistant'}
              </li>
              <li>
                {language === 'fr'
                  ? '• Demandez des informations sur nos produits et prix'
                  : '• Ask for information about our products and prices'}
              </li>
              <li>
                {language === 'fr'
                  ? '• L\'assistant peut répondre en vocal si activé'
                  : '• The assistant can respond with voice if enabled'}
              </li>
              <li>
                {language === 'fr'
                  ? '• Posez vos questions en français ou en anglais'
                  : '• Ask your questions in French or English'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
