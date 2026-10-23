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
      className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold px-2.5 py-1 rounded-full"
      style={{
        background: active ? "#ECFDF5" : "#FEF2F2",
        color: active ? "#059669" : "#DC2626",
        border: `1px solid ${active ? "#A7F3D0" : "#FCA5A5"}`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: active ? "#10B981" : "#EF4444" }}
      />
      {active ? "Active" : "Banned"}
    </span>
  );
}

/* ── Toast ───────────────────────────────────────────────── */
function Toast({ message, visible }: { message: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      className="toast-enter fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white text-[13px] font-semibold px-5 py-3 rounded-2xl shadow-2xl"
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

/* ── Confirm modal ───────────────────────────────────────── */
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        onClick={onCancel}
      />
      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[400px] mx-4 overflow-hidden">
        {/* Top accent */}
        <div
          className="h-1 w-full"
          style={{ background: isBan ? "#DC2626" : "#7C3AED" }}
        />
        <div className="px-7 py-6">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: isBan ? "#FEF2F2" : "#EDE9FE" }}
          >
            {isBan ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="9" stroke="#DC2626" strokeWidth="1.6" />
                <path d="M4.5 4.5l13 13" stroke="#DC2626" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="9" stroke="#7C3AED" strokeWidth="1.6" />
                <path d="M7 11.5l3 3 5-5" stroke="#7C3AED" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>

          <h3 className="text-[16px] font-bold text-slate-900 leading-snug">
            {isBan ? "Ban User?" : "Unban User?"}
          </h3>
          <p className="text-[13px] text-slate-500 mt-2 leading-relaxed">
            {isBan
              ? <>You're about to ban <span className="font-semibold text-slate-700">{user.name}</span>. They will lose access to all features immediately.</>
              : <>You're about to restore access for <span className="font-semibold text-slate-700">{user.name}</span>. They will be able to log in again.</>
            }
          </p>

          {/* User chip */}
          <div className="mt-4 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[11px] font-bold">
                {user.name.split(" ").map(w => w[0]).slice(-2).join("")}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-slate-800 truncate">{user.name}</p>
              <p className="text-[11.5px] text-slate-400 truncate">{user.email}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onCancel}
              className="flex-1 text-[13px] font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 bg-white py-2.5 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 text-[13px] font-semibold text-white py-2.5 rounded-xl transition-all active:scale-[0.98]"
              style={{
                background: isBan ? "#DC2626" : "#7C3AED",
                boxShadow: isBan ? "0 2px 8px rgba(220,38,38,0.25)" : "0 2px 8px rgba(109,40,217,0.25)",
              }}
            >
              {isBan ? "Yes, Ban User" : "Yes, Restore Access"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */
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
        ? `${user.name} has been banned.`
        : `${user.name}'s access has been restored.`
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
    <div className="flex h-screen bg-[#F7F8FB] overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      <Sidebar userRole="admin" activeItem="users" onNav={onNav} />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* ── Page header ────────────────────────────────── */}
        <div className="bg-white border-b border-slate-100 px-10 py-7 flex-shrink-0">
          <div className="flex items-center justify-between gap-6">
            <div>
              <h1 className="text-[27px] font-bold text-slate-900 tracking-tight leading-none">
                Users Management
              </h1>
              <p className="text-[13px] text-slate-400 mt-1.5">
                View, search, and manage all registered student accounts
              </p>
            </div>

            {/* Search bar */}
            <div className="relative flex-shrink-0 w-[280px]">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
                width="15" height="15" viewBox="0 0 15 15" fill="none"
              >
                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search by name or ID..."
                className="w-full bg-slate-50 border border-slate-200 text-[13px] text-slate-700 font-medium rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-violet-400 focus:bg-white"
                style={{ boxShadow: "none" }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.10)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />
            </div>
          </div>
        </div>

        {/* ── Content ─────────────────────────────────────── */}
        <div className="flex-1 px-10 py-8">

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              {
                label: "Total Users",
                value: TOTAL,
                sub: "+12 this week",
                color: "#7C3AED",
                bg: "#EDE9FE",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="7" cy="6" r="3" stroke="#7C3AED" strokeWidth="1.5" />
                    <path d="M2 15c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M13 8v4M15 10h-4" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                label: "Active Users",
                value: users.filter((u) => u.status === "active").length,
                sub: "currently enabled",
                color: "#059669",
                bg: "#ECFDF5",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="7" stroke="#059669" strokeWidth="1.5" />
                    <path d="M6 9l2 2 4-4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                label: "Banned Users",
                value: users.filter((u) => u.status === "banned").length,
                sub: "access revoked",
                color: "#DC2626",
                bg: "#FEF2F2",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="7" stroke="#DC2626" strokeWidth="1.5" />
                    <path d="M4 4l10 10" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
            ].map(({ label, value, sub, color, bg, icon }) => (
              <div
                key={label}
                className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4"
                style={{ border: "1px solid #EEF2F7", boxShadow: "0 1px 3px rgba(15,23,42,0.05)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: bg }}
                >
                  {icon}
                </div>
                <div>
                  <p className="text-[24px] font-bold leading-none" style={{ color }}>
                    {value}
                  </p>
                  <p className="text-[12px] font-semibold text-slate-500 mt-0.5">{label}</p>
                  <p className="text-[11px] text-slate-400">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Table card */}
          <div
            className="bg-white rounded-2xl overflow-hidden"
            style={{ border: "1px solid #EEF2F7", boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)" }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid #F1F5F9", background: "#FAFBFC" }}>
                  {["User ID", "Full Name", "Email", "Total Sessions", "Status", "Action"].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest px-6 py-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                          <circle cx="20" cy="20" r="18" stroke="#E2E8F0" strokeWidth="2" />
                          <path d="M14 20h12M20 14v12" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <p className="text-[13px] font-semibold text-slate-400">No users found</p>
                        <p className="text-[12px] text-slate-300">Try adjusting your search query</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((user, idx) => {
                    const isBanned = user.status === "banned";
                    return (
                      <tr
                        key={user.id}
                        className="group transition-colors duration-100 hover:bg-slate-50/70"
                        style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #F8FAFC" : "none" }}
                      >
                        {/* User ID */}
                        <td className="px-6 py-4">
                          <span className="text-[12px] font-mono font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                            {user.id}
                          </span>
                        </td>

                        {/* Full Name */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                              <span className="text-white text-[10px] font-bold">
                                {user.name.split(" ").map(w => w[0]).slice(-2).join("")}
                              </span>
                            </div>
                            <span className="text-[13.5px] font-semibold text-slate-800">
                              {user.name}
                            </span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-6 py-4">
                          <span className="text-[13px] text-slate-500">{user.email}</span>
                        </td>

                        {/* Sessions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[14px] font-bold text-slate-800">{user.sessions}</span>
                            {user.sessions > 0 && (
                              <div className="flex gap-0.5">
                                {Array.from({ length: Math.min(user.sessions, 5) }).map((_, i) => (
                                  <div
                                    key={i}
                                    className="w-1 rounded-full bg-violet-300"
                                    style={{ height: `${6 + i * 2}px` }}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <StatusBadge status={user.status} />
                        </td>

                        {/* Action */}
                        <td className="px-6 py-4">
                          {isBanned ? (
                            <button
                              onClick={() => setModal({ user, action: "unban" })}
                              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white bg-violet-700 hover:bg-violet-800 active:scale-[0.97] px-4 py-1.5 rounded-lg transition-all"
                              style={{ boxShadow: "0 1px 4px rgba(109,40,217,0.22)" }}
                            >
                              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                                <circle cx="5.5" cy="5.5" r="4.5" stroke="white" strokeWidth="1.2" />
                                <path d="M3.5 5.5l1.5 1.5 2.5-2.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              Unban
                            </button>
                          ) : (
                            <button
                              onClick={() => setModal({ user, action: "ban" })}
                              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-red-600 border border-red-300 hover:bg-red-50 hover:border-red-400 active:scale-[0.97] bg-white px-4 py-1.5 rounded-lg transition-all"
                            >
                              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                                <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M2 2l7 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                              </svg>
                              Ban
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            {/* Pagination footer */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderTop: "1px solid #F1F5F9" }}
            >
              <p className="text-[12.5px] text-slate-400 font-medium">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {(page - 1) * PAGE_SIZE + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-slate-700">
                  {Math.min(page * PAGE_SIZE, TOTAL)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">{TOTAL}</span> users
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold px-4 py-2 rounded-xl border transition-all"
                  style={{
                    color: page === 1 ? "#CBD5E1" : "#475569",
                    borderColor: page === 1 ? "#F1F5F9" : "#E2E8F0",
                    cursor: page === 1 ? "not-allowed" : "pointer",
                    background: "white",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Prev
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                    const p = i + 1;
                    const active = p === page;
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className="w-8 h-8 rounded-lg text-[12.5px] font-semibold transition-all"
                        style={{
                          background: active ? "#7C3AED" : "transparent",
                          color: active ? "white" : "#64748B",
                        }}
                      >
                        {p}
                      </button>
                    );
                  })}
                  {totalPages > 5 && (
                    <>
                      <span className="text-slate-300 text-[12px] px-1">…</span>
                      <button
                        onClick={() => setPage(totalPages)}
                        className="w-8 h-8 rounded-lg text-[12.5px] font-semibold text-slate-500 hover:bg-slate-100 transition-all"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold px-4 py-2 rounded-xl border transition-all"
                  style={{
                    color: page === totalPages ? "#CBD5E1" : "#475569",
                    borderColor: page === totalPages ? "#F1F5F9" : "#E2E8F0",
                    cursor: page === totalPages ? "not-allowed" : "pointer",
                    background: "white",
                  }}
                >
                  Next
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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

      {toast && <Toast key={toast.key} message={toast.msg} visible={!!toast} />}
    </div>
  );
}
