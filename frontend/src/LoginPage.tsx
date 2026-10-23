import { GeminiIcon } from "./components/icons";
import { useState } from "react";


function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#22C55E" fillOpacity="0.15" />
      <path
        d="M6.5 10l2.5 2.5 4.5-4.5"
        stroke="#22C55E"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

interface LoginPageProps {
  onBack: () => void;
  onSignUp?: () => void;
  onLoginAsStudent: () => void;
  onLoginAsAdmin: () => void;
}

export default function LoginPage({ onBack, onSignUp, onLoginAsStudent, onLoginAsAdmin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email] = useState("thang.nguyen@student.edu.vn");
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex">

      {/* LEFT COLUMN — Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-50 flex-col items-center justify-center p-12 overflow-hidden">

        {/* Soft violet blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-violet-200 via-purple-100 to-indigo-100 blur-3xl opacity-70 pointer-events-none" />

        {/* Secondary smaller blobs */}
        <div className="absolute top-16 right-16 w-48 h-48 rounded-full bg-violet-100 blur-2xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-36 h-36 rounded-full bg-purple-100 blur-2xl opacity-40 pointer-events-none" />

        <div className="relative z-10 max-w-[420px] w-full flex flex-col gap-10">

          {/* Logo */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 group self-start"
          >
            <div className="w-9 h-9 rounded-xl bg-violet-700 flex items-center justify-center shadow-md shadow-violet-200">
              <GeminiIcon />
            </div>
            <span className="text-[15px] font-bold text-slate-800 tracking-tight group-hover:text-violet-700 transition-colors">
              AI Coach
            </span>
          </button>

          {/* Motivational quote */}
          <div className="space-y-4">
            <blockquote className="text-[36px] font-bold leading-[1.15] tracking-tight text-violet-900">
              "Tự tin bảo vệ{" "}
              <span className="text-violet-600">đề án của bạn."</span>
            </blockquote>
            <p className="text-[15px] text-slate-500 leading-relaxed">
              Phân tích AI thời gian thực về giao tiếp mắt, tốc độ nói và ngôn ngữ cơ thể — để mọi bài thuyết trình đều có giá trị.
            </p>
          </div>

          {/* Floating card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 p-5 flex items-start gap-4 w-fit">
            <div className="mt-0.5 flex-shrink-0">
              <CheckCircleIcon />
            </div>
            <div className="space-y-0.5">
              <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                Phiên gần nhất
              </p>
              <p className="text-[14px] font-semibold text-slate-800">
                Tốc độ nói:{" "}
                <span className="text-violet-700">145 WPM</span>
              </p>
              <p className="text-[12px] text-slate-500">Mức tối ưu · Tiếp tục phát huy!</p>
            </div>
            <div className="ml-4 flex-shrink-0 self-center">
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                Tối ưu
              </div>
            </div>
          </div>

          {/* Decorative dots */}
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: i === 0 ? 24 : 8,
                  height: 8,
                  backgroundColor: i === 0 ? "#7C3AED" : "#E5E7EB",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN — Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center px-6 sm:px-12 lg:px-16 xl:px-24">

        <div className="w-full max-w-[400px] space-y-8">

          {/* Mobile logo */}
          <button
            onClick={onBack}
            className="lg:hidden inline-flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-violet-700 flex items-center justify-center">
              <GeminiIcon />
            </div>
            <span className="text-[14px] font-bold text-violet-700 tracking-tight">AI Coach</span>
          </button>

          {/* Desktop logo top-left */}
          <div className="hidden lg:block">
            <button onClick={onBack} className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-violet-700 flex items-center justify-center shadow-sm shadow-violet-200">
                <GeminiIcon />
              </div>
              <span className="text-[14px] font-bold text-violet-700 tracking-tight">AI Coach</span>
            </button>
          </div>

          {/* Headline */}
          <div className="space-y-1.5">
            <h1 className="text-[32px] font-bold text-slate-900 tracking-tight">
              Chào mừng trở lại
            </h1>
            <p className="text-[15px] text-slate-400 font-medium">
              Tiếp tục hành trình luyện tập thuyết trình của bạn.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLoginAsStudent(); }}>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-slate-700" htmlFor="email">
                Địa chỉ Email
              </label>
              <div
                className="relative rounded-xl border transition-all overflow-hidden"
                style={{
                  borderColor: focused === "email" ? "#7C3AED" : "#E5E7EB",
                  boxShadow: focused === "email" ? "0 0 0 3px rgba(124,58,237,0.12)" : "none",
                }}
              >
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke={focused === "email" ? "#7C3AED" : "#9CA3AF"} strokeWidth="1.3" />
                    <path d="M1.5 5.5l6.5 4 6.5-4" stroke={focused === "email" ? "#7C3AED" : "#9CA3AF"} strokeWidth="1.3" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  defaultValue={email}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-10 pr-4 py-3 text-[14px] text-slate-700 bg-white outline-none placeholder:text-slate-300"
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
                style={{
                  borderColor: focused === "password" ? "#7C3AED" : "#E5E7EB",
                  boxShadow: focused === "password" ? "0 0 0 3px rgba(124,58,237,0.12)" : "none",
                }}
              >
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="7" width="10" height="7" rx="1.5" stroke={focused === "password" ? "#7C3AED" : "#9CA3AF"} strokeWidth="1.3" />
                    <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke={focused === "password" ? "#7C3AED" : "#9CA3AF"} strokeWidth="1.3" strokeLinecap="round" />
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end -mt-2">
              <a
                href="#"
                className="text-[13px] font-semibold text-violet-600 hover:text-violet-800 transition-colors"
              >
                Quên mật khẩu?
              </a>
            </div>

            {/* Demo role buttons */}
            <div className="space-y-3 pt-1">
              <p className="text-[11px] text-slate-400 text-center font-medium uppercase tracking-wider">Chọn vai trò để demo</p>
              <button
                type="button"
                onClick={onLoginAsStudent}
                className="btn-primary w-full bg-violet-700 hover:bg-violet-800 text-white font-semibold py-3.5 rounded-xl shadow-md shadow-violet-200 text-[15px] tracking-wide flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="5" r="3" stroke="white" strokeWidth="1.4" />
                  <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Đăng nhập với tư cách Sinh viên
              </button>
              <button
                type="button"
                onClick={onLoginAsAdmin}
                className="btn-primary w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3.5 rounded-xl shadow-md shadow-amber-200 text-[15px] tracking-wide flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="6" r="2.5" stroke="white" strokeWidth="1.4" />
                  <path d="M8 1.5v2M8 10.5v2M1.5 8h2M10.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Đăng nhập với tư cách Quản trị viên
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[12px] text-slate-400 font-medium">hoặc tiếp tục với</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Social logins */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 text-[13px] font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885-.995.9-2.35 1.438-3.954 1.438a6.13 6.13 0 0 1-6.13-6.13 6.13 6.13 0 0 1 6.13-6.13c1.662 0 3.063.607 4.146 1.608l-1.65 1.65c-.453-.432-1.11-.713-2.496-.713a4.073 4.073 0 0 0-4.073 4.073 4.073 4.073 0 0 0 4.073 4.073c2.17 0 3.51-1.116 3.707-2.772H8.346V6.558h7.2z" fill="#4285F4"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 text-[13px] font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" fill="#333"/>
              </svg>
              GitHub
            </button>
          </div>

          {/* Sign up footer */}
          <p className="text-center text-[14px] text-slate-500">
            Chưa có tài khoản?{" "}
            <button onClick={onSignUp} className="font-semibold text-violet-600 hover:text-violet-800 transition-colors">
              Đăng ký
            </button>
          </p>
        </div>
      </div>

    </div>
  );
}
