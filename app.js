(function () {
  
  /* SEARCH FEATURE */

  function searchFeature() {
    // Get the search input field
    var input = document.getElementById("searchInput");
    
    // If search bar does not exist on this page, stop the feature
    if (!input) return;

    // Select all elements that have searchable keywords
    var cards = document.querySelectorAll("[data-keywords]");

    // Listen for typing inside the search input
    input.addEventListener("input", function () {
      
      // Get user query, remove extra spaces, and convert to lowercase for consistent comparison
      var q = (input.value || "").trim().toLowerCase();

      // Loop through every searchable card
      for (var i = 0; i < cards.length; i++) {
        var card = cards[i];

        // Get custom keywords and visible text from each card
        var kw = (card.getAttribute("data-keywords") || "").toLowerCase();
        var text = (card.textContent || "").toLowerCase();

        // to decide whether the card should be shown
        var show = !q || kw.indexOf(q) !== -1 || text.indexOf(q) !== -1;

        // Hide or show the card based on match result
        card.style.display = show ? "" : "none";
      }
    });
  }


  /* BACK TO TOP */
  function scrollToTopFeature() {

    const toTop = document.getElementById("toTop");

    if (!toTop) return;

    // for when user scrolls the page
    window.addEventListener("scroll", function () {

      // Shows the button only after scrolling down 300px
      toTop.style.display = window.scrollY > 300 ? "block" : "none";
    });

    // When button is clickedm, smoothly scroll the page back to the top
    toTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }


  /* DARK MODE FEATURE  */
  function applyDarkMode(enabled) {

    // If enabled, add dark-mode class to body
    if (enabled === true) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    // toggle buttons
    var darkBtn = document.getElementById("darkToggle");
    var lightBtn = document.getElementById("lightToggle");

    // to update both dark and light mode buttons 
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

    // If saved value is "on", enable dark mode
    if (storedValue === "on") {
      enabled = true;
    } else {
      enabled = false;
    }

    // Apply theme immediately when page loads
    applyDarkMode(enabled);

    var darkBtn = document.getElementById("darkToggle");
    var lightBtn = document.getElementById("lightToggle");

    // When dark mode button is clicked
    if (darkBtn) {
      darkBtn.addEventListener("click", function () {
        
        localStorage.setItem("darkMode", "on");

        // Apply dark mode instantly
        applyDarkMode(true);
      });
    }

    // When light mode button is clicked
    if (lightBtn) {
      lightBtn.addEventListener("click", function () {

        // Save preference in localStorage
        localStorage.setItem("darkMode", "off");

        // Apply light mode instantly
        applyDarkMode(false);
      });
    }

    // If dark mode is changed in another tab or iframe, automatically update this page to match
    window.addEventListener("storage", function (event) {

      // Only react if the changed value is darkMode
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
