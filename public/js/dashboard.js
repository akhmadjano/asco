// ===============================
// GLOBAL STATE
// ===============================
let CURRENT_LANG = "uz";

function changeLang() {
    CURRENT_LANG = document.getElementById("langSelect").value;
}


// ===============================
// UNIVERSAL API CALL
// ===============================
async function api(url, method = "GET", body = null) {
    const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
            "Accept-Language": CURRENT_LANG,
            "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : null
    });

    if (res.status === 401) {
        window.location.href = "/";
        return;
    }

    return res.json();
}


// ===============================
// UNIVERSAL TABLE RENDERER
// ===============================
function renderTable(list, fields) {
    const div = document.getElementById("content");

    if (!list || list.length === 0) {
        div.innerHTML = "<h3>Ma’lumot topilmadi!</h3>";
        return;
    }

    let html = "<table class='tbl'><tr>";
    fields.forEach(f => html += `<th>${f}</th>`);
    html += "</tr>";

    list.forEach(row => {
        html += "<tr>";
        fields.forEach(f => {
            let val = row[f];

            if (Array.isArray(val)) val = val.join("<br>");
            else if (typeof val === "object" && val !== null)
                val = `<pre>${JSON.stringify(val, null, 2)}</pre>`;

            html += `<td>${val ?? ""}</td>`;
        });
        html += "</tr>";
    });

    html += "</table>";
    div.innerHTML = html;
}


// ===============================
// SIMPLE LIST
// ===============================
function renderList(list, title) {
    document.getElementById("content").innerHTML =
        `<h2>${title}</h2><ul class='lst'>` +
        list.map(i => `<li>${i}</li>`).join("") +
        "</ul>";
}


// ===============================
// 0) MAIN DASHBOARD
// ===============================
function loadDashboard() {
    document.getElementById("headerTitle").innerText = "Dashboard";
    document.getElementById("content").innerHTML = `
        <h2>Xush kelibsiz!</h2>
        <p>Chap menyudan kerakli bo‘limni tanlang.</p>
    `;
}



// ===============================
// USERS — PREMIUM FULL INTERACTIVE VERSION (Real-time)
// ===============================
let userRefreshInterval;
async function loadUsers(page = 0) {
    document.getElementById("headerTitle").innerText = "Foydalanuvchilar";

    const size = 15;
    const data = await api(`/bot/get-users/page?page=${page}&size=${size}`);

    let users = data?.result?.content || [];

    // ❗ GROUP bo‘lgan (chatId manfiy) elementlarni olib tashlaymiz
    users = users.filter(u => !String(u.chatId).startsWith("-"));

    const totalPages = data?.result?.page?.totalPages || 1;

    const div = document.getElementById("content");
    div.innerHTML = "";

    if (users.length === 0) {
        div.innerHTML = "<h3>Oddiy foydalanuvchi topilmadi</h3>";
        return;
    }

    let html = `
        <table class="tbl">
            <tr>
                <th>Chat ID</th>
                <th>Active</th>
                <th>Lang</th>
                <th>3d</th>
                <th>2d</th>
                <th>1d</th>
                <th>Count</th>
                <th>Kengaytirish</th>
                <th>Saqlash</th>
            </tr>
    `;

    users.forEach(u => {
        html += `
            <tr>
                <td>${u.chatId}</td>
                <td>
                    <label class="switch">
                        <input type="checkbox" id="active_${u.chatId}" ${u.isActive ? "checked" : ""}>
                        <span class="slider"></span>
                    </label>
                </td>
                <td>${u.lang}</td>
                <td><label class="switch"><input type="checkbox" ${u.threeDaysAgo ? "checked" : ""} disabled><span class="slider"></span></label></td>
                <td><label class="switch"><input type="checkbox" ${u.twoDaysAgo ? "checked" : ""} disabled><span class="slider"></span></label></td>
                <td><label class="switch"><input type="checkbox" ${u.theDayBefore ? "checked" : ""} disabled><span class="slider"></span></label></td>
                <td>${u.countTaxInfo}</td>

                <td>
                    <button class="expandBtn styledBtn" data-id="${u.chatId}">Ko‘rish</button>
                </td>
                <td>
                    <button class="saveBtn styledBtn" data-id="${u.chatId}">Saqlash</button>
                </td>
            </tr>

            <tr id="tax_${u.chatId}" style="display:none;">
                <td colspan="9" class="tax-box">
                    ${u.taxes?.length ? u.taxes.map(t => `<div>• ${t}</div>`).join("") : "<i>Soliqlar ro‘yxati bo‘sh</i>"}
                </td>
            </tr>
        `;
    });

    html += "</table>";

    div.innerHTML = html;

    // event bindings
    document.querySelectorAll(".expandBtn").forEach(btn => {
        btn.onclick = () => {
            const id = btn.dataset.id;
            const box = document.getElementById("tax_" + id);
            box.style.display = box.style.display === "none" ? "table-row" : "none";
        };
    });

    document.querySelectorAll(".saveBtn").forEach(btn => {
        btn.onclick = async () => {
            const id = btn.dataset.id;
            const active = document.querySelector(`#active_${id}`).checked;

            btn.disabled = true;
            btn.textContent = "Saqlanmoqda...";

            await api(`/bot/user-update/${id}`, "PUT", { isActive: active });

            btn.disabled = false;
            btn.textContent = "Saqlash";

            alert("Saqlandi!");
        };
    });
}

// ===============================
// GROUPS (REAL API RESPONSE BILAN MOS)
// ===============================
async function loadGroups(page = 0) {
    document.getElementById("headerTitle").innerText = "Guruhlar";

    const size = 20;
    const data = await api(`/bot/get-groups/page?page=${page}&size=${size}`, "GET");
    const groups = data?.result?.content || [];
    const div = document.getElementById("content");
    div.innerHTML = "";

    if (!groups.length) {
        div.innerHTML = "<h3>Guruh topilmadi</h3>";
        return;
    }

    // Soliq turlari
    const taxData = await api("/bot/get-taxes-choose");
    const taxList = taxData?.result || [];

    let html = `
        <table class="tbl">
            <tr>
                <th>ID</th>
                <th>Group ID</th>
                <th>Group Name</th>
                <th>Group Type</th>
                <th>Link</th>
                <th>Active</th>
                <th>Lang</th>
                <th>3d</th>
                <th>2d</th>
                <th>1d</th>
                <th>Count</th>
                <th>Ko‘rish</th>
                <th>Saqlash</th>
                <th>Taxlar</th>
            </tr>
    `;

    groups.forEach(g => {
        const langClass = g.lang === "uz" ? "lang-uz" : g.lang === "ru" ? "lang-ru" : "";

        html += `
            <tr>
                <td>${g.id ?? ""}</td>
                <td>${g.groupId ?? ""}</td>
                <td>${g.groupName || ""}</td>
                <td>${g.groupType || ""}</td>
                <td>${g.link || ""}</td>
                <td>
                    <label class="switch">
                        <input type="checkbox" id="active_${g.groupId}" ${g.isActive ? "checked" : ""}>
                        <span class="slider"></span>
                    </label>
                </td>
                <td>
                    <select id="lang_${g.groupId}" class="${langClass}">
                        <option value="uz" ${g.lang === "uz" ? "selected" : ""}>uz</option>
                        <option value="ru" ${g.lang === "ru" ? "selected" : ""}>ru</option>
                    </select>
                </td>
                <td>
                    <label class="switch">
                        <input type="checkbox" id="three_${g.groupId}" ${g.threeDaysAgo ? "checked" : ""}>
                        <span class="slider"></span>
                    </label>
                </td>
                <td>
                    <label class="switch">
                        <input type="checkbox" id="two_${g.groupId}" ${g.twoDaysAgo ? "checked" : ""}>
                        <span class="slider"></span>
                    </label>
                </td>
                <td>
                    <label class="switch">
                        <input type="checkbox" id="one_${g.groupId}" ${g.theDayBefore ? "checked" : ""}>
                        <span class="slider"></span>
                    </label>
                </td>
                <td>${g.countTaxInfo ?? 0}</td>
                <td>
                    <button class="expandBtn styledBtn" data-id="${g.groupId}" style="background:#2563eb;">Ko‘rish</button>
                </td>
                <td>
                    <button class="saveBtn styledBtn" data-id="${g.groupId}" style="background:#3B82F6;">Saqlash</button>
                </td>
                <td>
                    <button class="taxModalBtn styledBtn" data-id="${g.groupId}" style="background:#F59E0B;">Tax biriktirish</button>
                </td>
            </tr>
        `;
    });

    html += "</table>";
    div.innerHTML = html;

    // ===============================
    // Modal yaratish
    // ===============================
    const modalTemplate = `
        <div id="modalOverlay" class="modal">
            <div class="modalContent">
                <div class="modalHeader">
                    <h2 id="modalTitle"></h2>
                    <button class="closeBtn">&times;</button>
                </div>
                <div class="modalBody" id="modalBody"></div>
                <div class="modalFooter">
                    <button id="modalSaveBtn" class="styledBtn" style="background:#10B981;">Saqlash</button>
                </div>
            </div>
        </div>
    `;
    if(!document.getElementById("modalOverlay")) {
        document.body.insertAdjacentHTML('beforeend', modalTemplate);
    }

    const modal = document.getElementById("modalOverlay");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    const modalSaveBtn = document.getElementById("modalSaveBtn");
    const closeBtn = modal.querySelector(".closeBtn");

    let currentGroupId = null;
    let modalMode = null;

// ===============================
// Ko‘rish tugmasi (faqat checked taxlar)
// ===============================
document.querySelectorAll(".expandBtn").forEach(btn => {
    btn.onclick = async () => {
        const chatId = btn.dataset.id;
        currentGroupId = chatId;
        modalMode = "view";

        // YANGI API orqali ma'lumot olish
        const res = await api(`/bot/get-group/${chatId}`);
        const group = res?.result;

        if (!group) {
            alert("Ma'lumot topilmadi");
            return;
        }

        modalTitle.innerText = `Guruh: ${group.groupName}`;

        // Faol / No faol
        const isActiveTxt = group.isActive ? "Ha" : "Yo‘q";

        // Faqat checked: true bo‘lgan taxlar
        const selectedTaxes = (group.taxes || [])
            .filter(t => t.checked)
            .map(t => t.taxType);

        modalBody.innerHTML = `
            <p><b>ID:</b> ${group.id}</p>
            <p><b>Group ID:</b> ${group.groupId}</p>
            <p><b>Group Name:</b> ${group.groupName}</p>
            <p><b>Group Type:</b> ${group.groupType}</p>
            <p><b>Link:</b> <a href="${group.link}" target="_blank">${group.link}</a></p>
            <p><b>Active:</b> ${isActiveTxt}</p>
            <p><b>Til:</b> ${group.lang}</p>

            <p><b>3 kun oldin:</b> ${group.threeDaysAgo ? "Ha" : "Yo‘q"}</p>
            <p><b>2 kun oldin:</b> ${group.twoDaysAgo ? "Ha" : "Yo‘q"}</p>
            <p><b>Kecha:</b> ${group.theDayBefore ? "Ha" : "Yo‘q"}</p>

            <p><b>Count Tax:</b> ${group.countTaxInfo}</p>

            <p style="margin-top:10px;"><b>Biriktirilgan taxlar:</b></p>
            ${
                selectedTaxes.length
                ? `<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:6px;">
                    ${selectedTaxes.map(t => `<span style="
                        padding:6px 10px;
                        background:#dbeafe;
                        border:1px solid #93c5fd;
                        color:#1e3a8a;
                        border-radius:8px;
                        font-size:14px;
                        font-weight:500;">${t}</span>`).join("")}
                  </div>`
                : `<i style="color:#9ca3af;">Tax biriktirilmagan</i>`
            }
        `;

        modalSaveBtn.style.display = "none";
        modal.style.display = "flex";
    };
});




// ===============================
// PREMIUM TAX MODAL
// ===============================
document.querySelectorAll(".taxModalBtn").forEach(btn => {
    btn.onclick = async () => {
        const chatId = btn.dataset.id;
        currentGroupId = chatId;
        modalMode = "tax";

        // 🔹 API orqali guruhni olish, checked: true/false bilan
        const res = await api(`/bot/get-group/${chatId}`);
        const group = res?.result;
        if (!group) return alert("Ma'lumot topilmadi");

        // Oldindan biriktirilgan taxlar (faqat checked: true)
        const selectedTaxes = (group.taxes || [])
            .filter(t => t.checked)
            .map(t => t.taxType);

        modalTitle.innerHTML = `<span style="font-weight:600; font-size:18px;">Tax biriktirish — ${group.groupName}</span>`;

        modalBody.innerHTML = `
            <div style="display:flex; gap:10px; margin-bottom:15px;">
                <input id="taxSearch" type="text" placeholder="🔍 Tax qidirish..."
                style="flex:1; padding:12px; border-radius:10px; border:1px solid #d1d5db; font-size:15px;">
            </div>

            <div id="taxGrid" style="
                display:grid;
                grid-template-columns:repeat(auto-fill,minmax(190px,1fr));
                gap:14px;
                max-height:380px;
                overflow-y:auto;
                padding-right:4px;
            "></div>
        `;

        const taxGrid = document.getElementById("taxGrid");

        const renderTaxes = (filter = "") => {
            taxGrid.innerHTML = "";

            taxList
                .filter(t => t.toLowerCase().includes(filter.toLowerCase()))
                .forEach(t => {
                    // 🔹 Checked faqat oldindan biriktirilganlar uchun
                    const isChecked = selectedTaxes.includes(t);

                    taxGrid.innerHTML += `
                        <div class="taxItem" style="
                            background:#ffffff;
                            border:1px solid #e2e8f0;
                            padding:12px;
                            display:flex;
                            align-items:center;
                            gap:10px;
                            border-radius:12px;
                            box-shadow:0 1px 3px rgba(0,0,0,0.05);
                            cursor:pointer;
                            transition:0.2s;
                        ">
                            <input 
                                type="checkbox" 
                                class="modalTaxCheckbox" 
                                data-tax="${t}"
                                ${isChecked ? "checked" : ""}
                                style="width:18px; height:18px; cursor:pointer;"
                            >
                            <span style="font-size:15px; font-weight:500; color:#1e293b;">${t}</span>
                        </div>
                    `;
                });

            // Checkboxni card ustiga bosish bilan o'zgartirish
            taxGrid.querySelectorAll(".taxItem").forEach(card => {
                card.addEventListener("click", e => {
                    if (e.target.tagName !== "INPUT") {
                        const cb = card.querySelector("input");
                        cb.checked = !cb.checked;
                    }
                });
            });
        };

        renderTaxes();

        document.getElementById("taxSearch").oninput = e => renderTaxes(e.target.value);

        modalSaveBtn.style.display = "inline-block";
        modal.style.display = "flex";
    };
});

    // ===============================
    // Modal close
    // ===============================
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = e => { if(e.target == modal) modal.style.display = "none"; };

    // ===============================
    // Modal save
    // ===============================
    modalSaveBtn.onclick = async () => {
        if(modalMode !== "tax") return;
        const checkboxes = modal.querySelectorAll(".modalTaxCheckbox:checked");
        if(!checkboxes.length) {
            alert("Ishlamaydigan tax tanlamandi!");
            return;
        }

        const body = { taxTypes: Array.from(checkboxes).map(cb => ({ checked:true, taxType: cb.dataset.tax })) };

        modalSaveBtn.disabled = true;
        modalSaveBtn.textContent = "Saqlanmoqda...";

        const res = await api(`/bot/add-group-taxes/${currentGroupId}`, "POST", body);

        modalSaveBtn.disabled = false;
        modalSaveBtn.textContent = "Saqlash";

        if(!res || res.ok === false) {
            alert("Server xato qaytardi!");
            return;
        }

        alert("Taxlar saqlandi!");
        modal.style.display = "none";
        loadGroups(page);
    };

    // ===============================
    // Saqlash tugmalari
    // ===============================
    document.querySelectorAll(".saveBtn").forEach(btn => {
        btn.onclick = async () => {
            const id = btn.dataset.id;
            const body = {
                isActive: document.querySelector(`#active_${id}`).checked,
                lang: document.querySelector(`#lang_${id}`).value,
                threeDaysAgo: document.querySelector(`#three_${id}`).checked,
                twoDaysAgo: document.querySelector(`#two_${id}`).checked,
                theDayBefore: document.querySelector(`#one_${id}`).checked,
            };

            btn.disabled = true;
            btn.textContent = "Saqlanmoqda...";

            const res = await api(`/bot/group-update/${id}`, "PUT", body);

            btn.disabled = false;
            btn.textContent = "Saqlash";

            if (!res || res.ok === false) {
                alert("Server xato qaytardi!");
                return;
            }

            alert("Saqlandi!");
        };
    });
}

// ===============================
// TEXT REPORT
// ===============================

async function loadTaxReports() {
    document.getElementById("headerTitle").innerText = "Soliq Hisobotlari";

    const data = await api("/bot/tax-report-list/page?page=0&size=20");

    const categories = data?.result?.content || [];

    const div = document.getElementById("content");

    if (categories.length === 0) {
        div.innerHTML = "<h3>Ma’lumot topilmadi!</h3>";
        return;
    }

    let html = `
        <div class="taxReportsHeader">
            <button class="addBtn" onclick="openTaxAddModal()">+ Qo‘shish</button>
        </div>
    `;

    categories.forEach(cat => {

        html += `
            <h2 style="margin-bottom:10px; color:#5B21B6;">${cat.taxType}</h2>
        `;

        cat.taxesByType.forEach(r => {

            html += `
                <div class="taxCard">

                    <div class="taxRow">
                        <div class="taxCol">
                            <h3>${r.reportName}</h3>
                            <p><b>Soliq turi:</b> ${r.taxType}</p>
                            <p><b>Hisobot davri:</b> ${r.reportingPeriod}</p>
                            <p><b>Hisobot topshirish sanasi:</b> ${r.reportDate}</p>
                            <p class="comment">${r.reportComment || ""}</p>
                        </div>

                        <div class="taxCol">
                            <p><b>To‘lov turi:</b> ${r.taxName}</p>
                            <p><b>To‘lov davri:</b> ${r.paymentPeriod}</p>
                            <p><b>To‘lov muddati:</b> ${r.taxDate}</p>
                            <p class="comment">${r.taxComment || ""}</p>

                            <div class="taxBtnBox">
                                <button class="viewBtn" onclick="viewTax(${r.id})">Ko‘rish</button>
                                <button class="editBtn" onclick="editTax(${r.id})">Tahrirlash</button>
                                <button class="deleteBtn" onclick="deleteTax(${r.id})">O‘chirish</button>
                            </div>
                        </div>
                    </div>

                </div>
            `;
        });
    });

    div.innerHTML = html;
}

function confirmModal(message, onConfirm) {
    let modal = document.getElementById("confirmModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "confirmModal";
        modal.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex; justify-content: center; align-items: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        modal.innerHTML = `
            <div style="
                background: #fff; padding: 25px 30px; border-radius: 15px; 
                max-width: 400px; width: 90%; text-align: center;
                box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                transform: translateY(-50px);
                transition: transform 0.3s ease;
            ">
                <p id="confirmMessage" style="margin-bottom: 25px; font-size: 18px; color: #333; font-weight: 500;"></p>
                <button id="confirmYes" style="
                    margin-right: 10px; padding: 10px 20px; border: none; border-radius: 8px;
                    background: linear-gradient(45deg, #4CAF50, #66BB6A); color: #fff;
                    cursor: pointer; font-size: 16px; transition: 0.3s;
                ">Ha</button>
                <button id="confirmNo" style="
                    padding: 10px 20px; border: none; border-radius: 8px;
                    background: linear-gradient(45deg, #F44336, #E57373); color: #fff;
                    cursor: pointer; font-size: 16px; transition: 0.3s;
                ">Yo‘q</button>
            </div>
        `;
        document.body.appendChild(modal);

        const container = modal.querySelector("div");
        modal.querySelector("#confirmNo").onclick = () => {
            container.style.transform = "translateY(-50px)";
            modal.style.opacity = 0;
            setTimeout(() => modal.style.display = "none", 300);
        };
    }

    modal.querySelector("#confirmMessage").innerText = message;
    modal.style.display = "flex";
    setTimeout(() => {
        modal.style.opacity = 1;
        modal.querySelector("div").style.transform = "translateY(0)";
    }, 10);

    modal.querySelector("#confirmYes").onclick = () => {
        modal.querySelector("div").style.transform = "translateY(-50px)";
        modal.style.opacity = 0;
        setTimeout(() => modal.style.display = "none", 300);
        onConfirm();
    };
}

function alertModal(message) {
    let modal = document.getElementById("alertModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "alertModal";
        modal.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex; justify-content: center; align-items: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        modal.innerHTML = `
            <div style="
                background: #fff; padding: 25px 30px; border-radius: 15px; 
                max-width: 400px; width: 90%; text-align: center;
                box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                transform: translateY(-50px);
                transition: transform 0.3s ease;
            ">
                <p id="alertMessage" style="margin-bottom: 25px; font-size: 18px; color: #333; font-weight: 500;"></p>
                <button id="alertOk" style="
                    padding: 10px 25px; border: none; border-radius: 8px;
                    background: linear-gradient(45deg, #2196F3, #64B5F6); color: #fff;
                    cursor: pointer; font-size: 16px; transition: 0.3s;
                ">OK</button>
            </div>
        `;
        document.body.appendChild(modal);

        const container = modal.querySelector("div");
        modal.querySelector("#alertOk").onclick = () => {
            container.style.transform = "translateY(-50px)";
            modal.style.opacity = 0;
            setTimeout(() => modal.style.display = "none", 300);
        };
    }

    modal.querySelector("#alertMessage").innerText = message;
    modal.style.display = "flex";
    setTimeout(() => {
        modal.style.opacity = 1;
        modal.querySelector("div").style.transform = "translateY(0)";
    }, 10);
}

async function deleteTax(id) {
    confirmModal("Rostdan o‘chirmoqchimisiz?", async () => {
        const res = await api(`/bot/tax-report-delete/${id}`, "DELETE");
        let msg = res?.result ? "O‘chirildi!" : "Xatolik: o‘chirilmadi";
        alertModal(msg);
        if (res?.result) loadTaxReports();
    });
}

function openTaxAddModal() {
    const modal = document.getElementById("addTaxModal");
    const box = document.getElementById("addTaxContent");

    // ❗ Har safar modal ichini tozalab qo'yamiz (undefined shu sababdan chiqardi)
    box.innerHTML = "";

    box.innerHTML = `
        <h3>Yangi Soliq Hisoboti Qo‘shish</h3>

        <h4>O'zbekcha</h4>

        <label>Soliq turi</label>
        <input id="add_uz_taxType">

        <label>Hisobot nomi</label>
        <input id="add_uz_reportName">

        <label>Hisobot davri</label>
        <input id="add_uz_reportingPeriod">

        <label>Hisobot sanasi</label>
        <input id="add_uz_reportDate">

        <label>Hisobot izohi</label>
        <textarea id="add_uz_reportComment"></textarea>

        <label>Soliq nomi</label>
        <input id="add_uz_taxName">

        <label>To‘lov davri</label>
        <input id="add_uz_paymentPeriod">

        <label>To‘lov sanasi</label>
        <input id="add_uz_taxDate">

        <label>To‘lov izohi</label>
        <textarea id="add_uz_taxComment"></textarea>

        <h4>Русский</h4>

        <label>Тип налога</label>
        <input id="add_ru_taxType">

        <label>Название отчёта</label>
        <input id="add_ru_reportName">

        <label>Отчётный период</label>
        <input id="add_ru_reportingPeriod">

        <label>Дата отчёта</label>
        <input id="add_ru_reportDate">

        <label>Комментарий отчёта</label>
        <textarea id="add_ru_reportComment"></textarea>

        <label>Название налога</label>
        <input id="add_ru_taxName">

        <label>Платёжный период</label>
        <input id="add_ru_paymentPeriod">

        <label>Дата платежа</label>
        <input id="add_ru_taxDate">

        <label>Комментарий платежа</label>
        <textarea id="add_ru_taxComment"></textarea>

        <br><br>

        <button onclick="saveNewTax()" class="saveBtn">Saqlash</button>
        <button onclick="closeAddModal()" class="deleteBtn">Bekor qilish</button>
    `;

    modal.style.display = "flex";
}

function closeAddModal() {
    document.getElementById("addTaxModal").style.display = "none";
}

async function saveNewTax() {

    const body = {
        uz: {
            id: 0,
            taxType: document.getElementById("add_uz_taxType").value,
            reportName: document.getElementById("add_uz_reportName").value,
            reportingPeriod: document.getElementById("add_uz_reportingPeriod").value,
            reportDate: document.getElementById("add_uz_reportDate").value,
            reportComment: document.getElementById("add_uz_reportComment").value,
            taxName: document.getElementById("add_uz_taxName").value,
            paymentPeriod: document.getElementById("add_uz_paymentPeriod").value,
            taxDate: document.getElementById("add_uz_taxDate").value,
            taxComment: document.getElementById("add_uz_taxComment").value,
            deleted: false
        },
        ru: {
            id: 0,
            taxType: document.getElementById("add_ru_taxType").value,
            reportName: document.getElementById("add_ru_reportName").value,
            reportingPeriod: document.getElementById("add_ru_reportingPeriod").value,
            reportDate: document.getElementById("add_ru_reportDate").value,
            reportComment: document.getElementById("add_ru_reportComment").value,
            taxName: document.getElementById("add_ru_taxName").value,
            paymentPeriod: document.getElementById("add_ru_paymentPeriod").value,
            taxDate: document.getElementById("add_ru_taxDate").value,
            taxComment: document.getElementById("add_ru_taxComment").value,
            deleted: false
        }
    };

    const res = await api(`/bot/add-tax-report`, "POST", body);

    if (res?.result) {
        alert("Soliq hisobot muvaffaqiyatli qo‘shildi!");
        closeAddModal();
        loadTaxReports();
    } else {
        alert("Xatolik: " + res.error);
    }
}

async function viewTax(id) {
    const data = await api(`/bot/tax-report/${id}`);

    const uz = data?.result?.uz;
    const ru = data?.result?.ru;

    if (!uz || !ru) {
        alert("Ma’lumot topilmadi!");
        return;
    }

    const modal = document.getElementById("viewTaxModal");
    const box = document.getElementById("viewTaxContent");

    box.innerHTML = `
        <div class="modalHeader">
            <h2>Soliq Hisoboti Tafsilotlari</h2>
            <button class="closeBtn" onclick="closeViewModal()">
                <i class="ri-close-line"></i>
            </button>
        </div>

        <div class="modalBody">

            <h3 class="sectionTitle">O'zbekcha</h3>

            <div class="viewRow"><label>Soliq turi:</label> <span>${uz.taxType}</span></div>
            <div class="viewRow"><label>Hisobot nomi:</label> <span>${uz.reportName}</span></div>
            <div class="viewRow"><label>Hisobot davri:</label> <span>${uz.reportingPeriod}</span></div>
            <div class="viewRow"><label>Hisobot sanasi:</label> <span>${uz.reportDate}</span></div>
            <div class="viewRowColumn">
                <label>Izoh:</label>
                <div class="viewTextBox">${uz.reportComment || "—"}</div>
            </div>

            <h3 class="sectionTitle">To‘lov ma’lumotlari (UZ)</h3>
            <div class="viewRow"><label>To‘lov turi:</label> <span>${uz.taxName}</span></div>
            <div class="viewRow"><label>To‘lov davri:</label> <span>${uz.paymentPeriod}</span></div>
            <div class="viewRow"><label>To‘lov sanasi:</label> <span>${uz.taxDate}</span></div>
            <div class="viewRowColumn">
                <label>Izoh:</label>
                <div class="viewTextBox">${uz.taxComment || "—"}</div>
            </div>

            <h3 class="sectionTitle">Русский</h3>

            <div class="viewRow"><label>Тип налога:</label> <span>${ru.taxType}</span></div>
            <div class="viewRow"><label>Название отчёта:</label> <span>${ru.reportName}</span></div>
            <div class="viewRow"><label>Отчётный период:</label> <span>${ru.reportingPeriod}</span></div>
            <div class="viewRow"><label>Дата отчёта:</label> <span>${ru.reportDate}</span></div>
            <div class="viewRowColumn">
                <label>Комментарий:</label>
                <div class="viewTextBox">${ru.reportComment || "—"}</div>
            </div>

            <h3 class="sectionTitle">Платёж (RU)</h3>
            <div class="viewRow"><label>Название налога:</label> <span>${ru.taxName}</span></div>
            <div class="viewRow"><label>Платёжный период:</label> <span>${ru.paymentPeriod}</span></div>
            <div class="viewRow"><label>Дата платежа:</label> <span>${ru.taxDate}</span></div>
            <div class="viewRowColumn">
                <label>Комментарий:</label>
                <div class="viewTextBox">${ru.taxComment || "—"}</div>
            </div>

        </div>

        <div class="modalFooter">
            <button class="closeBtn2" onclick="closeViewModal()">Yopish</button>
        </div>
    `;

    modal.style.display = "flex";
}

function closeViewModal() {
    document.getElementById("viewTaxModal").style.display = "none";
}

function closeViewModal() {
    document.getElementById("viewTaxModal").style.display = "none";
}

async function editTax(id) {
    const data = await api(`/bot/tax-report/${id}`);
    const uz = data?.result?.uz;
    const ru = data?.result?.ru;

    if (!uz || !ru) {
        alert("Ma’lumot topilmadi!");
        return;
    }

    const modal = document.getElementById("editTaxModal");
    const box = document.getElementById("editTaxContent");

    box.innerHTML = `
        <div class="modalHeader">
            <h2>Soliq Hisobotini Tahrirlash</h2>
            <button class="closeBtn" onclick="closeEditModal()">
                <i class="ri-close-line"></i>
            </button>
        </div>

        <div class="modalBody">

            <h3 class="sectionTitle">O'zbekcha</h3>

            <label>Soliq turi</label>
            <input id="edit_uz_taxType" value="${uz.taxType || ""}">

            <label>Hisobot nomi</label>
            <input id="edit_uz_reportName" value="${uz.reportName || ""}">

            <label>Hisobot davri</label>
            <input id="edit_uz_reportingPeriod" value="${uz.reportingPeriod || ""}">

            <label>Hisobot sanasi</label>
            <input id="edit_uz_reportDate" value="${uz.reportDate || ""}">

            <label>Hisobot izohi</label>
            <textarea id="edit_uz_reportComment">${uz.reportComment || ""}</textarea>

            <label>Soliq nomi</label>
            <input id="edit_uz_taxName" value="${uz.taxName || ""}">

            <label>To‘lov davri</label>
            <input id="edit_uz_paymentPeriod" value="${uz.paymentPeriod || ""}">

            <label>To‘lov sanasi</label>
            <input id="edit_uz_taxDate" value="${uz.taxDate || ""}">

            <label>To‘lov izohi</label>
            <textarea id="edit_uz_taxComment">${uz.taxComment || ""}</textarea>


            <h3 class="sectionTitle">Русский</h3>

            <label>Тип налога</label>
            <input id="edit_ru_taxType" value="${ru.taxType || ""}">

            <label>Название отчёта</label>
            <input id="edit_ru_reportName" value="${ru.reportName || ""}">

            <label>Отчётный период</label>
            <input id="edit_ru_reportingPeriod" value="${ru.reportingPeriod || ""}">

            <label>Дата отчёта</label>
            <input id="edit_ru_reportDate" value="${ru.reportDate || ""}">

            <label>Комментарий отчёта</label>
            <textarea id="edit_ru_reportComment">${ru.reportComment || ""}</textarea>

            <label>Название налога</label>
            <input id="edit_ru_taxName" value="${ru.taxName || ""}">

            <label>Платёжный период</label>
            <input id="edit_ru_paymentPeriod" value="${ru.paymentPeriod || ""}">

            <label>Дата платежа</label>
            <input id="edit_ru_taxDate" value="${ru.taxDate || ""}">

            <label>Комментарий платежа</label>
            <textarea id="edit_ru_taxComment">${ru.taxComment || ""}</textarea>

        </div>

        <div class="modalFooter">
            <button onclick="saveEditedTax(${id})" class="saveBtn">Saqlash</button>
            <button onclick="closeEditModal()" class="deleteBtn">Bekor qilish</button>
        </div>
    `;

    modal.style.display = "flex";
}

async function saveEditedTax(id) {

    const body = {
        uz: {
            id,
            taxType: document.getElementById("edit_uz_taxType").value,
            reportName: document.getElementById("edit_uz_reportName").value,
            reportingPeriod: document.getElementById("edit_uz_reportingPeriod").value,
            reportDate: document.getElementById("edit_uz_reportDate").value,
            reportComment: document.getElementById("edit_uz_reportComment").value,
            taxName: document.getElementById("edit_uz_taxName").value,
            paymentPeriod: document.getElementById("edit_uz_paymentPeriod").value,
            taxDate: document.getElementById("edit_uz_taxDate").value,
            taxComment: document.getElementById("edit_uz_taxComment").value,
            deleted: false
        },
        ru: {
            id,
            taxType: document.getElementById("edit_ru_taxType").value,
            reportName: document.getElementById("edit_ru_reportName").value,
            reportingPeriod: document.getElementById("edit_ru_reportingPeriod").value,
            reportDate: document.getElementById("edit_ru_reportDate").value,
            reportComment: document.getElementById("edit_ru_reportComment").value,
            taxName: document.getElementById("edit_ru_taxName").value,
            paymentPeriod: document.getElementById("edit_ru_paymentPeriod").value,
            taxDate: document.getElementById("edit_ru_taxDate").value,
            taxComment: document.getElementById("edit_ru_taxComment").value,
            deleted: false
        }
    };

    const res = await api(`/bot/tax-report-update/${id}`, "PUT", body);

    if (res?.result) {
        alert("O‘zgartirildi!");
        closeEditModal();
        loadTaxReports();
    } else {
        alert("Xatolik: " + res.error);
    }
}

function closeEditModal() {
    document.getElementById("editTaxModal").style.display = "none";
}

// ===============================
// Info Entity
// ===============================

async function loadInfoEntities() {
    document.getElementById("headerTitle").innerText = "Soliq Ma’lumotlari";

    const data = await api("/bot/info-entity-list/page?page=0&size=100");
    const list = data?.result?.content || [];

    let html = `
        <div class="taxReportsHeader">
            <button class="addBtn" onclick="openInfoAddModal()">+ Qo‘shish</button>
        </div>
    `;

    if (list.length === 0) {
        document.getElementById("content").innerHTML = "<h3>Ma’lumot topilmadi!</h3>";
        return;
    }

    list.forEach(i => {
        html += `
            <div class="infoCard">
                <div class="infoHeader" onclick="toggleInfo(${i.id})">
                    <b>${i.id}</b> — ${i.typeOfTax}
                </div>

                <div id="info_${i.id}" class="infoBody" style="display:none;">
                    <p>${i.fullInfo?.replace(/\n/g, "<br>")}</p>

                    <div class="infoBtnBox">
                        <button class="editBtn" onclick="event.stopPropagation(); editInfo(${i.id})">Tahrirlash</button>
                        <button class="deleteBtn" onclick="event.stopPropagation(); deleteInfo(${i.id})">O‘chirish</button>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById("content").innerHTML = html;
}

function toggleInfo(id) {
    const box = document.getElementById("info_" + id);
    box.style.display = box.style.display === "none" ? "block" : "none";
}

function openInfoImport() {
    document.getElementById("infoImportFile").click();
}

async function uploadInfoCsv() {
    const file = document.getElementById("infoImportFile").files[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/bot/import-tax-info-csv", {
        method: "POST",
        body: form
    });

    const json = await res.json();

    if (json.status === 200) {
        alert("Yuklandi!");
        loadInfoEntities();
    } else alert("Xatolik!");
}

function openInfoAddModal() {
    const modal = document.getElementById("addTaxModal");
    const box = document.getElementById("addTaxContent");

    box.innerHTML = `
        <h3>Yangi Soliq Ma’lumoti Qo‘shish</h3>

        <h4>O'zbekcha</h4>
        <label>Soliq turi</label>
        <input id="add_uz_typeOfTax">
        <label>Batafsil ma’lumot</label>
        <textarea id="add_uz_fullInfo"></textarea>

        <h4>Русский</h4>
        <label>Тип налога</label>
        <input id="add_ru_typeOfTax">
        <label>Подробная информация</label>
        <textarea id="add_ru_fullInfo"></textarea>

        <button class="saveBtn" onclick="saveNewInfo()">Saqlash</button>
        <button class="deleteBtn" onclick="closeAddModal()">Bekor qilish</button>
    `;

    modal.style.display = "flex";
}

async function saveNewInfo() {
    const body = {
        uz: {
            typeOfTax: document.getElementById("add_uz_typeOfTax").value,
            fullInfo: document.getElementById("add_uz_fullInfo").value
        },
        ru: {
            typeOfTax: document.getElementById("add_ru_typeOfTax").value,
            fullInfo: document.getElementById("add_ru_fullInfo").value
        }
    };

    const res = await api("/bot/add-info_entity", "POST", body);

    if (res?.result) {
        alert("Qo‘shildi!");
        closeAddModal();
        loadInfoEntities();
    } else alert("Xatolik!");
}

function openInfoModal(title, infoData = {}, onSave) {
    let modal = document.getElementById("infoModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "infoModal";
        modal.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.6);
            display: flex; justify-content: center; align-items: center;
            z-index: 9999; opacity: 0; transition: opacity 0.3s ease;
        `;
        modal.innerHTML = `
            <div style="
                background: #fff;
                padding: 30px 35px;
                border-radius: 20px;
                max-width: 550px;
                width: 90%;
                text-align: left;
                box-shadow: 0 15px 35px rgba(0,0,0,0.25);
                transform: translateY(-50px);
                transition: transform 0.3s ease;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            ">
                <h3 id="modalTitle" style="
                    margin-bottom: 25px;
                    font-size: 22px;
                    color: #333;
                    font-weight: 600;
                "></h3>
                
                <h4 style="margin-bottom:5px; color:#555;">O'zbekcha</h4>
                <label style="font-weight:500; color:#666;">Soliq turi</label>
                <input id="modal_uz_typeOfTax" style="
                    width: 100%; margin-bottom:12px;
                    padding: 8px 12px; border-radius: 8px; border: 1px solid #ccc;
                    font-size: 15px;
                ">
                <label style="font-weight:500; color:#666;">Batafsil ma’lumot</label>
                <textarea id="modal_uz_fullInfo" style="
                    width:100%; margin-bottom:18px;
                    padding: 8px 12px; border-radius: 8px; border: 1px solid #ccc;
                    font-size: 15px; min-height: 70px;
                "></textarea>

                <h4 style="margin-bottom:5px; color:#555;">Русский</h4>
                <label style="font-weight:500; color:#666;">Тип налога</label>
                <input id="modal_ru_typeOfTax" style="
                    width: 100%; margin-bottom:12px;
                    padding: 8px 12px; border-radius: 8px; border: 1px solid #ccc;
                    font-size: 15px;
                ">
                <label style="font-weight:500; color:#666;">Подробная информация</label>
                <textarea id="modal_ru_fullInfo" style="
                    width:100%; margin-bottom:20px;
                    padding: 8px 12px; border-radius: 8px; border: 1px solid #ccc;
                    font-size: 15px; min-height: 70px;
                "></textarea>

                <div style="text-align:right;">
                    <button id="modalSaveBtn" style="
                        margin-right: 10px;
                        padding: 10px 22px;
                        border: none;
                        border-radius: 10px;
                        background: linear-gradient(135deg, #4CAF50, #66BB6A);
                        color: #fff;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: 500;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.opacity=0.85;" onmouseout="this.style.opacity=1;">
                        Saqlash
                    </button>
                    <button id="modalCancelBtn" style="
                        padding: 10px 22px;
                        border: none;
                        border-radius: 10px;
                        background: linear-gradient(135deg, #F44336, #E57373);
                        color: #fff;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: 500;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.opacity=0.85;" onmouseout="this.style.opacity=1;">
                        Bekor qilish
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const container = modal.querySelector("div");
        modal.querySelector("#modalCancelBtn").onclick = () => {
            container.style.transform = "translateY(-50px)";
            modal.style.opacity = 0;
            setTimeout(() => modal.style.display = "none", 300);
        };
    }

    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modal_uz_typeOfTax").value = infoData?.uz?.typeOfTax || "";
    document.getElementById("modal_uz_fullInfo").value = infoData?.uz?.fullInfo || "";
    document.getElementById("modal_ru_typeOfTax").value = infoData?.ru?.typeOfTax || "";
    document.getElementById("modal_ru_fullInfo").value = infoData?.ru?.fullInfo || "";

    const saveBtn = modal.querySelector("#modalSaveBtn");
    saveBtn.onclick = () => onSave({
        uz: {
            typeOfTax: document.getElementById("modal_uz_typeOfTax").value,
            fullInfo: document.getElementById("modal_uz_fullInfo").value
        },
        ru: {
            typeOfTax: document.getElementById("modal_ru_typeOfTax").value,
            fullInfo: document.getElementById("modal_ru_fullInfo").value
        }
    });

    modal.style.display = "flex";
    setTimeout(() => {
        modal.style.opacity = 1;
        modal.querySelector("div").style.transform = "translateY(0)";
    }, 10);
}


async function editInfo(id) {
    const data = await api(`/bot/info-entity/${id}`);
    const r = data?.result;
    if (!r) return alertModal("Ma’lumot topilmadi!");

    openInfoModal("Soliq Ma’lumotini Tahrirlash", r, async (body) => {
        const res = await api(`/bot/info_entity-update/${id}`, "PUT", body);
        if (res?.result) {
            alertModal("O‘zgartirildi!");
            document.getElementById("infoModal").style.display = "none";
            loadInfoEntities();
        } else alertModal("Xatolik!");
    });
}

function alertModal(message) {
    let modal = document.getElementById("alertModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "alertModal";
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center;
            z-index: 9999; opacity: 0; transition: opacity 0.3s ease;
        `;
        modal.innerHTML = `
            <div style="
                background: #fff; padding: 25px 30px; border-radius: 15px; 
                max-width: 400px; width: 90%; text-align: center;
                box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                transform: translateY(-50px);
                transition: transform 0.3s ease;
            ">
                <p id="alertMessage" style="margin-bottom: 25px; font-size: 18px; color: #333; font-weight: 500;"></p>
                <button id="alertOk" style="
                    padding: 10px 25px; border: none; border-radius: 8px;
                    background: linear-gradient(45deg, #2196F3, #64B5F6); color: #fff;
                    cursor: pointer; font-size: 16px; transition: 0.3s;
                ">OK</button>
            </div>
        `;
        document.body.appendChild(modal);
        const container = modal.querySelector("div");
        modal.querySelector("#alertOk").onclick = () => {
            container.style.transform = "translateY(-50px)";
            modal.style.opacity = 0;
            setTimeout(() => modal.style.display = "none", 300);
        };
    }

    modal.querySelector("#alertMessage").innerText = message;
    modal.style.display = "flex";
    setTimeout(() => {
        modal.style.opacity = 1;
        modal.querySelector("div").style.transform = "translateY(0)";
    }, 10);
}

async function saveEditedInfo(id) {
    const body = {
        uz: {
            id: id,
            typeOfTax: document.getElementById("edit_uz_typeOfTax").value,
            fullInfo: document.getElementById("edit_uz_fullInfo").value
        },
        ru: {
            id: id,
            typeOfTax: document.getElementById("edit_ru_typeOfTax").value || "",
            fullInfo: document.getElementById("edit_ru_fullInfo").value || ""
        }
    };

    const res = await api(`/bot/info_entity-update/${id}`, "PUT", body);

    if (res?.result) {
        alert("O‘zgartirildi!");
        closeAddModal();
        loadInfoEntities();
    } else alert("Xatolik!");
}

async function deleteInfo(id) {
    if (!confirm("Rostdan o‘chirmoqchimisiz?")) return;

    const res = await api(`/bot/info-entity-delete/${id}`, "DELETE");

    if (res?.result) {
        alert("O‘chirildi!");
        loadInfoEntities();
    } else alert("Xatolik!");
}

function closeAddModal() {
    document.getElementById("addTaxModal").style.display = "none";
}
async function deleteInfo(id) {
    confirmModal("Rostdan o‘chirmoqchimisiz?", async () => {
        const res = await api(`/bot/info-entity-delete/${id}`, "DELETE");
        
        if (res?.result) {
            alertModal("Muvaffaqiyatli o‘chirildi!");
            loadInfoEntities();
        } else {
            alertModal("Xatolik yuz berdi: " + (res?.error || "Noma’lum xato"));
        }
    });
}
function confirmModal(message, onConfirm) {
    let modal = document.getElementById("confirmModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "confirmModal";
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center;
            z-index: 9999; opacity: 0; transition: opacity 0.3s ease;
        `;
        modal.innerHTML = `
            <div style="
                background: #fff; padding: 25px 30px; border-radius: 15px; 
                max-width: 400px; width: 90%; text-align: center;
                box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                transform: translateY(-50px);
                transition: transform 0.3s ease;
            ">
                <p id="confirmMessage" style="margin-bottom: 25px; font-size: 18px; color: #333; font-weight: 500;"></p>
                <button id="confirmYes" style="
                    margin-right: 10px; padding: 10px 20px; border: none; border-radius: 8px;
                    background: linear-gradient(45deg, #4CAF50, #66BB6A); color: #fff;
                    cursor: pointer; font-size: 16px;
                ">Ha</button>
                <button id="confirmNo" style="
                    padding: 10px 20px; border: none; border-radius: 8px;
                    background: linear-gradient(45deg, #F44336, #E57373); color: #fff;
                    cursor: pointer; font-size: 16px;
                ">Yo‘q</button>
            </div>
        `;
        document.body.appendChild(modal);

        const container = modal.querySelector("div");
        modal.querySelector("#confirmNo").onclick = () => {
            container.style.transform = "translateY(-50px)";
            modal.style.opacity = 0;
            setTimeout(() => modal.style.display = "none", 300);
        };
    }

    modal.querySelector("#confirmMessage").innerText = message;
    modal.style.display = "flex";
    setTimeout(() => {
        modal.style.opacity = 1;
        modal.querySelector("div").style.transform = "translateY(0)";
    }, 10);

    modal.querySelector("#confirmYes").onclick = () => {
        modal.querySelector("div").style.transform = "translateY(-50px)";
        modal.style.opacity = 0;
        setTimeout(() => modal.style.display = "none", 300);
        if (onConfirm) onConfirm();
    };
}


// ===============================
// TAX TYPES
// ===============================
async function loadTaxes() {
    document.getElementById("headerTitle").innerText = "Soliq Turlari";

    const data = await api("/bot/get-taxes-choose");
    const list = data?.result || [];

    let html = `<div class="taxTypeList">`;

    list.forEach(t => {
        html += `
            <div class="taxTypeItem">
                ${t}
            </div>
        `;
    });

    html += `</div>`;

    document.getElementById("content").innerHTML = html;
}

function toggleSidebar() {
    document.querySelector(".sidebar").classList.toggle("show");
}
