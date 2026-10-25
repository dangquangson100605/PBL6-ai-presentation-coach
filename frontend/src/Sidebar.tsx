import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
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

export type UserRole = "student" | "admin";

interface SidebarProps {
  userRole: UserRole;
  activeItem: string;
  onNav: (id: string) => void;
  onLogout?: () => void;
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
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isAdmin = userRole === "admin";
  const navItems = isAdmin ? ADMIN_NAV : STUDENT_NAV;

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      logout();
      navigate("/login");
    }
  };

  return (
    <aside className="w-56 flex-shrink-0 bg-white border-r border-slate-100 flex flex-col py-6 px-4 gap-2">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-2 mb-6">
        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
          <GeminiIcon />
        </div>
        <span className="text-[15px] font-bold text-slate-900 tracking-tight">AI Coach</span>
      </div>

      {/* Role badge */}
      <div className="px-2 mb-2">
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${isAdmin ? "bg-slate-100 text-slate-700 border border-slate-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200/80"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isAdmin ? "bg-slate-500" : "bg-emerald-500"}`} />
          {isAdmin ? "Bảng quản trị" : "Sinh viên"}
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
              className={`nav-link flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-left w-full transition-colors ${active
                  ? "bg-emerald-50 text-emerald-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              <Icon active={active} />
              {label}
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />}
            </button>
          );
        })}
      </nav>

      {/* User profile & Logout */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between px-2 gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${isAdmin ? "bg-slate-800 text-white" : "bg-emerald-600 text-white"}`}>
            <span className="text-white text-[11px] font-bold">{isAdmin ? "SA" : "DQ"}</span>
          </div>
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold text-slate-800 truncate">
              {isAdmin ? "System Admin" : "Đặng Quang Sơn"}
            </p>
            <p className="text-[11px] text-slate-500 truncate">
              {isAdmin ? "Administrator" : "Sinh viên"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          title="Đăng xuất"
          aria-label="Đăng xuất"
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors flex-shrink-0"
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M6 13H3.5a1.5 1.5 0 0 1-1.5-1.5v-7A1.5 1.5 0 0 1 3.5 3H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M10.5 11l3-3-3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.5 8H5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
