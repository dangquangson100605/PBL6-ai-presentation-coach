export type UserRole = "student" | "admin";

interface SidebarProps {
  userRole: UserRole;
  activeItem: string;
  onNav: (id: string) => void;
  onLogout?: () => void;
}

import {
  GeminiIcon,
  IconDashboard,
  IconStudio,
  IconUpload,
  IconHistory,
  IconUsers,
  IconConfig,
  IconLogs,
  IconSettings,
} from "./components/icons";

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
