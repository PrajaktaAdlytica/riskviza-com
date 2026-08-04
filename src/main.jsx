import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDot,
  ClipboardCheck,
  DatabaseZap,
  ExternalLink,
  FileCheck2,
  Globe2,
  Layers3,
  Linkedin,
  LineChart,
  Network,
  Newspaper,
  Radar,
  ScanLine,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { siBox, siDatadog, siGooglecloud, siJira, siOkta, siSnowflake } from "simple-icons";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const navGroups = [
  {
    label: "Products",
    items: [
      ["Riskviza Register", "/products/register"],
      ["Riskviza Evidence", "/products/evidence"],
      ["Riskviza Vendors", "/products/vendors"],
    ],
  },
  {
    label: "Solutions",
    items: [
      ["Risk managers", "/solutions#risk-managers"],
      ["Compliance teams", "/solutions#compliance"],
      ["Insurers", "/solutions#insurers"],
      ["Boards", "/solutions#boards"],
    ],
  },
  {
    label: "Resources",
    items: [
      ["EU risk guides", "/resources"],
      ["Board pack examples", "/resources#board-pack"],
      ["Regulatory map", "/resources#regulations"],
    ],
  },
];

const fundingAnnouncement = {
  date: "Jan 15, 2026",
  dateTime: "2026-01-15",
  title: "Riskviza secures $545K in funding from Dlabs.",
  description: "Riskviza is part of Dlabs’ global portfolio of companies building cyber-risk intelligence for complex operating environments.",
  dlabsUrl: "https://d-labs-site.vercel.app/companies",
  linkedInUrl: "https://www.linkedin.com/company/riskvisa/",
  crunchbaseUrl: "https://www.crunchbase.com/organization/riskviza",
};

const logoPartners = [
  { label: "AWS", mark: "aws", color: "#ff9900" },
  { label: "Microsoft", mark: "microsoft", color: "#5e5e5e" },
  { label: "Google Cloud", icon: siGooglecloud, color: `#${siGooglecloud.hex}` },
  { label: "Okta", icon: siOkta, color: `#${siOkta.hex}` },
  { label: "ServiceNow", mark: "servicenow", color: "#00a86b" },
  { label: "Jira", icon: siJira, color: `#${siJira.hex}` },
  { label: "Slack", mark: "slack", color: "#4a154b" },
  { label: "Snowflake", icon: siSnowflake, color: `#${siSnowflake.hex}` },
  { label: "Datadog", icon: siDatadog, color: `#${siDatadog.hex}` },
  { label: "Box", icon: siBox, color: `#${siBox.hex}` },
];

const homeSolutions = [
  ["risk-managers", "Risk managers", Radar, "Track appetite, movement, ownership, and evidence across every risk domain."],
  ["compliance", "Compliance teams", ClipboardCheck, "Reuse controls and evidence across NIS2, DORA, EU AI Act, CSRD, and GDPR."],
  ["insurers", "Insurers", Building2, "Understand client resilience, vendor exposure, and assurance confidence before renewal."],
  ["boards", "Boards", UsersRound, "See the decision needed, the evidence behind it, and what changed since last meeting."],
];

const statistics = [
  ["74%", "evidence reused across mapped frameworks", "Evidence reuse", 74, "#7c3df2"],
  ["12 min", "to prepare a board-ready risk brief", "Board pack", 88, "#38d5b5"],
  ["5", "risk domains connected in one operating model", "Domains", 62, "#f5b84b"],
  ["28", "critical vendors surfaced by business impact", "Vendor priority", 79, "#61a5ff"],
];

const pricingPlans = [
  {
    name: "Register",
    price: "€1,900",
    caption: "per month, billed annually",
    body: "For teams replacing spreadsheet risk registers with one board-ready operating view.",
    items: ["Cyber, AI, ESG, vendor, and operational risk", "Risk appetite and owner workflows", "Board movement reports"],
  },
  {
    name: "Assurance",
    price: "€3,800",
    caption: "per month, billed annually",
    body: "For compliance teams managing frameworks, evidence, controls, and audit readiness.",
    items: ["Evidence reuse across EU frameworks", "Control mapping and freshness scoring", "Audit trail and review cycles"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    caption: "for regulated groups and insurers",
    body: "For multi-entity programs with vendor graphs, board packs, SSO, and custom risk models.",
    items: ["Vendor and ICT criticality graph", "Custom reporting packs", "SSO, onboarding, and advisory support"],
  },
];

const frameworkData = [
  { name: "NIS2", value: 82, color: "#38d5b5", detail: "Cyber controls, supply-chain risk, incident evidence" },
  { name: "DORA", value: 74, color: "#7c3df2", detail: "ICT provider register, resilience testing, board oversight" },
  { name: "EU AI Act", value: 68, color: "#f5b84b", detail: "AI system inventory, risk classification, human review" },
  { name: "CSRD", value: 61, color: "#0d9b87", detail: "Double materiality, ESG evidence, supplier data" },
  { name: "GDPR", value: 79, color: "#61a5ff", detail: "Processors, breach response, DPIA evidence" },
];

const productCards = [
  {
    id: "register",
    title: "Riskviza Register",
    eyebrow: "One risk spine",
    icon: DatabaseZap,
    route: "/products/register",
    body: "Unify cyber, vendor, AI, ESG, and operational risks with owners, controls, evidence, incidents, and board priority in one live register.",
    metric: "5 domains",
    accent: "#38d5b5",
  },
  {
    id: "evidence",
    title: "Riskviza Evidence",
    eyebrow: "Proof, always ready",
    icon: FileCheck2,
    route: "/products/evidence",
    body: "Connect every control, review, vendor, AI system, incident, and ESG disclosure to fresh evidence with confidence scoring and audit trails.",
    metric: "74% reuse",
    accent: "#7c3df2",
  },
  {
    id: "vendors",
    title: "Riskviza Vendors",
    eyebrow: "Dependencies under control",
    icon: Network,
    route: "/products/vendors",
    body: "Map ICT providers, AI vendors, critical suppliers, contracts, questionnaires, incidents, and ESG flags into your board-level risk view.",
    metric: "240 vendors",
    accent: "#f5b84b",
  },
];

const painTabs = [
  {
    label: "Disconnected risks",
    title: "Separate registers create false confidence.",
    body: "Cyber, vendor, AI, ESG, and operational risk all move together, but most teams report them separately. Riskviza keeps the links visible.",
    stat: "5",
    statLabel: "risk domains connected",
    visual: "matrix",
  },
  {
    label: "Evidence chasing",
    title: "Proof sits in folders, email, and screenshots.",
    body: "Evidence freshness, ownership, and control coverage are visible before audit, not discovered during it.",
    stat: "91%",
    statLabel: "evidence with owners",
    visual: "evidence",
  },
  {
    label: "Vendor blind spots",
    title: "Third parties change faster than review cycles.",
    body: "Riskviza Vendors connects ICT criticality, AI usage, cyber posture, contracts, and ESG exposure to business impact.",
    stat: "28",
    statLabel: "critical vendors flagged",
    visual: "vendors",
  },
  {
    label: "AI risk gaps",
    title: "AI systems need governance before the board asks.",
    body: "Inventory AI systems, classify risk, link controls, track vendor use, and keep evidence ready for EU AI Act conversations.",
    stat: "16",
    statLabel: "AI systems mapped",
    visual: "ai",
  },
  {
    label: "Board delays",
    title: "Dashboards do not automatically become decisions.",
    body: "Generate board-ready packs with decision prompts, evidence confidence, owner status, and the risk movement that changed this month.",
    stat: "12m",
    statLabel: "to prepare a board brief",
    visual: "board",
  },
];

const people = [
  {
    name: "Aleksandra Nowak",
    role: "Chief Risk Officer",
    quote: "I need one view that makes risk appetite, evidence, and ownership defensible for the board.",
  },
  {
    name: "Marek Kowalski",
    role: "Compliance Lead",
    quote: "The hard part is not knowing the regulation. It is proving we did the work without rebuilding the file every quarter.",
  },
  {
    name: "Ewa Zielinska",
    role: "Insurance Risk Partner",
    quote: "Riskviza gives underwriting and resilience teams a shared picture of client controls and vendor exposure.",
  },
];

const productPageData = {
  register: {
    title: "Riskviza Register",
    subtitle: "One board-ready register for cyber, vendor, AI, ESG, and operational risk.",
    accent: "#38d5b5",
    icon: DatabaseZap,
    stats: ["5 risk domains", "42 controls mapped", "12 board decisions"],
    bullets: [
      "Risk scoring with appetite, owner, and impact context",
      "Control and evidence links without duplicate spreadsheets",
      "Board-priority status and decision prompts",
    ],
  },
  evidence: {
    title: "Riskviza Evidence",
    subtitle: "Turn scattered proof into audit-ready assurance with freshness, ownership, and confidence scoring.",
    accent: "#7c3df2",
    icon: FileCheck2,
    stats: ["74% evidence reuse", "91% owner coverage", "38 stale items found"],
    bullets: [
      "Evidence chain from risk to control to review",
      "Reusable proof across NIS2, DORA, AI Act, CSRD, and GDPR",
      "Audit trails, due dates, and confidence levels for every item",
    ],
  },
  vendors: {
    title: "Riskviza Vendors",
    subtitle: "Connect every critical third party to risk, controls, contracts, incidents, and board impact.",
    accent: "#f5b84b",
    icon: Network,
    stats: ["240 vendors", "28 critical suppliers", "9 AI providers"],
    bullets: [
      "ICT provider register with criticality and business service links",
      "Vendor risk by cyber, AI, ESG, privacy, and operational domain",
      "Contract obligations, questionnaires, and remediation tracking",
    ],
  },
};

function useRoute() {
  const [path, setPath] = useState(window.location.pathname + window.location.hash);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname + window.location.hash);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (href) => {
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.history.pushState({}, "", href);
    setPath(window.location.pathname + window.location.hash);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { path, navigate };
}

function useGsapMotion(path) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          },
        );
      });
      gsap.utils.toArray(".chart-fill").forEach((el) => {
        const target = el.getAttribute("data-width") || "70%";
        gsap.fromTo(
          el,
          { width: "8%" },
          {
            width: target,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          },
        );
      });
      gsap.utils.toArray(".float-card").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 ? 10 : -10,
          duration: 2.8 + i * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
      gsap.utils.toArray(".scroll-lift").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 34 },
          {
            y: -18,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      });
    });
    return () => ctx.revert();
  }, [path]);
}

function Logo({ reverse = false, navigate }) {
  return (
    <button className={`brand ${reverse ? "brand-reverse" : ""}`} onClick={() => navigate("/")}>
      <img src="/brand/riskviza-mark.svg" alt="" />
      <span>Riskviza</span>
    </button>
  );
}

function AppLink({ href, children, navigate, className = "" }) {
  return (
    <button className={className} onClick={() => navigate(href)}>
      {children}
    </button>
  );
}

function Header({ navigate }) {
  const [mobile, setMobile] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Logo navigate={navigate} />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <AppLink href="/platform" navigate={navigate} className="nav-link">
            Platform
          </AppLink>
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <button className="nav-trigger">
                {group.label} <ChevronDown size={15} />
              </button>
              <div className="nav-menu">
                {group.items.map(([label, href]) => (
                  <AppLink key={label} href={href} navigate={navigate} className="nav-menu-link">
                    {label}
                  </AppLink>
                ))}
              </div>
            </div>
          ))}
          <AppLink href="/company" navigate={navigate} className="nav-link">
            Company
          </AppLink>
          <AppLink href="/news/funding-announcement" navigate={navigate} className="nav-link">
            News
          </AppLink>
        </nav>
        <div className="nav-actions">
          <AppLink href="/signin" navigate={navigate} className="ghost-button">
            Log in
          </AppLink>
          <AppLink href="/demo" navigate={navigate} className="primary-button small">
            Request demo <ArrowRight size={17} />
          </AppLink>
          <button className="mobile-toggle" onClick={() => setMobile(!mobile)} aria-label="Open menu">
            <span />
            <span />
          </button>
        </div>
      </div>
      {mobile && (
        <div className="mobile-menu">
          {[["Platform", "/platform"], ...navGroups.flatMap((g) => g.items), ["Company", "/company"], ["News", "/news/funding-announcement"], ["Request demo", "/demo"]].map(
            ([label, href]) => (
              <AppLink key={label} href={href} navigate={(url) => { setMobile(false); navigate(url); }} className="mobile-link">
                {label}
              </AppLink>
            ),
          )}
        </div>
      )}
    </header>
  );
}

function RiskSignalCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    let raf;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      const lines = 9;
      for (let j = 0; j < lines; j += 1) {
        ctx.beginPath();
        const hueShift = j / lines;
        ctx.strokeStyle = j % 3 === 0 ? "rgba(56,213,181,.32)" : j % 3 === 1 ? "rgba(124,61,242,.22)" : "rgba(245,184,75,.2)";
        ctx.lineWidth = j % 2 ? 1.2 : 1.8;
        for (let x = -40; x <= width + 40; x += 16) {
          const y =
            height * (0.48 + (j - lines / 2) * 0.035) +
            Math.sin(x * 0.012 + frame * 0.015 + j * 0.7) * (20 + j * 3) +
            Math.cos(x * 0.006 + frame * 0.01 + hueShift) * 26;
          if (x === -40) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      frame += 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className="risk-signal-canvas" ref={ref} aria-hidden="true" />;
}

function HeroDashboard() {
  return (
    <div className="hero-dashboard float-card" aria-label="Riskviza dashboard preview">
      <div className="dashboard-top">
        <div>
          <span className="ui-kicker">Board risk pack</span>
          <h3>January risk committee</h3>
        </div>
        <span className="status-pill ok">Evidence confidence 91%</span>
      </div>
      <div className="board-grid">
        <div className="panel tall">
          <div className="panel-head">
            <span>Risk by domain</span>
            <BarChart3 size={16} />
          </div>
          {[
            ["Cyber", 82, "#38d5b5"],
            ["Vendor", 67, "#7c3df2"],
            ["AI", 49, "#f5b84b"],
            ["ESG", 38, "#0d9b87"],
            ["Ops", 72, "#61a5ff"],
          ].map(([label, width, color]) => (
            <div className="bar-row" key={label}>
              <span>{label}</span>
              <div className="bar-track">
                <div className="chart-fill" data-width={`${width}%`} style={{ background: color }} />
              </div>
              <b>{width}</b>
            </div>
          ))}
        </div>
        <div className="panel">
          <span className="ui-kicker">Decision needed</span>
          <strong>Approve vendor remediation budget</strong>
          <p>CloudAtlas controls failed across DORA and NIS2 mappings.</p>
        </div>
        <div className="panel donut-panel">
          <Donut value={74} color="#7c3df2" label="Evidence reuse" />
        </div>
        <div className="panel wide">
          <div className="line-chart">
            <svg viewBox="0 0 320 98" role="img" aria-label="Risk trend chart">
              <path d="M8 72 C 54 24, 90 86, 135 43 S 224 20, 312 36" fill="none" stroke="#38d5b5" strokeWidth="5" strokeLinecap="round" />
              <path d="M8 82 C 58 68, 92 78, 136 59 S 232 44, 312 57" fill="none" stroke="#7c3df2" strokeWidth="3" strokeDasharray="8 10" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <span className="ui-kicker">Trend</span>
            <strong>Vendor AI exposure rose 18%</strong>
          </div>
        </div>
      </div>
      <div className="dashboard-footer">
        {["NIS2", "DORA", "AI Act", "CSRD", "GDPR"].map((item) => (
          <span key={item}>
            <Check size={14} /> {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Donut({ value, color, label }) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="donut">
      <svg viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={radius} fill="none" stroke="#dfe8e5" strokeWidth="10" />
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 48 48)"
        />
      </svg>
      <strong>{value}%</strong>
      <span>{label}</span>
    </div>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      <section className="hero-section">
        <RiskSignalCanvas />
        <div className="hero-inner">
          <div className="hero-copy reveal">
            <div className="hero-badge">
              <Sparkles size={16} /> EU-native risk intelligence for boards
            </div>
            <h1>Unify cyber, vendor, AI, ESG, and operational risk for board decisions.</h1>
            <p>
              Riskviza turns scattered registers, vendor files, evidence folders, and regulatory work into one board-ready risk view for EU-regulated teams.
            </p>
            <div className="hero-actions">
              <AppLink href="/demo" navigate={navigate} className="primary-button">
                Request demo <ArrowRight size={18} />
              </AppLink>
              <AppLink href="/platform" navigate={navigate} className="secondary-button">
                Explore platform
              </AppLink>
            </div>
            <div className="hero-proof">
              <span>Warsaw built</span>
              <span>NIS2 + DORA ready</span>
              <span>Board pack first</span>
            </div>
          </div>
          <HeroDashboard />
        </div>
      </section>
      <TrustStrip />
      <PainExplorer />
      <ProductModules navigate={navigate} />
      <FundingAnnouncement navigate={navigate} />
      <SolutionsPreview navigate={navigate} />
      <StatsSection />
      <FrameworkMapper />
      <BoardSection />
      <PersonaSection />
      <PricingSection navigate={navigate} />
      <DemoBand navigate={navigate} />
    </>
  );
}

function FundingAnnouncement({ navigate }) {
  return (
    <section className="funding-announcement reveal" aria-labelledby="funding-announcement-title">
      <div className="funding-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="funding-content">
        <div className="funding-meta">
          <span className="eyebrow">Funding announcement</span>
          <time dateTime={fundingAnnouncement.dateTime}><CalendarDays size={15} /> {fundingAnnouncement.date}</time>
        </div>
        <h2 id="funding-announcement-title">{fundingAnnouncement.title}</h2>
        <p>{fundingAnnouncement.description}</p>
      </div>
      <div className="funding-actions">
        <a className="secondary-button funding-external" href={fundingAnnouncement.dlabsUrl} target="_blank" rel="noreferrer noopener">
          View Dlabs portfolio <ExternalLink size={16} />
        </a>
        <AppLink href="/news/funding-announcement" navigate={navigate} className="funding-read-link">
          Read announcement <ArrowRight size={16} />
        </AppLink>
        <div className="funding-profile-links" aria-label="Riskviza company profiles">
          <a href={fundingAnnouncement.linkedInUrl} target="_blank" rel="noreferrer noopener">LinkedIn <ExternalLink size={13} /></a>
          <a href={fundingAnnouncement.crunchbaseUrl} target="_blank" rel="noreferrer noopener">Crunchbase <ExternalLink size={13} /></a>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const logos = [...logoPartners, ...logoPartners, ...logoPartners];
  return (
    <section className="logo-marquee-section reveal" aria-label="Riskviza integration ecosystem">
      <div className="logo-marquee-copy">
        <span className="eyebrow">Connects with the tools teams already trust</span>
        <p>Risk, evidence, vendor, and board workflows stay connected across cloud, identity, ticketing, storage, and assurance systems.</p>
      </div>
      <div className="logo-marquee">
        <div className="logo-track">
          {logos.map((partner, i) => (
            <BrandLogo partner={partner} key={`${partner.label}-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandLogo({ partner }) {
  return (
    <span className="logo-wordmark" style={{ "--logo-color": partner.color }} aria-label={partner.label}>
      {partner.icon ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={partner.icon.path} />
        </svg>
      ) : (
        <CustomPartnerMark type={partner.mark} />
      )}
      <span>{partner.label}</span>
    </span>
  );
}

function CustomPartnerMark({ type }) {
  if (type === "microsoft") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="microsoft-logo">
        <rect x="2" y="2" width="9" height="9" fill="#f25022" />
        <rect x="13" y="2" width="9" height="9" fill="#7fba00" />
        <rect x="2" y="13" width="9" height="9" fill="#00a4ef" />
        <rect x="13" y="13" width="9" height="9" fill="#ffb900" />
      </svg>
    );
  }
  if (type === "slack") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="slack-logo">
        <circle cx="7" cy="7" r="3" fill="#36c5f0" />
        <circle cx="17" cy="7" r="3" fill="#2eb67d" />
        <circle cx="7" cy="17" r="3" fill="#ecb22e" />
        <circle cx="17" cy="17" r="3" fill="#e01e5a" />
      </svg>
    );
  }
  if (type === "servicenow") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="#00a86b" />
        <circle cx="12" cy="12" r="4.5" fill="#ffffff" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 17.2c3.9 2.4 11.6 2.4 16 0" fill="none" stroke="#ff9900" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M7.4 7.1h9.2v3.1H10.8v1.8h5.4v3H7.4V7.1Z" fill="#23303a" />
    </svg>
  );
}

function SolutionsPreview({ navigate }) {
  return (
    <section className="section solutions-preview">
      <div className="section-heading reveal">
        <span className="eyebrow">Solutions</span>
        <h2>Different teams. One evidence-backed risk picture.</h2>
      </div>
      <div className="solution-preview-grid">
        {homeSolutions.map(([id, title, Icon, body]) => (
          <AppLink href={`/solutions#${id}`} navigate={navigate} className="solution-card reveal scroll-lift" key={id}>
            <Icon size={24} />
            <h3>{title}</h3>
            <p>{body}</p>
            <span>View solution <ArrowRight size={15} /></span>
          </AppLink>
        ))}
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="stats-section reveal">
      <div className="stats-copy">
        <span className="eyebrow">Operational proof</span>
        <h2>Statistics that make risk progress visible.</h2>
        <p>
          The homepage proof layer is built around the metrics boards actually ask for: evidence confidence, decision speed, domain coverage, and vendor exposure.
        </p>
      </div>
      <div className="stats-showcase">
        <div className="stats-grid">
          {statistics.map(([value, label, tag, width, color]) => (
            <article className="stat-card scroll-lift" key={label} style={{ "--stat-color": color }}>
              <span>{tag}</span>
              <strong>{value}</strong>
              <p>{label}</p>
              <i><em className="chart-fill" data-width={`${width}%`} /></i>
            </article>
          ))}
        </div>
        <div className="stats-visual scroll-lift" aria-label="Riskviza statistics dashboard preview">
          <div className="stats-visual-top">
            <span>Board readiness index</span>
            <b>91%</b>
          </div>
          <div className="stats-bars">
            {[
              ["Evidence confidence", 91],
              ["Control coverage", 82],
              ["Vendor criticality mapped", 76],
              ["Decision owners assigned", 88],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <i><em className="chart-fill" data-width={`${value}%`} /></i>
                <b>{value}%</b>
              </div>
            ))}
          </div>
          <svg viewBox="0 0 360 118" aria-hidden="true">
            <path d="M12 84 C 58 38, 98 78, 142 54 S 238 18, 348 42" fill="none" stroke="#38d5b5" strokeWidth="6" strokeLinecap="round" />
            <path d="M12 98 C 70 80, 116 92, 168 72 S 266 52, 348 68" fill="none" stroke="#7c3df2" strokeWidth="4" strokeDasharray="8 11" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}

function VisualMock({ type }) {
  if (type === "evidence") {
    return (
      <div className="tab-visual evidence-visual">
        <div className="evidence-chain">
          {["Risk", "Control", "Owner", "Evidence", "Board note"].map((item, i) => (
            <div className="chain-step" key={item}>
              <span>{i + 1}</span>
              <strong>{item}</strong>
              <small>{i === 3 ? "Fresh 3m ago" : "Linked"}</small>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (type === "vendors") {
    return (
      <div className="tab-visual vendor-visual">
        <div className="vendor-card critical">
          <span>CloudAtlas</span>
          <b>Critical ICT</b>
          <small>DORA evidence overdue</small>
        </div>
        <div className="vendor-card">
          <span>ModelWorks AI</span>
          <b>AI provider</b>
          <small>EU AI Act review</small>
        </div>
        <div className="vendor-card">
          <span>GreenLedger</span>
          <b>ESG supplier</b>
          <small>CSRD data pending</small>
        </div>
      </div>
    );
  }
  if (type === "ai") {
    return (
      <div className="tab-visual ai-visual">
        <div className="ai-node core">Customer scoring AI</div>
        {["Data", "Vendor", "Human review", "Evidence"].map((item, i) => (
          <div className={`ai-node n${i}`} key={item}>{item}</div>
        ))}
      </div>
    );
  }
  if (type === "board") {
    return (
      <div className="tab-visual board-visual">
        <div className="mini-board">
          <span>Board pack</span>
          <h4>3 decisions this month</h4>
          <div className="decision-row"><b>1</b> Vendor remediation</div>
          <div className="decision-row"><b>2</b> AI model approval</div>
          <div className="decision-row"><b>3</b> ESG supplier exception</div>
        </div>
      </div>
    );
  }
  return (
    <div className="tab-visual matrix-visual">
      {["Cyber", "Vendor", "AI", "ESG", "Ops"].map((row, i) => (
        <div className="matrix-row" key={row}>
          <span>{row}</span>
          <i style={{ width: `${42 + i * 9}%` }} />
        </div>
      ))}
    </div>
  );
}

function PainExplorer() {
  const [active, setActive] = useState(0);
  const current = painTabs[active];
  return (
    <section className="section pain-section">
      <div className="section-heading reveal">
        <span className="eyebrow">Segmented problem explorer</span>
        <h2>Risk teams do not have one risk problem. They have five disconnected views.</h2>
      </div>
      <div className="pain-tabs reveal" role="tablist" aria-label="Risk problems">
        {painTabs.map((tab, i) => (
          <button key={tab.label} className={active === i ? "active" : ""} onClick={() => setActive(i)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pain-content reveal">
        <VisualMock type={current.visual} />
        <div className="pain-copy">
          <span className="stat-large">{current.stat}</span>
          <small>{current.statLabel}</small>
          <h3>{current.title}</h3>
          <p>{current.body}</p>
        </div>
      </div>
    </section>
  );
}

function ProductModules({ navigate }) {
  return (
    <section className="section products-section">
      <div className="section-heading reveal">
        <span className="eyebrow">Products</span>
        <h2>Three connected products. One risk operating layer.</h2>
      </div>
      <div className="product-grid">
        {productCards.map((card) => {
          const Icon = card.icon;
          return (
            <AppLink href={card.route} navigate={navigate} className="product-card reveal" key={card.id}>
              <div className="product-top">
                <span className="product-icon" style={{ "--accent": card.accent }}>
                  <Icon size={23} />
                </span>
                <span>{card.eyebrow}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <div className="product-metric">
                <b>{card.metric}</b>
                <span>live in platform</span>
              </div>
              <div className="learn-line">Open product <ArrowRight size={16} /></div>
            </AppLink>
          );
        })}
      </div>
    </section>
  );
}

function FrameworkMapper() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % frameworkData.length), 2200);
    return () => clearInterval(id);
  }, []);

  const current = frameworkData[active];
  return (
    <section className="section mapper-section">
      <div className="mapper-copy reveal">
        <span className="eyebrow">Animated framework mapping</span>
        <h2>Map one control across every EU obligation.</h2>
        <p>
          Riskviza cross-maps risks, controls, evidence, vendors, and board findings across NIS2, DORA, EU AI Act, CSRD, and GDPR, so teams do not repeat the same work.
        </p>
        <div className="mapper-stat">
          <strong>74%</strong>
          <span>evidence reuse across mapped frameworks</span>
        </div>
      </div>
      <div className="framework-ui reveal">
        <div className="framework-tabs">
          {frameworkData.map((item, i) => (
            <button key={item.name} className={active === i ? "active" : ""} onClick={() => setActive(i)}>
              {item.name}
            </button>
          ))}
        </div>
        <div className="framework-screen">
          <div className="screen-header">
            <span>{current.name} control map</span>
            <b>{current.value}% ready</b>
          </div>
          <div className="control-stack">
            {["Access governance", "Incident evidence", "Vendor oversight", "Board reporting"].map((item, i) => (
              <div className="control-row" key={item}>
                <CircleDot size={16} style={{ color: i === active % 4 ? current.color : "#91a09c" }} />
                <span>{item}</span>
                <div className="mini-track"><i style={{ width: `${current.value - i * 8}%`, background: current.color }} /></div>
              </div>
            ))}
          </div>
          <div className="framework-detail">
            <Donut value={current.value} color={current.color} label="mapped" />
            <p>{current.detail}</p>
          </div>
        </div>
        <div className="chip-row">
          {["Risk Register", "Vendor Evidence", "AI Controls", "Board Pack", "Audit Trail"].map((chip) => (
            <span key={chip}><Check size={13} />{chip}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function BoardSection() {
  return (
    <section className="board-section">
      <div className="board-copy reveal">
        <span className="eyebrow dark">Board-room output</span>
        <h2>From risk noise to board decisions.</h2>
        <p>
          Riskviza makes every report explain what changed, why it matters, which decision is needed, and what evidence supports the recommendation.
        </p>
      </div>
      <div className="board-dashboard reveal scroll-lift">
        <div className="board-window-top">
          <div className="window-dots"><i /><i /><i /></div>
          <span>riskviza.app / board-pack / jan-2026</span>
          <b>Live</b>
        </div>
        <div className="board-app">
          <aside className="board-sidebar">
            <Logo reverse navigate={() => {}} />
            {["Overview", "Decisions", "Evidence", "Vendors"].map((item, i) => (
              <span className={i === 1 ? "active" : ""} key={item}>{item}</span>
            ))}
          </aside>
          <div className="board-workspace">
            <div className="workspace-head">
              <div>
                <small>Risk Committee</small>
                <h3>Board decision pack</h3>
              </div>
              <span className="status-pill ok">91% evidence confidence</span>
            </div>
            <div className="board-kpis">
              {[
                ["3", "decisions open"],
                ["€420k", "exposure reduced"],
                ["28", "critical vendors"],
              ].map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="board-dashboard-grid">
              <div className="risk-table">
                <div className="table-head"><span>Agenda item</span><span>Owner</span><span>Status</span></div>
                {[
                  ["CloudAtlas remediation", "A. Nowak", "Approve"],
                  ["AI vendor exception", "M. Kowalski", "Review"],
                  ["CSRD supplier gap", "E. Zielinska", "Monitor"],
                ].map(([name, owner, status]) => (
                  <div className="table-row" key={name}><span>{name}</span><span>{owner}</span><b>{status}</b></div>
                ))}
              </div>
              <div className="domain-panel">
                <span>Risk movement</span>
                {[
                  ["Cyber", 82],
                  ["Vendor", 67],
                  ["AI", 49],
                  ["ESG", 38],
                ].map(([label, width]) => (
                  <div className="mini-risk-row" key={label}><small>{label}</small><i><em style={{ width: `${width}%` }} /></i><b>{width}</b></div>
                ))}
              </div>
              <div className="board-line">
                <svg viewBox="0 0 540 150" aria-label="Decision trend chart">
                  <path d="M18 105 C 86 52, 128 96, 188 70 S 304 34, 522 56" fill="none" stroke="#38d5b5" strokeWidth="5" strokeLinecap="round" />
                  <path d="M18 124 C 98 112, 150 94, 222 102 S 370 72, 522 86" fill="none" stroke="#7c3df2" strokeWidth="4" strokeDasharray="9 11" strokeLinecap="round" />
                </svg>
                <div className="chart-legend"><span><i /> Exposure</span><span><i /> Control confidence</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PersonaSection() {
  return (
    <section className="section persona-section">
      <div className="section-heading reveal">
        <span className="eyebrow">Built for the people in the room</span>
        <h2>Riskviza speaks risk, compliance, insurance, and board language.</h2>
      </div>
      <div className="persona-grid">
        {people.map((person) => (
          <article className="persona-card reveal" key={person.name}>
            <div className="avatar">{person.name.split(" ").map((p) => p[0]).join("")}</div>
            <p>"{person.quote}"</p>
            <strong>{person.name}</strong>
            <span>{person.role}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function PricingSection({ navigate }) {
  return (
    <section className="section pricing-section">
      <div className="section-heading reveal">
        <span className="eyebrow">Pricing</span>
        <h2>Start with the risk layer you need. Expand when the program is ready.</h2>
      </div>
      <div className="pricing-grid">
        {pricingPlans.map((plan) => (
          <article className={`pricing-card reveal ${plan.featured ? "featured" : ""}`} key={plan.name}>
            {plan.featured && <span className="plan-badge">Most complete</span>}
            <h3>{plan.name}</h3>
            <strong>{plan.price}</strong>
            <small>{plan.caption}</small>
            <p>{plan.body}</p>
            <ul>
              {plan.items.map((item) => (
                <li key={item}><Check size={16} />{item}</li>
              ))}
            </ul>
            <AppLink href="/demo" navigate={navigate} className={plan.featured ? "primary-button full" : "secondary-button full"}>
              Talk to sales <ArrowRight size={16} />
            </AppLink>
          </article>
        ))}
      </div>
    </section>
  );
}

function DemoBand({ navigate }) {
  return (
    <section className="demo-band reveal">
      <div>
        <span className="eyebrow dark">Ready for the first board pack?</span>
        <h2>See how Riskviza turns fragmented risk into an evidence-backed decision flow.</h2>
      </div>
      <AppLink href="/demo" navigate={navigate} className="primary-button light">
        Request demo <ArrowRight size={18} />
      </AppLink>
    </section>
  );
}

function DottedSurface() {
  const dots = [];
  for (let row = 0; row < 12; row += 1) {
    for (let col = 0; col < 22; col += 1) {
      const lift = Math.sin(col * 0.58) * 14 + Math.cos(row * 0.72) * 10;
      dots.push({ row, col, lift });
    }
  }

  return (
    <div className="dotted-surface" aria-hidden="true">
      {dots.map((dot) => (
        <i
          key={`${dot.row}-${dot.col}`}
          style={{
            "--x": dot.col,
            "--y": dot.row,
            "--lift": `${dot.lift}px`,
            "--delay": `${(dot.row + dot.col) * 0.035}s`,
          }}
        />
      ))}
    </div>
  );
}

function PlatformHero() {
  return (
    <section className="platform-hero">
      <div className="platform-hero-inner">
        <div className="platform-hero-copy reveal">
          <span className="eyebrow">Platform overview</span>
          <h1>The EU risk intelligence layer between teams, evidence, vendors, and boards.</h1>
          <p>
            Riskviza connects registers, evidence trails, vendor dependencies, regulatory mappings, and board reporting into one operating picture.
          </p>
          <div className="platform-stat-row">
            {[
              ["5", "risk domains"],
              ["74%", "evidence reuse"],
              ["12m", "board pack"],
            ].map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="platform-surface-card reveal scroll-lift">
          <DottedSurface />
          <div className="surface-dashboard">
            <div className="surface-window">
              <div className="surface-head">
                <span>Riskviza operating layer</span>
                <b>Live graph</b>
              </div>
              <div className="surface-grid">
                {[
                  ["Cyber", 82, "#38d5b5"],
                  ["Vendors", 67, "#7c3df2"],
                  ["AI", 49, "#f5b84b"],
                  ["ESG", 38, "#0d9b87"],
                  ["Ops", 72, "#61a5ff"],
                ].map(([label, value, color]) => (
                  <div className="surface-risk" key={label}>
                    <span>{label}</span>
                    <i><em style={{ width: `${value}%`, background: color }} /></i>
                    <b>{value}</b>
                  </div>
                ))}
              </div>
            </div>
            <div className="surface-card mini one">
              <small>DORA provider</small>
              <strong>CloudAtlas</strong>
              <span>Criticality high</span>
            </div>
            <div className="surface-card mini two">
              <small>Evidence</small>
              <strong>91%</strong>
              <span>freshness confidence</span>
            </div>
            <div className="surface-card mini three">
              <small>Board item</small>
              <strong>3</strong>
              <span>decisions pending</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformPage() {
  return (
    <main className="subpage">
      <PlatformHero />
      <section className="section architecture-section">
        <div className="architecture-grid">
          {["Signals", "Register", "Evidence", "Board pack"].map((item, i) => (
            <div className="architecture-node reveal" key={item}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{item}</h3>
              <p>{["Vendors, incidents, controls, AI systems, ESG inputs.", "One risk model with appetite, ownership, and business impact.", "Fresh proof linked to controls, obligations, and reviews.", "Decision-ready narrative with charts and confidence."][i]}</p>
            </div>
          ))}
        </div>
      </section>
      <FrameworkMapper />
    </main>
  );
}

function ProductPage({ slug, navigate }) {
  const item = productPageData[slug] || productPageData.register;
  const Icon = item.icon;
  return (
    <main className={`subpage product-page product-page-${slug}`}>
      <section className="product-hero">
        <div className="product-hero-copy reveal">
          <span className="eyebrow">Product</span>
          <div className="product-hero-icon" style={{ "--accent": item.accent }}>
            <Icon size={28} />
          </div>
          <h1>{item.title}</h1>
          <p>{item.subtitle}</p>
          <div className="product-hero-stats">
            {item.stats.map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
          </div>
        </div>
        <ProductVisualDashboard slug={slug} item={item} />
      </section>
      <section className="section product-detail-section">
        <div className="product-detail-copy reveal">
          <span className="eyebrow">Designed for real workflows</span>
          <h2>Built for risk teams that need proof, movement, and action.</h2>
          <ul>
            {item.bullets.map((bullet) => (
              <li key={bullet}><Check size={18} />{bullet}</li>
            ))}
          </ul>
        </div>
        <div className="detail-dashboard reveal" style={{ "--accent": item.accent }}>
          <div className="detail-header">
            <Icon size={24} />
            <span>{item.title} workspace</span>
          </div>
          <div className="detail-stats">
            {item.stats.map((stat) => (
              <strong key={stat}>{stat}</strong>
            ))}
          </div>
          <div className="detail-table">
            {["Owner review", "Evidence refresh", "Board finding", "Regulation map"].map((row, i) => (
              <div key={row}>
                <span>{row}</span>
                <b>{["Complete", "Due soon", "Drafted", "Mapped"][i]}</b>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProductCrossNav currentSlug={slug} navigate={navigate} />
    </main>
  );
}

function ProductVisualDashboard({ slug, item }) {
  const data = {
    register: {
      title: "Enterprise risk register",
      rows: [
        ["AI vendor exposure", "High", "A. Nowak", 82],
        ["DORA ICT dependency", "Critical", "M. Kowalski", 76],
        ["CSRD supplier data", "Medium", "E. Zielinska", 58],
      ],
      mini: ["5 domains", "42 controls", "12 decisions"],
      chart: ["M18 118 C 84 62, 134 110, 198 72 S 330 42, 430 70", "#38d5b5"],
    },
    evidence: {
      title: "Evidence confidence room",
      rows: [
        ["Access review proof", "Fresh", "Control A.12", 91],
        ["Vendor attestation", "Due soon", "DORA ICT", 68],
        ["AI human review", "Fresh", "EU AI Act", 74],
      ],
      mini: ["74% reuse", "91% owners", "38 stale"],
      chart: ["M18 112 C 72 86, 118 52, 176 78 S 308 104, 430 38", "#7c3df2"],
    },
    vendors: {
      title: "Vendor exposure graph",
      rows: [
        ["CloudAtlas", "Critical ICT", "DORA", 88],
        ["ModelWorks AI", "AI provider", "AI Act", 71],
        ["GreenLedger", "ESG supplier", "CSRD", 53],
      ],
      mini: ["240 vendors", "28 critical", "9 AI providers"],
      chart: ["M18 92 C 76 42, 122 60, 178 54 S 316 22, 430 84", "#f5b84b"],
    },
  }[slug];

  return (
    <div className="product-visual-dashboard reveal scroll-lift" style={{ "--accent": item.accent }}>
      <div className="product-browser-bar">
        <div className="window-dots"><i /><i /><i /></div>
        <span>riskviza.app / {slug}</span>
        <b>Live</b>
      </div>
      <div className="product-app-grid">
        <aside>
          <Logo reverse navigate={() => {}} />
          {["Overview", "Risks", "Evidence", "Board"].map((nav, i) => (
            <span className={i === 1 ? "active" : ""} key={nav}>{nav}</span>
          ))}
        </aside>
        <div className="product-app-main">
          <div className="product-app-head">
            <div>
              <small>{item.eyebrow}</small>
              <h3>{data.title}</h3>
            </div>
            <span className="status-pill ok">Board ready</span>
          </div>
          <div className="product-mini-stats">
            {data.mini.map((metric) => (
              <strong key={metric}>{metric}</strong>
            ))}
          </div>
          <div className="product-table-panel">
            {data.rows.map(([name, status, owner, score]) => (
              <div className="product-data-row" key={name}>
                <span>{name}</span>
                <b>{status}</b>
                <small>{owner}</small>
                <i><em style={{ width: `${score}%` }} /></i>
              </div>
            ))}
          </div>
          <div className="product-chart-panel">
            <svg viewBox="0 0 448 142" aria-hidden="true">
              <path d={data.chart[0]} fill="none" stroke={data.chart[1]} strokeWidth="6" strokeLinecap="round" />
              <path d="M18 124 C 92 98, 144 118, 208 92 S 330 70, 430 88" fill="none" stroke="#7c3df2" strokeWidth="4" strokeDasharray="8 10" strokeLinecap="round" opacity=".72" />
            </svg>
            <div className="product-pulse-dot" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCrossNav({ currentSlug, navigate }) {
  const nextProducts = productCards.filter((card) => card.id !== currentSlug);
  return (
    <section className="section product-cross-nav">
      <div className="section-heading reveal">
        <span className="eyebrow">Connected products</span>
        <h2>Move between the other Riskviza workspaces without losing context.</h2>
      </div>
      <div className="cross-product-grid">
        {nextProducts.map((card) => {
          const Icon = card.icon;
          return (
            <AppLink href={card.route} navigate={navigate} className="cross-product-card reveal" key={card.id}>
              <span className="product-icon" style={{ "--accent": card.accent }}>
                <Icon size={22} />
              </span>
              <div>
                <small>{card.eyebrow}</small>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <strong>{card.metric}</strong>
              </div>
              <ArrowRight size={18} />
            </AppLink>
          );
        })}
      </div>
    </section>
  );
}

function SolutionsPage() {
  return (
    <main className="subpage solutions-page">
      <section className="solutions-hero">
        <div className="solutions-hero-copy reveal">
          <span className="eyebrow">Solutions</span>
          <h1>One product surface for every risk conversation.</h1>
          <p>Risk leaders, compliance operators, insurers, and boards see the same source of truth through dashboards built for their decisions.</p>
        </div>
        <SolutionsCommandCenter />
      </section>
      <section className="section solution-grid enhanced">
        {[
          ["risk-managers", "Risk managers", Radar, "Risk appetite, domain movement, controls, and business impact in one live operating view."],
          ["compliance", "Compliance teams", ClipboardCheck, "Evidence, control mapping, review cycles, and audit readiness without repeated manual work."],
          ["insurers", "Insurers", Building2, "Client resilience, vendor exposure, and assurance evidence for underwriting and portfolio conversations."],
          ["boards", "Boards", UsersRound, "Concise board packs with decisions needed, evidence confidence, and movement since the last committee."],
        ].map(([id, title, Icon, body]) => (
          <article id={id} className="solution-card reveal" key={id}>
            <Icon size={24} />
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

function SolutionsCommandCenter() {
  return (
    <div className="solutions-command reveal scroll-lift">
      <div className="command-ring" aria-hidden="true">
        <i /><i /><i /><i />
      </div>
      <div className="command-panel primary">
        <span>Board view</span>
        <strong>3 decisions pending</strong>
        <div className="command-bars">
          <i><em style={{ width: "82%" }} /></i>
          <i><em style={{ width: "66%" }} /></i>
          <i><em style={{ width: "74%" }} /></i>
        </div>
      </div>
      <div className="command-panel top">
        <span>Compliance</span>
        <strong>91% evidence confidence</strong>
      </div>
      <div className="command-panel left">
        <span>Risk</span>
        <strong>AI exposure +18%</strong>
      </div>
      <div className="command-panel right">
        <span>Insurance</span>
        <strong>28 critical vendors</strong>
      </div>
    </div>
  );
}

function ResourcesPage() {
  return (
    <main className="subpage resources-page">
      <SubHero
        eyebrow="Resources"
        title="EU risk intelligence guides for teams moving beyond spreadsheet GRC."
        body="Practical, board-facing resources for NIS2, DORA, EU AI Act, CSRD, vendor oversight, and evidence programs."
      />
      <section className="section resource-grid">
        {[
          ["NIS2 board briefing template", "Cyber and supplier risk summary for management bodies.", BookOpenCheck],
          ["DORA ICT provider register checklist", "What insurers and financial entities should track.", FileCheck2],
          ["EU AI Act risk inventory worksheet", "AI system classification, controls, and evidence.", Sparkles],
          ["Board pack example", "A decision-ready monthly pack structure.", LineChart],
          ["Evidence freshness model", "How to rate assurance confidence.", ScanLine],
          ["Vendor criticality rubric", "Score ICT, AI, ESG, and operational exposure.", Network],
        ].map(([title, body, Icon], i) => (
          <article className="resource-card reveal" key={title} id={i === 3 ? "board-pack" : i === 1 ? "regulations" : undefined}>
            <Icon size={23} />
            <h3>{title}</h3>
            <p>{body}</p>
            <span>Read guide <ArrowRight size={15} /></span>
          </article>
        ))}
      </section>
    </main>
  );
}

function CompanyPage() {
  return (
    <main className="subpage company-page">
      <SubHero
        eyebrow="Company"
        title="Built in Warsaw for EU risk teams that need calmer board conversations."
        body="Riskviza is a Poland-based product company focused on the operating layer between risk, compliance, evidence, vendors, and boards."
      />
      <section className="section company-grid">
        <div className="company-card reveal">
          <h3>Riskviza sp. z o.o.</h3>
          <p>ul. Prosta 20, 00-850 Warszawa, Poland</p>
          <p>NIP 525-000-84-12</p>
          <p>hello@riskviza.com</p>
        </div>
        <div className="company-card reveal">
          <h3>Leadership</h3>
          <p>Aleksandra Nowak, CEO</p>
          <p>Marek Kowalski, Product and Risk</p>
          <p>Ewa Zielinska, Insurance Partnerships</p>
        </div>
      </section>
      <CredibilityRecord />
    </main>
  );
}

function CredibilityRecord() {
  return (
    <section className="section credibility-section reveal" aria-labelledby="credibility-title">
      <div>
        <span className="eyebrow">Company record</span>
        <h2 id="credibility-title">Backed by Dlabs</h2>
        <p>$545K funding</p>
      </div>
      <div className="credibility-links">
        <a href={fundingAnnouncement.dlabsUrl} target="_blank" rel="noreferrer noopener">Dlabs portfolio <ExternalLink size={15} /></a>
        <a href={fundingAnnouncement.linkedInUrl} target="_blank" rel="noreferrer noopener">LinkedIn <ExternalLink size={15} /></a>
        <a href={fundingAnnouncement.crunchbaseUrl} target="_blank" rel="noreferrer noopener">Crunchbase <ExternalLink size={15} /></a>
      </div>
    </section>
  );
}

function FundingArticlePage({ navigate }) {
  return (
    <main className="subpage funding-page">
      <section className="funding-article-hero">
        <div className="article-badge"><Newspaper size={17} /> Funding announcement</div>
        <time dateTime={fundingAnnouncement.dateTime}>{fundingAnnouncement.date}</time>
        <h1>{fundingAnnouncement.title}</h1>
        <p>{fundingAnnouncement.description}</p>
      </section>
      <article className="funding-article-body reveal">
        <div className="article-rule" aria-hidden="true" />
        <p>
          Riskviza has secured $545K in funding from Dlabs. The company is part of Dlabs’ global portfolio of companies building cyber-risk intelligence for complex operating environments.
        </p>
        <div className="article-actions">
          <a className="primary-button" href={fundingAnnouncement.dlabsUrl} target="_blank" rel="noreferrer noopener">
            View Dlabs portfolio <ExternalLink size={17} />
          </a>
          <AppLink href="/demo" navigate={navigate} className="secondary-button">Request a demo</AppLink>
        </div>
        <div className="article-source-links" aria-label="Riskviza company profiles">
          <span>Company profiles</span>
          <a href={fundingAnnouncement.linkedInUrl} target="_blank" rel="noreferrer noopener">LinkedIn <ExternalLink size={14} /></a>
          <a href={fundingAnnouncement.crunchbaseUrl} target="_blank" rel="noreferrer noopener">Crunchbase <ExternalLink size={14} /></a>
        </div>
      </article>
    </main>
  );
}

function SignInPage({ navigate }) {
  return (
    <main className="auth-page">
      <div className="auth-panel reveal">
        <Logo navigate={navigate} />
        <h1>Welcome back</h1>
        <p>Sign in to your Riskviza workspace.</p>
        <div className="sso-grid">
          <button><span className="google-mark">G</span> Continue with Google</button>
          <button><span className="ms-mark"><i /><i /><i /><i /></span> Continue with Microsoft</button>
        </div>
        <div className="or-line"><span>or use email</span></div>
        <label>Email</label>
        <input type="email" placeholder="name@company.eu" />
        <label>Password</label>
        <input type="password" placeholder="••••••••••" />
        <button className="primary-button full">Sign in <ArrowRight size={17} /></button>
        <span className="auth-note">SSO and workspace provisioning can be enabled for demo accounts.</span>
      </div>
      <HeroDashboard />
    </main>
  );
}

function DemoPage({ navigate }) {
  return (
    <main className="demo-page">
      <div className="demo-bg-orbit one" />
      <div className="demo-bg-orbit two" />
      <div className="demo-copy reveal">
        <Logo navigate={navigate} />
        <h1>Request a Riskviza demo</h1>
        <p>We will tailor the walkthrough around your risk domains, board reporting needs, and EU regulatory priorities.</p>
        <div className="demo-highlights">
          {["Board pack preview", "Vendor graph", "Evidence reuse", "EU framework map"].map((item) => (
            <span key={item}><Check size={15} /> {item}</span>
          ))}
        </div>
      </div>
      <form className="demo-form reveal">
        <label>Work email<input type="email" placeholder="you@company.eu" /></label>
        <label>Company<input type="text" placeholder="Vistula Bank" /></label>
        <label>Role<select defaultValue=""><option value="" disabled>Select role</option><option>Risk leader</option><option>Compliance team</option><option>Insurance team</option><option>Board member</option></select></label>
        <label>Primary priority<textarea placeholder="Tell us what you need to connect first: cyber, vendor, AI, ESG, operational risk, or board reporting." /></label>
        <button type="button" className="primary-button full">Book demo <ArrowRight size={17} /></button>
      </form>
    </main>
  );
}

function SubHero({ eyebrow, title, body, icon: Icon, accent = "#38d5b5" }) {
  return (
    <section className="sub-hero">
      <div className="sub-hero-inner reveal">
        <span className="eyebrow">{eyebrow}</span>
        {Icon && <div className="sub-icon" style={{ "--accent": accent }}><Icon size={28} /></div>}
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Logo reverse navigate={navigate} />
        <p>Board-ready risk intelligence for EU-regulated teams.</p>
        <div className="social-links">
          <a href={fundingAnnouncement.linkedInUrl} target="_blank" rel="noreferrer noopener" aria-label="Riskviza on LinkedIn"><Linkedin size={18} /></a>
          <a href={fundingAnnouncement.crunchbaseUrl} target="_blank" rel="noreferrer noopener" aria-label="Riskviza on Crunchbase"><CircleDot size={18} /></a>
          <a href={fundingAnnouncement.dlabsUrl} target="_blank" rel="noreferrer noopener" aria-label="Dlabs portfolio"><Globe2 size={18} /></a>
        </div>
      </div>
      <div className="footer-links">
        <div>
          <h4>Product</h4>
          {productCards.map((item) => (
            <AppLink key={item.title} href={item.route} navigate={navigate}>{item.title.replace("Riskviza ", "")}</AppLink>
          ))}
        </div>
        <div>
          <h4>Company</h4>
          <AppLink href="/company" navigate={navigate}>About</AppLink>
          <AppLink href="/news/funding-announcement" navigate={navigate}>Funding announcement</AppLink>
          <AppLink href="/resources" navigate={navigate}>Resources</AppLink>
          <AppLink href="/demo" navigate={navigate}>Request demo</AppLink>
        </div>
        <div>
          <h4>Credibility</h4>
          <p>Backed by Dlabs<br />$545K funding</p>
          <a className="footer-external" href={fundingAnnouncement.dlabsUrl} target="_blank" rel="noreferrer noopener">Dlabs portfolio <ExternalLink size={13} /></a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const { path, navigate } = useRoute();
  useGsapMotion(path);

  const page = useMemo(() => {
    if (path.startsWith("/platform")) return <PlatformPage />;
    if (path.startsWith("/products/register")) return <ProductPage slug="register" navigate={navigate} />;
    if (path.startsWith("/products/evidence")) return <ProductPage slug="evidence" navigate={navigate} />;
    if (path.startsWith("/products/vendors")) return <ProductPage slug="vendors" navigate={navigate} />;
    if (path.startsWith("/solutions")) return <SolutionsPage />;
    if (path.startsWith("/resources")) return <ResourcesPage />;
    if (path.startsWith("/company")) return <CompanyPage />;
    if (path.startsWith("/news/funding-announcement")) return <FundingArticlePage navigate={navigate} />;
    if (path.startsWith("/signin")) return <SignInPage navigate={navigate} />;
    if (path.startsWith("/demo")) return <DemoPage navigate={navigate} />;
    return <HomePage navigate={navigate} />;
  }, [path]);

  return (
    <>
      <RouteMetadata path={path} />
      {!path.startsWith("/signin") && !path.startsWith("/demo") && <Header navigate={navigate} />}
      {page}
      <Footer navigate={navigate} />
    </>
  );
}

function RouteMetadata({ path }) {
  useEffect(() => {
    const isFundingArticle = path.startsWith("/news/funding-announcement");
    const description = isFundingArticle
      ? "Riskviza has secured $545K in funding from Dlabs. Announcement dated Jan 15, 2026."
      : "Riskviza unifies cyber, vendor, AI, ESG, and operational risk into board-ready risk intelligence for EU-regulated teams.";
    document.title = isFundingArticle ? "Riskviza secures $545K in funding from Dlabs. | Riskviza" : "Riskviza | Board-ready risk intelligence for EU teams";
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [path]);

  return (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Riskviza",
        url: "https://riskviza.com",
        sameAs: [fundingAnnouncement.linkedInUrl, fundingAnnouncement.crunchbaseUrl],
      })}
    </script>
  );
}

createRoot(document.getElementById("root")).render(<App />);
