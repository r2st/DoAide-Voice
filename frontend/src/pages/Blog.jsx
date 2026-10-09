import { Link, useParams } from "react-router-dom";
import ShareButtons from "../components/ShareButtons";
import { usePageTitle } from "../hooks/usePageTitle";

function RobotFace({ size = 32, color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <line x1="16" y1="6" x2="16" y2="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="1.5" r="1.5" fill={color} />
      <rect x="5" y="6" width="22" height="17" rx="5" fill={color} />
      <ellipse cx="11" cy="13" rx="2.5" ry="3" fill="#0A0A0B" />
      <ellipse cx="21" cy="13" rx="2.5" ry="3" fill="#0A0A0B" />
      <circle cx="11.5" cy="12.5" r="1" fill={color} opacity="0.6" />
      <circle cx="21.5" cy="12.5" r="1" fill={color} opacity="0.6" />
      <path d="M12 19Q16 22 20 19" stroke="#0A0A0B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <rect x="1" y="10" width="4" height="5" rx="2" fill={color} opacity="0.8" />
      <rect x="27" y="10" width="4" height="5" rx="2" fill={color} opacity="0.8" />
    </svg>
  );
}

export const BLOG_POSTS = [
  {
    slug: "ai-voice-agents-vs-human-agents",
    title: "AI Voice Agents vs Human Agents: 2026 Comparison",
    date: "2026-09-15",
    readTime: "6 min read",
    description: "A data-driven comparison of AI voice agents and human call center agents across cost, quality, scalability, and customer satisfaction.",
    content: [
      { type: "p", text: "The call center industry is undergoing its biggest transformation since the invention of the automatic call distributor. AI voice agents — software that can hold natural phone conversations with customers — are no longer experimental. They handle millions of calls every day across industries from healthcare to e-commerce." },
      { type: "h2", text: "Cost Comparison" },
      { type: "p", text: "A full-time human agent costs between $35,000 and $55,000 per year in the US, including benefits, training, and management overhead. They handle roughly 40-60 calls per day during an 8-hour shift. AI voice agents cost a fraction of that — typically $0.05 to $0.15 per minute of conversation — and can handle unlimited concurrent calls 24/7." },
      { type: "p", text: "For a business handling 2,000 calls per month with an average handle time of 5 minutes, the math is straightforward: human agents cost roughly $3,300/month while AI agents cost approximately $800/month for the same volume, a 76% reduction." },
      { type: "h2", text: "Quality and Consistency" },
      { type: "p", text: "Human agents have good days and bad days. They get tired, frustrated, and distracted. AI agents deliver the same quality on call #1 and call #10,000. They never forget a script point, never lose their temper, and never call in sick." },
      { type: "p", text: "That said, human agents still excel at handling highly emotional situations, complex multi-step problems, and conversations that require genuine empathy. The best approach in 2026 is a hybrid model: AI handles routine calls (70-80% of volume) and seamlessly escalates complex cases to human agents." },
      { type: "h2", text: "Scalability" },
      { type: "p", text: "Scaling a human call center takes weeks to months — you need to hire, train, and onboard new agents. Scaling AI agents takes minutes. Need to handle a Black Friday surge? Your AI agents scale instantly to meet demand, then scale back down when volume drops." },
      { type: "h2", text: "Customer Satisfaction" },
      { type: "p", text: "Recent studies show that customers increasingly prefer AI agents for simple tasks like checking order status, scheduling appointments, and getting account information. The key factor is wait time: customers hate waiting on hold. AI agents answer instantly, which drives satisfaction scores higher for routine interactions." },
      { type: "h2", text: "The Bottom Line" },
      { type: "p", text: "AI voice agents are not replacing human agents — they are augmenting them. Businesses that deploy AI for routine calls while freeing human agents for high-value interactions see the best results: lower costs, higher customer satisfaction, and happier employees who focus on meaningful work." },
    ],
  },
  {
    slug: "how-to-automate-customer-calls",
    title: "How to Automate Customer Calls with AI",
    date: "2026-09-22",
    readTime: "5 min read",
    description: "A step-by-step guide to automating your business phone calls with AI voice agents, from setup to optimization.",
    content: [
      { type: "p", text: "Automating customer calls used to require a team of engineers and months of development. Today, platforms like DoAide Voice let you set up an AI voice agent in under an hour. Here is a practical guide to getting started." },
      { type: "h2", text: "Step 1: Identify Your Use Cases" },
      { type: "p", text: "Start with the calls that are highest volume and most repetitive. Common starting points include appointment scheduling, order status inquiries, business hours and location questions, payment processing, and initial lead qualification. These routine calls typically make up 60-80% of total call volume." },
      { type: "h2", text: "Step 2: Write Your Scripts" },
      { type: "p", text: "Good AI voice scripts follow a clear structure: greeting, identification of the caller's need, resolution path, and closing. Unlike rigid IVR menus, modern AI agents can handle natural conversation — but they still need guidelines on what to say, what information to collect, and when to escalate." },
      { type: "h2", text: "Step 3: Build Your Knowledge Base" },
      { type: "p", text: "Upload your FAQs, product documentation, pricing sheets, and policy documents. Your AI agent uses this knowledge base to answer questions accurately. The more comprehensive your knowledge base, the more calls your agent can handle without escalation." },
      { type: "h2", text: "Step 4: Connect Your Phone System" },
      { type: "p", text: "Most AI voice platforms integrate with Twilio or similar telephony providers. You can port your existing phone number or get a new one. Setup typically takes less than 10 minutes — enter your Twilio credentials, configure your phone number, and your agent is live." },
      { type: "h2", text: "Step 5: Monitor and Optimize" },
      { type: "p", text: "Launch with a small percentage of calls and monitor closely. Review call transcripts, check sentiment scores, and identify cases where the AI struggled. Use these insights to improve your scripts and knowledge base. Most businesses reach 80%+ automation rates within 2-3 weeks of optimization." },
      { type: "h2", text: "Common Mistakes to Avoid" },
      { type: "p", text: "Do not try to automate everything on day one. Start small and expand. Do not make your AI pretend to be human — be transparent that callers are speaking with an AI assistant. And always provide an easy way for callers to reach a human agent when needed." },
    ],
  },
  {
    slug: "voice-ai-for-small-business",
    title: "Voice AI for Small Business: A Practical Guide",
    date: "2026-09-29",
    readTime: "5 min read",
    description: "How small businesses can use AI voice agents to compete with enterprises — without enterprise budgets.",
    content: [
      { type: "p", text: "Small businesses miss 62% of incoming calls on average. Every missed call is a missed opportunity — a potential customer who may never call back. AI voice agents solve this problem by answering every call instantly, 24 hours a day, 7 days a week." },
      { type: "h2", text: "Why Small Businesses Need Voice AI" },
      { type: "p", text: "When you are a team of 5, you cannot afford a dedicated receptionist. But you also cannot afford to miss calls. AI voice agents cost as little as $0 to get started (DoAide Voice offers a free tier with 50 minutes per month) and scale with your business." },
      { type: "p", text: "The ROI is immediate: a single converted call that would have been missed can pay for months of AI agent service." },
      { type: "h2", text: "Best Use Cases for Small Business" },
      { type: "p", text: "After-hours call handling is the most impactful starting point. Your AI agent answers calls when you are closed, captures caller information, and schedules callbacks for the next business day. Other high-value use cases include appointment booking for service businesses, order status for e-commerce, and initial lead qualification for sales teams." },
      { type: "h2", text: "Getting Started on a Budget" },
      { type: "p", text: "Start with a free plan to test the waters. Use the free script templates available in the DoAide Voice scripts library. Connect a dedicated phone number (Twilio numbers start at $1/month) and forward your after-hours calls to it." },
      { type: "p", text: "As call volume grows, upgrade to a paid plan for more minutes, unlimited agents, and advanced features like sentiment analysis and campaign management." },
      { type: "h2", text: "Real Results from Real Businesses" },
      { type: "p", text: "A dental practice in Austin reduced missed appointments by 40% by using an AI agent for appointment reminders and rescheduling. A real estate agency in Miami captured 3x more leads by having an AI agent qualify inbound calls and schedule showings. A plumbing company in Denver increased after-hours bookings by 60% with a 24/7 AI receptionist." },
      { type: "h2", text: "Start Today" },
      { type: "p", text: "The barrier to entry has never been lower. You do not need technical skills, a large budget, or a long implementation timeline. Sign up for a free account, pick a script template, connect a phone number, and your AI agent is live in under an hour." },
    ],
  },
  {
    slug: "best-text-to-speech-tools-2026",
    title: "Best Text-to-Speech Tools for Business in 2026",
    date: "2026-10-06",
    readTime: "6 min read",
    description: "A comprehensive guide to the best text-to-speech tools for businesses, from free browser-based solutions to enterprise platforms.",
    content: [
      { type: "p", text: "Text-to-speech technology has evolved from robotic monotone to voices that are nearly indistinguishable from real humans. For businesses, TTS is no longer just an accessibility feature — it powers IVR systems, customer service bots, content narration, and voice agents that handle thousands of calls simultaneously." },
      { type: "h2", text: "Browser-Based TTS: Free and Instant" },
      { type: "p", text: "Modern browsers include the Web Speech API, which provides text-to-speech functionality with zero setup. Chrome, Edge, and Safari all ship with multiple voices across dozens of languages. For quick prototyping, internal tools, or lightweight applications, browser TTS is the fastest path — you can try it right now with DoAide Voice's free Text-to-Speech tool." },
      { type: "p", text: "The tradeoff is quality. Browser voices are functional but rarely pass for human speech. They lack emotional nuance, natural pausing, and the prosody that makes conversation feel real. For customer-facing applications, you will want something more sophisticated." },
      { type: "h2", text: "Cloud TTS Services" },
      { type: "p", text: "Google Cloud Text-to-Speech, Amazon Polly, and Azure Cognitive Services offer neural voices that sound remarkably natural. These services support SSML (Speech Synthesis Markup Language) for fine-grained control over pronunciation, emphasis, and pacing. Pricing typically runs $4 to $16 per million characters, making them cost-effective at scale." },
      { type: "p", text: "For most businesses, the choice comes down to existing cloud provider relationships and specific language requirements. Google leads in language variety, Amazon Polly excels in real-time streaming, and Azure offers the most customizable neural voices through their Custom Neural Voice program." },
      { type: "h2", text: "TTS for Voice Agents and IVR" },
      { type: "p", text: "When TTS is part of a voice agent — an AI system that holds phone conversations — latency matters as much as quality. Callers expect responses within 500 milliseconds. The best voice agent platforms pre-cache common responses, use streaming TTS, and fall back to pre-recorded audio for greetings and standard phrases." },
      { type: "h2", text: "Choosing the Right TTS for Your Business" },
      { type: "p", text: "Start with your use case. Internal tools and prototypes work fine with browser TTS. Customer notifications and IVR menus benefit from cloud neural voices. Full conversational AI agents need low-latency streaming with voice cloning capabilities. In every case, test with real users — the best-sounding voice in a demo may not be the most effective in production." },
    ],
  },
  {
    slug: "speech-to-text-for-business-calls",
    title: "Speech-to-Text for Business Calls: Complete Guide",
    date: "2026-10-08",
    readTime: "7 min read",
    description: "How speech-to-text technology is transforming business communication — from call transcription to real-time analytics.",
    content: [
      { type: "p", text: "Every business phone call contains valuable data — customer sentiment, product feedback, competitive intelligence, compliance risk. But until recently, extracting that data required someone to listen to every call. Speech-to-text technology changes the equation entirely, turning hours of audio into searchable, analyzable text in seconds." },
      { type: "h2", text: "How Speech-to-Text Works" },
      { type: "p", text: "Modern STT systems use deep neural networks trained on millions of hours of speech. They convert audio waveforms into text through a pipeline of acoustic modeling (what sounds are being made), language modeling (what words those sounds form), and punctuation prediction. The best systems achieve word error rates below 5% for clean audio in supported languages." },
      { type: "h2", text: "Real-Time vs Batch Transcription" },
      { type: "p", text: "Real-time transcription processes audio as it arrives, delivering text within 1-2 seconds of speech. This powers live captioning, real-time sentiment analysis, and agent assist tools that suggest responses during active calls. Batch transcription processes recorded audio after the fact, typically with higher accuracy since the model can use future context to resolve ambiguities." },
      { type: "p", text: "For call centers, both modes serve different needs. Real-time transcription helps agents during live calls. Batch transcription feeds quality assurance, compliance review, and analytics pipelines. Most organizations deploy both." },
      { type: "h2", text: "STT for Call Centers" },
      { type: "p", text: "Call center transcription goes beyond raw text. Advanced systems perform speaker diarization (who said what), sentiment analysis (how the caller feels), topic detection (what the call is about), and entity extraction (names, account numbers, dates). This structured data drives dashboards that show call trends, agent performance, and customer satisfaction in real time." },
      { type: "h2", text: "Accuracy and Language Support" },
      { type: "p", text: "Accuracy depends on audio quality, speaker accents, domain vocabulary, and background noise. Phone audio (8kHz narrowband) is harder to transcribe than studio recordings. Custom vocabulary lists and domain-specific fine-tuning can improve accuracy by 10-15% for specialized industries like healthcare or legal." },
      { type: "p", text: "Language support varies by provider. Major cloud services support 50+ languages, but accuracy drops significantly for low-resource languages. If your business serves multilingual customers, test each language individually rather than relying on published benchmarks." },
      { type: "h2", text: "Privacy and Compliance" },
      { type: "p", text: "Call transcription raises privacy considerations. Many jurisdictions require two-party consent for call recording. Transcripts may contain sensitive personal information subject to GDPR, HIPAA, or PCI-DSS regulations. Choose a transcription provider that offers data residency options, encryption at rest and in transit, and automatic PII redaction for compliance-sensitive industries." },
      { type: "h2", text: "Getting Started" },
      { type: "p", text: "You can try speech-to-text right now with DoAide Voice's free Speech-to-Text tool — it runs entirely in your browser with no data sent to any server. For production use, platforms like DoAide Voice integrate transcription directly into your voice agent workflow, automatically transcribing every call and feeding the results into your analytics dashboard." },
    ],
  },
  {
    slug: "ai-voice-script-writing-guide",
    title: "How to Write AI Voice Scripts That Convert",
    date: "2026-10-10",
    readTime: "5 min read",
    description: "Learn the art of writing effective scripts for AI voice agents — from greeting to close, with templates and best practices.",
    content: [
      { type: "p", text: "A voice agent is only as good as its script. The best AI in the world will fail if the words it speaks do not resonate with callers. Writing scripts for AI voice agents is a distinct skill — different from writing for humans, chatbots, or IVR menus. Here is what works." },
      { type: "h2", text: "Why Scripts Matter More Than You Think" },
      { type: "p", text: "Human agents improvise. They read tone, adjust pacing, and recover from awkward moments naturally. AI agents follow scripts. They can branch based on caller responses and access knowledge bases, but the core conversation flow is defined by the script. A well-written script makes the AI sound natural; a poorly written one makes it sound like a robot reading a manual." },
      { type: "h2", text: "Anatomy of a Great Voice Script" },
      { type: "p", text: "Every effective voice script has three parts. The greeting establishes identity and purpose in under 10 seconds — callers decide within those first moments whether to stay on the line. The body handles the core interaction with clear branching for common responses. The closing confirms any actions taken and leaves a positive impression." },
      { type: "p", text: "Within the body, keep individual agent responses under 30 words. Long monologues lose callers. Use questions to keep the conversation interactive. And always include an escalation path — callers should be able to reach a human at any point." },
      { type: "h2", text: "Common Mistakes" },
      { type: "p", text: "The biggest mistake is writing scripts that sound like written text. Spoken language is shorter, simpler, and more repetitive than written language. Read your scripts aloud before deploying them. If a sentence feels unnatural to speak, rewrite it. Avoid jargon, complex sentence structures, and anything that requires the caller to remember information from earlier in the call." },
      { type: "p", text: "Another common mistake is not planning for the unexpected. Callers will say things your script does not anticipate. Build robust default responses that gracefully handle off-script moments without breaking the conversation flow." },
      { type: "h2", text: "Industry-Specific Tips" },
      { type: "p", text: "Healthcare scripts must balance warmth with precision — patients need reassurance, but appointment details must be exact. Real estate scripts should qualify leads quickly — ask about budget and timeline early. E-commerce scripts should proactively offer solutions — do not wait for the caller to describe their problem in full before suggesting a resolution." },
      { type: "h2", text: "A/B Testing Your Scripts" },
      { type: "p", text: "The best scripts are never finished on the first draft. Run A/B tests with different greetings, different question orders, and different closing phrases. Track conversion rates, call duration, and sentiment scores for each variant. Small changes — like saying 'How can I help you?' versus 'What can I do for you today?' — can move metrics by 5-10%." },
      { type: "h2", text: "Let AI Write Your First Draft" },
      { type: "p", text: "DoAide Voice's free AI Script Writer generates professional voice scripts for any industry and scenario in seconds. Use it as a starting point, then customize the output for your brand voice. Combined with A/B testing, this approach gets you to an optimized script faster than writing from scratch." },
    ],
  },
];

function BlogList() {
  usePageTitle("Blog — DoAide Voice");
  return (
    <div className="viral-page">
      <div className="viral-header">
        <h1>DoAide Voice Blog</h1>
        <p>Insights and guides on AI voice agents for business.</p>
      </div>
      <div className="blog-list">
        {BLOG_POSTS.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card">
            <span className="blog-card-date">{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} &middot; {post.readTime}</span>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <span className="blog-card-read">Read article &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function BlogPost({ post }) {
  usePageTitle(`${post.title} — DoAide Voice Blog`);
  return (
    <div className="viral-page">
      <article className="blog-article">
        <div className="blog-article-header">
          <Link to="/blog" className="blog-back">&larr; All Articles</Link>
          <span className="blog-card-date">{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} &middot; {post.readTime}</span>
          <h1>{post.title}</h1>
          <p className="blog-article-desc">{post.description}</p>
        </div>
        <div className="blog-article-body">
          {post.content.map((block, i) => {
            if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
            return <p key={i}>{block.text}</p>;
          })}
        </div>
        <div className="demo-cta-section">
          <h2>Ready to Try AI Voice Agents?</h2>
          <p>Start free with 50 minutes/month. No credit card required.</p>
          <Link to="/register" className="btn btn-primary" style={{ padding: "0.7rem 2rem" }}>Get Started Free</Link>
        </div>
        <div className="viral-share-section">
          <p>Share this article</p>
          <ShareButtons url={`https://voice.doaide.com/blog/${post.slug}`} text={post.title} />
        </div>
      </article>
    </div>
  );
}

export default function Blog() {
  const { slug } = useParams();
  const post = slug ? BLOG_POSTS.find((p) => p.slug === slug) : null;

  return (
    <div className="landing-root">
      <header className="landing-header landing-visible">
        <a href="https://doaide.com" className="landing-brand">
          <RobotFace size={28} color="#F0B429" />
          <span className="landing-brand-text">DoAide <em>Voice</em></span>
        </a>
        <div style={{ marginLeft: "auto", display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <Link to="/" className="btn btn-ghost">Home</Link>
          <Link to="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </header>

      <main>
        {post ? <BlogPost post={post} /> : <BlogList />}
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-bottom">
          <a href="https://doaide.com" className="landing-footer-home">
            <RobotFace size={16} color="#F0B429" />
            doaide.com
          </a>
          <span className="landing-footer-copy">&copy; 2026 DoAide</span>
        </div>
      </footer>
    </div>
  );
}
