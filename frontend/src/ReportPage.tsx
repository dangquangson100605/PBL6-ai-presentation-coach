import { useState } from "react";
import Sidebar, { UserRole } from "./Sidebar";
import { Button, Card, Badge } from "./components/common";

/* ── Radar Chart (Standardized Deep Forest Green) ─────────────── */
function RadarChart() {
  const cx = 110,
    cy = 110,
    r = 76;
  const axes = [
    { label: "Tốc độ (WPM)", angle: -90, value: 0.62 },
    { label: "Giao tiếp mắt", angle: -18, value: 0.88 },
    { label: "Cảm xúc", angle: 54, value: 0.74 },
    { label: "Ngôn ngữ cơ thể", angle: 126, value: 0.68 },
    { label: "Âm lượng giọng", angle: 198, value: 0.8 },
  ];

  const toXY = (angle: number, radius: number) => ({
    x: cx + radius * Math.cos((angle * Math.PI) / 180),
    y: cy + radius * Math.sin((angle * Math.PI) / 180),
  });

  const rings = [0.25, 0.5, 0.75, 1];
  const dataPoints = axes.map((a) => toXY(a.angle, r * a.value));
  const dataPath =
    dataPoints
      .map(
        (p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`
      )
      .join(" ") + " Z";

  return (
    <svg viewBox="0 0 220 220" className="w-full max-w-[210px]">
      <defs>
        <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#276749" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#276749" stopOpacity="0.06" />
        </linearGradient>
      </defs>

      {/* Grid rings */}
      {rings.map((s) => {
        const pts = axes.map((a) => toXY(a.angle, r * s));
        const d =
          pts
            .map(
              (p, i) =>
                `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`
            )
            .join(" ") + " Z";
        return (
          <path
            key={s}
            d={d}
            fill="none"
            stroke="#DCE5DF"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis spokes */}
      {axes.map((a) => {
        const end = toXY(a.angle, r);
        return (
          <line
            key={a.label}
            x1={cx}
            y1={cy}
            x2={end.x.toFixed(1)}
            y2={end.y.toFixed(1)}
            stroke="#DCE5DF"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon */}
      <path
        d={dataPath}
        fill="url(#radarFill)"
        stroke="#276749"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3.5"
          fill="#276749"
          stroke="white"
          strokeWidth="1.5"
        />
      ))}

      {/* Labels */}
      {axes.map((a) => {
        const pos = toXY(a.angle, r + 15);
        return (
          <text
            key={a.label}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fontWeight="500"
            fill="#69766F"
            fontFamily="Inter, sans-serif"
          >
            {a.label}
          </text>
        );
      })}
    </svg>
  );
}

/* ── Timeline markers with visual symbol & label ───────────── */
const MARKERS = [
  {
    pct: 22,
    color: "#C24141",
    symbol: "⚠️",
    label: "Nói từ đệm liên tục — 4× 'ừm'",
    severity: "Cần lưu ý",
  },
  {
    pct: 47,
    color: "#B7791F",
    symbol: "⚡",
    label: "Tốc độ nói tăng lên 190 WPM",
    severity: "Nhẹ",
  },
  {
    pct: 71,
    color: "#B7791F",
    symbol: "⚡",
    label: "Mất giao tiếp mắt trong 8 giây",
    severity: "Nhẹ",
  },
];

/* ── Score ring (Deep Forest Green) ─────────────────────────── */
function ScoreRing({ score }: { score: number }) {
  const R = 44,
    sw = 6.5;
  const circ = 2 * Math.PI * (R - sw / 2);
  const dash = (score / 100) * circ;
  return (
    <svg
      width={R * 2}
      height={R * 2}
      viewBox={`0 0 ${R * 2} ${R * 2}`}
      className="-rotate-90"
    >
      <circle
        cx={R}
        cy={R}
        r={R - sw / 2}
        fill="none"
        stroke="#DCE5DF"
        strokeWidth={sw}
      />
      <circle
        cx={R}
        cy={R}
        r={R - sw / 2}
        fill="none"
        stroke="#276749"
        strokeWidth={sw}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Unified Metric Bar ─────────────────────────────────── */
function MetricBar({
  label,
  value,
  max = 100,
  unit = "%",
}: {
  label: string;
  value: number;
  max?: number;
  unit?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[12px]">
        <span className="font-medium text-[#69766F]">{label}</span>
        <span className="font-semibold text-[#24312B]">
          {value}
          {unit}
        </span>
      </div>
      <div className="h-1.5 bg-[#DCE5DF] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-[#276749] transition-all"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
}

/* ── Main Report Page ─────────────────────────────────────── */
interface ReportPageProps {
  onNav: (view: string) => void;
  userRole: UserRole;
}

export default function ReportPage({ onNav, userRole }: ReportPageProps) {
  const [hoverMarker, setHoverMarker] = useState<number | null>(null);
  const [playhead, setPlayhead] = useState(34);

  return (
    <div className="flex h-screen bg-[#F5F7F6] overflow-hidden font-[Inter,sans-serif] text-[#24312B]">
      <Sidebar userRole={userRole} activeItem="dashboard" onNav={onNav} />

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex-shrink-0 bg-white border-b border-[#DCE5DF] flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNav("history")}
              className="p-1.5 rounded-lg text-[#69766F] hover:text-[#24312B] hover:bg-[#F5F7F6] transition-colors"
              title="Quay lại lịch sử"
              aria-label="Quay lại lịch sử"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 19l-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[15.5px] font-bold text-[#24312B] leading-tight">
                  Luyện tập bảo vệ đề án — Tuần 5
                </h1>
                <Badge variant="primary">Báo cáo hoàn chỉnh</Badge>
              </div>
              <p className="text-[12px] text-[#69766F] mt-0.5">
                Ngày ghi: 11/09/2026 · Thời lượng: 4 phút 32 giây · Ngữ cảnh: Bảo vệ đề án
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            leftIcon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3v12M7 10l5 5 5-5M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            Xuất PDF
          </Button>
        </header>

        {/* Body Layout: 60 / 40 Split */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
          {/* ── LEFT: Video, Timeline & Transcript (60%) ───── */}
          <div className="flex-1 lg:flex-[6] min-w-0 flex flex-col overflow-y-auto p-5 space-y-4 border-r border-[#DCE5DF]">
            {/* Video Player Box */}
            <div
              className="rounded-xl overflow-hidden bg-[#1A231F] border border-[#DCE5DF] shadow-sm relative"
              style={{ aspectRatio: "16/9" }}
            >
              <img
                src="https://images.unsplash.com/photo-1758876020207-67890de8aa73?w=900&h=506&fit=crop&auto=format"
                alt="Recorded presentation session"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

              {/* Top Session Info Pill */}
              <div className="absolute top-3 left-3">
                <span className="bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-md border border-white/10">
                  Phiên #47 — Video đã lưu
                </span>
              </div>

              {/* Top-right Duration Pill */}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11.5px] font-mono font-medium px-2.5 py-1 rounded-md border border-white/10">
                04:32
              </div>

              {/* Bottom Playback Controls */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex flex-col gap-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={playhead}
                  onChange={(e) => setPlayhead(Number(e.target.value))}
                  className="w-full h-1 accent-[#276749] cursor-pointer"
                />
                <div className="flex items-center justify-between text-[12px] text-white">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      className="w-7 h-7 rounded-md bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    >
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path d="M3 2l7 4-7 4V2z" fill="white" />
                      </svg>
                    </button>
                    <span className="font-mono text-white/90 text-[12px]">
                      {`0${Math.floor((playhead / 100) * 4)}:${String(
                        Math.floor((playhead / 100) * 60) % 60
                      ).padStart(2, "0")}`}{" "}
                      / 04:32
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11.5px] text-white/80">
                    <button
                      type="button"
                      className="hover:text-white px-1.5 py-0.5 rounded"
                    >
                      0.5×
                    </button>
                    <button
                      type="button"
                      className="text-white font-semibold bg-white/20 px-1.5 py-0.5 rounded"
                    >
                      1×
                    </button>
                    <button
                      type="button"
                      className="hover:text-white px-1.5 py-0.5 rounded"
                    >
                      1.5×
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Timeline & Warnings */}
            <Card className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold text-[#69766F] uppercase tracking-wider">
                  Dòng thời gian sự kiện
                </p>
                <div className="flex items-center gap-3 text-[11.5px] text-[#69766F]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#C24141]" />
                    <span>⚠️ Cần lưu ý</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#B7791F]" />
                    <span>⚡ Nhẹ</span>
                  </span>
                </div>
              </div>

              {/* Timeline Track with Markers */}
              <div className="relative h-7 flex items-center">
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 bg-[#DCE5DF] rounded-full" />
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-[#E8F1EB] rounded-full"
                  style={{ width: `${playhead}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#276749] border-2 border-white shadow-sm z-20"
                  style={{ left: `calc(${playhead}% - 7px)` }}
                />

                {MARKERS.map((m, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                    style={{ left: `calc(${m.pct}% - 6px)` }}
                    onMouseEnter={() => setHoverMarker(i)}
                    onMouseLeave={() => setHoverMarker(null)}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm"
                      style={{ background: m.color }}
                    />
                    {hoverMarker === i && (
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#24312B] text-white text-[11px] font-medium px-2.5 py-1 rounded-md whitespace-nowrap shadow-md z-30 pointer-events-none">
                        {m.symbol} {m.severity}: {m.label}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Marker Legend Detailed List */}
              <div className="flex flex-col gap-2 pt-2 border-t border-[#DCE5DF]">
                {MARKERS.map((m, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[12px]">
                    <span className="text-[12px]">{m.symbol}</span>
                    <span
                      className={`font-semibold ${
                        m.severity === "Cần lưu ý"
                          ? "text-[#C24141]"
                          : "text-[#B7791F]"
                      }`}
                    >
                      {m.severity}:
                    </span>
                    <span className="text-[#24312B]">{m.label}</span>
                    <span className="ml-auto text-[#69766F] font-mono text-[11px]">
                      {`${Math.floor((m.pct / 100) * 4)}:${String(
                        Math.floor((m.pct / 100) * 272) % 60
                      ).padStart(2, "0")}`}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Speech Transcript */}
            <Card className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold text-[#69766F] uppercase tracking-wider">
                  Bản ghi lời nói (Transcript)
                </p>
                <Badge variant="warning">Phát hiện 5 từ đệm</Badge>
              </div>
              <p className="text-[13px] text-[#24312B] leading-relaxed">
                Xin chào mọi người,{" "}
                <mark className="bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] font-medium px-1.5 py-0.5 rounded">
                  ừm
                </mark>
                , hôm nay nhóm chúng em xin trình bày dự án về hệ thống huấn luyện
                thuyết trình bằng AI. Nhóm chúng em đã làm việc trong{" "}
                <mark className="bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] font-medium px-1.5 py-0.5 rounded">
                  à
                </mark>
                , tám tuần qua. Nền tảng sử dụng MediaPipe và Google Gemini để
                cung cấp phản hồi thời gian thực về giao tiếp mắt, tốc độ nói và{" "}
                <mark className="bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] font-medium px-1.5 py-0.5 rounded">
                  ừm
                </mark>
                , ngôn ngữ cơ thể. Chúng em tin rằng{" "}
                <mark className="bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] font-medium px-1.5 py-0.5 rounded">
                  kiểu như
                </mark>
                , luyện tập đều đặn sẽ dẫn đến sự tự tin khi thuyết trình. Hãy để
                chúng em trình bày demo hôm nay.{" "}
                <mark className="bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] font-medium px-1.5 py-0.5 rounded">
                  Ừm
                </mark>
                , bắt đầu với tổng quan kiến trúc hệ thống.
              </p>
            </Card>
          </div>

          {/* ── RIGHT: Prioritized Evaluation & Analysis (40%) ─── */}
          <div className="flex-1 lg:flex-[4] min-w-0 flex flex-col gap-4 overflow-y-auto p-5">
            {/* 1. TỔNG QUAN & ĐIỂM SỐ CHÍNH */}
            <Card className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold text-[#69766F] uppercase tracking-wider">
                  1. Tổng quan &amp; Điểm số chính
                </p>
                <Badge variant="success">Đạt yêu cầu</Badge>
              </div>

              <div className="flex items-center gap-5">
                <div className="relative flex-shrink-0">
                  <ScoreRing score={85} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[24px] font-bold text-[#24312B] leading-none">
                      85
                    </span>
                    <span className="text-[10px] font-semibold text-[#69766F] uppercase tracking-wide">
                      / 100
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <MetricBar label="Giao tiếp mắt" value={88} />
                  <MetricBar label="Tốc độ nói" value={62} />
                  <MetricBar label="Độ tự tin" value={80} />
                  <MetricBar label="Hạn chế từ đệm" value={75} />
                </div>
              </div>

              {/* Grade Banner */}
              <div className="flex items-center gap-3 bg-[#F5F7F6] border border-[#DCE5DF] rounded-xl p-3 text-[12px]">
                <div className="w-9 h-9 rounded-lg bg-[#E8F1EB] border border-[#D4E5D9] font-bold text-[#276749] text-base flex items-center justify-center flex-shrink-0">
                  B+
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#24312B]">Trên trung bình</p>
                  <p className="text-[#69766F] text-[11px] truncate">
                    Xếp hạng top 30% sinh viên trong tháng này
                  </p>
                </div>
                <div className="ml-auto font-medium text-[#276749] text-right whitespace-nowrap">
                  +4 điểm vs tuần trước
                </div>
              </div>
            </Card>

            {/* 2. NHỮNG ĐIỂM LÀM TỐT */}
            <Card className="p-4 space-y-2 border-l-4 border-l-[#276749]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🌟</span>
                  <span className="text-[12px] font-bold text-[#24312B] uppercase tracking-wider">
                    2. Những điểm làm tốt
                  </span>
                </div>
                <Badge variant="success">Điểm mạnh</Badge>
              </div>

              <p className="text-[12.5px] font-semibold text-[#24312B]">
                Giao tiếp mắt xuất sắc (88% thời lượng)
              </p>
              <p className="text-[12px] text-[#69766F] leading-relaxed">
                Bạn duy trì giao tiếp mắt rất tốt với người nghe qua camera trong
                suốt phiên — vượt xa mức chuẩn đề xuất là 70%. Cử chỉ tự nhiên và
                tập trung giúp tạo dựng niềm tin và sự hiện diện vững vàng.
              </p>
            </Card>

            {/* 3. NHỮNG ĐIỂM CẦN CẢI THIỆN */}
            <Card className="p-4 space-y-2 border-l-4 border-l-[#B7791F]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">⚠️</span>
                  <span className="text-[12px] font-bold text-[#24312B] uppercase tracking-wider">
                    3. Những điểm cần cải thiện
                  </span>
                </div>
                <Badge variant="warning">Cần tối ưu</Badge>
              </div>

              <p className="text-[12.5px] font-semibold text-[#24312B]">
                5 từ đệm ("ừm", "à") · Tốc độ nói 175 WPM (Hơi nhanh)
              </p>
              <p className="text-[12px] text-[#69766F] leading-relaxed">
                Tốc độ nói trung bình vượt quá ngưỡng lý tưởng từ 130–160 WPM. Việc
                chủ động nói chậm lại ở các đoạn giới thiệu định nghĩa sẽ giúp hội
                đồng tiếp thu các luận điểm kỹ thuật dễ dàng hơn.
              </p>
            </Card>

            {/* 4. CÁC CHỈ SỐ CHI TIẾT & BIỂU ĐỒ (RADAR) */}
            <Card className="p-5 space-y-3">
              <p className="text-[12px] font-semibold text-[#69766F] uppercase tracking-wider">
                4. Phân tích đa chiều (Biểu đồ Radar)
              </p>
              <div className="flex flex-col items-center gap-3">
                <RadarChart />
                <div className="grid grid-cols-5 gap-1.5 w-full pt-2 border-t border-[#DCE5DF] text-center">
                  {[
                    { label: "WPM", value: "62%" },
                    { label: "Mắt", value: "88%" },
                    { label: "Cảm xúc", value: "74%" },
                    { label: "Cơ thể", value: "68%" },
                    { label: "Âm lượng", value: "80%" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <span className="text-[12px] font-bold text-[#24312B] block">
                        {value}
                      </span>
                      <span className="text-[10px] text-[#69766F] font-medium">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* 5. KHUYẾN NGHỊ LUYỆN TẬP TIẾP THEO */}
            <Card className="p-4 space-y-2 border-l-4 border-l-[#276749]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🎯</span>
                  <span className="text-[12px] font-bold text-[#24312B] uppercase tracking-wider">
                    5. Khuyến nghị luyện tập tiếp theo
                  </span>
                </div>
                <Badge variant="primary">Kế hoạch rèn luyện</Badge>
              </div>

              <p className="text-[12.5px] font-semibold text-[#24312B]">
                Áp dụng bài tập "Dừng lại 1 nhịp &amp; Hít thở"
              </p>
              <p className="text-[12px] text-[#69766F] leading-relaxed">
                Trước khi chuyển đổi sang slide hoặc luận điểm mới, hãy tạm dừng
                1–2 giây thay vì phát âm "ừm" hoặc "à". Thói quen ngắt quãng có chủ
                đích sẽ giúp bài thuyết trình tăng tính thuyết phục và chuyên nghiệp.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
