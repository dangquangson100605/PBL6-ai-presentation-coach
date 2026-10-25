import { useState } from "react";
import Sidebar from "./Sidebar";
import { User, UserStatus as Status } from "./types";
import { SEED_USERS } from "./mocks/mockUsers";

const PAGE_SIZE = 10;
const TOTAL = 150;

/* ── Status badge ────────────────────────────────────────── */
function StatusBadge({ status }: { status: Status }) {
  const active = status === "active";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
        active
          ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
          : "bg-rose-50 text-rose-700 border-rose-200/60"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-rose-500"}`} />
      {active ? "Hoạt động" : "Bị khóa"}
    </span>
  );
}

/* ── Toast ───────────────────────────────────────────────── */
function Toast({ message, visible }: { message: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-gray-900 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-lg">
      <span className="text-emerald-400">✓</span>
      {message}
    </div>
  );
}

/* ── Confirm Modal ───────────────────────────────────────── */
function ConfirmModal({
  user,
  action,
  onConfirm,
  onCancel,
}: {
  user: User;
  action: "ban" | "unban";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const isBan = action === "ban";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-sm p-6 space-y-4">
        <h3 className="text-base font-bold text-gray-900 leading-snug">
          {isBan ? "Khóa tài khoản người dùng?" : "Mở khóa tài khoản?"}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          {isBan
            ? <>Bạn sắp khóa tài khoản <span className="font-semibold text-gray-800">{user.name}</span>. Sinh viên này sẽ không thể tiếp tục đăng nhập.</>
            : <>Khôi phục quyền truy cập cho <span className="font-semibold text-gray-800">{user.name}</span>.</>}
        </p>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 text-xs font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 py-2 rounded-lg transition-colors"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 text-xs font-medium text-white py-2 rounded-lg transition-colors shadow-sm ${
              isBan ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-500 hover:bg-emerald-600"
            }`}
          >
            {isBan ? "Xác nhận khóa" : "Mở khóa"}
          </button>
        </div>
      </div>
    </div>
  );
}

interface UsersPageProps {
  onNav: (view: string) => void;
}

export default function UsersPage({ onNav }: UsersPageProps) {
  const [users, setUsers] = useState<User[]>(SEED_USERS);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<{ msg: string; key: number } | null>(null);
  const [modal, setModal] = useState<{ user: User; action: "ban" | "unban" } | null>(null);

  function showToast(msg: string) {
    setToast({ msg, key: Date.now() });
    setTimeout(() => setToast(null), 3200);
  }

  function handleConfirm() {
    if (!modal) return;
    const { user, action } = modal;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, status: action === "ban" ? "banned" : "active" } : u
      )
    );
    showToast(
      action === "ban"
        ? `Đã khóa tài khoản ${user.name}.`
        : `Đã mở khóa tài khoản ${user.name}.`
    );
    setModal(null);
  }

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(TOTAL / PAGE_SIZE);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-gray-900 antialiased">
      <Sidebar userRole="admin" activeItem="users" onNav={onNav} />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight leading-none">
              Quản lý người dùng
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Danh sách tài khoản sinh viên và quyền truy cập hệ thống
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-64">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
              width="14"
              height="14"
              viewBox="0 0 15 15"
              fill="none"
            >
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Tìm theo tên hoặc MSSV..."
              className="w-full bg-gray-50 border border-gray-200 text-xs text-gray-800 font-medium rounded-lg pl-9 pr-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-colors"
            />
          </div>
        </header>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Stat Cards (Clean Standard SaaS) */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Tổng người dùng", value: TOTAL, sub: "+12 tuần này" },
              { label: "Đang hoạt động", value: users.filter((u) => u.status === "active").length, sub: "Tài khoản bình thường", highlight: true },
              { label: "Tài khoản bị khóa", value: users.filter((u) => u.status === "banned").length, sub: "Tạm đình chỉ" },
            ].map(({ label, value, sub, highlight }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-1">
                <p className="text-xs font-medium text-gray-500">{label}</p>
                <p className={`text-2xl font-bold ${highlight ? "text-emerald-600" : "text-gray-900"}`}>{value}</p>
                <p className="text-[11px] text-gray-400">{sub}</p>
              </div>
            ))}
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-200/80 text-gray-500 uppercase tracking-wider font-semibold">
                  <th className="px-6 py-3.5">Mã người dùng</th>
                  <th className="px-6 py-3.5">Họ và tên</th>
                  <th className="px-6 py-3.5">Email</th>
                  <th className="px-6 py-3.5">Số phiên luyện</th>
                  <th className="px-6 py-3.5">Trạng thái</th>
                  <th className="px-6 py-3.5">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((user) => {
                  const isBanned = user.status === "banned";
                  return (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-3.5 font-mono text-gray-500">{user.id}</td>
                      <td className="px-6 py-3.5 font-semibold text-gray-900">{user.name}</td>
                      <td className="px-6 py-3.5 text-gray-500">{user.email}</td>
                      <td className="px-6 py-3.5 font-medium text-gray-700">{user.sessions} phiên</td>
                      <td className="px-6 py-3.5">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-6 py-3.5">
                        {isBanned ? (
                          <button
                            type="button"
                            onClick={() => setModal({ user, action: "unban" })}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                          >
                            Mở khóa
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setModal({ user, action: "ban" })}
                            className="border border-gray-300 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 text-gray-700 font-medium text-xs px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Khóa
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 text-xs text-gray-500">
              <span>Hiển thị {filtered.length}/{TOTAL} người dùng</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-2.5 py-1 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                <span className="px-2 font-medium text-gray-700">{page} / {totalPages}</span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-2.5 py-1 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {modal && (
        <ConfirmModal
          user={modal.user}
          action={modal.action}
          onConfirm={handleConfirm}
          onCancel={() => setModal(null)}
        />
      )}

      <Toast message={toast?.msg || ""} visible={Boolean(toast)} />
    </div>
  );
}
