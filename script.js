// script.js

// NEW: Import the portfolio data
import { portfolioData } from "./data.js";

// --- 1. DEFINE ALL FUNCTIONS FIRST ---

// (Global-scope variables for scroll state)
let isSkillsPaused = false;
let skillsScrollInterval = null;
let halfSkillScrollWidth = 0;

let isProjectsPaused = false;
let projectsScrollInterval = null;
let halfProjectScrollWidth = 0;

/**
 * Starts the auto-scrolling for the mobile skills container.
 */
function startSkillsScroll() {
  const container = document.getElementById("skills-mobile-container");
  if (!container || skillsScrollInterval) return;

  container.addEventListener("mouseenter", () => (isSkillsPaused = true));
  container.addEventListener("mouseleave", () => (isSkillsPaused = false));

  skillsScrollInterval = setInterval(() => {
    if (halfSkillScrollWidth === 0) {
      halfSkillScrollWidth = container.scrollWidth / 2;
    }
    if (!isSkillsPaused) {
      if (
        halfSkillScrollWidth > 0 &&
        container.scrollLeft >= halfSkillScrollWidth
      ) {
        container.scrollLeft = 0;
      } else if (halfSkillScrollWidth > 0) {
        container.scrollLeft += 1;
      }
    }
  }, 30);
}

/**
 * Starts the auto-scrolling for the mobile projects container.
 */
function startProjectsScroll() {
  const container = document.getElementById("projects-mobile-container");
  if (!container || projectsScrollInterval) return;

  container.addEventListener("mouseenter", () => (isProjectsPaused = true));
  container.addEventListener("mouseleave", () => (isProjectsPaused = false));

  projectsScrollInterval = setInterval(() => {
    if (halfProjectScrollWidth === 0) {
      halfProjectScrollWidth = container.scrollWidth / 2;
    }
    if (!isProjectsPaused) {
      if (
        halfProjectScrollWidth > 0 &&
        container.scrollLeft >= halfProjectScrollWidth
      ) {
        container.scrollLeft = 0;
      } else if (halfProjectScrollWidth > 0) {
        container.scrollLeft += 1;
      }
    }
  }, 40);
}

/**
 * Populates all text elements from the userData object.
 * @param {object} userData - The user data object from data.js
 */
function populateText(userData) {
  const textElements = {
    "#nav-name": userData.shortName,
    "#hero-name": `Hi ,<br />I'm ${userData.name}`,
    "#hero-title": userData.title,
    "#contact-email": userData.email,
  };
  for (const selector in textElements) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = textElements[selector];
  }
}

/**
 * Populates all social/external links.
 * @param {object} links - The links object from data.js
 */
function populateLinks(links) {
  document.querySelectorAll("[data-platform]").forEach((link) => {
    const platform = link.dataset.platform;
    if (links[platform] && links[platform] !== "#") {
      link.href = links[platform];
    }
  });
}

/**
 * Populates all images and file links.
 * @param {object} assets - The assets object from data.js
 */
function populateAssets(assets) {
  const assetElements = {
    "#hero-img": assets.hero,
    "#about-img": assets.about,
    "#resume-img": assets.resumeImg,
    "#resume-link": assets.resumePdf,
  };
  for (const selector in assetElements) {
    const el = document.querySelector(selector);
    if (el) {
      if (el.tagName === "A") {
        el.href = assetElements[selector];
        if (assets.resumeDownloadName) el.download = assets.resumeDownloadName;
      } else {
        el.src = assetElements[selector];
      }
    }
  }
}

/**
 * Builds the HTML for the skills section.
 * @param {Array} skillsDetails - The skills array from data.js
 */
function buildSkills(skillsDetails) {
  const skillsDesktopContainer = document.getElementById(
    "skills-desktop-container"
  );
  const skillsMobileContainer = document.getElementById(
    "skills-mobile-container"
  );
  const skillsDesktopGroup = document.getElementById("skills-desktop-group");
  if (!skillsDesktopContainer || !skillsMobileContainer || !skillsDesktopGroup)
    return;

  let desktopSkillsHTML = "";
  let mobileSkillsHTML = "";

  skillsDetails.forEach((skill, index) => {
    const angle = index * 10 - 30;
    desktopSkillsHTML += `
            <div class="relative h-[160px]">
                <div class="absolute left-1/2 top-0 w-[120px] h-[150px] bg-white text-black font-bold border border-black rounded-md p-2 text-center transition-transform duration-500 hover:-translate-y-4"
                     style="transform: translateX(-50%) rotate(${angle}deg); transform-origin: 50% 100%;">
                    <img src="${skill.image}" alt="${skill.name}" class="w-full h-[100px] object-contain mb-2" />
                    <p class="text-sm font-sans">${skill.name}</p>
                </div>
            </div>
        `;

    mobileSkillsHTML += `
            <div class="flex-none w-[140px] h-[160px] bg-backgroundLight rounded-lg p-3 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/30 stagger-child shadow-xl">
                <div class="bg-white rounded-md h-[100px] flex items-center justify-center p-2">
                    <img src="${skill.image}" alt="${skill.name}" class="max-h-full max-w-full object-contain" />
                </div>
                <p class="text-sm font-sans text-text mt-3 font-medium">${skill.name}</p>
            </div>
        `;
  });

  skillsDesktopContainer.innerHTML = desktopSkillsHTML;
  skillsMobileContainer.innerHTML = mobileSkillsHTML + mobileSkillsHTML; // Duplicate for seamless scroll

  const allSkillCards = skillsMobileContainer.children;
  const halfSkillLength = allSkillCards.length / 2;
  for (let i = halfSkillLength; i < allSkillCards.length; i++) {
    allSkillCards[i].setAttribute("aria-hidden", "true");
    allSkillCards[i].classList.remove("stagger-child");
  }

  // Desktop "fan" hover logic
  skillsDesktopGroup.addEventListener("mouseenter", () => {
    skillsDesktopContainer.style.gridTemplateColumns = `repeat(${skillsDetails.length}, 120px)`;
    skillsDesktopContainer.style.gap = "1rem";
  });
  skillsDesktopGroup.addEventListener("mouseleave", () => {
    skillsDesktopContainer.style.gridTemplateColumns = `repeat(${skillsDetails.length}, 0)`;
    skillsDesktopContainer.style.gap = "0";
  });
}

/**
 * Builds the HTML for the projects section.
 * @param {Array} projectDetails - The projects array from data.js
 */
function buildProjects(projectDetails) {
  const projectsDesktopGrid = document.getElementById("projects-desktop-grid");
  const projectsMobileContainer = document.getElementById(
    "projects-mobile-container"
  );
  if (!projectsDesktopGrid || !projectsMobileContainer) return;

  let projectsDesktopHTML = "";
  let projectsMobileHTML = "";

  projectDetails.forEach((project) => {
    const gitLink = project.gitLink || "#";
    const linkAttributes = project.gitLink
      ? `href="${gitLink}" target="_blank" rel="noopener noreferrer"`
      : 'href="#" onclick="return false;" style="cursor:not-allowed; opacity:0.6;"';
    const linkText = project.gitLink ? "Source Code" : "Code Private";

    projectsDesktopHTML += `
            <div class='relative bg-backgroundLight rounded-lg overflow-hidden shadow-lg stagger-child group 
                         transition-all duration-500 transform-style-preserve-3d 
                         md:hover:scale-105 md:hover:-rotate-y-3 md:hover:rotate-x-3'>
                <img src="${project.img}" alt="${project.name}" class='h-60 w-full object-cover transition-transform duration-500 md:group-hover:scale-110' />
                <div class='hidden md:flex absolute inset-0 flex-col justify-center items-center p-4 bg-black bg-opacity-70 text-text 
                            transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out'>
                    <h3 class="text-2xl font-bold mb-2 font-heading">${project.name}</h3>
                    <p class='text-center mb-4'>${project.description}</p>
                    <a ${linkAttributes} class='bg-primary rounded-md py-2 px-4 text-sm text-white font-medium transition-all duration-300 hover:bg-accent transform hover:scale-105'>
                        ${linkText}
                    </a>
                </div>
            </div>
        `;

    projectsMobileHTML += `
            <div class="flex-none w-[280px] bg-backgroundLight rounded-lg overflow-hidden shadow-xl stagger-child transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
                <img src="${project.img}" alt="${project.name}" class="w-full h-40 object-cover" />
                <div class="p-4 text-text">
                    <h3 class="text-xl font-bold mb-2 font-heading">${project.name}</h3>
                    <p class="text-sm text-textLight mb-4 h-20 overflow-y-auto">${project.description}</p>
                    <a ${linkAttributes} class="inline-block bg-primary rounded-md py-2 px-4 text-sm text-white font-medium transition-all duration-300 hover:bg-accent transform hover:scale-105">
                        ${linkText}
                    </a>
                </div>
            </div>
        `;
  });

  projectsDesktopGrid.innerHTML = projectsDesktopHTML;
  projectsMobileContainer.innerHTML = projectsMobileHTML + projectsMobileHTML; // Duplicate for seamless scroll

  const allProjectCards = projectsMobileContainer.children;
  const halfProjectLength = allProjectCards.length / 2;
  for (let i = halfProjectLength; i < allProjectCards.length; i++) {
    allProjectCards[i].setAttribute("aria-hidden", "true");
    allProjectCards[i].classList.remove("stagger-child");
  }
}

/**
 * Sets up the event listeners for the mobile menu.
 */
function setupMobileMenu() {
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  if (
    menuButton &&
    mobileMenu &&
    mobileLinks.length > 0 &&
    menuIcon &&
    closeIcon
  ) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("-translate-x-full");
      mobileMenu.classList.toggle("translate-x-0");
      menuIcon.classList.toggle("hidden");
      closeIcon.classList.toggle("hidden");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("-translate-x-full");
        mobileMenu.classList.remove("translate-x-0");
        menuIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
      });
    });
  }
}

/**
 * Sets up the Intersection Observer for fade-in animations.
 */
function setupScrollObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          if (entry.target.id === "skills") {
            startSkillsScroll();
          }
          if (entry.target.id === "project") {
            startProjectsScroll();
          }

          const children = entry.target.querySelectorAll(".stagger-child");
          children.forEach((child, index) => {
            child.style.transitionDelay = `${index * 100}ms`;
          });
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0.1,
    }
  );

  document
    .querySelectorAll(".fade-in-element")
    .forEach((el) => observer.observe(el));
}

/**
 * Initializes Lucide icons.
 */
function initIcons() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// --- 2. MAIN EXECUTION ---

/**
 * Main function to run the application.
 */
function main() {
  // NEW: Check the imported portfolioData
  if (!portfolioData) {
    console.error("Portfolio data not found.");
    return;
  }

  // NEW: Destructure from the imported object
  const { userData, links, assets, skillsDetails, projectDetails } =
    portfolioData;

  // Run all setup functions in order (no changes here)
  populateText(userData);
  populateLinks(links);
  populateAssets(assets);
  buildSkills(skillsDetails);
  buildProjects(projectDetails);
  setupMobileMenu();
  setupScrollObserver();
  initIcons(); // Run this last after all dynamic HTML is injected
}

// NEW: Export the main function as the default
export default main;
