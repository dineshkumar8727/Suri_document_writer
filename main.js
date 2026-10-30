// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
});

nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Light / dark theme toggle (initial theme is set by the inline script in <head>)
const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  themeColor.setAttribute("content", theme === "dark" ? "#0b1526" : "#0f2a4f");
}

applyTheme(root.getAttribute("data-theme") || "light");

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Enquiry form -> opens WhatsApp with a pre-filled message
const form = document.getElementById("enquiry");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  let text = `Hello Sir, I am ${data.get("name")}.\nI need help with: ${data.get("service")}.`;
  if (data.get("message").trim()) text += `\n${data.get("message").trim()}`;
  window.open(`https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
});

// Fade sections in as they scroll into view
const revealTargets = document.querySelectorAll(".card, .why li, .step, .checklist, .highlight");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}
