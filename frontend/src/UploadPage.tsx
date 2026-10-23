import { GeminiIcon } from "./components/icons";
import { useState, useRef, useCallback } from "react";
import Sidebar, { UserRole } from "./Sidebar";

/* ── Icons ─────────────────────────────────────────────── */



type UploadState = "idle" | "selected" | "uploading" | "done";

interface FileInfo {
  name: string;
  size: string;
  duration?: string;
}

const MOCK_FILE: FileInfo = {
  name: "bai_thuyet_trinh_pbl6.mp4",
  size: "45 MB",
  duration: "04:32",
};

const UPLOAD_TIPS = [
  "Quay trong không gian đủ sáng, hướng mặt vào camera để phân tích giao tiếp mắt tốt nhất.",
  "Dùng phòng yên tĩnh để cải thiện độ chính xác khi phát hiện tốc độ nói và từ đệm.",
  "Nói với tốc độ tự nhiên — AI sẽ cảnh báo nếu vượt quá 160 WPM.",
  "Nền đơn giản giúp MediaPipe theo dõi ngôn ngữ cơ thể chính xác hơn.",
];

interface UploadPageProps {
  onNav: (view: string) => void;
  onAnalyze: () => void;
  userRole: UserRole;
}

export default function UploadPage({ onNav, onAnalyze, userRole }: UploadPageProps) {
  const [state, setState] = useState<UploadState>("selected");
  const [dragging, setDragging] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);
  const [file, setFile] = useState<FileInfo>(MOCK_FILE);
  const [context, setContext] = useState("Bảo vệ đề án");
  const inputRef = useRef<HTMLInputElement>(null);

  /* Drag handlers */
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);
  const onDragLeave = useCallback(() => setDragging(false), []);
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) {
      setFile({ name: f.name, size: `${(f.size / 1024 / 1024).toFixed(1)} MB` });
      setState("selected");
    }
  }, []);

  /* Simulate upload */
  function handleSend() {
    setState("uploading");
    setUploadPct(0);
    let pct = 0;
    const id = setInterval(() => {
      pct += Math.floor(Math.random() * 8 + 4);
      if (pct >= 100) {
        pct = 100;
        clearInterval(id);
        setState("done");
        setTimeout(() => onAnalyze(), 800);
      }
      setUploadPct(pct);
    }, 180);
  }

  function handleRemove() {
    setState("idle");
    setUploadPct(0);
  }

  const isUploading = state === "uploading";
  const isDone = state === "done";

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>

      <Sidebar userRole={userRole} activeItem="upload" onNav={onNav} />

      {/* ── MAIN ────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* Page header */}
        <div className="bg-white border-b border-slate-100 px-10 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[24px] font-bold text-slate-900 tracking-tight leading-none">
                Tải lên video thuyết trình
              </h1>
              <p className="text-[14px] text-slate-400 mt-2 leading-relaxed">
                Tải lên video đã quay để AI phân tích đa phương thức.
              </p>
            </div>
            {/* Step indicator */}
            <div className="hidden sm:flex items-center gap-2">
              {[
                { n: 1, label: "Tải lên",   done: state !== "idle" },
                { n: 2, label: "Phân tích", done: false },
                { n: 3, label: "Báo cáo",   done: false },
              ].map(({ n, label, done }, i) => (
                <div key={n} className="flex items-center gap-2">
                  <div className={`flex flex-col items-center gap-0.5`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-all ${
                      done ? "bg-violet-700 border-violet-700 text-white" : n === 1 && state !== "idle" ? "bg-violet-700 border-violet-700 text-white" : "border-slate-200 text-slate-400 bg-white"
                    }`}>
                      {done || (n === 1 && state !== "idle") ? (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      ) : n}
                    </div>
                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
                  </div>
                  {i < 2 && <div className="w-8 h-px bg-slate-200 mb-3" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-start justify-center px-10 py-8">
          <div className="w-full max-w-2xl space-y-4">

            {/* ── Presentation context selector ── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-4 flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1C7 4.314 4.314 7 1 7c3.314 0 6 2.686 6 6 0-3.314 2.686-6 6-6-3.314 0-6-2.686-6-6z" fill="#7C3AED" /></svg>
              </div>
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Ngữ cảnh thuyết trình
                </label>
                <div className="relative">
                  <select
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-[13.5px] font-medium rounded-xl px-4 py-2 pr-9 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all cursor-pointer"
                  >
                    <option>Bảo vệ đề án</option>
                    <option>Phỏng vấn việc làm</option>
                    <option>Hội thảo</option>
                    <option>Thuyết trình lớp học</option>
                    <option>Thuyết phục khách hàng</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 5.5l3 3 3-3" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 max-w-[160px] leading-relaxed hidden sm:block">
                Giúp AI điều chỉnh phản hồi huấn luyện phù hợp với ngữ cảnh của bạn.
              </p>
            </div>

            {/* ── Drop zone ── */}
            <input ref={inputRef} type="file" accept=".mp4,.webm" className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setFile({ name: f.name, size: `${(f.size / 1024 / 1024).toFixed(1)} MB` });
                  setState("selected");
                }
              }}
            />

            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => state === "idle" && inputRef.current?.click()}
              className="relative rounded-2xl transition-all overflow-hidden"
              style={{
                border: `2px dashed ${dragging ? "#7C3AED" : state !== "idle" ? "#A78BFA" : "#C4B5FD"}`,
                background: dragging ? "rgba(124,58,237,0.07)" : state !== "idle" ? "rgba(124,58,237,0.03)" : "rgba(237,233,254,0.35)",
                cursor: state === "idle" ? "pointer" : "default",
                boxShadow: dragging ? "0 0 0 4px rgba(124,58,237,0.12)" : "none",
              }}
            >
              {/* Decorative corner accents */}
              {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-4 h-4 pointer-events-none`}>
                  <div className={`absolute w-3 h-0.5 bg-violet-400 ${i % 2 === 0 ? "left-0" : "right-0"}`} />
                  <div className={`absolute h-3 w-0.5 bg-violet-400 ${i < 2 ? "top-0" : "bottom-0"} ${i % 2 === 0 ? "left-0" : "right-0"}`} />
                </div>
              ))}

              <div className="flex flex-col items-center justify-center text-center px-8 py-14 gap-4">

                {/* Cloud icon */}
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all ${dragging ? "scale-110" : ""}`}
                  style={{ background: "linear-gradient(135deg,#EDE9FE,#DDD6FE)" }}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M30 28H10a7 7 0 0 1-1.5-13.84 10 10 0 0 1 19.5 2.34A5.5 5.5 0 0 1 30 28z"
                      fill="white" stroke="#7C3AED" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M20 22v-8M16 17l4-4 4 4" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[16px] font-bold text-slate-700">
                    {dragging ? "Thả file video vào đây" : "Kéo thả video vào đây, hoặc "}
                    {!dragging && (
                      <button
                        onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                        className="text-violet-700 underline underline-offset-2 hover:text-violet-900 transition-colors"
                      >
                        chọn file
                      </button>
                    )}
                  </p>
                  <p className="text-[13px] text-slate-400">
                    Định dạng hỗ trợ: <span className="font-semibold text-slate-500">.mp4, .webm</span> · Dung lượng tối đa: <span className="font-semibold text-slate-500">100 MB</span>
                  </p>
                </div>

                {/* Format badges */}
                <div className="flex items-center gap-2 mt-1">
                  {["MP4", "WEBM"].map((f) => (
                    <span key={f} className="text-[10px] font-bold text-violet-600 bg-white border border-violet-200 px-2.5 py-1 rounded-full">
                      {f}
                    </span>
                  ))}
                  <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-full">
                    max 100 MB
                  </span>
                </div>
              </div>
            </div>

            {/* ── File selected card ── */}
            {(state === "selected" || isUploading || isDone) && (
              <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${isDone ? "border-emerald-200" : "border-slate-200"}`}>

                <div className="flex items-center gap-4 px-5 py-4">
                  {/* Video thumbnail placeholder */}
                  <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center flex-shrink-0 border border-violet-200">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="1.5" y="3.5" width="13" height="13" rx="2" stroke="#7C3AED" strokeWidth="1.4" />
                      <path d="M14.5 8l4-2v8l-4-2V8z" stroke="#7C3AED" strokeWidth="1.4" strokeLinejoin="round" />
                      <path d="M6 8.5l4 2-4 2V8.5z" fill="#7C3AED" />
                    </svg>
                  </div>

                  {/* File info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-semibold text-slate-800 truncate font-mono">{file.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[11.5px] text-slate-400">{file.size}</span>
                      {file.duration && <><span className="text-slate-200">·</span><span className="text-[11.5px] text-slate-400">{file.duration}</span></>}
                      <span className="text-slate-200">·</span>
                      <span className="text-[11px] font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200">MP4</span>
                    </div>
                  </div>

                  {/* Status icon */}
                  <div className="flex-shrink-0">
                    {isDone ? (
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    ) : isUploading ? (
                      <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" className="animate-spin" fill="none">
                          <circle cx="8" cy="8" r="6" stroke="#DDD6FE" strokeWidth="2.5" />
                          <path d="M8 2a6 6 0 0 1 6 6" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    )}
                  </div>

                  {/* Remove button */}
                  {state === "selected" && (
                    <button
                      onClick={handleRemove}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </button>
                  )}
                </div>

                {/* Upload progress bar */}
                {(isUploading || isDone) && (
                  <div className="px-5 pb-4 space-y-1.5">
                    <div className="flex justify-between text-[11px] font-medium">
                      <span className={isDone ? "text-emerald-600 font-semibold" : "text-violet-600 font-semibold"}>
                        {isDone ? "Tải lên hoàn tất!" : `Đang tải lên… ${uploadPct}%`}
                      </span>
                      <span className="text-slate-400 font-mono">{uploadPct}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${uploadPct}%`,
                          transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          background: isDone
                            ? "linear-gradient(90deg,#34D399,#10B981)"
                            : "linear-gradient(90deg,#A78BFA,#7C3AED)",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Action button ── */}
            {state === "selected" && (
              <button
                onClick={onAnalyze}
                className="btn-primary w-full bg-violet-700 hover:bg-violet-800 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-violet-200 text-[15px] tracking-wide flex items-center justify-center gap-2.5"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M1.5 9l15-7-7 15-2-5-6-3z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                Gửi để phân tích
              </button>
            )}

            {isDone && (
              <div className="toast-enter flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-emerald-800">Đang chuyển đến phân tích AI…</p>
                  <p className="text-[11.5px] text-emerald-600">Video của bạn đã được đưa vào hàng đợi xử lý.</p>
                </div>
                <div className="ml-auto">
                  <svg width="18" height="18" viewBox="0 0 18 18" className="animate-spin text-emerald-400" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.3" /><path d="M9 2a7 7 0 0 1 7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
                </div>
              </div>
            )}

            {/* ── Tips strip ── */}
            <div className="grid grid-cols-2 gap-3">
              {UPLOAD_TIPS.map((tip, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-100 px-4 py-3.5 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1C6 3.761 3.761 6 1 6c2.761 0 5 2.239 5 5 0-2.761 2.239-5 5-5-2.761 0-5-2.239-5-5z" fill="#7C3AED" /></svg>
                  </div>
                  <p className="text-[12px] text-slate-500 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
