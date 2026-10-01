import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUp, Check, Copy, Download, Linkedin, Mail, MapPin, Moon, Sun, X, Award } from "lucide-react";

import profileImg from "../assets/profile.jpg";

const TITLE = "Karanveer Singh — MBA Student | Human Resources & Operations Management";
const DESC =
  "Karanveer Singh, MBA Student | Human Resources & Operations Management at Lovely Professional University — HR operations, payroll, onboarding and people analytics.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const EMAIL = "karanveersinghrathore2379@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/karanveer--singh";
const RESUME = "./resume.pdf";

const NAV = [
  ["about", "About"],
  ["academics", "Academics"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["certifications", "Certifications"],
  ["skills", "Skills"],
  ["contact", "Contact"],
] as const;

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${light ? "text-coral" : "text-coral"}`}>{children}</p>
  );
}

function SectionHead({ n, eyebrow, title, intro }: { n: string; eyebrow: string; title: string; intro: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <Eyebrow>
        Section {n} · {eyebrow}
      </Eyebrow>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-primary md:text-5xl">{title}</h2>
      <p className="mt-4 text-lg text-muted-foreground">{intro}</p>
    </Reveal>
  );
}

function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string | undefined; decimals?: number | undefined }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(to);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.4, ease: "easeOut", onUpdate: (x) => setV(x) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const card = "rounded-2xl border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg";
const btnCoral =
  "inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-coral-foreground shadow-md transition hover:-translate-y-0.5 hover:brightness-110";
const btnOutline =
  "inline-flex items-center gap-2 rounded-full border border-band-foreground/40 px-5 py-2.5 text-sm font-semibold text-band-foreground transition hover:border-coral hover:text-coral";

function Index() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const [dark, setDark] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState<null | { src: string; alt: string }>(null);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="min-h-screen">
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-coral" style={{ scaleX: progress }} />

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="font-display text-xl font-bold text-primary">
            K<span className="text-coral">S</span>
          </a>
          <ul className="hidden items-center gap-6 text-sm font-medium lg:flex">
            {NAV.map(([id, l]) => (
              <li key={id}>
                <a href={`#${id}`} className="text-foreground/80 transition hover:text-coral">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle dark mode"
              onClick={() => setDark((d) => !d)}
              className="rounded-full border p-2 text-foreground transition hover:text-coral"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href={RESUME} download className={`${btnCoral} hidden sm:inline-flex`}>
              <Download size={15} /> Download Resume
            </a>
            <button
              className="rounded-full border px-3 py-2 text-sm lg:hidden"
              aria-expanded={menu}
              onClick={() => setMenu((m) => !m)}
            >
              Menu
            </button>
          </div>
        </nav>
        {menu && (
          <ul className="border-t px-5 py-3 lg:hidden">
            {NAV.map(([id, l]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setMenu(false)} className="block py-2 text-sm font-medium hover:text-coral">
                  {l}
                </a>
              </li>
            ))}
            <li>
              <a href={RESUME} download className="block py-2 text-sm font-semibold text-coral">
                Download Resume
              </a>
            </li>
          </ul>
        )}
      </header>

      <main id="top">
        {/* HERO */}
        <section className="bg-band text-band-foreground">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
            <Reveal>
              <Eyebrow light>MBA Student • Human Resources &amp; Operations Management</Eyebrow>
              <h1 className="mt-4 text-5xl font-semibold leading-[1.05] md:text-7xl">Karanveer Singh</h1>
              <p className="mt-4 text-xl font-medium text-coral md:text-2xl">MBA Student | HR Operations &amp; People Analytics</p>
              <p className="mt-5 max-w-xl text-lg text-band-foreground/90">
                Civil engineer turned HR professional, turning people data into fair, effective workplaces.
              </p>
              <p className="mt-4 max-w-xl border-l-2 border-coral pl-4 text-sm text-band-foreground/75">
                <span className="font-semibold text-band-foreground">Career focus:</span> To grow into an HR professional who
                blends hands-on people operations with data-driven, fair and compliant workplace practices.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={RESUME} download className={btnCoral}>
                  <Download size={15} /> Download Resume
                </a>
                <a href="#projects" className={btnOutline}>View Projects</a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer" className={btnOutline}>
                  <Linkedin size={15} /> LinkedIn
                </a>
                <a href="#contact" className="inline-flex items-center px-2 text-sm font-semibold underline-offset-4 hover:text-coral hover:underline">
                  Contact Me →
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="mx-auto w-64 md:w-full md:max-w-sm">
              <div className="relative">
                <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border-2 border-coral" />
                <img
                  src={profileImg}
                  alt="Karanveer Singh"
                  width={500}
                  height={500}
                  className="relative aspect-square w-full rounded-[2rem] object-cover shadow-2xl"
                />
              </div>
            </Reveal>
          </div>
          <div className="mx-auto max-w-6xl px-5 pb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-band-foreground/70">Key strengths</p>
            <ul className="flex flex-wrap gap-2">
              {["Employee Onboarding", "Employee Relations", "HR Documentation & Compliance", "HR Data & Payroll", "Communication"].map(
                (s, i) => (
                  <li key={s} className="rounded-full border border-band-foreground/25 px-4 py-2 text-sm">
                    <span className="mr-2 font-semibold text-coral">0{i + 1}</span>
                    {s}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="border-t border-band-foreground/15">
            <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-10 md:grid-cols-5">
              {[
                { n: 6, s: " months", l: "HR training at Marriott" },
                { n: 8.4, d: 1, l: "CGPA (MBA)" },
                { n: 25, s: "+", l: "Payroll structures calculated" },
                { n: 37, s: "+", l: "People trained" },
                { n: 40, s: "+", l: "Customers engaged" },
              ].map((x) => (
                <div key={x.l}>
                  <dt className="font-display text-3xl font-semibold text-coral md:text-4xl">
                    <Counter to={x.n} suffix={x.s} decimals={x.d} />
                  </dt>
                  <dd className="mt-1 text-sm text-band-foreground/80">{x.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="scroll-mt-20 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHead n="01" eyebrow="About" title="My Professional Identity" intro="From building structures to building people systems." />
            <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
              <Reveal>
                <div className={`${card} p-3`}>
                  <img src={profileImg} alt="Karanveer Singh" loading="lazy" className="aspect-[4/5] w-full rounded-xl object-cover object-top" />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    I started my career path with a B.Tech in Civil Engineering (2019–2023), where I learned to plan carefully and
                    think in systems. Along the way I realised that what excites me most is people — so I pivoted into HR through an
                    MBA at Lovely Professional University.
                  </p>
                  <p>
                    At Fairfield by Marriott I gained hands-on experience in HR operations, onboarding and employee relations. A
                    Marketing and HR internship at The Leading Solutions then gave me exposure to payroll structuring and talent
                    acquisition. Today I'm passionate about pay equity, HR analytics and employee experience.
                  </p>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Discipline", "Consistent, punctual and reliable in every task."],
                    ["Communication", "Clear, empathetic conversations with employees and teams."],
                    ["Adaptability", "Moved from engineering to HR and thrive in new settings."],
                    ["Collaboration", "Work across functions to get things done together."],
                  ].map(([t, d], i) => (
                    <div key={t} className={card}>
                      <span className="font-display text-2xl font-semibold text-coral">0{i + 1}</span>
                      <h3 className="mt-2 text-xs font-sans font-semibold uppercase tracking-[0.2em] text-primary">{t}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ACADEMICS */}
        <section id="academics" className="scroll-mt-20 bg-alt py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHead n="02" eyebrow="Education" title="Academic Profile" intro="A strong analytical foundation, now focused on people management." />
            <div className="grid gap-6 md:grid-cols-3">
              {[
                ["MBA", "Lovely Professional University", "Jun 2025 – Present", "CGPA 8.4"],
                ["B.Tech, Civil Engineering", "Rajasthan Technical University", "2019 – 2023", "75%"],
                ["Intermediate", "Holy Spirit Sr. Sec. School, Jodhpur", "2018 – 2019", "65%"],
              ].map(([d, s, y, g], i) => (
                <Reveal key={d} delay={i * 0.1}>
                  <div className={`${card} h-full`}>
                    <span className="font-display text-5xl font-semibold text-coral/90">0{i + 1}</span>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{y}</p>
                    <h3 className="mt-2 text-xl font-semibold text-primary">{d}</h3>
                    <p className="mt-1 text-muted-foreground">{s}</p>
                    <p className="mt-4 inline-block rounded-full bg-alt px-3 py-1 text-sm font-semibold text-coral">{g}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="scroll-mt-20 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHead n="03" eyebrow="Experience" title="Where I've Worked" intro="Practical HR exposure across hospitality and consulting." />
            <ol className="relative ml-3 border-l-2 border-border">
              <Reveal>
                <li className="mb-12 pl-8">
                  <span className="absolute -left-[9px] mt-2 h-4 w-4 rounded-full bg-coral ring-4 ring-background" />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">Sep 2024 – Mar 2025 · Jodhpur</p>
                  <h3 className="mt-2 text-2xl font-semibold text-primary">Human Resources On-Job Trainee</h3>
                  <p className="font-medium text-muted-foreground">Fairfield by Marriott</p>
                  <p className="mt-3 max-w-3xl">
                    Supported end-to-end HR operations in a hospitality setting, handled employee relations queries, coordinated
                    onboarding and induction, and maintained accurate employee records for audit readiness.
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-coral/40 bg-coral/10 px-4 py-1.5 text-sm font-medium">
                    <Award size={15} className="text-coral" /> Overall performance rated Excellent by the HR Manager.
                  </p>
                </li>
              </Reveal>
              <Reveal>
                <li className="pl-8">
                  <span className="absolute -left-[9px] mt-2 h-4 w-4 rounded-full bg-coral ring-4 ring-background" />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">Jun 2026 – Aug 2026 · 8 weeks · Noida</p>
                  <h3 className="mt-2 text-2xl font-semibold text-primary">Intern, Marketing &amp; Human Resource</h3>
                  <p className="font-medium text-muted-foreground">The Leading Solutions · BFSI sector exposure</p>
                  <ul className="mt-3 max-w-3xl list-disc space-y-1.5 pl-5 marker:text-coral">
                    <li>Calculated salary structures (HRA, DA, allowances, statutory deductions) for 25+ employees.</li>
                    <li>Studied HR and talent acquisition practices in the UK, USA and Australia.</li>
                    <li>Compiled and verified placement cell contact data for 30+ management colleges in Excel.</li>
                    <li>Promoted Bank of Baroda insurance products to 40+ prospects.</li>
                  </ul>
                </li>
              </Reveal>
            </ol>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="scroll-mt-20 bg-alt py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHead n="04" eyebrow="Projects" title="Selected HR Projects" intro="Problem, approach and outcome — real work, real results." />
            <div className="space-y-8">
              {[
                {
                  t: "EquiGrowth: Gender Pay Equity & Promotion Fairness Analysis",
                  d: "Mar – Apr 2026",
                  p: "Pay disparity and promotion bias at a large corporate (Goldman Sachs).",
                  a: "Applied SHRM frameworks and a detailed case study to assess performance evaluation and promotion systems.",
                  o: "Data-driven recommendations for gender equity and fairness.",
                  f: ["Research", "Analyze", "Identify gaps", "Recommend"],
                  tags: ["HR Analytics", "DEI", "SHRM"],
                },
                {
                  t: "Career Catalyst: Strategic Interview & Personal Branding Program",
                  d: "Feb – Mar 2026",
                  p: "Interview preparation and personal branding gaps among students.",
                  a: "Designed and delivered a 90-minute virtual session for 37+ participants at 3I Education Pvt. Ltd. covering STAR technique, mock interviews and LinkedIn branding.",
                  o: "High participant satisfaction and improved confidence, communication skills and interview readiness.",
                  f: ["Identify gap", "Design", "Deliver", "Feedback"],
                  tags: ["Training", "Personal Branding", "L&D"],
                },
                {
                  t: "HR Dashboard",
                  d: "Oct – Dec 2025",
                  p: "Manual payroll, attendance and performance tracking.",
                  a: "Designed and implemented an HR dashboard for payroll, attendance and performance management.",
                  o: "Delivered successfully, streamlined HR operations, reduced manual effort and generated ₹11,000 in project revenue.",
                  f: ["Requirements", "Build", "Deliver"],
                  tags: ["Excel", "HR Data", "Automation"],
                },
              ].map((x, i) => (
                <Reveal key={x.t}>
                  <article className={`${card} p-7 md:p-10`}>
                    <div className="flex flex-col gap-6 md:flex-row">
                      <span className="font-display text-6xl font-semibold leading-none text-coral md:text-7xl">0{i + 1}</span>
                      <div className="flex-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{x.d}</p>
                        <h3 className="mt-2 text-2xl font-semibold text-primary md:text-3xl">{x.t}</h3>
                        <dl className="mt-6 grid gap-4">
                          {[["Problem", x.p], ["Approach", x.a], ["Outcome", x.o]].map(([k, v]) => (
                            <div key={k} className="grid gap-1 border-t pt-4 md:grid-cols-[140px_1fr]">
                              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">{k}</dt>
                              <dd>{v}</dd>
                            </div>
                          ))}
                        </dl>
                        <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl bg-coral/10 p-3 text-xs font-semibold uppercase tracking-[0.15em] text-coral">
                          {x.f.map((s, j) => (
                            <span key={s} className="flex items-center gap-2">
                              {s}
                              {j < x.f.length - 1 && <span aria-hidden>→</span>}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {x.tags.map((t) => (
                            <span key={t} className="rounded-full border px-3 py-1 text-xs font-medium text-primary">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certifications" className="scroll-mt-20 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHead n="05" eyebrow="Credentials" title="Certifications & Recommendations" intro="Verified learning and employer recognition. Click any card to zoom." />
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { src: "./certs/nptel.webp", t: "Legal Essentials for Human Resource Management", o: "NPTEL · IIT Madras (SWAYAM)", d: "Feb – Apr 2026 · Elite + Silver · 79% · 3 credits recommended" },
                { src: "./certs/marriott.webp", t: "On-Job Training Completion Letter", o: "Fairfield by Marriott", d: "Sep 2024 – Mar 2025" },
                { src: "./certs/leading-solutions.webp", t: "Internship Completion Certificate", o: "The Leading Solutions", d: "Marketing and Human Resource · Aug 2026" },
              ].map((c, i) => (
                <Reveal key={c.t} delay={i * 0.1}>
                  <button
                    onClick={() => setZoom({ src: c.src, alt: c.t })}
                    className={`${card} group block h-full w-full p-4 text-left`}
                  >
                    <div className="flex h-56 items-center justify-center overflow-hidden rounded-xl bg-alt">
                      <img src={c.src} alt={`${c.t} certificate`} loading="lazy" className="max-h-full object-contain transition duration-500 group-hover:scale-105" />
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-coral">{c.o}</p>
                    <h3 className="mt-1 text-lg font-semibold text-primary">{c.t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="scroll-mt-20 bg-alt py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHead n="06" eyebrow="Skills" title="Skills Snapshot" intro="What I bring to an HR team from day one." />
            <div className="grid gap-6 md:grid-cols-3">
              {[
                ["HR", ["Employee Onboarding & Induction", "Employee Relations", "HR Documentation & Records", "HR Policies & Compliance", "HR Data Management", "Payroll Basics"]],
                ["Tools", ["MS Office", "Excel", "PowerPoint", "Google Sheets", "Python"]],
                ["Power skills", ["Team Collaboration", "Communication", "Adaptability", "Organizational Skills", "Discipline"]],
              ].map(([g, items], i) => (
                <Reveal key={g as string} delay={i * 0.1}>
                  <div className={`${card} h-full`}>
                    <span className="font-display text-3xl font-semibold text-coral">0{i + 1}</span>
                    <h3 className="mt-2 text-xl font-semibold text-primary">{g as string}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(items as string[]).map((s) => (
                        <span key={s} className="rounded-full bg-alt px-3 py-1.5 text-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="mt-10 rounded-2xl bg-coral px-6 py-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-coral-foreground md:text-sm">
                Practical HR experience + Academic knowledge + Feedback = Professional growth
              </p>
            </Reveal>
          </div>
        </section>

        {/* NETWORKING */}
        <section className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHead n="07" eyebrow="Networking" title="Professional Networking" intro="Let's connect and grow together." />
            <Reveal>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" className={`${card} flex items-center gap-5 p-8 md:max-w-xl`}>
                <span className="rounded-2xl bg-primary p-4 text-primary-foreground"><Linkedin size={28} /></span>
                <span>
                  <span className="block text-xl font-semibold text-primary">Karanveer Singh on LinkedIn</span>
                  <span className="text-sm text-muted-foreground">linkedin.com/in/karanveer--singh →</span>
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* CLOSING BAND */}
        <section className="bg-band py-20 text-band-foreground">
          <Reveal className="mx-auto max-w-4xl px-5 text-center">
            <p className="font-display text-3xl leading-snug md:text-5xl">
              “Good HR starts with listening, grows through consistency, and is proven by <span className="text-coral">fairness</span>.”
            </p>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-band-foreground/80">
              Learn continuously. Act ethically. Plan consistently. Grow strategically.
            </p>
          </Reveal>
        </section>

        {/* CONTACT */}
        <footer id="contact" className="scroll-mt-20 border-t border-band-foreground/15 bg-band text-band-foreground">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2">
            <Reveal>
              <Eyebrow>Let's connect</Eyebrow>
              <h2 className="mt-3 text-4xl font-semibold md:text-6xl">Let's talk HR.</h2>
              <p className="mt-4 max-w-md text-band-foreground/80">Open to HR internships and entry-level roles in HR operations and people analytics.</p>
            </Reveal>
            <Reveal delay={0.1} className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 break-all font-medium hover:text-coral">
                  <Mail size={18} className="text-coral" /> {EMAIL}
                </a>
                <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-full border border-band-foreground/30 px-3 py-1 text-xs font-semibold hover:border-coral hover:text-coral">
                  {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "Copied!" : "Copy email"}
                </button>
              </div>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-medium hover:text-coral">
                <Linkedin size={18} className="text-coral" /> linkedin.com/in/karanveer--singh
              </a>
              <p className="flex items-center gap-2"><MapPin size={18} className="text-coral" /> India</p>
              <a href={RESUME} download className={`${btnCoral} mt-2`}>
                <Download size={15} /> Download full portfolio (PDF)
              </a>
            </Reveal>
          </div>
          <div className="border-t border-band-foreground/15">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs tracking-[0.2em] text-band-foreground/70 md:flex-row">
              <span className="font-semibold text-coral">PEOPLE • POLICY • ANALYTICS</span>
              <span>© 2026 Karanveer Singh.</span>
            </div>
          </div>
        </footer>
      </main>

      {showTop && (
        <button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-coral p-3 text-coral-foreground shadow-lg transition hover:-translate-y-1"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {zoom && (
        <div role="dialog" aria-modal="true" aria-label={zoom.alt} onClick={() => setZoom(null)} className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm">
          <button aria-label="Close" className="absolute right-5 top-5 rounded-full bg-card p-2 text-foreground" onClick={() => setZoom(null)}>
            <X size={20} />
          </button>
          <img src={zoom.src} alt={zoom.alt} className="max-h-[90vh] max-w-full rounded-xl bg-card shadow-2xl" />
        </div>
      )}
    </div>
  );
}
