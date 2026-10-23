import { useState, useEffect } from "react";
import Sidebar, { UserRole } from "./Sidebar";

/* ── Icons ─────────────────────────────────────────────── */
function GeminiIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 2C8 5.314 5.314 8 2 8c3.314 0 6 2.686 6 6 0-3.314 2.686-6 6-6-3.314 0-6-2.686-6-6z" fill="#7C3AED" />
    </svg>
  );
}

function IconDashboard({ active }: { active?: boolean }) {
  const c = active ? "#7C3AED" : "#94A3B8";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1.5" y="1.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5" />
      <rect x="10.5" y="1.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5" />
      <rect x="1.5" y="10.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5" />
      <rect x="10.5" y="10.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5" />
    </svg>
  );
}

function IconStudio({ active }: { active?: boolean }) {
  const c = active ? "#7C3AED" : "#94A3B8";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke={c} strokeWidth="1.5" />
      <circle cx="9" cy="9" r="3" fill={c} fillOpacity="0.3" stroke={c} strokeWidth="1.5" />
      <circle cx="9" cy="9" r="1" fill={c} />
    </svg>
  );
}

function IconUpload({ active }: { active?: boolean }) {
  const c = active ? "#7C3AED" : "#94A3B8";
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2v10M5 6l4-4 4 4M2 14h14" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function IconHistory({ active }: { active?: boolean }) {
  const c = active ? "#7C3AED" : "#94A3B8";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 4.5V9l3 2" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 9A5.5 5.5 0 1 1 9 14.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3.5 5.5V9H7" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSettings({ active }: { active?: boolean }) {
  const c = active ? "#7C3AED" : "#94A3B8";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="2.5" stroke={c} strokeWidth="1.5" />
      <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.697 3.697l1.414 1.414M12.889 12.889l1.414 1.414M3.697 14.303l1.414-1.414M12.889 5.111l1.414-1.414" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Circular progress ──────────────────────────────────── */
function CircularProgress({ pct }: { pct: number }) {
  const R = 88;
  const stroke = 10;
  const norm = R - stroke / 2;
  const circ = 2 * Math.PI * norm;
  const dash = (pct / 100) * circ;

  return (
    <div className="relative" style={{ width: R * 2 + stroke, height: R * 2 + stroke }}>
      <svg
        width={R * 2 + stroke}
        height={R * 2 + stroke}
        viewBox={`0 0 ${R * 2 + stroke} ${R * 2 + stroke}`}
        className="-rotate-90"
        style={{ display: "block" }}
      >
        {/* Track */}
        <circle
          cx={R + stroke / 2}
          cy={R + stroke / 2}
          r={norm}
          fill="none"
          stroke="#EDE9FE"
          strokeWidth={stroke}
        />
        {/* Glow ring (blurred duplicate) */}
        <circle
          cx={R + stroke / 2}
          cy={R + stroke / 2}
          r={norm}
          fill="none"
          stroke="#7C3AED"
          strokeWidth={stroke + 4}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          opacity="0.18"
          filter="url(#glow)"
          style={{ transition: "stroke-dasharray 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
        {/* Main arc */}
        <circle
          cx={R + stroke / 2}
          cy={R + stroke / 2}
          r={norm}
          fill="none"
          stroke="url(#arcGrad)"
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
          </filter>
        </defs>
      </svg>

      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[38px] font-bold text-violet-700 leading-none tracking-tight">{pct}%</span>
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-1">Hoàn thành</span>
      </div>
    </div>
  );
}

/* ── Step list ──────────────────────────────────────────── */
const STEPS = [
  { label: "Đang tải video lên",              done: true,    active: false },
  { label: "Trích xuất âm thanh",             done: true,    active: false },
  { label: "Phát hiện điểm mốc khuôn mặt",   done: true,    active: false },
  { label: "Đo lường giao tiếp mắt",          done: false,   active: true  },
  { label: "Phân tích tốc độ nói",            done: false,   active: false },
  { label: "Đếm từ đệm",                      done: false,   active: false },
  { label: "Tạo tóm tắt AI",                  done: false,   active: false },
];

function StepIcon({ done, active }: { done: boolean; active: boolean }) {
  if (done) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="9" fill="#7C3AED" />
        <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (active) {
    return (
      <span className="relative flex items-center justify-center w-[18px] h-[18px]">
        <span className="absolute w-full h-full rounded-full bg-violet-200 animate-ping opacity-60" />
        <span className="w-[18px] h-[18px] rounded-full border-2 border-violet-500 bg-white flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-violet-500" />
        </span>
      </span>
    );
  }
  return (
    <span className="w-[18px] h-[18px] rounded-full border-2 border-slate-200 bg-white block flex-shrink-0" />
  );
}

/* ── Scanning line animation ────────────────────────────── */
function ScanningBar() {
  return (
    <div className="relative w-full h-1.5 bg-violet-100 rounded-full overflow-hidden">
      <div
        className="absolute top-0 h-full rounded-full"
        style={{
          width: "40%",
          background: "linear-gradient(90deg, transparent, #7C3AED, transparent)",
          animation: "scan 1.8s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes scan {
          0%   { left: -40%; }
          100% { left: 140%; }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes orbitDot {
          from { transform: rotate(0deg) translateX(64px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(64px) rotate(-360deg); }
        }
        @keyframes orbitDot2 {
          from { transform: rotate(120deg) translateX(64px) rotate(-120deg); }
          to   { transform: rotate(480deg) translateX(64px) rotate(-480deg); }
        }
        @keyframes orbitDot3 {
          from { transform: rotate(240deg) translateX(64px) rotate(-240deg); }
          to   { transform: rotate(600deg) translateX(64px) rotate(-600deg); }
        }
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spinRingRev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────── */
interface AnalyzingPageProps {
  onNav: (view: string) => void;
  onDone?: () => void;
  userRole: UserRole;
}

const TIPS = [
  "Dừng lại 2 giây sau một điểm quan trọng giúp khán giả tiếp thu thông điệp của bạn.",
  "Duy trì giao tiếp mắt với các khu vực khác nhau trong phòng tạo dựng niềm tin và sự kết nối.",
  "Thay đổi tốc độ nói giúp khán giả tập trung — nói chậm lại khi nhấn mạnh ý chính.",
  "Loại bỏ từ đệm như 'ừm' và 'à' giúp bạn trở nên tự tin và chuyên nghiệp hơn.",
];

export default function AnalyzingPage({ onNav, onDone, userRole }: AnalyzingPageProps) {
  const [progress, setProgress] = useState(75);
  const [tipIdx] = useState(0);

  /* Slowly advance progress for visual polish */
  useEffect(() => {
    if (progress >= 100) return;
    const id = setInterval(() => setProgress((p) => Math.min(p + 1, 100)), 200);
    return () => clearInterval(id);
  }, [progress]);

  useEffect(() => {
    if (!onDone) return;
    const id = window.setTimeout(onDone, 3000);
    return () => window.clearTimeout(id);
  }, [onDone]);

  const NAV = [
    { id: "dashboard", label: "Dashboard", Icon: IconDashboard },
    { id: "studio",    label: "Studio",    Icon: IconStudio },
    { id: "upload",    label: "Upload Video", Icon: IconUpload },
    { id: "history",   label: "History",   Icon: IconHistory },
    { id: "settings",  label: "Settings",  Icon: IconSettings },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>

      <Sidebar userRole={userRole} activeItem="analyzing" onNav={onNav} />

      {/* ── MAIN ────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-10 relative overflow-hidden">

        {/* Ambient background blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-120px] left-[10%] w-[420px] h-[420px] rounded-full bg-violet-100 opacity-40 blur-3xl" />
          <div className="absolute bottom-[-80px] right-[5%] w-[320px] h-[320px] rounded-full bg-indigo-100 opacity-30 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-10 max-w-xl w-full">

          {/* ── Orbital animation ring + circular progress ── */}
          <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>

            {/* Outer spinning dashed ring */}
            <div
              className="absolute rounded-full border border-dashed border-violet-200"
              style={{
                width: 210,
                height: 210,
                animation: "spinRing 18s linear infinite",
              }}
            />
            {/* Inner reverse ring */}
            <div
              className="absolute rounded-full border border-dashed border-violet-100"
              style={{
                width: 196,
                height: 196,
                animation: "spinRingRev 12s linear infinite",
              }}
            />

            {/* Orbiting dots */}
            {[
              { anim: "orbitDot 3.2s linear infinite", color: "#7C3AED", size: 8 },
              { anim: "orbitDot2 3.2s linear infinite", color: "#A78BFA", size: 6 },
              { anim: "orbitDot3 3.2s linear infinite", color: "#C4B5FD", size: 5 },
            ].map(({ anim, color, size }, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: 0, height: 0 }}
              >
                <div
                  style={{
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    background: color,
                    boxShadow: `0 0 8px ${color}`,
                    animation: anim,
                    marginLeft: -size / 2,
                    marginTop: -size / 2,
                  }}
                />
              </div>
            ))}

            {/* Circular progress chart */}
            <CircularProgress pct={progress} />
          </div>

          {/* ── Headline ── */}
          <div className="text-center space-y-2">
            <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
              Đang phân tích dữ liệu đa phương thức...
            </h1>
            <p className="text-[15px] text-slate-400 font-medium leading-relaxed">
              Trích xuất giao tiếp mắt, tốc độ nói (WPM) và từ đệm.
            </p>
          </div>

          {/* ── Scanning progress bar ── */}
          <div className="w-full space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider">Tiến độ tổng thể</span>
              <span className="text-[12px] font-bold text-violet-700">{progress}%</span>
            </div>
            <ScanningBar />
          </div>

          {/* ── Step list ── */}
          <div className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50 overflow-hidden">
            {STEPS.map(({ label, done, active }, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-5 py-3.5 transition-colors ${
                  active ? "bg-violet-50/60" : ""
                }`}
              >
                <StepIcon done={done} active={active} />
                <span
                  className={`text-[13px] font-medium flex-1 ${
                    done ? "text-slate-400 line-through decoration-slate-300" : active ? "text-violet-700 font-semibold" : "text-slate-500"
                  }`}
                >
                  {label}
                </span>
                {done && (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Xong
                  </span>
                )}
                {active && (
                  <span className="text-[10px] font-bold text-violet-600 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full">
                    Đang chạy
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* ── View Report button ── */}
          {onDone && (
            <button
              onClick={onDone}
              className="btn-primary w-full bg-violet-700 hover:bg-violet-800 text-white font-semibold py-3 rounded-xl shadow-md shadow-violet-200 text-[14px]"
            >
              Xem Báo cáo đầy đủ →
            </button>
          )}

          {/* ── Tip card ── */}
          <div
            className="w-full rounded-2xl px-5 py-4 flex items-start gap-4"
            style={{
              background: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)",
              border: "1px solid #DDD6FE",
              animation: "floatUp 4s ease-in-out infinite",
            }}
          >
            <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-lg">
              💡
            </div>
            <div className="space-y-0.5">
              <p className="text-[11px] font-bold text-violet-500 uppercase tracking-wider">Mẹo thuyết trình</p>
              <p className="text-[13.5px] font-medium text-violet-900 leading-relaxed">
                {TIPS[tipIdx]}
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
