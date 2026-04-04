// ====================== XAVFSIZLIK — Klaviatura va sichqoncha cheklovlari ======================
document.addEventListener('keydown', function(e) {
    // F12 ni bloklash
    if (e.keyCode == 123) {
        e.preventDefault();
        return false;
    }

    // Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U, Ctrl + S
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) {
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && e.keyCode == 85) {
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && e.keyCode == 83) {
        e.preventDefault();
        return false;
    }

    // Ctrl + C (nusxa olishni qiyinlashtirish uchun)
    if (e.ctrlKey && e.keyCode == 67) {
        // To'liq bloklamaymiz, lekin foydalanuvchi tajribasini buzmaymiz
        // Agar kerak bo'lsa: e.preventDefault();
    }
});

// O'ng tugma (right-click) ni bloklash
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Sichqoncha bilan matn tanlashni cheklash (ixtiyoriy — dizayn buzilmasligi uchun ehtiyot bo'ling)
// document.body.style.userSelect = 'none';
// document.body.style.webkitUserSelect = 'none';
// document.body.style.msUserSelect = 'none';

// Agar matn tanlashni butunlay o'chirib qo'ymoqchi bo'lsangiz, yuqoridagi kodlarni oching.
// Lekin foydalanuvchilar uchun noqulay bo'lishi mumkin — tavsiya etilmaydi.