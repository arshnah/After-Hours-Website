// Jugaad docs — command filter + mobile category nav

(function () {
  function fuzzyMatch(query, target) {
    if (!query) return true;
    query = query.toLowerCase();
    target = target.toLowerCase();
    if (target.includes(query)) return true;

    let qi = 0;
    for (let ti = 0; ti < target.length && qi < query.length; ti++) {
      if (target[ti] === query[qi]) qi++;
    }
    return qi === query.length;
  }

  const filterInput = document.getElementById("command-filter");
  const noResults = document.getElementById("no-results");

  if (filterInput) {
    filterInput.addEventListener("input", function () {
      const query = filterInput.value.trim();
      const categories = document.querySelectorAll(".command-category");
      let anyVisible = false;

      categories.forEach(function (category) {
        const cards = category.querySelectorAll(".command-card");
        let visibleInCategory = 0;

        cards.forEach(function (card) {
          const name = card.getAttribute("data-name") || "";
          const match = fuzzyMatch(query, name);
          card.style.display = match ? "" : "none";
          if (match) visibleInCategory++;
        });

        category.style.display = visibleInCategory > 0 ? "" : "none";
        if (visibleInCategory > 0) anyVisible = true;
      });

      if (noResults) {
        noResults.style.display = anyVisible ? "none" : "block";
      }
    });
  }

  const navToggle = document.getElementById("mobile-nav-toggle");
  const sidebar = document.getElementById("sidebar");

  if (navToggle && sidebar) {
    navToggle.addEventListener("click", function () {
      sidebar.classList.toggle("open");
    });

    sidebar.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        sidebar.classList.remove("open");
      });
    });
  }
})();
