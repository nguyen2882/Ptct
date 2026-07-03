// Dữ liệu mẫu khởi tạo cho hệ thống quản lý phân chia giao việc - Phòng Kỹ thuật & Sự kiện Giáo dục

const DEFAULT_MEMBERS = [
    { id: "mem-1", name: "Nguyễn Văn An", role: "Trưởng phòng Kỹ thuật Công ty", dept: "company_tech", avatar: "AN" },
    { id: "mem-2", name: "Trần Thị Bình", role: "Trưởng nhóm Kỹ thuật Sự kiện", dept: "event_tech", avatar: "TB" },
    { id: "mem-3", name: "Lê Hoàng Nam", role: "Kỹ thuật viên Mạng & Hệ thống", dept: "company_tech", avatar: "HN" },
    { id: "mem-4", name: "Phạm Minh Thư", role: "Kỹ thuật viên Âm thanh & Livestream", dept: "event_tech", avatar: "MT" }
];

const DEFAULT_GUIDELINES = [
    {
        id: "guide-1",
        title: "Quy trình cấu hình và lắp đặt thiết bị CNTT phòng học",
        type: "company_tech",
        summary: "Quy trình chuẩn bị máy tính, kết nối máy chiếu, và micro giảng dạy phục vụ lớp học trực tiếp.",
        content: `### Quy trình chuẩn bị phòng học giảng dạy trực tiếp:
1. **Kiểm tra thiết bị hiển thị**:
   - Bật máy chiếu (Projector) hoặc màn hình tương tác thông minh của phòng học.
   - Kiểm tra cổng cáp kết nối (HDMI, VGA, Type-C) tại bàn giáo viên, đảm bảo truyền hình ảnh ổn định.
2. **Kiểm tra âm thanh giảng đường**:
   - Bật amply và bàn trộn Mixer tại góc phòng học.
   - Kiểm tra pin và sạc của micro không dây cầm tay/cài áo của giáo viên.
   - Thử nói vào micro xem tiếng loa trong và không bị rè hay hú hay không.
3. **Cấu hình máy tính giảng đường**:
   - Khởi động máy tính cài sẵn của phòng học hoặc hỗ trợ giáo viên kết nối Laptop cá nhân.
   - Đảm bảo kết nối mạng LAN hoặc Wifi ổn định.
   - Kiểm tra và cài đặt các phần mềm học tập cần thiết.`,
        checklist: [
            "Kiểm tra máy chiếu và cổng tín hiệu HDMI/VGA tại bàn giáo viên",
            "Bật hệ thống âm thanh và kiểm tra loa phòng học",
            "Kiểm tra dung lượng pin và sạc micro không dây cho giảng viên",
            "Bật máy tính giảng đường và kiểm tra kết nối mạng LAN/Wifi",
            "Thử mở phần mềm trình chiếu PowerPoint/PDF để kiểm tra hiển thị",
            "Bàn giao lớp học và hướng dẫn nhanh cho giáo viên nếu cần"
        ]
    },
    {
        id: "guide-2",
        title: "Quy trình thiết lập và vận hành livestream hội thảo giáo dục",
        type: "event_tech",
        summary: "Hướng dẫn kết nối camera, setup OBS Studio và đẩy luồng livestream lên Zoom/Youtube.",
        content: `### Các bước cấu hình livestream sự kiện trực tuyến:
1. **Kết nối thiết bị phần cứng**:
   - Lắp đặt máy quay/camera sự kiện lên chân tripod, kết nối vào máy tính thông qua thiết bị Capture Card.
   - Lấy đường âm thanh sạch (Line-out) từ bàn Mixer âm thanh sự kiện cắm vào ngõ Line-in của máy tính phát stream.
2. **Thiết lập OBS Studio**:
   - Thiết lập các Cảnh (Scenes) bao gồm: Cảnh chờ (Banner), Cảnh giảng viên trực diện, Cảnh trình chiếu Slide tài liệu, Cảnh toàn sân khấu.
   - Giám sát cột âm thanh (Audio Mixer) trong OBS đảm bảo giọng người phát biểu rõ ràng, không bị rè.
3. **Cấu hình luồng phát**:
   - Lấy Server URL và Stream Key từ Youtube Live, Facebook Live hoặc Zoom Webinar dán vào cấu hình OBS.
   - Kích hoạt phát luồng thử nghiệm chế độ riêng tư trước 30 phút để test độ ổn định.`,
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
        type: "event_tech",
        summary: "Các bước phối hợp lắp đặt loa hội trường, micro bục phát biểu và đèn sân khấu sự kiện.",
        content: `### Các bước lắp đặt phần cứng kỹ thuật cho sự kiện giáo dục:
1. **Thiết lập âm thanh**:
   - Đặt 2 loa chính hướng về khán giả, các loa kiểm âm (Monitor) đặt hướng về phía sân khấu cho diễn giả nghe.
   - Kết nối micro bục phát biểu và các micro không dây cầm tay của đại biểu vào bàn Mixer.
   - Đi dây gọn gàng dọc mép tường, sử dụng băng keo dán cố định để chống trượt và vấp ngã.
2. **Thiết lập ánh sáng**:
   - Lắp các đèn LED ấm chiếu bục phát biểu và các đèn màu tạo phông nền.
   - Căn chỉnh góc chiếu sáng sân khấu, tránh rọi trực tiếp vào mắt người đứng trên bục.
3. **Sound check**:
   - Thử giọng micro của từng đại biểu để điều chỉnh EQ tiếng micro trong trẻo và hạn chế rú rít.`,
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
        type: "company_tech",
        summary: "Quy trình cấp tài khoản học trực tuyến, tạo phòng Zoom lớp học và gửi email tự động cho học viên.",
        content: `### Quy trình xử lý yêu cầu đào tạo trực tuyến:
1. **Tiếp nhận thông tin khóa học**:
   - Nhận danh sách học viên đăng ký, thông tin thời khóa biểu và email giảng viên từ bộ phận Đào tạo.
2. **Import tài khoản hệ thống LMS**:
   - Đăng nhập quyền Admin LMS, tạo lớp học mới và import danh sách học viên qua file Excel.
3. **Cấu hình lớp học Zoom**:
   - Tạo phòng học Zoom cố định theo lịch học định kỳ.
   - Thiết lập an toàn: bật phòng chờ (Waiting Room), thiết lập mật khẩu lớp, và gán email giáo viên làm Host/Co-host.
4. **Gửi thông báo**:
   - Kích hoạt gửi email tự động cung cấp tài khoản LMS và link Zoom học tập cho học viên.`,
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
        description: "Lớp học IELTS Premium mới của công ty sẽ bắt đầu lúc 18:00 tối nay. Cần chuẩn bị sẵn máy chiếu, sạc pin micro không dây và kiểm tra âm thanh phòng học 302.",
        type: "company_tech",
        assignedTo: "mem-3",
        priority: "high",
        status: "todo",
        dueDate: "2026-07-02",
        guidelineId: "guide-1",
        checklist: [
            { text: "Kiểm tra máy chiếu và cổng tín hiệu HDMI/VGA tại bàn giáo viên", completed: true },
            { text: "Bật hệ thống âm thanh và kiểm tra loa phòng học", completed: false },
            { text: "Kiểm tra dung lượng pin và sạc micro không dây cho giảng viên", completed: true },
            { text: "Bật máy tính giảng đường và kiểm tra kết nối mạng LAN/Wifi", completed: false },
            { text: "Thử mở phần mềm trình chiếu PowerPoint/PDF để kiểm tra hiển thị", completed: false },
            { text: "Bàn giao lớp học và hướng dẫn nhanh cho giáo viên nếu cần", completed: false }
        ]
    },
    {
        id: "task-2",
        title: "Cấp phát tài khoản LMS và Zoom cho khóa IELTS Intensive Tháng 7",
        description: "Khóa học trực tuyến IELTS Intensive sẽ khai giảng vào ngày 05/07. Cần cấp tài khoản cho 25 học viên mới và gửi email thông báo trước ngày 04/07.",
        type: "company_tech",
        assignedTo: "mem-1",
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
        description: "Sự kiện tuyển sinh của công ty giáo dục diễn ra tại Hội trường chính lúc 08:30 ngày 05/07. Bộ phận kỹ thuật sự kiện cần setup hệ thống âm thanh, ánh sáng sân khấu và chuẩn bị thiết bị phát livestream lên Youtube.",
        type: "event_tech",
        assignedTo: "mem-2",
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
        description: "Phát trực tiếp Lễ Khai giảng lên Fanpage công ty. Bộ phận kỹ thuật sự kiện chịu trách nhiệm setup OBS Studio và trực luồng phát Zoom webinar.",
        type: "event_tech",
        assignedTo: "mem-4",
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

const DEFAULT_ISSUES = [
    {
        id: "issue-1",
        title: "Máy chiếu giảng đường bị đổi màu hoặc loang lổ",
        dept: "company_tech",
        symptom: "Màn hình chiếu bị chuyển sang màu vàng loang, màu tím hoặc hiển thị sai lệch màu so với màn hình máy tính.",
        solution: "1. Kiểm tra lại giắc cắm cáp tín hiệu VGA/HDMI ở cả hai đầu (máy chiếu và máy tính).\n2. Nếu đầu cáp bị lỏng chân hoặc bám bụi, dùng chổi vệ sinh nhẹ rồi cắm lại thật chặt và siết ốc hai bên (đối với cáp VGA).\n3. Thử đổi cổng kết nối hoặc đổi sợi cáp khác để loại trừ khả năng cáp đứt ngầm.\n4. Reset cài đặt màu sắc (Color reset) trong menu hệ thống của máy chiếu về mặc định."
    },
    {
        id: "issue-2",
        title: "Microphone không dây giảng đường bị rú rít lớn khi giảng dạy",
        dept: "event_tech",
        symptom: "Tiếng hú chói tai phát ra từ loa khi giảng viên bật micro và di chuyển trên giảng đường hoặc sân khấu.",
        solution: "1. Yêu cầu giảng viên đứng lệch góc với loa, tuyệt đối không đứng đối diện trực tiếp trước loa phát.\n2. Căn chỉnh giảm bớt tần số High (Treble) và giảm nhẹ Gain của kênh micro đó trên bàn Mixer âm thanh.\n3. Kích hoạt bộ lọc cắt tần số hú (chức năng Anti-Feedback hoặc Feedback Suppressor) nếu có thiết bị chuyên dụng."
    },
    {
        id: "issue-3",
        title: "Tín hiệu Livestream OBS Studio bị giật lag, rớt khung hình (Dropped Frames)",
        dept: "event_tech",
        symptom: "Quan sát thanh trạng thái OBS báo đỏ, tỷ lệ dropped frames tăng cao, người xem livestream phản hồi hình ảnh bị giật đứng.",
        solution: "1. Kiểm tra kết nối mạng của máy tính livestream, ưu tiên cắm cáp mạng LAN dây, không dùng Wifi.\n2. Hạ Bitrate của OBS xuống mức an toàn (ví dụ: từ 6000kbps xuống 2500kbps - 3000kbps đối với chất lượng HD 720p).\n3. Đóng tất cả các chương trình chạy ngầm không cần thiết trên máy tính phát stream để giải phóng CPU/GPU."
    },
    {
        id: "issue-4",
        title: "Không thể đăng nhập vào hệ thống học tập LMS nội bộ của học viện",
        dept: "company_tech",
        symptom: "Trình duyệt báo lỗi bảo mật (SSL Error) hoặc báo lỗi tải trang, không hiện khung đăng nhập tài khoản học viên.",
        solution: "1. Kiểm tra đồng hồ thời gian trên máy tính xem có bị lệch giờ thực tế không (nếu lệch giờ, SSL sẽ báo lỗi bảo mật). Tiến hành đồng bộ lại thời gian mạng.\n2. Hướng dẫn học viên xóa toàn bộ Cache trình duyệt bằng tổ hợp phím Ctrl + Shift + Delete rồi thử lại.\n3. Thử chuyển đổi sang trình duyệt ẩn danh hoặc dùng kết nối 3G/4G để loại trừ khả năng nghẽn DNS của mạng nội bộ."
    },
    {
        id: "issue-5",
        title: "Âm thanh từ Laptop giảng viên không phát ra loa lớn phòng học",
        dept: "company_tech",
        symptom: "Laptop vẫn phát ra tiếng nhỏ từ loa máy tính, hoặc không phát ra bất kỳ âm thanh nào mặc dù đã kết nối cáp HDMI.",
        solution: "1. Nhấp chuột trái vào biểu tượng loa ở góc phải thanh Taskbar trên Windows.\n2. Chọn lại thiết bị phát đầu ra (Playback Device) là tên màn hình/máy chiếu (HDMI Output) hoặc ngõ âm thanh ngoài thay vì loa mặc định (Speakers).\n3. Kiểm tra xem nút bật/tắt (Mute) trên bộ Mixer phòng học hoặc âm lượng trên máy tính có đang bị tắt hay không."
    }
];

const DEFAULT_QUICKLINKS = [
    { id: "link-1", title: "Trang học trực tuyến LMS", url: "https://lms.congty.edu.vn", description: "Hệ thống quản lý học tập trực tuyến dành cho học viên và giáo viên." },
    { id: "link-2", title: "Quản trị Zoom Meeting", url: "https://zoom.us", description: "Cổng cấu hình phòng học Zoom trực tuyến, passcode và phân quyền giảng dạy." },
    { id: "link-3", title: "Kho giáo trình Google Drive", url: "https://drive.google.com", description: "Lưu trữ tài liệu học tập, giáo án và slide bài giảng các khóa học." },
    { id: "link-4", title: "Trang chủ Vercel Deployment", url: "https://vercel.com", description: "Nền tảng triển khai và hosting trang quản lý kỹ thuật của phòng ban." },
    { id: "link-5", title: "Quản trị Tài khoản Novastars", url: "https://account.novastars.vn/", description: "Hệ thống quản lý thông tin tài khoản và phân quyền thành viên Novastars." },
    { id: "link-6", title: "Hệ thống Xuất bài Novastars", url: "https://hotro.novastars.vn/xuat-bai/", description: "Công cụ xuất bản bài viết, tài liệu hỗ trợ giảng dạy và học tập." },
    { id: "link-7", title: "Công cụ Email Cleaner Novastars", url: "https://hotro.novastars.vn/emailcleaner/", description: "Công cụ lọc trùng, làm sạch và chuẩn hóa danh sách Email học viên." }
];
