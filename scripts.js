
const heroSection = document.querySelector('.hero-section');

const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');

const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');

// open modals by id
function openModal(id) {
  // close all other modals
  document.querySelectorAll('.modal').forEach(m => m.setAttribute('aria-hidden', 'true'));

  // open requested modal
  const el = document.getElementById(id);
  if (el) el.setAttribute('aria-hidden', 'false');
}

// close modal by id
function closeModalById(id) {
  const el = document.getElementById(id);
  if (el) el.setAttribute('aria-hidden', 'true');
  heroSection.classList.remove('active'); // hero back to center
}

// LOGIN button click
loginBtn?.addEventListener('click', () => {
  heroSection.classList.add('active'); // shift hero left
  openModal('loginModal');
});

// REGISTER button click
registerBtn?.addEventListener('click', () => {
  heroSection.classList.add('active'); // shift hero left
  openModal('registerModal');
});

// close buttons inside modals
document.addEventListener('click', (e) => {
  const target = e.target;

  // close via data-close attribute
  if (target.matches('[data-close]')) {
    const id = target.getAttribute('data-close');
    closeModalById(id);
  }

  // close via modal-close button
  if (target.classList.contains('modal-close')) {
    const modal = target.closest('.modal');
    if (modal) {
      modal.setAttribute('aria-hidden', 'true');
      heroSection.classList.remove('active'); // reset hero
    }
  }
});

// close when clicking outside the panel
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.setAttribute('aria-hidden', 'true');
      heroSection.classList.remove('active'); // reset hero
    }
  });
});

// password toggle buttons
document.querySelectorAll('.pw-toggle').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const targetId = btn.getAttribute('data-toggle');
    const input = document.getElementById(targetId);
    const icon = btn.querySelector('i');

    if (!input) return;

    if (input.type === 'password'){ 
      input.type = 'text'; 
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash'); // eye-slash icon
    } 
    else { 
      input.type = 'password'; 
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye'); // back to eye icon
    }
  });
});


// Login form redirect
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate successful login (replace with real auth logic)
    window.location.href = 'dashboard.html'; // Redirect to dashboard
});

// Register form redirect
document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate successful registration (replace with real registration logic)
    window.location.href = 'dashboard.html'; // Redirect to dashboard
});


// close modals on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(m => m.setAttribute('aria-hidden', 'true'));
    heroSection.classList.remove('active'); // reset hero
  }
});

// switch login → register
document.getElementById('switchToRegisterTop')?.addEventListener('click', (e) => {
  e.preventDefault();
  closeModalById('loginModal');
  heroSection.classList.add('active'); // keep hero shifted
  openModal('registerModal');
});

// switch register → login
document.getElementById('switchToLoginTop')?.addEventListener('click', (e) => {
  e.preventDefault();
  closeModalById('registerModal');
  heroSection.classList.add('active'); // keep hero shifted
  openModal('loginModal');
});



function openModal(id){
  // ensure other modal closed
  document.querySelectorAll('.modal').forEach(m=>m.setAttribute('aria-hidden','true'));

  // open requested
  const el = document.getElementById(id);
  if (el) el.setAttribute('aria-hidden','false');

  // blur only for mobile
  if (window.matchMedia("(max-width: 860px)").matches) {
    document.querySelectorAll('.hero-content, .cards, #bgVideo, .video-reflect')
      .forEach(el => el.classList.add('blur'));
  }
}

function closeModalById(id){
  const el = document.getElementById(id);
  if (el) el.setAttribute('aria-hidden','true');

  // remove blur
  document.querySelectorAll('.hero-content, .cards, #bgVideo, .video-reflect')
    .forEach(el => el.classList.remove('blur'));
}


// to handle the chats with chatbot
document.addEventListener('DOMContentLoaded', function() {
  const robotHelper = document.getElementById('robot-helper');
  const chatPanel = document.getElementById('chat-panel');
  const closeChatBtn = document.getElementById('close-chat');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  if (robotHelper && chatPanel && closeChatBtn && chatForm && chatInput && chatMessages) {
    robotHelper.addEventListener('click', function() {
      const isHidden = chatPanel.getAttribute('aria-hidden') === 'true';
      chatPanel.setAttribute('aria-hidden', isHidden ? 'false' : 'true');
      chatPanel.style.display = isHidden ? 'flex' : 'none';
      if (!isHidden) { chatInput.focus(); }
    });
    closeChatBtn.addEventListener('click', function() {
      chatPanel.setAttribute('aria-hidden', 'true');
      chatPanel.style.display = 'none';
    });
    chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;
      const userMsgElem = document.createElement('div');
      userMsgElem.textContent = 'You: ' + message;
      chatMessages.appendChild(userMsgElem);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;
      setTimeout(function() {
        const botMsgElem = document.createElement('div');
        botMsgElem.textContent = 'MindMate: How can I help you today?';
        chatMessages.appendChild(botMsgElem);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);
    });
  }
});


// calender JS
const dobInput = document.getElementById("dob");
flatpickr(dobInput, {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    theme: "dark",
    allowInput: true,
    clickOpens: false // default click disabled
});

// Font Awesome calendar icon opens picker
document.querySelector(".calendar-icon").addEventListener("click", () => {
    dobInput._flatpickr.open();
});



