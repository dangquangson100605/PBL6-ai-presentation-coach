import { useState, useRef } from "react";
import Sidebar, { UserRole } from "./Sidebar";

/* ── Reusable field components ───────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
      {children}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  type = "text",
  placeholder,
  readOnly,
  suffix,
}: {
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  suffix?: string;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-gray-50 text-gray-800 text-xs font-medium rounded-lg px-3 py-2.5 outline-none border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-colors placeholder:text-gray-400"
        style={{ paddingRight: suffix ? "3rem" : undefined }}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 pointer-events-none select-none">
          {suffix}
        </span>
      )}
    </div>
  );
}

/* ── Password input with toggle ──────────────────────────── */
function PasswordInput({ placeholder, onChange }: { placeholder: string; onChange?: (v: string) => void }) {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 focus-within:bg-white transition-colors overflow-hidden">
      <input
        type={show ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e.target.value);
        }}
        className="flex-1 bg-transparent text-gray-800 text-xs font-medium px-3 py-2.5 outline-none placeholder:text-gray-400"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="px-3 text-xs font-medium text-gray-400 hover:text-gray-700"
      >
        {show ? "Ẩn" : "Hiện"}
      </button>
    </div>
  );
}

/* ── Password strength indicator ─────────────────────────── */
function PasswordStrength({ value }: { value: string }) {
  const score =
    value.length === 0 ? 0
    : value.length < 6 ? 1
    : value.length < 10 ? 2
    : /[A-Z]/.test(value) && /[0-9]/.test(value) ? 4 : 3;
  const labels = ["", "Yếu", "Trung bình", "Khá", "Mạnh"];
  if (value.length === 0) return null;
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex gap-1 flex-1">
        {[1, 2, 3, 4].map((b) => (
          <div
            key={b}
            className={`h-1 flex-1 rounded-full transition-all duration-200 ${
              b <= score ? "bg-emerald-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-[11px] font-medium text-emerald-600">{labels[score]}</span>
    </div>
  );
}

/* ── Avatar uploader ─────────────────────────────────────── */
function AvatarUpload() {
  const ref = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setPreview(URL.createObjectURL(f));
  }

  return (
    <div className="flex items-center gap-5">
      <div
        className="relative w-16 h-16 rounded-full cursor-pointer flex-shrink-0 border-2 border-gray-200 hover:border-emerald-500 transition-colors overflow-hidden"
        onClick={() => ref.current?.click()}
      >
        {preview ? (
          <img src={preview} alt="avatar" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold text-base">
            DQ
          </div>
        )}
      </div>

      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      <div>
        <p className="text-sm font-semibold text-gray-900">Ảnh đại diện</p>
        <p className="text-xs text-gray-500 mt-0.5">JPG, PNG hoặc WebP · Tối đa 5 MB</p>
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="mt-2 text-xs font-medium text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
        >
          Tải ảnh lên
        </button>
      </div>
    </div>
  );
}

/* ── Card section wrapper ────────────────────────────────── */
function Section({
  title,
  subtitle,
  children,
  danger,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-sm border ${
      danger ? "border-rose-200" : "border-gray-200"
    }`}>
      <div className={`px-6 py-4 border-b ${danger ? "border-rose-100 bg-rose-50/30" : "border-gray-100"}`}>
        <h2 className={`text-sm font-semibold ${danger ? "text-rose-700" : "text-gray-900"}`}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

/* ── Toast ───────────────────────────────────────────────── */
function Toast({ message, visible }: { message: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gray-900 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-lg">
      <span className="text-emerald-400">✓</span>
      {message}
    </div>
  );
}

interface SettingsPageProps {
  onNav: (view: string) => void;
  userRole: UserRole;
}

export default function SettingsPage({ onNav, userRole }: SettingsPageProps) {
  const [fullName, setFullName] = useState("Đặng Quang Sơn");
  const [email, setEmail] = useState("son.dang@student.edu.vn");
  const [wpm, setWpm] = useState("145");
  const [newPassword, setNewPassword] = useState("");
  const [toast, setToast] = useState<{ msg: string; key: number } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function showToast(msg: string) {
    setToast({ msg, key: Date.now() });
    setTimeout(() => setToast(null), 3200);
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-gray-900 antialiased">
      <Sidebar userRole={userRole} activeItem="settings" onNav={onNav} />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight leading-none">
              Cài đặt tài khoản
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Quản lý thông tin hồ sơ và tùy chọn bảo mật
            </p>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 space-y-6 max-w-2xl w-full">
          {/* Section 1: Personal Information */}
          <Section
            title="Thông tin cá nhân"
            subtitle="Cập nhật ảnh đại diện và thông tin hồ sơ của bạn"
          >
            <div className="space-y-5">
              <AvatarUpload />

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <Label>Họ và tên</Label>
                  <TextInput value={fullName} onChange={setFullName} />
                </div>
                <div>
                  <Label>Địa chỉ Email</Label>
                  <TextInput value={email} onChange={setEmail} type="email" />
                </div>
              </div>

              <div>
                <Label>Tốc độ nói mục tiêu</Label>
                <TextInput
                  value={wpm}
                  onChange={setWpm}
                  type="number"
                  suffix="WPM"
                />
                <p className="text-[11px] text-gray-400 mt-1">Khoảng tối ưu cho thuyết trình: 130 – 160 WPM</p>
              </div>

              <div className="flex justify-end pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => showToast("Đã lưu thông tin thành công!")}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </Section>

          {/* Section 2: Security */}
          <Section
            title="Bảo mật & Mật khẩu"
            subtitle="Thay đổi mật khẩu đăng nhập tài khoản"
          >
            <div className="space-y-4">
              <div>
                <Label>Mật khẩu hiện tại</Label>
                <PasswordInput placeholder="Nhập mật khẩu hiện tại" />
              </div>

              <div>
                <Label>Mật khẩu mới</Label>
                <PasswordInput
                  placeholder="Tối thiểu 8 ký tự"
                  onChange={setNewPassword}
                />
                <PasswordStrength value={newPassword} />
              </div>

              <div>
                <Label>Xác nhận mật khẩu mới</Label>
                <PasswordInput placeholder="Nhập lại mật khẩu mới" />
              </div>

              <div className="flex justify-end pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => showToast("Đã cập nhật mật khẩu thành công!")}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                  Cập nhật mật khẩu
                </button>
              </div>
            </div>
          </Section>

          {/* Section 3: Danger Zone */}
          <Section title="Vùng nguy hiểm" danger>
            <div className="flex items-center justify-between gap-6">
              <div>
                <h3 className="text-xs font-bold text-rose-700">Xóa vĩnh viễn tài khoản</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Xóa tài khoản và toàn bộ lịch sử video thuyết trình đã lưu. Hành động này không thể hoàn tác.
                </p>
              </div>

              {!showDeleteConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors flex-shrink-0"
                >
                  Xóa tài khoản
                </button>
              ) : (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="text-xs font-medium text-gray-600 hover:bg-gray-100 px-3 py-1.5 rounded-lg"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      showToast("Yêu cầu đã được gửi");
                    }}
                    className="text-xs font-medium bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg shadow-sm"
                  >
                    Xác nhận
                  </button>
                </div>
              )}
            </div>
          </Section>
        </div>
      </main>

      <Toast message={toast?.msg || ""} visible={Boolean(toast)} />
    </div>
  );
}
