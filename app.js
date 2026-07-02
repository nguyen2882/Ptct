// HỆ THỐNG QUẢN LÝ PHÂN CHIA GIAO VIỆC & QUY TRÌNH KỸ THUẬT (IT-FLOW)
// MÃ XỬ LÝ CHÍNH (app.js)

// ----------------- 1. QUẢN LÝ TRẠNG THÁI (STATE) -----------------
let state = {
    tasks: [],
    members: [],
    guidelines: [],
    theme: "dark",
    activePage: "dashboard",
    filters: {
        search: "",
        assignee: "all",
        type: "all",
        priority: "all"
    }
};

// Khởi tạo và tải dữ liệu từ localStorage
function initApp() {
    // 0. Kiểm tra phiên bản dữ liệu (để tự động chuyển giao sang bộ dữ liệu giáo dục/sự kiện)
    const DB_VERSION = "2.0";
    const savedVersion = localStorage.getItem("itflow_db_version");
    if (savedVersion !== DB_VERSION) {
        localStorage.removeItem("itflow_tasks");
        localStorage.removeItem("itflow_members");
        localStorage.removeItem("itflow_guidelines");
        localStorage.setItem("itflow_db_version", DB_VERSION);
    }

    // 1. Tải Theme
    const savedTheme = localStorage.getItem("itflow_theme");
    if (savedTheme) {
        state.theme = savedTheme;
    }
    applyTheme();

    // 2. Tải Dữ liệu từ LocalStorage (hoặc nạp mặc định từ templates.js)
    const savedMembers = localStorage.getItem("itflow_members");
    if (savedMembers) {
        state.members = JSON.parse(savedMembers);
    } else {
        state.members = [...DEFAULT_MEMBERS];
        localStorage.setItem("itflow_members", JSON.stringify(state.members));
    }

    const savedGuidelines = localStorage.getItem("itflow_guidelines");
    if (savedGuidelines) {
        state.guidelines = JSON.parse(savedGuidelines);
    } else {
        state.guidelines = [...DEFAULT_GUIDELINES];
        localStorage.setItem("itflow_guidelines", JSON.stringify(state.guidelines));
    }

    const savedTasks = localStorage.getItem("itflow_tasks");
    if (savedTasks) {
        state.tasks = JSON.parse(savedTasks);
    } else {
        state.tasks = [...DEFAULT_TASKS];
        localStorage.setItem("itflow_tasks", JSON.stringify(state.tasks));
    }

    // 3. Thiết lập giao diện ban đầu
    setupEventListeners();
    updateNavigation();
    populateSelectDropdowns();
    renderAll();
}

// Lưu trạng thái hiện tại
function saveState(key) {
    if (key === "tasks" || !key) {
        localStorage.setItem("itflow_tasks", JSON.stringify(state.tasks));
    }
    if (key === "members" || !key) {
        localStorage.setItem("itflow_members", JSON.stringify(state.members));
    }
    if (key === "guidelines" || !key) {
        localStorage.setItem("itflow_guidelines", JSON.stringify(state.guidelines));
    }
}

// ----------------- 2. ĐIỀU HƯỚNG VÀ THEME -----------------
function updateNavigation() {
    // Ẩn tất cả các container
    document.querySelectorAll(".page-container").forEach(el => {
        el.classList.remove("active");
    });
    
    // Bỏ kích hoạt các menu
    document.querySelectorAll(".nav-links li").forEach(el => {
        el.classList.remove("active");
    });

    // Kích hoạt phần được chọn
    const activePageEl = document.getElementById(`page-${state.activePage}`);
    const activeNavEl = document.getElementById(`nav-${state.activePage}`);
    
    if (activePageEl) activePageEl.classList.add("active");
    if (activeNavEl) activeNavEl.classList.add("active");

    // Nếu chuyển sang trang SOP, chọn tự động mục đầu tiên
    if (state.activePage === "guidelines" && state.guidelines.length > 0) {
        const activeGuideId = state.guidelines[0].id;
        renderGuidelineDetail(activeGuideId);
    }
}

function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    const sunIcon = document.getElementById("theme-icon-sun");
    const moonIcon = document.getElementById("theme-icon-moon");
    if (state.theme === "light") {
        if (sunIcon) sunIcon.style.display = "none";
        if (moonIcon) moonIcon.style.display = "inline-block";
    } else {
        if (sunIcon) sunIcon.style.display = "inline-block";
        if (moonIcon) moonIcon.style.display = "none";
    }
}

function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    localStorage.setItem("itflow_theme", state.theme);
    applyTheme();
}

// ----------------- 3. RENDER MÀN HÌNH CHÍNH -----------------
function renderAll() {
    updateDashboardStats();
    renderKanbanBoard();
    renderGuidelinesMenu();
    renderTeamMembers();
}

// --- CẬP NHẬT STATS TRÊN DASHBOARD ---
function updateDashboardStats() {
    const total = state.tasks.length;
    const todo = state.tasks.filter(t => t.status === "todo").length;
    const progress = state.tasks.filter(t => t.status === "in-progress").length;
    const done = state.tasks.filter(t => t.status === "done").length;

    // Cập nhật thẻ thống kê
    document.getElementById("stat-total-tasks").innerText = total;
    document.getElementById("stat-todo-tasks").innerText = todo;
    document.getElementById("stat-progress-tasks").innerText = progress;
    document.getElementById("stat-done-tasks").innerText = done;

    // Tính toán tiến trình theo phân loại
    const techTasks = state.tasks.filter(t => t.type === "technical");
    const techDone = techTasks.filter(t => t.status === "done").length;
    const techPercent = techTasks.length > 0 ? Math.round((techDone / techTasks.length) * 100) : 0;
    
    document.getElementById("progress-text-technical").innerText = `${techPercent}% (${techDone}/${techTasks.length})`;
    document.getElementById("progress-fill-technical").style.width = `${techPercent}%`;

    const colTasks = state.tasks.filter(t => t.type === "collective");
    const colDone = colTasks.filter(t => t.status === "done").length;
    const colPercent = colTasks.length > 0 ? Math.round((colDone / colTasks.length) * 100) : 0;

    document.getElementById("progress-text-collective").innerText = `${colPercent}% (${colDone}/${colTasks.length})`;
    document.getElementById("progress-fill-collective").style.width = `${colPercent}%`;

    // Render danh sách công việc khẩn cấp (Độ ưu tiên Cao và chưa xong)
    const urgentTasks = state.tasks
        .filter(t => t.priority === "high" && t.status !== "done")
        .slice(0, 5); // Lấy tối đa 5 việc

    const urgentContainer = document.getElementById("dashboard-urgent-tasks");
    urgentContainer.innerHTML = "";

    if (urgentTasks.length === 0) {
        urgentContainer.innerHTML = `
            <div style="text-align: center; padding: 20px; color: var(--text-muted); font-size: 13px;">
                <i class="fa-solid fa-square-check" style="font-size: 24px; color: var(--color-success); margin-bottom: 8px; display: block;"></i>
                Không có công việc khẩn cấp nào cần xử lý!
            </div>
        `;
    } else {
        urgentTasks.forEach(task => {
            urgentContainer.appendChild(createTaskCardDOM(task, false));
        });
    }
}

// --- RENDER BẢNG KANBAN PHÂN VIỆC ---
function renderKanbanBoard() {
    const todoCol = document.getElementById("cards-todo");
    const progressCol = document.getElementById("cards-inprogress");
    const doneCol = document.getElementById("cards-done");

    // Xóa danh sách cũ
    todoCol.innerHTML = "";
    progressCol.innerHTML = "";
    doneCol.innerHTML = "";

    // Lọc công việc
    const filteredTasks = state.tasks.filter(task => {
        // Tìm kiếm từ khóa (Tiêu đề hoặc Mô tả)
        const matchSearch = state.filters.search === "" ||
            task.title.toLowerCase().includes(state.filters.search.toLowerCase()) ||
            task.description.toLowerCase().includes(state.filters.search.toLowerCase());

        // Lọc người thực hiện
        const matchAssignee = state.filters.assignee === "all" || task.assignedTo === state.filters.assignee;

        // Lọc loại công việc
        const matchType = state.filters.type === "all" || task.type === state.filters.type;

        // Lọc độ ưu tiên
        const matchPriority = state.filters.priority === "all" || task.priority === state.filters.priority;

        return matchSearch && matchAssignee && matchType && matchPriority;
    });

    let counts = { todo: 0, "in-progress": 0, done: 0 };

    filteredTasks.forEach(task => {
        counts[task.status]++;
        const cardDOM = createTaskCardDOM(task, true);
        
        if (task.status === "todo") {
            todoCol.appendChild(cardDOM);
        } else if (task.status === "in-progress") {
            progressCol.appendChild(cardDOM);
        } else if (task.status === "done") {
            doneCol.appendChild(cardDOM);
        }
    });

    // Cập nhật số đếm đầu cột
    document.getElementById("count-todo").innerText = counts["todo"];
    document.getElementById("count-inprogress").innerText = counts["in-progress"];
    document.getElementById("count-done").innerText = counts["done"];
}

// Tạo DOM cho thẻ công việc
function createTaskCardDOM(task, isDraggable = true) {
    const card = document.createElement("div");
    card.className = `task-card`;
    card.id = `card-${task.id}`;
    if (isDraggable) {
        card.setAttribute("draggable", "true");
        
        // Sự kiện kéo thả của thẻ
        card.addEventListener("dragstart", (e) => {
            card.classList.add("dragging");
            e.dataTransfer.setData("text/plain", task.id);
        });
        
        card.addEventListener("dragend", () => {
            card.classList.remove("dragging");
        });
    }

    // Lấy thông tin người được giao
    const member = state.members.find(m => m.id === task.assignedTo);
    const assigneeName = member ? member.name : "Chưa phân công";
    const assigneeAvatar = member ? member.avatar : "??";

    // Phân loại nhãn
    const typeLabel = task.type === "technical" ? "Hỗ trợ kỹ thuật" : "Tổ chức Sự kiện";
    const typeClass = task.type === "technical" ? "tech" : "collective";

    // Độ ưu tiên nhãn
    let priorityLabel = "Thấp";
    if (task.priority === "high") priorityLabel = "Cao";
    else if (task.priority === "medium") priorityLabel = "Trung bình";

    // Trạng thái trễ hạn chót
    const today = new Date().toISOString().split("T")[0];
    const isOverdue = task.dueDate < today && task.status !== "done";
    const dateClass = isOverdue ? "card-date overdue" : "card-date";

    // Tính toán tiến độ checklist
    const totalItems = task.checklist ? task.checklist.length : 0;
    const completedItems = task.checklist ? task.checklist.filter(item => item.completed).length : 0;
    const percent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    card.innerHTML = `
        <div class="card-tags">
            <span class="tag ${typeClass}">${typeLabel}</span>
            <span class="tag priority-${task.priority}">U.T: ${priorityLabel}</span>
        </div>
        <div class="card-content">
            <h4>${task.title}</h4>
            <p>${task.description || "Không có mô tả chi tiết."}</p>
        </div>
        
        ${totalItems > 0 ? `
        <div class="card-progress">
            <div class="card-progress-text">
                <span>Tiến độ</span>
                <span>${completedItems}/${totalItems} bước (${percent}%)</span>
            </div>
            <div class="progress-bar-bg" style="height: 6px;">
                <div class="progress-bar-fill ${typeClass}" style="width: ${percent}%;"></div>
            </div>
        </div>
        ` : ''}

        <div class="card-footer">
            <span class="${dateClass}">
                <i class="fa-regular fa-calendar"></i>
                ${formatDate(task.dueDate)} ${isOverdue ? '(Trễ hạn)' : ''}
            </span>
            <div class="card-assignee" title="${assigneeName}">
                <div class="assignee-avatar">${assigneeAvatar}</div>
            </div>
        </div>
        
        <div class="card-footer" style="border: none; padding-top: 0; margin-top: 0; justify-content: flex-end;">
            <div class="card-actions">
                <button class="card-btn edit-btn" onclick="openTaskModal('${task.id}')" title="Sửa công việc">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="card-btn delete-btn" onclick="deleteTask('${task.id}')" title="Xóa công việc">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button class="card-btn" onclick="viewTaskDetail('${task.id}')" style="background-color: var(--color-primary-light); color: var(--color-primary); font-weight: bold; width: auto; padding: 0 8px;" title="Xem chi tiết">
                    Chi tiết
                </button>
            </div>
        </div>
    `;

    return card;
}

// ----------------- 4. KÉO THẢ TRẠNG THÁI KANBAN -----------------
function setupDragAndDrop() {
    const columns = document.querySelectorAll(".column-cards");

    columns.forEach(col => {
        col.addEventListener("dragover", (e) => {
            e.preventDefault();
            col.classList.add("drag-over");
        });

        col.addEventListener("dragleave", () => {
            col.classList.remove("drag-over");
        });

        col.addEventListener("drop", (e) => {
            e.preventDefault();
            col.classList.remove("drag-over");
            
            const taskId = e.dataTransfer.getData("text/plain");
            const newStatus = col.getAttribute("data-status");

            if (taskId && newStatus) {
                updateTaskStatus(taskId, newStatus);
            }
        });
    });
}

function updateTaskStatus(taskId, newStatus) {
    const taskIndex = state.tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        state.tasks[taskIndex].status = newStatus;
        saveState("tasks");
        renderAll();
    }
}

// ----------------- 5. BỘ LỌC VÀ TÌM KIẾM -----------------
function setupEventListeners() {
    // Chuyển trang (Navigation)
    document.querySelectorAll(".nav-links li").forEach(li => {
        li.addEventListener("click", (e) => {
            e.preventDefault();
            const pageId = li.id.replace("nav-", "");
            state.activePage = pageId;
            updateNavigation();
        });
    });

    // Tìm kiếm toàn cục
    document.getElementById("global-search").addEventListener("input", (e) => {
        state.filters.search = e.target.value;
        // Chuyển hướng sang trang bảng việc nếu đang ở trang khác
        if (state.activePage !== "board" && state.activePage !== "dashboard") {
            state.activePage = "board";
            updateNavigation();
        }
        renderKanbanBoard();
    });

    // Bộ lọc trên bảng Kanban
    document.getElementById("filter-assignee").addEventListener("change", (e) => {
        state.filters.assignee = e.target.value;
        renderKanbanBoard();
    });
    
    document.getElementById("filter-type").addEventListener("change", (e) => {
        state.filters.type = e.target.value;
        renderKanbanBoard();
    });
    
    document.getElementById("filter-priority").addEventListener("change", (e) => {
        state.filters.priority = e.target.value;
        renderKanbanBoard();
    });

    document.getElementById("btn-clear-filters").addEventListener("click", () => {
        state.filters.search = "";
        state.filters.assignee = "all";
        state.filters.type = "all";
        state.filters.priority = "all";
        
        document.getElementById("global-search").value = "";
        document.getElementById("filter-assignee").value = "all";
        document.getElementById("filter-type").value = "all";
        document.getElementById("filter-priority").value = "all";
        
        renderKanbanBoard();
    });

    // Đổi theme sáng tối
    document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

    // Kéo thả
    setupDragAndDrop();

    // Modal Task
    document.getElementById("btn-add-task").addEventListener("click", () => openTaskModal());
    document.getElementById("btn-quick-task").addEventListener("click", () => {
        state.activePage = "board";
        updateNavigation();
        openTaskModal();
    });
    document.getElementById("btn-close-task-modal").addEventListener("click", closeTaskModal);
    document.getElementById("btn-cancel-task-modal").addEventListener("click", closeTaskModal);
    document.getElementById("form-task").addEventListener("submit", handleTaskFormSubmit);
    document.getElementById("btn-add-checklist-item").addEventListener("click", () => addChecklistItemInput());

    // Modal Task Detail
    document.getElementById("btn-close-detail-modal").addEventListener("click", () => {
        document.getElementById("modal-task-detail").classList.remove("active");
    });
    document.getElementById("btn-close-detail-footer").addEventListener("click", () => {
        document.getElementById("modal-task-detail").classList.remove("active");
    });

    // Tự động điền dữ liệu khi chọn Guideline ở Form giao việc
    document.getElementById("task-guideline").addEventListener("change", (e) => {
        const guideId = e.target.value;
        if (guideId) {
            const guide = state.guidelines.find(g => g.id === guideId);
            if (guide) {
                // Điền tiêu đề, mô tả và checklist
                document.getElementById("task-title").value = guide.title;
                document.getElementById("task-desc").value = guide.summary + "\n\n" + guide.content;
                document.getElementById("task-type").value = guide.type;
                
                // Nạp checklist
                const container = document.getElementById("modal-checklist-container");
                container.innerHTML = "";
                if (guide.checklist && guide.checklist.length > 0) {
                    guide.checklist.forEach(item => {
                        addChecklistItemInput(item);
                    });
                }
            }
        }
    });

    // Thư viện Hướng dẫn SOP
    document.getElementById("btn-add-guideline").addEventListener("click", () => openGuidelineModal());
    document.getElementById("btn-close-guideline-modal").addEventListener("click", closeGuidelineModal);
    document.getElementById("btn-cancel-guideline-modal").addEventListener("click", closeGuidelineModal);
    document.getElementById("form-guideline").addEventListener("submit", handleGuidelineFormSubmit);
    document.getElementById("btn-add-guide-checklist-item").addEventListener("click", () => addGuideChecklistItemInput());
    document.getElementById("guideline-search").addEventListener("input", (e) => {
        renderGuidelinesMenu(e.target.value);
    });

    // Form thêm thành viên
    document.getElementById("form-add-member").addEventListener("submit", handleAddMemberSubmit);
    document.getElementById("btn-cancel-member-edit").addEventListener("click", cancelMemberEdit);

    // Backup & Restore
    document.getElementById("btn-export-data").addEventListener("click", exportData);
    document.getElementById("btn-import-data-trigger").addEventListener("click", () => {
        document.getElementById("file-import-data").click();
    });
    document.getElementById("file-import-data").addEventListener("change", importData);
    document.getElementById("btn-reset-db").addEventListener("click", resetDatabase);
}

// Nạp danh sách tùy chọn người thực hiện & tài liệu tham khảo cho các form dropdowns
function populateSelectDropdowns() {
    // 1. Dropdown bộ lọc người thực hiện
    const filterAssignee = document.getElementById("filter-assignee");
    // Giữ lại option đầu tiên
    filterAssignee.innerHTML = '<option value="all">-- Tất cả người thực hiện --</option>';
    state.members.forEach(m => {
        filterAssignee.innerHTML += `<option value="${m.id}">${m.name} (${m.role})</option>`;
    });

    // 2. Dropdown người thực hiện trong Form Giao việc
    const taskAssignee = document.getElementById("task-assignee");
    taskAssignee.innerHTML = '<option value="" disabled selected>-- Chọn người thực hiện --</option>';
    state.members.forEach(m => {
        taskAssignee.innerHTML += `<option value="${m.id}">${m.name} (${m.role})</option>`;
    });

    // 3. Dropdown tài liệu hướng dẫn SOP trong Form Giao việc
    const taskGuideline = document.getElementById("task-guideline");
    taskGuideline.innerHTML = '<option value="">-- Không áp dụng hướng dẫn --</option>';
    state.guidelines.forEach(g => {
        const typeLabel = g.type === "technical" ? "Kỹ thuật" : "Tập thể";
        taskGuideline.innerHTML += `<option value="${g.id}">[${typeLabel}] ${g.title}</option>`;
    });
}

// ----------------- 6. XỬ LÝ BIỂU MẪU CÔNG VIỆC (TASK MODAL) -----------------
function openTaskModal(taskId = null) {
    const modal = document.getElementById("modal-task");
    const form = document.getElementById("form-task");
    const modalTitle = document.getElementById("task-modal-title");
    const checklistContainer = document.getElementById("modal-checklist-container");
    
    form.reset();
    checklistContainer.innerHTML = "";
    
    // Đặt mặc định ngày hạn chót là ngày mai
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById("task-due-date").value = tomorrow.toISOString().split("T")[0];

    if (taskId) {
        // Chế độ chỉnh sửa (Edit Mode)
        modalTitle.innerText = "Chỉnh sửa công việc";
        const task = state.tasks.find(t => t.id === taskId);
        if (task) {
            document.getElementById("task-id").value = task.id;
            document.getElementById("task-title").value = task.title;
            document.getElementById("task-type").value = task.type;
            document.getElementById("task-priority").value = task.priority;
            document.getElementById("task-assignee").value = task.assignedTo;
            document.getElementById("task-due-date").value = task.dueDate;
            document.getElementById("task-guideline").value = task.guidelineId || "";
            document.getElementById("task-desc").value = task.description || "";
            
            // Render checklist hiện tại của việc
            if (task.checklist && task.checklist.length > 0) {
                task.checklist.forEach(item => {
                    addChecklistItemInput(item.text);
                });
            }
        }
    } else {
        // Chế độ tạo mới (Create Mode)
        modalTitle.innerText = "Giao việc mới";
        document.getElementById("task-id").value = "";
        
        // Thêm sẵn 1 ô nhập checklist trống
        addChecklistItemInput();
    }
    
    modal.classList.add("active");
}

function closeTaskModal() {
    document.getElementById("modal-task").classList.remove("active");
}

function addChecklistItemInput(val = "") {
    const container = document.getElementById("modal-checklist-container");
    const div = document.createElement("div");
    div.className = "checklist-builder-item";
    div.innerHTML = `
        <input class="form-input" type="text" placeholder="Nhập bước thực hiện..." value="${val.replace(/"/g, '&quot;')}" required>
        <button type="button" class="btn btn-icon btn-danger" onclick="this.parentElement.remove()" style="border-radius: var(--radius-md); width: 38px; height: 38px; flex-shrink:0;">
            <i class="fa-solid fa-trash-can"></i>
        </button>
    `;
    container.appendChild(div);
}

function handleTaskFormSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById("task-id").value;
    const title = document.getElementById("task-title").value.trim();
    const type = document.getElementById("task-type").value;
    const priority = document.getElementById("task-priority").value;
    const assignedTo = document.getElementById("task-assignee").value;
    const dueDate = document.getElementById("task-due-date").value;
    const guidelineId = document.getElementById("task-guideline").value;
    const description = document.getElementById("task-desc").value.trim();

    // Thu thập checklist từ form
    const checklistInputs = document.querySelectorAll("#modal-checklist-container .checklist-builder-item input[type='text']");
    const checklist = [];
    
    // Nếu chỉnh sửa, chúng ta muốn giữ trạng thái check/uncheck cũ của các bước cũ nếu tên bước trùng khớp
    const existingTask = id ? state.tasks.find(t => t.id === id) : null;
    
    checklistInputs.forEach(input => {
        const text = input.value.trim();
        if (text) {
            let completed = false;
            if (existingTask && existingTask.checklist) {
                const oldItem = existingTask.checklist.find(item => item.text === text);
                if (oldItem) completed = oldItem.completed;
            }
            checklist.push({ text, completed });
        }
    });

    if (id) {
        // Cập nhật công việc đã có
        const index = state.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            state.tasks[index] = {
                ...state.tasks[index],
                title,
                type,
                priority,
                assignedTo,
                dueDate,
                guidelineId,
                description,
                checklist
            };
        }
    } else {
        // Tạo công việc mới
        const newTask = {
            id: "task-" + Date.now(),
            title,
            type,
            priority,
            assignedTo,
            dueDate,
            guidelineId,
            description,
            checklist,
            status: "todo"
        };
        state.tasks.push(newTask);
    }

    saveState("tasks");
    closeTaskModal();
    renderAll();
}

function deleteTask(taskId) {
    if (confirm("Bạn có chắc chắn muốn xóa công việc này không?")) {
        state.tasks = state.tasks.filter(t => t.id !== taskId);
        saveState("tasks");
        renderAll();
    }
}

// ----------------- 7. CHI TIẾT CÔNG VIỆC & UPDATE CHECKLIST -----------------
function viewTaskDetail(taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return;

    const modal = document.getElementById("modal-task-detail");
    const container = document.getElementById("task-detail-body");

    const member = state.members.find(m => m.id === task.assignedTo);
    const assigneeName = member ? `${member.name} (${member.role})` : "Chưa phân công";
    
    const typeLabel = task.type === "technical" ? "Hỗ trợ kỹ thuật" : "Tổ chức Sự kiện";
    const typeClass = task.type === "technical" ? "tech" : "collective";

    let priorityLabel = "Thấp";
    if (task.priority === "high") priorityLabel = "Cao";
    else if (task.priority === "medium") priorityLabel = "Trung bình";

    // Tìm xem có hướng dẫn tham chiếu không
    let guidelineLink = "";
    if (task.guidelineId) {
        const guide = state.guidelines.find(g => g.id === task.guidelineId);
        if (guide) {
            guidelineLink = `
                <div class="detail-section">
                    <div class="detail-meta-label">Tài liệu hướng dẫn (SOP) liên kết</div>
                    <div class="detail-meta-value" style="margin-top:4px;">
                        <button class="btn btn-secondary" onclick="viewGuidelineFromTask('${task.guidelineId}')" style="padding: 6px 12px; font-size:12px;">
                            <i class="fa-solid fa-book-open"></i> Xem: ${guide.title}
                        </button>
                    </div>
                </div>
            `;
        }
    }

    container.innerHTML = `
        <div class="detail-section">
            <h2 style="font-size:18px; font-weight:700; margin-bottom:8px; line-height:1.4;">${task.title}</h2>
            <div class="card-tags">
                <span class="tag ${typeClass}">${typeLabel}</span>
                <span class="tag priority-${task.priority}">Độ ưu tiên: ${priorityLabel}</span>
            </div>
        </div>

        <div class="detail-section detail-meta-grid">
            <div class="detail-meta-item">
                <span class="detail-meta-label">Người chịu trách nhiệm</span>
                <span class="detail-meta-value">${assigneeName}</span>
            </div>
            <div class="detail-meta-item">
                <span class="detail-meta-label">Hạn hoàn thành</span>
                <span class="detail-meta-value"><i class="fa-regular fa-calendar"></i> ${formatDate(task.dueDate)}</span>
            </div>
        </div>

        <div class="detail-section">
            <div class="detail-meta-label">Mô tả công việc</div>
            <p class="detail-description">${task.description || "Không có mô tả chi tiết."}</p>
        </div>

        ${guidelineLink}

        <div class="detail-section">
            <div class="detail-meta-label" style="margin-bottom:8px;">Checklist hướng dẫn từng bước (Nhấp để tick hoàn thành)</div>
            <div class="detail-checklist">
                ${task.checklist && task.checklist.length > 0 ? 
                    task.checklist.map((item, idx) => `
                        <label class="checklist-checkbox-item ${item.completed ? 'checked' : ''}">
                            <input type="checkbox" ${item.completed ? 'checked' : ''} onchange="toggleChecklistItem('${task.id}', ${idx})">
                            <span>${item.text}</span>
                        </label>
                    `).join('') : `
                        <p style="color:var(--text-muted); font-size:13px; font-style:italic;">Không có danh sách checklist.</p>
                    `
                }
            </div>
        </div>

        <div class="detail-section" style="display:flex; justify-content:space-between; align-items:center;">
            <div class="detail-meta-label">Thay đổi trạng thái nhanh</div>
            <select class="filter-select" style="padding: 6px 12px;" onchange="updateTaskStatus('${task.id}', this.value)">
                <option value="todo" ${task.status === "todo" ? "selected" : ""}>Mới giao / Chờ làm</option>
                <option value="in-progress" ${task.status === "in-progress" ? "selected" : ""}>Đang thực hiện</option>
                <option value="done" ${task.status === "done" ? "selected" : ""}>Đã hoàn thành</option>
            </select>
        </div>
    `;

    modal.classList.add("active");
}

function toggleChecklistItem(taskId, idx) {
    const taskIndex = state.tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        state.tasks[taskIndex].checklist[idx].completed = !state.tasks[taskIndex].checklist[idx].completed;
        
        // Tự động cập nhật trạng thái: Nếu hoàn thành toàn bộ checklist, hỏi xem có đổi trạng thái sang Done không
        const allCompleted = state.tasks[taskIndex].checklist.every(item => item.completed);
        if (allCompleted && state.tasks[taskIndex].status !== "done") {
            if (confirm("Tuyệt vời! Tất cả các bước trong hướng dẫn đã hoàn thành. Bạn có muốn đánh dấu công việc này là 'Đã hoàn thành' không?")) {
                state.tasks[taskIndex].status = "done";
            }
        }
        
        saveState("tasks");
        renderAll();
        
        // Cập nhật lại giao diện modal detail hiện tại để hiển thị sự thay đổi
        viewTaskDetail(taskId);
    }
}

function viewGuidelineFromTask(guideId) {
    // Đóng modal chi tiết
    document.getElementById("modal-task-detail").classList.remove("active");
    // Chuyển trang sang SOP
    state.activePage = "guidelines";
    updateNavigation();
    // Render SOP cụ thể
    renderGuidelineDetail(guideId);
}

// ----------------- 8. THƯ VIỆN HƯỚNG DẪN SOPs -----------------
function renderGuidelinesMenu(keyword = "") {
    const menuContainer = document.getElementById("guideline-list-menu");
    menuContainer.innerHTML = "";

    const filteredGuides = state.guidelines.filter(g => 
        g.title.toLowerCase().includes(keyword.toLowerCase()) ||
        g.summary.toLowerCase().includes(keyword.toLowerCase())
    );

    if (filteredGuides.length === 0) {
        menuContainer.innerHTML = `<li style="text-align:center; color:var(--text-muted); font-size:13px; padding:20px;">Không tìm thấy quy trình phù hợp.</li>`;
        return;
    }

    filteredGuides.forEach((guide, index) => {
        const li = document.createElement("li");
        li.className = "library-menu-item";
        li.id = `guide-menu-${guide.id}`;
        li.innerHTML = `
            <h5>${guide.title}</h5>
            <p>${guide.summary}</p>
        `;
        li.addEventListener("click", () => {
            // Loại bỏ active của các menu khác
            document.querySelectorAll(".library-menu-item").forEach(el => el.classList.remove("active"));
            li.classList.add("active");
            renderGuidelineDetail(guide.id);
        });
        menuContainer.appendChild(li);
    });

    // Active phần tử đầu tiên nếu chưa chọn cái nào
    const activeItem = menuContainer.querySelector(".library-menu-item");
    if (activeItem && !document.querySelector(".library-content-header")) {
        activeItem.classList.add("active");
    }
}

function renderGuidelineDetail(guideId) {
    const guide = state.guidelines.find(g => g.id === guideId);
    const contentPanel = document.getElementById("guideline-detail-panel");
    
    // Highlight menu tương ứng
    document.querySelectorAll(".library-menu-item").forEach(el => el.classList.remove("active"));
    const activeMenuItem = document.getElementById(`guide-menu-${guideId}`);
    if (activeMenuItem) activeMenuItem.classList.add("active");

    if (!guide) {
        contentPanel.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:50px;">Hãy chọn một quy trình từ danh sách bên trái để đọc nội dung.</div>`;
        return;
    }

    const typeLabel = guide.type === "technical" ? "Hỗ trợ kỹ thuật" : "Tổ chức Sự kiện";
    const typeClass = guide.type === "technical" ? "tech" : "collective";

    contentPanel.innerHTML = `
        <div class="library-content-header">
            <div>
                <div class="guide-badge-wrapper" style="margin-bottom:8px;">
                    <span class="tag ${typeClass}">${typeLabel}</span>
                </div>
                <h3 style="font-size: 20px; font-weight: 700; color:var(--text-primary);">${guide.title}</h3>
                <p style="font-size: 13px; color: var(--text-muted); margin-top: 6px;">${guide.summary}</p>
            </div>
            
            <div style="display:flex; gap:8px;">
                <button class="btn btn-secondary" onclick="openGuidelineModal('${guide.id}')" title="Sửa hướng dẫn">
                    <i class="fa-solid fa-pen-to-square"></i> Sửa
                </button>
                <button class="btn btn-danger" onclick="deleteGuideline('${guide.id}')" title="Xóa hướng dẫn">
                    <i class="fa-solid fa-trash-can"></i> Xóa
                </button>
            </div>
        </div>

        <div class="library-body">
            ${parseMarkdown(guide.content)}
        </div>

        ${guide.checklist && guide.checklist.length > 0 ? `
        <div class="library-checklist-preview">
            <h4>Checklist quy chuẩn mẫu (${guide.checklist.length} bước)</h4>
            <ul>
                ${guide.checklist.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        <div style="margin-top: 24px; border-top: 1px solid var(--border-glass); padding-top: 20px;">
            <button class="btn btn-primary" onclick="createTaskFromGuideline('${guide.id}')">
                <i class="fa-solid fa-paper-plane"></i> Giao việc dựa trên Quy trình này
            </button>
        </div>
    `;
}

function createTaskFromGuideline(guideId) {
    // Chuyển sang tab Board
    state.activePage = "board";
    updateNavigation();
    
    // Mở Task Modal và chọn Guideline
    openTaskModal();
    
    // Chọn Guideline trong dropdown và kích hoạt event change để nạp nội dung tự động
    const select = document.getElementById("task-guideline");
    select.value = guideId;
    
    // Tạo sự kiện đổi dữ liệu nhân tạo
    const event = new Event('change');
    select.dispatchEvent(event);
}

// --- BIỂU MẪU QUY TRÌNH HƯỚNG DẪN (GUIDELINE MODAL) ---
function openGuidelineModal(guideId = null) {
    const modal = document.getElementById("modal-guideline");
    const form = document.getElementById("form-guideline");
    const modalTitle = document.getElementById("guideline-modal-title");
    const checklistContainer = document.getElementById("modal-guide-checklist-container");

    form.reset();
    checklistContainer.innerHTML = "";

    if (guideId) {
        modalTitle.innerText = "Chỉnh sửa quy trình hướng dẫn";
        const guide = state.guidelines.find(g => g.id === guideId);
        if (guide) {
            document.getElementById("guideline-id").value = guide.id;
            document.getElementById("guide-title").value = guide.title;
            document.getElementById("guide-type").value = guide.type;
            document.getElementById("guide-summary").value = guide.summary;
            document.getElementById("guide-content").value = guide.content;

            if (guide.checklist && guide.checklist.length > 0) {
                guide.checklist.forEach(item => {
                    addGuideChecklistItemInput(item);
                });
            }
        }
    } else {
        modalTitle.innerText = "Tạo quy trình hướng dẫn mới";
        document.getElementById("guideline-id").value = "";
        
        // Tạo sẵn 2 dòng checklist trống cho người dùng nhập
        addGuideChecklistItemInput();
        addGuideChecklistItemInput();
    }

    modal.classList.add("active");
}

function closeGuidelineModal() {
    document.getElementById("modal-guideline").classList.remove("active");
}

function addGuideChecklistItemInput(val = "") {
    const container = document.getElementById("modal-guide-checklist-container");
    const div = document.createElement("div");
    div.className = "checklist-builder-item";
    div.innerHTML = `
        <input class="form-input" type="text" placeholder="Nhập đầu mục checklist..." value="${val.replace(/"/g, '&quot;')}" required>
        <button type="button" class="btn btn-icon btn-danger" onclick="this.parentElement.remove()" style="border-radius: var(--radius-md); width: 38px; height: 38px; flex-shrink:0;">
            <i class="fa-solid fa-trash-can"></i>
        </button>
    `;
    container.appendChild(div);
}

function handleGuidelineFormSubmit(e) {
    e.preventDefault();

    const id = document.getElementById("guideline-id").value;
    const title = document.getElementById("guide-title").value.trim();
    const type = document.getElementById("guide-type").value;
    const summary = document.getElementById("guide-summary").value.trim();
    const content = document.getElementById("guide-content").value.trim();

    const checklistInputs = document.querySelectorAll("#modal-guide-checklist-container .checklist-builder-item input[type='text']");
    const checklist = [];
    checklistInputs.forEach(input => {
        const text = input.value.trim();
        if (text) checklist.push(text);
    });

    if (id) {
        // Cập nhật quy trình
        const index = state.guidelines.findIndex(g => g.id === id);
        if (index !== -1) {
            state.guidelines[index] = {
                ...state.guidelines[index],
                title,
                type,
                summary,
                content,
                checklist
            };
        }
    } else {
        // Tạo quy trình mới
        const newGuide = {
            id: "guide-" + Date.now(),
            title,
            type,
            summary,
            content,
            checklist
        };
        state.guidelines.push(newGuide);
    }

    saveState("guidelines");
    closeGuidelineModal();
    populateSelectDropdowns();
    renderGuidelinesMenu();
    
    // Chọn hiển thị hướng dẫn mới lưu
    const targetId = id || state.guidelines[state.guidelines.length - 1].id;
    renderGuidelineDetail(targetId);
}

function deleteGuideline(guideId) {
    // Kiểm tra xem quy trình này có đang được liên kết với công việc nào không
    const isLinked = state.tasks.some(t => t.guidelineId === guideId);
    let msg = "Bạn có chắc chắn muốn xóa hướng dẫn này không?";
    if (isLinked) {
        msg = "Cảnh báo: Hướng dẫn này đang được sử dụng trong một số công việc hiện tại. Xóa hướng dẫn sẽ không làm mất checklist của công việc, nhưng mối liên kết tham chiếu sẽ bị hủy bỏ. Bạn vẫn muốn xóa?";
    }

    if (confirm(msg)) {
        state.guidelines = state.guidelines.filter(g => g.id !== guideId);
        saveState("guidelines");
        populateSelectDropdowns();
        renderGuidelinesMenu();
        
        // Nạp lại chi tiết cái đầu tiên
        if (state.guidelines.length > 0) {
            renderGuidelineDetail(state.guidelines[0].id);
        } else {
            document.getElementById("guideline-detail-panel").innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:50px;">Thư viện trống. Hãy tạo hướng dẫn đầu tiên.</div>`;
        }
    }
}

// ----------------- 9. QUẢN LÝ THÀNH VIÊN -----------------
function renderTeamMembers() {
    const grid = document.getElementById("team-members-grid");
    grid.innerHTML = "";

    state.members.forEach(member => {
        // Tính số lượng công việc được giao của thành viên này mà chưa xong
        const activeTasksCount = state.tasks.filter(t => t.assignedTo === member.id && t.status !== "done").length;
        const totalTasksCount = state.tasks.filter(t => t.assignedTo === member.id).length;

        const card = document.createElement("div");
        card.className = "member-card";
        card.innerHTML = `
            <div class="avatar member-card-avatar">${member.avatar}</div>
            <div class="member-card-info">
                <span class="member-card-name">${member.name}</span>
                <span class="member-card-role">${member.role}</span>
                <span class="member-card-stats">
                    <i class="fa-solid fa-list-check"></i> Đang làm: ${activeTasksCount} | Tổng giao: ${totalTasksCount}
                </span>
            </div>
            <button class="member-delete-btn" onclick="deleteMember('${member.id}')" title="Xóa nhân viên" style="right: 12px;">
                <i class="fa-solid fa-user-minus"></i>
            </button>
            <button class="member-delete-btn edit-member-btn" onclick="startEditMember('${member.id}')" title="Sửa thông tin nhân viên" style="right: 36px; color: var(--color-primary);">
                <i class="fa-solid fa-user-pen"></i>
            </button>
        `;
        grid.appendChild(card);
    });
}

function startEditMember(memberId) {
    const member = state.members.find(m => m.id === memberId);
    if (!member) return;

    document.getElementById("member-id").value = member.id;
    document.getElementById("member-name").value = member.name;
    document.getElementById("member-role").value = member.role;
    document.getElementById("member-initials").value = member.avatar;

    document.getElementById("member-form-title").innerText = "Sửa thông tin thành viên";
    
    const icon = document.getElementById("btn-submit-member-icon");
    icon.className = "fa-solid fa-check";
    
    document.getElementById("btn-submit-member-text").innerText = "Cập nhật";
    document.getElementById("btn-cancel-member-edit").style.display = "block";

    // Scroll nhẹ đến form chỉnh sửa trên mobile
    document.getElementById("form-add-member").scrollIntoView({ behavior: 'smooth' });
}

function cancelMemberEdit() {
    document.getElementById("member-id").value = "";
    document.getElementById("form-add-member").reset();

    document.getElementById("member-form-title").innerText = "Thêm thành viên mới";
    
    const icon = document.getElementById("btn-submit-member-icon");
    icon.className = "fa-solid fa-user-plus";
    
    document.getElementById("btn-submit-member-text").innerText = "Thêm thành viên";
    document.getElementById("btn-cancel-member-edit").style.display = "none";
}

function handleAddMemberSubmit(e) {
    e.preventDefault();

    const id = document.getElementById("member-id").value;
    const name = document.getElementById("member-name").value.trim();
    const role = document.getElementById("member-role").value.trim();
    const initials = document.getElementById("member-initials").value.trim().toUpperCase();

    if (name && role && initials) {
        if (id) {
            // Cập nhật thành viên hiện tại
            const index = state.members.findIndex(m => m.id === id);
            if (index !== -1) {
                state.members[index] = {
                    ...state.members[index],
                    name,
                    role,
                    avatar: initials
                };
                saveState("members");
            }
        } else {
            // Thêm thành viên mới
            const newMember = {
                id: "mem-" + Date.now(),
                name,
                role,
                avatar: initials
            };
            state.members.push(newMember);
            saveState("members");
        }
        
        cancelMemberEdit(); // reset form và đưa về chế độ Thêm mới
        populateSelectDropdowns();
        renderAll();
    }
}

function deleteMember(memberId) {
    // Đếm số công việc chưa hoàn thành giao cho người này
    const unfinishedTasks = state.tasks.filter(t => t.assignedTo === memberId && t.status !== "done");

    if (unfinishedTasks.length > 0) {
        alert(`Không thể xóa thành viên này vì họ đang có ${unfinishedTasks.length} công việc chưa hoàn thành. Hãy bàn giao lại các công việc này cho thành viên khác trước khi xóa!`);
        return;
    }

    if (confirm("Bạn có chắc chắn muốn xóa thành viên này ra khỏi hệ thống?")) {
        // Chuyển các công việc đã hoàn thành (nếu có) sang người chịu trách nhiệm ảo "Không có" hoặc cứ xóa đi
        // Ở đây để đơn giản ta gán lại cho trưởng nhóm hoặc xóa phân công
        state.tasks.forEach(t => {
            if (t.assignedTo === memberId) {
                t.assignedTo = ""; // Không có ai
            }
        });
        
        state.members = state.members.filter(m => m.id !== memberId);
        
        saveState("members");
        saveState("tasks");
        
        populateSelectDropdowns();
        renderAll();
    }
}

// ----------------- 10. NHẬP / XUẤT SAO LƯU JSON & RESET DATABASE -----------------
function exportData() {
    const dataStr = JSON.stringify({
        tasks: state.tasks,
        members: state.members,
        guidelines: state.guidelines
    }, null, 2);
    
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    const dateStr = new Date().toISOString().split("T")[0];
    link.download = `itflow_backup_${dateStr}.json`;
    link.href = url;
    link.click();
    
    URL.revokeObjectURL(url);
}

function importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const data = JSON.parse(evt.target.result);
            if (data.tasks && data.members && data.guidelines) {
                state.tasks = data.tasks;
                state.members = data.members;
                state.guidelines = data.guidelines;

                saveState("tasks");
                saveState("members");
                saveState("guidelines");

                alert("Nhập dữ liệu thành công! Ứng dụng sẽ tải lại trang.");
                window.location.reload();
            } else {
                alert("File JSON không đúng định dạng sao lưu của IT-Flow.");
            }
        } catch (err) {
            alert("Lỗi khi đọc file dữ liệu: " + err.message);
        }
    };
    reader.readAsText(file);
}

function resetDatabase() {
    if (confirm("CẢNH BÁO: Hành động này sẽ xóa toàn bộ dữ liệu công việc, thành viên tự tạo của bạn và khôi phục lại dữ liệu mẫu gốc ban đầu. Bạn có đồng ý không?")) {
        localStorage.removeItem("itflow_tasks");
        localStorage.removeItem("itflow_members");
        localStorage.removeItem("itflow_guidelines");
        localStorage.removeItem("itflow_theme");
        alert("Đã đặt lại dữ liệu thành công. Trang sẽ tự động tải lại!");
        window.location.reload();
    }
}

// ----------------- 11. CÁC HÀM TIỆN ÍCH (HELPER FUNCTIONS) -----------------

// Định dạng ngày hiển thị (YYYY-MM-DD -> DD/MM/YYYY)
function formatDate(dateStr) {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// Parser Markdown tối giản tự thiết kế cho SOP
function parseMarkdown(text) {
    if (!text) return "";
    
    // Bảo vệ ký tự HTML
    let html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    
    // Định dạng heading ### Tiêu đề con
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    
    // Định dạng heading ## Tiêu đề lớn
    html = html.replace(/^## (.*$)/gim, '<h2 style="font-size:16px; margin-top:16px; color:var(--text-primary);">$1</h2>');

    // Chữ đậm **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Code inline `code`
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');

    // Xử lý list (dấu chấm đầu dòng và số thứ tự)
    const lines = html.split('\n');
    let inUnorderedList = false;
    let inOrderedList = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        
        if (line.startsWith("- ") || line.startsWith("* ")) {
            let content = line.substring(2);
            let prefix = "";
            
            if (inOrderedList) {
                prefix += "</ol>";
                inOrderedList = false;
            }
            
            if (!inUnorderedList) {
                prefix += '<ul style="margin-left: 20px; margin-bottom: 12px; list-style-type: disc;">';
                inUnorderedList = true;
            }
            
            lines[i] = `${prefix}<li style="margin-bottom:6px;">${content}</li>`;
        } 
        else if (/^\d+\.\s/.test(line)) {
            let content = line.replace(/^\d+\.\s/, '');
            let prefix = "";
            
            if (inUnorderedList) {
                prefix += "</ul>";
                inUnorderedList = false;
            }
            
            if (!inOrderedList) {
                prefix += '<ol style="margin-left: 20px; margin-bottom: 12px; list-style-type: decimal;">';
                inOrderedList = true;
            }
            
            lines[i] = `${prefix}<li style="margin-bottom:6px;">${content}</li>`;
        } 
        else {
            let prefix = "";
            if (inUnorderedList) {
                prefix += "</ul>";
                inUnorderedList = false;
            }
            if (inOrderedList) {
                prefix += "</ol>";
                inOrderedList = false;
            }
            
            // Dòng văn bản bình thường, nếu rỗng thì thay bằng ngắt dòng hoặc tạo thẻ p
            if (line === "") {
                lines[i] = prefix + '<p style="margin-bottom:12px;"></p>';
            } else {
                lines[i] = prefix + `<p style="margin-bottom:8px;">${line}</p>`;
            }
        }
    }

    // Đóng các thẻ danh sách chưa đóng ở cuối file
    let endStr = "";
    if (inUnorderedList) endStr += "</ul>";
    if (inOrderedList) endStr += "</ol>";

    return lines.join('\n') + endStr;
}

// Khởi chạy hệ thống sau khi trang load xong
window.addEventListener("DOMContentLoaded", initApp);
