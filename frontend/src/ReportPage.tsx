import { GeminiIcon } from "./components/icons";
import { useState } from "react";
import Sidebar, { UserRole } from "./Sidebar";

/* ── Radar Chart (Clean Emerald Light Green) ─────────────── */
function RadarChart() {
  const cx = 110, cy = 110, r = 78;
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
    <svg viewBox="0 0 220 220" className="w-full max-w-[210px]">
      <defs>
        <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#34D399" stopOpacity="0.08" />
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
      <path d={dataPath} fill="url(#radarFill)" stroke="#10B981" strokeWidth="1.8" strokeLinejoin="round" />

      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#10B981" stroke="white" strokeWidth="1.5" />
      ))}

      {/* Labels */}
      {axes.map((a) => {
        const pos = toXY(a.angle, r + 16);
        return (
          <text
            key={a.label}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9.5"
            fontWeight="500"
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
  { pct: 22, color: "#EF4444", label: "Nói từ đệm liên tục — 4× 'ừm'", severity: "Cần lưu ý" },
  { pct: 47, color: "#F59E0B", label: "Tốc độ nói tăng lên 190 WPM", severity: "Nhẹ" },
  { pct: 71, color: "#F59E0B", label: "Mất giao tiếp mắt trong 8 giây", severity: "Nhẹ" },
];

/* ── Score ring (Clean Emerald) ─────────────────────────── */
function ScoreRing({ score }: { score: number }) {
  const R = 44, sw = 6;
  const circ = 2 * Math.PI * (R - sw / 2);
  const dash = (score / 100) * circ;
  return (
    <svg width={R * 2} height={R * 2} viewBox={`0 0 ${R * 2} ${R * 2}`} className="-rotate-90">
      <circle cx={R} cy={R} r={R - sw / 2} fill="none" stroke="#F3F4F6" strokeWidth={sw} />
      <circle
        cx={R}
        cy={R}
        r={R - sw / 2}
        fill="none"
        stroke="#10B981"
        strokeWidth={sw}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Unified Metric Bar ─────────────────────────────────── */
function MetricBar({ label, value, max = 100, unit = "%" }: { label: string; value: number; max?: number; unit?: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="font-medium text-gray-600">{label}</span>
        <span className="font-semibold text-gray-900">{value}{unit}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${(value / max) * 100}%` }} />
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
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-gray-900 antialiased">
      <Sidebar userRole={userRole} activeItem="dashboard" onNav={onNav} />

      {/* ── MAIN ────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-14 flex-shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNav("history")}
              className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              title="Quay lại lịch sử"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div>
              <h1 className="text-sm font-semibold text-gray-900 leading-tight">Luyện tập bảo vệ đề án — Tuần 5</h1>
              <p className="text-xs text-gray-500">11/09/2026 · Thời lượng: 4 phút 32 giây</p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M4 6l3 3 3-3M1 10v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Xuất PDF
          </button>
        </header>

        {/* Body Layout: 60 / 40 */}
        <div className="flex-1 flex gap-0 min-h-0 overflow-hidden">
          {/* ── LEFT: 60% ───────────────────────────── */}
          <div className="flex-[6] min-w-0 flex flex-col overflow-y-auto p-5 space-y-5 border-r border-gray-200">
            {/* Video Player Box */}
            <div className="rounded-xl overflow-hidden bg-gray-950 border border-gray-800 shadow-sm relative" style={{ aspectRatio: "16/9" }}>
              <img
                src="https://images.unsplash.com/photo-1758876020207-67890de8aa73?w=900&h=506&fit=crop&auto=format"
                alt="Recorded presentation session"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* Top-left: Session Info */}
              <div className="absolute top-3 left-3">
                <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-md border border-white/10">
                  Phiên #47 — Tuần 5
                </span>
              </div>

              {/* Top-right: Duration */}
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-mono font-medium px-2.5 py-1 rounded-md border border-white/10">
                04:32
              </div>

              {/* Bottom Controls Bar */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex flex-col gap-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={playhead}
                  onChange={(e) => setPlayhead(Number(e.target.value))}
                  className="w-full h-1 accent-emerald-500 cursor-pointer"
                />
                <div className="flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      className="w-7 h-7 rounded-md bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    >
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M3 2l7 4-7 4V2z" fill="white" />
                      </svg>
                    </button>
                    <span className="font-mono text-white/90">
                      {`0${Math.floor((playhead / 100) * 4)}:${String(Math.floor((playhead / 100) * 60) % 60).padStart(2, "0")}`} / 04:32
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/80">
                    <button type="button" className="hover:text-white px-1.5 py-0.5 rounded">0.5×</button>
                    <button type="button" className="text-white font-semibold bg-white/20 px-1.5 py-0.5 rounded">1×</button>
                    <button type="button" className="hover:text-white px-1.5 py-0.5 rounded">1.5×</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dòng thời gian sự kiện</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Cần lưu ý
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Nhẹ
                  </span>
                </div>
              </div>

              {/* Track */}
              <div className="relative h-7 flex items-center">
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 bg-gray-100 rounded-full" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-emerald-100 rounded-full" style={{ width: `${playhead}%` }} />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-600 border-2 border-white shadow-sm z-20"
                  style={{ left: `calc(${playhead}% - 6px)` }}
                />
                {MARKERS.map((m, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                    style={{ left: `calc(${m.pct}% - 6px)` }}
                    onMouseEnter={() => setHoverMarker(i)}
                    onMouseLeave={() => setHoverMarker(null)}
                  >
                    <div
                      className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
                      style={{ background: m.color }}
                    />
                    {hoverMarker === i && (
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-md whitespace-nowrap shadow-md z-30 pointer-events-none">
                        {m.severity}: {m.label}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Marker Legend List */}
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                {MARKERS.map((m, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: m.color }} />
                    <span className="font-semibold text-gray-800">{m.severity}</span>
                    <span className="text-gray-600">{m.label}</span>
                    <span className="ml-auto text-gray-400 font-mono text-[11px]">
                      {`${Math.floor((m.pct / 100) * 4)}:${String(Math.floor((m.pct / 100) * 272) % 60).padStart(2, "0")}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transcript (Clean SaaS text box) */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Bản ghi lời nói</p>
                <span className="text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded-full">
                  Phát hiện 5 từ đệm
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Xin chào mọi người,{" "}
                <mark className="bg-amber-50 text-amber-900 border border-amber-200/60 font-medium px-1.5 py-0.5 rounded">ừm</mark>
                , hôm nay nhóm chúng em xin trình bày dự án về hệ thống huấn luyện thuyết trình bằng AI. Nhóm chúng em đã làm việc trong{" "}
                <mark className="bg-amber-50 text-amber-900 border border-amber-200/60 font-medium px-1.5 py-0.5 rounded">à</mark>
                , tám tuần qua. Nền tảng sử dụng MediaPipe và Google Gemini để cung cấp phản hồi thời gian thực về giao tiếp mắt, tốc độ nói và{" "}
                <mark className="bg-amber-50 text-amber-900 border border-amber-200/60 font-medium px-1.5 py-0.5 rounded">ừm</mark>
                , ngôn ngữ cơ thể. Chúng em tin rằng{" "}
                <mark className="bg-amber-50 text-amber-900 border border-amber-200/60 font-medium px-1.5 py-0.5 rounded">kiểu như</mark>
                , luyện tập đều đặn sẽ dẫn đến sự tự tin khi thuyết trình. Hãy để chúng em trình bày demo hôm nay.{" "}
                <mark className="bg-amber-50 text-amber-900 border border-amber-200/60 font-medium px-1.5 py-0.5 rounded">Ừm</mark>
                , bắt đầu với tổng quan kiến trúc hệ thống.
              </p>
            </div>
          </div>

          {/* ── RIGHT: 40% ──────────────────────────── */}
          <div className="flex-[4] min-w-0 flex flex-col gap-5 overflow-y-auto p-5">
            {/* Overall Score Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Điểm tổng thể</p>
              <div className="flex items-center gap-5">
                <div className="relative flex-shrink-0">
                  <ScoreRing score={85} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900 leading-none">85</span>
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">/ 100</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <MetricBar label="Giao tiếp mắt" value={88} />
                  <MetricBar label="Tốc độ nói" value={62} />
                  <MetricBar label="Độ tự tin" value={80} />
                  <MetricBar label="Từ đệm" value={75} />
                </div>
              </div>

              {/* Grade Badge */}
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200/60 font-bold text-emerald-700 text-sm flex items-center justify-center">
                  B+
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Trên trung bình</p>
                  <p className="text-gray-500 text-[11px]">Top 30% tất cả phiên tháng này</p>
                </div>
                <div className="ml-auto font-medium text-emerald-600">+4 điểm so với tuần trước</div>
              </div>
            </div>

            {/* Radar Chart Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phân tích đa chiều</p>
              <div className="flex flex-col items-center gap-3">
                <RadarChart />
                <div className="grid grid-cols-5 gap-2 w-full pt-1 border-t border-gray-100 text-center">
                  {[
                    { label: "WPM", value: "62%" },
                    { label: "Mắt", value: "88%" },
                    { label: "Cảm xúc", value: "74%" },
                    { label: "Cơ thể", value: "68%" },
                    { label: "Âm lượng", value: "80%" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <span className="text-xs font-bold text-gray-900 block">{value}</span>
                      <span className="text-[10px] text-gray-400 font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Coach Feedback (Standardized Clean White Cards) */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-0.5">Phản hồi từ AI Coach</p>

              {/* Strength Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
                    Điểm mạnh
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-900">
                  Giao tiếp mắt xuất sắc (88%)
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Bạn duy trì giao tiếp mắt tốt với camera trong suốt phiên — vượt xa mức chuẩn 70%. Điều này tạo dựng niềm tin và sự hiện diện tích cực.
                </p>
              </div>

              {/* Area to Improve Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
                    Cần cải thiện
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-900">
                  5 từ đệm ("ừm", "à") · Tốc độ nói 175 WPM (Hơi nhanh)
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Tốc độ nói vượt quá khoảng lý tưởng 130–160 WPM. Nói chậm lại giúp người nghe tiếp thu ý chính rõ ràng hơn.
                </p>
              </div>

              {/* Suggestion Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-700 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-md">
                    Bài tập đề xuất
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-900">
                  Thử bài tập "Dừng lại &amp; Hít thở" trước buổi ghi hình tiếp theo.
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Trước mỗi câu, hãy dừng lại 1 nhịp. Điều này tự nhiên giảm bớt từ đệm và thể hiện phong thái bình tĩnh.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
