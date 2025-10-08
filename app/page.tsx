'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Download, Target, CalendarDays, ShieldCheck, ExternalLink,
  BookOpenCheck, Play, CheckCircle2, Search, Library, Sparkles, Check
} from 'lucide-react';

/* ---------------------------
   TYPES & DATA
---------------------------- */
type Resource = { label: string; url: string; type: 'video' | 'pdf' | 'article' };
type DayLesson = { day: number; title: string; notes: string; resources: Resource[] };

const DAYS: DayLesson[] = [
  { day: 1,  title: "Forex & Gold: The Landscape", notes: "FX pairs, majors, spreads, sessions; gold vs FX microstructure.", resources: [
    { type: 'pdf',   label: 'Forex A–Z (PDF)', url: 'https://www.forexboat.com/wp-content/uploads/2017/11/Ebook_Forex-A-Z.pdf' },
  ]},
  { day: 2,  title: "Order Types & Market Structure", notes: "Bid/ask, spread, stop/limit/market, liquidity pockets; draw a flow diagram.", resources: [
    { type: 'pdf',   label: 'The Basics Explained (Jim Brown)', url: 'https://viptrade.ge/frontend-assets/books/The_Basics_Explained_in_Simple_Terms_by_Jim_Brown.pdf' },
  ]},
  { day: 3,  title: "Intro to Algorithmic Trading", notes: "Why rules beat discretion; overview of the toolchain.", resources: [
    { type: 'video', label: 'Algorithmic Trading Using Python – Full Course', url: 'https://www.youtube.com/watch?v=xfzGZB4HhEE' },
  ]},
  { day: 4,  title: "Python Setup & First Data Pull", notes: "Install Python/Anaconda. Pull EURUSD/XAUUSD with yfinance or MT5.", resources: [
    { type: 'video', label: 'pandas essentials', url: 'https://www.youtube.com/watch?v=GDMkkmkJigw' },
  ]},
  { day: 5,  title: "Cleaning & Resampling", notes: "Handle missing candles; resample to M15/H1/D1; timezone sanity.", resources: [
    { type: 'article', label: 'pandas resample docs', url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.resample.html' },
  ]},
  { day: 6,  title: "Indicators 101", notes: "SMA/EMA/RSI coding; inputs vs outputs; avoid lookahead bias.", resources: [
    { type: 'pdf',   label: 'Ernest Chan – Algorithmic Trading (metrics chapter)', url: 'https://agorism.dev/book/finance/(Wiley%20Trading)%20Ernie%20Chan%20-%20Algorithmic%20Trading_%20Winning%20Strategies%20and%20Their%20Rationale-Wiley%20(2013).pdf' },
  ]},
  { day: 7,  title: "Idea Generation", notes: "Trend, mean reversion, breakout; session filters; volatility regimes.", resources: [
    { type: 'video', label: '5 Steps to Start Forex Algo Trading', url: 'https://www.youtube.com/watch?v=b7FTsloqEE8' },
  ]},
  { day: 8,  title: "Mean Reversion v1 (Gold M15)", notes: "Lower band + RSI<30; exit mid-band/ATR; session filter.", resources: [
    { type: 'pdf',   label: 'Kevin Davey — Building Winning Algorithmic Systems', url: 'https://sar.ac.id/stmik_ebook/prog_file_file/vncC9PrCI5.pdf' },
  ]},
  { day: 9,  title: "Backtesting Basics", notes: "Vectorized test; equity curve; trade list; param logging.", resources: [
    { type: 'pdf',   label: 'Davey — backtesting chapters', url: 'https://sar.ac.id/stmik_ebook/prog_file_file/vncC9PrCI5.pdf' },
  ]},
  { day: 10, title: "Metrics & Risk", notes: "Sharpe, MAR, max DD, expectancy; 1–2% risk/trade.", resources: [
    { type: 'pdf',   label: 'Chan — performance & risk', url: 'https://agorism.dev/book/finance/(Wiley%20Trading)%20Ernie%20Chan%20-%20Algorithmic%20Trading_%20Winning%20Strategies%20and%20Their%20Rationale-Wiley%20(2013).pdf' },
  ]},
  { day: 11, title: "Robustness: IS/OOS", notes: "Train on IS; verify on OOS; guardrails vs overtuning.", resources: [
    { type: 'pdf',   label: 'Algorithmic Trading Strategies Thesis', url: 'https://run.unl.pt/bitstream/10362/135618/1/TEGI0570.pdf' },
  ]},
  { day: 12, title: "Monte Carlo", notes: "Resample returns to estimate DD risk; size sanely.", resources: [
    { type: 'pdf',   label: '84 Advanced Algorithmic Trading (MC section)', url: 'https://cdn.oujdalibrary.com/books/84/84-advanced-algorithmic-trading-(www.tawcer.com).pdf' },
  ]},
  { day: 13, title: "Refactor Day", notes: "Cleanup functions, params, logging; deterministic runs.", resources: []},
  { day: 14, title: "Breakout v1 (EURUSD H1)", notes: "London open range break + ATR filter; time stop; avoid news.", resources: [
    { type: 'video', label: 'Advanced Backtesting (YouTube)', url: 'https://www.youtube.com/watch?v=Ugp3peGPNpU' },
  ]},
  { day: 15, title: "Portfolio Logic", notes: "Combine MR+BO; vol targeting; pair caps; correlation.", resources: [
    { type: 'pdf',   label: 'Chan — portfolio concepts', url: 'https://agorism.dev/book/finance/(Wiley%20Trading)%20Ernie%20Chan%20-%20Algorithmic%20Trading_%20Winning%20Strategies%20and%20Their%20Rationale-Wiley%20(2013).pdf' },
  ]},
  { day: 16, title: "Risk Rules & Kill-Switches", notes: "Daily loss, weekly DD, sequence DD; turn systems off sanely.", resources: [
    { type: 'pdf',   label: 'Chan — risk framework', url: 'https://agorism.dev/book/finance/(Wiley%20Trading)%20Ernie%20Chan%20-%20Algorithmic%20Trading_%20Winning%20Strategies%20and%20Their%20Rationale-Wiley%20(2013).pdf' },
  ]},
  { day: 17, title: "Execution Modeling", notes: "Commission & slippage; partial fills; realistic PnL.", resources: [
    { type: 'pdf',   label: 'Davey — execution & realism', url: 'https://sar.ac.id/stmik_ebook/prog_file_file/vncC9PrCI5.pdf' },
  ]},
  { day: 18, title: "Psychology: Biases & Process", notes: "FOMO, loss aversion, revenge trading; automation as control.", resources: [
    { type: 'pdf',   label: 'EarnForex — psychology eBook', url: 'https://www.earnforex.com/forex-e-books/trading-strategy/' },
  ]},
  { day: 19, title: "Journaling & Metrics", notes: "Template: system, trade id, rule deviations, context.", resources: []},
  { day: 20, title: "FX Algo Handbook Dive", notes: "Execution algos, venues, TCA; notes for future.", resources: [
    { type: 'pdf',   label: 'FX Algorithmic Trading Handbook', url: 'https://fxalgonews.com/wp-content/uploads/2023/08/TRADING-HANDBOOK-2021-SCREEN-1.pdf' },
  ]},
  { day: 21, title: "EA in MT5 (Bridge)", notes: "Translate Python rules to MT5 EA/bridge.", resources: [
    { type: 'video', label: 'Python + MT5 (YouTube)', url: 'https://www.youtube.com/watch?v=1T-62sBB6rI' },
  ]},
  { day: 22, title: "EA Testing", notes: "MT5 Strategy Tester modeling quality; compare vs Python.", resources: []},
  { day: 23, title: "Align Sims", notes: "Make MT5 & Python agree; fix time/fees/slippage.", resources: []},
  { day: 24, title: "Volatility Targeting", notes: "Scale positions to target stdev; smoother equity.", resources: [
    { type: 'pdf',   label: 'Advanced Algo Trading (vol target idea)', url: 'https://download.e-bookshelf.de/download/0000/8068/90/L-G-0000806890-0002328615.pdf' },
  ]},
  { day: 25, title: "Gold Specifics", notes: "Session structure, spreads, news timing; BIS context.", resources: [
    { type: 'pdf',   label: 'BIS FX market paper', url: 'https://www.bis.org/publ/mktc13.pdf' },
  ]},
  { day: 26, title: "Stress Tests", notes: "Shock spreads, latencies; outlier days; fat tails.", resources: []},
  { day: 27, title: "System Spec Doc", notes: "Write clear rules; param ranges; when to switch off.", resources: []},
  { day: 28, title: "Prop-Firm Constraints", notes: "Map rules (daily DD, max DD, min days) to systems.", resources: [
    { type: 'article', label: 'FTMO', url: 'https://ftmo.com/' },
  ]},
  { day: 29, title: "Dry-Run Week", notes: "Demo only; strict rules; journal deviations.", resources: []},
  { day: 30, title: "Retrospective & Plan", notes: "Wins, gaps, concrete goals; choose systems to keep.", resources: []},
];

/* ---------------------------
   UI Helpers
---------------------------- */
const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium bg-white/70 border-brand-blue/30 text-brand-ink">
    {children}
  </span>
);

const ResourceLink = ({ r }: { r: Resource }) => (
  <a
    href={r.url}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-white/80 transition"
  >
    {r.type === 'video' ? <Play className="w-4 h-4" /> : r.type === 'pdf' ? <BookOpenCheck className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
    <span className="underline">{r.label}</span>
  </a>
);

/* ---------------------------
   Progress (localStorage)
---------------------------- */
const STORAGE_KEY = 'fat_progress_days';

function useProgress() {
  const [done, setDone] = useState<number[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(done)); } catch {}
  }, [done]);

  const toggle = (d: number) =>
    setDone(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);

  return { done, toggle };
}

/* ---------------------------
   Page
---------------------------- */
export default function Page() {
  const [q, setQ] = useState("");
  const { done, toggle } = useProgress();

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return DAYS;
    return DAYS.filter(d =>
      String(d.day).includes(s) ||
      d.title.toLowerCase().includes(s) ||
      d.notes.toLowerCase().includes(s) ||
      d.resources.some(r => r.label.toLowerCase().includes(s))
    );
  }, [q]);

  const completedCount = done.length;
  const percent = Math.round((completedCount / DAYS.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-brand-turq/8 to-brand-blue/5 text-brand-ink">
      {/* NAV */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue via-brand-gold to-brand-turq shadow-soft grid place-items-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold tracking-tight">Funded Algorithmic Trader</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#overview" className="hover:underline">Overview</a>
            <a href="#toc" className="hover:underline">Daily ToC</a>
            <a href="#resources" className="hover:underline">Resources</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-center">
          <div className="bg-white/90 backdrop-blur rounded-2xl shadow-soft border border-white/60 p-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              From Beginner to <span className="bg-brand-gold/40 px-2 pb-1 rounded">Funded Algorithmic Trader</span>
            </h1>
            <p className="mt-4 text-slate-600">
              Forex & Gold • 1 hr/day • Start now → challenge-ready by Jan 2026.
              Automated strategies, robust backtests, strict risk, and prop-firm alignment.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/Funded_Algorithmic_Trader_Roadmap.pdf" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 bg-white hover:bg-white/80 transition border-brand-blue/30">
                <Download className="w-4 h-4" /> Roadmap PDF
              </a>
              <a href="/Expanded_Funded_Algorithmic_Trader_Course.pdf" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 bg-white hover:bg-white/80 transition border-brand-blue/30">
                <Download className="w-4 h-4" /> Expanded Course PDF
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Pill><Target className="w-3 h-3" /> £1M goal</Pill>
              <Pill><CalendarDays className="w-3 h-3" /> Oct 2025 → Jan 2026</Pill>
              <Pill><ShieldCheck className="w-3 h-3" /> Risk-first</Pill>
            </div>
          </div>

          <aside className="bg-white/90 backdrop-blur rounded-2xl shadow-soft border border-white/60 p-6">
            <h3 className="font-semibold mb-3">Quick Search</h3>
            <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2">
              <Search className="w-4 h-4 text-slate-500" />
              <input
                className="w-full outline-none text-sm"
                placeholder="Search day, topic, or resource…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <div className="text-xs text-slate-600 mb-1 flex items-center justify-between">
                <span>Progress</span><span>{percent}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-turq via-brand-blue to-brand-gold" style={{ width: `${percent}%` }} />
              </div>
              <div className="mt-1 text-xs text-slate-500">{completedCount} / {DAYS.length} lessons complete</div>
            </div>
          </aside>
        </div>
      </section>

      {/* CONTENT */}
      <section id="overview" className="py-6">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-1">
            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-soft border border-white/60 p-4">
              <h4 className="font-semibold mb-2">Milestones</h4>
              <ul className="text-sm space-y-2">
                <li>Month 1 — Foundations & first systems</li>
                <li>Month 2 — Robustness & expansion</li>
                <li>Month 3 — Paper trading & stabilization</li>
                <li>Q4 — Prop challenge prep & execution</li>
              </ul>
            </div>
          </div>

          {/* Main */}
          <div className="space-y-8">
            {/* TOC */}
            <div id="toc" className="bg-white/90 backdrop-blur rounded-2xl shadow-soft border border-white/60 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Month 1 — Daily Table of Contents</h2>
                <div className="text-xs text-slate-500">30 lessons • 1 hour/day</div>
              </div>

              <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {DAYS.map((d) => (
                  <a key={d.day} href={`#day-${d.day}`} className="block p-4 rounded-xl border bg-white hover:shadow-soft transition">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-slate-500">Day {d.day}</div>
                      {done.includes(d.day) && <Check className="w-4 h-4 text-brand-blue" />}
                    </div>
                    <div className="font-medium">{d.title}</div>
                    <div className="text-xs text-slate-600 line-clamp-2 mt-1">{d.notes}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* DAILY LESSONS */}
            <div className="space-y-6">
              {DAYS.map((d) => (
                <div key={d.day} id={`day-${d.day}`} className="bg-white/90 backdrop-blur rounded-2xl shadow-soft border border-white/60 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm text-slate-500">Day {d.day}</div>
                      <h3 className="text-xl font-semibold">{d.title}</h3>
                    </div>
                    <button
                      onClick={() => toggle(d.day)}
                      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 transition ${
                        done.includes(d.day)
                          ? 'bg-brand-turq/20 border-brand-turq/40'
                          : 'bg-white hover:bg-white/80 border-brand-blue/30'
                      }`}
                      aria-label={`Mark Day ${d.day} ${done.includes(d.day) ? 'incomplete' : 'complete'}`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm">{done.includes(d.day) ? 'Completed' : 'Mark complete'}</span>
                    </button>
                  </div>
                  <p className="mt-3 text-sm text-slate-700">{d.notes}</p>

                  {d.resources.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {d.resources.map((r, i) => <ResourceLink key={i} r={r} />)}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* LIBRARY */}
            <div id="resources" className="bg-white/90 backdrop-blur rounded-2xl shadow-soft border border-white/60 p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Library className="w-5 h-5" /> Resource Library</h2>
              <div className="grid md:grid-cols-2 gap-3">
                <a className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 bg-white hover:bg-white/80 transition border-brand-blue/30" href="https://sar.ac.id/stmik_ebook/prog_file_file/vncC9PrCI5.pdf" target="_blank" rel="noreferrer">
                  <BookOpenCheck className="w-4 h-4" /> Kevin Davey — Building Winning Algorithmic Systems (PDF)
                </a>
                <a className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 bg-white hover:bg-white/80 transition border-brand-blue/30" href="https://agorism.dev/book/finance/(Wiley%20Trading)%20Ernie%20Chan%20-%20Algorithmic%20Trading_%20Winning%20Strategies%20and%20Their%20Rationale-Wiley%20(2013).pdf" target="_blank" rel="noreferrer">
                  <BookOpenCheck className="w-4 h-4" /> Ernest Chan — Algorithmic Trading (PDF)
                </a>
                <a className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 bg-white hover:bg-white/80 transition border-brand-blue/30" href="https://fxalgonews.com/wp-content/uploads/2023/08/TRADING-HANDBOOK-2021-SCREEN-1.pdf" target="_blank" rel="noreferrer">
                  <BookOpenCheck className="w-4 h-4" /> FX Algorithmic Trading Handbook (PDF)
                </a>
                <a className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 bg-white hover:bg-white/80 transition border-brand-blue/30" href="https://run.unl.pt/bitstream/10362/135618/1/TEGI0570.pdf" target="_blank" rel="noreferrer">
                  <BookOpenCheck className="w-4 h-4" /> Algorithmic Trading Strategies Thesis (PDF)
                </a>
                <a className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 bg-white hover:bg-white/80 transition border-brand-blue/30" href="https://cdn.oujdalibrary.com/books/84/84-advanced-algorithmic-trading-(www.tawcer.com).pdf" target="_blank" rel="noreferrer">
                  <BookOpenCheck className="w-4 h-4" /> 84 Advanced Algorithmic Trading (PDF)
                </a>
                <a className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 bg-white hover:bg-white/80 transition border-brand-blue/30" href="https://www.youtube.com/watch?v=xfzGZB4HhEE" target="_blank" rel="noreferrer">
                  <Play className="w-4 h-4" /> Algo Trading Using Python — Full Course (Video)
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/Funded_Algorithmic_Trader_Roadmap.pdf" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 bg-white hover:bg-white/80 transition border-brand-blue/30"><Download className="w-4 h-4" /> Roadmap PDF</a>
                <a href="/Expanded_Funded_Algorithmic_Trader_Course.pdf" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 bg-white hover:bg-white/80 transition border-brand-blue/30"><Download className="w-4 h-4" /> Expanded Course PDF</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          Educational content only — not financial advice. Verify prop-firm rules before acting.
        </div>
      </footer>
    </div>
  );
}


