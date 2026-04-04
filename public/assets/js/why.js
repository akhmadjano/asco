// why.js — Nega biz? sahifasi uchun tarjima
const whyTranslations = {
    uz: {
        pageTitle: "Nega biz? - Senera",
        whyTitle: "Nega aynan Seneraga ishonish kerak?",
        card1Title: "8 yillik tajriba",
        card1Desc: "8 yildan ortiq vaqt davomida yuzlab korxonalar bilan muvaffaqiyatli hamkorlik qildik.",
        card2Title: "Mutaxassislar jamoasi",
        card2Desc: "Yuqori malakali yuridik va buxgalteriya mutaxassislari sizning muammolaringizni tez hal qiladi.",
        card3Title: "Individual yondashuv",
        card3Desc: "Har bir mijozga alohida e'tibor, shaxsiy maslahatchi va moslashuvchan narx siyosati.",
        card4Title: "100% qonuniylik kafolati",
        card4Desc: "Barcha xizmatlar qonun doirasida, soliq va yuridik xavf-xatarlardan himoyalangan.",
        card5Title: "Tezkor xizmat",
        card5Desc: "Arizangiz 24 soat ichida ko'rib chiqiladi va birinchi maslahat bepul beriladi.",
        card6Title: "Mijozlarning ishonchi",
        card6Desc: "Yuzlab qoniqarli mijozlar va uzoq muddatli hamkorlik — bizning eng yaxshi tavsiyamiz.",
        contactBtn: "Bog'lanish",
        footerDesc: "Professional konsalting xizmatlari. Biznesingizni huquqiy va moliyaviy jihatdan xavfsiz va samarali boshqarishda ishonchli hamkor.",
        footerServices: "Xizmatlar",
        footerCompany: "Kompaniya",
        footerContact: "Aloqa ma'lumotlari",
        footerPolicy: "Maxfiylik siyosati",
        footerTerms: "Foydalanish shartlari",
        footerCopyright: "© 2025 Senera. Barcha huquqlar himoyalangan.",
        aboutNav: "Biz haqimizda",
        servicesNav: "Xizmatlar",
        legalNav: "Huquqiy xizmatlar",
        accountingNav: "Buxgalteriya xizmatlari",
        whyNav: "Nega biz?",
        faqNav: "FAQ",
        contactNav: "Aloqa"
    },

    ru: {
        pageTitle: "Почему мы? - Senera",
        whyTitle: "Почему стоит доверять именно Senera?",
        card1Title: "8 лет опыта",
        card1Desc: "Более 8 лет успешно сотрудничаем с сотнями предприятий.",
        card2Title: "Команда специалистов",
        card2Desc: "Высококвалифицированные юристы и бухгалтеры быстро решают ваши задачи.",
        card3Title: "Индивидуальный подход",
        card3Desc: "Особое внимание каждому клиенту, личный консультант и гибкая ценовая политика.",
        card4Title: "Гарантия 100% законности",
        card4Desc: "Все услуги в рамках закона, защита от налоговых и юридических рисков.",
        card5Title: "Быстрое обслуживание",
        card5Desc: "Ваша заявка рассматривается в течение 24 часов, первая консультация бесплатная.",
        card6Title: "Доверие клиентов",
        card6Desc: "Сотни довольных клиентов и долгосрочное сотрудничество — наша лучшая рекомендация.",
        contactBtn: "Связаться",
        footerDesc: "Профессиональные консалтинговые услуги. Надежный партнер в безопасном и эффективном управлении вашим бизнесом.",
        footerServices: "Услуги",
        footerCompany: "Компания",
        footerContact: "Контактная информация",
        footerPolicy: "Политика конфиденциальности",
        footerTerms: "Условия использования",
        footerCopyright: "© 2025 Senera. Все права защищены.",
        aboutNav: "О нас",
        servicesNav: "Услуги",
        legalNav: "Юридические услуги",
        accountingNav: "Бухгалтерские услуги",
        whyNav: "Почему мы?",
        faqNav: "FAQ",
        contactNav: "Контакты"
    },

    en: {
        pageTitle: "Why Us? - Senera",
        whyTitle: "Why Choose Senera?",
        card1Title: "8 Years of Experience",
        card1Desc: "Over 8 years of successful collaboration with hundreds of companies.",
        card2Title: "Expert Team",
        card2Desc: "Highly qualified legal and accounting specialists quickly solve your issues.",
        card3Title: "Individual Approach",
        card3Desc: "Special attention to each client, personal consultant, and flexible pricing.",
        card4Title: "100% Legal Guarantee",
        card4Desc: "All services within the law, protected from tax and legal risks.",
        card5Title: "Fast Service",
        card5Desc: "Your application is reviewed within 24 hours, first consultation is free.",
        card6Title: "Client Trust",
        card6Desc: "Hundreds of satisfied clients and long-term partnerships — our best recommendation.",
        contactBtn: "Contact Us",
        footerDesc: "Professional consulting services. Reliable partner in safe and efficient business management.",
        footerServices: "Services",
        footerCompany: "Company",
        footerContact: "Contact Information",
        footerPolicy: "Privacy Policy",
        footerTerms: "Terms of Use",
        footerCopyright: "© 2025 Senera. All rights reserved.",
        aboutNav: "About Us",
        servicesNav: "Services",
        legalNav: "Legal Services",
        accountingNav: "Accounting Services",
        whyNav: "Why Us?",
        faqNav: "FAQ",
        contactNav: "Contact"
    }
};

function updateWhyLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        const text = whyTranslations[lang]?.[key] || whyTranslations.uz[key];
        if (text) {
            el.innerHTML = text;
        }
    });

    document.title = whyTranslations[lang]?.pageTitle || whyTranslations.uz.pageTitle;
}

document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('lang');
    const mobileLang = document.getElementById('mobileLang');

    const savedLang = localStorage.getItem('selectedLanguage') || 'uz';

    if (langSelect) langSelect.value = savedLang;
    if (mobileLang) mobileLang.value = savedLang;

    updateWhyLanguage(savedLang);

    [langSelect, mobileLang].forEach(select => {
        if (select) {
            select.addEventListener('change', (e) => {
                const newLang = e.target.value;
                localStorage.setItem('selectedLanguage', newLang);
                if (langSelect) langSelect.value = newLang;
                if (mobileLang) mobileLang.value = newLang;
                updateWhyLanguage(newLang);
            });
        }
    });
});