import { useState, useRef } from "react";
import Sidebar from "./Sidebar";

/* ── Reusable primitives ─────────────────────────────────── */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
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
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      readOnly={readOnly}
      onChange={(e) => onChange?.(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="w-full bg-slate-50 text-slate-800 text-[13.5px] font-medium rounded-xl px-4 py-3 outline-none border transition-all duration-200 placeholder:text-slate-300"
      style={{
        borderColor: focused ? "#7C3AED" : "#E5E7EB",
        boxShadow: focused ? "0 0 0 3px rgba(124,58,237,0.10)" : "none",
      }}
    />
  );
}

function PasswordInput({ placeholder, onChange }: { placeholder: string; onChange?: (v: string) => void }) {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <div
      className="flex items-center bg-slate-50 rounded-xl border transition-all duration-200 overflow-hidden"
      style={{
        borderColor: focused ? "#7C3AED" : "#E5E7EB",
        boxShadow: focused ? "0 0 0 3px rgba(124,58,237,0.10)" : "none",
      }}
    >
      <input
        type={show ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => { setValue(e.target.value); onChange?.(e.target.value); }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 bg-transparent text-slate-800 text-[13.5px] font-medium px-4 py-3 outline-none placeholder:text-slate-300"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="px-4 text-slate-400 hover:text-violet-500 transition-colors flex-shrink-0"
      >
        {show ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6.5 6.6A2 2 0 0 0 9.4 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 4.6C2.9 5.5 2 6.7 1.5 8c1.1 2.8 3.9 4.8 6.5 4.8 1.1 0 2.2-.3 3.1-.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12.5 11.2C13.5 10.3 14.4 9.2 14.5 8c-1.1-2.8-3.9-4.8-6.5-4.8-.6 0-1.2.1-1.7.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <ellipse cx="8" cy="8" rx="6.5" ry="4" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
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
  const colors = ["", "#EF4444", "#F97316", "#EAB308", "#22C55E"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  if (value.length === 0) return null;
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex gap-1 flex-1">
        {[1, 2, 3, 4].map((b) => (
          <div key={b} className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ background: b <= score ? colors[score] : "#E5E7EB" }} />
        ))}
      </div>
      <span className="text-[11px] font-semibold" style={{ color: colors[score] }}>{labels[score]}</span>
    </div>
  );
}

/* ── Avatar uploader ─────────────────────────────────────── */
function AvatarUpload() {
  const ref = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setPreview(URL.createObjectURL(f));
  }

  return (
    <div className="flex items-center gap-6">
      <div
        className="relative w-[88px] h-[88px] rounded-full cursor-pointer flex-shrink-0"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => ref.current?.click()}
      >
        <div
          className="w-full h-full rounded-full overflow-hidden border-[2.5px] transition-all duration-200"
          style={{ borderColor: hovered ? "#7C3AED" : "#E2E8F0" }}
        >
          {preview ? (
            <img src={preview} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <span className="text-white text-[26px] font-bold select-none tracking-tight">SA</span>
            </div>
          )}
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 rounded-full flex items-center justify-center transition-all duration-200"
          style={{ background: hovered ? "rgba(109,40,217,0.5)" : "transparent" }}
        >
          {hovered && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 3H15L17 6H20C20.6 6 21 6.4 21 7V19C21 19.6 20.6 20 20 20H4C3.4 20 3 19.6 3 19V7C3 6.4 3.4 6 4 6H7L9 3Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
              <circle cx="12" cy="13" r="3.5" stroke="white" strokeWidth="1.6" />
            </svg>
          )}
        </div>

        {/* Camera badge */}
        {!hovered && (
          <div className="absolute bottom-0.5 right-0.5 w-6 h-6 rounded-full bg-violet-600 border-2 border-white flex items-center justify-center shadow-md">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M4 2H7L8 3.5H10C10.3 3.5 10.5 3.7 10.5 4V9C10.5 9.3 10.3 9.5 10 9.5H1C0.7 9.5 0.5 9.3 0.5 9V4C0.5 3.7 0.7 3.5 1 3.5H3L4 2Z" stroke="white" strokeWidth="1" strokeLinejoin="round" />
              <circle cx="5.5" cy="6.5" r="1.5" stroke="white" strokeWidth="1" />
            </svg>
          </div>
        )}
      </div>

      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      <div>
        <p className="text-[14px] font-semibold text-slate-800">Profile Photo</p>
        <p className="text-[12px] text-slate-400 mt-0.5">JPG, PNG or GIF · Max 5 MB</p>
        <button
          onClick={() => ref.current?.click()}
          className="mt-2.5 text-[12px] font-semibold text-violet-700 border border-violet-300 bg-white hover:bg-violet-50 px-3.5 py-1.5 rounded-lg transition-all duration-150 shadow-sm"
        >
          Upload Photo
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
    <div
      className="bg-white rounded-2xl overflow-hidden"
      style={{
        border: "1px solid #EEF2F7",
        boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)",
      }}
    >
      <div className="px-8 py-5 border-b border-slate-100">
        <h2 className="text-[15px] font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="text-[12.5px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      <div className="px-8 py-7">{children}</div>
    </div>
  );
}

/* ── Primary violet button ───────────────────────────────── */
function VioletBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 bg-violet-700 hover:bg-violet-800 active:scale-[0.98] text-white text-[13px] font-semibold px-6 py-2.5 rounded-xl transition-all duration-150"
      style={{ boxShadow: "0 2px 8px rgba(109,40,217,0.25)" }}
    >
      {children}
    </button>
  );
}

/* ── Toast ───────────────────────────────────────────────── */
function Toast({ message, visible }: { message: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      className="toast-enter fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white text-[13px] font-semibold px-5 py-3 rounded-2xl"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.22)" }}
    >
      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {message}
    </div>
  );
}

/* ── Main ────────────────────────────────────────────────── */
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
    <div className="flex h-screen bg-[#F7F8FB] overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      <Sidebar
        userRole="admin"
        activeItem="settings"
        onNav={onNav}
        onLogout={onLogout}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* ── Header ──────────────────────────────────── */}
        <div className="bg-white border-b border-slate-100 px-10 py-7 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[27px] font-bold text-slate-900 tracking-tight leading-none">
                Admin Settings
              </h1>
              <p className="text-[13px] text-slate-400 mt-1.5">
                Manage your administrator profile and account security
              </p>
            </div>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[12px] font-medium text-slate-400">
              <button className="hover:text-violet-600 transition-colors" onClick={() => onNav("dashboard")}>
                Dashboard
              </button>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4.5 3l3 3-3 3" stroke="#CBD5E1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-violet-600 font-semibold">Settings</span>
            </nav>
          </div>
        </div>

        {/* ── Scrollable content ───────────────────────── */}
        <div className="flex-1 px-10 py-8 space-y-5 max-w-[720px] w-full">

          {/* ── Card 1: Profile Information ─────────── */}
          <Card
            title="Profile Information"
            subtitle="Update your display name and contact email"
          >
            <div className="space-y-7">

              {/* Avatar */}
              <div className="pb-7 border-b border-slate-100">
                <AvatarUpload />
              </div>

              {/* Fields */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <FieldLabel>Full Name</FieldLabel>
                  <TextInput value={fullName} onChange={setFullName} />
                </div>
                <div>
                  <FieldLabel>Email Address</FieldLabel>
                  <div className="relative">
                    <TextInput value={email} onChange={setEmail} type="email" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-[10px] font-bold text-violet-600 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 inline-block" />
                      Admin
                    </span>
                  </div>
                </div>
              </div>

              {/* Save row */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <p className="text-[11.5px] text-slate-400">Last updated: 20/09/2026</p>
                <VioletBtn onClick={() => showToast("Profile saved successfully!")}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2 6.5l3.5 3.5 5.5-6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Save Changes
                </VioletBtn>
              </div>
            </div>
          </Card>

          {/* ── Card 2: Security ────────────────────── */}
          <Card
            title="Security"
            subtitle="Change your password to keep the admin account secure"
          >
            <div className="space-y-4">

              <div>
                <FieldLabel>Current Password</FieldLabel>
                <PasswordInput placeholder="Enter your current password" />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-[11px] text-slate-400 font-medium">New password</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              <div>
                <FieldLabel>New Password</FieldLabel>
                <PasswordInput placeholder="At least 8 characters" onChange={setNewPassword} />
                <PasswordStrength value={newPassword} />
              </div>

              <div>
                <FieldLabel>Confirm New Password</FieldLabel>
                <PasswordInput placeholder="Re-enter new password" />
              </div>

              {/* Requirement chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {["Min 8 characters", "Uppercase letter", "Number", "Special character"].map((req) => (
                  <span
                    key={req}
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full"
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <circle cx="4" cy="4" r="3" stroke="#CBD5E1" strokeWidth="1.2" />
                    </svg>
                    {req}
                  </span>
                ))}
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-100">
                <VioletBtn onClick={() => showToast("Password updated successfully!")}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <rect x="3" y="5.5" width="7" height="5.5" rx="1" stroke="white" strokeWidth="1.4" />
                    <path d="M4.5 5.5V4a2.5 2.5 0 0 1 5 0v1.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  Update Password
                </VioletBtn>
              </div>
            </div>
          </Card>

          <div className="h-8" />
        </div>
      </main>

      {toast && <Toast key={toast.key} message={toast.msg} visible={!!toast} />}
    </div>
  );
}
