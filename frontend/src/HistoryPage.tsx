import { useState } from "react";
import Sidebar, { UserRole } from "./Sidebar";
import { CHART_DATA, SESSIONS } from "./mocks/mockHistory";
import { Button, Card, Badge } from "./components/common";

/* ── Clean Line Chart (Standardized Deep Forest Green) ───────── */
function LineChart({
  hoverIdx,
  setHoverIdx,
}: {
  hoverIdx: number | null;
  setHoverIdx: (i: number | null) => void;
}) {
  const W = 700,
    H = 190;
  const padL = 40,
    padR = 20,
    padT = 16,
    padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const minScore = 45,
    maxScore = 100;
  const toX = (i: number) => padL + (i / (CHART_DATA.length - 1)) * chartW;
  const toY = (v: number) =>
    padT + chartH - ((v - minScore) / (maxScore - minScore)) * chartH;

  const pts = CHART_DATA.map((d, i) => ({ x: toX(i), y: toY(d.score) }));
  const linePath = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const areaPath =
    linePath +
    ` L${pts[pts.length - 1].x},${padT + chartH} L${pts[0].x},${padT + chartH} Z`;

  const yTicks = [50, 70, 90];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ height: 200, userSelect: "none" }}
      onMouseLeave={() => setHoverIdx(null)}
    >
      <defs>
        <linearGradient id="lineAreaGrad" x1="0%" y1="0%" x2="0%" y2="1">
          <stop offset="0%" stopColor="#276749" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#276749" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Y-axis gridlines */}
      {yTicks.map((v) => {
        const y = toY(v);
        return (
          <g key={v}>
            <line
              x1={padL}
              y1={y}
              x2={W - padR}
              y2={y}
              stroke="#DCE5DF"
              strokeWidth="1"
            />
            <text
              x={padL - 8}
              y={y + 3.5}
              textAnchor="end"
              fontSize="10"
              fill="#69766F"
              fontFamily="Inter, sans-serif"
              fontWeight="500"
            >
              {v}
            </text>
          </g>
        );
      })}

      {/* Area fill */}
      <path d={areaPath} fill="url(#lineAreaGrad)" />

      {/* Main trend line */}
      <path
        d={linePath}
        fill="none"
        stroke="#276749"
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* X-axis labels + interactive markers */}
      {CHART_DATA.map((d, i) => {
        const x = toX(i);
        const active = hoverIdx === i;
        return (
          <g key={i}>
            {active && (
              <line
                x1={x}
                y1={padT}
                x2={x}
                y2={padT + chartH}
                stroke="#276749"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.6"
              />
            )}
            <circle
              cx={x}
              cy={pts[i].y}
              r={active ? 5.5 : 4}
              fill={active ? "#276749" : "white"}
              stroke="#276749"
              strokeWidth="2"
              style={{ cursor: "pointer", transition: "r 0.15s" }}
            />
            <text
              x={x}
              y={H - 6}
              textAnchor="middle"
              fontSize="10"
              fill={active ? "#24312B" : "#69766F"}
              fontWeight={active ? "600" : "500"}
              fontFamily="Inter, sans-serif"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function MiniBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 bg-[#DCE5DF] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full bg-[#276749]"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

interface HistoryPageProps {
  onNav: (view: string) => void;
  onViewReport: () => void;
  userRole: UserRole;
}

export default function HistoryPage({
  onNav,
  onViewReport,
  userRole,
}: HistoryPageProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [expandedId, setExpandedId] = useState<string | number | null>(null);

  const filters = [
    "Tất cả",
    "Bảo vệ đề án",
    "Phỏng vấn việc làm",
    "Thuyết trình lớp học",
    "Hội thảo",
  ];
  const filtered =
    activeFilter === "Tất cả"
      ? SESSIONS
      : SESSIONS.filter((s) => s.context === activeFilter);

  const avgScore = Math.round(
    SESSIONS.reduce((a, s) => a + s.score, 0) / SESSIONS.length
  );
  const totalMins = SESSIONS.reduce((a, s) => {
    const [m, sec] = s.duration.split(":").map(Number);
    return a + m + sec / 60;
  }, 0);
  const improvement = SESSIONS[0].score - SESSIONS[SESSIONS.length - 1].score;

  return (
    <div className="flex h-screen bg-[#F5F7F6] overflow-hidden font-[Inter,sans-serif] text-[#24312B]">
      <Sidebar userRole={userRole} activeItem="history" onNav={onNav} />

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-[#DCE5DF] px-6 sm:px-8 py-5 flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <h1 className="text-[17px] font-bold text-[#24312B] tracking-tight leading-tight">
                Tiến trình luyện tập
              </h1>
              <p className="text-[12px] text-[#69766F] mt-0.5">
                Theo dõi sự phát triển kỹ năng thuyết trình qua từng phiên
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNav("studio")}
              leftIcon={<span className="text-base font-bold leading-none">+</span>}
            >
              Phiên mới
            </Button>
          </div>

          {/* Unified Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                label: "Tổng số phiên",
                value: String(SESSIONS.length),
                sub: "Toàn bộ thời gian",
              },
              {
                label: "Điểm trung bình",
                value: `${avgScore}/100`,
                sub: "Trên tất cả phiên",
              },
              {
                label: "Thời gian luyện",
                value: `${Math.round(totalMins)} phút`,
                sub: "Tổng thời lượng video",
              },
              {
                label: "Mức cải thiện",
                value: `+${improvement} điểm`,
                sub: "Kể từ phiên đầu tiên",
                highlight: true,
              },
            ].map(({ label, value, sub, highlight }) => (
              <Card
                key={label}
                className="px-4 py-3 space-y-1 bg-[#F5F7F6]/50 border-[#DCE5DF]"
              >
                <p className="text-[11.5px] font-medium text-[#69766F]">{label}</p>
                <p
                  className={`text-[20px] font-bold tracking-tight ${
                    highlight ? "text-[#276749]" : "text-[#24312B]"
                  }`}
                >
                  {value}
                </p>
                <p className="text-[11px] text-[#69766F]">{sub}</p>
              </Card>
            ))}
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* ── Growth Chart Card ─────────────────── */}
          <Card className="p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-[14px] font-semibold text-[#24312B]">
                  Điểm tổng thể — Xu hướng theo tuần
                </h2>
                <p className="text-[12px] text-[#69766F] mt-0.5">
                  Biểu đồ thể hiện điểm đánh giá trung bình qua từng đợt luyện tập
                </p>
              </div>
              <Badge variant="success">+27 điểm trong 4 tuần</Badge>
            </div>

            <LineChart hoverIdx={hoverIdx} setHoverIdx={setHoverIdx} />

            {/* Week Summary Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#DCE5DF]">
              {CHART_DATA.map((d, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-3 transition-colors cursor-pointer border ${
                    hoverIdx === i
                      ? "bg-[#E8F1EB] border-[#D4E5D9]"
                      : "bg-[#F5F7F6]/60 border-[#DCE5DF] hover:bg-[#F5F7F6]"
                  }`}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(null)}
                >
                  <p className="text-[11px] font-medium text-[#69766F]">{d.label}</p>
                  <p className="text-[16px] font-bold text-[#24312B] mt-0.5">
                    {d.score} điểm
                  </p>
                  <p className="text-[11px] text-[#69766F] mt-0.5 truncate">
                    {d.sessions} phiên · {d.topSkill}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* ── Session List ──────────────────────── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-semibold text-[#24312B]">
                Các phiên gần đây
              </h2>
              <span className="text-[12px] text-[#69766F]">
                Hiển thị {filtered.length}/{SESSIONS.length} phiên
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={`text-[12px] font-medium px-3 py-1.5 rounded-lg border transition-all ${
                    activeFilter === f
                      ? "bg-[#276749] text-white border-[#276749] shadow-sm"
                      : "bg-white text-[#69766F] border-[#DCE5DF] hover:bg-[#F5F7F6] hover:text-[#24312B]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Empty State if no sessions match filter */}
            {filtered.length === 0 ? (
              <Card className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#E8F1EB] text-[#276749] flex items-center justify-center mx-auto text-xl">
                  📁
                </div>
                <div className="space-y-1">
                  <p className="text-[14px] font-semibold text-[#24312B]">
                    Chưa có phiên luyện tập nào trong mục này
                  </p>
                  <p className="text-[12px] text-[#69766F] max-w-sm mx-auto">
                    Bạn có thể bắt đầu phiên luyện tập mới ngay bây giờ để nhận phân tích chi tiết từ AI.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNav("studio")}
                  className="mt-2"
                >
                  Bắt đầu phiên luyện tập
                </Button>
              </Card>
            ) : (
              /* Session Rows */
              <div className="space-y-3">
                {filtered.map((s) => {
                  const expanded = expandedId === s.id;
                  return (
                    <Card
                      key={s.id}
                      className="overflow-hidden transition-all p-0"
                    >
                      {/* Main Row */}
                      <div
                        className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 cursor-pointer hover:bg-[#F5F7F6]/50 transition-colors"
                        onClick={() => setExpandedId(expanded ? null : s.id)}
                      >
                        {/* Score Badge */}
                        <div className="w-10 h-10 rounded-xl bg-[#E8F1EB] border border-[#D4E5D9] flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-[14px] font-bold text-[#276749] leading-none">
                            {s.score}
                          </span>
                        </div>

                        {/* Title + Context */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-[13.5px] font-semibold text-[#24312B] truncate">
                              {s.title}
                            </p>
                            <Badge variant="neutral">{s.context}</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-[11.5px] text-[#69766F] mt-1 flex-wrap">
                            <span>{s.date}</span>
                            <span>·</span>
                            <span className="font-mono">{s.duration}</span>
                            {s.trend !== null && (
                              <>
                                <span>·</span>
                                <span className="text-[#276749] font-medium">
                                  +{s.trend} điểm so với trước
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewReport();
                            }}
                          >
                            Xem chi tiết
                          </Button>
                          <button
                            type="button"
                            aria-label="Mở rộng chi tiết phiên"
                            className="p-1 rounded-md text-[#69766F] hover:text-[#24312B]"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              className={`transition-transform duration-200 ${
                                expanded ? "rotate-180" : ""
                              }`}
                            >
                              <path
                                d="M3 5l4 4 4-4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Expanded Detail Panel */}
                      {expanded && (
                        <div className="border-t border-[#DCE5DF] px-4 sm:px-5 py-4 bg-[#F5F7F6]/40 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                              {
                                label: "Giao tiếp mắt",
                                value: s.eyeContact,
                                unit: "%",
                                bar: true,
                              },
                              {
                                label: "Tốc độ nói",
                                value: s.wpm,
                                unit: " WPM",
                                bar: false,
                              },
                              {
                                label: "Từ đệm",
                                value: s.fillerWords,
                                unit: " từ",
                                bar: false,
                              },
                            ].map(({ label, value, unit, bar }) => (
                              <div
                                key={label}
                                className="bg-white rounded-xl border border-[#DCE5DF] p-3 space-y-1 shadow-sm"
                              >
                                <p className="text-[11.5px] text-[#69766F] font-medium">
                                  {label}
                                </p>
                                <p className="text-[16px] font-bold text-[#24312B] leading-none">
                                  {value}
                                  <span className="text-[11.5px] font-medium text-[#69766F] ml-0.5">
                                    {unit}
                                  </span>
                                </p>
                                {bar && <MiniBar value={value as number} />}
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-end pt-1">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => onViewReport()}
                            >
                              Mở báo cáo đầy đủ →
                            </Button>
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
