(function () {

  /* ============================= */
  /* SEARCH FEATURE */
  /* ============================= */

  function searchFeature() {
    var input = document.getElementById("searchInput");
    if (!input) return;

    var cards = document.querySelectorAll("[data-keywords]");

    input.addEventListener("input", function () {
      var q = (input.value || "").trim().toLowerCase();
      for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var kw = (card.getAttribute("data-keywords") || "").toLowerCase();
        var text = (card.textContent || "").toLowerCase();
        var show = !q || kw.indexOf(q) !== -1 || text.indexOf(q) !== -1;
        card.style.display = show ? "" : "none";
      }
    });
  }

  /* ============================= */
  /* BACK TO TOP */
  /* ============================= */

  function scrollToTopFeature() {
    const toTop = document.getElementById("toTop");
    if (!toTop) return;

    window.addEventListener("scroll", function () {
      toTop.style.display = window.scrollY > 300 ? "block" : "none";
    });

    toTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* ============================= */
  /* DARK MODE FEATURE             */
  /* ============================= */

  function applyDarkMode(enabled) {
    if (enabled === true) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    var darkBtn = document.getElementById("darkToggle");
    var lightBtn = document.getElementById("lightToggle");

    if (darkBtn) {
      darkBtn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
      darkBtn.textContent = 'Dark Mode';
    }

    if (lightBtn) {
      lightBtn.setAttribute('aria-pressed', enabled ? 'false' : 'true');
      lightBtn.textContent = 'Light Mode';
    }
  }

  function initDarkMode() {

    var storedValue = localStorage.getItem("darkMode");
    var enabled = false;

    if (storedValue === "on") {
      enabled = true;
    } else {
      enabled = false;
    }

    applyDarkMode(enabled);

    var darkBtn = document.getElementById("darkToggle");
    var lightBtn = document.getElementById("lightToggle");

    if (darkBtn) {
      darkBtn.addEventListener("click", function () {
        localStorage.setItem("darkMode", "on");
        applyDarkMode(true);
      });
    }

    if (lightBtn) {
      lightBtn.addEventListener("click", function () {
        localStorage.setItem("darkMode", "off");
        applyDarkMode(false);
      });
    }

    /* Sync across iframes/windows */
    window.addEventListener("storage", function (event) {

      if (event.key === "darkMode") {

        if (event.newValue === "on") {
          applyDarkMode(true);
        } else {
          applyDarkMode(false);
        }

      }

    });
  }


  document.addEventListener("DOMContentLoaded", function () {
    searchFeature();
    scrollToTopFeature();
    initDarkMode();
  });

})();
