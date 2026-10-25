import { GeminiIcon } from "./components/icons";
import { useState } from "react";
import Sidebar, { UserRole } from "./Sidebar";

/* ── Shared progress bar (Clean & Unified) ───────────────── */
function UtilBar({ label, pct }: { label: string; pct: number }) {
  const isHigh = pct >= 80;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-xs">
        <span className="font-medium text-gray-600">{label}</span>
        <span className={`font-semibold ${isHigh ? "text-amber-600" : "text-gray-900"}`}>{pct}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${isHigh ? "bg-amber-500" : "bg-emerald-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ── Mini sparkline (Neutral & Professional) ─────────────── */
function Sparkline({ data, color = "#10B981" }: { data: number[]; color?: string }) {
  const max = Math.max(...data), min = Math.min(...data);
  const W = 80, H = 26;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / (max - min || 1)) * H * 0.75 - H * 0.12;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={pts[pts.length - 1].split(",")[0]} cy={pts[pts.length - 1].split(",")[1]} r="2" fill={color} />
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
  return (
    <div className="space-y-1.5 flex-1">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden bg-gray-50 focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-colors">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 text-sm font-semibold text-gray-900 bg-transparent outline-none"
        />
        {suffix && (
          <span className="pr-3 text-xs font-medium text-gray-400 select-none">{suffix}</span>
        )}
      </div>
      {helper && <p className="text-[11px] text-gray-500">{helper}</p>}
    </div>
  );
}

/* ── Donut mini-chart (Clean Light Green) ────────────────── */
function Donut({ pct, size = 38 }: { pct: number; size?: number }) {
  const r = size / 2 - 4, circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F3F4F6" strokeWidth="4" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#10B981"
        strokeWidth="4"
        strokeDasharray={`${(pct / 100) * circ} ${circ}`}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Log table row data ─────────────────────────────────── */
const LOG_ROWS = [
  {
    ts: "14:32:01",
    user: "usr_102230046",
    action: "Tải lên video",
    status: "Thành công",
    statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200/60",
    size: "48 MB",
    duration: "2.1s",
  },
  {
    ts: "14:28:15",
    user: "usr_99887711",
    action: "Phân tích AI",
    status: "Đang xử lý",
    statusColor: "text-gray-700 bg-gray-50 border-gray-200",
    size: "—",
    duration: "đang chạy",
  },
  {
    ts: "14:21:44",
    user: "usr_77340021",
    action: "Xuất PDF",
    status: "Thành công",
    statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200/60",
    size: "1.2 MB",
    duration: "0.4s",
  },
  {
    ts: "14:17:09",
    user: "usr_44512983",
    action: "Tải lên video",
    status: "Thất bại",
    statusColor: "text-rose-700 bg-rose-50 border-rose-200/60",
    size: "120 MB",
    duration: "—",
  },
];

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
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-gray-900 antialiased">
      <Sidebar userRole={userRole} activeItem="config" onNav={onNav} />

      {/* ── MAIN ────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg font-bold text-gray-900 tracking-tight leading-none">Quản trị hệ thống</h1>
              <p className="text-xs text-gray-500 mt-1">AI Presentation Coach · Bảng cấu hình và giám sát</p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Hệ thống ổn định
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="font-mono">Cập nhật: 14:32:01</span>
            <button
              type="button"
              className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            >
              Làm mới
            </button>
          </div>
        </header>

        <div className="p-8 space-y-6">
          {/* ── TOP ROW: Health Cards ─────────────── */}
          <div className="grid grid-cols-3 gap-6">
            {/* Card 1: Worker Queue */}
            <div className="col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="1" y="4" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.3" />
                      <rect x="1" y="9" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.3" />
                      <circle cx="3" cy="5.5" r="0.8" fill="currentColor" />
                      <circle cx="3" cy="10.5" r="0.8" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Hàng đợi AI Worker</p>
                    <p className="text-xs text-gray-500">Redis · Trực tiếp</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-emerald-700">Đang hoạt động</span>
                </div>
              </div>

              {/* Standard Stat Trio (Clean White Cards) */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Tác vụ chờ", value: 12, spark: [3, 5, 8, 12, 10, 12] },
                  { label: "Worker đang chạy", value: 4, spark: [4, 4, 3, 4, 4, 4] },
                  { label: "Tác vụ lỗi", value: 0, spark: [1, 0, 1, 0, 0, 0] },
                ].map(({ label, value, spark }) => (
                  <div key={label} className="bg-gray-50/70 border border-gray-100 rounded-xl p-4 flex flex-col justify-between gap-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium text-gray-500 leading-tight">{label}</p>
                        <p className="text-2xl font-bold text-gray-900 leading-none mt-1.5">{value}</p>
                      </div>
                      <Donut pct={value === 0 ? 0 : value === 4 ? 40 : 60} />
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <Sparkline data={spark} color="#10B981" />
                      <span className="text-[10px] text-gray-400 font-mono">24h</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Queue Utilization Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-medium text-gray-500">
                  <span>Mức sử dụng hàng đợi</span>
                  <span className="font-semibold text-gray-900">12 / 50 tối đa (24%)</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: "24%" }} />
                </div>
              </div>
            </div>

            {/* Card 2: Server Utilization */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M4 8h3M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Tài nguyên máy chủ</p>
                  <p className="text-xs text-gray-500">Ubuntu 22.04 · 16 nhân</p>
                </div>
              </div>

              {/* Standardized Utilization Bars */}
              <div className="space-y-3 pt-1">
                <UtilBar label="Lưu trữ" pct={65} />
                <UtilBar label="Bộ nhớ (RAM)" pct={40} />
                <UtilBar label="Tải CPU" pct={28} />
                <UtilBar label="Mạng I/O" pct={81} />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
                {[
                  { label: "Uptime", value: "99.97%" },
                  { label: "Khu vực", value: "ap-se-1" },
                  { label: "Node.js", value: "v20.11" },
                  { label: "GPU", value: "Không" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] text-gray-400 font-medium">{label}</p>
                    <p className="text-xs font-semibold text-gray-800 font-mono">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── MIDDLE: Rate Limit Config ──────────── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2l1.5 4.5H15l-3.75 2.75 1.5 4.5L9 11 5.25 13.75l1.5-4.5L3 6.5h4.5L9 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Cấu hình giới hạn tốc độ Nginx</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Bảo vệ máy chủ khỏi spam và tràn bộ nhớ xử lý video.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {saved && (
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-md">
                    ✓ Đã lưu cấu hình
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                  Lưu cấu hình
                </button>
              </div>
            </div>

            {/* Config Form Row */}
            <div className="flex gap-4 items-start">
              <ConfigInput
                label="Tải lên tối đa / IP"
                value={maxUploads}
                onChange={setMaxUploads}
                suffix="lần"
                helper="Số file video tối đa một IP có thể tải lên."
              />
              <div className="flex items-center self-center pt-3 text-gray-300 font-bold text-base flex-shrink-0">/</div>
              <ConfigInput
                label="Cửa sổ thời gian"
                value={timeWindow}
                onChange={setTimeWindow}
                suffix="phút"
                helper="Thời gian trước khi bộ đếm reset cho một IP."
              />
              <div className="flex-shrink-0 self-center pt-4 space-y-1 text-center hidden lg:block">
                <div className="w-px h-6 bg-gray-200 mx-auto" />
                <p className="text-[11px] text-gray-400 font-mono">{maxUploads} req / {timeWindow}m</p>
              </div>
              <ConfigInput
                label="Dung lượng tối đa"
                value="200"
                onChange={() => {}}
                suffix="MB"
                helper="Giới hạn dung lượng tối đa cho mỗi file video."
              />
            </div>

            {/* Neutral Warning Note */}
            <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3.5 text-xs text-gray-600">
              <span className="font-semibold text-gray-800">Lưu ý:</span>
              Thay đổi sẽ tự động nạp lại Nginx và có hiệu lực ngay lập tức. Hãy thông báo trước khi áp dụng trong khung giờ cao điểm.
            </div>
          </div>

          {/* ── BOTTOM: Activity Logs ──────────────── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-semibold text-gray-900">Nhật ký hệ thống gần đây</h2>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md font-mono">
                  {LOG_ROWS.length} bản ghi
                </span>
              </div>
              <div className="flex items-center gap-2">
                {["Tất cả", "Thành công", "Đang xử lý", "Thất bại"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setLogFilter(f)}
                    className={`text-xs font-medium px-3 py-1 rounded-md border transition-colors ${
                      logFilter === f
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-500 uppercase tracking-wider font-semibold">
                  <th className="px-6 py-3">Thời gian</th>
                  <th className="px-6 py-3">User ID</th>
                  <th className="px-6 py-3">Hành động</th>
                  <th className="px-6 py-3">Dung lượng</th>
                  <th className="px-6 py-3">Thời lượng</th>
                  <th className="px-6 py-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLogs.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3 font-mono text-gray-500">{row.ts}</td>
                    <td className="px-6 py-3 font-mono text-gray-700">{row.user}</td>
                    <td className="px-6 py-3 font-medium text-gray-800">{row.action}</td>
                    <td className="px-6 py-3 font-mono text-gray-500">{row.size}</td>
                    <td className="px-6 py-3 font-mono text-gray-500">{row.duration}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${row.statusColor}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
