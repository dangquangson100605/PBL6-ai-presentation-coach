import { useState } from "react";
import { GeminiIcon } from "../components/icons";

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

interface LandingPageProps {
  onLogin: () => void;
  onSignUp: () => void;
  onAdmin: () => void;
}

export default function LandingPage({ onLogin, onSignUp, onAdmin }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                  onClick={() => link === "Admin" && onAdmin()}
                  className="text-[13.5px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>

            {/* Right CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button onClick={onLogin} className="text-[13.5px] font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Đăng nhập
              </button>
              <button
                onClick={onSignUp}
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
              <button onClick={onLogin} className="text-sm font-medium text-slate-600 w-full text-left py-1">
                Đăng nhập
              </button>
              <button
                onClick={onSignUp}
                className="bg-violet-700 text-white text-xs font-semibold px-3 py-2 rounded-lg w-full text-center"
              >
                Dùng thử
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-full px-3.5 py-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
                <span className="text-[12px] font-semibold text-violet-700">Công nghệ AI Multimodal thế hệ mới</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-900 leading-[1.12] tracking-tight">
                Làm chủ kỹ năng thuyết trình với{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-indigo-600">
                  AI Huấn luyện viên
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Phân tích video và giọng nói của bạn theo thời gian thực. Đánh giá ánh mắt, cử chỉ, tốc độ nói và từ đệm với độ chính xác cao dựa trên AI.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onSignUp}
                  className="inline-flex items-center justify-center gap-2 bg-violet-700 hover:bg-violet-800 text-white text-[14.5px] font-semibold px-6 py-3 rounded-xl transition-colors shadow-md shadow-violet-200"
                >
                  Bắt đầu luyện tập ngay
                  <ArrowRight />
                </button>
                <button
                  onClick={onLogin}
                  className="inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[14.5px] font-semibold px-6 py-3 rounded-xl border border-slate-200 transition-colors"
                >
                  Xem demo sản phẩm
                </button>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-[12.5px] font-medium text-slate-600">Phân tích webcam trực tiếp</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-[12.5px] font-medium text-slate-600">Hỗ trợ tải video MP4</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-[12.5px] font-medium text-slate-600">Báo cáo đa chiều chi tiết</span>
                </div>
              </div>
            </div>

            {/* Right Card Mockup */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-200 to-indigo-100 rounded-3xl blur-2xl opacity-60 -z-10" />

                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 space-y-5">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-700">
                        <GeminiIcon />
                      </div>
                      <div>
                        <h2 className="text-[14px] font-bold text-slate-900 leading-none">Báo cáo phân tích gần nhất</h2>
                        <span className="text-[11px] text-slate-400">Luyện tập bảo vệ đề tài PBL6</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-50 text-green-700 border border-green-200">
                      85/100 Điểm
                    </span>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 space-y-1">
                      <div className="flex items-center gap-1.5 text-violet-700">
                        <EyeIcon />
                        <span className="text-[11px] font-semibold">Giao tiếp mắt</span>
                      </div>
                      <p className="text-[18px] font-bold text-slate-900">88%</p>
                      <span className="text-[10px] text-green-600 font-medium">+12% so với lần trước</span>
                    </div>

                    <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 space-y-1">
                      <div className="flex items-center gap-1.5 text-violet-700">
                        <MicIcon />
                        <span className="text-[11px] font-semibold">Tốc độ nói</span>
                      </div>
                      <p className="text-[18px] font-bold text-slate-900">175 WPM</p>
                      <span className="text-[10px] text-slate-500 font-medium">Khoảng lý tưởng</span>
                    </div>
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-3 pt-1">
                    <ProgressBar label="Ngôn ngữ cơ thể & Cử chỉ" value={78} />
                    <ProgressBar label="Âm lượng & Biểu cảm giọng nói" value={82} />
                    <ProgressBar label="Từ đệm (à, ừm, thì, là)" value={90} />
                  </div>

                  {/* AI Feedback */}
                  <div className="bg-violet-50/60 rounded-xl p-3.5 border border-violet-100 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-violet-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <GeminiIcon size={12} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[12px] font-bold text-violet-950">Nhận xét từ AI Coach</p>
                      <p className="text-[11.5px] text-violet-800 leading-relaxed">
                        Bạn duy trì giao tiếp mắt rất tốt. Nên giảm tốc độ ở phần giải thích kiến trúc hệ thống để người nghe dễ theo dõi hơn.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University Logos */}
      <section className="py-12 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Nghiên cứu & phát triển dựa trên chuẩn đánh giá thuyết trình quốc tế
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all">
            {UNIVERSITY_LOGOS.map((uni) => (
              <span key={uni.name} className="text-sm sm:text-base font-bold text-slate-600 tracking-tight">
                {uni.abbr}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
