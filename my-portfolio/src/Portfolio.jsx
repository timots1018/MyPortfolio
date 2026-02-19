import { useState, useEffect, useRef } from 'react';
import profilePic from './assets/profile-pic.jpg';
import './Portfolio.css';

// ═══════════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════════

const SKILLS = [
  { category: 'Programming Languages', items: ['Java', 'Python(Basic)'] },
  { category: 'Web Development', items: ['Node.js', 'Express', 'REST APIs', 'React.js', 'HTML/CSS/JavaScript'] },
  { category: 'Database', items: ['MongoDB', 'MySQL'] },
  { category: 'Testing Tools', items: ['Postman'] },
  { category: 'Version Control', items: ['Git', 'GitHub'] },
  { category: 'Other Tools', items: ['VSCode'] },
];

const PROJECTS = [
  {
    title: 'Enhancing Query Response Efficiency for SLU Enrollment through Generative AI',
    description: 'Navibot is a virtual assistant that helps students with a smooth and faster enrollment experience by providing swift response to their queries.',
    tags: ['Python', 'Flask', 'HTML/CSS/JavaScript', 'Gunicorn', 'JSON'],
    liveLink: '',
    repoLink: '',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
  },
  {
    title: 'Centralized Web System for BIP Steadfast Ground Inc.',
    description: 'A centralized web system that streamlines operations, enhances communication, and improves efficiency for BIP Steadfast Ground Inc.',
    tags: ['HTML/CSS/JavaScript', 'React', 'Express', 'Node.js', 'MongoDB'],
    liveLink: '',
    repoLink: '',
    image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&q=80',
  },
  {
    title: 'Navibot: Enhancing Query Response Efficiency for SLU Enrollment through Generative AI (Wordpress)',
    description: 'A website created using wordpress to showcase the project navibot.',
    tags: ['Wordpress'],
    liveLink: '',
    repoLink: '',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80',
  },
];

const EXPERIENCE = [
  {
    year: '2025-Present',
    title: 'Freelance Web Developer',
    company: '',
    description: 'Building websites for local businesses and personal projects, utilizing modern web technologies to create responsive and user-friendly interfaces.',
  },
  {
    year: '2025',
    title: 'Web Developer',
    company: 'BIP Steadfast Ground Inc.',
    description: 'Built a centralized web system for BIP Steadfast Ground Inc.',
  },
  {
    year: '2020-2025',
    title: 'IT Student',
    company: 'Saint Louis University',
    description: 'Pursuing a Bachelor of Science in Information Technology with a focus on software development. Graduated with honor(cum laude) in 2025.',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// HOOKS
// ══════════╝═╝═╝═╝═╝═╝═╝═╝═╝═╝═╝═╝═╝═╝═╝═╝═╝═╝═╝═╝═╝═╝═╝═╝═╝═╝─

function useScrollFade() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Hero Section ────────────────────────────────────────────────────────────
function Hero({ onNavigate }) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = ['Web Developer'];

  useEffect(() => {
    const handleType = () => {
      const current = loopNum % roles.length;
      const fullText = roles[current];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <p className="hero-greeting">Hi, my name is</p>
          <h1 className="hero-name">Timothy Jue G. Angway</h1>
          <h2 className="hero-title">
            I'm a <span className="typewriter">{text}</span>
            <span className="cursor">|</span>
          </h2>
          <p className="hero-description">
            I build exceptional digital experiences. Specializing in creating responsive,
            user-friendly web applications with modern technologies.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => onNavigate('projects')}>
              View My Work
            </button>
            <button className="btn btn-secondary" onClick={() => onNavigate('contact')}>
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About Section ───────────────────────────────────────────────────────────
function About() {
  const [ref, isVisible] = useScrollFade();

  return (
    <section id="about" className="about" ref={ref}>
      <div className={`container fade-in ${isVisible ? 'visible' : ''}`}>
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Hello! I'm Timothy, a passionate web developer.
              I enjoy creating things that live on the internet, whether that be websites,
              applications, or anything in between.
            </p>
            <p>
              My interest in web development started back in 2019 when I decided to
              try building my first website — turns out, I loved it!.
            </p>
            <p>
              I'm passionate about writing clean, efficient code and creating seamless
              user experiences.
            </p>
          </div>
          <div className="about-image">
            <div className="image-wrapper">
              <img src={profilePic} alt="Timothy Angway" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills Section ──────────────────────────────────────────────────────────
function Skills() {
  const [ref, isVisible] = useScrollFade();

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className={`container fade-in ${isVisible ? 'visible' : ''}`}>
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-grid">
          {SKILLS.map((skillGroup, index) => (
            <div key={index} className="skill-category">
              <h3>{skillGroup.category}</h3>
              <div className="skill-tags">
                {skillGroup.items.map((skill, i) => (
                  <span key={i} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects Section ────────────────────────────────────────────────────────
function Projects() {
  const [ref, isVisible] = useScrollFade();

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className={`container fade-in ${isVisible ? 'visible' : ''}`}>
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="project-image">
        <img src={project.image} alt={project.title} />
        <div className={`project-overlay ${isHovered ? 'visible' : ''}`}>
          <div className="project-links">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              View Live
            </a>
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              Source Code
            </a>
          </div>
        </div>
      </div>
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span key={i} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Experience Section ──────────────────────────────────────────────────────
function Experience() {
  const [ref, isVisible] = useScrollFade();

  return (
    <section id="experience" className="experience" ref={ref}>
      <div className={`container fade-in ${isVisible ? 'visible' : ''}`}>
        <h2 className="section-title">Career Journey</h2>
        <div className="timeline">
          {EXPERIENCE.map((job, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-year">{job.year}</div>
              <div className="timeline-content">
                <h3>{job.title}</h3>
                <h4>{job.company}</h4>
                <p>{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ─────────────────────────────────────────────────────────
function Contact() {
  const [ref, isVisible] = useScrollFade();

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className={`container fade-in ${isVisible ? 'visible' : ''}`}>
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <p className="contact-description">
            I'm currently open to new opportunities and interesting projects.
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
          <div className="contact-links">
            <a href="mailto:timothyangway@email.com" className="contact-link">
              <span className="icon">✉️</span>
              <span>timothyangway@email.com</span>
            </a>
            <a
              href="https://github.com/timothyangway"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="icon">💻</span>
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/timothyangway"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="icon">💼</span>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════

function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <button className="nav-logo" onClick={() => scrollToSection('home')}>
            TJA
          </button>

          <button
            className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(link.id)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Hero onNavigate={scrollToSection} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Timothy Jue G. Angway. Built with React.</p>
        </div>
      </footer>
    </div>
  );
}

export default Portfolio;