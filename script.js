const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

toggle?.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => links.classList.remove("open"));
});

/* Scroll reveal */
const revealElements = document.querySelectorAll(".reveal, .reveal-item, .reveal-section");
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

revealElements.forEach(el => observer.observe(el));

/* Stagger experience/education cards */
document.querySelectorAll(".timeline .reveal-item, .edu-list .reveal-item").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 90, 270)}ms`;
});

/* Reading progress */
const progress = document.querySelector(".scroll-progress");
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

/* Very subtle hero movement; disabled for reduced motion */
const parallax = document.querySelector("[data-parallax]");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (parallax && !reduced) {
  window.addEventListener("scroll", () => {
    const y = Math.min(window.scrollY * 0.045, 18);
    parallax.style.transform = `translateY(${y}px)`;
  }, { passive: true });
}
