/**
 * Novixel Products Data
 * Central configuration for all products
 * 
 * To add a new product:
 * 1. Add entry here
 * 2. Create HTML page using template (see PRODUCT_TEMPLATE.html)
 * 3. Add Stripe Payment Link
 */

const NOVIXEL_PRODUCTS = {
    // =========================================
    // AI & Dev Tools
    // =========================================
    'turbo': {
        id: 'turbo',
        name: 'Turbo',
        tagline: 'AI performance layer for OpenClaw',
        description: '50-100x faster responses, 60-90% cheaper. Zero-token execution for routine requests.',
        category: 'ai',
        accent: 'cyan',
        icon: '⚡',
        
        pricing: {
            price: 49,
            
            currency: 'CAD',
            type: 'one-time',
            badge: 'ONE LICENSE'
        },
        
        stripeLink: 'https://buy.stripe.com/bJe4gy9ya4D4glf7kigUM0k',
        
        // For checkout-success/
        downloads: {
            main: {
                url: 'https://github.com/novixel/turbo/releases/latest/download/turbo.zip',
                label: 'Download Turbo (ZIP)'
            },
            additional: [
                { url: '#', label: 'Installation Guide (PDF)', icon: 'fa-file-pdf' },
                { url: '#', label: 'Configuration Examples', icon: 'fa-code' }
            ]
        },
        
        features: [
            'Zero-token execution',
            'Auto-learning system',
            'Drop-in integration',
            'Performance metrics',
            'Lifetime updates'
        ],
        
        stats: [
            { value: '58,000x', label: 'Faster Responses' },
            { value: '64%', label: 'Recognition Rate' },
            { value: '$5,226', label: 'Saved Per Year' }
        ],
        
        page: 'turbo/',
        featured: true
    },

    'ai-starter-kit': {
        id: 'ai-starter-kit',
        name: 'AI Automation Starter Kit',
        tagline: 'Everything you need to start automating with AI',
        description: 'Templates, guides, workflows, and example projects to get you building in minutes.',
        category: 'ai',
        accent: 'cyan',
        icon: '🚀',
        
        pricing: {
            price: 0,
            currency: 'CAD',
            type: 'pwyw', // pay-what-you-want
            badge: 'PAY WHAT YOU WANT'
        },
        
        stripeLink: 'https://buy.stripe.com/7sY4gy11E2uWfhb8omgUM0l',
        
        downloads: {
            main: {
                url: 'https://github.com/novixel/ai-starter-kit/releases/latest/download/ai-starter-kit.zip',
                label: 'Download Starter Kit (ZIP)'
            },
            additional: [
                { url: '#', label: 'Getting Started Guide (PDF)', icon: 'fa-file-pdf' },
                { url: '#', label: 'Video Walkthrough (MP4)', icon: 'fa-video' }
            ]
        },
        
        features: [
            'Getting Started Guide (20 pages)',
            '5 Automation Templates',
            '50+ Prompt Library',
            'Tool Comparison Chart',
            'Video Walkthrough',
            'Lifetime Updates'
        ],
        
        page: 'ai-starter-kit.html'
    },

    'atomic-diff': {
        id: 'atomic-diff',
        name: 'Atomic Diff',
        tagline: 'Precise code diff tool for AI-assisted development',
        description: 'See exactly what changed, nothing more. Perfect for reviewing AI-generated code changes.',
        category: 'ai',
        accent: 'purple',
        icon: '⚛️',
        
        pricing: {
            price: 0,
            currency: 'CAD',
            type: 'free',
            badge: 'FREE'
        },
        
        downloads: {
            main: {
                url: '#',
                label: 'Get Atomic Diff'
            }
        },
        
        page: 'atomic.html'
    },

    // =========================================
    // Courses
    // =========================================
    'ai-assistant-course': {
        id: 'ai-assistant-course',
        name: 'Build Your First AI Assistant',
        tagline: 'Complete course on building AI assistants from scratch',
        description: 'Video lessons, code examples, and hands-on projects. Go from zero to deployed assistant.',
        category: 'courses',
        accent: 'blue',
        icon: '🤖',
        
        pricing: {
            price: 97,
            currency: 'CAD',
            type: 'one-time',
            badge: 'FULL COURSE'
        },
        
        stripeLink: 'https://buy.stripe.com/00eVcfWy1qS3ytdIGgUM0f',
        
        downloads: {
            main: {
                url: '#',
                label: 'Access Course'
            },
            additional: [
                { url: '#', label: 'Course Materials (ZIP)', icon: 'fa-file-archive' },
                { url: '#', label: 'Code Examples', icon: 'fa-code' }
            ]
        },
        
        features: [
            '8+ hours of video content',
            'Hands-on projects',
            'Full source code',
            'Discord community access',
            'Lifetime updates'
        ],
        
        page: 'ai-assistant-course.html'
    },

    'ai-fundamentals': {
        id: 'ai-fundamentals',
        name: 'AI Fundamentals: Transformers to Memory',
        tagline: 'Deep dive into how AI actually works',
        description: 'Understand transformers, attention mechanisms, embeddings, and memory systems.',
        category: 'courses',
        accent: 'blue',
        icon: '🎓',
        
        pricing: {
            price: 29,
            currency: 'CAD',
            type: 'one-time',
            badge: 'SELF-PACED COURSE'
        },
        
        stripeLink: 'https://buy.stripe.com/5kQfZgh0Cc5w7OJdIGgUM0h',
        
        downloads: {
            main: {
                url: '#',
                label: 'Access Course'
            }
        },
        
        features: [
            '4 in-depth modules',
            '3+ hours of video',
            'Hands-on exercises',
            'Code examples',
            'Lifetime access'
        ],
        
        curriculum: [
            {
                title: 'Foundations of Neural Networks',
                duration: '45 min',
                lessons: [
                    'What is a neural network?',
                    'Layers, weights, and biases',
                    'Activation functions explained',
                    'Backpropagation and training',
                    'Hands-on: Build a simple neural network'
                ]
            },
            {
                title: 'Embeddings & Vector Spaces',
                duration: '40 min',
                lessons: [
                    'What are embeddings?',
                    'Word2Vec and semantic meaning',
                    'Vector similarity and search',
                    'Embedding dimensions and trade-offs',
                    'Hands-on: Semantic search with embeddings'
                ]
            },
            {
                title: 'Transformers & Attention',
                duration: '60 min',
                lessons: [
                    'The attention mechanism',
                    'Self-attention and cross-attention',
                    'Multi-head attention',
                    'Transformer architecture deep dive',
                    'GPT vs BERT: Decoder vs Encoder',
                    'Hands-on: Attention visualization'
                ]
            },
            {
                title: 'Memory Systems & RAG',
                duration: '50 min',
                lessons: [
                    'Context windows and limitations',
                    'External memory and retrieval',
                    'RAG: Retrieval Augmented Generation',
                    'Vector databases explained',
                    'Hands-on: Build a RAG system'
                ]
            }
        ],
        
        page: 'ai-fundamentals.html'
    },

    'course-bundle': {
        id: 'course-bundle',
        name: 'AI Course Bundle',
        tagline: 'Both AI courses at a discount',
        description: 'AI Fundamentals + Build Your First AI Assistant. Save $27.',
        category: 'courses',
        accent: 'blue',
        icon: '📚',
        
        pricing: {
            price: 99,
            originalPrice: 126,
            currency: 'CAD',
            type: 'one-time',
            badge: 'BUNDLE & SAVE'
        },
        
        stripeLink: 'https://buy.stripe.com/eVq28qeSu5H85GB6gegUM0d',
        
        downloads: {
            main: {
                url: '#',
                label: 'Access Courses'
            }
        },
        
        features: [
            'AI Fundamentals course',
            'Build Your First AI Assistant course',
            '8+ hours of content',
            'All code & materials',
            'Lifetime access',
            'Save $27'
        ],
        
        page: 'course-bundle.html'
    },

    // =========================================
    // Templates
    // =========================================
    'landing-page-bundle': {
        id: 'landing-page-bundle',
        name: 'Landing Page Template Bundle',
        tagline: '4 premium landing page templates in one bundle',
        description: 'SaaS, Agency, Mobile App, and Portfolio designs. Clean HTML/CSS, fully responsive.',
        category: 'templates',
        accent: 'pink',
        icon: '📦',
        
        pricing: {
            price: 49,
            currency: 'CAD',
            type: 'one-time',
            badge: '4 TEMPLATES'
        },
        
        stripeLink: 'https://buy.stripe.com/4gM4gyh0C2uWd939sqgUM0e',
        
        downloads: {
            main: {
                url: 'https://21c3b3af025b8eed239861dda489adb3.r2.cloudflarestorage.com/novixel-downloads/Landing-Page-Bundle.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=bf0769abed437a7a0a8582c9bfcd5122%2F20260307%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260307T203010Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=3ea04364e4ce82abebbb6b012a976b759f6179ed90ea78c2e65069ed71f5192a',
                label: 'Download All Templates (ZIP)'
            }
        },
        
        features: [
            '4 complete landing pages',
            'Clean HTML5 & CSS3',
            'Fully responsive design',
            'Dark & light modes',
            'SEO-friendly markup',
            'Lifetime updates'
        ],
        
        page: 'landing-page-bundle.html'
    },

    'pulse-template': {
        id: 'pulse-template',
        name: 'Pulse — Mobile App Landing',
        tagline: 'Modern mobile app landing page template',
        description: 'App store buttons, feature sections, testimonials, and pricing.',
        category: 'templates',
        accent: 'pink',
        icon: '📱',
        
        pricing: {
            price: 29,
            currency: 'CAD',
            type: 'one-time'
        },
        
        stripeLink: 'https://buy.stripe.com/eVqaEWfWyb1sd939sqgUM0i',
        
        downloads: {
            main: {
                url: 'https://21c3b3af025b8eed239861dda489adb3.r2.cloudflarestorage.com/novixel-downloads/Pulse-App-Template.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=bf0769abed437a7a0a8582c9bfcd5122%2F20260307%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260307T203006Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=68b88fab13188714eaf808021718138a533355c7f423268f07ac28a63fcc56c6',
                label: 'Download Pulse Template (ZIP)'
            }
        },
        
        page: 'pulse-template.html'
    },

    'forge-template': {
        id: 'forge-template',
        name: 'Forge — Creative Agency',
        tagline: 'Bold creative agency template',
        description: 'Portfolio showcase, team section, services, and contact form.',
        category: 'templates',
        accent: 'pink',
        icon: '🎨',
        
        pricing: {
            price: 29,
            currency: 'CAD',
            type: 'one-time'
        },
        
        stripeLink: 'https://buy.stripe.com/fZudR88u67Pgglf6gegUM0g',
        
        downloads: {
            main: {
                url: 'https://21c3b3af025b8eed239861dda489adb3.r2.cloudflarestorage.com/novixel-downloads/Forge-Agency-Template.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=bf0769abed437a7a0a8582c9bfcd5122%2F20260307%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260307T203008Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=1ad961f6e218eb70c2fe4edb22e9d0657b501512d1d7cb8a6c43b9fbc87f1010',
                label: 'Download Forge Template (ZIP)'
            }
        },
        
        page: 'forge-template.html'
    },

    'starter-template': {
        id: 'starter-template',
        name: 'Starter — SaaS Landing',
        tagline: 'Clean SaaS landing page template',
        description: 'Hero, features, pricing table, testimonials, and FAQ.',
        category: 'templates',
        accent: 'pink',
        icon: '🚀',
        
        pricing: {
            price: 29,
            currency: 'CAD',
            type: 'one-time'
        },
        
        stripeLink: 'https://buy.stripe.com/9B67sKeSu0mO2up5cagUM0j',
        
        downloads: {
            main: {
                url: 'https://21c3b3af025b8eed239861dda489adb3.r2.cloudflarestorage.com/novixel-downloads/Starter-SaaS-Template.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=bf0769abed437a7a0a8582c9bfcd5122%2F20260307%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260307T203009Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=e4390a9c845baedc9bcfd78d8d4548de14059097ea2921200f4a1a6767cb22fb',
                label: 'Download Starter Template (ZIP)'
            }
        },
        
        page: 'starter-template.html'
    },

    // =========================================
    // Creative Works
    // =========================================
    'galactic-empire-01': {
        id: 'galactic-empire-01',
        name: 'Galactic Empire: The Rubble',
        tagline: 'Short Story 01 in the Galactic Empire series',
        description: 'A tale of survival in the aftermath of interstellar war.',
        category: 'creative',
        accent: 'purple',
        icon: '🌌',
        
        pricing: {
            price: 1,
            currency: 'CAD',
            type: 'pwyw'
        },
        
        stripeLink: 'https://buy.stripe.com/14AdR8fWy2uW6KF1ZYgUM0n',
        
        downloads: {
            main: { url: '#', label: 'Download (EPUB)' },
            additional: [
                { url: '#', label: 'PDF Version', icon: 'fa-file-pdf' }
            ]
        },
        
        page: 'galactic-empire-01.html'
    },

    'galactic-empire-02': {
        id: 'galactic-empire-02',
        name: 'Galactic Empire: Ore and Blood',
        tagline: 'Short Story 02 in the Galactic Empire series',
        description: 'The price of resources in a galaxy torn by conflict.',
        category: 'creative',
        accent: 'purple',
        icon: '⚔️',
        
        pricing: {
            price: 2,
            currency: 'CAD',
            type: 'pwyw'
        },
        
        stripeLink: 'https://buy.stripe.com/3cI14m7q2glMglfdIGgUM0o',
        
        downloads: {
            main: { url: '#', label: 'Download (EPUB)' },
            additional: [
                { url: '#', label: 'PDF Version', icon: 'fa-file-pdf' }
            ]
        },
        
        page: 'galactic-empire-02.html'
    },

    // =========================================
    // Enterprise
    // =========================================
    'youtube-curator': {
        id: 'youtube-curator',
        name: 'Automated YouTube Shorts AI Curator',
        tagline: 'Complete faceless YouTube channel automation',
        description: 'AI-powered content curation, editing, and scheduling. Done-for-you setup.',
        category: 'enterprise',
        accent: 'amber',
        icon: '🎬',
        
        pricing: {
            price: 2000,
            currency: 'CAD',
            type: 'one-time',
            badge: 'ENTERPRISE'
        },
        
        stripeLink: 'https://buy.stripe.com/aFa3cu25Ib1s1qleMKgUM0m',
        
        downloads: {
            main: { url: '#', label: 'Schedule Setup Call' }
        },
        
        page: 'youtube-curator.html'
    }
};

// =========================================
// Categories Configuration
// =========================================
const PRODUCT_CATEGORIES = {
    ai: {
        id: 'ai',
        name: 'AI & Dev Tools',
        description: 'Performance tools and automation for AI development',
        icon: 'fa-microchip',
        accent: 'cyan'
    },
    courses: {
        id: 'courses',
        name: 'Courses & Learning',
        description: 'Learn AI development from fundamentals to advanced',
        icon: 'fa-graduation-cap',
        accent: 'blue'
    },
    templates: {
        id: 'templates',
        name: 'Templates',
        description: 'Professional landing pages and web templates',
        icon: 'fa-palette',
        accent: 'pink'
    },
    creative: {
        id: 'creative',
        name: 'Creative Works',
        description: 'Short stories and creative content',
        icon: 'fa-book',
        accent: 'purple'
    },
    enterprise: {
        id: 'enterprise',
        name: 'Enterprise Solutions',
        description: 'Custom automation and high-value solutions',
        icon: 'fa-building',
        accent: 'amber'
    }
};

// =========================================
// Helper Functions
// =========================================

/**
 * Get product by ID
 */
function getProduct(id) {
    return NOVIXEL_PRODUCTS[id] || null;
}

/**
 * Get all products in a category
 */
function getProductsByCategory(categoryId) {
    return Object.values(NOVIXEL_PRODUCTS).filter(p => p.category === categoryId);
}

/**
 * Get featured products
 */
function getFeaturedProducts() {
    return Object.values(NOVIXEL_PRODUCTS).filter(p => p.featured);
}

/**
 * Format price for display
 */
function formatPrice(product) {
    const { price, originalPrice, currency, type } = product.pricing;
    
    if (type === 'free') return 'Free';
    if (type === 'pwyw') return price === 0 ? 'Free+' : `$${price}+`;
    
    let priceStr = `$${price}`;
    if (originalPrice) {
        priceStr = `<span class="old">$${originalPrice}</span>${priceStr}`;
    }
    return priceStr;
}

/**
 * Get checkout success URL for a product
 */
function getSuccessUrl(productId) {
    return `https://novixel.ca/checkout-success/?product=${productId}`;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NOVIXEL_PRODUCTS, PRODUCT_CATEGORIES, getProduct, getProductsByCategory, formatPrice };
}




