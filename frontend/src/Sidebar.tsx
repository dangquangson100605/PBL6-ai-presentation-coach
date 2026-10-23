export type UserRole = "student" | "admin";

interface SidebarProps {
  userRole: UserRole;
  activeItem: string;
  onNav: (id: string) => void;
  onLogout?: () => void;
}

/* ── Icons ───────────────────────────────────────────────── */
function GeminiIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2C8 5.314 5.314 8 2 8c3.314 0 6 2.686 6 6 0-3.314 2.686-6 6-6-3.314 0-6-2.686-6-6z" fill="#7C3AED" />
    </svg>
  );
}

function IconDashboard({ active }: { active?: boolean }) {
  const c = active ? "#7C3AED" : "#94A3B8";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1.5" y="1.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5" />
      <rect x="10.5" y="1.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5" />
      <rect x="1.5" y="10.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5" />
      <rect x="10.5" y="10.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5" />
    </svg>
  );
}

function IconStudio({ active }: { active?: boolean }) {
  const c = active ? "#7C3AED" : "#94A3B8";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke={c} strokeWidth="1.5" />
      <circle cx="9" cy="9" r="3" fill={c} fillOpacity="0.3" stroke={c} strokeWidth="1.5" />
      <circle cx="9" cy="9" r="1" fill={c} />
    </svg>
  );
}

function IconUpload({ active }: { active?: boolean }) {
  const c = active ? "#7C3AED" : "#94A3B8";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2v10M5 6l4-4 4 4M2 14h14" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconHistory({ active }: { active?: boolean }) {
  const c = active ? "#7C3AED" : "#94A3B8";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 4.5V9l3 2" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 9A5.5 5.5 0 1 1 9 14.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3.5 5.5V9H7" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconUsers({ active }: { active?: boolean }) {
  const c = active ? "#7C3AED" : "#94A3B8";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="6" r="3" stroke={c} strokeWidth="1.5" />
      <path d="M3 15c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="5.5" r="2" stroke={c} strokeWidth="1.3" />
      <path d="M16.5 12c0-1.657-1.12-3-2.5-3" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconConfig({ active }: { active?: boolean }) {
  const c = active ? "#7C3AED" : "#94A3B8";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="2.5" stroke={c} strokeWidth="1.5" />
      <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.697 3.697l1.414 1.414M12.889 12.889l1.414 1.414M3.697 14.303l1.414-1.414M12.889 5.111l1.414-1.414" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconLogs({ active }: { active?: boolean }) {
  const c = active ? "#7C3AED" : "#94A3B8";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="3" y="2" width="12" height="14" rx="2" stroke={c} strokeWidth="1.5" />
      <path d="M6 6h6M6 9h6M6 12h4" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconSettings({ active }: { active?: boolean }) {
  const c = active ? "#7C3AED" : "#94A3B8";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="2.5" stroke={c} strokeWidth="1.5" />
      <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.697 3.697l1.414 1.414M12.889 12.889l1.414 1.414M3.697 14.303l1.414-1.414M12.889 5.111l1.414-1.414" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const STUDENT_NAV = [
  { id: "dashboard", label: "Bảng điều khiển", Icon: IconDashboard },
  { id: "studio", label: "Studio", Icon: IconStudio },
  { id: "upload", label: "Tải Video Lên", Icon: IconUpload },
  { id: "history", label: "Lịch sử", Icon: IconHistory },
  { id: "settings", label: "Cài đặt", Icon: IconSettings },
];

const ADMIN_NAV = [
  { id: "dashboard", label: "Bảng điều khiển", Icon: IconDashboard },
  { id: "users", label: "Người dùng", Icon: IconUsers },
  { id: "config", label: "Cấu hình hệ thống", Icon: IconConfig },
  { id: "logs", label: "Nhật ký máy chủ", Icon: IconLogs },
  { id: "settings", label: "Cài đặt", Icon: IconSettings },
];

export default function Sidebar({ userRole, activeItem, onNav, onLogout }: SidebarProps) {
  const isAdmin = userRole === "admin";
  const navItems = isAdmin ? ADMIN_NAV : STUDENT_NAV;

  return (
    <aside className="w-56 flex-shrink-0 bg-white border-r border-slate-100 flex flex-col py-6 px-4 gap-2">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-6">
        <div className="w-8 h-8 rounded-xl bg-violet-700 flex items-center justify-center shadow-sm shadow-violet-200">
          <GeminiIcon />
        </div>
        <span className="text-[15px] font-bold text-violet-700 tracking-tight">AI Coach</span>
      </div>

      {/* Role badge */}
      <div className="px-2 mb-2">
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${isAdmin ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-violet-50 text-violet-700 border border-violet-200"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isAdmin ? "bg-amber-500" : "bg-violet-500"}`} />
          {isAdmin ? "Bảng quản trị" : "Học sinh"}
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ id, label, Icon }) => {
          const active = id === activeItem;
          return (
            <button
              key={id}
              onClick={() => onNav(id)}
              className={`nav-link flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-left w-full ${
                active
                  ? "bg-violet-50 text-violet-700"
                  : "text-slate-500 hover:bg-violet-50/60 hover:text-violet-700"
              }`}
            >
              <Icon active={active} />
              {label}
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />}
            </button>
          );
        })}
      </nav>

      {/* User profile */}
      <div className="pt-4 border-t border-slate-100 flex flex-col gap-1">
        <div className="flex items-center gap-3 px-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${isAdmin ? "bg-gradient-to-br from-amber-400 to-orange-500" : "bg-gradient-to-br from-violet-400 to-indigo-500"}`}>
            <span className="text-white text-[11px] font-bold">{isAdmin ? "SA" : "DQ"}</span>
          </div>
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold text-slate-700 truncate">
              {isAdmin ? "System Admin" : "Đặng Quang Sơn"}
            </p>
            <p className="text-[11px] text-slate-400 truncate">
              {isAdmin ? "Administrator" : "Sinh viên"}
            </p>
          </div>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[12px] font-medium text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150 w-full mt-0.5"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 12H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M9.5 10l3-3-3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.5 7H5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Log Out
          </button>
        )}
      </div>
    </aside>
  );
}
