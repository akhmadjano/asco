// bot.js — Contact sahifasi: Tarjima + Telegram + Xavfsizlik
const contactTranslations = {
    uz: {
        pageTitle: "Aloqa - Senera",
        contactTitle: "Biz bilan bog'laning",
        nameLabel: "Ism Familiya *",
        namePlaceholder: "Ism va familiyangizni kiriting",
        phone1Label: "Telefon raqami *",
        phonePlaceholder: "+998 XX XXX XX XX",
        descriptionLabel: "Ish tavsifi *",
        descriptionPlaceholder: "Ishingiz haqida batafsil yozing...",
        submitBtn: "Yuborish",
        successMessage: "Ariza muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.",
        footerDesc: "Professional konsalting xizmatlari. Biznesingizni huquqiy va moliyaviy jihatdan xavfsiz va samarali boshqarishda ishonchli hamkor.",
        footerServices: "Xizmatlar",
        footerCompany: "Kompaniya",
        footerContact: "Aloqa ma'lumotlari",
        footerPolicy: "Maxfiylik siyosati",
        footerTerms: "Foydalanish shartlari",
        footerCopyright: "© 2025 Senera. Barcha huquqlar himoyalangan.",
        phoneStrong: "Telefon:",
        emailStrong: "Email:",
        addressStrong: "Manzil:",
        hoursStrong: "Ish vaqti:",
        aboutNav: "Biz haqimizda",
        servicesNav: "Xizmatlar",
        legalNav: "Huquqiy xizmatlar",
        accountingNav: "Buxgalteriya xizmatlari",
        whyNav: "Nega biz?",
        faqNav: "FAQ",
        contactNav: "Aloqa"
    },

    ru: {
        pageTitle: "Контакты - Senera",
        contactTitle: "Свяжитесь с нами",
        nameLabel: "ФИО *",
        namePlaceholder: "Введите ваше ФИО",
        phone1Label: "Номер телефона *",
        phonePlaceholder: "+998 XX XXX XX XX",
        descriptionLabel: "Описание задачи *",
        descriptionPlaceholder: "Подробно опишите вашу задачу...",
        submitBtn: "Отправить",
        successMessage: "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
        footerDesc: "Профессиональные консалтинговые услуги. Надежный партнер в безопасном и эффективном управлении вашим бизнесом.",
        footerServices: "Услуги",
        footerCompany: "Компания",
        footerContact: "Контактная информация",
        footerPolicy: "Политика конфиденциальности",
        footerTerms: "Условия использования",
        footerCopyright: "© 2025 Senera. Все права защищены.",
        phoneStrong: "Телефон:",
        emailStrong: "Email:",
        addressStrong: "Адрес:",
        hoursStrong: "Часы работы:",
        aboutNav: "О нас",
        servicesNav: "Услуги",
        legalNav: "Юридические услуги",
        accountingNav: "Бухгалтерские услуги",
        whyNav: "Почему мы?",
        faqNav: "FAQ",
        contactNav: "Контакты"
    },

    en: {
        pageTitle: "Contact - Senera",
        contactTitle: "Contact Us",
        nameLabel: "Full Name *",
        namePlaceholder: "Enter your full name",
        phone1Label: "Phone Number *",
        phonePlaceholder: "+998 XX XXX XX XX",
        descriptionLabel: "Task Description *",
        descriptionPlaceholder: "Describe your task in detail...",
        submitBtn: "Send",
        successMessage: "Application successfully sent! We will contact you soon.",
        footerDesc: "Professional consulting services. Reliable partner in safe and efficient business management.",
        footerServices: "Services",
        footerCompany: "Company",
        footerContact: "Contact Information",
        footerPolicy: "Privacy Policy",
        footerTerms: "Terms of Use",
        footerCopyright: "© 2025 Senera. All rights reserved.",
        phoneStrong: "Phone:",
        emailStrong: "Email:",
        addressStrong: "Address:",
        hoursStrong: "Working Hours:",
        aboutNav: "About Us",
        servicesNav: "Services",
        legalNav: "Legal Services",
        accountingNav: "Accounting Services",
        whyNav: "Why Us?",
        faqNav: "FAQ",
        contactNav: "Contact"
    }
};

function updateContactLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        const text = contactTranslations[lang]?.[key] || contactTranslations.uz[key];
        if (text) {
            el.innerHTML = text;
        }
    });

    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        const placeholder = contactTranslations[lang]?.[key] || contactTranslations.uz[key];
        if (placeholder) {
            el.placeholder = placeholder;
        }
    });

    document.title = contactTranslations[lang]?.pageTitle || contactTranslations.uz.pageTitle;
}

document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('lang');
    const mobileLang = document.getElementById('mobileLang');

    const savedLang = localStorage.getItem('selectedLanguage') || 'uz';

    if (langSelect) langSelect.value = savedLang;
    if (mobileLang) mobileLang.value = savedLang;

    updateContactLanguage(savedLang);

    // Til o'zgartirish
    [langSelect, mobileLang].forEach(select => {
        if (select) {
            select.addEventListener('change', (e) => {
                const newLang = e.target.value;
                localStorage.setItem('selectedLanguage', newLang);
                if (langSelect) langSelect.value = newLang;
                if (mobileLang) mobileLang.value = newLang;
                updateContactLanguage(newLang);
            });
        }
    });

    // Forma yuborish — Telegramga
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone1').value.trim();
            const description = document.getElementById('description').value.trim();

            if (!fullName || !phone || !description) {
                alert('Iltimos, barcha maydonlarni to\'ldiring!');
                return;
            }

            const message = `Yangi ariza (Aloqa sahifasi):\nFIO: ${fullName}\nTelefon: ${phone}\nIsh tavsifi: ${description}`;

            // BOT TOKEN va CHAT ID ni o'zgartiring!!!
            const BOT_TOKEN = '8470738324:AAGPSBD2IROlb5Uwztq-q-gRNbFQqFBXl1E';
            const CHAT_ID = '7903105868';

            fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    successMessage.classList.remove('d-none');
                    contactForm.reset();
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                } else {
                    alert('Xatolik yuz berdi. Qayta urinib ko\'ring.');
                }
            })
            .catch(() => alert('Internet aloqasi muammosi.'));
        });
    }

});