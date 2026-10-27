import { Link, useParams } from "react-router-dom";
import ShareButtons from "../components/ShareButtons";
import { usePageTitle } from "../hooks/usePageTitle";
import { BLOG_POSTS } from "../data/blogPosts";

export { BLOG_POSTS };

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
          <span className="landing-brand-text">
            <span className="landing-brand-doaide">DoAide</span>
            <span className="landing-brand-sep">|</span>
            <span className="landing-brand-product">Voice</span>
          </span>
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
            <span style={{ color: "#0D9488", fontWeight: 700 }}>DoAide</span>
          </a>
          <span className="landing-footer-badge">A DoAide Product</span>
          <span className="landing-footer-copy">&copy; 2026 DoAide</span>
        </div>
      </footer>
    </div>
  );
}
