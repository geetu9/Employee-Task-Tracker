let data =
    JSON.parse(localStorage.getItem("employees")) ||
    {
        employees: [
            {
                id: 1,
                name: "Alice Johnson",
                role: "Frontend Developer",
                tasks: [
                    { id: 101, title: "Build login page", status: "Completed" },
                    { id: 102, title: "Implement dashboard", status: "In Progress" },
                    { id: 103, title: "Fix responsiveness issues", status: "Pending" }
                ]
            },
            {
                id: 2,
                name: "Bob Smith",
                role: "Backend Developer",
                tasks: [
                    { id: 201, title: "API integration", status: "Pending" },
                    { id: 202, title: "Create auth middleware", status: "In Progress" }
                ]
            },
            {
                id: 3,
                name: "Charlie Wilson",
                role: "UI/UX Designer",
                tasks: [
                    { id: 301, title: "Design dashboard layout", status: "Completed" },
                    { id: 302, title: "Revamp color palette", status: "In Progress" }
                ]
            },
            {
                id: 4,
                name: "Diana Brown",
                role: "QA Engineer",
                tasks: [
                    { id: 401, title: "Test login module", status: "Completed" },
                    { id: 402, title: "Write test cases", status: "Pending" },
                    { id: 403, title: "Bug report compilation", status: "In Progress" }
                ]
            },
            {
                id: 5,
                name: "Ethan Miller",
                role: "DevOps Engineer",
                tasks: [
                    { id: 501, title: "Setup CI/CD pipeline", status: "In Progress" },
                    { id: 502, title: "Monitor server performance", status: "Pending" }
                ]
            },
            {
                id: 6,
                name: "Fiona Garcia",
                role: "Project Manager",
                tasks: [
                    { id: 601, title: "Prepare sprint planning", status: "Completed" },
                    { id: 602, title: "Client communication", status: "In Progress" }
                ]
            },
            {
                id: 7,
                name: "George Anderson",
                role: "Full-Stack Developer",
                tasks: [
                    { id: 701, title: "Optimize database queries", status: "Pending" },
                    { id: 702, title: "Fix UI bugs", status: "Completed" }
                ]
            },
            {
                id: 8,
                name: "Hannah Lee",
                role: "Content Strategist",
                tasks: [
                    { id: 801, title: "Write homepage text", status: "Completed" },
                    { id: 802, title: "Proofread product pages", status: "Pending" }
                ]
            },
            {
                id: 9,
                name: "Ian Martinez",
                role: "Mobile App Developer",
                tasks: [
                    { id: 901, title: "Create onboarding screen", status: "In Progress" },
                    { id: 902, title: "Fix navigation bugs", status: "Pending" }
                ]
            }
        ]
    };


function saveData() {
    localStorage.setItem("employees", JSON.stringify(data));
}

function renderEmployees(filter = "All") {
    const container = document.getElementById("employeeList");
    container.innerHTML = "";

    data.employees.forEach(emp => {
        const empDiv = document.createElement("div");
        empDiv.classList.add("employee-card");

        empDiv.innerHTML = `
            <h2>${emp.name} <span style="color:gray; font-size:14px">(${emp.role})</span></h2>
        `;

        const tasksToShow = emp.tasks.filter(
            t => filter === "All" || t.status === filter
        );

        tasksToShow.forEach(task => {
            const tDiv = document.createElement("div");
            tDiv.classList.add("task");

            tDiv.innerHTML = `
                <span>${task.title}</span>
                <span style="font-weight:bold; color:${
                    task.status === "Completed"
                        ? "green"
                        : task.status === "Pending"
                        ? "red"
                        : "orange"
                }">${task.status}</span>
            `;

            empDiv.appendChild(tDiv);
        });

        container.appendChild(empDiv);
    });

    updateDashboard();
}

function updateDashboard() {
    const all = data.employees.flatMap(e => e.tasks);

    document.getElementById("totalTasks").textContent = all.length;
    document.getElementById("completedTasks").textContent = all.filter(t => t.status === "Completed").length;
    document.getElementById("pendingTasks").textContent = all.filter(t => t.status === "Pending").length;
    document.getElementById("progressTasks").textContent = all.filter(t => t.status === "In Progress").length;
}

document.getElementById("statusFilter").addEventListener("change", e => {
    renderEmployees(e.target.value);
});

function loadEmployeesToDropdown() {
    const select = document.getElementById("employeeSelect");
    data.employees.forEach(emp => {
        const opt = document.createElement("option");
        opt.value = emp.id;
        opt.textContent = emp.name;
        select.appendChild(opt);
    });
}

document.getElementById("taskForm").addEventListener("submit", e => {
    e.preventDefault();

    const empId = Number(document.getElementById("employeeSelect").value);
    const title = document.getElementById("taskTitle").value;
    const status = document.getElementById("taskStatus").value;

    const newTask = {
        id: Math.floor(Math.random() * 10000),
        title,
        status
    };

    data.employees.find(e => e.id === empId).tasks.push(newTask);

    saveData();
    renderEmployees();
    alert("Task Added Successfully!");

    document.getElementById("taskTitle").value = "";
});

renderEmployees();
loadEmployeesToDropdown();
