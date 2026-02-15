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

  /* ===== STACK SIMULATOR ===== */

  // Stack array
  let stack = [];

  // Get DOM elements for stack (if they exist on this page)
  const stackInput = document.getElementById("stackInput");
  const pushBtn = document.getElementById("pushBtn");
  const popBtn = document.getElementById("popBtn");
  const stackOutput = document.getElementById("stackOutput");
  const canvas = document.getElementById("stackCanvas");
  const ctx = canvas ? canvas.getContext("2d") : null;

  // Set text style for canvas
  if (ctx) {
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
  }

  // Draw stack on canvas
  function drawStack() {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const boxWidth = 200;
    const boxHeight = 40;
    const x = 50; // x-position of boxes

    for (let i = 0; i < stack.length; i++) {
      const y = canvas.height - (i + 1) * boxHeight;

      // Draw rectangle
      ctx.strokeRect(x, y, boxWidth, boxHeight);

      // Draw number inside rectangle
      ctx.fillText(stack[i], x + boxWidth / 2, y + boxHeight / 2);
    }
  }

  // Update stack text and redraw canvas
  function updateStack() {
    if (!stackOutput) return;

    if (stack.length === 0) {
      stackOutput.textContent = "Stack is empty.";
    } else {
      stackOutput.innerHTML =
        "Stack: " + stack.join(", ") + "<br>Size: " + stack.length;
    }

    drawStack();
  }

  // Push button event
  if (pushBtn) {
    pushBtn.addEventListener("click", () => {
      if (!stackInput) return;
      const value = stackInput.value;
      if (value === "") return alert("Enter a number to push!");

      stack.push(value);
      stackInput.value = "";
      updateStack();
    });
  }

  // Pop button event
  if (popBtn) {
    popBtn.addEventListener("click", () => {
      if (stack.length === 0) return alert("Stack is already empty!");

      stack.pop();
      updateStack();
    });
  }

  // Initial draw
  updateStack();

  /* ===== INIT FEATURES ON DOM LOAD ===== */
  document.addEventListener("DOMContentLoaded", function () {
    searchFeature();
    scrollToTopFeature();
    initDarkMode();
  });

})();
