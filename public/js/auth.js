// public/js/auth.js

async function postJson(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json().catch(() => ({}));
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const regForm = document.getElementById("regForm");
  const msg = document.getElementById("msg");

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(loginForm);
      const body = {
        username: fd.get("username"),
        password: fd.get("password")
      };

      const res = await postJson("/auth/login", body);

      if (res.success) {
        window.location.href = "/dashboard.html";
      } else {
        msg.textContent = res.error || "Login failed!";
      }
    });
  }

  // REGISTER
  if (regForm) {
    regForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fd = new FormData(regForm);
      const body = {
        firstname: fd.get("firstname"),
        lastname: fd.get("lastname"),
        username: fd.get("username"),
        password: fd.get("password")
      };

      const res = await postJson("/auth/register", body);

      if (!res.error) {
        msg.textContent = "Ro'yxatdan o'tildi! Endi login qiling.";
      } else {
        msg.textContent = res.error || "Register error!";
      }
    });
  }
});
