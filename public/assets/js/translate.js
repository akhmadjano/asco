// translate.js — Index sahifasi uchun to'liq 3 til tarjima (Senera)
const translations = {
    uz: {
        // Navbar
        aboutNav: "Biz haqimizda",
        servicesNav: "Xizmatlar",
        legalNav: "Huquqiy xizmatlar",
        accountingNav: "Buxgalteriya xizmatlari",
        whyNav: "Nega biz?",
        faqNav: "FAQ",
        contactNav: "Aloqa",

        // Hero
        heroTitle: "Senera bilan biznesingizni yangi bosqichga olib chiqing",
        heroDesc: "Huquqiy va buxgalteriya masalalarida professional yordam — vaqt va pulingizni tejang, xavfsiz rivojlaning.",
        heroBtn: "Bepul maslahat olish →",

        // Services section
        servicesTitle: "Bizning xizmatlar",
        legalCardTitle: "Huquqiy xizmatlar",
        legalCardDesc: "MChJ, YaTT ro'yxatdan o'tkazish, shartnomalar tayyorlash, soliq va sud masalalari bo'yicha professional yordam.",
        accountingCardTitle: "Buxgalteriya xizmatlari",
        accountingCardDesc: "To'liq buxgalteriya yuritish, soliq hisobotlari, ESF, 1C, kadr hujjatlari va ish haqi hisobi.",
        consultingCardTitle: "Konsalting xizmatlari",
        consultingCardDesc: "Biznesni rivojlantirish, investitsiya loyihalari, strategik maslahatlar va xavf-xatarlarni boshqarish.",
        detailsBtn: "Batafsil",

        // Stats
        stat1Label: "MUVAFFAQIYATLI<br>ISH",
        stat2Label: "YURIDIK<br>MASLAHATLAR",
        stat3Label: "YOPIQ<br>ISHLAR",
        stat4Label: "BUXGALTERIYA<br>XIZMATINING MIJOZLARI",

        // Footer
        footerDesc: "Professional konsalting xizmatlari. Biznesingizni huquqiy va moliyaviy jihatdan xavfsiz va samarali boshqarishda ishonchli hamkor.",
        footerServices: "Xizmatlar",
        footerCompany: "Kompaniya",
        footerContact: "Aloqa ma'lumotlari",
        footerPolicy: "Maxfiylik siyosati",
        footerTerms: "Foydalanish shartlari",
        footerCopyright: "© 2025 Senera. Barcha huquqlar himoyalangan."
    },

    ru: {
        aboutNav: "О нас",
        servicesNav: "Услуги",
        legalNav: "Юридические услуги",
        accountingNav: "Бухгалтерские услуги",
        whyNav: "Почему мы?",
        faqNav: "FAQ",
        contactNav: "Контакты",

        heroTitle: "Поднимите свой бизнес на новый уровень с Senera",
        heroDesc: "Профессиональная помощь в юридических и бухгалтерских вопросах — экономьте время и деньги, развивайтесь безопасно.",
        heroBtn: "Получить бесплатную консультацию →",

        servicesTitle: "Наши услуги",
        legalCardTitle: "Юридические услуги",
        legalCardDesc: "Регистрация ООО, ИП, подготовка договоров, помощь по налогам и судебным делам.",
        accountingCardTitle: "Бухгалтерские услуги",
        accountingCardDesc: "Полное ведение бухгалтерии, налоговые отчеты, ЭСФ, 1С, кадровые документы и расчет зарплаты.",
        consultingCardTitle: "Консалтинг услуги",
        consultingCardDesc: "Развитие бизнеса, инвестиционные проекты, стратегические консультации и управление рисками.",
        detailsBtn: "Подробнее",

        stat1Label: "УСПЕШНЫХ<br>ПРОЕКТОВ",
        stat2Label: "ЮРИДИЧЕСКИХ<br>КОНСУЛЬТАЦИЙ",
        stat3Label: "ЗАКРЫТЫХ<br>ДЕЛ",
        stat4Label: "КЛИЕНТОВ<br>ПО БУХГАЛТЕРИИ",

        footerDesc: "Профессиональные консалтинговые услуги. Надежный партнер в безопасном и эффективном управлении вашим бизнесом.",
        footerServices: "Услуги",
        footerCompany: "Компания",
        footerContact: "Контактная информация",
        footerPolicy: "Политика конфиденциальности",
        footerTerms: "Условия использования",
        footerCopyright: "© 2025 Senera. Все права защищены."
    },

    en: {
        aboutNav: "About Us",
        servicesNav: "Services",
        legalNav: "Legal Services",
        accountingNav: "Accounting Services",
        whyNav: "Why Us?",
        faqNav: "FAQ",
        contactNav: "Contact",

        heroTitle: "Take Your Business to the Next Level with Senera",
        heroDesc: "Professional assistance in legal and accounting matters — save time and money, grow safely.",
        heroBtn: "Get Free Consultation →",

        servicesTitle: "Our Services",
        legalCardTitle: "Legal Services",
        legalCardDesc: "LLC and individual entrepreneur registration, contract preparation, tax and court support.",
        accountingCardTitle: "Accounting Services",
        accountingCardDesc: "Full accounting, tax reporting, ESF, 1C, HR documents and payroll.",
        consultingCardTitle: "Consulting Services",
        consultingCardDesc: "Business development, investment projects, strategic consulting and risk management.",
        detailsBtn: "Details",

        stat1Label: "SUCCESSFUL<br>PROJECTS",
        stat2Label: "LEGAL<br>CONSULTATIONS",
        stat3Label: "CLOSED<br>CASES",
        stat4Label: "ACCOUNTING<br>CLIENTS",

        footerDesc: "Professional consulting services. Reliable partner in safe and efficient business management.",
        footerServices: "Services",
        footerCompany: "Company",
        footerContact: "Contact Information",
        footerPolicy: "Privacy Policy",
        footerTerms: "Terms of Use",
        footerCopyright: "© 2025 Senera. All rights reserved."
    }
};

// Tarjima funksiyasi
function updateLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        const text = translations[lang]?.[key] || translations.uz[key];
        if (text) {
            el.innerHTML = text;
        }
    });

    // Title ham o'zgartiriladi
    const pageTitle = {
        uz: "Senera — Konsalting xizmatlari",
        ru: "Senera — Консалтинговые услуги",
        en: "Senera — Consulting Services"
    };
    document.title = pageTitle[lang] || pageTitle.uz;
}

// Sahifa yuklanganda ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
    const desktopLang = document.getElementById('lang');
    const mobileLang = document.getElementById('mobileLang');

    const savedLang = localStorage.getItem('selectedLanguage') || 'uz';

    // Ikkalasini sinxronlash
    if (desktopLang) desktopLang.value = savedLang;
    if (mobileLang) mobileLang.value = savedLang;

    updateLanguage(savedLang);

    // Har qanday select o'zgarganda
    [desktopLang, mobileLang].forEach(select => {
        if (select) {
            select.addEventListener('change', (e) => {
                const newLang = e.target.value;
                localStorage.setItem('selectedLanguage', newLang);

                // Ikkalasini yangilash
                if (desktopLang) desktopLang.value = newLang;
                if (mobileLang) mobileLang.value = newLang;

                updateLanguage(newLang);
            });
        }
    });
});