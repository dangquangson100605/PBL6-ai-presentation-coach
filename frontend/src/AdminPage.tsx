import { GeminiIcon } from "./components/icons";
import { useState } from "react";
import Sidebar, { UserRole } from "./Sidebar";

/* ── Icons ─────────────────────────────────────────────── */

const ADMIN_NAV = [
  {
    id: "dashboard", label: "Dashboard",
    Icon: ({ a }: { a?: boolean }) => {
      const c = a ? "#7C3AED" : "#94A3B8";
      return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1.5" y="1.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5" /><rect x="10.5" y="1.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5" /><rect x="1.5" y="10.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5" /><rect x="10.5" y="10.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5" /></svg>;
    },
  },
  {
    id: "users", label: "Users",
    Icon: ({ a }: { a?: boolean }) => {
      const c = a ? "#7C3AED" : "#94A3B8";
      return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3" stroke={c} strokeWidth="1.5" /><path d="M3 15c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke={c} strokeWidth="1.5" strokeLinecap="round" /><circle cx="14" cy="5.5" r="2" stroke={c} strokeWidth="1.3" /><path d="M16.5 12c0-1.657-1.12-3-2.5-3" stroke={c} strokeWidth="1.3" strokeLinecap="round" /></svg>;
    },
  },
  {
    id: "config", label: "System Config",
    Icon: ({ a }: { a?: boolean }) => {
      const c = a ? "#7C3AED" : "#94A3B8";
      return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2.5" stroke={c} strokeWidth="1.5" /><path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.697 3.697l1.414 1.414M12.889 12.889l1.414 1.414M3.697 14.303l1.414-1.414M12.889 5.111l1.414-1.414" stroke={c} strokeWidth="1.5" strokeLinecap="round" /></svg>;
    },
  },
  {
    id: "logs", label: "Server Logs",
    Icon: ({ a }: { a?: boolean }) => {
      const c = a ? "#7C3AED" : "#94A3B8";
      return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="2" width="12" height="14" rx="2" stroke={c} strokeWidth="1.5" /><path d="M6 6h6M6 9h6M6 12h4" stroke={c} strokeWidth="1.3" strokeLinecap="round" /></svg>;
    },
  },
];

/* ── Shared progress bar ─────────────────────────────────── */
function UtilBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  const warn = pct >= 75;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-[12.5px] font-medium text-slate-600">{label}</span>
        <span className={`text-[12px] font-bold ${warn ? "text-orange-500" : "text-slate-700"}`}>{pct}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            background: warn
              ? "linear-gradient(90deg,#FB923C,#F97316)"
              : color,
          }}
        />
      </div>
    </div>
  );
}

/* ── Mini sparkline ─────────────────────────────────────── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data), min = Math.min(...data);
  const W = 80, H = 28;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / (max - min || 1)) * H * 0.8 - H * 0.1;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={pts[pts.length - 1].split(",")[0]} cy={pts[pts.length - 1].split(",")[1]} r="2.5" fill={color} />
    </svg>
  );
}

/* ── Inline form input ──────────────────────────────────── */
function ConfigInput({
  label, value, onChange, suffix, helper,
}: {
  label: string; value: string; onChange: (v: string) => void;
  suffix?: string; helper?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="space-y-1.5 flex-1">
      <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-wider">{label}</label>
      <div
        className="flex items-center rounded-xl border overflow-hidden transition-all bg-white"
        style={{
          borderColor: focused ? "#7C3AED" : "#E5E7EB",
          boxShadow: focused ? "0 0 0 3px rgba(124,58,237,0.12)" : "none",
        }}
      >
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 px-4 py-2.5 text-[15px] font-bold text-slate-800 bg-transparent outline-none"
        />
        {suffix && (
          <span className="pr-4 text-[12px] font-semibold text-slate-400 select-none">{suffix}</span>
        )}
      </div>
      {helper && <p className="text-[10.5px] text-slate-400">{helper}</p>}
    </div>
  );
}

/* ── Log table row ──────────────────────────────────────── */
const LOG_ROWS = [
  {
    ts: "14:32:01",
    user: "usr_102230046",
    action: "Tải lên video",
    status: "Thành công",
    statusColor: "text-emerald-600",
    statusBg: "bg-emerald-50 border-emerald-200",
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#16A34A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
    size: "48 MB",
    duration: "2.1s",
  },
  {
    ts: "14:28:15",
    user: "usr_99887711",
    action: "Phân tích AI",
    status: "Đang xử lý",
    statusColor: "text-violet-700",
    statusBg: "bg-violet-50 border-violet-200",
    icon: <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse inline-block" />,
    size: "—",
    duration: "đang chạy",
  },
  {
    ts: "14:21:44",
    user: "usr_77340021",
    action: "Xuất PDF",
    status: "Thành công",
    statusColor: "text-emerald-600",
    statusBg: "bg-emerald-50 border-emerald-200",
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#16A34A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
    size: "1.2 MB",
    duration: "0.4s",
  },
  {
    ts: "14:17:09",
    user: "usr_44512983",
    action: "Tải lên video",
    status: "Thất bại",
    statusColor: "text-red-600",
    statusBg: "bg-red-50 border-red-200",
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="#DC2626" strokeWidth="1.6" strokeLinecap="round" /></svg>
    ),
    size: "120 MB",
    duration: "—",
  },
];

/* ── Donut mini-chart ───────────────────────────────────── */
function Donut({ pct, color, size = 52 }: { pct: number; color: string; size?: number }) {
  const r = size / 2 - 5, circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F1F5F9" strokeWidth="5" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${(pct / 100) * circ} ${circ}`} strokeLinecap="round" />
    </svg>
  );
}

/* ── Main ───────────────────────────────────────────────── */
interface AdminPageProps {
  onNav: (view: string) => void;
  userRole: UserRole;
}

export default function AdminPage({ onNav, userRole }: AdminPageProps) {
  const [maxUploads, setMaxUploads] = useState("5");
  const [timeWindow, setTimeWindow] = useState("10");
  const [saved, setSaved] = useState(false);
  const [logFilter, setLogFilter] = useState("Tất cả");

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const filteredLogs = logFilter === "Tất cả" ? LOG_ROWS : LOG_ROWS.filter((r) => r.status === logFilter);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>

      <Sidebar userRole={userRole} activeItem="config" onNav={onNav} />

      {/* ── MAIN ────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* Header */}
        <div className="bg-white border-b border-slate-100 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-[22px] font-bold text-slate-900 tracking-tight leading-none">Quản trị hệ thống</h1>
              <p className="text-[12px] text-slate-400 mt-1">AI Presentation Coach · Bảng cấu hình backend</p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[12px] font-bold px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Hệ thống ổn định
            </div>
          </div>
          <div className="flex items-center gap-3 text-[12px] text-slate-400">
            <span className="font-mono">Last sync: 14:32:01</span>
            <button className="border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all">
              ↻ Refresh
            </button>
          </div>
        </div>

        <div className="px-8 py-6 space-y-5">

          {/* ── TOP ROW: Health cards ─────────────── */}
          <div className="grid grid-cols-3 gap-5">

            {/* Card 1: Redis Queue */}
            <div className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="4" width="14" height="3" rx="1" stroke="#7C3AED" strokeWidth="1.3" /><rect x="1" y="9" width="14" height="3" rx="1" stroke="#7C3AED" strokeWidth="1.3" /><circle cx="3" cy="5.5" r="0.8" fill="#7C3AED" /><circle cx="3" cy="10.5" r="0.8" fill="#7C3AED" /></svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-slate-800">Hàng đợi AI Worker</p>
                    <p className="text-[10.5px] text-slate-400">Redis · Trực tiếp</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-600" />
                  </span>
                  <span className="text-[11px] font-semibold text-violet-600">Live</span>
                </div>
              </div>

              {/* Stat trio */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Tác vụ chờ", value: 12, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200",
                    spark: [3,5,8,12,10,12], sparkColor: "#F59E0B" },
                  { label: "Worker đang chạy", value: 4, color: "text-violet-700", bg: "bg-violet-50", border: "border-violet-200",
                    spark: [4,4,3,4,4,4], sparkColor: "#7C3AED" },
                  { label: "Tác vụ lỗi", value: 0, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200",
                    spark: [1,0,1,0,0,0], sparkColor: "#22C55E" },
                ].map(({ label, value, color, bg, border, spark, sparkColor }) => (
                  <div key={label} className={`${bg} border ${border} rounded-2xl p-4 flex flex-col gap-3`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[11px] font-semibold text-slate-500 leading-tight">{label}</p>
                        <p className={`text-[32px] font-bold ${color} leading-none mt-1`}>{value}</p>
                      </div>
                      <Donut pct={value === 0 ? 0 : value === 4 ? 40 : 60} color={sparkColor} size={40} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Sparkline data={spark} color={sparkColor} />
                      <span className="text-[10px] text-slate-400 font-mono">24h</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Queue bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-medium text-slate-500">
                  <span>Mức sử dụng hàng đợi</span>
                  <span className="font-bold text-amber-600">12 / 50 tối đa</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-violet-600" style={{ width: "24%" }} />
                </div>
              </div>
            </div>

            {/* Card 2: Server Utilization */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="2" stroke="#64748B" strokeWidth="1.3" /><path d="M4 8h3M9 5l3 3-3 3" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-800">Tài nguyên máy chủ</p>
                  <p className="text-[10.5px] text-slate-400">Ubuntu 22.04 · 16 nhân</p>
                </div>
              </div>

              <div className="space-y-4">
                <UtilBar label="Lưu trữ" pct={65} color="linear-gradient(90deg,#818CF8,#7C3AED)" />
                <UtilBar label="Bộ nhớ (RAM)" pct={40} color="linear-gradient(90deg,#34D399,#059669)" />
                <UtilBar label="Tải CPU" pct={28} color="linear-gradient(90deg,#60A5FA,#3B82F6)" />
                <UtilBar label="Mạng I/O" pct={81} color="linear-gradient(90deg,#FB923C,#F97316)" />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-50">
                {[
                  { label: "Uptime", value: "99.97%" },
                  { label: "Khu vực", value: "ap-se-1" },
                  { label: "Node", value: "v20.11", },
                  { label: "GPU", value: "Không" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] text-slate-400 font-medium">{label}</p>
                    <p className="text-[12px] font-bold text-slate-700 font-mono">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── MIDDLE: Rate Limit config ──────────── */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l1.5 4.5H15l-3.75 2.75 1.5 4.5L9 11 5.25 13.75l1.5-4.5L3 6.5h4.5L9 2z" stroke="#7C3AED" strokeWidth="1.4" strokeLinejoin="round" /></svg>
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-slate-800">Cấu hình giới hạn tốc độ Nginx</h2>
                  <p className="text-[12.5px] text-slate-500 mt-0.5">Bảo vệ máy chủ khỏi spam và tràn bộ nhớ.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {saved && (
                  <div className="toast-enter flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#16A34A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Đã lưu
                  </div>
                )}
                <button
                  onClick={handleSave}
                  className="btn-primary bg-violet-700 hover:bg-violet-800 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl shadow-sm shadow-violet-200"
                >
                  Lưu cấu hình
                </button>
              </div>
            </div>

            {/* Config form row */}
            <div className="flex gap-5 items-start">
              <ConfigInput
                label="Tải lên tối đa / IP"
                value={maxUploads}
                onChange={setMaxUploads}
                suffix="lần"
                helper="Số file video tối đa một IP có thể tải lên trong khoảng thời gian."
              />
              <div className="flex items-center self-center pt-4 text-slate-300 font-bold text-lg flex-shrink-0">×</div>
              <ConfigInput
                label="Cửa sổ thời gian"
                value={timeWindow}
                onChange={setTimeWindow}
                suffix="phút"
                helper="Thời gian tính bằng phút trước khi bộ đếm tải lên reset cho một IP."
              />
              <div className="flex-shrink-0 self-center pt-4 space-y-1 text-center hidden lg:block">
                <div className="w-px h-8 bg-slate-200 mx-auto" />
                <p className="text-[10px] text-slate-400 font-mono">= {maxUploads}/{timeWindow} min/IP</p>
              </div>
              <ConfigInput
                label="Dung lượng tối đa"
                value="200"
                onChange={() => {}}
                suffix="MB"
                helper="Giới hạn trên cho mỗi file video tải lên qua Nginx."
              />
            </div>

            {/* Warning banner */}
            <div className="mt-5 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5"><path d="M8 2L1 14h14L8 2z" stroke="#D97706" strokeWidth="1.4" strokeLinejoin="round" /><path d="M8 7v3" stroke="#D97706" strokeWidth="1.4" strokeLinecap="round" /><circle cx="8" cy="12" r="0.75" fill="#D97706" /></svg>
              <p className="text-[12px] text-amber-700 font-medium leading-relaxed">
                <span className="font-bold">Lưu ý:</span> Thay đổi sẽ tải lại Nginx ngay lập tức và ảnh hưởng đến tất cả kết nối đang hoạt động. Phối hợp với nhóm vận hành trước khi giảm giới hạn trong giờ cao điểm.
              </p>
            </div>
          </div>

          {/* ── BOTTOM: Activity logs ──────────────── */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <h2 className="text-[14px] font-bold text-slate-800">Nhật ký hệ thống gần đây</h2>
                <span className="text-[10px] font-bold text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full">
                  {LOG_ROWS.length} entries
                </span>
              </div>
              <div className="flex items-center gap-2">
                {["Tất cả", "Thành công", "Đang xử lý", "Thất bại"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setLogFilter(f)}
                    className={`text-[11px] font-semibold px-3 py-1 rounded-full border transition-all ${logFilter === f ? "bg-violet-700 text-white border-violet-700" : "bg-white text-slate-500 border-slate-200 hover:border-violet-300"}`}
                  >
                    {f}
                  </button>
                ))}
                <button className="ml-2 text-[12px] font-medium text-slate-500 hover:text-slate-700 border border-slate-200 hover:border-slate-300 px-3 py-1 rounded-lg transition-all">
                  Export ↓
                </button>
              </div>
            </div>

            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {["Thời gian", "User ID", "Hành động", "Dung lượng", "Thời lượng", "Trạng thái"].map((h) => (
                    <th key={h} className="text-left text-[10.5px] font-bold text-slate-500 uppercase tracking-wider px-6 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors group"
                  >
                    <td className="px-6 py-3.5">
                      <span className="font-mono text-[12px] text-slate-500">{row.ts}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="font-mono text-[12px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{row.user}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center flex-shrink-0">
                          {row.action === "Tải lên video" ? (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v7M3 5l3-4 3 4" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M1 10h10" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round" /></svg>
                          ) : row.action === "Phân tích AI" ? (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1C6 3.761 3.761 6 1 6c2.761 0 5 2.239 5 5 0-2.761 2.239-5 5-5-2.761 0-5-2.239-5-5z" fill="#7C3AED" /></svg>
                          ) : (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="2" y="1" width="8" height="10" rx="1" stroke="#64748B" strokeWidth="1.3" /><path d="M4 4h4M4 6h4M4 8h2" stroke="#64748B" strokeWidth="1.1" strokeLinecap="round" /></svg>
                          )}
                        </div>
                        <span className="text-[13px] font-medium text-slate-700">{row.action}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-[12px] font-mono text-slate-500">{row.size}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-[12px] font-mono text-slate-500">{row.duration}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className={`inline-flex items-center gap-1.5 text-[11.5px] font-bold px-2.5 py-1 rounded-full border ${row.statusBg} ${row.statusColor}`}>
                        {row.icon}
                        {row.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 text-[11.5px] text-slate-400">
              <span>Hiển thị {filteredLogs.length}/{LOG_ROWS.length} mục nhật ký · Tự động làm mới mỗi 30s</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium text-emerald-600">Đang theo dõi trực tiếp</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
