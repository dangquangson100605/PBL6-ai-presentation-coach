import { useState } from "react";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import StudioPage from "./StudioPage";
import AnalyzingPage from "./AnalyzingPage";
import ReportPage from "./ReportPage";
import HistoryPage from "./HistoryPage";
import AdminPage from "./AdminPage";
import UploadPage from "./UploadPage";
import SettingsPage from "./SettingsPage";
import UsersPage from "./UsersPage";
import AdminSettingsPage from "./AdminSettingsPage";

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#7C3AED" fillOpacity="0.12" />
      <path d="M5 8l2 2 4-4" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon({ color = "#7C3AED" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <ellipse cx="9" cy="9" rx="7" ry="4.5" stroke={color} strokeWidth="1.5" />
      <circle cx="9" cy="9" r="2" fill={color} />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="6.5" y="2" width="5" height="8" rx="2.5" stroke="#7C3AED" strokeWidth="1.5" />
      <path d="M3.5 9A5.5 5.5 0 0 0 14.5 9" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 14.5v2" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon({ color = "#22C55E" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill={color} fillOpacity="0.15" />
      <path d="M8 4l1.2 2.5L12 7l-2 1.9.5 2.6L8 10.2 5.5 11.5l.5-2.6L4 7l2.8-.5L8 4z" fill={color} />
    </svg>
  );
}

function WarnIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#F97316" fillOpacity="0.15" />
      <path d="M8 5v4" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.75" fill="#F97316" />
    </svg>
  );
}

function GeminiIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2C8 5.31371 5.31371 8 2 8C5.31371 8 8 10.6863 8 14C8 10.6863 10.6863 8 14 8C10.6863 8 8 5.31371 8 2Z" fill="#7C3AED" />
    </svg>
  );
}

function ProgressBar({ label, value, max = 100, unit = "%" }: { label: string; value: number; max?: number; unit?: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[11px] font-medium text-slate-600">{label}</span>
        <span className="text-[11px] font-semibold text-slate-800">{value}{unit}</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-600 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

const NAV_LINKS = ["Tính năng", "Cách hoạt động", "Cho Đại học", "Giới thiệu", "Admin"];

const UNIVERSITY_LOGOS = [
  { name: "MIT", abbr: "MIT" },
  { name: "Stanford University", abbr: "Stanford" },
  { name: "Harvard University", abbr: "Harvard" },
  { name: "UC Berkeley", abbr: "Berkeley" },
  { name: "Carnegie Mellon", abbr: "CMU" },
  { name: "Oxford University", abbr: "Oxford" },
];

export default function App() {
  type View = "landing" | "login" | "signup" | "studio" | "upload" | "analyzing" | "report" | "history" | "admin" | "settings" | "users" | "admin-settings";
  type UserRole = "student" | "admin" | null;
  const [view, setView] = useState<View>("landing");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);

  const navigate = (destination: string) => {
    if (destination === "config" || destination === "logs") {
      if (userRole !== "admin") return;
      setView("admin");
      return;
    }
    if (destination === "users") {
      if (userRole !== "admin") return;
      setView("users");
      return;
    }
    if (destination === "settings" && userRole === "admin") {
      setView("admin-settings");
      return;
    }
    const destinations: Record<string, View> = {
      dashboard: "report",
      studio: "studio",
      upload: "upload",
      history: "history",
      settings: "settings",
      config: "admin",
    };
    setView(destinations[destination] ?? (destination as View));
  };

  const loginAsStudent = () => {
    setIsAuthenticated(true);
    setUserRole("student");
    setView("studio");
  };

  const loginAsAdmin = () => {
    setIsAuthenticated(true);
    setUserRole("admin");
    setView("admin");
  };

  if (view === "login") {
    return <LoginPage onBack={() => setView("landing")} onSignUp={() => setView("signup")} onLoginAsStudent={loginAsStudent} onLoginAsAdmin={loginAsAdmin} />;
  }
  if (view === "signup") {
    return <SignUpPage onBack={() => setView("landing")} onLogin={() => setView("login")} onSignUp={() => { setIsAuthenticated(true); setUserRole("student"); setView("studio"); }} />;
  }
  if (view === "studio") {
    if (!isAuthenticated) { setView("login"); return null; }
    return <StudioPage onNav={navigate} onAnalyze={() => setView("analyzing")} userRole={userRole as "student" | "admin"} />;
  }
  if (view === "analyzing") {
    if (!isAuthenticated) { setView("login"); return null; }
    return <AnalyzingPage onNav={navigate} onDone={() => setView("report")} userRole={userRole as "student" | "admin"} />;
  }
  if (view === "report") {
    if (!isAuthenticated) { setView("login"); return null; }
    return <ReportPage onNav={navigate} userRole={userRole as "student" | "admin"} />;
  }
  if (view === "history") {
    if (!isAuthenticated) { setView("login"); return null; }
    return <HistoryPage onNav={navigate} onViewReport={() => setView("report")} userRole={userRole as "student" | "admin"} />;
  }
  if (view === "upload") {
    if (!isAuthenticated) { setView("login"); return null; }
    return <UploadPage onNav={navigate} onAnalyze={() => setView("analyzing")} userRole={userRole as "student" | "admin"} />;
  }
  if (view === "admin") {
    if (userRole !== "admin") { setView("login"); return null; }
    return <AdminPage onNav={navigate} userRole="admin" />;
  }
  if (view === "users") {
    if (userRole !== "admin") { setView("login"); return null; }
    return <UsersPage onNav={navigate} />;
  }
  if (view === "admin-settings") {
    if (userRole !== "admin") { setView("login"); return null; }
    return <AdminSettingsPage onNav={navigate} onLogout={() => { setIsAuthenticated(false); setUserRole(null); setView("landing"); }} />;
  }
  if (view === "settings") {
    if (!isAuthenticated) { setView("login"); return null; }
    return <SettingsPage onNav={navigate} userRole={userRole as "student" | "admin"} />;
  }

  return (
    <div className="min-h-full bg-white overflow-x-hidden">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-violet-700 flex items-center justify-center shadow-sm">
                <GeminiIcon />
              </div>
              <span className="text-[15px] font-bold text-slate-900 tracking-tight">AI Coach</span>
            </div>

            {/* Center Links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => link === "Admin" && setView("admin")}
                  className="text-[13.5px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>

            {/* Right CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button onClick={() => setView("login")} className="text-[13.5px] font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Đăng nhập
              </button>
              <button
                onClick={() => setView("signup")}
                className="inline-flex items-center gap-1.5 bg-violet-700 hover:bg-violet-800 text-white text-[13.5px] font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm shadow-violet-200"
              >
                Dùng thử miễn phí
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-md text-slate-500 hover:text-slate-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="block text-sm font-medium text-slate-600 hover:text-slate-900">
                {link}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <button onClick={() => setView("login")} className="text-sm font-medium text-slate-600">Đăng nhập</button>
              <button onClick={() => setView("signup")} className="bg-violet-700 text-white text-sm font-semibold px-4 py-2 rounded-lg">Dùng thử miễn phí</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">

        {/* Global ambient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-violet-100 opacity-40 blur-3xl" />
          <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] rounded-full bg-purple-100 opacity-30 blur-3xl" />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: Text */}
          <div className="flex flex-col gap-7">
            {/* Pill badge */}
            <div className="inline-flex self-start items-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              Phân tích Thuyết trình bằng AI
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-slate-900 leading-[1.1] tracking-tight">
                Thành thạo{" "}
                <span className="text-violet-700">Kỹ năng Thuyết trình</span>{" "}
                với{" "}
                AI Đa phương thức
              </h1>

              <p className="text-[17px] text-slate-500 leading-relaxed max-w-[480px]">
                Nhận phản hồi tức thì, khách quan về giao tiếp mắt, tốc độ nói (WPM) và ngôn ngữ cơ thể. Hoàn hảo cho sinh viên bảo vệ đề án và phỏng vấn việc làm.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => isAuthenticated ? setView("studio") : setView("login")}
                className="btn-primary inline-flex items-center gap-2 bg-violet-700 hover:bg-violet-800 text-white font-semibold px-6 py-3 rounded-xl shadow-md shadow-violet-200"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4z" stroke="white" strokeWidth="1.5" />
                  <circle cx="8" cy="8" r="2" fill="white" />
                </svg>
                Vào Studio
              </button>
              <button
                onClick={() => isAuthenticated ? setView("upload") : setView("login")}
                className="btn-secondary inline-flex items-center gap-2 border-2 border-slate-200 hover:border-violet-300 text-slate-700 hover:text-violet-700 font-semibold px-6 py-3 rounded-xl"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 10V2M5 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Tải Video Lên
              </button>
            </div>

            {/* Trust badge */}
            <div className="inline-flex self-start items-center gap-2 text-[13px] text-slate-500">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5">
                <CheckIcon />
                <span className="font-medium">Hỗ trợ bởi</span>
                <span className="font-semibold text-slate-700">MediaPipe</span>
                <span className="text-slate-300">&amp;</span>
                <span className="font-semibold text-violet-700">Google Gemini</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Visual hero */}
          <div className="relative flex items-center justify-center min-h-[500px]">

            {/* Gradient blob behind image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[420px] h-[420px] rounded-full bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-50 blur-2xl opacity-80" />
            </div>

            {/* Camera frame / image */}
            <div className="relative z-10 w-[320px] sm:w-[360px] rounded-3xl overflow-hidden shadow-2xl shadow-violet-200/60 border-4 border-white">
              {/* Webcam top bar */}
              <div className="bg-slate-900 flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  LIVE
                </div>
              </div>

              <div className="relative bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1758598304200-f89a1d8ebedb?w=480&h=400&fit=crop&auto=format"
                  alt="Sinh viên thuyết trình trước webcam"
                  className="w-full h-[300px] object-cover object-top"
                />

                {/* Face tracking overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* AI bounding box */}
                  <div className="absolute top-[12%] left-[30%] w-[40%] h-[55%] border-2 border-blue-400 rounded-lg opacity-70">
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-blue-400" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-blue-400" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-blue-400" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-blue-400" />
                  </div>
                  {/* AI label */}
                  <div className="absolute top-[9%] left-[30%] bg-violet-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    AI Theo dõi
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent px-4 py-3">
                  <p className="text-white text-[11px] font-medium">Phiên đang diễn ra · 4:23</p>
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="w-1 bg-violet-400 rounded-full" style={{ height: `${8 + Math.random() * 12}px` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card 1: Metrics */}
            <div className="absolute top-4 right-0 sm:-right-4 z-20 w-[200px] bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-md bg-violet-50 flex items-center justify-center">
                  <EyeIcon />
                </div>
                <span className="text-[12px] font-bold text-slate-800 uppercase tracking-wide">Chỉ số</span>
              </div>
              <ProgressBar label="Giao tiếp mắt" value={85} />
              <ProgressBar label="Tốc độ nói" value={145} max={200} unit=" WPM" />
              <div className="flex items-center gap-1.5 pt-1 border-t border-slate-50">
                <MicIcon />
                <span className="text-[10px] text-slate-500 font-medium">Độ tự tin: <strong className="text-slate-700">Cao</strong></span>
              </div>
            </div>

            {/* Floating Card 2: Strength */}
            <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-8 z-20 w-[220px] bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 p-4">
              <div className="flex items-start gap-2.5">
                <StarIcon />
                <div>
                  <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-0.5">Điểm mạnh</p>
                  <p className="text-[12px] text-slate-600 leading-relaxed">
                    Giao tiếp mắt tốt trong suốt buổi thuyết trình.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Card 3: Growth area */}
            <div className="absolute bottom-4 right-0 sm:-right-4 z-20 w-[220px] bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 p-4">
              <div className="flex items-start gap-2.5">
                <WarnIcon />
                <div>
                  <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-0.5">Cần cải thiện</p>
                  <p className="text-[12px] text-slate-600 leading-relaxed">
                    Bạn dùng 8 từ đệm ("ừm", "à"). Hãy thử dừng lại thay vì nói từ đệm.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="border-t border-slate-100 bg-slate-50/60 py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[13px] font-medium text-slate-400 uppercase tracking-widest mb-10">
            Được tin dùng bởi các trường đại học và nhà giáo dục hàng đầu thế giới
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {UNIVERSITY_LOGOS.map(({ name, abbr }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-1 opacity-50 hover:opacity-80 transition-opacity cursor-default"
                title={name}
              >
                <div className="h-8 flex items-center">
                  <span className="text-[15px] font-bold text-slate-500 tracking-tight">{abbr}</span>
                </div>
                <div className="h-px w-8 bg-slate-300" />
                <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider whitespace-nowrap">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
