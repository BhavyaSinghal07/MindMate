// LOAD USER DATA 
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("mindmateUser")) || {};

    document.getElementById("profileName").textContent = user.name || "User";
    document.getElementById("profileEmail").textContent = user.email || "";
    document.getElementById("miniProfileName").textContent = user.name || "User";

    document.getElementById("detailName").value = user.name || "";
    document.getElementById("detailEmail").value = user.email || "";
    document.getElementById("detailPhone").value = user.phone || "";
    document.getElementById("altPhone").value = user.altPhone || "";
    document.getElementById("detailDOB").value = user.dob || "";
    document.getElementById("detailGender").value = user.gender || "";
    document.getElementById("userBio").value = user.bio || "";

    if (user.photo) {
        document.getElementById("profilePic").src = user.photo;
        document.getElementById("miniProfilePic").src = user.photo;
    } else {
        document.getElementById("profilePic").src = "avtaar.png";
        document.getElementById("miniProfilePic").src = "avtaar.png";
    }
});


//  AVATAR POPUP
const avatarOptions = ["avtaar.png","avtaar1.png","avtaar2.jpg","avtaar3.jpg","avtaar4.jpg"];
let avatarPopup;

function openAvatarPicker() {
    avatarPopup = document.createElement("div");
    avatarPopup.className = "avatar-popup";

    let html = "<h3>Select Avatar</h3><div class='avatar-grid'>";
    
    avatarOptions.forEach(a => {
        html += `<img src="${a}" class="avatar-choice" onclick="setAvatar('${a}')">`;
    });

    html += `</div><button onclick="closeAvatarPopup()" class="close-avatar">Close</button>`;

    avatarPopup.innerHTML = html;
    document.body.appendChild(avatarPopup);
}

function closeAvatarPopup() {
    if (avatarPopup) avatarPopup.remove();
}

function setAvatar(src) {
    document.getElementById("profilePic").src = src;
    document.getElementById("miniProfilePic").src = src;

    let user = JSON.parse(localStorage.getItem("mindmateUser")) || {};
    user.photo = src;
    localStorage.setItem("mindmateUser", JSON.stringify(user));

    closeAvatarPopup();
}


// PHOTO UPLOAD + CROPPER 
let cropper;

document.getElementById("changePhotoBtn").addEventListener("click", () => {
    let choose = confirm("Choose OK to Upload Photo\nChoose Cancel for Avatar Options");

    if (!choose) {
        openAvatarPicker();
    } else {
        document.getElementById("profileUpload").click();
    }
});

document.getElementById("profileUpload").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        openCropper(event.target.result);
    };
    reader.readAsDataURL(file);
});


//  CROPPER MODAL CREATION 
function openCropper(imageSrc) {
    let cropModal = document.createElement("div");
    cropModal.className = "crop-modal";
    cropModal.innerHTML = `
        <div class="crop-box">
            <img id="cropImage" src="${imageSrc}">
            <div class="crop-actions">
                <button id="cropSaveBtn">Save Photo</button>
                <button id="cropCancelBtn">Cancel</button>
            </div>
        </div>`;

    document.body.appendChild(cropModal);

    let img = document.getElementById("cropImage");

    cropper = new Cropper(img, {
        aspectRatio: 1,
        viewMode: 1,
    });

    document.getElementById("cropCancelBtn").onclick = () => cropModal.remove();

    document.getElementById("cropSaveBtn").onclick = () => {
        let canvas = cropper.getCroppedCanvas({
            width: 300,
            height: 300
        });

        let croppedImg = canvas.toDataURL("image/png");

        document.getElementById("profilePic").src = croppedImg;
        document.getElementById("miniProfilePic").src = croppedImg;

        let user = JSON.parse(localStorage.getItem("mindmateUser")) || {};
        user.photo = croppedImg;
        localStorage.setItem("mindmateUser", JSON.stringify(user));

        cropModal.remove();
    };
}


// SAVE BIO 
document.getElementById("saveBioBtn").addEventListener("click", () => {
    let user = JSON.parse(localStorage.getItem("mindmateUser")) || {};
    user.bio = document.getElementById("userBio").value;
    localStorage.setItem("mindmateUser", JSON.stringify(user));
    alert("Bio updated!");
});

// SAVE PROFILE DETAILS 
document.getElementById("profileDetailsForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("mindmateUser")) || {};

    user.name = document.getElementById("detailName").value;
    user.phone = document.getElementById("detailPhone").value;
    user.altPhone = document.getElementById("altPhone").value;
    user.dob = document.getElementById("detailDOB").value;
    user.gender = document.getElementById("detailGender").value;

    // Password Check
    const oldP = document.getElementById("oldPass").value;
    const newP = document.getElementById("newPass").value;
    const confirmP = document.getElementById("confirmPass").value;

    if (newP || confirmP) {
        if (newP !== confirmP) {
            alert("New passwords do not match!");
            return;
        }
        user.password = newP;
    }

    localStorage.setItem("mindmateUser", JSON.stringify(user));

    alert("Profile updated!");
});


// BACK TO DASHBOARD (NAVBAR CLICK)
document.querySelector(".profile-mini").addEventListener("click", () => {
    window.location.href = "dashboard.html";
});


document.getElementById('logoutBtn').addEventListener('click', function(){
        window.location.href = 'index.html';
});



/* ===== Activity Calendar Heatmap Script =====
   - Stores activity counts in localStorage key 'mindmateActivity'
   - Format: { "YYYY-MM-DD": count, ... }
   - Use incrementActivity(dateStr, n) to add activity (n optional)
*/

(function () {
  const storageKey = "mindmateActivity";
  const calGrid = document.getElementById("calGrid");
  const calTitle = document.getElementById("calTitle");
  const prevBtn = document.getElementById("calPrev");
  const nextBtn = document.getElementById("calNext");

  // Start with today
  let viewDate = new Date(); // will be set to 1st of month in render

  function loadActivity() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch {
      return {};
    }
  }

  function saveActivity(obj) {
    localStorage.setItem(storageKey, JSON.stringify(obj));
  }

  // increment activity for a date (YYYY-MM-DD)
  window.incrementActivity = function(dateStr, n = 1) {
    const data = loadActivity();
    data[dateStr] = (data[dateStr] || 0) + n;
    saveActivity(data);
    renderCalendar(viewDate);
  };

  // helper: format YYYY-MM-DD
  function ymd(date) {
    return date.toISOString().slice(0,10);
  }

  // determine intensity class by count
  function intensityClass(count, max) {
    if (!count || count <= 0) return "none";
    // normalize to low/mid/high based on max
    if (max <= 1) return "low";
    const ratio = count / max;
    if (ratio < 0.4) return "low";
    if (ratio < 0.8) return "mid";
    return "high";
  }

  // render the calendar for month of `d` (Date)
  function renderCalendar(d) {
    // set to first of month
    const first = new Date(d.getFullYear(), d.getMonth(), 1);
    const year = first.getFullYear();
    const month = first.getMonth();

    calTitle.textContent = first.toLocaleString(undefined, { month: "long", year: "numeric" });

    // how many days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // weekday of first (0=Sun..6=Sat)
    const startWeekday = first.getDay();

    // load activity data and compute max for normalization
    const activity = loadActivity();
    let maxCount = 0;
    for (let i = 1; i <= daysInMonth; i++) {
      const key = `${year}-${String(month + 1).padStart(2,"0")}-${String(i).padStart(2,"0")}`;
      const c = activity[key] || 0;
      if (c > maxCount) maxCount = c;
    }

    // clear grid
    calGrid.innerHTML = "";

    // leading empty cells
    for (let i = 0; i < startWeekday; i++) {
      const empty = document.createElement("div");
      empty.className = "cal-cell empty";
      calGrid.appendChild(empty);
    }

    // day cells
    for (let day = 1; day <= daysInMonth; day++) {

        const cell = document.createElement("div");
        cell.className = "cal-cell";

        const key = `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
        const dateObj = new Date(`${key}T00:00:00`);
        const today = new Date();
        today.setHours(0,0,0,0);

        // FUTURE DATE → blur + no activity color
        if (dateObj > today) {
            cell.classList.add("future");
            cell.textContent = day;
            calGrid.appendChild(cell);
            continue;
        }

        // PAST or TODAY → normal heatmap behavior
        const count = activity[key] || 0;
        const cls = intensityClass(count, maxCount);
        cell.classList.add(cls);

        cell.textContent = day;

        const tip = document.createElement("div");
        tip.className = "cal-tooltip";
        tip.innerText = `${key} — ${count} activity`;
        cell.appendChild(tip);

        calGrid.appendChild(cell);
    }


    // trailing empty cells to complete the grid (optional)
    const totalCells = startWeekday + daysInMonth;
    const trailing = (7 - (totalCells % 7)) % 7;
    for (let i = 0; i < trailing; i++) {
      const empty = document.createElement("div");
      empty.className = "cal-cell empty";
      calGrid.appendChild(empty);
    }
  }

  // prev/next controls
  prevBtn.addEventListener("click", () => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    renderCalendar(viewDate);
  });

  nextBtn.addEventListener("click", () => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    renderCalendar(viewDate);
  });

  // start render: set viewDate to first of current month
  viewDate = new Date();
  renderCalendar(viewDate);

  // OPTIONAL: demo helper to generate random data (comment/uncomment to use)
  // generateDemoData();

  function generateDemoData() {
    const data = {};
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    for (let d = 1; d <= 28; d++) {
      const key = `${year}-${String(month).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
      data[key] = Math.round(Math.random() * 6);
    }
    saveActivity(data);
    renderCalendar(viewDate);
  }

})();