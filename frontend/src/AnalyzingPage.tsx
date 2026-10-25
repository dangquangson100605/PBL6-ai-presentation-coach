import { useState, useEffect } from "react";
import Sidebar, { UserRole } from "./Sidebar";

/* ── Circular Progress (Clean Light Green Emerald) ───────── */
function CircularProgress({ pct }: { pct: number }) {
  const R = 80;
  const stroke = 8;
  const norm = R - stroke / 2;
  const circ = 2 * Math.PI * norm;
  const dash = (pct / 100) * circ;

  return (
    <div className="relative flex items-center justify-center" style={{ width: R * 2 + stroke, height: R * 2 + stroke }}>
      <svg
        width={R * 2 + stroke}
        height={R * 2 + stroke}
        viewBox={`0 0 ${R * 2 + stroke} ${R * 2 + stroke}`}
        className="-rotate-90 block"
      >
        {/* Track */}
        <circle
          cx={R + stroke / 2}
          cy={R + stroke / 2}
          r={norm}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth={stroke}
        />
        {/* Main Arc */}
        <circle
          cx={R + stroke / 2}
          cy={R + stroke / 2}
          r={norm}
          fill="none"
          stroke="#10B981"
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.4s ease" }}
        />
      </svg>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-900 leading-none tracking-tight">{pct}%</span>
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-1">Đang xử lý</span>
      </div>
    </div>
  );
}

/* ── Step List ──────────────────────────────────────────── */
const STEPS = [
  { label: "Đang tải video lên hệ thống", done: true, active: false },
  { label: "Trích xuất luồng âm thanh", done: true, active: false },
  { label: "Phát hiện điểm mốc khuôn mặt (Face Landmarks)", done: true, active: false },
  { label: "Đo lường tỉ lệ giao tiếp mắt", done: false, active: true },
  { label: "Phân tích nhịp độ và tốc độ nói (WPM)", done: false, active: false },
  { label: "Phát hiện và thống kê từ đệm", done: false, active: false },
  { label: "Tổng hợp báo cáo và khuyến nghị từ AI", done: false, active: false },
];

function StepIcon({ done, active }: { done: boolean; active: boolean }) {
  if (done) {
    return (
      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
        ✓
      </div>
    );
  }
  if (active) {
    return (
      <div className="w-5 h-5 rounded-full border-2 border-emerald-500 bg-white flex items-center justify-center flex-shrink-0">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
    );
  }
  return <div className="w-5 h-5 rounded-full border border-gray-200 bg-gray-50 flex-shrink-0" />;
}

const TIPS = [
  "Duy trì giao tiếp mắt ít nhất 70% thời lượng giúp người nghe cảm thấy được kết nối.",
  "Khoảng tốc độ nói lý tưởng trong thuyết trình là từ 130 đến 160 từ/phút (WPM).",
  "Tạm dừng 1-2 giây trước khi chuyển ý giúp giảm thiểu hoàn toàn các từ đệm như 'ừm', 'à'.",
  "Thả lỏng hai vai và cử chỉ tay mở giúp bài nói tự nhiên và thuyết phục hơn.",
];

interface AnalyzingPageProps {
  onNav: (view: string) => void;
  onDone?: () => void;
  userRole: UserRole;
}

export default function AnalyzingPage({ onNav, onDone, userRole }: AnalyzingPageProps) {
  const [progress, setProgress] = useState(42);
  const [tipIdx, setTipIdx] = useState(0);

  useEffect(() => {
    const tInterval = window.setInterval(() => {
      setTipIdx((i) => (i + 1) % TIPS.length);
    }, 4500);
    return () => window.clearInterval(tInterval);
  }, []);

  useEffect(() => {
    const pInterval = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          window.clearInterval(pInterval);
          return 100;
        }
        return p + Math.floor(Math.random() * 6 + 2);
      });
    }, 350);
    return () => window.clearInterval(pInterval);
  }, []);

  useEffect(() => {
    if (progress >= 100 && onDone) {
      const id = window.setTimeout(onDone, 800);
      return () => window.clearTimeout(id);
    }
  }, [progress, onDone]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-gray-900 antialiased">
      <Sidebar userRole={userRole} activeItem="analyzing" onNav={onNav} />

      {/* ── MAIN ────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
        <div className="flex flex-col items-center gap-6 max-w-lg w-full">
          {/* Progress Dial */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col items-center gap-4 w-full">
            <CircularProgress pct={Math.min(progress, 100)} />

            <div className="text-center space-y-1">
              <h1 className="text-base font-semibold text-gray-900">
                Đang phân tích đa phương thức...
              </h1>
              <p className="text-xs text-gray-500">
                Mô hình AI đang trích xuất giao tiếp mắt, tốc độ nói và từ đệm
              </p>
            </div>

            {/* Overall Progress Bar */}
            <div className="w-full space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-medium text-gray-500">
                <span>Tiến độ tổng thể</span>
                <span className="font-semibold text-gray-900">{Math.min(progress, 100)}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden w-full">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Step List (Clean White Card) */}
          <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100 overflow-hidden">
            {STEPS.map(({ label, done, active }, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-3 text-xs ${
                  active ? "bg-emerald-50/40" : ""
                }`}
              >
                <StepIcon done={done} active={active} />
                <span
                  className={`flex-1 ${
                    done
                      ? "text-gray-400 line-through"
                      : active
                      ? "text-gray-900 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  {label}
                </span>
                {done && (
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                    Xong
                  </span>
                )}
                {active && (
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                    Đang xử lý
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Clean Tip Box */}
          <div className="w-full bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-start gap-3">
            <span className="text-base">💡</span>
            <div className="space-y-0.5">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Mẹo luyện tập</p>
              <p className="text-xs text-gray-700 leading-relaxed">{TIPS[tipIdx]}</p>
            </div>
          </div>

          {/* Action Button */}
          {onDone && (
            <button
              type="button"
              onClick={onDone}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Xem báo cáo ngay →
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
