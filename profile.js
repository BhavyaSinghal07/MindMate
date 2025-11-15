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
        html += `
            <img src="${a}" class="avatar-choice" onclick="setAvatar('${a}')">
        `;
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

//  CROPPER MODAL CREATION ============

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
        </div>
    `;

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

// ========= SAVE BIO ======================
document.getElementById("saveBioBtn").addEventListener("click", () => {
    let user = JSON.parse(localStorage.getItem("mindmateUser")) || {};
    user.bio = document.getElementById("userBio").value;
    localStorage.setItem("mindmateUser", JSON.stringify(user));
    alert("Bio updated!");
});

// ===== SAVE PROFILE DETAILS =================
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


// === BACK TO DASHBOARD (NAVBAR CLICK) ============
document.querySelector(".profile-mini").addEventListener("click", () => {
    window.location.href = "dashboard.html";
});


document.getElementById('logoutBtn').addEventListener('click', function(){
        window.location.href = 'index.html';
    });
