import { useState, useEffect, useRef } from 'react';
import './Portfolio.css';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SKILL_CATEGORIES = [
  {
    label: 'Frontend',
    icon: '◈',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'CSS / Tailwind', 'HTML5'],
  },
  {
    label: 'Backend',
    icon: '◇',
    skills: ['Node.js', 'Express', 'Python', 'FastAPI', 'REST APIs', 'GraphQL'],
  },
  {
    label: 'Database',
    icon: '◉',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'SQL', 'Supabase'],
  },
  {
    label: 'DevOps & Tools',
    icon: '◎',
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'CI/CD', 'Linux'],
  },
];

const EXTRA_TOOLS = [
  'Agile/Scrum', 'TDD', 'Microservices', 'CI/CD',
  'GraphQL', 'Figma', 'WebSockets', 'OAuth2', 'Jest', 'Cypress',
];

const PROJECTS = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack online store with React, Node.js & Stripe payments. Features cart management, auth, and an admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveLink: 'https://your-ecommerce.vercel.app',
    repoLink: 'https://github.com/yourusername/ecommerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    featured: true,
  },
  {
    title: 'Real-Time Chat App',
    description: 'WebSocket-powered messaging platform supporting group channels, direct messages, and file sharing.',
    tags: ['Socket.io', 'React', 'Express', 'Redis'],
    liveLink: 'https://your-chat.vercel.app',
    repoLink: 'https://github.com/yourusername/chat-app',
    image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&q=80',
    featured: true,
  },
  {
    title: 'AI Task Manager',
    description: 'Smart to-do application with NLP-based priority suggestions and calendar integration.',
    tags: ['Python', 'FastAPI', 'React', 'OpenAI'],
    liveLink: 'https://your-taskmanager.vercel.app',
    repoLink: 'https://github.com/yourusername/ai-tasks',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80',
    featured: false,
  },
  {
    title: 'DevOps Dashboard',
    description: 'Monitoring tool for CI/CD pipelines, system metrics, and deployment logs with real-time alerting.',
    tags: ['TypeScript', 'Docker', 'Grafana', 'AWS'],
    liveLink: 'https://github.com/yourusername/devops-dashboard',
    repoLink: 'https://github.com/yourusername/devops-dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    featured: false,
  },
  {
    title: 'Portfolio CMS',
    description: 'Headless CMS for creatives — drag-and-drop builder with instant preview and one-click publish.',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Cloudinary'],
    liveLink: 'https://your-cms.vercel.app',
    repoLink: 'https://github.com/yourusername/portfolio-cms',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80',
    featured: false,
  },
  {
    title: 'Crypto Tracker',
    description: 'Live cryptocurrency dashboard with charts, watchlists, and portfolio performance analytics.',
    tags: ['React', 'Chart.js', 'WebSocket', 'CoinGecko API'],
    liveLink: 'https://your-crypto.vercel.app',
    repoLink: 'https://github.com/yourusername/crypto-tracker',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
    featured: false,
  },
];

const TIMELINE = [
  {
    year: '2024',
    role: 'Senior Frontend Developer',
    company: 'TechNova Inc.',
    desc: 'Led migration from legacy jQuery codebase to React. Improved page load times by 60%.',
  },
  {
    year: '2022',
    role: 'Full-Stack Developer',
    company: 'StartupXYZ',
    desc: 'Built MVP SaaS product from scratch; served 10k+ users within 6 months of launch.',
  },
  {
    year: '2020',
    role: 'Junior Developer',
    company: 'WebCraft Agency',
    desc: 'Delivered 20+ client websites. Specialized in responsive design and CMS integration.',
  },
  {
    year: '2019',
    role: 'B.Sc. Computer Science',
    company: 'State University',
    desc: 'Graduated with honors. Thesis on distributed systems and microservice architecture.',
  },
];

const CONTACT_LINKS = [
  { icon: '📧', label: 'EMAIL',     value: 'timothyangway@email.com',          href: 'mailto:timothyangway@email.com' },
  { icon: '🔗', label: 'LINKEDIN',  value: 'linkedin.com/in/timothyangway',    href: 'https://linkedin.com/in/timothyangway' },
  { icon: '🐙', label: 'GITHUB',    value: 'github.com/timothyangway',         href: 'https://github.com/timothyangway' },
  { icon: '🌐', label: 'PORTFOLIO', value: 'timothyangway.vercel.app',          href: 'https://timothyangway.vercel.app' },
];

const STATS = [
  { num: '5+',   label: 'Years Exp' },
  { num: '40+',  label: 'Projects' },
  { num: '20+',  label: 'Clients' },
  { num: '100%', label: 'Committed' },
];

const NAV_LINKS = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

// ─── HOOK ─────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}

// ─── SHARED: SECTION WRAPPER ──────────────────────────────────────────────────

function Section({ id, children, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`portfolio-section ${inView ? 'section-visible' : 'section-hidden'} ${className}`}
      aria-label={id}
    >
      {children}
    </section>
  );
}

// ─── SHARED: SECTION LABEL ────────────────────────────────────────────────────

function SectionLabel({ num, text }) {
  return (
    <div className="section-label">
      {num && <span className="section-num">{num} —</span>} {text}
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────

function Home({ onNav }) {
  const [typed, setTyped]     = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const roles = ['Web Developer', 'Software Engineer', 'Full-Stack Builder', 'UI Craftsman'];

  useEffect(() => {
    const current = roles[roleIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setTyped(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), 1800);
        else setCharIdx(c => c + 1);
      } else {
        setTyped(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setCharIdx(0);
          setRoleIdx(r => (r + 1) % roles.length);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, deleting ? 60 : 100);
    return () => clearTimeout(timeout);
  }, [typed, charIdx, deleting, roleIdx]);

  return (
    <div id="home" className="home-section">
      {/* Background grid + orbs */}
      <div className="home-grid-bg" />
      <div className="home-orb home-orb-1" />
      <div className="home-orb home-orb-2" />

      {/* Hero content */}
      <div className="home-content">
        <div className="home-badge">▸ AVAILABLE FOR HIRE</div>

        <h1 className="home-name">
          TIMOTHY<br />
          <span className="home-name-accent">ANGWAY</span>
        </h1>

        <div className="home-typewriter">
          {typed}
          <span className="home-cursor">|</span>
        </div>

        <p className="home-desc">
          I craft performant, scalable web applications that balance clean architecture
          with delightful user experiences. Passionate about turning complex problems
          into elegant solutions.
        </p>

        <div className="home-ctas">
          <button className="btn-primary" onClick={() => onNav('projects')}>
            VIEW PROJECTS
          </button>
          <button className="btn-outline" onClick={() => onNav('contact')}>
            GET IN TOUCH
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="home-stats">
        {STATS.map((s, i) => (
          <div className="home-stat" key={i}>
            <span className="home-stat-num">{s.num}</span>
            <span className="home-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <Section id="about" className="about-section">
      <div className="about-inner">

        {/* Left: text */}
        <div className="about-text">
          <SectionLabel num="01" text="ABOUT ME" />
          <h2 className="section-heading">
            BUILDING THE WEB,<br />
            <span className="accent">ONE LINE AT A TIME</span>
          </h2>
          <p className="about-para">
            I'm <strong>Timothy Jue G. Angway</strong>, a full-stack developer who genuinely
            loves the craft. From architecting databases to polishing pixel-perfect UIs,
            I care about every layer of the stack.
          </p>
          <p className="about-para">
            When I'm not pushing code, I'm exploring open-source projects, mentoring
            junior developers, or experimenting with new frameworks to stay ahead of
            the curve.
          </p>
          <div className="about-links">
            {['GitHub', 'LinkedIn', 'Twitter', 'Resume'].map(s => (
              <a key={s} href="#" className="about-link">{s}</a>
            ))}
          </div>
        </div>

        {/* Right: avatar */}
        <div className="about-avatar-wrap">
          <div className="about-avatar">
            <span className="about-avatar-initials">TJA</span>
            <div className="about-avatar-overlay" />
            <div className="about-avatar-bar" />
          </div>
          <div className="about-ring about-ring-sm" />
          <div className="about-ring about-ring-lg" />
        </div>

      </div>
    </Section>
  );
}

// ─── SKILL CARD ───────────────────────────────────────────────────────────────

function SkillCard({ category, delay }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`skill-card ${inView ? 'card-visible' : 'card-hidden'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="skill-card-head">
        <span className="skill-card-icon">{category.icon}</span>
        <span className="skill-card-label">{category.label}</span>
      </div>
      <div className="skill-tags">
        {category.skills.map(skill => (
          <span key={skill} className="skill-tag">{skill}</span>
        ))}
      </div>
    </div>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <Section id="skills" className="skills-section">
      <div className="section-inner">
        <SectionLabel num="02" text="SKILLS" />
        <h2 className="section-heading">
          TECHNICAL <span className="accent">ARSENAL</span>
        </h2>
        <p className="section-sub">Technologies I work with day-to-day</p>

        <div className="skills-grid">
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCard key={cat.label} category={cat} delay={i * 100} />
          ))}
        </div>

        <div className="skills-extra">
          <div className="skills-extra-label">ALSO FAMILIAR WITH</div>
          <div className="skills-extra-tags">
            {EXTRA_TOOLS.map(tool => (
              <span key={tool} className="extra-tag">{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`project-card ${inView ? 'card-visible' : 'card-hidden'} ${hovered ? 'project-card-hovered' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top glow bar on hover */}
      <div className={`project-glow-bar ${hovered ? 'glow-bar-visible' : ''}`} />

      {/* Image */}
      <div className="project-img-wrap">
        <img
          src={project.image}
          alt={project.title}
          className={`project-img ${hovered ? 'project-img-hovered' : ''}`}
        />
        <div className={`project-img-overlay ${hovered ? 'overlay-hovered' : ''}`} />

        {project.featured && (
          <span className="project-featured-badge">FEATURED</span>
        )}

        {/* Hover action buttons */}
        <div className={`project-hover-actions ${hovered ? 'actions-visible' : ''}`}>
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
            className="project-btn-live" onClick={e => e.stopPropagation()}>
            ▶ LIVE
          </a>
          <a href={project.repoLink} target="_blank" rel="noopener noreferrer"
            className="project-btn-code" onClick={e => e.stopPropagation()}>
            ⌥ CODE
          </a>
        </div>
      </div>

      {/* Body */}
      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>

        <div className="project-links">
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link-live">
            ↗ View Live
          </a>
          <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="project-link-repo">
            ⌥ GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <Section id="projects" className="projects-section">
      <div className="section-inner">
        <SectionLabel num="03" text="PROJECTS" />
        <h2 className="section-heading">
          SELECTED <span className="accent">WORK</span>
        </h2>
        <p className="section-sub">Hover a card to reveal live &amp; code links ↗</p>

        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

function Experience() {
  return (
    <Section id="experience" className="experience-section">
      <div className="section-inner experience-inner">
        <SectionLabel num="04" text="EXPERIENCE" />
        <h2 className="section-heading">
          CAREER <span className="accent">TIMELINE</span>
        </h2>

        <div className="timeline">
          <div className="timeline-line" />
          {TIMELINE.map((item, i) => (
            <div className="timeline-item" key={i}>
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-dot" />
              <div className="timeline-body">
                <div className="timeline-role">{item.role}</div>
                <div className="timeline-company">{item.company}</div>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <Section id="contact" className="contact-section">
      <div className="section-inner contact-inner">
        <SectionLabel num="05" text="CONTACT" />
        <h2 className="section-heading">
          REACH <span className="accent">OUT</span>
        </h2>
        <p className="contact-desc">
          I'm open to new opportunities, freelance projects, and interesting collaborations.
          The best way to reach me is directly via email or through any of the platforms below.
        </p>

        <div className="contact-list">
          {CONTACT_LINKS.map(({ icon, label, value, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="contact-item">
              <span className="contact-item-icon">{icon}</span>
              <div className="contact-item-text">
                <span className="contact-item-label">{label}</span>
                <span className="contact-item-value">{value}</span>
              </div>
              <span className="contact-item-arrow">↗</span>
            </a>
          ))}
        </div>

        <div className="availability-badge">
          <span className="availability-dot" />
          <span className="availability-text">AVAILABLE FOR NEW OPPORTUNITIES</span>
        </div>
      </div>
    </Section>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled,      setScrolled]      = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [cursorPos,     setCursorPos]     = useState({ x: -200, y: -200 });

  // Track nav scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cursor glow tracker
  useEffect(() => {
    const onMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Active section tracker
  useEffect(() => {
    const onScroll = () => {
      for (const id of NAV_LINKS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (section) => {
    setMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-root">

      {/* Cursor glow */}
      <div
        className="cursor-glow"
        style={{ left: cursorPos.x - 150, top: cursorPos.y - 150 }}
      />

      {/* Scan line */}
      <div className="scan-line" />

      {/* ── HEADER ── */}
      <header className={`portfolio-header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="header-inner">

          <button className="logo-btn" onClick={() => scrollToSection('home')} aria-label="Go to home">
            <span className="logo-mark">&lt;TJA/&gt;</span>
          </button>

          <nav className="main-nav" aria-label="Main navigation">
            <ul role="list">
              {NAV_LINKS.map(id => (
                <li key={id}>
                  <button
                    className={`nav-link ${activeSection === id ? 'nav-link-active' : ''}`}
                    onClick={() => scrollToSection(id)}
                    aria-current={activeSection === id ? 'page' : undefined}
                  >
                    {id.toUpperCase()}
                    {activeSection === id && <span className="nav-indicator" aria-hidden="true" />}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className={`hamburger ${menuOpen ? 'hamburger-open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile nav */}
        <div className={`mobile-nav ${menuOpen ? 'mobile-nav-open' : ''}`}>
          {NAV_LINKS.map(id => (
            <button
              key={id}
              className={`mobile-nav-link ${activeSection === id ? 'mobile-nav-active' : ''}`}
              onClick={() => scrollToSection(id)}
            >
              {id.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="content-area">
        <Home onNav={scrollToSection} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* ── FOOTER ── */}
      <footer className="portfolio-footer">
        <div className="footer-inner">
          <span className="footer-brand">&lt;TJA/&gt;</span>
          <span className="footer-copy">
            © {new Date().getFullYear()} Timothy Jue G. Angway — Built with React + Passion
          </span>
          <button
            className="footer-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑ TOP
          </button>
        </div>
      </footer>

    </div>
  );
}

export default Portfolio;