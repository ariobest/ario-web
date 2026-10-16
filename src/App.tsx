import { useEffect, useState, type FormEvent } from 'react';
import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js';
import { Activity, ArrowRight, Check, ChevronDown, Code2, Github, LayoutDashboard, LogIn, LogOut, Menu, Moon, Palette, ShieldCheck, Sparkles, Terminal, UserRound, Users, X, Zap } from 'lucide-react';

const ADMIN_EMAIL = 'ariobesst2014@gmail.com';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
const supabase: SupabaseClient | null = supabaseUrl && supabaseKey && !supabaseKey.startsWith('your-') && !supabaseKey.includes('PASTE_YOUR_REAL_KEY_HERE')
  ? createClient(supabaseUrl, supabaseKey)
  : null;

type ThemeName = 'midnight' | 'ocean' | 'emerald' | 'rose';
const themes: { id: ThemeName; name: string; color: string; description: string }[] = [
  { id: 'midnight', name: 'Midnight', color: '#9b7bff', description: 'Electric violet' },
  { id: 'ocean', name: 'Ocean', color: '#55b7ff', description: 'Cool blue glow' },
  { id: 'emerald', name: 'Emerald', color: '#54e0ad', description: 'Fresh green glow' },
  { id: 'rose', name: 'Rose', color: '#ff80b5', description: 'Soft pink glow' },
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(!supabase);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [theme, setTheme] = useState<ThemeName>(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('ario-theme') : null;
    return themes.some((item) => item.id === saved) ? saved as ThemeName : 'midnight';
  });
  const [themeMenu, setThemeMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [page, setPage] = useState<'home' | 'login' | 'admin'>('home');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('ario-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setAuthReady(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthReady(true);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;

  const submitAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    if (!supabase) {
      setMessage('Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in Netlify, then redeploy.');
      return;
    }
    setBusy(true);
    try {
      if (authMode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { display_name: displayName.trim() } },
        });
        if (error) throw error;
        setMessage('Account created. Check your email to confirm your address if email confirmation is enabled.');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        setMessage('Signed in successfully.');
        setPage(data.user?.email?.toLowerCase() === ADMIN_EMAIL ? 'admin' : 'home');
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not complete authentication.');
    } finally {
      setBusy(false);
    }
  };

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    setPage('home');
    setMessage('You have been signed out.');
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <button className="brand" onClick={() => { setPage('home'); setMobileMenu(false); }} aria-label="ARIO SCRIPTS home">
          <span className="brand-mark"><Terminal size={22} strokeWidth={2.5} /></span>
          <span className="brand-name">ARIO<span> SCRIPTS</span><small>THE CREATOR HUB</small></span>
        </button>
        <nav className={mobileMenu ? 'nav-links nav-open' : 'nav-links'}>
          <button className={page === 'home' ? 'nav-link active' : 'nav-link'} onClick={() => { setPage('home'); setMobileMenu(false); }}>Home</button>
          <button className="nav-link" onClick={() => { setThemeMenu(!themeMenu); setMobileMenu(false); }}><Palette size={15} /> Themes</button>
          {isAdmin && <button className={page === 'admin' ? 'nav-link active' : 'nav-link'} onClick={() => { setPage('admin'); setMobileMenu(false); }}><LayoutDashboard size={15} /> Admin panel</button>}
        </nav>
        <div className="top-actions">
          <button className="theme-trigger" onClick={() => setThemeMenu(!themeMenu)} aria-label="Choose theme"><Palette size={16} /><span>Theme</span><ChevronDown size={13} /></button>
          {user ? <button className="account-button" onClick={signOut}><LogOut size={15} /><span>Sign out</span></button> : <button className="login-button" onClick={() => { setPage('login'); setMessage(''); }}><UserRound size={15} /> Sign in <ArrowRight size={14} /></button>}
          <button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
        </div>
        {themeMenu && <div className="theme-popover"><div className="popover-heading"><span>Choose your vibe</span><button aria-label="Close themes" onClick={() => setThemeMenu(false)}><X size={15} /></button></div>{themes.map((item) => <button key={item.id} className={theme === item.id ? 'theme-option chosen' : 'theme-option'} onClick={() => { setTheme(item.id); setThemeMenu(false); }}><span className="theme-swatch" style={{ background: item.color, boxShadow: `0 0 16px ${item.color}55` }} /><span className="theme-option-copy"><b>{item.name}</b><small>{item.description}</small></span>{theme === item.id && <Check size={16} />}</button>)}</div>}
      </header>

      <main>
        {page === 'home' && <>
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow"><span className="live-dot" /> YOUR SPACE. YOUR RULES. <span className="eyebrow-line" /></div>
              <h1>Build your next<br /><span className="gradient-text">big thing.</span></h1>
              <p className="hero-subtitle">Welcome to the new ARIO SCRIPTS. A premium home for creators, custom themes, and tools — with your own account and a dedicated admin space.</p>
              <div className="hero-actions"><button className="primary-button" onClick={() => { setPage('login'); setAuthMode('signup'); setMessage(''); }}>Create an account <ArrowRight size={16} /></button><button className="secondary-button" onClick={() => setThemeMenu(true)}><Palette size={16} /> Explore themes</button></div>
              <div className="hero-meta"><span><ShieldCheck size={15} /> Account-based access</span><span><Sparkles size={15} /> Animated interface</span><span><Zap size={15} /> Four color themes</span></div>
            </div>
            <div className="hero-art" aria-label="ARIO SCRIPTS interface preview">
              <div className="orbit orbit-outer" /><div className="orbit orbit-inner" />
              <div className="hero-logo-card"><div className="logo-glow"><Terminal size={52} strokeWidth={1.8} /></div><span className="logo-wordmark">ARIO SCRIPTS</span><span className="logo-caption">CREATE WITHOUT LIMITS</span><div className="logo-status"><span className="live-dot" /> SYSTEM READY <span className="status-divider" /> V 2.0</div></div>
              <div className="floating-chip chip-top"><span className="chip-icon purple"><Palette size={16} /></span><span><b>Personal themes</b><small>Pick your color vibe</small></span><Sparkles size={17} className="chip-check" /></div>
              <div className="floating-chip chip-bottom"><span className="chip-icon green"><ShieldCheck size={16} /></span><span><b>Private admin area</b><small>Authorized email only</small></span><Check size={17} className="chip-check" /></div>
            </div>
          </section>

          <section className="feature-strip">
            <div className="feature-item"><span className="feature-icon"><Palette size={18} /></span><div><b>Switch your theme</b><small>Four carefully tuned color palettes</small></div></div>
            <div className="feature-item"><span className="feature-icon"><Users size={18} /></span><div><b>Your own account</b><small>Sign up or sign in with Supabase</small></div></div>
            <div className="feature-item"><span className="feature-icon"><LayoutDashboard size={18} /></span><div><b>Creator dashboard</b><small>Admin entry for the owner account</small></div></div>
          </section>

          <section className="welcome-section">
            <div className="section-kicker"><Sparkles size={14} /> A CLEAN START</div>
            <div className="welcome-card"><div className="welcome-icon"><Code2 size={25} /></div><div><h2>No fake listings. Just your hub.</h2><p>The demo scripts have been removed. When your Supabase database is connected, this space can show your real published content instead of made-up examples.</p></div><span className="preview-badge">READY FOR YOUR CONTENT</span></div>
          </section>
          <section id="community" className="community-card"><div className="community-orb" /><div className="community-copy"><div className="section-kicker"><Terminal size={14} /> ARIO SCRIPTS COMMUNITY</div><h2>Your next chapter starts here.</h2><p>Sign in to get started, or customize the look with the theme switcher.</p></div><button className="primary-button" onClick={() => { setPage('login'); setAuthMode(user ? 'signin' : 'signup'); setMessage(''); }}>{user ? 'Account settings' : 'Get started'} <ArrowRight size={16} /></button></section>
        </>}

        {page === 'login' && <section className="auth-layout">
          <div className="auth-aside"><div className="auth-brand-symbol"><Terminal size={34} /></div><div className="section-kicker"><ShieldCheck size={14} /> YOUR ACCOUNT, YOUR WORKSPACE</div><h1>Good things<br />start <span className="gradient-text">here.</span></h1><p>Create an account or sign in to access your ARIO SCRIPTS profile. Your account is managed securely by Supabase Auth.</p><div className="auth-benefit"><Check size={16} /> Secure email and password authentication</div><div className="auth-benefit"><Check size={16} /> Your theme preference stays on this device</div><button className="back-home" onClick={() => setPage('home')}>← Back to home</button></div>
          <div className="auth-card"><div className="auth-card-top"><div className="auth-mini-icon"><LogIn size={20} /></div><span className="secure-label"><span className="live-dot" /> SECURE AUTH</span></div><h2>{authMode === 'signin' ? 'Welcome back' : 'Create your account'}</h2><p className="auth-intro">{authMode === 'signin' ? 'Enter your details to continue.' : 'A few details and you’re good to go.'}</p>
            {!supabase && <div className="notice warning"><ShieldCheck size={17} /><span><b>Supabase setup needed</b><small>Add your project URL and publishable key to Netlify environment variables, then redeploy to enable real accounts.</small></span></div>}
            <form className="auth-form" onSubmit={submitAuth}>
              {authMode === 'signup' && <label>Display name<input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="What should we call you?" autoComplete="name" required /></label>}
              <label>Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required /></label>
              <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={authMode === 'signup' ? 'At least 6 characters' : 'Enter your password'} autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'} minLength={6} required /></label>
              <button className="primary-button auth-submit" type="submit" disabled={busy}>{busy ? 'Please wait…' : authMode === 'signin' ? 'Sign in securely' : 'Create account'} <ArrowRight size={16} /></button>
            </form>
            {message && <div className={message.toLowerCase().includes('could not') || message.toLowerCase().includes('invalid') || message.toLowerCase().includes('not configured') || message.toLowerCase().includes('setup') ? 'form-message error' : 'form-message'}>{message}</div>}
            <div className="auth-switch">{authMode === 'signin' ? 'New to ARIO SCRIPTS?' : 'Already have an account?'} <button onClick={() => { setAuthMode(authMode === 'signin' ? 'signup' : 'signin'); setMessage(''); }}>{authMode === 'signin' ? 'Create an account' : 'Sign in'}</button></div>
            <div className="auth-foot"><ShieldCheck size={14} /> Never share your password with anyone.</div>
          </div>
        </section>}

        {page === 'admin' && <section className="admin-layout">
          {!authReady ? <div className="admin-loading">Checking your session…</div> : !isAdmin ? <div className="access-denied"><span className="denied-icon"><ShieldCheck size={27} /></span><h1>Restricted area</h1><p>This dashboard is reserved for the authorized ARIO SCRIPTS owner account.</p><button className="primary-button" onClick={() => setPage('login')}>Sign in as owner <ArrowRight size={16} /></button></div> : <>
            <div className="admin-heading"><div><div className="section-kicker"><ShieldCheck size={14} /> OWNER WORKSPACE</div><h1>Admin <span className="gradient-text">dashboard.</span></h1><p>Signed in as {user?.email}</p></div><span className="admin-pill"><span className="live-dot" /> OWNER ACCESS</span></div>
            <div className="admin-stat-grid"><div className="admin-stat"><span><Users size={18} /></span><small>Registered users</small><b>—</b><em>Connect database to load</em></div><div className="admin-stat"><span><Code2 size={18} /></span><small>Published scripts</small><b>0</b><em>No sample content loaded</em></div><div className="admin-stat"><span><Activity size={18} /></span><small>Script executions</small><b>—</b><em>Analytics not connected</em></div></div>
            <div className="admin-panel"><div className="admin-panel-heading"><div><h2>Appearance settings</h2><p>Choose the accent theme for this browser.</p></div><Palette size={19} /></div><div className="theme-grid">{themes.map((item) => <button key={item.id} className={theme === item.id ? 'theme-card theme-card-active' : 'theme-card'} onClick={() => setTheme(item.id)}><span className="theme-card-top" style={{ background: `linear-gradient(135deg, ${item.color}44, #12131b 80%)` }}><span style={{ background: item.color }} /></span><b>{item.name}</b><small>{item.description}</small>{theme === item.id && <Check className="theme-check" size={16} />}</button>)}</div></div>
            <div className="notice warning admin-notice"><ShieldCheck size={19} /><span><b>Database features are not connected yet</b><small>Authentication UI is wired to Supabase when your environment variables are configured. Script CRUD, roles, counts, and protected delivery require verified database tables and Row Level Security policies. This dashboard does not pretend those features are live.</small></span></div>
            <div className="admin-footer"><span><UserRound size={15} /> {user?.email}</span><button className="secondary-button" onClick={signOut}><LogOut size={15} /> Sign out</button></div>
          </>}
        </section>}
      </main>
      <footer className="footer"><div className="footer-brand"><span className="brand-mark"><Terminal size={18} /></span><b>ARIO SCRIPTS</b></div><span>Designed for creators. Built with care.</span><a href="https://github.com/ariobest/ario-web" target="_blank" rel="noreferrer"><Github size={15} /> Source <ArrowRight size={13} /></a></footer>
    </div>
  );
}
