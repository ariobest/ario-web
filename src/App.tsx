import { useMemo, useState } from 'react';
import { Activity, ArrowDownToLine, ArrowRight, BadgeCheck, Bookmark, Check, ChevronDown, Code2, Copy, ExternalLink, Eye, Filter, Gamepad2, Github, Heart, Layers3, Menu, Moon, Search, ShieldCheck, Sparkles, Star, Terminal, TrendingUp, X, Zap } from 'lucide-react';

type Script = { id: number; name: string; game: string; category: string; description: string; code: string; views: string; updated: string; featured?: boolean; accent: string };

const scripts: Script[] = [
  { id: 1, name: 'MM2 Utility Suite', game: 'Murder Mystery 2', category: 'Utility', description: 'A clean utility collection with configurable interface options and quality-of-life tools.', code: '-- ARIO SCRIPTS · MM2 Utility Suite\n-- Example listing preview\nlocal Settings = {\n    Theme = "Midnight",\n    Notifications = true,\n}\n\nprint("MM2 Utility Suite loaded")', views: '12.4k', updated: '2 days ago', featured: true, accent: 'violet' },
  { id: 2, name: 'Blox Fruits Companion', game: 'Blox Fruits', category: 'Tools', description: 'A companion panel concept with saved preferences, quick navigation, and readable controls.', code: '-- ARIO SCRIPTS · Companion\nlocal Config = {\n    Theme = "Ocean",\n    CompactMode = false,\n}\n\nprint("Companion ready")', views: '8.1k', updated: '4 days ago', accent: 'blue' },
  { id: 3, name: 'Universal UI Kit', game: 'Universal', category: 'UI Library', description: 'Reusable UI patterns for building polished interfaces with consistent spacing and themes.', code: '-- ARIO SCRIPTS · Universal UI Kit\nlocal Theme = {\n    Background = "#101116",\n    Accent = "#8B5CF6",\n    Radius = 12,\n}\n\nreturn Theme', views: '6.7k', updated: '1 week ago', featured: true, accent: 'pink' },
  { id: 4, name: 'Pet Simulator Toolkit', game: 'Pet Simulator 99', category: 'Tools', description: 'A lightweight toolkit listing with a tidy settings layout and accessible controls.', code: '-- ARIO SCRIPTS · Toolkit\nlocal Toolkit = {}\nToolkit.version = "1.0.0"\nToolkit.ready = true\n\nreturn Toolkit', views: '4.2k', updated: '1 week ago', accent: 'orange' },
  { id: 5, name: 'Midnight Theme Pack', game: 'Universal', category: 'UI Library', description: 'A collection of dark interface colors, accent presets, and reusable visual tokens.', code: '-- ARIO SCRIPTS · Midnight Theme Pack\nreturn {\n    background = "#08090D",\n    surface = "#11131B",\n    accent = "#8B5CF6",\n    text = "#F4F4F8",\n}', views: '3.9k', updated: '2 weeks ago', accent: 'violet' },
  { id: 6, name: 'Anime Adventures Panel', game: 'Anime Adventures', category: 'Utility', description: 'A sample listing showing the ARIO card style, code viewer, and detail layout.', code: '-- ARIO SCRIPTS · Anime Adventures\nlocal Panel = {\n    title = "Quick Panel",\n    draggable = true,\n}\n\nprint(Panel.title)', views: '2.8k', updated: '2 weeks ago', accent: 'green' },
];

const categories = ['All scripts', 'Utility', 'Tools', 'UI Library'];
const iconFor = (category: string) => category === 'UI Library' ? Layers3 : category === 'Tools' ? Zap : Gamepad2;

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All scripts');
  const [sort, setSort] = useState('Featured');
  const [selected, setSelected] = useState<Script | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = scripts.filter((s) => (category === 'All scripts' || s.category === category)
      && (s.name + ' ' + s.game + ' ' + s.description).toLowerCase().includes(query.toLowerCase())
      && (!savedOnly || favorites.includes(s.id)));
    if (sort === 'A–Z') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'Recently updated') list = [...list].reverse();
    return list;
  }, [query, category, sort, savedOnly, favorites]);

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const toggleFavorite = (id: number) => setFavorites((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#" aria-label="ARIO SCRIPTS home"><span className="brand-mark"><Terminal size={21} strokeWidth={2.5} /></span><span className="brand-name">ARIO<span> SCRIPTS</span><small>COMMUNITY SCRIPT HUB</small></span></a>
        <nav className={mobileMenu ? 'nav-links nav-open' : 'nav-links'}>
          <a className="nav-link active" href="#scripts" onClick={() => setMobileMenu(false)}>Explore</a>
          <a className="nav-link" href="#featured" onClick={() => setMobileMenu(false)}>Featured</a>
          <button className="nav-link nav-button" onClick={() => { setSavedOnly(!savedOnly); setMobileMenu(false); }}><Bookmark size={15} /> Saved <span className="saved-count">{favorites.length}</span></button>
        </nav>
        <div className="top-actions"><a className="github-link" href="https://github.com/ariobest/ario-web" target="_blank" rel="noreferrer"><Github size={16} /> <span>GitHub</span></a><a className="discord-button" href="#community">Join community <ArrowRight size={15} /></a><button className="mobile-menu" aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button></div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot" /> THE NEXT-GEN SCRIPT LIBRARY <span className="eyebrow-line" /></div>
            <h1>Find your next<br /><span className="gradient-text">favorite script.</span></h1>
            <p className="hero-subtitle">A cleaner place to discover scripts, explore tools, and build something great. Made for the community, by the community.</p>
            <div className="hero-search"><Search size={19} /><input value={query} onChange={(e) => { setQuery(e.target.value); setSavedOnly(false); }} placeholder="Search scripts, games, or tools..." aria-label="Search scripts" /><kbd>⌘ K</kbd><button onClick={() => document.getElementById('scripts')?.scrollIntoView({ behavior: 'smooth' })}>Explore <ArrowRight size={15} /></button></div>
            <div className="hero-meta"><span><ShieldCheck size={15} /> Curated listings</span><span><Activity size={15} /> Frequently updated</span><span><Sparkles size={15} /> Community driven</span></div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-outer" /><div className="orbit orbit-inner" />
            <div className="floating-chip chip-top"><span className="chip-icon purple"><Code2 size={16} /></span><span><b>Clean code</b><small>Readable by design</small></span><BadgeCheck size={17} className="chip-check" /></div>
            <div className="terminal-card"><div className="terminal-head"><div className="window-dots"><i /><i /><i /></div><span>ario.config.lua</span><span className="terminal-status"><span /> READY</span></div><div className="terminal-body"><div><span className="line-num">01</span><span className="code-muted">local</span> <span className="code-blue">ARIO</span> = {'{'}</div><div><span className="line-num">02</span>&nbsp;&nbsp;theme = <span className="code-green">"Midnight"</span>,</div><div><span className="line-num">03</span>&nbsp;&nbsp;interface = <span className="code-green">"Modern"</span>,</div><div><span className="line-num">04</span>&nbsp;&nbsp;quality = <span className="code-purple">"Premium"</span>,</div><div><span className="line-num">05</span>{'}'}</div><div className="terminal-prompt"><span className="prompt-symbol">›</span> discover_scripts()<div className="cursor" /></div></div><div className="terminal-foot"><span><span className="live-dot" /> All systems looking good</span><span>v1.0.0</span></div></div>
            <div className="floating-chip chip-bottom"><span className="chip-icon green"><Check size={16} /></span><span><b>Made for creators</b><small>Tools &amp; UI libraries</small></span><Sparkles size={17} className="chip-check" /></div>
          </div>
        </section>

        <section className="stats-strip" aria-label="Site highlights"><div className="stat-item"><span className="stat-icon"><Layers3 size={17} /></span><div><strong>Curated</strong><small>Script collection</small></div></div><div className="stat-item"><span className="stat-icon"><Zap size={17} /></span><div><strong>Quick discovery</strong><small>Search &amp; filters</small></div></div><div className="stat-item"><span className="stat-icon"><ShieldCheck size={17} /></span><div><strong>Safety minded</strong><small>Browse responsibly</small></div></div><div className="stats-note"><span className="live-dot" /> Your next idea starts here</div></section>

        <section id="featured" className="featured-section">
          <div className="section-heading"><div><div className="section-kicker"><Sparkles size={14} /> HANDPICKED</div><h2>Featured <span>spotlight.</span></h2><p>A few community-style listings to get you started.</p></div><button className="text-button" onClick={() => { setCategory('All scripts'); setSavedOnly(false); document.getElementById('scripts')?.scrollIntoView({ behavior: 'smooth' }); }}>Browse all scripts <ArrowRight size={16} /></button></div>
          <div className="featured-grid">{scripts.filter((s) => s.featured).map((script, index) => <article className={'featured-card featured-' + script.accent} key={script.id}><div className="featured-card-top"><span className="feature-label"><Star size={13} fill="currentColor" /> Featured</span><button className={favorites.includes(script.id) ? 'icon-button is-favorite' : 'icon-button'} aria-label="Save script" onClick={() => toggleFavorite(script.id)}><Heart size={17} fill={favorites.includes(script.id) ? 'currentColor' : 'none'} /></button></div><div className="feature-art"><div className="feature-grid-lines" /><div className="feature-symbol">{index === 0 ? <Gamepad2 size={39} /> : <Layers3 size={39} />}</div><span className="feature-orbit" /></div><div className="featured-card-content"><div className="card-overline">{script.game} <span>·</span> {script.category}</div><h3>{script.name}</h3><p>{script.description}</p><div className="card-bottom"><span className="view-count"><Eye size={14} /> {script.views} views</span><button className="open-card" onClick={() => setSelected(script)}>View script <ArrowRight size={15} /></button></div></div></article>)}</div>
        </section>

        <section id="scripts" className="scripts-section">
          <div className="section-heading scripts-title"><div><div className="section-kicker"><Terminal size={14} /> THE LIBRARY</div><h2>Explore <span>scripts.</span></h2><p>Find tools and resources that fit your workflow.</p></div><div className="library-count"><span className="count-pip" /> {filtered.length} listings shown</div></div>
          <div className="library-toolbar"><div className="category-tabs">{categories.map((item) => <button key={item} className={category === item ? 'category-tab selected' : 'category-tab'} onClick={() => setCategory(item)}>{item === 'All scripts' ? <Layers3 size={15} /> : item === 'Utility' ? <Gamepad2 size={15} /> : item === 'Tools' ? <Zap size={15} /> : <Code2 size={15} />}{item}</button>)}</div><div className="toolbar-actions"><button className={showFilters ? 'filter-button active-filter' : 'filter-button'} onClick={() => setShowFilters(!showFilters)}><Filter size={15} /> Filters <ChevronDown size={14} /></button><label className="sort-select"><span className="sr-only">Sort listings</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option>Featured</option><option>A–Z</option><option>Recently updated</option></select><ChevronDown size={14} /></label></div></div>
          {showFilters && <div className="filter-panel"><span>Quick filters</span><button className={savedOnly ? 'quick-filter active-filter' : 'quick-filter'} onClick={() => setSavedOnly(!savedOnly)}><Bookmark size={14} /> Saved only</button><button className="quick-filter" onClick={() => { setQuery(''); setCategory('All scripts'); setSavedOnly(false); setSort('Featured'); }}><X size={14} /> Reset filters</button></div>}
          {savedOnly && <div className="saved-banner"><Bookmark size={15} /> Showing your saved scripts <button onClick={() => setSavedOnly(false)}>Clear</button></div>}
          {filtered.length ? <div className="script-grid">{filtered.map((script) => { const Icon = iconFor(script.category); return <article className="script-card" key={script.id}><div className="script-card-head"><div className={'script-icon icon-' + script.accent}><Icon size={21} /></div><button className={favorites.includes(script.id) ? 'icon-button is-favorite' : 'icon-button'} aria-label={favorites.includes(script.id) ? 'Remove from saved' : 'Save script'} onClick={() => toggleFavorite(script.id)}><Heart size={16} fill={favorites.includes(script.id) ? 'currentColor' : 'none'} /></button></div><div className="script-category">{script.category}<span>•</span>{script.updated}</div><h3>{script.name}</h3><div className="game-name"><Gamepad2 size={13} /> {script.game}</div><p>{script.description}</p><div className="script-card-foot"><span><Eye size={14} /> {script.views}</span><button onClick={() => setSelected(script)}>View details <ArrowRight size={14} /></button></div></article> })}</div> : <div className="empty-state"><Search size={26} /><h3>No scripts found</h3><p>Try another search or reset your filters.</p><button className="discord-button" onClick={() => { setQuery(''); setCategory('All scripts'); setSavedOnly(false); }}>Clear filters <X size={14} /></button></div>}
          <div className="demo-note"><span><Activity size={14} /> Preview mode</span><p>These are sample listings so you can preview the website. Live database content will appear after Supabase access and schema are verified.</p></div>
        </section>

        <section id="community" className="community-banner"><div className="community-glow" /><div className="community-icon"><Terminal size={25} /></div><div className="community-copy"><div className="section-kicker">BUILD WITH US</div><h2>Good tools. Better community.</h2><p>ARIO SCRIPTS is growing. Explore the code, contribute ideas, and help shape what comes next.</p></div><a className="discord-button community-cta" href="https://github.com/ariobest/ario-web" target="_blank" rel="noreferrer">Explore on GitHub <ExternalLink size={15} /></a></section>
      </main>

      <footer className="footer"><a className="brand footer-brand" href="#"><span className="brand-mark"><Terminal size={19} strokeWidth={2.5} /></span><span className="brand-name">ARIO<span> SCRIPTS</span><small>COMMUNITY SCRIPT HUB</small></span></a><span className="footer-copy">Built for discovery. <span>© {new Date().getFullYear()} ARIO SCRIPTS</span></span><a href="https://github.com/ariobest/ario-web" target="_blank" rel="noreferrer" className="footer-github"><Github size={15} /> Source code</a></footer>

      {selected && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}><section className="script-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-head"><div className={'script-icon icon-' + selected.accent}><Code2 size={21} /></div><button className="icon-button" aria-label="Close details" onClick={() => setSelected(null)}><X size={18} /></button></div><div className="script-category">{selected.category} <span>•</span> {selected.game}</div><h2 id="modal-title">{selected.name}</h2><p className="modal-description">{selected.description}</p><div className="code-window"><div className="code-window-head"><div className="window-dots"><i /><i /><i /></div><span>script.lua</span><button onClick={() => copyCode(selected.code)}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? 'Copied' : 'Copy code'}</button></div><pre><code>{selected.code}</code></pre></div><div className="modal-meta"><span><Eye size={14} /> {selected.views} views</span><span><Activity size={14} /> Updated {selected.updated}</span></div><div className="modal-actions"><button className="secondary-action" onClick={() => toggleFavorite(selected.id)}><Heart size={15} fill={favorites.includes(selected.id) ? 'currentColor' : 'none'} />{favorites.includes(selected.id) ? 'Saved' : 'Save script'}</button><button className="discord-button" onClick={() => copyCode(selected.code)}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Copied to clipboard' : 'Copy script code'}</button></div><p className="modal-disclaimer">Sample content for interface preview. Review code and platform rules before using any community-provided script.</p></section></div>}
      <div className="toast" aria-live="polite" data-visible={copied}>{copied ? <><Check size={15} /> Copied to clipboard</> : null}</div>
    </div>
  );
}