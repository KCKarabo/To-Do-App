// Redirect if user is not signed in
if (!localStorage.getItem("username")) {
  window.location.href = "signin.html";
}


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let draggedIndex = null;

// Theme setup
const themeToggle = document.createElement("button");
themeToggle.textContent = "🎨 Toggle Theme";
themeToggle.classList.add("theme-toggle");
themeToggle.style.height = "40px";
themeToggle.style.borderRadius = "20px";
themeToggle.style.padding = "8px 12px";
themeToggle.style.border = "2px solid #ffb6c1";
themeToggle.style.backgroundColor = "#fff0f5";
themeToggle.style.marginLeft = "10px";
themeToggle.style.cursor = "pointer";
themeToggle.onclick = () => {
  const body = document.body;
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("cute");
    localStorage.setItem("theme", "cute");
  } else if (body.classList.contains("cute")) {
    body.classList.remove("cute");
    localStorage.setItem("theme", "light");
  } else {
    body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
  applyTheme();
};
const timeInput = document.getElementById("due-time");
if (timeInput) {
  Object.assign(timeInput.style, {
    height: "40px",
    borderRadius: "20px",
    padding: "8px 12px",
    border: "2px solid #ffb6c1",
    backgroundColor: "#fff0f5",
    marginLeft: "10px",
    cursor: "pointer",
    fontSize: "16px"
  });
}

const avatar = document.createElement("img");
avatar.src = "https://api.dicebear.com/7.x/thumbs/svg?seed=" + username;
avatar.alt = "User Avatar";
avatar.style.width = "60px";
avatar.style.borderRadius = "50%";
avatar.style.marginTop = "10px";
avatar.style.marginBottom = "5px";
document.body.insertBefore(avatar, document.body.firstChild);

document.addEventListener("DOMContentLoaded", () => {

  if (username) {
  const userBox = document.createElement("div");
  userBox.style.display = "flex";
  userBox.style.alignItems = "center";
  userBox.style.justifyContent = "space-between";
  userBox.style.marginBottom = "10px";
  userBox.style.padding = "0 10px";

  // Greeting
  const greeting = document.createElement("h2");
  greeting.textContent = `Hello, ${username}!`;
  greeting.style.color = "#ff69b4";
  greeting.style.fontWeight = "bold";

  // Logout Button
  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "🚪 Log Out";
  logoutBtn.style.padding = "6px 12px";
  logoutBtn.style.borderRadius = "20px";
  logoutBtn.style.border = "2px solid #ffb6c1";
  logoutBtn.style.backgroundColor = "#fff0f5";
  logoutBtn.style.cursor = "pointer";

  logoutBtn.onclick = () => {
    localStorage.removeItem("username");
    window.location.href = "signin.html";
  };

  userBox.appendChild(greeting);
  userBox.appendChild(logoutBtn);

  // Now insert it at the very top of the body without breaking anything
  document.body.insertBefore(userBox, document.body.firstChild);
}

  const emojiButton = document.createElement("button");
  emojiButton.textContent = "😊 Emoji";
  emojiButton.classList.add("emoji-picker");
  emojiButton.style.height = "40px";
  emojiButton.style.borderRadius = "20px";
  emojiButton.style.padding = "8px 12px";
  emojiButton.style.border = "2px solid #ffb6c1";
  emojiButton.style.backgroundColor = "#fff0f5";
  emojiButton.style.marginLeft = "10px";
  emojiButton.style.cursor = "pointer";
  emojiButton.onclick = () => {
    const picker = document.createElement("div");
    picker.classList.add("emoji-grid");
   picker.innerHTML = `
🍕 🍔 🍟 🌭 🍿 🥗 🍣 🍰 🎂 ☕ 🍩 🍎 🍇 🍉 🍌 🧁
🍳 🥘 🍜 🥞 🍽️ 👨‍🍳 👩‍🍳
🚿 🛁 🧼 🧺 🧽 🧹 🧻 🛒 🧴
🛏️ 🛋️ 🪑 🚪 🚗 🚲 ✈️ 🚆
🏃‍♂️ 🏋️‍♀️ 🧘‍♀️ 🧗‍♂️ 🚴‍♀️ 🤸‍♂️ 🤽‍♀️
💼 📝 📅 📞 💳 📚 🧠 📷 💻 🏫 🏠 🛠️ 🔧 💡 🔋
🌸 🌻 🌞 🌧️ 🌙 🌈 ☁️ ⛄ 🌊 🔥
🧸 🎨 🎮 🎵 🎤 📺 📻 📱 🖥️ 💅 🧖‍♀️ 💄 🛍️
`.split(/\s+/).map(emoji => `<button class='emoji-btn'>${emoji}</button>`).join("");


    document.body.appendChild(picker);

    picker.querySelectorAll(".emoji-btn").forEach(btn => {
      btn.onclick = () => {
        const input = document.getElementById("task-input");
        input.value = `${btn.textContent} ${input.value}`;
        input.focus();
        picker.remove();
      };
    });

    document.addEventListener("click", (e) => {
      if (!picker.contains(e.target) && e.target !== emojiButton) {
        picker.remove();
      }
    }, { once: true });
  };
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(savedTheme);
  applyTheme();

  const sortSelect = document.querySelector("#sort");
  if (sortSelect) {
    sortSelect.parentNode.insertBefore(themeToggle, sortSelect.nextSibling);
    sortSelect.parentNode.insertBefore(emojiButton, themeToggle.nextSibling);
  }

  const selects = document.querySelectorAll("#filter, #sort");
  selects.forEach(select => {
    select.style.height = "40px";
    select.style.borderRadius = "20px";
    select.style.padding = "8px 12px";
    select.style.border = "2px solid #ffb6c1";
    select.style.backgroundColor = "#fff0f5";
  });
});

function applyTheme() {
  const body = document.body;
  body.style.background = body.classList.contains("dark") ? "#1a1a1a" : body.classList.contains("cute") ? "#fff0f5" : "#ffffff";
  body.style.color = body.classList.contains("dark") ? "#f0f0f0" : "#333";
}



function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  renderTasks();
}

function addTask() {
  const input = document.getElementById("task-input");
  const dateInput = document.getElementById("due-date");
  const timeInput = document.getElementById("due-time");
  const text = input.value.trim();
  const date = dateInput.value;
  const time = timeInput.value;
  const due = date && time ? `${date}T${time}` : date || null;

  if (!text) return;

  const task = {
    text: text,
    done: false,
    due: due,
    created: new Date().toISOString(),
    alerted: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
  input.value = "";
  dateInput.value = "";
  timeInput.value = "";
}


function renderTasks() {
  const list = document.getElementById("task-list");
  const filter = document.getElementById("filter")?.value || "all";
  const sort = document.getElementById("sort")?.value || "default";

  let filteredTasks = [...tasks];

  if (filter === "active") filteredTasks = filteredTasks.filter(t => !t.done);
  if (filter === "completed") filteredTasks = filteredTasks.filter(t => t.done);

  if (sort === "az") filteredTasks.sort((a, b) => a.text.localeCompare(b.text));
  if (sort === "za") filteredTasks.sort((a, b) => b.text.localeCompare(a.text));

  list.innerHTML = "";
  filteredTasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.classList.add("task-item");
    if (task.done) li.classList.add("completed");

    li.setAttribute("draggable", "true");
    li.setAttribute("data-index", i);
    li.innerHTML = `
      <div onclick="toggleTask(${i})">
        <span>${task.done ? '✅' : '⬜'} ${task.text}</span>
        ${task.due ? `<div class="due-date">Due: ${task.due}</div>` : ""}
      </div>
      <div class="actions">
        <button onclick="editTask(${i})">✏️</button>
        <button onclick="deleteTask(${i})">🗑️</button>
      </div>
    `;
    li.classList.add("pop-in");
    li.addEventListener("dragstart", handleDragStart);
    li.addEventListener("dragover", handleDragOver);
    li.addEventListener("drop", handleDrop);
    list.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  const taskElements = document.querySelectorAll("li");
  const li = taskElements[index];
  li.classList.add("fade-out");
  setTimeout(() => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }, 400);
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText) {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function handleDragStart(e) {
  draggedIndex = +e.target.dataset.index;
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  const targetIndex = +e.target.closest("li").dataset.index;
  if (draggedIndex === null || targetIndex === draggedIndex) return;

  const [draggedTask] = tasks.splice(draggedIndex, 1);
  tasks.splice(targetIndex, 0, draggedTask);
  saveTasks();
  renderTasks();
}

setInterval(() => {
  const now = new Date();
  tasks.forEach(task => {
    if (task.due && !task.done && !task.alerted) {
      const due = new Date(task.due);
      const diffInMs = due - now;
      const diffInMinutes = diffInMs / (1000 * 60);

      if (diffInMinutes <= 5 && diffInMinutes > 0) {
        alert(`⏰ Reminder: "${task.text}" is due in ${Math.round(diffInMinutes)} minute(s)!`);
        task.alerted = true;
        saveTasks();
      }
    }
  });
}, 30000); // checks every 30 seconds
