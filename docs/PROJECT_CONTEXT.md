# PROJECT CONTEXT — AI MULTIMODAL PRESENTATION COACH

## 1. Mục Tiêu Dự Án
* **Đề tài:** Nghiên cứu và Xây dựng Nền tảng Đánh giá Kỹ năng Thuyết trình Tự động Dựa trên Phân tích Thị giác và Nội dung Lời nói (PBL6).
* **Mục tiêu cốt lõi:** Xây dựng hệ thống web hoạt động như một "Huấn luyện viên thuyết trình ảo (AI Presentation Coach)". 
  * Hỗ trợ người dùng quay video trực tiếp từ webcam hoặc tải lên video có sẵn.
  * Phân tích đa phương thức (Multimodal): ánh mắt (eye contact), biểu cảm khuôn mặt (facial emotions), ngôn ngữ cơ thể (body gestures), tốc độ nói (WPM), âm lượng và phát hiện từ đệm (filler words).
  * Trả về bảng điểm chi tiết, biểu đồ mạng nhện (Radar Chart) và các khuyến nghị cải thiện.

## 2. Phân Công Trách Nhiệm (Team Members)
1. **Nguyễn Đỗ Thắng** — Trưởng nhóm (AI Lead: Computer Vision & Machine Learning).
2. **Võ Thành Nhân** — Thành viên (Backend Lead & Quản trị mạng / DevOps).
3. **Đặng Quang Sơn** — Thành viên (Frontend Lead & Kiểm thử phần mềm / QA).

## 3. Kiến Trúc Kỹ Thuật Ổn Định (Frontend)
* **Framework:** React 19 (`react: ^19.0.0`, `react-dom: ^19.0.0`).
* **Build Tooling:** Vite v8 (`vite: ^8.0.5`), TypeScript 5.7.
* **Styling:** Tailwind CSS v4 (`@tailwindcss/vite: ^4.0.0`), Google Fonts (Inter, Instrument Serif).
* **Package Manager:** `npm` (đã chuẩn hóa qua `package-lock.json`, loại bỏ phụ thuộc `pnpm-lock.yaml`).
* **Routing:** `react-router-dom` (v7), kiến trúc Single Page Application với các đường dẫn URL độc lập.
* **State & Authentication:**
  * `AuthContext` kết hợp `localStorage` để duy trì phiên đăng nhập và vai trò (`student` / `admin`) khi F5/reload trang.
  * *Nguyên tắc bảo mật:* Route Guards ở Frontend chỉ phục vụ điều hướng trải nghiệm (UX). Việc xác thực quyền hạn thực sự bắt buộc phải do Backend quản lý qua Bearer Token / Session.
* **Cấu trúc thư mục chuẩn hóa:**
  * `src/components/icons/`: Tập trung toàn bộ Icon SVG dùng chung.
  * `src/context/`: Quản lý context ứng dụng (AuthContext).
  * `src/mocks/`: Chứa toàn bộ dữ liệu tĩnh (mock users, mock history).
  * `src/pages/`: Chứa các trang giao diện (LandingPage, StudioPage, ReportPage...).
  * `src/services/`: Tầng giao tiếp mạng (apiClient với fetch/Bearer token).
  * `src/types/`: Định nghĩa kiểu dữ liệu TypeScript (user, presentation, report).

## 4. Quyết Định Kỹ Thuật Đã Thống Nhất
* **Bảo toàn 100% UI Figma ban đầu:** Không tự tiện đổi màu, đổi layout hay đập đi xây lại giao diện.
* **Chuyển đổi hoàn toàn sang `npm`:** Đảm bảo cả 3 thành viên trong nhóm dùng chung công cụ mặc định của Node.js mà không cần cài đặt thêm.
* **Tách Data khỏi UI:** Tuyệt đối không nhúng các mảng dữ liệu cứng (hardcoded data) trong thân component để sẵn sàng kết nối API thật.
