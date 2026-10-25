import { useState, useRef, useCallback } from "react";
import Sidebar, { UserRole } from "./Sidebar";
import { GeminiIcon } from "./components/icons";

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
  "Dùng phòng yên tĩnh để cải thiện độ chính xác khi phân tích âm lượng và từ đệm.",
  "Nói với tốc độ tự nhiên — AI sẽ đưa ra khuyến nghị nếu tốc độ vượt quá 160 WPM.",
  "Nền phía sau đơn giản giúp MediaPipe theo dõi cử chỉ ngôn ngữ cơ thể chính xác hơn.",
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
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-gray-900 antialiased">
      <Sidebar userRole={userRole} activeItem="upload" onNav={onNav} />

      {/* ── MAIN ────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight leading-none">
              Tải lên video thuyết trình
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Tải video đã quay để hệ thống AI phân tích đa phương thức
            </p>
          </div>

          {/* Clean Step Indicator */}
          <div className="hidden sm:flex items-center gap-3">
            {[
              { n: 1, label: "Tải lên", done: state !== "idle" },
              { n: 2, label: "Phân tích", done: isDone },
              { n: 3, label: "Báo cáo", done: false },
            ].map(({ n, label, done }, i) => (
              <div key={n} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                      done
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-100 text-gray-500 border border-gray-200"
                    }`}
                  >
                    {done ? "✓" : n}
                  </div>
                  <span className={`text-xs font-medium ${done ? "text-gray-900" : "text-gray-400"}`}>
                    {label}
                  </span>
                </div>
                {i < 2 && <div className="w-6 h-px bg-gray-200" />}
              </div>
            ))}
          </div>
        </header>

        <div className="flex-1 flex items-start justify-center p-8">
          <div className="w-full max-w-2xl space-y-4">
            {/* Context Selector Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600">
                <GeminiIcon size={16} />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Ngữ cảnh thuyết trình
                </label>
                <select
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs font-medium rounded-lg px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors cursor-pointer"
                >
                  <option>Bảo vệ đề án</option>
                  <option>Phỏng vấn việc làm</option>
                  <option>Hội thảo</option>
                  <option>Thuyết trình lớp học</option>
                  <option>Thuyết phục khách hàng</option>
                </select>
              </div>
              <p className="text-xs text-gray-500 max-w-[180px] leading-relaxed hidden sm:block">
                AI sẽ căn chỉnh bộ tiêu chí đánh giá phù hợp với bối cảnh này.
              </p>
            </div>

            {/* Drop Zone Input */}
            <input
              ref={inputRef}
              type="file"
              accept=".mp4,.webm"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setFile({ name: f.name, size: `${(f.size / 1024 / 1024).toFixed(1)} MB` });
                  setState("selected");
                }
              }}
            />

            {/* Clean Drop Zone Card */}
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => state === "idle" && inputRef.current?.click()}
              className={`rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                dragging
                  ? "border-emerald-500 bg-emerald-50/40"
                  : state !== "idle"
                  ? "border-gray-300 bg-white"
                  : "border-gray-300 bg-gray-50/60 hover:bg-gray-50 hover:border-gray-400 cursor-pointer"
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 16a4 4 0 0 1-.88-7.903A5 5 0 1 1 15.9 6L16 6a5 5 0 0 1 1 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-800">
                    {dragging ? "Thả file video vào đây" : "Kéo thả video vào đây, hoặc "}
                    {!dragging && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          inputRef.current?.click();
                        }}
                        className="text-emerald-600 font-semibold hover:underline"
                      >
                        chọn tệp từ máy
                      </button>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    Định dạng hỗ trợ: MP4, WebM · Tối đa 100 MB
                  </p>
                </div>
              </div>
            </div>

            {/* File Selected Card */}
            {(state === "selected" || isUploading || isDone) && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="4" width="15" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M17 9.5l5-3v11l-5-3v-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate font-mono">{file.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                      <span>{file.size}</span>
                      {file.duration && (
                        <>
                          <span>·</span>
                          <span>{file.duration}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {state === "selected" && (
                    <button
                      type="button"
                      onClick={handleRemove}
                      className="p-1 rounded-md text-gray-400 hover:text-rose-600 hover:bg-gray-100 transition-colors"
                      title="Xóa tệp"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Upload Progress */}
                {(isUploading || isDone) && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className={isDone ? "text-emerald-700 font-semibold" : "text-gray-700"}>
                        {isDone ? "Tải lên hoàn tất!" : `Đang tải lên... ${uploadPct}%`}
                      </span>
                      <span className="text-gray-400 font-mono">{uploadPct}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-200"
                        style={{ width: `${uploadPct}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            {state === "selected" && (
              <button
                type="button"
                onClick={handleSend}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm py-2.5 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                Gửi để phân tích
              </button>
            )}

            {isDone && (
              <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200/60 rounded-xl p-3.5 text-xs text-emerald-800 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Đang chuyển đến phân tích AI đa phương thức...
              </div>
            )}

            {/* Clean Tips Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {UPLOAD_TIPS.map((tip, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-3.5 flex items-start gap-2.5 shadow-sm">
                  <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                    ✓
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
