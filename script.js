const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const toast = document.getElementById('toast');
let toastTimer;

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    let visible = 0;
    document.querySelectorAll('.animal-card').forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    const count = button.querySelector('span');
    if (count) count.textContent = String(visible).padStart(2, '0');
  });
});

document.querySelectorAll('.save-btn').forEach(button => {
  button.addEventListener('click', () => {
    const saved = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(saved));
    button.textContent = saved ? '♥' : '♡';
    const animal = button.closest('.animal-card').querySelector('h3').textContent;
    const message = document.getElementById('savedMessage');
    message.textContent = saved ? `${animal} added to your favourites.` : `${animal} removed from your favourites.`;
  });
});

document.querySelectorAll('.fact-button').forEach(button => {
  button.addEventListener('click', () => showToast(button.dataset.fact));
});

document.getElementById('newsletterForm').addEventListener('submit', event => {
  event.preventDefault();
  const email = document.getElementById('email');
  if (!email.checkValidity()) {
    email.reportValidity();
    return;
  }
  document.getElementById('formMessage').textContent = 'Thanks for joining our wild community! (Demo signup)';
  email.value = '';
  showToast('You’re on the list — stay curious!');
});
