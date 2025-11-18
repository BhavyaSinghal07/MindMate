/* ===== MINDMATE CHART WITH HOVER DESCRIPTIONS ===== */
window.addEventListener("DOMContentLoaded", () => {

  const chartCanvas = document.getElementById("mindmateChart");
  const hoverTitle = document.getElementById("hoverTitle");
  const hoverDesc = document.getElementById("hoverDesc");
  const hoverCard = document.getElementById("statsHoverCard");

  if (!chartCanvas || typeof Chart === "undefined") return;

  const ctx = chartCanvas.getContext("2d");

  /* Professional Level Data (Desktop Hover Text) */
  const insightData = [
    {
      title: "Depression Cases - 31%",
      desc: "A rising number of individuals experience clinical depression influenced by lifestyle, work pressure, and emotional fatigue. Early intervention improves long-term recovery."
    },
    {
      title: "Avoiding Professional Help - 42%",
      desc: "Many people hesitate to seek therapy due to stigma or fear. Timely professional support prevents severe emotional decline and promotes stable mental health."
    },
    {
      title: "Therapy & Psychiatric Consultations - 17%",
      desc: "Therapy greatly enhances emotional resilience and helps individuals build healthier thought-patterns through structured sessions."
    },
    {
      title: "Undiagnosed Mental Stress - 10%",
      desc: "A large portion of people experience unnoticed chronic stress. Simple emotional check-ins and routines help detect early mental strain."
    }
  ];


/* PIE CHART ---- */
  const mindmateChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: [
        "Depression (31%)",
        "Avoiding Help (42%)",
        "Therapy Consultations (17%)",
        "Unidentified Stress (10%)"
      ],
      datasets: [
        {
          data: [31, 42, 17, 10],
          backgroundColor: ["#6c63ff", "#fbbc56ff", "#048d4bff", "#ff6584"],
          borderColor: "#a9ffeeff",
          borderWidth: 2,
          hoverOffset: 12
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#222",
            font: { size: 14 }
          }
        }
      },
      onHover: (event, chartElement) => {
        if (window.innerWidth <= 768) return; // mobile skip

        if (chartElement.length > 0) {
          const i = chartElement[0].index;

          hoverTitle.textContent = insightData[i].title;
          hoverDesc.textContent = insightData[i].desc;

          hoverCard.style.opacity = "1";
          hoverCard.style.pointerEvents = "auto";
        } 
        else {
          // Do NOT hide the card.
          hoverTitle.textContent = "Mental Health Insight";
          hoverDesc.textContent = "Hover over a section of the chart to explore insights.";

          // Keep visible
          hoverCard.style.opacity = "1";
          hoverCard.style.pointerEvents = "auto";
        }
      }
    }
  });

  /* --- ALWAYS restore default card when cursor exits chart --- */
  chartCanvas.addEventListener("mouseleave", () => {
    hoverTitle.textContent = "Mental Health Insight";
    hoverDesc.textContent = "Hover over a section of the chart to explore insights.";

    hoverCard.style.opacity = "1";
    hoverCard.style.pointerEvents = "auto";
  });

});


// HERO NAVIGATION BUTTONS
document.addEventListener("DOMContentLoaded", () => {
  const journeyBtn = document.getElementById("journeyBtn");
  const aboutBtn = document.getElementById("aboutBtn");

  journeyBtn?.addEventListener("click", () => {
    document.getElementById("journeySection")?.scrollIntoView({
      behavior: "smooth",
    });
  });

  aboutBtn?.addEventListener("click", () => {
    document.getElementById("aboutSection")?.scrollIntoView({
      behavior: "smooth",
    });
  });
});


// LOGIN / REGISTER FORMS
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const formContainer = document.getElementById("formContainer");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const closeButtons = document.querySelectorAll(".close-form");
const switchToRegister = document.getElementById("switchToRegister");
const switchToLogin = document.getElementById("switchToLogin");

// Open Login Form
loginBtn?.addEventListener("click", () => {
  formContainer.classList.add("active");
  loginForm.style.display = "flex";
  registerForm.style.display = "none";
  document.body.classList.add("blur-bg");
});

// Open Register Form
registerBtn?.addEventListener("click", () => {
  formContainer.classList.add("active");
  registerForm.style.display = "flex";
  loginForm.style.display = "none";
  document.body.classList.add("blur-bg");
});

// Switch to Register Form
switchToRegister?.addEventListener("click", () => {
  loginForm.style.display = "none";
  registerForm.style.display = "flex";
});

// Switch to Login Form
switchToLogin?.addEventListener("click", () => {
  registerForm.style.display = "none";
  loginForm.style.display = "flex";
});

// Close Form (only via X button)
closeButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.remove("active");
    document.body.classList.remove("blur-bg");
  });
});

// Prevent alert unless Login button is actually submitted
loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = document.getElementById("loginName").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (text === "" || password === "") {
    alert("Please fill in both full name and password.");
    return;
  }

  // SAVE USERNAME / EMAIL FOR DASHBOARD
  localStorage.setItem("mindmate_username", text);

  // REDIRECT TO DASHBOARD
  window.location.href = "dashboard.html";

  // Close form after login
  formContainer.classList.remove("active");
  document.body.classList.remove("blur-bg");
});


// Register Form submit
registerForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("registerEmail")?.value.trim();
  const password = document.getElementById("registerPassword")?.value.trim();
  const name = document.getElementById("regName")?.value.trim(); // (important)

  if (email === "" || password === "" || name === "") {
    alert("Please fill in all fields.");
    return;
  }

  // SAVE USER NAME FOR DASHBOARD
  localStorage.setItem("mindmate_username", name);

  // REDIRECT TO DASHBOARD
  window.location.href = "dashboard.html";

  formContainer.classList.remove("active");
  document.body.classList.remove("blur-bg");
});


// Prevent outside click from closing form
formContainer?.addEventListener("click", (e) => {
  if (e.target === formContainer) {
    e.stopPropagation(); // stop accidental close
  }
});

// CONTACT FORM (ABOUT US SECTION)
const contactForm = document.getElementById("contactForm");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("contactEmail").value.trim();

  if (emailInput === "") {
    alert("Please enter your email before sending.");
    return;
  }

  alert("Thank you! We'll reach out to you soon.");
  contactForm.reset();
});


// DOB VALIDATION
const dobInput = document.getElementById("regDOB");
dobInput.max = new Date().toISOString().split("T")[0];  // prevents future dates

// PASSWORD TOGGLE
const toggleRegPass = document.getElementById("toggleRegPass");
const regPassInput = document.getElementById("regPassword");

toggleRegPass.addEventListener("click", () => {
    const type = regPassInput.getAttribute("type") === "password" ? "text" : "password";
    regPassInput.setAttribute("type", type);
});