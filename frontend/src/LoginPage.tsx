import { GeminiIcon } from "./components/icons";
import { useState } from "react";
import { Button, Card, Badge } from "./components/common";

function EyeOpenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="1"
        y1="1"
        x2="23"
        y2="23"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface LoginPageProps {
  onBack: () => void;
  onSignUp?: () => void;
  onLoginAsStudent: () => void;
  onLoginAsAdmin: () => void;
}

export default function LoginPage({
  onBack,
  onSignUp,
  onLoginAsStudent,
  onLoginAsAdmin,
}: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("son.dang@student.edu.vn");
  const [password, setPassword] = useState("password123");

  return (
    <div className="min-h-screen flex bg-[#F5F7F6] font-[Inter,sans-serif] text-[#24312B]">
      {/* LEFT COLUMN — Brand Presentation */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-white border-r border-[#DCE5DF] flex-col items-center justify-center p-12 overflow-hidden">
        <div className="relative z-10 max-w-[420px] w-full flex flex-col gap-8">
          {/* Logo */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2.5 group self-start"
          >
            <div className="w-9 h-9 rounded-xl bg-[#276749] text-white flex items-center justify-center shadow-sm">
              <GeminiIcon />
            </div>
            <span className="text-[16px] font-bold text-[#24312B] tracking-tight group-hover:text-[#276749] transition-colors">
              AI Coach
            </span>
          </button>

          {/* Value Prop */}
          <div className="space-y-3">
            <h2 className="text-[34px] font-bold leading-[1.2] tracking-tight text-[#24312B]">
              Tự tin bảo vệ{" "}
              <span className="text-[#276749]">đề án thuyết trình</span>
            </h2>
            <p className="text-[14.5px] text-[#69766F] leading-relaxed">
              Nền tảng ứng dụng AI đa phương thức giúp sinh viên phân tích ánh
              mắt, nhịp độ nói, từ đệm và ngôn ngữ cơ thể theo thời gian thực.
            </p>
          </div>

          {/* Clean Metric Feature Card */}
          <Card className="p-4 flex items-start gap-3.5 border-[#DCE5DF] bg-[#F5F7F6]/50">
            <div className="w-9 h-9 rounded-xl bg-[#E8F1EB] text-[#276749] flex items-center justify-center flex-shrink-0 font-bold text-sm">
              ✓
            </div>
            <div className="space-y-0.5 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#276749] uppercase tracking-wider">
                  Phiên mẫu gần nhất
                </span>
                <Badge variant="success">Tối ưu</Badge>
              </div>
              <p className="text-[13.5px] font-semibold text-[#24312B]">
                Tốc độ nói: 145 WPM · Giao tiếp mắt: 88%
              </p>
              <p className="text-[11.5px] text-[#69766F]">
                Đạt chuẩn thuyết trình bảo vệ đề tài tốt nghiệp PBL6
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* RIGHT COLUMN — Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-12">
        <div className="w-full max-w-[400px] space-y-7">
          {/* Logo for mobile */}
          <button
            onClick={onBack}
            className="lg:hidden inline-flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-xl bg-[#276749] text-white flex items-center justify-center shadow-sm">
              <GeminiIcon />
            </div>
            <span className="text-[15px] font-bold text-[#24312B] tracking-tight">
              AI Coach
            </span>
          </button>

          {/* Headline */}
          <div className="space-y-1">
            <h1 className="text-[28px] font-bold text-[#24312B] tracking-tight">
              Chào mừng trở lại
            </h1>
            <p className="text-[13.5px] text-[#69766F]">
              Đăng nhập để tiếp tục buổi luyện tập thuyết trình của bạn.
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              onLoginAsStudent();
            }}
          >
            {/* Email Field with Visible Label */}
            <div className="space-y-1.5">
              <label
                className="block text-[12px] font-semibold text-[#24312B]"
                htmlFor="email"
              >
                Địa chỉ Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@student.edu.vn"
                  className="w-full h-11 px-3.5 text-[13.5px] font-medium text-[#24312B] bg-white rounded-xl border border-[#DCE5DF] outline-none focus:border-[#276749] focus:ring-1 focus:ring-[#276749] transition-all"
                />
              </div>
            </div>

            {/* Password Field with Visible Label */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  className="block text-[12px] font-semibold text-[#24312B]"
                  htmlFor="password"
                >
                  Mật khẩu
                </label>
                <a
                  href="#"
                  className="text-[12px] font-semibold text-[#276749] hover:underline"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative flex items-center">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-11 px-3.5 pr-11 text-[13.5px] font-medium text-[#24312B] bg-white rounded-xl border border-[#DCE5DF] outline-none focus:border-[#276749] focus:ring-1 focus:ring-[#276749] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 p-1 text-[#69766F] hover:text-[#24312B] transition-colors"
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              </div>
            </div>

            {/* Role Select Buttons */}
            <div className="space-y-2.5 pt-2">
              <p className="text-[11px] text-[#69766F] text-center font-semibold uppercase tracking-wider">
                Chọn vai trò để tiếp tục
              </p>
              <Button
                type="button"
                variant="primary"
                size="lg"
                className="w-full justify-center shadow-sm"
                onClick={onLoginAsStudent}
              >
                Đăng nhập với tư cách Sinh viên
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full justify-center shadow-sm"
                onClick={onLoginAsAdmin}
              >
                Đăng nhập với tư cách Quản trị viên
              </Button>
            </div>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-[13px] text-[#69766F] pt-2">
            Chưa có tài khoản?{" "}
            <button
              onClick={onSignUp}
              className="font-semibold text-[#276749] hover:underline"
            >
              Đăng ký ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
