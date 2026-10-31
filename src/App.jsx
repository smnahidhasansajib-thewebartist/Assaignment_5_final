import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Github,
  Layers3,
  Linkedin,
  Menu,
  Search,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'Technologies', href: '#technologies' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

function Brand({ footer = false }) {
  return (
    <a className={`brand${footer ? ' brand--footer' : ''}`} href="#home" aria-label="Dev Stack home">
      <img src="/assets/logo-text.png" alt="" />
      <span>Dev Stack</span>
    </a>
  );
}

function TechnologyCard({ technology, added, onAdd }) {
  return (
    <article className="technology-card">
      <div className="technology-card__topline">
        <div className="technology-icon">
          <img src={technology.icon} alt={`${technology.name} logo`} loading="lazy" />
        </div>
        <span className="technology-badge">{technology.badge}</span>
      </div>
      <div className="technology-card__title-row">
        <h3>{technology.name}</h3>
        <span className="rating"><Star size={14} fill="currentColor" /> {technology.rating.toFixed(1)}</span>
      </div>
      <p className="technology-description">{technology.description}</p>
      <div className="technology-meta">
        <span className="category-chip">{technology.category}</span>
        <span className="difficulty">{technology.difficulty}</span>
      </div>
      <button className={`add-button${added ? ' is-added' : ''}`} onClick={() => onAdd(technology)} disabled={added}>
        {added ? <><Check size={15} /> Added to Stack</> : <><span>Add to Stack</span><ArrowRight size={15} /></>}
      </button>
    </article>
  );
}

function StackPanel({ stack, onRemove, onClear }) {
  return (
    <aside className="stack-panel" aria-labelledby="stack-title">
      <div className="stack-panel__header">
        <div>
          <div className="eyebrow"><Layers3 size={14} /> YOUR COLLECTION</div>
          <h2 id="stack-title">Your Stack</h2>
        </div>
        <span className="stack-count">{stack.length}</span>
      </div>
      <div className="stack-panel__subhead">
        <span>{stack.length} {stack.length === 1 ? 'technology' : 'technologies'} selected</span>
        {stack.length > 0 && <button className="text-button" onClick={onClear}>Remove all</button>}
      </div>
      {stack.length === 0 ? (
        <div className="stack-empty">
          <div className="empty-illustration"><Layers3 size={24} /></div>
          <h3>Your next great stack starts here.</h3>
          <p>Save the technologies you want to build with and find them all in one place.</p>
          <a href="#technologies">Browse technologies <ArrowRight size={14} /></a>
        </div>
      ) : (
        <ul className="stack-list">
          {stack.map((technology) => (
            <li className="stack-item" key={technology.id}>
              <div className="stack-item__icon"><img src={technology.icon} alt="" /></div>
              <div className="stack-item__copy">
                <strong>{technology.name}</strong>
                <span>{technology.category}</span>
              </div>
              <button className="remove-button" onClick={() => onRemove(technology)} aria-label={`Remove ${technology.name}`} title={`Remove ${technology.name}`}>
                <X size={15} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="stack-note"><Sparkles size={14} /><span>Good tools make room for great ideas.</span></div>
    </aside>
  );
}

function App() {
  const [technologies, setTechnologies] = useState([]);
  const [stack, setStack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch('/data/technologies.json')
      .then((response) => {
        if (!response.ok) throw new Error('Technology data could not be loaded.');
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setTechnologies(data);
      })
      .catch(() => toast.error('We could not load the technology list. Please refresh to try again.'))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  const categories = useMemo(() => ['All', ...new Set(technologies.map((technology) => technology.category))], [technologies]);
  const filteredTechnologies = useMemo(() => technologies.filter((technology) => {
    const matchesCategory = activeCategory === 'All' || technology.category === activeCategory;
    const searchText = `${technology.name} ${technology.description} ${technology.category}`.toLowerCase();
    return matchesCategory && searchText.includes(query.toLowerCase().trim());
  }), [activeCategory, query, technologies]);
  const stackIds = new Set(stack.map((technology) => technology.id));

  function addToStack(technology) {
    if (stackIds.has(technology.id)) {
      toast.warn(`${technology.name} is already in your stack.`);
      return;
    }
    setStack((currentStack) => [...currentStack, technology]);
    toast.success(`${technology.name} added to your stack.`);
  }

  function removeFromStack(technology) {
    setStack((currentStack) => currentStack.filter((item) => item.id !== technology.id));
    toast.info(`${technology.name} removed from your stack.`);
  }

  function clearStack() {
    if (stack.length === 0) return;
    setStack([]);
    toast.info('Your stack has been cleared.');
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <div className="nav-shell">
          <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <Brand />
          <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            {navigation.map((item) => <a key={item.label} href={item.href} onClick={closeMenu}>{item.label}</a>)}
            <div className="mobile-nav-actions">
              <a className="button button--plain" href="#contact" onClick={closeMenu}>Sign in</a>
              <a className="button button--gradient" href="#technologies" onClick={closeMenu}>Sign up <ArrowUpRight size={15} /></a>
            </div>
          </nav>
          <div className="nav-actions">
            <a className="button button--plain" href="#contact">Sign in</a>
            <a className="button button--gradient" href="#technologies">Sign up <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="kicker-dot" /> A BETTER WAY TO BUILD</div>
            <h1>Find your next<br />favorite <span>technology.</span></h1>
            <p className="hero-description">A thoughtful collection of tools for people who love making things for the web. Find your fit, build your stack, get to work.</p>
            <div className="hero-actions">
              <a className="button button--gradient button--large" href="#technologies">Explore technologies <ArrowRight size={17} /></a>
              <a className="button button--outline button--large" href="#about">Learn more <ArrowDown size={16} /></a>
            </div>
            <div className="hero-proof"><div className="proof-icons"><span><Code2 size={15} /></span><span><Layers3 size={15} /></span><span><Sparkles size={14} /></span></div><p><strong>12 hand-picked tools</strong><br />for your next big idea</p></div>
          </div>
          <div className="hero-visual">
            <div className="hero-orbit hero-orbit--one" />
            <div className="hero-orbit hero-orbit--two" />
            <img className="hero-image" src="/assets/banner-stack.png" alt="A luminous stack of creative technology layers" />
            <div className="floating-label floating-label--top"><span className="status-dot" /> YOUR TOOLKIT, YOUR RULES</div>
            <div className="floating-label floating-label--bottom"><span className="floating-star">✳</span> Made for what comes next</div>
            <span className="hero-spark hero-spark--one">✳</span><span className="hero-spark hero-spark--two">✦</span>
          </div>
          <a className="scroll-cue" href="#technologies"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
        </section>

        <section className="catalog-section" id="technologies">
          <div className="section-wrap">
            <div className="section-heading">
              <div>
                <div className="eyebrow"><span className="eyebrow-line" /> THE TOOLBOX</div>
                <h2>Good tools. <span>Great things.</span></h2>
                <p>Explore the technologies shaping the way we build for the web.</p>
              </div>
              <div className="catalog-count"><span>{technologies.length.toString().padStart(2, '0')}</span><small>technologies<br />and counting</small></div>
            </div>

            <div className="catalog-toolbar">
              <div className="category-filters" role="group" aria-label="Filter technologies by category">
                {categories.map((category) => <button key={category} className={activeCategory === category ? 'filter-chip is-active' : 'filter-chip'} onClick={() => setActiveCategory(category)}>{category}</button>)}
              </div>
              <label className="search-field"><Search size={16} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a technology" aria-label="Search technologies" /><kbd>/</kbd></label>
            </div>

            <div className="catalog-layout">
              <div className="technology-area">
                {loading ? (
                  <div className="loading-state" role="status"><span className="spinner" /> Loading technologies...</div>
                ) : filteredTechnologies.length > 0 ? (
                  <div className="technology-grid">
                    {filteredTechnologies.map((technology, index) => <div className="card-reveal" key={technology.id} style={{ '--item-index': index }}><TechnologyCard technology={technology} added={stackIds.has(technology.id)} onAdd={addToStack} /></div>)}
                  </div>
                ) : (
                  <div className="no-results"><Search size={20} /><h3>No matches this time.</h3><p>Try a different search or category.</p><button className="text-button" onClick={() => { setQuery(''); setActiveCategory('All'); }}>Clear filters</button></div>
                )}
              </div>
              <StackPanel stack={stack} onRemove={removeFromStack} onClear={clearStack} />
            </div>
          </div>
        </section>

        <section className="build-section" id="projects">
          <div className="section-wrap build-layout">
            <div className="build-copy" id="about">
              <div className="eyebrow"><span className="eyebrow-line" /> MADE FOR MAKERS</div>
              <h2>Less hunting.<br /><span>More building.</span></h2>
              <p>Choosing your tools shouldn't slow you down. Dev Stack brings the modern web's best technologies into one clear, considered place.</p>
              <a className="inline-link" href="#technologies">Find your starting point <ArrowRight size={16} /></a>
            </div>
            <div className="build-points">
              <article className="build-point"><span className="build-number">01</span><div><h3>Explore the landscape</h3><p>Get a quick feel for the tools behind today's best digital experiences.</p></div><ArrowUpRight size={17} /></article>
              <article className="build-point"><span className="build-number">02</span><div><h3>Curate your toolkit</h3><p>Collect the technologies that make sense for your project and your practice.</p></div><ArrowUpRight size={17} /></article>
              <article className="build-point"><span className="build-number">03</span><div><h3>Make something real</h3><p>Leave the comparison tabs behind and get back to the fun part.</p></div><ArrowUpRight size={17} /></article>
            </div>
          </div>
          <div className="build-decoration" aria-hidden="true">DS<span>.</span></div>
        </section>

        <section className="closing-cta" aria-label="Explore Dev Stack">
          <div className="section-wrap closing-cta__inner"><div><span className="cta-overline">YOUR NEXT BUILD STARTS HERE</span><h2>Pick a tool. <span>Make a thing.</span></h2></div><a className="button button--dark" href="#technologies">Explore the toolbox <ArrowRight size={16} /></a></div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="section-wrap">
          <div className="footer-main">
            <div className="footer-brand-block">
              <Brand footer />
              <p>A little more clarity for your next big build. Find the tools, shape your stack, and make something that matters.</p>
              <div className="social-links" aria-label="Social links">
                <a href="https://github.com" aria-label="GitHub"><Github size={17} /></a>
                <a href="https://twitter.com" aria-label="Twitter"><span className="twitter-mark">𝕏</span></a>
                <a href="https://linkedin.com" aria-label="LinkedIn"><Linkedin size={17} /></a>
              </div>
            </div>
            <div className="footer-links-group"><h3>Product</h3><a href="#technologies">Technologies</a><a href="#projects">How it works</a><a href="#technologies">Your stack</a></div>
            <div className="footer-links-group"><h3>Company</h3><a href="#about">About us</a><a href="#contact">Get in touch</a><a href="https://github.com">GitHub</a></div>
            <div className="footer-links-group"><h3>Legal</h3><a href="#privacy">Privacy policy</a><a href="#terms">Terms of use</a></div>
          </div>
          <div className="footer-bottom"><span>© 2025 Dev Stack. Made for the curious.</span><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a className="back-to-top" href="#home">Back to top ↑</a></div></div>
        </div>
      </footer>
      <ToastContainer position="bottom-right" autoClose={2500} newestOnTop closeOnClick pauseOnFocusLoss={false} theme="light" />
    </>
  );
}

export default App;
