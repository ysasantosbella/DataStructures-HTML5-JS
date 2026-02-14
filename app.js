(function () {
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
  
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  const toTop = document.getElementById("toTop");

  if (toTop) {

    // Show button when scrolling down
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        toTop.style.display = "block";
      } else {
        toTop.style.display = "none";
      }
    });

    // Attach click event
    toTop.addEventListener("click", scrollToTop);
  }

  document.addEventListener("DOMContentLoaded", function () {
    searchFeature();
    scrollToTop();
  });
})();


// https://www.w3docs.com/snippets/javascript/how-to-scroll-to-the-top-of-the-page-using-javascript.html
