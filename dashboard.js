// Load saved user name after login or register
document.addEventListener("DOMContentLoaded", () => {
    const storedName = localStorage.getItem("mindmate_username");
    const storedPhoto = localStorage.getItem("mindmate_userphoto");

    if (storedName) {
        document.getElementById("username").textContent = storedName;
    }

    if (storedPhoto) {
        document.getElementById("userPhoto").src = storedPhoto;
    }
});


// ================= CAMERA BOT CLICK =================
document.getElementById("cameraBotBtn").addEventListener("click", () => {
  alert("Camera AI Assistant will open here (future integration).");
});


// ================= CHAT BOT POPUP =================
const chatBtn = document.getElementById("chatBotBtn");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChatBtn");

// Open chat
chatBtn.addEventListener("click", () => {
  chatWindow.style.display = "flex";
});

// Close chat using X button only
closeChat.addEventListener("click", () => {
  chatWindow.style.display = "none";
});


// ================= SEND MESSAGE (basic preview only) =================
document.getElementById("sendMessage").addEventListener("click", () => {
  const msg = document.getElementById("userMessage").value.trim();
  if (!msg) return;

  const chatBody = document.querySelector(".chat-body");

  let div = document.createElement("p");
  div.className = "bot-msg";
  div.style.background = "rgba(87,156,235,0.25)";
  div.style.marginLeft = "auto";
  div.textContent = msg;

  chatBody.appendChild(div);
  document.getElementById("userMessage").value = "";
});



// ===== OPEN PROFILE PAGE FROM NAVBAR =====
const openProfilePage = document.getElementById("openProfilePage");

openProfilePage?.addEventListener("click", () => {
  window.location.href = "profile.html";
});
