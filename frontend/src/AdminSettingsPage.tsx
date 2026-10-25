import { useState, useRef } from "react";
import Sidebar from "./Sidebar";

/* ── Reusable field components ───────────────────────────── */
function FieldLabel({ children }: { children: React.ReactNode }) {
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
  readOnly,
}: {
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  readOnly?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      readOnly={readOnly}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full bg-gray-50 text-gray-800 text-xs font-medium rounded-lg px-3 py-2.5 outline-none border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-colors"
    />
  );
}

function PasswordInput({ placeholder, onChange }: { placeholder: string; onChange?: (v: string) => void }) {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 focus-within:bg-white transition-colors overflow-hidden">
      <input
        type={show ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => { setValue(e.target.value); onChange?.(e.target.value); }}
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
            SA
          </div>
        )}
      </div>

      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      <div>
        <p className="text-sm font-semibold text-gray-900">Ảnh đại diện quản trị</p>
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

/* ── Card wrapper ────────────────────────────────────────── */
function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
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

interface AdminSettingsPageProps {
  onNav: (view: string) => void;
  onLogout: () => void;
}

export default function AdminSettingsPage({ onNav, onLogout }: AdminSettingsPageProps) {
  const [fullName, setFullName] = useState("System Admin");
  const [email, setEmail] = useState("admin@aipresentationcoach.io");
  const [newPassword, setNewPassword] = useState("");
  const [toast, setToast] = useState<{ msg: string; key: number } | null>(null);

  function showToast(msg: string) {
    setToast({ msg, key: Date.now() });
    setTimeout(() => setToast(null), 3200);
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-gray-900 antialiased">
      <Sidebar userRole="admin" activeItem="settings" onNav={onNav} onLogout={onLogout} />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight leading-none">
              Cài đặt quản trị
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Quản lý hồ sơ tài khoản quản trị viên và mật khẩu
            </p>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 space-y-6 max-w-2xl w-full">
          {/* Card 1: Profile Information */}
          <Card
            title="Thông tin tài khoản quản trị"
            subtitle="Cập nhật tên hiển thị và email quản trị"
          >
            <div className="space-y-5">
              <AvatarUpload />

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <FieldLabel>Họ và tên</FieldLabel>
                  <TextInput value={fullName} onChange={setFullName} />
                </div>
                <div>
                  <FieldLabel>Địa chỉ Email</FieldLabel>
                  <TextInput value={email} onChange={setEmail} type="email" />
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => showToast("Đã lưu thông tin quản trị!")}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </Card>

          {/* Card 2: Security */}
          <Card
            title="Bảo mật tài khoản"
            subtitle="Thay đổi mật khẩu quản trị để bảo vệ hệ thống"
          >
            <div className="space-y-4">
              <div>
                <FieldLabel>Mật khẩu hiện tại</FieldLabel>
                <PasswordInput placeholder="Nhập mật khẩu quản trị hiện tại" />
              </div>

              <div>
                <FieldLabel>Mật khẩu mới</FieldLabel>
                <PasswordInput placeholder="Tối thiểu 8 ký tự" onChange={setNewPassword} />
                <PasswordStrength value={newPassword} />
              </div>

              <div>
                <FieldLabel>Xác nhận mật khẩu mới</FieldLabel>
                <PasswordInput placeholder="Nhập lại mật khẩu mới" />
              </div>

              <div className="flex justify-end pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => showToast("Đã cập nhật mật khẩu quản trị!")}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                  Cập nhật mật khẩu
                </button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {toast && <Toast key={toast.key} message={toast.msg} visible={!!toast} />}
    </div>
  );
}
