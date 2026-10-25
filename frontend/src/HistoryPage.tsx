import { useState } from "react";
import Sidebar, { UserRole } from "./Sidebar";
import { CHART_DATA, SESSIONS } from "./mocks/mockHistory";

/* ── Clean Line Chart (Emerald Light Green) ──────────────── */
function LineChart({ hoverIdx, setHoverIdx }: { hoverIdx: number | null; setHoverIdx: (i: number | null) => void }) {
  const W = 700, H = 190;
  const padL = 40, padR = 20, padT = 16, padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const minScore = 45, maxScore = 100;
  const toX = (i: number) => padL + (i / (CHART_DATA.length - 1)) * chartW;
  const toY = (v: number) => padT + chartH - ((v - minScore) / (maxScore - minScore)) * chartH;

  const pts = CHART_DATA.map((d, i) => ({ x: toX(i), y: toY(d.score) }));
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const areaPath = linePath + ` L${pts[pts.length - 1].x},${padT + chartH} L${pts[0].x},${padT + chartH} Z`;

  const yTicks = [50, 70, 90];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ height: 200, userSelect: "none" }}
      onMouseLeave={() => setHoverIdx(null)}
    >
      <defs>
        <linearGradient id="lineAreaGrad" x1="0%" y1="0%" x2="0%" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {/* Y-axis gridlines */}
      {yTicks.map((v) => {
        const y = toY(v);
        return (
          <g key={v}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#F3F4F6" strokeWidth="1" />
            <text x={padL - 8} y={y + 3.5} textAnchor="end" fontSize="10" fill="#9CA3AF" fontFamily="Inter,sans-serif" fontWeight="500">
              {v}
            </text>
          </g>
        );
      })}

      {/* Area fill */}
      <path d={areaPath} fill="url(#lineAreaGrad)" />

      {/* Main line */}
      <path d={linePath} fill="none" stroke="#10B981" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />

      {/* X-axis labels + interactive zones */}
      {CHART_DATA.map((d, i) => {
        const x = toX(i);
        const active = hoverIdx === i;
        return (
          <g key={i}>
            {active && (
              <line x1={x} y1={padT} x2={x} y2={padT + chartH} stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            )}
            <circle
              cx={x}
              cy={pts[i].y}
              r={active ? 5.5 : 4}
              fill={active ? "#10B981" : "white"}
              stroke="#10B981"
              strokeWidth="2"
              style={{ cursor: "pointer", transition: "r 0.15s" }}
            />
            <text
              x={x}
              y={H - 6}
              textAnchor="middle"
              fontSize="10"
              fill={active ? "#111827" : "#9CA3AF"}
              fontWeight={active ? "600" : "500"}
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function MiniBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${value}%` }} />
    </div>
  );
}

interface HistoryPageProps {
  onNav: (view: string) => void;
  onViewReport: () => void;
  userRole: UserRole;
}

export default function HistoryPage({ onNav, onViewReport, userRole }: HistoryPageProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [expandedId, setExpandedId] = useState<string | number | null>(null);

  const filters = ["Tất cả", "Bảo vệ đề án", "Phỏng vấn việc làm", "Thuyết trình lớp học", "Hội thảo"];
  const filtered = activeFilter === "Tất cả" ? SESSIONS : SESSIONS.filter((s) => s.context === activeFilter);

  const avgScore = Math.round(SESSIONS.reduce((a, s) => a + s.score, 0) / SESSIONS.length);
  const totalMins = SESSIONS.reduce((a, s) => {
    const [m, sec] = s.duration.split(":").map(Number);
    return a + m + sec / 60;
  }, 0);
  const improvement = SESSIONS[0].score - SESSIONS[SESSIONS.length - 1].score;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-gray-900 antialiased">
      <Sidebar userRole={userRole} activeItem="history" onNav={onNav} />

      {/* ── MAIN ────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-lg font-bold text-gray-900 tracking-tight leading-none">Tiến trình luyện tập</h1>
              <p className="text-xs text-gray-500 mt-1">Theo dõi sự phát triển kỹ năng thuyết trình qua từng phiên</p>
            </div>
            <button
              type="button"
              onClick={() => onNav("studio")}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              + Phiên mới
            </button>
          </div>

          {/* Unified Stat Cards (Clean White) */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Tổng số phiên", value: String(SESSIONS.length), sub: "Toàn bộ thời gian" },
              { label: "Điểm trung bình", value: `${avgScore}/100`, sub: "Trên tất cả phiên" },
              { label: "Thời gian luyện", value: `${Math.round(totalMins)} phút`, sub: "Tổng thời lượng video" },
              { label: "Mức cải thiện", value: `+${improvement} điểm`, sub: "Kể từ phiên đầu tiên", highlight: true },
            ].map(({ label, value, sub, highlight }) => (
              <div key={label} className="bg-gray-50/80 border border-gray-200/80 rounded-xl px-4 py-3 space-y-1">
                <p className="text-xs font-medium text-gray-500">{label}</p>
                <p className={`text-xl font-bold ${highlight ? "text-emerald-600" : "text-gray-900"}`}>{value}</p>
                <p className="text-[11px] text-gray-400">{sub}</p>
              </div>
            ))}
          </div>
        </header>

        <div className="p-8 space-y-6">
          {/* ── Growth Chart Card ─────────────────── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Điểm tổng thể — Xu hướng theo tuần</h2>
                <p className="text-xs text-gray-500 mt-0.5">Biểu đồ thể hiện điểm đánh giá trung bình qua từng đợt luyện tập</p>
              </div>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                +27 điểm trong 4 tuần
              </span>
            </div>

            <LineChart hoverIdx={hoverIdx} setHoverIdx={setHoverIdx} />

            {/* Week Summary Strip */}
            <div className="grid grid-cols-4 gap-3 pt-3 border-t border-gray-100">
              {CHART_DATA.map((d, i) => (
                <div
                  key={i}
                  className={`rounded-lg p-3 transition-colors ${
                    hoverIdx === i
                      ? "bg-emerald-50/60 border border-emerald-200"
                      : "bg-gray-50/70 border border-gray-100 hover:bg-gray-50"
                  }`}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(null)}
                >
                  <p className="text-[11px] font-medium text-gray-500">{d.label}</p>
                  <p className="text-lg font-bold text-gray-900 mt-0.5">{d.score} điểm</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{d.sessions} phiên · {d.topSkill}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Session List ──────────────────────── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Các phiên gần đây</h2>
              <span className="text-xs text-gray-500">Hiển thị {filtered.length}/{SESSIONS.length} phiên</span>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                    activeFilter === f
                      ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Session Rows (Clean White Cards) */}
            <div className="space-y-3">
              {filtered.map((s) => {
                const expanded = expandedId === s.id;
                return (
                  <div
                    key={s.id}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all"
                  >
                    {/* Main Row */}
                    <div
                      className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                      onClick={() => setExpandedId(expanded ? null : s.id)}
                    >
                      {/* Score Badge */}
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200/60 flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-emerald-700 leading-none">{s.score}</span>
                      </div>

                      {/* Title + Context */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-gray-900 truncate">{s.title}</p>
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 border border-gray-200">
                            {s.context}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-gray-500 mt-1">
                          <span>{s.date}</span>
                          <span>·</span>
                          <span className="font-mono">{s.duration}</span>
                          {s.trend !== null && (
                            <>
                              <span>·</span>
                              <span className="text-emerald-600 font-medium">+{s.trend} điểm so với trước</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewReport();
                          }}
                          className="text-xs font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                        >
                          Xem chi tiết
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded-md text-gray-400 hover:text-gray-600"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                          >
                            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Expanded Detail Panel */}
                    {expanded && (
                      <div className="border-t border-gray-100 px-5 py-4 bg-gray-50/50 space-y-3">
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { label: "Giao tiếp mắt", value: s.eyeContact, unit: "%", bar: true },
                            { label: "Tốc độ nói", value: s.wpm, unit: " WPM", bar: false },
                            { label: "Từ đệm", value: s.fillerWords, unit: " từ", bar: false },
                          ].map(({ label, value, unit, bar }) => (
                            <div key={label} className="bg-white rounded-lg border border-gray-200 p-3 space-y-1">
                              <p className="text-xs text-gray-500 font-medium">{label}</p>
                              <p className="text-base font-bold text-gray-900 leading-none">
                                {value}<span className="text-xs font-medium text-gray-400 ml-0.5">{unit}</span>
                              </p>
                              {bar && <MiniBar value={value as number} />}
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => onViewReport()}
                            className="text-xs font-medium bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-lg transition-colors shadow-sm"
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
