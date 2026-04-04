
  // // Checkbox va radio tanlashni boshqarish
  // document.querySelectorAll('.activity-card').forEach(card => {
  //   card.addEventListener('click', function() {
  //     const input = this.querySelector('input');
  //     if (input.type === 'checkbox') {
  //       input.checked = !input.checked;
  //       this.classList.toggle('active', input.checked);
  //     } else if (input.type === 'radio') {
  //       document.querySelectorAll('input[name="soliq-turi"]').forEach(r => {
  //         r.parentElement.classList.remove('active');
  //       });
  //       input.checked = true;
  //       this.classList.add('active');
  //     }
  //   });
  // });

  // // Hisoblash tugmasi
  // document.getElementById('calculateBtn').addEventListener('click', function() {
  //   const employees = parseInt(document.getElementById('employees').value) || 0;
  //   const documents = parseInt(document.getElementById('documents').value) || 0;

  //   // Tanlangan faoliyat turlari (checkbox)
  //   const selectedActivities = Array.from(document.querySelectorAll('.activity-checkbox:checked'))
  //     .map(cb => cb.value);

  //   // Tanlangan soliq turi (radio)
  //   const selectedTaxType = document.querySelector('input[name="soliq-turi"]:checked')?.value || null;

  //   // Validatsiya
  //   if (employees < 1 || documents < 1) {
  //     alert("Iltimos, xodimlar va hujjatlar sonini kiriting!");
  //     return;
  //   }

  //   if (selectedActivities.length === 0) {
  //     alert("Kamida bitta faoliyat turini tanlang!");
  //     return;
  //   }

  //   if (!selectedTaxType) {
  //     alert("Ish yuritish soxasi turidan birini tanlang!");
  //     return;
  //   }

  //   // Oddiy taxminiy hisoblash (siz xohlagan algoritm bo'yicha o'zgartirish mumkin)
  //   let basePrice = 2500000; // Ekonom bazasi
  //   basePrice += employees * 80000;       // har bir xodimga qo'shimcha
  //   basePrice += documents * 25000;       // har bir hujjatga qo'shimcha

  //   // Checkboxlarga qarab qo'shimcha narx
  //   if (selectedActivities.includes('importexport')) basePrice += 1500000;
  //   if (selectedActivities.includes('ishlabchiqarish')) basePrice += 1200000;

  //   // Radio bo'yicha qo'shimcha
  //   if (selectedTaxType === 'savdo') basePrice += 800000;

  //   // Yakuniy narx oralig'i
  //   const minPrice = Math.round(basePrice * 0.9);
  //   const maxPrice = Math.round(basePrice * 1.1);

  //   // Natijani ko'rsatish
  //   document.getElementById('resultText').innerHTML = 
  //     `Sizning xisobingizga ko'ra xizmat narxi<br><strong>${minPrice.toLocaleString()} – ${maxPrice.toLocaleString()} so'mgacha</strong> bo'ladi.`;

  //   document.getElementById('resultContainer').classList.remove('d-none');
  // });

  // // Konsultatsiya olish tugmasi - contact bo'limiga silliq o'tish
  // document.getElementById('contactBtn').addEventListener('click', function() {
  //   document.querySelector('#contact').scrollIntoView({ 
  //     behavior: 'smooth' 
  //   });
  // });













  // calc.js — Buxgalteriya sahifasi uchun tarjima + kalkulyator (3 til)
const translations = {
    uz: {
        pageTitle: "Buxgalteriya xizmatlari - Senera",
        tariffsTitle: "Buxgalteriya xizmatlari tariflari",
        ekonom: "Ekonom",
        start: "Start",
        biznes: "Biznes",
        premium: "Premium",
        perMonth: "so'm/oy",
        selectTariff: "TARIF TANLASH",
        calcTitle: "Buxgalteriya tarifini hisoblash",
        activityTitle1: "Ish yuritish soxasi (bir nechtasini tanlashingiz mumkin)",
        xizmatlar: "Xizmatlar",
        savdo: "Savdo",
        ishlabchiqarish: "Ishlab chiqarish",
        importexport: "Import-eksport",
        activityTitle2: "Ish yuritish soxasi turi (faqat bittasini tanlang)",
        ruxsatSoliq: "Ruxsat etilgan soliq",
        savdoSoliq: "Savdo solig'i",
        oosTolovchi: "OOS to'lovchi",
        employeesLabel: "Xodimlar soni *",
        documentsLabel: "Hujjatlar soni (oyiga) *",
        calculateBtn: "Xarajatlar smetasini olish",
        resultIntro: "Sizga mos tarif:",
        resultFrom: "от",
        resultPerMonth: "so'm/oy",
        resultNote: "Bu hisob individual — aniq narx uchun konsultatsiya oling!",
        consultBtn: "Konsultatsiya olish →"
    },

    ru: {
        pageTitle: "Бухгалтерские услуги - Senera",
        tariffsTitle: "Тарифы бухгалтерских услуг",
        ekonom: "Эконом",
        start: "Старт",
        biznes: "Бизнес",
        premium: "Премиум",
        perMonth: "сум/мес",
        selectTariff: "ВЫБРАТЬ ТАРИФ",
        calcTitle: "Расчет бухгалтерского тарифа",
        activityTitle1: "Сфера деятельности (можно выбрать несколько)",
        xizmatlar: "Услуги",
        savdo: "Торговля",
        ishlabchiqarish: "Производство",
        importexport: "Импорт-экспорт",
        activityTitle2: "Тип сферы деятельности (выберите только один)",
        ruxsatSoliq: "Разрешенный налог",
        savdoSoliq: "Торговый сбор",
        oosTolovchi: "Плательщик ООС",
        employeesLabel: "Количество сотрудников *",
        documentsLabel: "Количество документов (в месяц) *",
        calculateBtn: "Получить смету расходов",
        resultIntro: "Подходящий тариф для вас:",
        resultFrom: "от",
        resultPerMonth: "сум/мес",
        resultNote: "Это приблизительный расчет — точную цену уточняйте на консультации!",
        consultBtn: "Получить консультацию →"
    },

    en: {
        pageTitle: "Accounting Services - Senera",
        tariffsTitle: "Accounting Service Plans",
        ekonom: "Economy",
        start: "Start",
        biznes: "Business",
        premium: "Premium",
        perMonth: "UZS/month",
        selectTariff: "SELECT PLAN",
        calcTitle: "Calculate Your Accounting Plan",
        activityTitle1: "Field of activity (you can select multiple)",
        xizmatlar: "Services",
        savdo: "Trade",
        ishlabchiqarish: "Manufacturing",
        importexport: "Import-Export",
        activityTitle2: "Type of activity (select only one)",
        ruxsatSoliq: "Permitted tax",
        savdoSoliq: "Trade fee",
        oosTolovchi: "OOS payer",
        employeesLabel: "Number of employees *",
        documentsLabel: "Number of documents (per month) *",
        calculateBtn: "Get cost estimate",
        resultIntro: "Recommended plan for you:",
        resultFrom: "from",
        resultPerMonth: "UZS/month",
        resultNote: "This is an estimate — get exact pricing on consultation!",
        consultBtn: "Get Consultation →"
    }
};

function updateLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        const text = translations[lang]?.[key] || translations.uz[key];
        if (text) {
            el.innerHTML = text;
        }
    });

    document.title = translations[lang]?.pageTitle || translations.uz.pageTitle;
}

document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('lang');
    const mobileLang = document.getElementById('mobileLang');

    const savedLang = localStorage.getItem('selectedLanguage') || 'uz';

    if (langSelect) langSelect.value = savedLang;
    if (mobileLang) mobileLang.value = savedLang;

    updateLanguage(savedLang);

    // Til o'zgartirish
    [langSelect, mobileLang].forEach(select => {
        if (select) {
            select.addEventListener('change', (e) => {
                const newLang = e.target.value;
                localStorage.setItem('selectedLanguage', newLang);
                if (langSelect) langSelect.value = newLang;
                if (mobileLang) mobileLang.value = newLang;
                updateLanguage(newLang);
            });
        }
    });

    // Kalkulyator hisoblash
    const calculateBtn = document.getElementById('calculateBtn');
    const resultContainer = document.getElementById('resultContainer');
    const resultText = document.getElementById('resultText');
    const contactBtn = document.getElementById('contactBtn');

    calculateBtn.addEventListener('click', () => {
        const employees = parseInt(document.getElementById('employees').value) || 0;
        const documents = parseInt(document.getElementById('documents').value) || 0;

        const checkedActivities = document.querySelectorAll('.activity-checkbox:checked').length;
        const taxType = document.querySelector('input[name="soliq-turi"]:checked');

        let price = 2500000; // Boshlang'ich Ekonom

        // Xodimlar bo'yicha
        if (employees > 15) price = 6500000;
        else if (employees > 10) price = 4500000;
        else if (employees > 5) price = 3500000;

        // Hujjatlar
        price += documents * 12000;

        // Faoliyat sohalari
        price += checkedActivities * 800000;

        // Soliq turi
        if (taxType && (taxType.value === 'savdo' || taxType.value === 'oos')) {
            price += 1200000;
        }

        const currentLang = localStorage.getItem('selectedLanguage') || 'uz';
        const lang = translations[currentLang];

        resultText.innerHTML = `
            <strong>${lang.resultIntro}</strong><br>
            <span style="font-size: 2rem; color: #28a745;">
                ${lang.resultFrom} ${price.toLocaleString()} ${lang.resultPerMonth}
            </span><br><br>
            <em>${lang.resultNote}</em>
        `;

        contactBtn.innerText = lang.consultBtn;

        resultContainer.classList.remove('d-none');
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    });
});