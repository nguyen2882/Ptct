// Dữ liệu mẫu khởi tạo cho hệ thống quản lý phân chia giao việc - Phòng Kỹ thuật & Sự kiện Giáo dục

const DEFAULT_MEMBERS = [
    { id: "mem-1", name: "Nguyễn Văn An", role: "Trưởng phòng Kỹ thuật & Sự kiện", avatar: "AN" },
    { id: "mem-2", name: "Trần Thị Bình", role: "Chuyên viên Âm thanh - Ánh sáng", avatar: "TB" },
    { id: "mem-3", name: "Lê Hoàng Nam", role: "Kỹ thuật viên Thiết bị & Lớp học", avatar: "HN" },
    { id: "mem-4", name: "Phạm Minh Thư", role: "Chuyên viên Hệ thống & Livestream", avatar: "MT" }
];

const DEFAULT_GUIDELINES = [
    {
        id: "guide-1",
        title: "Quy trình lắp đặt thiết bị CNTT và máy chiếu phòng học",
        type: "technical",
        summary: "Các bước chuẩn bị, kết nối máy chiếu, âm thanh mic giảng dạy tại phòng học giáo dục.",
        content: `### Quy trình chuẩn bị phòng học giảng dạy trực tiếp:
1. **Kiểm tra thiết bị hiển thị**:
   - Bật máy chiếu (Projector) hoặc màn hình tương tác thông minh.
   - Kiểm tra cổng cáp kết nối (HDMI, VGA, Type-C) tại bàn giáo viên, đảm bảo truyền hình ảnh và âm thanh rõ nét.
2. **Kiểm tra âm thanh giảng đường**:
   - Bật cục đẩy (amply) và Mixer của phòng học.
   - Kiểm tra micro không dây (hoặc micro cài áo), sạc sẵn pin và đặt trên bàn giảng viên.
   - Thử nói vào micro xem tiếng loa phòng học có trong, vang và không bị rè hay hú hay không.
3. **Cài đặt phần mềm giảng dạy**:
   - Bật máy tính của phòng học (nếu có) hoặc hỗ trợ giáo viên kết nối Laptop cá nhân.
   - Đảm bảo kết nối mạng LAN hoặc Wifi hoạt động ổn định.
   - Mở sẵn phần mềm Office, trình duyệt web hoặc các công cụ dạy học bổ trợ.`,
        checklist: [
            "Kiểm tra máy chiếu và cáp tín hiệu HDMI/VGA tại bàn giáo viên",
            "Bật hệ thống âm thanh và kiểm tra loa phòng học",
            "Kiểm tra dung lượng pin và sạc micro không dây cho giảng viên",
            "Bật máy tính giảng đường và kiểm tra kết nối mạng Wifi/LAN",
            "Thử mở phần mềm trình chiếu PowerPoint/PDF kiểm tra hiển thị",
            "Bàn giao lớp học và hướng dẫn nhanh cho giáo viên nếu cần"
        ]
    },
    {
        id: "guide-2",
        title: "Quy trình thiết lập và vận hành livestream hội thảo giáo dục",
        type: "collective",
        summary: "Hướng dẫn cài đặt OBS Studio, kết nối camera và luồng livestream trên Zoom/Youtube.",
        content: `### Các bước cấu hình livestream sự kiện trực tuyến:
1. **Kết nối phần cứng**:
   - Lắp đặt máy quay/camera sự kiện lên chân tripod, kết nối vào máy tính thông qua thiết bị Capture Card (USB HDMI Capture).
   - Lấy tín hiệu âm thanh sạch (Line-out) từ bàn Mixer sự kiện cắm vào đường Mic-in/Line-in của máy tính phát stream.
2. **Thiết lập OBS Studio**:
   - Tạo các Cảnh (Scenes) bao gồm: Cảnh chờ (Banner), Cảnh máy quay chính, Cảnh máy quay phụ, Cảnh trình chiếu Slide giáo án.
   - Điều chỉnh mức âm thanh (Audio Mixer) đảm bảo giọng nói người phát biểu đạt mức xanh-vàng, không bị vượt ngưỡng đỏ gây rè.
3. **Thiết lập luồng phát và giám sát**:
   - Lấy Khóa luồng (Stream Key) từ Youtube Live, Facebook Live hoặc Zoom Webinar dán vào cấu hình Stream trong OBS.
   - Bắt đầu phát luồng thử nghiệm (ở chế độ riêng tư) để đánh giá đường truyền mạng và độ trễ.
   - Khi sự kiện bắt đầu, kích hoạt phát chính thức và luôn có 1 kỹ thuật viên theo dõi chat, tương tác hỗ trợ học viên từ xa.`,
        checklist: [
            "Kết nối máy quay camera sự kiện thông qua capture card vào máy tính",
            "Cắm dây lấy âm thanh line-out từ Mixer vào máy tính livestream",
            "Thiết lập các scene trên OBS Studio (chờ, slide, camera giảng viên)",
            "Lấy Stream Key và cấu hình luồng phát lên nền tảng (Zoom/Youtube)",
            "Chạy thử livestream thử nghiệm để test độ trễ mạng và âm lượng mic",
            "Tiến hành phát chính thức và phân công trực kỹ thuật trong suốt sự kiện"
        ]
    },
    {
        id: "guide-3",
        title: "Quy trình lắp đặt hệ thống Âm thanh & Ánh sáng sự kiện tại Hội trường",
        type: "collective",
        summary: "Các bước phối hợp lắp đặt loa hội trường, micro sự kiện và đèn chiếu sáng sân khấu.",
        content: `### Các bước lắp đặt phần cứng kỹ thuật cho sự kiện giáo dục:
1. **Thiết lập âm thanh**:
   - Bố trí 2 loa cột chính (Main Speaker) hai bên sân khấu hướng về phía khán giả, và các loa kiểm âm (Monitor) hướng về phía bục phát biểu.
   - Đi dây cáp loa gọn gàng, dán băng keo cố định trên sàn để tránh người qua lại vấp ngã.
   - Kết nối micro bục phát biểu, micro cầm tay của MC và đại biểu vào bàn Mixer.
2. **Thiết lập ánh sáng sân khấu**:
   - Lắp đặt các đèn Par LED chiếu sáng ấm bục phát biểu và đèn màu tạo hiệu ứng phông nền sân khấu.
   - Cắm điện kiểm tra cường độ sáng, căn chỉnh góc chiếu tránh rọi thẳng vào mắt người đứng trên bục.
3. **Sound check & Cân chỉnh**:
   - Phát nhạc nền kiểm tra sự cân bằng âm thanh giữa loa trái và loa phải.
   - Thử giọng micro của MC và các đại diện phát biểu để điều chỉnh EQ âm sắc, căn chỉnh chống hú (Anti-Feedback).`,
        checklist: [
            "Khảo sát sơ đồ bố trí sân khấu hội trường và vị trí đặt loa",
            "Lắp đặt, kết nối dây loa chính và loa monitor kiểm âm sân khấu",
            "Kết nối micro bục phát biểu và micro không dây cầm tay vào Mixer",
            "Lắp đặt hệ thống đèn LED chiếu sáng bục sân khấu và phông nền",
            "Phát thử nhạc nền và sound check micro đại biểu trước giờ G",
            "Đi dây cáp an toàn, dán băng keo cố định đường đi"
        ]
    },
    {
        id: "guide-4",
        title: "Quy trình cấp phát tài khoản LMS và phòng học Zoom cho khóa học mới",
        type: "technical",
        summary: "Quy trình cấp phát tài khoản học trực tuyến, tạo lớp Zoom và gửi thông tin tự động cho học viên.",
        content: `### Quy trình xử lý yêu cầu đào tạo trực tuyến:
1. **Tiếp nhận thông tin khóa học**:
   - Nhận danh sách học viên đăng ký mới, thông tin lịch học và giáo viên phụ trách từ bộ phận Đào tạo.
2. **Cấu hình trên hệ thống quản lý học tập LMS**:
   - Đăng nhập quyền Admin hệ thống LMS, import danh sách học viên bằng file Excel.
   - Tạo khóa học mới, gán giáo viên phụ trách và add học viên vào lớp học tương ứng.
3. **Tạo lớp học trực tuyến Zoom**:
   - Tạo lịch họp định kỳ (Recurring Meeting) trên Zoom theo đúng thời khóa biểu.
   - Thiết lập các chế độ an toàn: Bật phòng chờ (Waiting Room), tắt mic tự động khi vào phòng, thiết lập passcode lớp học.
   - Gán quyền Co-host/Host cho email của giáo viên giảng dạy.
4. **Gửi thông báo**:
   - Soạn thảo và kích hoạt gửi email tự động cung cấp tài khoản LMS, mật khẩu và link học Zoom kèm hướng dẫn truy cập cho học viên.`,
        checklist: [
            "Tiếp nhận danh sách lớp và học viên từ phòng Đào tạo",
            "Import danh sách học viên và gán khóa học trên hệ thống LMS",
            "Tạo lịch phòng Zoom lớp học định kỳ và thiết lập an toàn bảo mật",
            "Phân quyền Co-host phòng Zoom cho giáo viên giảng dạy lớp",
            "Gửi email tự động thông báo tài khoản và link phòng học cho học viên",
            "Kiểm tra truy cập thử nghiệm tài khoản mẫu đảm bảo hệ thống trơn tru"
        ]
    }
];

const DEFAULT_TASKS = [
    {
        id: "task-1",
        title: "Chuẩn bị thiết bị và máy chiếu cho phòng học 302 khóa học mới",
        description: "Lớp học IELTS Premium mới bắt đầu lúc 18:00 tối nay. Cần chuẩn bị sẵn máy chiếu, sạc pin micro không dây và kiểm tra âm thanh phòng học 302.",
        type: "technical",
        assignedTo: "mem-3",
        priority: "high",
        status: "todo",
        dueDate: "2026-07-02",
        guidelineId: "guide-1",
        checklist: [
            { text: "Kiểm tra máy chiếu và cáp tín hiệu HDMI/VGA tại bàn giáo viên", completed: true },
            { text: "Bật hệ thống âm thanh và kiểm tra loa phòng học", completed: false },
            { text: "Kiểm tra dung lượng pin và sạc micro không dây cho giảng viên", completed: true },
            { text: "Bật máy tính giảng đường và kiểm tra kết nối mạng Wifi/LAN", completed: false },
            { text: "Thử mở phần mềm trình chiếu PowerPoint/PDF kiểm tra hiển thị", completed: false },
            { text: "Bàn giao lớp học và hướng dẫn nhanh cho giáo viên nếu cần", completed: false }
        ]
    },
    {
        id: "task-2",
        title: "Cấp phát tài khoản LMS và Zoom cho khóa IELTS Intensive Tháng 7",
        description: "Khóa học trực tuyến IELTS Intensive sẽ khai giảng vào ngày 05/07. Cần cấp tài khoản cho 25 học viên mới và gửi email thông báo trước ngày 04/07.",
        type: "technical",
        assignedTo: "mem-4",
        priority: "medium",
        status: "in-progress",
        dueDate: "2026-07-04",
        guidelineId: "guide-4",
        checklist: [
            { text: "Tiếp nhận danh sách lớp và học viên từ phòng Đào tạo", completed: true },
            { text: "Import danh sách học viên và gán khóa học trên hệ thống LMS", completed: true },
            { text: "Tạo lịch phòng Zoom lớp học định kỳ và thiết lập an toàn bảo mật", completed: false },
            { text: "Phân quyền Co-host phòng Zoom cho giáo viên giảng dạy lớp", completed: false },
            { text: "Gửi email tự động thông báo tài khoản và link phòng học cho học viên", completed: false },
            { text: "Kiểm tra truy cập thử nghiệm tài khoản mẫu đảm bảo hệ thống trơn tru", completed: false }
        ]
    },
    {
        id: "task-3",
        title: "Setup âm thanh, ánh sáng và livestream cho Hội thảo Tuyển sinh ngày 05/07",
        description: "Sự kiện tuyển sinh quy mô lớn của công ty giáo dục diễn ra tại Hội trường chính lúc 08:30 ngày 05/07. Cần setup hệ thống âm thanh, ánh sáng sân khấu và chuẩn bị thiết bị phát livestream lên Youtube.",
        type: "collective",
        assignedTo: "mem-1",
        priority: "high",
        status: "todo",
        dueDate: "2026-07-05",
        guidelineId: "guide-3",
        checklist: [
            { text: "Khảo sát sơ đồ bố trí sân khấu hội trường và vị trí đặt loa", completed: false },
            { text: "Lắp đặt, kết nối dây loa chính và loa monitor kiểm âm sân khấu", completed: false },
            { text: "Kết nối micro bục phát biểu và micro không dây cầm tay vào Mixer", completed: false },
            { text: "Lắp đặt hệ thống đèn LED chiếu sáng bục sân khấu và phông nền", completed: false },
            { text: "Phát thử nhạc nền và sound check micro đại biểu trước giờ G", completed: false },
            { text: "Đi dây cáp an toàn, dán băng keo cố định đường đi", completed: false }
        ]
    },
    {
        id: "task-4",
        title: "Vận hành Livestream Lễ Khai giảng Khóa học hè 2026",
        description: "Bộ phận Đào tạo yêu cầu phát trực tiếp Lễ Khai giảng lên Fanpage công ty. Bắt đầu truyền hình trực tiếp lúc 09:00 ngày 03/07/2026.",
        type: "collective",
        assignedTo: "mem-2",
        priority: "high",
        status: "in-progress",
        dueDate: "2026-07-03",
        guidelineId: "guide-2",
        checklist: [
            { text: "Kết nối máy quay camera sự kiện thông qua capture card vào máy tính", completed: true },
            { text: "Cắm dây lấy âm thanh line-out từ Mixer vào máy tính livestream", completed: true },
            { text: "Thiết lập các scene trên OBS Studio (chờ, slide, camera giảng viên)", completed: true },
            { text: "Lấy Stream Key và cấu hình luồng phát lên nền tảng (Zoom/Youtube)", completed: false },
            { text: "Chạy thử livestream thử nghiệm để test độ trễ mạng và âm lượng mic", completed: false },
            { text: "Tiến hành phát chính thức và phân công trực kỹ thuật trong suốt sự kiện", completed: false }
        ]
    }
];
