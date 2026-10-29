/*
  EmailJS 設定：
  1. 到 https://www.emailjs.com/ 註冊並驗證你的寄件信箱
  2. 建立 Email Service、Email Template
  3. 把下面三個佔位文字替換成 EmailJS 控制台提供的值
*/
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

const form = document.getElementById("contact-form");

if (form) {
  const status = document.getElementById("form-status");
  const submitButton = document.getElementById("submit-button");

  const isConfigured = () =>
    ![EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID]
      .some(value => value.startsWith("YOUR_"));

  if (isConfigured() && window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    if (!isConfigured()) {
      status.textContent = "表單尚未完成 EmailJS 設定，請先填入 Public Key、Service ID 與 Template ID。";
      status.classList.add("error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "寄送中…";

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
      status.textContent = "表單已成功送出！請等待網站管理者回覆。";
      status.classList.add("success");
      form.reset();
    } catch (error) {
      console.error("EmailJS send error:", error);
      status.textContent = "寄送失敗，請稍後再試，或改用其他方式聯絡。";
      status.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "送出表單";
    }
  });
}
