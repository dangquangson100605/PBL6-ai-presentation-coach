import { GeminiIcon } from "./components/icons";
import { useState } from "react";
import Sidebar, { UserRole } from "./Sidebar";

/* ── Icons ─────────────────────────────────────────────── */



/* ── Radar Chart ────────────────────────────────────────── */
function RadarChart() {
  const cx = 110, cy = 110, r = 80;
  const axes = [
    { label: "WPM",              angle: -90,  value: 0.62 },
    { label: "Giao tiếp mắt",   angle: -18,  value: 0.88 },
    { label: "Cảm xúc",          angle:  54,  value: 0.74 },
    { label: "Ngôn ngữ cơ thể",  angle: 126,  value: 0.68 },
    { label: "Âm lượng",         angle: 198,  value: 0.80 },
  ];

  const toXY = (angle: number, radius: number) => ({
    x: cx + radius * Math.cos((angle * Math.PI) / 180),
    y: cy + radius * Math.sin((angle * Math.PI) / 180),
  });

  const rings = [0.25, 0.5, 0.75, 1];
  const dataPoints = axes.map((a) => toXY(a.angle, r * a.value));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + " Z";

  return (
    <svg viewBox="0 0 220 220" className="w-full max-w-[220px]">
      <defs>
        <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Grid rings */}
      {rings.map((s) => {
        const pts = axes.map((a) => toXY(a.angle, r * s));
        const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + " Z";
        return <path key={s} d={d} fill="none" stroke="#E5E7EB" strokeWidth="1" />;
      })}

      {/* Axis spokes */}
      {axes.map((a) => {
        const end = toXY(a.angle, r);
        return <line key={a.label} x1={cx} y1={cy} x2={end.x.toFixed(1)} y2={end.y.toFixed(1)} stroke="#E5E7EB" strokeWidth="1" />;
      })}

      {/* Data polygon */}
      <path d={dataPath} fill="url(#radarFill)" stroke="#7C3AED" strokeWidth="2" strokeLinejoin="round" />

      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#7C3AED" stroke="white" strokeWidth="1.5" />
      ))}

      {/* Labels */}
      {axes.map((a) => {
        const pos = toXY(a.angle, r + 18);
        return (
          <text
            key={a.label}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9.5"
            fontWeight="600"
            fill="#64748B"
            fontFamily="Inter, sans-serif"
          >
            {a.label}
          </text>
        );
      })}
    </svg>
  );
}

/* ── Timeline markers ───────────────────────────────────── */
const MARKERS = [
  { pct: 22, color: "#EF4444", label: "Nói từ đệm liên tục — 4× 'ừm'",    severity: "Nghiêm trọng" },
  { pct: 47, color: "#F97316", label: "Tốc độ nói tăng đột biến lên 190 WPM", severity: "Nhẹ" },
  { pct: 71, color: "#F97316", label: "Mất giao tiếp mắt trong 8 giây",    severity: "Nhẹ" },
];

/* ── Score ring ─────────────────────────────────────────── */
function ScoreRing({ score }: { score: number }) {
  const R = 46, sw = 7;
  const circ = 2 * Math.PI * (R - sw / 2);
  const dash = (score / 100) * circ;
  return (
    <svg width={R * 2} height={R * 2} viewBox={`0 0 ${R * 2} ${R * 2}`} className="-rotate-90">
      <circle cx={R} cy={R} r={R - sw / 2} fill="none" stroke="#EDE9FE" strokeWidth={sw} />
      <circle cx={R} cy={R} r={R - sw / 2} fill="none" stroke="url(#scoreGrad)" strokeWidth={sw}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      <defs>
        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Metric bar ─────────────────────────────────────────── */
function MetricBar({ label, value, max = 100, unit = "%", color }: { label: string; value: number; max?: number; unit?: string; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <span className="text-[11px] font-medium text-slate-500">{label}</span>
        <span className="text-[11px] font-bold text-slate-700">{value}{unit}</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${(value / max) * 100}%`, background: color }} />
      </div>
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────── */
interface ReportPageProps {
  onNav: (view: string) => void;
  userRole: UserRole;
}

export default function ReportPage({ onNav, userRole }: ReportPageProps) {
  const [hoverMarker, setHoverMarker] = useState<number | null>(null);
  const [playhead, setPlayhead] = useState(34);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>

      <Sidebar userRole={userRole} activeItem="dashboard" onNav={onNav} />

      {/* ── MAIN ────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <header className="h-14 flex-shrink-0 bg-white border-b border-slate-100 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => onNav("history")} className="text-slate-400 hover:text-slate-600 transition-colors" title="Back to History">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div>
              <h1 className="text-[15px] font-bold text-slate-800 leading-tight">Luyện tập bảo vệ đề án — Tuần 5</h1>
              <p className="text-[11px] text-slate-400">Ghi ngày 11/09/2026 · 4 phút 32 giây</p>
            </div>
          </div>
          <button className="btn-primary flex items-center gap-2 bg-violet-700 hover:bg-violet-800 text-white text-[13px] font-semibold px-4 py-2 rounded-xl shadow-sm shadow-violet-200">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3M1 10v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Xuất PDF
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 flex gap-0 min-h-0 overflow-hidden">

          {/* ── LEFT: 60% ───────────────────────────── */}
          <div className="flex-[6] min-w-0 flex flex-col gap-0 overflow-y-auto p-4 space-y-4 border-r border-slate-100">

            {/* Video player */}
            <div className="rounded-2xl overflow-hidden bg-slate-900 shadow-lg relative" style={{ aspectRatio: "16/9" }}>
              <img
                src="https://images.unsplash.com/photo-1758876020207-67890de8aa73?w=900&h=506&fit=crop&auto=format"
                alt="Recorded presentation session"
                className="w-full h-full object-cover opacity-80"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Top-left: session info */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10">
                  Session #47 — Week 5
                </span>
              </div>

              {/* Top-right: duration */}
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[11px] font-mono font-bold px-3 py-1 rounded-full border border-white/10">
                04:32
              </div>

              {/* Bottom controls bar */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex flex-col gap-2">
                {/* Scrub bar */}
                <input
                  type="range" min={0} max={100} value={playhead}
                  onChange={(e) => setPlayhead(Number(e.target.value))}
                  className="w-full h-1 accent-violet-500 cursor-pointer"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Play/pause */}
                    <button className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 2l7 4-7 4V2z" fill="white" /></svg>
                    </button>
                    <span className="text-white font-mono text-[11px]">
                      {`0${Math.floor((playhead / 100) * 4)}:${String(Math.floor((playhead / 100) * 60) % 60).padStart(2, "0")}`} / 04:32
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-white/70 hover:text-white text-[11px] font-medium transition-colors">0.5×</button>
                    <button className="text-white font-semibold text-[11px] bg-white/20 px-2 py-0.5 rounded">1×</button>
                    <button className="text-white/70 hover:text-white text-[11px] font-medium transition-colors">1.5×</button>
                    <button className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors ml-1">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1h4v4H1zM7 1h4v4H7zM1 7h4v4H1zM7 7h4v4H7z" fill="white" fillOpacity="0.8" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 space-y-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Dòng thời gian sự kiện</p>
                <div className="flex items-center gap-3 text-[10px] font-semibold">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />Nghiêm trọng</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />Nhẹ</span>
                </div>
              </div>

              {/* Track */}
              <div className="relative h-8 flex items-center">
                {/* Base rail */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 bg-slate-100 rounded-full" />
                {/* Progress fill */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-violet-200 rounded-full" style={{ width: `${playhead}%` }} />
                {/* Playhead */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-violet-600 border-2 border-white shadow z-20"
                  style={{ left: `calc(${playhead}% - 6px)` }}
                />
                {/* Markers */}
                {MARKERS.map((m, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer group"
                    style={{ left: `calc(${m.pct}% - 7px)` }}
                    onMouseEnter={() => setHoverMarker(i)}
                    onMouseLeave={() => setHoverMarker(null)}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-125"
                      style={{ background: m.color, boxShadow: `0 0 8px ${m.color}60` }}
                    />
                    {/* Tooltip */}
                    {hoverMarker === i && (
                      <div className="tooltip-fade absolute bottom-6 left-1/2 bg-slate-900 text-white text-[10px] font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl z-30 pointer-events-none" style={{ transform: "translateX(-50%)" }}>
                        <span className="font-bold" style={{ color: m.color }}>{m.severity}: </span>{m.label}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Time labels */}
                {["0:00", "1:00", "2:00", "3:00", "4:32"].map((t, i) => (
                  <span key={t} className="absolute text-[9px] text-slate-400 font-mono" style={{ left: `${(i / 4) * 100}%`, top: "calc(100% + 8px)", transform: i === 4 ? "translateX(-100%)" : i > 0 ? "translateX(-50%)" : undefined }}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="h-4" /> {/* spacer for time labels */}

              {/* Marker legend list */}
              <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-50">
                {MARKERS.map((m, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[12px]">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: m.color }} />
                    <span className="font-semibold" style={{ color: m.color }}>{m.severity}</span>
                    <span className="text-slate-500">{m.label}</span>
                    <span className="ml-auto text-slate-400 font-mono text-[10px]">
                      {`${Math.floor((m.pct / 100) * 4)}:${String(Math.floor((m.pct / 100) * 272) % 60).padStart(2, "0")}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transcript */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Bản ghi lời nói</p>
                <span className="text-[10px] font-semibold text-orange-500 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">Phát hiện 5 từ đệm</span>
              </div>
              <p className="text-[13.5px] text-slate-600 leading-[1.9]">
                Xin chào mọi người,{" "}
                <mark className="bg-orange-100 text-orange-700 font-semibold px-1 py-0.5 rounded" title="Từ đệm">ừm</mark>
                , hôm nay nhóm chúng em xin trình bày dự án về hệ thống huấn luyện thuyết trình bằng AI. Nhóm chúng em đã làm việc trong{" "}
                <mark className="bg-orange-100 text-orange-700 font-semibold px-1 py-0.5 rounded" title="Từ đệm">à</mark>
                , tám tuần qua. Nền tảng sử dụng MediaPipe và Google Gemini để cung cấp phản hồi thời gian thực về giao tiếp mắt, tốc độ nói và{" "}
                <mark className="bg-orange-100 text-orange-700 font-semibold px-1 py-0.5 rounded" title="Từ đệm">ừm</mark>
                , ngôn ngữ cơ thể. Chúng em tin rằng{" "}
                <mark className="bg-orange-100 text-orange-700 font-semibold px-1 py-0.5 rounded" title="Từ đệm">kiểu như</mark>
                , luyện tập đều đặn sẽ dẫn đến sự tự tin khi thuyết trình. Hãy để chúng em trình bày demo hôm nay.{" "}
                <mark className="bg-orange-100 text-orange-700 font-semibold px-1 py-0.5 rounded" title="Từ đệm">Ừm</mark>
                , bắt đầu với tổng quan kiến trúc hệ thống.
              </p>
              <p className="text-[10.5px] text-slate-400">
                <span className="font-semibold text-orange-500">Từ được đánh dấu</span> là các từ đệm đã phát hiện. Di chuột để xem chi tiết.
              </p>
            </div>

          </div>

          {/* ── RIGHT: 40% ──────────────────────────── */}
          <div className="flex-[4] min-w-0 flex flex-col gap-4 overflow-y-auto p-4">

            {/* Overall score card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-4">Điểm tổng thể</p>
              <div className="flex items-center gap-5">
                <div className="relative flex-shrink-0">
                  <ScoreRing score={85} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[22px] font-bold text-violet-700 leading-none">85</span>
                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">/ 100</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2.5">
                  <MetricBar label="Giao tiếp mắt" value={88} color="#22C55E" />
                  <MetricBar label="Tốc độ nói" value={62} color="#F97316" />
                  <MetricBar label="Độ tự tin" value={80} color="#7C3AED" />
                  <MetricBar label="Từ đệm" value={75} color="#EAB308" />
                </div>
              </div>

              {/* Grade badge */}
              <div className="mt-4 flex items-center gap-3 bg-violet-50 border border-violet-200 rounded-xl px-4 py-2.5">
                <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center font-bold text-violet-700 text-[15px]">B+</div>
                <div>
                  <p className="text-[12px] font-bold text-violet-800">Trên trung bình</p>
                  <p className="text-[10.5px] text-violet-500">Top 30% tất cả phiên tháng này</p>
                </div>
                <div className="ml-auto text-[11px] font-semibold text-violet-600">+4 điểm so với tuần trước</div>
              </div>
            </div>

            {/* Radar chart */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-3">Phân tích kỹ năng</p>
              <div className="flex flex-col items-center gap-3">
                <RadarChart />
                {/* Axis value labels */}
                <div className="grid grid-cols-5 gap-1 w-full">
                  {[
                    { label: "WPM", value: "62%", color: "text-orange-500" },
                    { label: "Mắt", value: "88%", color: "text-emerald-600" },
                    { label: "Cảm xúc", value: "74%", color: "text-blue-500" },
                    { label: "Cơ thể", value: "68%", color: "text-indigo-500" },
                    { label: "Âm lượng", value: "80%", color: "text-violet-600" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex flex-col items-center">
                      <span className={`text-[13px] font-bold ${color}`}>{value}</span>
                      <span className="text-[9px] text-slate-400 font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Coach Feedback */}
            <div className="space-y-3">
              <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider px-1">Phản hồi từ AI Coach</p>

              {/* Strength card */}
              <div className="card-hover bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Điểm mạnh</span>
                </div>
                <p className="text-[13px] font-semibold text-emerald-900 leading-relaxed">
                  Giao tiếp mắt xuất sắc (88%)
                </p>
                <p className="text-[12px] text-emerald-700 leading-relaxed">
                  Bạn duy trì giao tiếp mắt tốt với camera trong suốt phiên — vượt xa mức chuẩn 70%. Điều này tạo dựng niềm tin và sự hiện diện.
                </p>
              </div>

              {/* Area to improve card */}
              <div className="card-hover bg-orange-50 border border-orange-200 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 4v4" stroke="#C2410C" strokeWidth="1.8" strokeLinecap="round" /><circle cx="7" cy="10.5" r="0.8" fill="#C2410C" /></svg>
                  </div>
                  <span className="text-[11px] font-bold text-orange-700 uppercase tracking-wider">Cần cải thiện</span>
                </div>
                <p className="text-[13px] font-semibold text-orange-900 leading-relaxed">
                  5 từ đệm ("ừm", "à") · WPM là 175 (Quá nhanh)
                </p>
                <p className="text-[12px] text-orange-700 leading-relaxed">
                  Tốc độ nói của bạn vượt quá khoảng lý tưởng 130–160 WPM. Nói chậm lại giúp khán giả tiếp thu ý chính và bạn nghe có uy hơn.
                </p>
              </div>

              {/* Practice suggestion card */}
              <div className="card-hover bg-violet-50 border border-violet-200 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1C7 4.314 4.314 7 1 7c3.314 0 6 2.686 6 6 0-3.314 2.686-6 6-6-3.314 0-6-2.686-6-6z" fill="#7C3AED" /></svg>
                  </div>
                  <span className="text-[11px] font-bold text-violet-700 uppercase tracking-wider">Bài tập đề xuất</span>
                </div>
                <p className="text-[13px] font-semibold text-violet-900 leading-relaxed">
                  Thử bài tập "Dừng lại &amp; Hít thở" trước buổi ghi hình tiếp theo.
                </p>
                <p className="text-[12px] text-violet-700 leading-relaxed">
                  Trước mỗi câu, hít một hơi thở có chủ ý. Điều này tự nhiên giảm từ đệm, làm chậm tốc độ nói và thể hiện sự tự tin bình tĩnh.
                </p>
                <button className="mt-1 text-[12px] font-semibold text-violet-700 hover:text-violet-900 underline underline-offset-2 transition-colors">
                  Bắt đầu bài tập →
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
