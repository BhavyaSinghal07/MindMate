// scripts.js - modal control and small enhancements

// open modals by id
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');

const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');

loginBtn.addEventListener('click', ()=> openModal('loginModal'));
registerBtn.addEventListener('click', ()=> openModal('registerModal'));

// close buttons (delegated)
document.addEventListener('click', (e)=>{
  const target = e.target;
  if (target.matches('[data-close]')) {
    const id = target.getAttribute('data-close');
    closeModalById(id);
  }
  if (target.classList.contains('modal-close')) {
    // find closest modal
    const modal = target.closest('.modal');
    if (modal) modal.setAttribute('aria-hidden','true');
  }
});

// close when clicking outside panel
document.querySelectorAll('.modal').forEach(modal=>{
  modal.addEventListener('click', (e)=>{
    if (e.target === modal) modal.setAttribute('aria-hidden','true');
  });
});

// functions
function openModal(id){
  // ensure other modal closed
  document.querySelectorAll('.modal').forEach(m=>m.setAttribute('aria-hidden','true'));
  // open requested
  const el = document.getElementById(id);
  if (el) el.setAttribute('aria-hidden','false');
}

function closeModalById(id){
  const el = document.getElementById(id);
  if (el) el.setAttribute('aria-hidden','true');
}

// password toggle buttons
document.querySelectorAll('.pw-toggle').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const targetId = btn.getAttribute('data-toggle');
    const input = document.getElementById(targetId);
    if (!input) return;
    if (input.type === 'password'){ input.type = 'text'; btn.textContent = 'Hide'; }
    else { input.type = 'password'; btn.textContent = 'Show'; }
  });
});

// simple form submissions (no backend) - prevent default
document.getElementById('loginForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('Login submitted (demo). Replace with real auth logic.');
  closeModalById('loginModal');
});
document.getElementById('registerForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('Registration submitted (demo). Replace with real registration logic.');
  closeModalById('registerModal');
});

// accessibility: escape key closes
document.addEventListener('keydown', (e)=>{
  if (e.key === 'Escape') document.querySelectorAll('.modal').forEach(m=>m.setAttribute('aria-hidden','true'));
});


// switch from login (top-right button) to register
const switchToRegisterTop = document.getElementById('switchToRegisterTop');
if (switchToRegisterTop) {
  switchToRegisterTop.addEventListener('click', (e)=>{
    e.preventDefault();
    closeModalById('loginModal');
    openModal('registerModal');
  });
}

// switch from register (top-right button) to Login
const switchToLoginTop = document.getElementById('switchToLoginTop');
if (switchToLoginTop) {
  switchToLoginTop.addEventListener('click', (e)=>{
    e.preventDefault();
    closeModalById('registerModal');
    openModal('loginModal');
  });
}
