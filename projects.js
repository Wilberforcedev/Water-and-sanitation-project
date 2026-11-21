const cards = [...document.querySelectorAll("[data-category]")];
const search = document.querySelector("#project-search");
const filters = [...document.querySelectorAll("[data-filter]")];
const results = document.querySelector("#project-results");
const emptyState = document.querySelector("#project-empty");

if (cards.length && search && results && emptyState) {
  let activeFilter = "all";

  const updateProjects = () => {
    const term = search.value.trim().toLocaleLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
      const matchesSearch = card.textContent.toLocaleLowerCase().includes(term);
      const show = matchesFilter && matchesSearch;
      card.hidden = !show;
      if (show) visible += 1;
    });

    results.textContent = visible === 1 ? "Showing 1 focus area." : `Showing ${visible} focus areas.`;
    emptyState.hidden = visible !== 0;
  };

  search.addEventListener("input", updateProjects);

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filters.forEach((filter) => {
        filter.setAttribute("aria-pressed", String(filter === button));
      });
      updateProjects();
    });
  });
}
