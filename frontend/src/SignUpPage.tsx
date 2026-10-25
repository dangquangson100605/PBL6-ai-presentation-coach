import { GeminiIcon } from "./components/icons";
import { useState } from "react";


function RadarIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      {/* Radar rings */}
      <circle cx="20" cy="20" r="16" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.2" />
      <circle cx="20" cy="20" r="10" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.35" />
      <circle cx="20" cy="20" r="4.5" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.5" />
      {/* Radar axes */}
      <line x1="20" y1="4" x2="20" y2="36" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.2" />
      <line x1="4" y1="20" x2="36" y2="20" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.2" />
      <line x1="7.5" y1="7.5" x2="32.5" y2="32.5" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.15" />
      <line x1="32.5" y1="7.5" x2="7.5" y2="32.5" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.15" />
      {/* Data shape — pentagon approximation */}
      <polygon
        points="20,8 30,15 27,27 13,27 10,15"
        fill="#7C3AED"
        fillOpacity="0.12"
        stroke="#7C3AED"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Data points */}
      <circle cx="20" cy="8" r="2" fill="#7C3AED" />
      <circle cx="30" cy="15" r="2" fill="#7C3AED" />
      <circle cx="27" cy="27" r="2" fill="#7C3AED" />
      <circle cx="13" cy="27" r="2" fill="#7C3AED" />
      <circle cx="10" cy="15" r="2" fill="#7C3AED" />
    </svg>
  );
}

function EyeOpenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <ellipse cx="8" cy="8" rx="6" ry="4" stroke="#9CA3AF" strokeWidth="1.3" />
      <circle cx="8" cy="8" r="1.8" fill="#9CA3AF" />
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" stroke="#9CA3AF" strokeWidth="1.3" />
      <path d="M3 3l10 10" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function SkillBadge({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[11px] text-slate-500 font-medium w-24 truncate">{label}</span>
      <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-[11px] font-semibold text-emerald-700 w-6 text-right">{score}</span>
    </div>
  );
}

interface SignUpPageProps {
  onBack: () => void;
  onLogin: () => void;
  onSignUp: () => void;
}

export default function SignUpPage({ onBack, onLogin, onSignUp }: SignUpPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const fieldStyle = (name: string) => ({
    borderColor: focused === name ? "#10B981" : "#E5E7EB",
    boxShadow: focused === name ? "0 0 0 3px rgba(16,185,129,0.12)" : "none",
  });

  return (
    <div className="min-h-screen flex">

      {/* LEFT COLUMN */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-50 flex-col items-center justify-center p-12 overflow-hidden">

        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-100/60 blur-3xl opacity-50 pointer-events-none" />

        <div className="relative z-10 max-w-[420px] w-full flex flex-col gap-10">

          {/* Logo */}
          <button onClick={onBack} className="inline-flex items-center gap-2.5 group self-start">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <GeminiIcon />
            </div>
            <span className="text-[15px] font-bold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
              AI Coach
            </span>
          </button>

          {/* Quote */}
          <div className="space-y-4">
            <blockquote className="text-[34px] font-bold leading-[1.15] tracking-tight text-slate-900">
              "Bắt đầu hành trình trở thành{" "}
              <span className="text-emerald-600">người thuyết trình tự tin."</span>
            </blockquote>
            <p className="text-[15px] text-slate-600 leading-relaxed">
              AI Coach của bạn phân tích từng phiên và xây dựng kế hoạch cải thiện cá nhân — tự động.
            </p>
          </div>

          {/* Floating card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <RadarIcon />
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-800">Theo dõi 5 kỹ năng thuyết trình cốt lõi ngay lập tức.</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Cập nhật sau mỗi phiên</p>
              </div>
            </div>
            <div className="space-y-2 pt-1 border-t border-slate-50">
              <SkillBadge label="Giao tiếp mắt" score={85} />
              <SkillBadge label="Tốc độ nói" score={72} />
              <SkillBadge label="Ngôn ngữ cơ thể" score={68} />
              <SkillBadge label="Độ rõ giọng" score={90} />
              <SkillBadge label="Từ đệm" score={55} />
            </div>
          </div>

          {/* Dots */}
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-full"
                style={{ width: i === 1 ? 24 : 8, height: 8, backgroundColor: i === 1 ? "#10B981" : "#E5E7EB" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-10">
        <div className="w-full max-w-[400px] space-y-7">

          {/* Logo */}
          <button onClick={onBack} className="inline-flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <GeminiIcon />
            </div>
            <span className="text-[14px] font-bold text-slate-900 tracking-tight">AI Coach</span>
          </button>

          {/* Headline */}
          <div className="space-y-1.5">
            <h1 className="text-[32px] font-bold text-slate-900 tracking-tight">Tạo tài khoản</h1>
            <p className="text-[15px] text-slate-500 font-medium">
              Tham gia để luyện tập và hoàn thiện kỹ năng thuyết trình.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSignUp(); }}>

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-slate-700" htmlFor="fullname">
                Họ và tên
              </label>
              <div
                className="relative rounded-xl border transition-all overflow-hidden"
                style={fieldStyle("name")}
              >
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="5.5" r="2.5" stroke={focused === "name" ? "#10B981" : "#9CA3AF"} strokeWidth="1.3" />
                    <path d="M2.5 13.5c0-2.485 2.462-4.5 5.5-4.5s5.5 2.015 5.5 4.5" stroke={focused === "name" ? "#10B981" : "#9CA3AF"} strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </div>
                <input
                  id="fullname"
                  type="text"
                  defaultValue="Dang Quang Son"
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-10 pr-4 py-3 text-[14px] text-slate-700 bg-white outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-slate-700" htmlFor="email">
                Địa chỉ Email
              </label>
              <div
                className="relative rounded-xl border transition-all overflow-hidden"
                style={fieldStyle("email")}
              >
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke={focused === "email" ? "#10B981" : "#9CA3AF"} strokeWidth="1.3" />
                    <path d="M1.5 5.5l6.5 4 6.5-4" stroke={focused === "email" ? "#10B981" : "#9CA3AF"} strokeWidth="1.3" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  defaultValue="son.dang@student.edu.vn"
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-10 pr-4 py-3 text-[14px] text-slate-700 bg-white outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-slate-700" htmlFor="password">
                Mật khẩu
              </label>
              <div
                className="relative rounded-xl border transition-all overflow-hidden"
                style={fieldStyle("password")}
              >
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="7" width="10" height="7" rx="1.5" stroke={focused === "password" ? "#10B981" : "#9CA3AF"} strokeWidth="1.3" />
                    <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke={focused === "password" ? "#10B981" : "#9CA3AF"} strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  defaultValue="password123"
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-10 pr-11 py-3 text-[14px] text-slate-700 bg-white outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              </div>
              {/* Password strength indicator */}
              <div className="flex gap-1 pt-1">
                {["bg-emerald-500", "bg-emerald-500", "bg-emerald-300", "bg-slate-200"].map((cls, i) => (
                  <div key={i} className={`flex-1 h-1 rounded-full ${cls} transition-all`} />
                ))}
                <span className="text-[11px] text-emerald-600 font-semibold ml-1 leading-none self-center">Tốt</span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-slate-700" htmlFor="confirm">
                Xác nhận mật khẩu
              </label>
              <div
                className="relative rounded-xl border transition-all overflow-hidden"
                style={fieldStyle("confirm")}
              >
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="7" width="10" height="7" rx="1.5" stroke={focused === "confirm" ? "#10B981" : "#9CA3AF"} strokeWidth="1.3" />
                    <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke={focused === "confirm" ? "#10B981" : "#9CA3AE"} strokeWidth="1.3" strokeLinecap="round" />
                    <path d="M9 10.5l-2 2-1-1" stroke="#10B981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  defaultValue="password123"
                  onFocus={() => setFocused("confirm")}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-10 pr-11 py-3 text-[14px] text-slate-700 bg-white outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5 flex-shrink-0">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-4 h-4 rounded border-2 border-slate-300 peer-checked:border-emerald-600 peer-checked:bg-emerald-600 transition-all" />
                <svg
                  className="absolute inset-0 w-4 h-4 text-white pointer-events-none hidden peer-checked:block"
                  viewBox="0 0 16 16" fill="none"
                >
                  <path d="M4 8l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[12.5px] text-slate-500 leading-relaxed">
                Tôi đồng ý với{" "}
                <a href="#" className="text-emerald-600 hover:text-emerald-800 font-semibold">Điều khoản dịch vụ</a>
                {" "}và{" "}
                <a href="#" className="text-emerald-600 hover:text-emerald-800 font-semibold">Chính sách bảo mật</a>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm text-[15px] tracking-wide mt-1"
            >
              Đăng ký
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[12px] text-slate-400 font-medium">hoặc đăng ký với</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 text-[13px] font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885-.995.9-2.35 1.438-3.954 1.438a6.13 6.13 0 0 1-6.13-6.13 6.13 6.13 0 0 1 6.13-6.13c1.662 0 3.063.607 4.146 1.608l-1.65 1.65c-.453-.432-1.11-.713-2.496-.713a4.073 4.073 0 0 0-4.073 4.073 4.073 4.073 0 0 0 4.073 4.073c2.17 0 3.51-1.116 3.707-2.772H8.346V6.558h7.2z" fill="#4285F4" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 text-[13px] font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" fill="#333" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-[14px] text-slate-500">
            Đã có tài khoản?{" "}
            <button
              onClick={onLogin}
              className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Đăng nhập
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}
