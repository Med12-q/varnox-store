export type ProductCategory = 'whatsapp' | 'telegram' | 'automation' | 'ai' | 'security' | 'tools'

export type Product = {
  id: string
  name: {
    fr: string
    en: string
  }
  description: {
    fr: string
    en: string
  }
  price: number
  category: ProductCategory
  features: {
    fr: string[]
    en: string[]
  }
  image: string
  popular?: boolean
  badge?: string
}

export const products: Product[] = [
  // WhatsApp Products
  {
    id: 'whatsapp-multi-device',
    name: {
      fr: 'WhatsApp Bot Multi-Device',
      en: 'WhatsApp Multi-Device Bot',
    },
    description: {
      fr: 'Bot WhatsApp professionnel compatible multi-appareils avec reponses automatiques, gestion de groupes et commandes personnalisees.',
      en: 'Professional WhatsApp bot compatible with multi-device, featuring auto-replies, group management, and custom commands.',
    },
    price: 49.99,
    category: 'whatsapp',
    features: {
      fr: [
        'Compatible Multi-Device',
        'Reponses automatiques',
        'Gestion de groupes',
        'Commandes personnalisees',
        'Anti-spam integre',
        'Support 24/7',
      ],
      en: [
        'Multi-Device Compatible',
        'Auto-replies',
        'Group management',
        'Custom commands',
        'Built-in anti-spam',
        '24/7 Support',
      ],
    },
    image: '/products/whatsapp-bot.jpg',
    popular: true,
    badge: 'Best Seller',
  },
  {
    id: 'whatsapp-certification',
    name: {
      fr: 'Certification WhatsApp Business',
      en: 'WhatsApp Business Certification',
    },
    description: {
      fr: 'Obtenez la certification officielle WhatsApp Business avec badge verifie. Augmentez votre credibilite et la confiance de vos clients.',
      en: 'Get official WhatsApp Business certification with verified badge. Increase your credibility and customer trust.',
    },
    price: 149.99,
    category: 'whatsapp',
    features: {
      fr: [
        'Badge verifie officiel',
        'Compte business professionnel',
        'Catalogue produits illimite',
        'Messages automatiques',
        'Statistiques avancees',
        'Support prioritaire',
      ],
      en: [
        'Official verified badge',
        'Professional business account',
        'Unlimited product catalog',
        'Automated messages',
        'Advanced statistics',
        'Priority support',
      ],
    },
    image: '/products/whatsapp-certification.jpg',
    popular: true,
    badge: 'Premium',
  },
  {
    id: 'whatsapp-ban-unban',
    name: {
      fr: 'WhatsApp Ban & Unban Method',
      en: 'WhatsApp Ban & Unban Method',
    },
    description: {
      fr: 'Methode complete pour debannir votre compte WhatsApp et techniques de protection contre les futurs bannissements.',
      en: 'Complete method to unban your WhatsApp account and protection techniques against future bans.',
    },
    price: 79.99,
    category: 'whatsapp',
    features: {
      fr: [
        'Debannissement garanti',
        'Protection anti-ban',
        'Guide etape par etape',
        'Techniques de securite',
        'Support personnel',
        'Mises a jour gratuites',
      ],
      en: [
        'Guaranteed unban',
        'Anti-ban protection',
        'Step-by-step guide',
        'Security techniques',
        'Personal support',
        'Free updates',
      ],
    },
    image: '/products/ban-unban.jpg',
    popular: true,
    badge: 'Hot',
  },
  {
    id: 'whatsapp-crm',
    name: {
      fr: 'WhatsApp CRM Bot',
      en: 'WhatsApp CRM Bot',
    },
    description: {
      fr: 'Solution CRM complete integree a WhatsApp pour gerer vos clients et ventes automatiquement.',
      en: 'Complete CRM solution integrated with WhatsApp to manage your customers and sales automatically.',
    },
    price: 89.99,
    category: 'whatsapp',
    features: {
      fr: [
        'Gestion des contacts',
        'Suivi des conversations',
        'Automatisation des ventes',
        'Rapports detailles',
        'Tags et segments',
        'Integration paiement',
      ],
      en: [
        'Contact management',
        'Conversation tracking',
        'Sales automation',
        'Detailed reports',
        'Tags and segments',
        'Payment integration',
      ],
    },
    image: '/products/whatsapp-crm.jpg',
  },
  {
    id: 'whatsapp-mass-sender',
    name: {
      fr: 'WhatsApp Mass Sender Pro',
      en: 'WhatsApp Mass Sender Pro',
    },
    description: {
      fr: 'Envoyez des messages en masse a des milliers de contacts WhatsApp avec des delais intelligents pour eviter les bans.',
      en: 'Send bulk messages to thousands of WhatsApp contacts with smart delays to avoid bans.',
    },
    price: 69.99,
    category: 'whatsapp',
    features: {
      fr: [
        'Envoi illimite',
        'Delais intelligents',
        'Import CSV/Excel',
        'Messages personnalises',
        'Envoi de medias',
        'Rapport de livraison',
      ],
      en: [
        'Unlimited sending',
        'Smart delays',
        'CSV/Excel import',
        'Personalized messages',
        'Media sending',
        'Delivery report',
      ],
    },
    image: '/products/mass-sender.jpg',
    badge: 'Pro',
  },
  {
    id: 'whatsapp-group-extractor',
    name: {
      fr: 'WhatsApp Group Extractor',
      en: 'WhatsApp Group Extractor',
    },
    description: {
      fr: 'Extrayez tous les membres de vos groupes WhatsApp avec leurs numeros de telephone pour vos campagnes marketing.',
      en: 'Extract all members from your WhatsApp groups with their phone numbers for your marketing campaigns.',
    },
    price: 39.99,
    category: 'whatsapp',
    features: {
      fr: [
        'Extraction rapide',
        'Export CSV/Excel',
        'Filtrage par activite',
        'Multi-groupes',
        'Numeros internationaux',
        'Interface simple',
      ],
      en: [
        'Fast extraction',
        'CSV/Excel export',
        'Activity filtering',
        'Multi-groups',
        'International numbers',
        'Simple interface',
      ],
    },
    image: '/products/group-extractor.jpg',
  },
  
  // Telegram Products
  {
    id: 'telegram-automation',
    name: {
      fr: 'Telegram Automation Bot',
      en: 'Telegram Automation Bot',
    },
    description: {
      fr: 'Bot Telegram complet pour automatiser vos canaux et groupes avec des fonctionnalites avancees de moderation.',
      en: 'Complete Telegram bot to automate your channels and groups with advanced moderation features.',
    },
    price: 39.99,
    category: 'telegram',
    features: {
      fr: [
        'Moderation automatique',
        'Gestion de canaux',
        'Commandes admin',
        'Statistiques en temps reel',
        'Filtres anti-spam',
        'Webhooks personnalises',
      ],
      en: [
        'Auto-moderation',
        'Channel management',
        'Admin commands',
        'Real-time statistics',
        'Anti-spam filters',
        'Custom webhooks',
      ],
    },
    image: '/products/telegram-bot.jpg',
    popular: true,
  },
  {
    id: 'telegram-shop-bot',
    name: {
      fr: 'Telegram Shop Bot',
      en: 'Telegram Shop Bot',
    },
    description: {
      fr: 'Bot e-commerce complet pour Telegram avec catalogue produits, panier et paiement integre.',
      en: 'Complete e-commerce bot for Telegram with product catalog, cart, and integrated payment.',
    },
    price: 69.99,
    category: 'telegram',
    features: {
      fr: [
        'Catalogue produits',
        'Panier d\'achat',
        'Paiement integre',
        'Gestion des stocks',
        'Notifications clients',
        'Dashboard admin',
      ],
      en: [
        'Product catalog',
        'Shopping cart',
        'Integrated payment',
        'Stock management',
        'Customer notifications',
        'Admin dashboard',
      ],
    },
    image: '/products/telegram-shop.jpg',
  },
  
  // Virtual Numbers
  {
    id: 'virtual-number-pack',
    name: {
      fr: 'Pack Numeros Virtuels',
      en: 'Virtual Numbers Pack',
    },
    description: {
      fr: 'Pack de numeros virtuels de plusieurs pays pour verification WhatsApp, Telegram et autres services.',
      en: 'Pack of virtual numbers from multiple countries for WhatsApp, Telegram and other services verification.',
    },
    price: 29.99,
    category: 'tools',
    features: {
      fr: [
        '10 numeros inclus',
        'Multi-pays disponibles',
        'Reception SMS',
        'Verification instantanee',
        'Support WhatsApp/Telegram',
        'Renouvellement facile',
      ],
      en: [
        '10 numbers included',
        'Multi-country available',
        'SMS reception',
        'Instant verification',
        'WhatsApp/Telegram support',
        'Easy renewal',
      ],
    },
    image: '/products/virtual-number.jpg',
    popular: true,
    badge: 'Popular',
  },
  {
    id: 'virtual-number-premium',
    name: {
      fr: 'Numeros Virtuels Premium',
      en: 'Premium Virtual Numbers',
    },
    description: {
      fr: 'Numeros virtuels premium avec duree de vie prolongee et reception SMS illimitee.',
      en: 'Premium virtual numbers with extended lifetime and unlimited SMS reception.',
    },
    price: 59.99,
    category: 'tools',
    features: {
      fr: [
        '25 numeros premium',
        'Duree illimitee',
        'SMS illimites',
        'Tous pays disponibles',
        'API disponible',
        'Support VIP',
      ],
      en: [
        '25 premium numbers',
        'Unlimited duration',
        'Unlimited SMS',
        'All countries available',
        'API available',
        'VIP support',
      ],
    },
    image: '/products/virtual-number.jpg',
    badge: 'Premium',
  },
  
  // Bug Bots & Security
  {
    id: 'bug-bot-detector',
    name: {
      fr: 'Bug Bot Detector',
      en: 'Bug Bot Detector',
    },
    description: {
      fr: 'Detecteur de bugs et vulnerabilites pour vos bots WhatsApp et Telegram. Securisez vos scripts.',
      en: 'Bug and vulnerability detector for your WhatsApp and Telegram bots. Secure your scripts.',
    },
    price: 44.99,
    category: 'security',
    features: {
      fr: [
        'Scan de vulnerabilites',
        'Detection de bugs',
        'Rapport detaille',
        'Suggestions de fix',
        'Scan automatique',
        'Alertes en temps reel',
      ],
      en: [
        'Vulnerability scan',
        'Bug detection',
        'Detailed report',
        'Fix suggestions',
        'Automatic scanning',
        'Real-time alerts',
      ],
    },
    image: '/products/bug-bot.jpg',
    badge: 'Security',
  },
  {
    id: 'crash-bot',
    name: {
      fr: 'Crash Bot Protection',
      en: 'Crash Bot Protection',
    },
    description: {
      fr: 'Protection anti-crash pour vos bots avec recuperation automatique et monitoring 24/7.',
      en: 'Anti-crash protection for your bots with automatic recovery and 24/7 monitoring.',
    },
    price: 34.99,
    category: 'security',
    features: {
      fr: [
        'Protection anti-crash',
        'Recuperation auto',
        'Monitoring 24/7',
        'Logs detailles',
        'Notifications push',
        'Backup automatique',
      ],
      en: [
        'Anti-crash protection',
        'Auto recovery',
        '24/7 monitoring',
        'Detailed logs',
        'Push notifications',
        'Auto backup',
      ],
    },
    image: '/products/bug-bot.jpg',
  },
  
  // AI Products
  {
    id: 'ai-chatbot-script',
    name: {
      fr: 'AI Chatbot Script',
      en: 'AI Chatbot Script',
    },
    description: {
      fr: 'Script de chatbot IA avance utilisant les dernieres technologies de traitement du langage naturel.',
      en: 'Advanced AI chatbot script using the latest natural language processing technologies.',
    },
    price: 79.99,
    category: 'ai',
    features: {
      fr: [
        'IA conversationnelle',
        'Apprentissage continu',
        'Multi-langues',
        'Integration API facile',
        'Personnalisation complete',
        'Analyse de sentiments',
      ],
      en: [
        'Conversational AI',
        'Continuous learning',
        'Multi-language',
        'Easy API integration',
        'Full customization',
        'Sentiment analysis',
      ],
    },
    image: '/products/ai-chatbot.jpg',
    popular: true,
    badge: 'AI Powered',
  },
  {
    id: 'ai-content-generator',
    name: {
      fr: 'AI Content Generator',
      en: 'AI Content Generator',
    },
    description: {
      fr: 'Generateur de contenu IA pour vos reseaux sociaux, articles et messages marketing.',
      en: 'AI content generator for your social media, articles and marketing messages.',
    },
    price: 59.99,
    category: 'ai',
    features: {
      fr: [
        'Generation illimitee',
        'Multi-formats',
        'Tons personnalises',
        'SEO optimise',
        'Templates inclus',
        'Export facile',
      ],
      en: [
        'Unlimited generation',
        'Multi-formats',
        'Custom tones',
        'SEO optimized',
        'Templates included',
        'Easy export',
      ],
    },
    image: '/products/ai-chatbot.jpg',
  },
  
  // Automation
  {
    id: 'social-media-automation',
    name: {
      fr: 'Social Media Automation',
      en: 'Social Media Automation',
    },
    description: {
      fr: 'Outil complet d\'automatisation pour gerer tous vos reseaux sociaux depuis une seule plateforme.',
      en: 'Complete automation tool to manage all your social networks from a single platform.',
    },
    price: 59.99,
    category: 'automation',
    features: {
      fr: [
        'Multi-plateformes',
        'Planification de posts',
        'Analytics integres',
        'Gestion de commentaires',
        'Auto-reponses',
        'Export de donnees',
      ],
      en: [
        'Multi-platform',
        'Post scheduling',
        'Built-in analytics',
        'Comment management',
        'Auto-replies',
        'Data export',
      ],
    },
    image: '/products/social-automation.jpg',
  },
  {
    id: 'auto-responder-pro',
    name: {
      fr: 'Auto Responder Pro',
      en: 'Auto Responder Pro',
    },
    description: {
      fr: 'Repondeur automatique intelligent pour WhatsApp, Telegram, SMS et emails.',
      en: 'Intelligent auto responder for WhatsApp, Telegram, SMS and emails.',
    },
    price: 34.99,
    category: 'automation',
    features: {
      fr: [
        'Reponses intelligentes',
        'Multi-plateformes',
        'Regles personnalisees',
        'Horaires programmes',
        'Messages templates',
        'Statistiques',
      ],
      en: [
        'Smart responses',
        'Multi-platform',
        'Custom rules',
        'Scheduled hours',
        'Template messages',
        'Statistics',
      ],
    },
    image: '/products/social-automation.jpg',
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products
  return products.filter((p) => p.category === category)
}

export function searchProducts(query: string, lang: 'fr' | 'en'): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name[lang].toLowerCase().includes(lowerQuery) ||
      p.description[lang].toLowerCase().includes(lowerQuery)
  )
}

export function getPopularProducts(): Product[] {
  return products.filter((p) => p.popular)
}

export function getCategories(): { id: ProductCategory | 'all'; count: number }[] {
  const categories: (ProductCategory | 'all')[] = ['all', 'whatsapp', 'telegram', 'ai', 'automation', 'security', 'tools']
  return categories.map((cat) => ({
    id: cat,
    count: cat === 'all' ? products.length : products.filter((p) => p.category === cat).length,
  }))
}
