
// Raqamlarni animatsiya qilish funksiyasi
function countUp(el) {
  const target = parseInt(el.getAttribute('data-count'));
  const plusSign = el.textContent.includes('+') ? '+' : ''; // + belgisi bor-yo‘qligini saqlaymiz
  let count = 0;
  const duration = 1800; // umumiy vaqt (millisekund)
  const stepTime = 20;   // har bir qadam vaqti
  const increment = target / (duration / stepTime);

  const update = () => {
    count += increment;
    if (count >= target) {
      el.textContent = target + plusSign;
    } else {
      el.textContent = Math.floor(count) + plusSign;
      requestAnimationFrame(update);
    }
  };

  update();
}

// Sahifaga kirganda animatsiya boshlanishi uchun
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-number').forEach(el => {
        // Har safar yangidan 0 dan boshlaymiz
        el.textContent = '0' + (el.textContent.includes('+') ? '+' : '');
        countUp(el);
      });
      // Faqat bir marta ishlasin (takrorlamasligi uchun)
      observer.disconnect();
    }
  });
}, {
  threshold: 0.4  // 40% ko‘rinsa animatsiya boshlanadi
});

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  observer.observe(statsSection);
}
