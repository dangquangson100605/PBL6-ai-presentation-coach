# TIẾN ĐỘ DỰ ÁN (PROJECT PROGRESS)

## 1. Trạng Thái Hiện Tại Của Từng Phân Hệ

| Phân hệ / Module | Người phụ trách | Trạng thái | Ghi chú & Bằng chứng xác minh |
| :--- | :--- | :--- | :--- |
| **Frontend Base & Architecture** | Đặng Quang Sơn | **Hoàn thành (Đã kiểm thử)** | Chạy dev và build thành công 100%, đã push lên branch `refactor/fe-clean-architecture`. |
| **Frontend Routing & State** | Đặng Quang Sơn | **Hoàn thành (Đã kiểm thử)** | Tích hợp `react-router-dom`, lưu auth qua `localStorage`, F5 không văng trang. |
| **Frontend Mock & Services** | Đặng Quang Sơn | **Hoàn thành (Đã kiểm thử)** | Tách riêng `src/mocks/`, `src/types/`, khung `apiClient.ts` sẵn sàng gọi API. |
| **Ghi hình Webcam & Audio** | Đặng Quang Sơn | **Một phần (Cần nâng cấp)** | Mở được webcam thật qua `getUserMedia`, nhưng chưa có bộ thu MediaRecorder để xuất file blob gửi server. |
| **Backend API & Database** | Võ Thành Nhân | **Chờ kết nối** | Đang chờ Backend Lead công bố API contract (Swagger/Postman). |
| **AI Processing Pipeline** | Nguyễn Đỗ Thắng | **Chờ tích hợp** | Đang chờ mô hình AI hoàn thiện (Computer Vision & Audio ML). |

## 2. Nhật Ký Tiến Độ Tái Cấu Trúc Frontend (Đặng Quang Sơn)
* [x] **Giai đoạn 0:** Tạo điểm khôi phục Git (Commit baseline `25d1de2`, tạo nhánh `refactor/fe-clean-architecture`).
* [x] **Giai đoạn 1:** Khôi phục môi trường chạy (Gỡ `pnpm-lock.yaml`, chuyển sang `npm install`, tạo `package-lock.json` - commit `c305ccc`).
* [x] **Giai đoạn 2:** Kiểm thử giao diện gốc trên 12 màn hình qua Vite Dev Server (`localhost:8443`).
* [x] **Giai đoạn 3:** Xóa bỏ 367 dòng code chết/hằng số thừa (`NAV_ITEMS`, icon thừa) và tập trung hóa `GeminiIcon` vào `src/components/icons/index.tsx`.
* [x] **Giai đoạn 4:** Chuẩn hóa Routing bằng `react-router-dom`, quản lý AuthContext lưu trữ bền vững.
* [x] **Giai đoạn 5:** Tách TypeScript Interfaces (`src/types/`), Mock Data (`src/mocks/`), khung Service Client (`src/services/apiClient.ts`) - commit `d9b6d84`.

## 3. Các Việc Tiếp Theo Cần Làm (Next Steps)
1. Nâng cấp Studio ghi hình: Tích hợp `MediaRecorder API` để lưu video quay từ webcam thành file `.mp4`/`.webm`.
2. Họp kỹ thuật với bạn Võ Thành Nhân (Backend Lead) để chốt danh sách API endpoints (Auth, Upload Video, Get Report).
3. Chuẩn bị kết nối tầng `services/` với API thật khi backend triển khai môi trường local.
