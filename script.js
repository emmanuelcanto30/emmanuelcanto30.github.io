(function () {
  const STORAGE_KEY = "emmanuelAppsLanguage";

  function preferredLanguage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") return saved;
    return navigator.language && navigator.language.toLowerCase().startsWith("es")
      ? "es"
      : "en";
  }

  function setLanguage(language) {
    document.body.classList.remove("lang-es", "lang-en");
    document.body.classList.add(language === "en" ? "lang-en" : "lang-es");
    document.documentElement.lang = language === "en" ? "en" : "es";
    localStorage.setItem(STORAGE_KEY, language);

    document.querySelectorAll("[data-language-button]").forEach((button) => {
      const active = button.dataset.languageButton === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    document.querySelectorAll("[data-title-es][data-title-en]").forEach((element) => {
      document.title = language === "en"
        ? element.dataset.titleEn
        : element.dataset.titleEs;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setLanguage(preferredLanguage());

    document.querySelectorAll("[data-language-button]").forEach((button) => {
      button.addEventListener("click", function () {
        setLanguage(button.dataset.languageButton);
      });
    });
  });
})();
