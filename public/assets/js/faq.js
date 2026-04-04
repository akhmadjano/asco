// faq.js — FAQ sahifasi uchun tarjima
const faqTranslations = {
    uz: {
        pageTitle: "FAQ - Senera",
        faqTitle: "Tez-tez so'raladigan savollar",
        q1: "MChJ ro'yxatdan o'tkazish uchun qancha vaqt ketadi?",
        a1: "Odatda 3–5 ish kuni ichida ro'yxatdan o'tkazish jarayoni yakunlanadi. Agar hujjatlar to'liq va to'g'ri tayyor bo'lsa, 2 kunda ham yakunlash mumkin. Biz hujjatlarni oldindan tayyorlab, jarayonni tezlashtiramiz.",
        q2: "Buxgalteriya xizmatlari narxi qanday hisoblanadi?",
        a2: "Narx xodimlar soni, oyiga hujjatlar hajmi, bank tranzaksiyalari soni va korxona oborotiga qarab hisoblanadi. Dastlabki maslahat bepul — aniq tarifni sizning holatingizga qarab hisoblab beramiz.",
        q3: "Narxlar QQS bilan birga ko'rsatilganmi?",
        a3: "Yo'q, barcha ko'rsatilgan narxlar QQSsiz (0% yoki 12% qo'shilishi mumkin). Yakuniy hisob-fakturada QQS alohida ko'rsatiladi.",
        q4: "IT-park uchun ro'yxatdan o'tishda qanday yordam berasiz?",
        a4: "Biz IT-parkka ariza topshirish, biznes-reja tayyorlash, ta'sis hujjatlarini moslashtirish va ro'yxatdan o'tkazish jarayonini to'liq hamrohlik qilamiz. Tajribamiz tufayli jarayon tez va muammosiz o'tadi.",
        q5: "Birinchi maslahat haqiqatan ham bepulmi?",
        a5: "Ha, birinchi maslahat bepul. Telefon yoki onlayn (Zoom/Telegram) orqali 20–40 daqiqa davomida vaziyatingizni muhokama qilamiz va qanday yordam bera olishimizni aytib beramiz.",
        q6: "Shartnoma tuzish majburiymi?",
        a6: "Ha, uzoq muddatli hamkorlik uchun shartnoma tuzamiz. Bir martalik xizmatlar uchun esa oddiy ariza va hisob-faktura yetarli bo'ladi.",
        faqExtra: "Savolingizga javob topa olmadingizmi?",
        faqBtn: "Biz bilan bog'laning",
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
        pageTitle: "FAQ - Senera",
        faqTitle: "Часто задаваемые вопросы",
        q1: "Сколько времени занимает регистрация ООО?",
        a1: "Обычно процесс регистрации завершается в течение 3–5 рабочих дней. При полном и правильном пакете документов — возможно и за 2 дня. Мы заранее готовим документы и ускоряем процесс.",
        q2: "Как рассчитывается стоимость бухгалтерских услуг?",
        a2: "Цена зависит от количества сотрудников, объема документов в месяц, банковских транзакций и оборота компании. Первая консультация бесплатная — точный тариф рассчитаем по вашей ситуации.",
        q3: "Цены указаны с НДС?",
        a3: "Нет, все указанные цены без НДС (может добавляться 0% или 12%). В итоговом счете-фактуре НДС указывается отдельно.",
        q4: "Как помогаете с регистрацией в IT-Park?",
        a4: "Мы полностью сопровождаем подачу заявки в IT-Park, подготовку бизнес-плана, адаптацию учредительных документов и процесс регистрации. Благодаря опыту — всё проходит быстро и без проблем.",
        q5: "Первая консультация действительно бесплатная?",
        a5: "Да, первая консультация бесплатная. По телефону или онлайн (Zoom/Telegram) в течение 20–40 минут обсудим вашу ситуацию и расскажем, как можем помочь.",
        q6: "Обязательно ли заключать договор?",
        a6: "Да, для долгосрочного сотрудничества заключаем договор. Для разовых услуг достаточно простой заявки и счета-фактуры.",
        faqExtra: "Не нашли ответ на свой вопрос?",
        faqBtn: "Свяжитесь с нами",
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
        pageTitle: "FAQ - Senera",
        faqTitle: "Frequently Asked Questions",
        q1: "How long does LLC registration take?",
        a1: "Usually the registration process is completed within 3–5 business days. With a full and correct set of documents — it can be done in 2 days. We prepare documents in advance and speed up the process.",
        q2: "How is the cost of accounting services calculated?",
        a2: "The price depends on the number of employees, monthly document volume, bank transactions, and company turnover. The initial consultation is free — we will calculate the exact rate based on your situation.",
        q3: "Are prices shown including VAT?",
        a3: "No, all listed prices are without VAT (0% or 12% may be added). VAT is shown separately on the final invoice.",
        q4: "How do you help with IT-Park registration?",
        a4: "We fully accompany the application to IT-Park, prepare the business plan, adapt founding documents, and handle the registration process. Thanks to our experience — everything goes quickly and smoothly.",
        q5: "Is the first consultation really free?",
        a5: "Yes, the first consultation is free. By phone or online (Zoom/Telegram) we will discuss your situation for 20–40 minutes and explain how we can help.",
        q6: "Is it mandatory to sign a contract?",
        a6: "Yes, for long-term cooperation we sign a contract. For one-time services, a simple application and invoice are sufficient.",
        faqExtra: "Didn't find the answer to your question?",
        faqBtn: "Contact Us",
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

function updateFaqLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        const text = faqTranslations[lang]?.[key] || faqTranslations.uz[key];
        if (text) {
            el.innerHTML = text;
        }
    });

    document.title = faqTranslations[lang]?.pageTitle || faqTranslations.uz.pageTitle;
}

document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('lang');
    const mobileLang = document.getElementById('mobileLang');

    const savedLang = localStorage.getItem('selectedLanguage') || 'uz';

    if (langSelect) langSelect.value = savedLang;
    if (mobileLang) mobileLang.value = savedLang;

    updateFaqLanguage(savedLang);

    [langSelect, mobileLang].forEach(select => {
        if (select) {
            select.addEventListener('change', (e) => {
                const newLang = e.target.value;
                localStorage.setItem('selectedLanguage', newLang);
                if (langSelect) langSelect.value = newLang;
                if (mobileLang) mobileLang.value = newLang;
                updateFaqLanguage(newLang);
            });
        }
    });
});