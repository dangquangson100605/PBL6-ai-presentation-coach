import { GeminiIcon } from "./components/icons";
import { useState, useEffect, useRef } from "react";
import Sidebar, { UserRole } from "./Sidebar";

/* ── Icons ─────────────────────────────────────────────── */



function IconStop() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="5" y="5" width="12" height="12" rx="2" fill="white" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 8l12-6-6 12-2-4-4-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function IconMic() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="4" y="1" width="4" height="6" rx="2" fill="currentColor" />
      <path d="M2 6a4 4 0 0 0 8 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M6 10v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <ellipse cx="6" cy="6" rx="5" ry="3.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="6" cy="6" r="1.5" fill="currentColor" />
    </svg>
  );
}

function IconPace() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1 9l3-4 3 2 4-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M4 5.5l3 3 3-3" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTextSize() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 12l4-10 4 10M2.5 8.5h5" stroke="#7C3AED" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 7l2.5-3 .5 1.5" stroke="#7C3AED" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 12l3-5 3 5M10.5 10h2" stroke="#7C3AED" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconScroll() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 2v10M4 9l3 3 3-3" stroke="#7C3AED" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Helpers ─────────────────────────────────────────────── */
function useTimer(running: boolean) {
  const [seconds, setSeconds] = useState(75);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return fmt(seconds);
}

const TELEPROMPTER_TEXT = `Kính chào thầy cô và các bạn.

Hôm nay, nhóm chúng em xin trình bày đề án PBL6 — một nền tảng huấn luyện thuyết trình bằng AI được thiết kế để giúp sinh viên cải thiện kỹ năng nói trước công chúng thông qua phản hồi thời gian thực và khách quan.

Vấn đề chúng em nhận thấy rất rõ ràng: phần lớn sinh viên không nhận được phản hồi cụ thể về cách họ thuyết trình. Thầy cô thì bận, và tự đánh giá bản thân rất khó nếu không có dữ liệu có cấu trúc.

Giải pháp của chúng em sử dụng MediaPipe để theo dõi khuôn mặt và cử chỉ cơ thể, cùng với Google Gemini để tạo ra phản hồi ngôn ngữ tự nhiên. Kết hợp lại, chúng cung cấp các chỉ số về giao tiếp mắt, tốc độ nói, từ đệm và độ tự tin tổng thể.

Chúng em tin rằng với việc luyện tập nhất quán và dựa trên dữ liệu, mỗi sinh viên đều có thể bước vào buổi bảo vệ tiếp theo với sự chuẩn bị và tự tin hoàn toàn. Kính mời thầy cô xem demo.`;

interface StudioPageProps {
  onNav: (view: string) => void;
  onAnalyze?: () => void;
  userRole: UserRole;
}

export default function StudioPage({ onNav, onAnalyze, userRole }: StudioPageProps) {
  const [recording, setRecording] = useState(true);
  const [textSize, setTextSize] = useState(14);
  const [scrollSpeed, setScrollSpeed] = useState(2);
  const [context, setContext] = useState("Bảo vệ đề án");
  const timer = useTimer(recording);
  const teleRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-[Inter,sans-serif]">

      <Sidebar userRole={userRole} activeItem="studio" onNav={onNav} />

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top header */}
        <header className="h-14 flex-shrink-0 bg-white border-b border-slate-100 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <h1 className="text-[17px] font-bold text-slate-800 tracking-tight">Studio Ghi hình Trực tiếp</h1>
            {recording && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-red-500 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                LIVE
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-slate-400 font-medium">Phiên #47</span>
            <div className="w-px h-4 bg-slate-200" />
            <span className="text-[12px] text-slate-500 font-medium">
              {new Date().toLocaleDateString("vi-VN", { day: "2-digit", month: "short", year: "numeric" })}
            </span>
          </div>
        </header>

        {/* Body: 70 / 30 split */}
        <div className="flex-1 flex gap-4 p-4 min-h-0">

          {/* ── LEFT: Camera (70%) ──────────────────────── */}
          <div className="flex-[7] min-w-0 flex flex-col gap-3">

            {/* Camera viewport */}
            <div className="relative flex-1 rounded-2xl overflow-hidden bg-slate-900 shadow-xl shadow-slate-900/20 min-h-0">

              {/* Live feed image */}
              <img
                src="https://images.unsplash.com/photo-1758876020207-67890de8aa73?w=1200&h=900&fit=crop&auto=format"
                alt="Live webcam preview — presenter"
                className="w-full h-full object-cover opacity-90"
              />

              {/* Dark vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* AI face tracking box */}
              <div className="absolute top-[12%] left-[38%] w-[24%] h-[52%] pointer-events-none">
                <div className="absolute inset-0 border-2 border-emerald-400/80 rounded-lg">
                  <div className="absolute -top-0.5 -left-0.5 w-4 h-4 border-t-2 border-l-2 border-emerald-400 rounded-tl" />
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 border-t-2 border-r-2 border-emerald-400 rounded-tr" />
                  <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 border-b-2 border-l-2 border-emerald-400 rounded-bl" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 border-b-2 border-r-2 border-emerald-400 rounded-br" />
                </div>
                <div className="absolute -top-6 left-0 bg-emerald-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  AI Theo dõi
                </div>
              </div>

              {/* ── HUD: Top-Left Pills ── */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full">
                  <IconMic /> Mic: Bật
                </span>
                <span className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-[11px] font-semibold px-3 py-1.5 rounded-full">
                  <IconEye /> Giao tiếp mắt: Tốt
                </span>
                <span className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/20 text-slate-200 text-[11px] font-semibold px-3 py-1.5 rounded-full">
                  <IconPace /> Nhịp độ: Nhanh
                </span>
              </div>

              {/* ── HUD: Top-Right Timer ── */}
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse flex-shrink-0" />
                <span className="text-white font-mono text-[15px] font-bold tracking-widest">
                  {timer}
                </span>
                <span className="text-white/40 font-mono text-[13px]">/ 03:00</span>
              </div>

              {/* ── HUD: Bottom Controls ── */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-4">
                {/* Stop/Start button */}
                <button
                  onClick={() => setRecording(!recording)}
                  className={`btn-primary group flex items-center gap-2.5 ${recording ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/30" : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30"} text-white font-semibold text-[13px] pl-3 pr-5 py-2.5 rounded-full shadow-lg transition-all`}
                >
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                    <IconStop />
                  </div>
                  {recording ? "Dừng ghi hình" : "Bắt đầu ghi hình"}
                </button>

                {/* Send for analysis */}
                <button
                  onClick={onAnalyze}
                  className="btn-secondary flex items-center gap-2 backdrop-blur-md border border-white/80 bg-white text-slate-800 hover:bg-slate-50 shadow-lg font-semibold text-[13px] px-5 py-3 rounded-full transition-all"
                >
                  <IconSend /> Gửi để phân tích
                </button>
              </div>

              {/* Audio waveform strip */}
              <div className="absolute bottom-0 left-0 right-0 h-10 flex items-center justify-center gap-0.5 px-8 pointer-events-none">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-emerald-400/50 rounded-full"
                    style={{ height: `${4 + Math.abs(Math.sin(i * 0.6 + Date.now() * 0.001)) * 20}px` }}
                  />
                ))}
              </div>
            </div>

            {/* Realtime metrics strip below camera (Standardized Clean White Cards) */}
            <div className="flex gap-3">
              {[
                { label: "Giao tiếp mắt", value: 85, unit: "%" },
                { label: "Tốc độ nói", value: 158, unit: " WPM" },
                { label: "Độ tự tin", value: 72, unit: "%" },
                { label: "Từ đệm", value: 3, unit: " từ" },
              ].map(({ label, value, unit }) => (
                <div key={label} className="flex-1 bg-white border border-slate-200/80 rounded-xl px-4 py-3 shadow-sm">
                  <p className="text-[11px] text-slate-500 font-medium mb-1">{label}</p>
                  <p className="text-[20px] font-bold text-slate-900 leading-none">
                    {value}<span className="text-[12px] font-semibold text-slate-500 ml-0.5">{unit}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Teleprompter (30%) ───────────────── */}
          <div className="flex-[3] min-w-0 flex flex-col gap-3">

            {/* Presentation Context */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-4 space-y-2">
              <label className="block text-[12px] font-semibold text-slate-500 uppercase tracking-wider">
                Ngữ cảnh thuyết trình
              </label>
              <div className="relative">
                <select
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-[13.5px] font-medium rounded-xl px-4 py-2.5 pr-9 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all cursor-pointer"
                >
                  <option>Bảo vệ đề án</option>
                  <option>Phỏng vấn việc làm</option>
                  <option>Hội thảo</option>
                  <option>Thuyết trình lớp học</option>
                  <option>Thuyết phục khách hàng</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <IconChevron />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[11px] text-slate-400">Chế độ AI coaching đang hoạt động theo ngữ cảnh</span>
              </div>
            </div>

            {/* Teleprompter */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-4 flex flex-col flex-1 min-h-0 gap-3">
              <div className="flex items-center justify-between">
                <label className="block text-[12px] font-semibold text-slate-500 uppercase tracking-wider">
                  Máy nhắc chữ
                </label>
                <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Đang cuộn
                </span>
              </div>

              {/* Text area */}
              <div className="flex-1 relative min-h-0">
                <div
                  className="absolute inset-0 rounded-xl bg-slate-900 overflow-hidden"
                  style={{ boxShadow: "inset 0 2px 12px rgba(0,0,0,0.3)" }}
                >
                  {/* Top fade */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-slate-900 to-transparent z-10 pointer-events-none" />
                  {/* Bottom fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900 to-transparent z-10 pointer-events-none" />
                  {/* Center highlight line */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-8 bg-emerald-500/10 border-y border-emerald-400/20 z-10 pointer-events-none" />
                  <textarea
                    ref={teleRef}
                    defaultValue={TELEPROMPTER_TEXT}
                    className="absolute inset-0 w-full h-full bg-transparent text-slate-100 resize-none outline-none px-4 py-6 leading-relaxed scrollbar-hide"
                    style={{ fontSize: textSize, lineHeight: 1.8 }}
                    spellCheck={false}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-3 pt-1 border-t border-slate-100">
                {/* Text Size */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 w-24 flex-shrink-0">
                    <IconTextSize />
                    <span className="text-[11.5px] font-semibold text-slate-600">Cỡ chữ</span>
                  </div>
                  <input
                    type="range"
                    min={11}
                    max={22}
                    value={textSize}
                    onChange={(e) => setTextSize(Number(e.target.value))}
                    className="flex-1 accent-emerald-600 h-1.5 cursor-pointer"
                  />
                  <span className="text-[11px] font-mono font-semibold text-emerald-700 w-7 text-right">{textSize}px</span>
                </div>

                {/* Scroll Speed */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 w-24 flex-shrink-0">
                    <IconScroll />
                    <span className="text-[11.5px] font-semibold text-slate-600">Tốc độ cuộn</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={scrollSpeed}
                    onChange={(e) => setScrollSpeed(Number(e.target.value))}
                    className="flex-1 accent-emerald-600 h-1.5 cursor-pointer"
                  />
                  <span className="text-[11px] font-mono font-semibold text-emerald-700 w-7 text-right">{scrollSpeed}x</span>
                </div>

                {/* Speed labels */}
                <div className="flex justify-between px-[calc(24px+0.75rem)]">
                  {["Chậm", "", "Bình thường", "", "Nhanh"].map((l, i) => (
                    <span key={i} className="text-[10px] text-slate-400">{l}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
