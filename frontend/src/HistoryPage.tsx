import { useState } from "react";
import Sidebar, { UserRole } from "./Sidebar";

/* ── Icons ─────────────────────────────────────────────── */
function GeminiIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 2C8 5.314 5.314 8 2 8c3.314 0 6 2.686 6 6 0-3.314 2.686-6 6-6-3.314 0-6-2.686-6-6z" fill="#7C3AED" />
    </svg>
  );
}

const NAV_ITEMS = [
  {
    id: "dashboard", label: "Dashboard",
    Icon: ({ a }: { a?: boolean }) => {
      const c = a ? "#7C3AED" : "#94A3B8";
      return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1.5" y="1.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5" /><rect x="10.5" y="1.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5" /><rect x="1.5" y="10.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5" /><rect x="10.5" y="10.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5" /></svg>;
    },
  },
  {
    id: "studio", label: "Studio",
    Icon: ({ a }: { a?: boolean }) => {
      const c = a ? "#7C3AED" : "#94A3B8";
      return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke={c} strokeWidth="1.5" /><circle cx="9" cy="9" r="3" fill={c} fillOpacity="0.3" stroke={c} strokeWidth="1.5" /><circle cx="9" cy="9" r="1" fill={c} /></svg>;
    },
  },
  {
    id: "upload", label: "Upload Video",
    Icon: ({ a }: { a?: boolean }) => {
      const c = a ? "#7C3AED" : "#94A3B8";
      return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2v10M5 6l4-4 4 4M2 14h14" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    },
  },
  {
    id: "history", label: "History",
    Icon: ({ a }: { a?: boolean }) => {
      const c = a ? "#7C3AED" : "#94A3B8";
      return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 4.5V9l3 2" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M3.5 9A5.5 5.5 0 1 1 9 14.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" /><path d="M3.5 5.5V9H7" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    },
  },
  {
    id: "settings", label: "Settings",
    Icon: ({ a }: { a?: boolean }) => {
      const c = a ? "#7C3AED" : "#94A3B8";
      return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2.5" stroke={c} strokeWidth="1.5" /><path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.697 3.697l1.414 1.414M12.889 12.889l1.414 1.414M3.697 14.303l1.414-1.414M12.889 5.111l1.414-1.414" stroke={c} strokeWidth="1.5" strokeLinecap="round" /></svg>;
    },
  },
];

/* ── Data ───────────────────────────────────────────────── */
const CHART_DATA = [
  { label: "Tuần 1", score: 58, sessions: 3, topSkill: "Âm lượng" },
  { label: "Tuần 2", score: 67, sessions: 4, topSkill: "Giao tiếp mắt" },
  { label: "Tuần 3", score: 76, sessions: 5, topSkill: "Giao tiếp mắt" },
  { label: "Tuần 4", score: 85, sessions: 4, topSkill: "Độ tự tin" },
];

const SESSIONS = [
  {
    id: 1,
    date: "11/09/2026",
    title: "Luyện tập bảo vệ đề án — Tuần 5",
    context: "Bảo vệ đề án",
    duration: "04:32",
    score: 85,
    trend: +4,
    eyeContact: 88,
    wpm: 175,
    fillerWords: 5,
  },
  {
    id: 2,
    date: "10/09/2026",
    title: "Thuyết trình ý tưởng lần 1",
    context: "Phỏng vấn việc làm",
    duration: "02:45",
    score: 82,
    trend: +6,
    eyeContact: 80,
    wpm: 162,
    fillerWords: 7,
  },
  {
    id: 3,
    date: "08/09/2026",
    title: "Thuyết trình lớp — Giới thiệu PBL6",
    context: "Thuyết trình lớp học",
    duration: "06:10",
    score: 76,
    trend: +9,
    eyeContact: 74,
    wpm: 158,
    fillerWords: 9,
  },
  {
    id: 4,
    date: "05/09/2026",
    title: "Phỏng vấn thử vòng 2",
    context: "Phỏng vấn việc làm",
    duration: "03:22",
    score: 70,
    trend: +12,
    eyeContact: 70,
    wpm: 145,
    fillerWords: 11,
  },
  {
    id: 5,
    date: "03/09/2026",
    title: "Bản nháp bài nói hội thảo",
    context: "Hội thảo",
    duration: "05:48",
    score: 67,
    trend: null,
    eyeContact: 65,
    wpm: 188,
    fillerWords: 14,
  },
];

const CONTEXT_COLORS: Record<string, string> = {
  "Bảo vệ đề án":        "bg-violet-50 text-violet-700 border-violet-200",
  "Phỏng vấn việc làm":  "bg-blue-50 text-blue-700 border-blue-200",
  "Thuyết trình lớp học": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Hội thảo":            "bg-amber-50 text-amber-700 border-amber-200",
};

function scoreColor(s: number) {
  if (s >= 80) return "text-emerald-600";
  if (s >= 65) return "text-orange-500";
  return "text-red-500";
}

/* ── Line Chart ─────────────────────────────────────────── */
function LineChart({ hoverIdx, setHoverIdx }: { hoverIdx: number | null; setHoverIdx: (i: number | null) => void }) {
  const W = 700, H = 200;
  const padL = 44, padR = 24, padT = 16, padB = 32;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const minScore = 45, maxScore = 100;
  const toX = (i: number) => padL + (i / (CHART_DATA.length - 1)) * chartW;
  const toY = (v: number) => padT + chartH - ((v - minScore) / (maxScore - minScore)) * chartH;

  const pts = CHART_DATA.map((d, i) => ({ x: toX(i), y: toY(d.score) }));
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  // Smooth area under the line
  const areaPath = linePath + ` L${pts[pts.length - 1].x},${padT + chartH} L${pts[0].x},${padT + chartH} Z`;

  // Y-axis gridlines
  const yTicks = [50, 60, 70, 80, 90, 100];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ height: 220, userSelect: "none" }}
      onMouseLeave={() => setHoverIdx(null)}
    >
      <defs>
        <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.01" />
        </linearGradient>
        <filter id="dotGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Y-axis gridlines */}
      {yTicks.map((v) => {
        const y = toY(v);
        return (
          <g key={v}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#F1F5F9" strokeWidth="1" />
            <text x={padL - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#94A3B8" fontFamily="Inter,sans-serif" fontWeight="600">
              {v}
            </text>
          </g>
        );
      })}

      {/* Area fill */}
      <path d={areaPath} fill="url(#lineAreaGrad)" />

      {/* Main line */}
      <path d={linePath} fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

      {/* X-axis labels + interactive zones */}
      {CHART_DATA.map((d, i) => {
        const x = toX(i);
        const active = hoverIdx === i;
        return (
          <g key={i}>
            {/* Vertical hover line */}
            {active && (
              <line x1={x} y1={padT} x2={x} y2={padT + chartH} stroke="#7C3AED" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            )}
            {/* Dot */}
            <circle
              cx={x} cy={pts[i].y} r={active ? 7 : 5}
              fill={active ? "#7C3AED" : "white"}
              stroke="#7C3AED" strokeWidth="2.5"
              filter={active ? "url(#dotGlow)" : undefined}
              style={{ cursor: "pointer", transition: "r 0.15s" }}
            />
            {active && (
              <circle cx={x} cy={pts[i].y} r="3" fill="white" />
            )}

            {/* Tooltip */}
            {active && (
              <g>
                <rect x={x - 42} y={pts[i].y - 46} width="84" height="38" rx="7" fill="#1E1B4B" />
                <text x={x} y={pts[i].y - 30} textAnchor="middle" fontSize="14" fontWeight="700" fill="white" fontFamily="Inter,sans-serif">
                  {d.score}
                </text>
                <text x={x} y={pts[i].y - 16} textAnchor="middle" fontSize="9" fill="#A78BFA" fontFamily="Inter,sans-serif">
                  {d.sessions} sessions · Top: {d.topSkill}
                </text>
              </g>
            )}

            {/* X labels */}
            <text x={x} y={H - 6} textAnchor="middle" fontSize="10" fill="#64748B" fontWeight="600" fontFamily="Inter,sans-serif">
              {d.label}
            </text>

            {/* Invisible hover hitbox */}
            <rect
              x={x - chartW / (2 * (CHART_DATA.length - 1))} y={padT}
              width={chartW / (CHART_DATA.length - 1)} height={chartH}
              fill="transparent" style={{ cursor: "crosshair" }}
              onMouseEnter={() => setHoverIdx(i)}
            />
          </g>
        );
      })}
    </svg>
  );
}

/* ── Progress mini-bars ─────────────────────────────────── */
function MiniBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────── */
interface HistoryPageProps {
  onNav: (view: string) => void;
  onViewReport: () => void;
  userRole: UserRole;
}

export default function HistoryPage({ onNav, onViewReport, userRole }: HistoryPageProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filters = ["Tất cả", "Bảo vệ đề án", "Phỏng vấn việc làm", "Thuyết trình lớp học", "Hội thảo"];
  const filtered = activeFilter === "Tất cả" ? SESSIONS : SESSIONS.filter((s) => s.context === activeFilter);

  /* Derived stats */
  const avgScore = Math.round(SESSIONS.reduce((a, s) => a + s.score, 0) / SESSIONS.length);
  const totalMins = SESSIONS.reduce((a, s) => {
    const [m, sec] = s.duration.split(":").map(Number);
    return a + m + sec / 60;
  }, 0);
  const improvement = SESSIONS[0].score - SESSIONS[SESSIONS.length - 1].score;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>

      <Sidebar userRole={userRole} activeItem="history" onNav={onNav} />

      {/* ── MAIN ────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* Header */}
        <div className="bg-white border-b border-slate-100 px-8 pt-8 pb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-none">Tiến trình của tôi</h1>
              <p className="text-[14px] text-slate-400 mt-1.5">Theo dõi sự phát triển kỹ năng thuyết trình theo thời gian</p>
            </div>
            <button
              onClick={() => onNav("studio")}
              className="btn-primary flex items-center gap-2 bg-violet-700 hover:bg-violet-800 text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-violet-200"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.4" /><circle cx="7" cy="7" r="2" fill="white" /></svg>
              Phiên mới
            </button>
          </div>

          {/* Stat pills */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Tổng phiên",      value: String(SESSIONS.length),          sub: "Tất cả thời gian",     color: "text-slate-800" },
              { label: "Điểm TB",         value: `${avgScore}/100`,                sub: "Trên tất cả phiên",    color: "text-violet-700" },
              { label: "Thời gian luyện", value: `${Math.round(totalMins)}m`,      sub: "Phút đã ghi hình",     color: "text-slate-800" },
              { label: "Cải thiện",       value: `+${improvement} điểm`,          sub: "Kể từ phiên đầu tiên", color: "text-emerald-600" },
            ].map(({ label, value, sub, color }) => (
              <div key={label} className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
                <p className={`text-[22px] font-bold ${color} leading-none`}>{value}</p>
                <p className="text-[11px] text-slate-400 mt-1">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 py-6 space-y-6">

          {/* ── Growth Chart card ─────────────────── */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-[15px] font-bold text-slate-800">Điểm tổng thể — Xu hướng theo tuần</h2>
                <p className="text-[12px] text-slate-400 mt-0.5">Di chuột vào điểm dữ liệu để xem chi tiết tuần</p>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 9L4.5 5l3 2.5L11 2" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="text-[11px] font-bold text-emerald-700">+27 điểm trong 4 tuần</span>
              </div>
            </div>

            <LineChart hoverIdx={hoverIdx} setHoverIdx={setHoverIdx} />

            {/* Week summary strip */}
            <div className="grid grid-cols-4 gap-3 mt-2 pt-4 border-t border-slate-50">
              {CHART_DATA.map((d, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-3 cursor-pointer transition-all ${hoverIdx === i ? "bg-violet-50 border border-violet-200" : "bg-slate-50 border border-transparent hover:border-slate-200"}`}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(null)}
                >
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{d.label}</p>
                  <p className="text-[20px] font-bold text-violet-700 leading-tight mt-0.5">{d.score}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{d.sessions} phiên · {d.topSkill}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Session list ──────────────────────── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-slate-800">Phiên gần đây</h2>
              <span className="text-[12px] text-slate-400 font-medium">Hiển thị {filtered.length}/{SESSIONS.length}</span>
            </div>

            {/* Filter chips */}
            <div className="flex gap-2 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-[12px] font-semibold px-3 py-1.5 rounded-full border transition-all ${activeFilter === f ? "bg-violet-700 text-white border-violet-700 shadow-sm" : "bg-white text-slate-500 border-slate-200 hover:border-violet-300 hover:text-violet-600"}`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Session rows */}
            <div className="space-y-2">
              {filtered.map((s) => {
                const expanded = expandedId === s.id;
                return (
                  <div
                    key={s.id}
                    className={`card-hover bg-white rounded-2xl border overflow-hidden ${expanded ? "border-violet-200 shadow-md shadow-violet-100" : "border-slate-100 shadow-sm"}`}
                  >
                    {/* Main row */}
                    <div
                      className="flex items-center gap-4 px-5 py-4 cursor-pointer"
                      onClick={() => setExpandedId(expanded ? null : s.id)}
                    >
                      {/* Score ring */}
                      <div className="flex-shrink-0 relative w-11 h-11">
                        <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
                          <circle cx="22" cy="22" r="18" fill="none" stroke="#EDE9FE" strokeWidth="4" />
                          <circle cx="22" cy="22" r="18" fill="none" stroke="#7C3AED" strokeWidth="4"
                            strokeDasharray={`${(s.score / 100) * 2 * Math.PI * 18} ${2 * Math.PI * 18}`}
                            strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[9px] font-bold text-violet-700 leading-none">{s.score}</span>
                        </div>
                      </div>

                      {/* Title + date */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-[14px] font-semibold text-slate-800 truncate">{s.title}</p>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${CONTEXT_COLORS[s.context]}`}>
                            {s.context}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-[12px] text-slate-400">{s.date}</span>
                          <span className="text-slate-200">·</span>
                          <span className="text-[12px] text-slate-400 font-mono">{s.duration}</span>
                          {s.trend !== null && (
                            <>
                              <span className="text-slate-200">·</span>
                              <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 8V2M2 5l3-3 3 3" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                +{s.trend} điểm tổng
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Score text */}
                      <div className="flex-shrink-0 text-right hidden sm:block">
                        <p className={`text-[18px] font-bold ${scoreColor(s.score)}`}>{s.score}<span className="text-[12px] font-medium text-slate-400">/100</span></p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={(e) => { e.stopPropagation(); onViewReport(); }}
                          className="btn-secondary text-[12.5px] font-semibold border-2 border-violet-600 text-violet-700 hover:bg-violet-700 hover:text-white px-4 py-1.5 rounded-xl"
                        >
                          Xem báo cáo
                        </button>
                        <button className={`w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 transition-all ${expanded ? "rotate-180 bg-slate-100" : ""}`}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                      </div>
                    </div>

                    {/* Expanded details */}
                    {expanded && (
                      <div className="border-t border-slate-100 px-5 py-4 bg-slate-50/50">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          {[
                            { label: "Giao tiếp mắt", value: s.eyeContact, unit: "%", bar: true, color: "#22C55E" },
                            { label: "Tốc độ nói", value: s.wpm, unit: " WPM", bar: false, color: "#F97316" },
                            { label: "Từ đệm", value: s.fillerWords, unit: " từ", bar: false, color: "#EF4444" },
                          ].map(({ label, value, unit, bar, color }) => (
                            <div key={label} className="bg-white rounded-xl border border-slate-100 px-4 py-3 space-y-1.5">
                              <p className="text-[11px] font-semibold text-slate-500">{label}</p>
                              <p className="text-[18px] font-bold leading-none" style={{ color }}>{value}<span className="text-[11px] font-medium text-slate-400">{unit}</span></p>
                              {bar && <MiniBar value={value as number} color={color} />}
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => onViewReport()}
                            className="btn-primary text-[12.5px] font-semibold bg-violet-700 hover:bg-violet-800 text-white px-5 py-2 rounded-xl shadow-sm"
                          >
                            Mở báo cáo đầy đủ →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
