// Load date
const dateEl = document.getElementById("date");
if (dateEl) {
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  dateEl.textContent = today.toLocaleDateString("en-US", options);
}

//  Greeting load from Local storage
console.log("entry");
const profileDb = JSON.parse(localStorage.getItem("profileDb"));
console.log("entry 1");
if (profileDb) {
  console.log("entry if ");
  const greeting = document.getElementById("greeting");
  console.log("entry if selected");
  greeting.textContent =
    "Welcome " + profileDb.firstName + " " + profileDb.lastName + ".";
  console.log("entry - Exit");
}

// Content Loader
const contentEl = document.getElementById("content");
const links = document.querySelectorAll(".sidebar a");

// async function loadPage(page) {
//     try {
//         const res = await fetch(`pages/${page}.html`);
//         const html = await res.text();
//         contentEl.innerHTML = html;
//         if (page === "dashboard") {
//             const { initDashboard } = await import("./javaScript/dashboard.js");
//             initDashboard();
//         }
//         if (page === "health") {
//             const { initHealthTabs } = await import("./javaScript/health.js");
//             initHealthTabs();
//         } else if (page === "habits") {
//             const { initHabitTracker } = await import("./javaScript/habits.js");
//             initHabitTracker();
//         } else if (page === "progress") {
//             const { initProgress } = await import("./javaScript/progress.js");
//             initProgress();
//         }
//         else if (page === "profile") {
//             const { initProfile } = await import("./javaScript/profile.js");
//             initProfile();
//         }
//         else if (page === "settings") {
//             const { initSetting } = await import("./javaScript/setting.js");
//             initSetting();
//         }

//     } catch (err) {
//         contentEl.innerHTML = "<p>Error loading page.</p>";
//     }
// }

async function loadPage(page) {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("active"); // Show loader

  try {
    const res = await fetch(`pages/${page}.html`);
    const html = await res.text();

    // Parse fetched HTML so we can fix relative <link> hrefs
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Resolve and move stylesheet links into document.head
    const pageBase = new URL(`pages/${page}.html`, location.href);
    doc.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      const rawHref = link.getAttribute("href");
      if (!rawHref) return;
      const resolved = new URL(rawHref, pageBase).href;
      // avoid duplicating same stylesheet
      if (!document.head.querySelector(`link[href="${resolved}"]`)) {
        const newLink = document.createElement("link");
        newLink.rel = "stylesheet";
        newLink.href = resolved;
        document.head.appendChild(newLink);
      }
    });

    // Move any <style> blocks too
    doc.querySelectorAll("style").forEach((style) => {
      // optional: dedupe by textContent check if needed
      document.head.appendChild(style.cloneNode(true));
    });

    // Inject the page content (body innerHTML of fetched page)
    contentEl.innerHTML = doc.body.innerHTML;

    // Initialize page scripts
    if (page === "dashboard") {
      const { initDashboard } = await import("./javaScript/dashboard.js");
      initDashboard();
    } else if (page === "health") {
      const { initHealthTabs } = await import("./javaScript/health.js");
      initHealthTabs();
    } else if (page === "habits") {
      const { initHabitTracker } = await import("./javaScript/habits.js");
      initHabitTracker();
    } else if (page === "progress") {
      const { initProgress } = await import("./javaScript/progress.js");
      initProgress();
    } else if (page === "profile") {
      const { initProfile } = await import("./javaScript/profile.js");
      initProfile();
    } else if (page === "settings") {
      const { initSetting } = await import("./javaScript/setting.js");
      initSetting();
    }
  } catch (err) {
    contentEl.innerHTML = "<p>Error loading page.</p>";
    console.error(err);
  } finally {
    if (loader) loader.classList.remove("active"); // Hide loader
  }
}

loadPage("dashboard");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.getAttribute("data-page");

    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    loadPage(page);
  });
});

const themeToggleBtn = document.getElementById("theme-toggle");

// Load theme from localStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggleBtn.textContent = "Light Mode";
}

// Toggle theme
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggleBtn.textContent = "Light Mode"; // show sun for light mode
  } else {
    localStorage.setItem("theme", "light");
    themeToggleBtn.textContent = "Dark Mode"; // show moon for dark mode
  }
});
