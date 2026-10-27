/**
 * SEO metadata for every public, indexable route. Shared by the useSEO hook
 * (wired in App) and scripts/prerender-routes.mjs (static HTML, sitemap,
 * serve.json), so keep it plain JS with no JSX or browser-only imports.
 * Sign-in pages and the signed-in app are deliberately absent.
 */

import { BLOG_POSTS } from './data/blogPosts.js'

export const SITE = {
  name: 'DoAide Voice',
  baseUrl: 'https://voice.doaide.com',
  ogImage: 'https://voice.doaide.com/og-voice.png',
}

const ORG = { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' }

// Product, FAQ and free-tools list, home page only (moved from index.html,
// where they were stamped on every URL).
const HOME_GRAPH = [
    {
      "@type": "SoftwareApplication",
      "name": "DoAide Voice",
      "url": "https://voice.doaide.com",
      "description": "AI Voice Agent Platform for Businesses — build, deploy, and manage intelligent voice agents that handle inbound calls, run outbound campaigns, and deliver real-time insights.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": [
        {
          "@type": "Offer",
          "name": "Free Plan",
          "price": "0",
          "priceCurrency": "USD",
          "description": "50 minutes per month, 2 voice agents"
        },
        {
          "@type": "Offer",
          "name": "Pro Plan",
          "price": "49",
          "priceCurrency": "USD",
          "description": "500 minutes per month, unlimited agents"
        }
      ],
      "author": {
        "@type": "Organization",
        "name": "DoAide",
        "url": "https://doaide.com"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are AI voice agents?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI voice agents are intelligent virtual assistants that handle phone calls using natural language processing. They can greet callers, answer questions, collect information, and route calls — all without human intervention."
          }
        },
        {
          "@type": "Question",
          "name": "Is DoAide Voice really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The free plan includes 50 minutes per month, 2 voice agents, call transcripts, and basic analytics — no credit card required. Paid plans start at $49/month for higher volumes."
          }
        },
        {
          "@type": "Question",
          "name": "Can I run outbound campaigns?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Upload a contact list, set a schedule, and launch automated outbound campaigns. Your AI agent calls each contact, follows your script, and logs the outcome with full analytics."
          }
        }
      ]
    },
    {
      "@type": "ItemList",
      "name": "DoAide Voice Free Tools",
      "description": "Free voice AI tools — no login required",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Text-to-Speech Preview",
          "url": "https://voice.doaide.com/tts"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Voice Recorder",
          "url": "https://voice.doaide.com/recorder"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Speech-to-Text Demo",
          "url": "https://voice.doaide.com/stt"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "AI Script Writer",
          "url": "https://voice.doaide.com/script-writer"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Voice AI Demo",
          "url": "https://voice.doaide.com/demo"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "ROI Calculator",
          "url": "https://voice.doaide.com/calculator"
        },
        {
          "@type": "ListItem",
          "position": 7,
          "name": "Script Library",
          "url": "https://voice.doaide.com/scripts"
        },
        {
          "@type": "ListItem",
          "position": 8,
          "name": "Embed Widget",
          "url": "https://voice.doaide.com/embed"
        }
      ]
    }
  ]

// Fit "<title> | DoAide Voice" into ~70 chars; long titles go without it.
const withSuffix = (title) => (`${title} | DoAide Voice`.length <= 70 ? `${title} | DoAide Voice` : title)

const tool = (path, h1, title, description) => ({ path, h1, title: withSuffix(title), description, kind: 'tool' })

export const routes = [
  {
    path: '/',
    kind: 'home',
    h1: 'Your AI Receptionist is Ready',
    title: 'DoAide Voice — AI Voice Agents & Receptionist for Businesses',
    description:
      'Build AI voice agents that answer inbound calls from your knowledge base and run outbound campaigns, with call analytics. Free: 50 min/month.',
  },
  {
    path: '/pricing',
    kind: 'page',
    h1: 'Simple, Transparent Pricing',
    title: withSuffix('Pricing — Free, Pro $49 & Enterprise'),
    description:
      'Free: 50 minutes a month and 2 voice agents. Pro ($49/mo): 500 minutes, unlimited agents and campaigns. Enterprise: custom pricing.',
  },
  tool('/demo', 'Try AI Voice Agent Demo', 'AI Voice Agent Demo — Try It in Your Browser',
    'Experience how an AI voice agent handles real customer conversations, right in your browser. Free demo, no sign-up.'),
  tool('/calculator', 'AI Voice Agent ROI Calculator', 'AI Voice Agent ROI Calculator',
    'See how much your business could save by handling calls with an AI voice agent instead of staffing every shift. Free ROI calculator.'),
  tool('/scripts', 'AI Voice Agent Scripts Library', 'Free AI Voice Agent Scripts Library',
    'Free, ready-to-use call scripts for common business scenarios like appointment booking, lead qualification and support.'),
  tool('/tts', 'Free Text-to-Speech Preview', 'Free Text to Speech Online — Preview Voices',
    'Type or paste any text and hear it spoken in different voices, right in your browser. Free text-to-speech preview, no login.'),
  tool('/recorder', 'Free Voice Recorder', 'Free Online Voice Recorder — Record in Browser',
    'Record audio directly in your browser, play it back and download it. Free online voice recorder, nothing is uploaded.'),
  tool('/stt', 'Free Speech-to-Text Demo', 'Free Speech to Text Online — Live Transcription',
    'Speak into your microphone and watch your words appear as text in real time. Free online speech-to-text demo.'),
  tool('/script-writer', 'Free AI Voice Script Generator', 'Free AI Voice Script Generator',
    'Generate professional voice agent and call scripts with AI for your business in seconds. Free, no sign-up required.'),
  {
    path: '/embed',
    kind: 'page',
    h1: 'Embed AI Voice Widget',
    title: withSuffix('Embed an AI Voice Widget on Your Website'),
    description: 'Add a "Talk to AI" button to your website so visitors can speak with your AI voice agent.',
  },
  {
    path: '/blog',
    kind: 'blog',
    h1: 'DoAide Voice Blog',
    title: withSuffix('AI Voice Agents Blog — Guides for Businesses'),
    description: 'Insights and guides on AI voice agents, call automation, text to speech and transcription for businesses.',
  },
  ...BLOG_POSTS.map((p) => ({
    path: `/blog/${p.slug}`,
    kind: 'post',
    h1: p.title,
    title: withSuffix(p.title),
    description: p.description,
    published: p.published,
    faqs: p.faqs,
  })),
]

export const canonicalFor = (path) => `${SITE.baseUrl}${path}`

export const metaForPath = (path) => routes.find((r) => r.path === path)

export function jsonLdFor(route) {
  const url = canonicalFor(route.path)
  let main
  switch (route.kind) {
    case 'home':
      return { '@context': 'https://schema.org', '@graph': HOME_GRAPH }
    case 'tool':
      main = {
        '@type': 'WebApplication',
        name: route.h1,
        url,
        description: route.description,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        isPartOf: { '@type': 'WebSite', name: SITE.name, url: canonicalFor('/') },
      }
      break
    case 'post':
      main = {
        '@type': 'BlogPosting',
        headline: route.h1,
        description: route.description,
        url,
        mainEntityOfPage: url,
        datePublished: route.published,
        author: ORG,
        publisher: ORG,
      }
      break
    default:
      main = {
        '@type': route.kind === 'blog' ? 'Blog' : 'WebPage',
        name: route.h1,
        url,
        description: route.description,
        isPartOf: { '@type': 'WebSite', name: SITE.name, url: canonicalFor('/') },
      }
  }
  const graph = [main]
  if (route.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: route.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}
