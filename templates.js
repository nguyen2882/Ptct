// Dữ liệu mẫu khởi tạo cho hệ thống quản lý phân chia giao việc

const DEFAULT_MEMBERS = [
    { id: "mem-1", name: "Nguyễn Văn An", role: "Trưởng nhóm Kỹ thuật", avatar: "AN" },
    { id: "mem-2", name: "Trần Thị Bình", role: "Kỹ thuật viên Mạng", avatar: "TB" },
    { id: "mem-3", name: "Lê Hoàng Nam", role: "Hỗ trợ Phần mềm", avatar: "HN" },
    { id: "mem-4", name: "Phạm Minh Thư", role: "Quản trị Hệ thống", avatar: "MT" }
];

const DEFAULT_GUIDELINES = [
    {
        id: "guide-1",
        title: "Quy trình cài đặt hệ điều hành và phần mềm cơ bản",
        type: "technical",
        summary: "Hướng dẫn chuẩn bị và cài đặt Windows/Linux kèm các công cụ văn phòng.",
        content: `### Quy trình chuẩn bị và cài đặt hệ thống:
1. **Chuẩn bị USB Boot**:
   - Sử dụng công cụ Rufus tạo USB cài đặt (sử dụng chuẩn UEFI - GPT).
   - Tải file ISO Windows 10/11 hoặc Ubuntu bản LTS mới nhất.
2. **Quá trình cài đặt**:
   - Cắm USB vào máy, khởi động và nhấn phím Boot Menu (F12, F8 hoặc Del tùy dòng máy).
   - Chọn phân vùng cài đặt, xóa sạch các phân vùng cũ của ổ đĩa C hệ thống cũ.
   - Tiến hành cài đặt và làm theo chỉ dẫn trên màn hình.
3. **Cài đặt phần mềm cơ bản**:
   - Bộ Office (Word, Excel, PowerPoint) hoặc LibreOffice.
   - Trình duyệt Chrome, Edge, Unikey (bộ gõ tiếng Việt).
   - Phần mềm nén/giải nén WinRAR hoặc 7-Zip.
   - Cài đặt phần mềm điều khiển từ xa: UltraViewer / RustDesk.`,
        checklist: [
            "Chuẩn bị USB Boot chứa bộ cài sạch",
            "Sao lưu dữ liệu cũ của khách hàng trước khi cài đặt",
            "Cài đặt hệ điều hành và cập nhật Driver mới nhất",
            "Cài đặt phần mềm văn phòng và Unikey",
            "Cài đặt phần mềm UltraViewer hỗ trợ từ xa",
            "Bàn giao máy và hướng dẫn khách hàng kiểm tra lại"
        ]
    },
    {
        id: "guide-2",
        title: "Quy trình xử lý sự cố mất kết nối mạng LAN/Internet",
        type: "technical",
        summary: "Các bước kiểm tra nhanh và khắc phục lỗi kết nối mạng tại văn phòng.",
        content: `### Các bước kiểm tra lỗi kết nối mạng:
1. **Kiểm tra vật lý**:
   - Xem cáp mạng LAN đã cắm chắc chắn chưa, đèn cổng mạng có sáng/nhấp nháy không.
   - Kiểm tra modem, switch trung gian xem có mất điện hoặc đèn báo đỏ không.
2. **Kiểm tra cấu hình IP**:
   - Mở CMD chạy lệnh: \`ipconfig /all\`.
   - Xem máy có nhận đúng dải IP của cơ quan không (ví dụ: \`192.168.1.x\`).
   - Nếu nhận IP dạng \`169.254.x.x\`, nghĩa là lỗi DHCP cấp phát. Chạy \`ipconfig /release\` và \`ipconfig /renew\`.
3. **Kiểm tra kết nối gateway và DNS**:
   - Ping địa chỉ Gateway (ví dụ \`ping 192.168.1.1\`).
   - Ping DNS Google (\`ping 8.8.8.8\`) để xem có kết nối ra Internet chưa.
   - Ping tên miền (\`ping google.com\`) để kiểm tra phân giải DNS. Nếu ping IP được mà không ping tên miền được, cần set DNS thủ công sang \`8.8.8.8\` và \`8.8.4.4\`.`,
        checklist: [
            "Kiểm tra kết nối vật lý (cáp mạng, đèn tín hiệu)",
            "Kiểm tra địa chỉ IP trên máy tính bằng CMD (ipconfig)",
            "Ping thử IP Gateway/Router xem có kết nối nội bộ không",
            "Ping thử DNS 8.8.8.8 để kiểm tra mạng ngoài",
            "Kiểm tra cấu hình DNS thủ công nếu cần thiết",
            "Khởi động lại Switch/Router nhánh nếu lỗi diện rộng"
        ]
    },
    {
        id: "guide-3",
        title: "Quy trình vệ sinh, bảo trì định kỳ phòng máy chủ",
        type: "collective",
        summary: "Quy trình tập thể hàng tháng để đảm bảo phòng Server luôn sạch sẽ, an toàn.",
        content: `### Quy định vệ sinh và kiểm tra an toàn:
1. **An toàn lao động**:
   - Tuyệt đối không mang chất lỏng, đồ ăn vào phòng Server.
   - Khi vệ sinh thiết bị điện, phải sử dụng chổi quét bụi tĩnh điện hoặc bình xịt khí nén.
2. **Các công việc cần làm**:
   - Quét dọn, lau sàn phòng server (sử dụng khăn ẩm vừa phải, không được để nước đọng).
   - Vệ sinh bụi bẩn màng lọc khí của điều hòa phòng server.
   - Lau bụi bên ngoài tủ Rack.
   - Sắp xếp lại dây cáp mạng thừa, thu gom rác thải, hộp giấy không dùng đến.
3. **Ghi chép log**:
   - Đo nhiệt độ phòng server (giới hạn từ 18°C đến 22°C).
   - Kiểm tra các đèn báo trạng thái của UPS và server, ghi nhận nếu có cảnh báo lỗi đỏ.`,
        checklist: [
            "Tập trung nhân sự và chuẩn bị dụng cụ vệ sinh chuyên dụng",
            "Lau bụi bên ngoài và xung quanh các tủ rack",
            "Vệ sinh màng lọc và kiểm tra nhiệt độ điều hòa (đạt 18-22°C)",
            "Sắp xếp gọn gàng dây patch cord và dây nguồn",
            "Kiểm tra trạng thái pin dự phòng UPS và thiết bị phòng cháy chữa cháy",
            "Ghi sổ nhật ký bảo trì phòng Server"
        ]
    },
    {
        id: "guide-4",
        title: "Quy trình chuẩn bị phòng họp cho hội nghị trực tuyến",
        type: "collective",
        summary: "Hướng dẫn phối hợp chuẩn bị thiết bị âm thanh, hình ảnh trước giờ họp.",
        content: `### Các bước chuẩn bị cuộc họp trực tuyến:
1. **Kiểm tra thiết bị**:
   - Bật máy tính phòng họp, khởi động màn hình tivi lớn hoặc máy chiếu.
   - Bật camera hội nghị, loa mic chuyên dụng Jabra/Polycom.
2. **Kiểm tra kết nối cuộc họp**:
   - Mở ứng dụng Zoom/Teams/Google Meet trước 30 phút.
   - Đăng nhập tài khoản bản quyền của công ty.
   - Tham gia vào đường link cuộc họp, kiểm tra góc quay của Camera, chất lượng âm thanh (Test Mic & Speaker).
3. **Phối hợp hỗ trợ**:
   - In ấn tài liệu cuộc họp nếu có yêu cầu.
   - Sắp xếp nước uống, bút viết tại bàn họp.
   - Trực hỗ trợ kỹ thuật trong suốt 15 phút đầu cuộc họp để xử lý lỗi phát sinh lập tức.`,
        checklist: [
            "Bật hệ thống máy chiếu/Tivi và máy tính phòng họp",
            "Kết nối và kiểm tra loa, micro hội nghị, camera",
            "Mở phòng họp Zoom/Teams trước 30 phút để test đường truyền",
            "Kiểm tra hình ảnh hiển thị rõ nét, âm thanh không bị vang/rè",
            "Bố trí tài liệu, nước uống cho đại biểu",
            "Cử 1 kỹ thuật viên trực hỗ trợ đầu giờ họp"
        ]
    }
];

const DEFAULT_TASKS = [
    {
        id: "task-1",
        title: "Cài đặt máy tính mới cho nhân viên Phòng Nhân sự",
        description: "Thiết lập máy PC đồng bộ mới mua cho nhân viên mới của phòng Nhân sự. Sử dụng hướng dẫn cài đặt hệ điều hành chuẩn.",
        type: "technical",
        assignedTo: "mem-3",
        priority: "medium",
        status: "todo",
        dueDate: "2026-07-05",
        guidelineId: "guide-1",
        checklist: [
            { text: "Chuẩn bị USB Boot chứa bộ cài sạch", completed: false },
            { text: "Sao lưu dữ liệu cũ của khách hàng trước khi cài đặt", completed: true },
            { text: "Cài đặt hệ điều hành và cập nhật Driver mới nhất", completed: false },
            { text: "Cài đặt phần mềm văn phòng và Unikey", completed: false },
            { text: "Cài đặt phần mềm UltraViewer hỗ trợ từ xa", completed: false },
            { text: "Bàn giao máy và hướng dẫn khách hàng kiểm tra lại", completed: false }
        ]
    },
    {
        id: "task-2",
        title: "Khắc phục lỗi mất kết nối máy in mạng tại phòng Kế toán",
        description: "Phòng kế toán báo lỗi không in được hóa đơn, máy báo offline. Cần sang kiểm tra kết nối mạng LAN của máy in và cài lại Driver IP tĩnh nếu cần.",
        type: "technical",
        assignedTo: "mem-2",
        priority: "high",
        status: "in-progress",
        dueDate: "2026-07-02",
        guidelineId: "guide-2",
        checklist: [
            { text: "Kiểm tra kết nối vật lý (cáp mạng, đèn tín hiệu máy in)", completed: true },
            { text: "Kiểm tra IP máy in xem có bị trùng hoặc đổi IP không", completed: true },
            { text: "Ping thử IP máy in từ máy kế toán xem thông suốt không", completed: false },
            { text: "Cấu hình lại cổng Port IP tĩnh trên máy tính kế toán", completed: false },
            { text: "In test thử nghiệm và bàn giao", completed: false }
        ]
    },
    {
        id: "task-3",
        title: "Tổng vệ sinh phòng Server định kỳ tháng 7",
        description: "Hoạt động tập thể cả nhóm kỹ thuật phối hợp dọn dẹp, hút bụi phòng server, sắp xếp cáp mạng và bảo trì điều hòa.",
        type: "collective",
        assignedTo: "mem-1",
        priority: "high",
        status: "todo",
        dueDate: "2026-07-10",
        guidelineId: "guide-3",
        checklist: [
            { text: "Tập trung nhân sự và chuẩn bị dụng cụ vệ sinh chuyên dụng", completed: false },
            { text: "Lau bụi bên ngoài và xung quanh các tủ rack", completed: false },
            { text: "Vệ sinh màng lọc và kiểm tra nhiệt độ điều hòa (đạt 18-22°C)", completed: false },
            { text: "Sắp xếp gọn gàng dây patch cord và dây nguồn", completed: false },
            { text: "Kiểm tra trạng thái pin dự phòng UPS và thiết bị phòng cháy chữa cháy", completed: false },
            { text: "Ghi sổ nhật ký bảo trì phòng Server", completed: false }
        ]
    },
    {
        id: "task-4",
        title: "Chuẩn bị phòng họp trực tuyến Hội nghị Sơ kết 6 tháng đầu năm",
        description: "Yêu cầu phối hợp kết nối Zoom với đầu cầu chi nhánh phía Nam. Họp chính thức bắt đầu lúc 14:00 ngày 03/07/2026.",
        type: "collective",
        assignedTo: "mem-4",
        priority: "high",
        status: "in-progress",
        dueDate: "2026-07-03",
        guidelineId: "guide-4",
        checklist: [
            { text: "Bật hệ thống máy chiếu/Tivi và máy tính phòng họp", completed: true },
            { text: "Kết nối và kiểm tra loa, micro hội nghị, camera", completed: true },
            { text: "Mở phòng họp Zoom/Teams trước 30 phút để test đường truyền", completed: false },
            { text: "Kiểm tra hình ảnh hiển thị rõ nét, âm thanh không bị vang/rè", completed: false },
            { text: "Bố trí tài liệu, nước uống cho đại biểu", completed: false },
            { text: "Cử 1 kỹ thuật viên trực hỗ trợ đầu giờ họp", completed: false }
        ]
    }
];
