document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".header__inline-menu > ul > li");
  let activeMenuItem = null;

  const isMobile = () => window.innerWidth <= 767;

  menuItems.forEach((item) => {
    const detailsElement = item.querySelector("details");
    if (!detailsElement) return;

    const summary = detailsElement.querySelector("summary");

    if (!summary) return;

    // Hover behavior for desktop
    item.addEventListener("mouseenter", () => {
      if (isMobile()) return; // Skip hover on mobile

      if (activeMenuItem && activeMenuItem !== item) {
        const previousDetails = activeMenuItem.querySelector("details");
        if (previousDetails) previousDetails.removeAttribute("open");
      }

      detailsElement.setAttribute("open", true);
      activeMenuItem = item;
    });

    item.addEventListener("mouseleave", () => {
      if (isMobile()) return; // Skip on mobile

      setTimeout(() => {
        if (!item.matches(":hover")) {
          detailsElement.removeAttribute("open");
          if (activeMenuItem === item) activeMenuItem = null;
        }
      }, 300);
    });

    // Click behavior for mobile
    summary.addEventListener("click", (e) => {
      if (!isMobile()) return;

      e.preventDefault(); // Prevent default toggle behavior

      const isOpen = detailsElement.hasAttribute("open");

      // Close all other details
      document.querySelectorAll(".header__inline-menu details[open]").forEach((el) => {
        if (el !== detailsElement) el.removeAttribute("open");
      });

      // Toggle current one
      if (isOpen) {
        detailsElement.removeAttribute("open");
      } else {
        detailsElement.setAttribute("open", true);
      }
    });
  });
});
