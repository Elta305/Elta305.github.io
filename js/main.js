(function () {
  "use strict";

  /* ---------- theme: day / night ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var stored = localStorage.getItem("theme");
  var prefersNight = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var theme = stored || (prefersNight ? "night" : "day");
  root.setAttribute("data-theme", theme);

  toggle.addEventListener("click", function () {
    theme = theme === "night" ? "day" : "night";
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  });

  /* ---------- copy email pills ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-email]"), function (btn) {
    btn.addEventListener("click", function () {
      var email = btn.getAttribute("data-email");
      var reset = function () { btn.classList.remove("is-copied"); };
      var mark = function () {
        btn.classList.add("is-copied");
        window.clearTimeout(btn._t);
        btn._t = window.setTimeout(reset, 1600);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(mark).catch(function () {
          window.location.href = "mailto:" + email;
        });
      } else {
        window.location.href = "mailto:" + email;
      }
    });
  });

  /* ---------- Orion star labels ---------- */
  var label = document.getElementById("star-label");
  if (label) {
    Array.prototype.forEach.call(document.querySelectorAll("#orion .stars circle"), function (star) {
      var name = star.getAttribute("data-name");
      star.addEventListener("mouseenter", function () { label.textContent = name; });
      star.addEventListener("mouseleave", function () { label.textContent = " "; });
      star.addEventListener("focus", function () { label.textContent = name; });
      star.addEventListener("blur", function () { label.textContent = " "; });
    });
  }

  /* ---------- active nav link on scroll ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = "#" + entry.target.id;
          navLinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }
})();
