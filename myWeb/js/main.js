/* =========================
   1. HERO GLASS LENS
========================= */

const hero = document.querySelector(".hero");
const heroImage = document.querySelector(".hero__image");
const lens = document.querySelector(".hero__lens");
const lensImage = document.querySelector(".hero__lens-image");

const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

let lensFrame = null;
let pointerX = 0;
let pointerY = 0;

function updateLensImage() {
    if (!hero || !heroImage || !lensImage) return;

    const rect = hero.getBoundingClientRect();

    // 렌즈 안에 원본 이미지와 같은 크기의 이미지를 배치
    lensImage.style.width = `${rect.width}px`;
    lensImage.style.height = `${rect.height}px`;
    lensImage.style.left = `${-pointerX}px`;
    lensImage.style.top = `${-pointerY}px`;
}

function moveLens(event) {
    if (!hero || !lens || !canHover.matches) return;

    const rect = hero.getBoundingClientRect();

    pointerX = event.clientX - rect.left;
    pointerY = event.clientY - rect.top;

    if (lensFrame !== null) {
        cancelAnimationFrame(lensFrame);
    }

    lensFrame = requestAnimationFrame(() => {
        lens.style.left = `${pointerX}px`;
        lens.style.top = `${pointerY}px`;

        updateLensImage();

        lensFrame = null;
    });

    lens.classList.add("is-visible");
}

function hideLens() {
    if (!lens) return;

    lens.classList.remove("is-visible");
}

if (hero && lens && lensImage && canHover.matches) {
    hero.addEventListener("pointerenter", moveLens);
    hero.addEventListener("pointermove", moveLens);
    hero.addEventListener("pointerleave", hideLens);

    window.addEventListener("resize", () => {
        if (lens.classList.contains("is-visible")) {
            updateLensImage();
        }
    });
}

// 이미지 로딩 완료 시 렌즈 이미지 크기 동기화
if (heroImage) {
    heroImage.addEventListener("load", updateLensImage);
}

/* =========================
   2. RIGHT POPUP MENU
========================= */

const menuToggle = document.querySelector(".side-nav__toggle");
const sideMenu = document.querySelector(".side-menu");
const menuClose = document.querySelector(".side-menu__close");
const menuLinks = document.querySelectorAll(".side-menu a");

function openMenu() {
    if (!menuToggle || !sideMenu) return;

    sideMenu.hidden = false;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "메뉴 닫기");
}

function closeMenu() {
    if (!menuToggle || !sideMenu) return;

    sideMenu.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "메뉴 열기");
}

menuToggle?.addEventListener("click", () => {
    const isExpanded =
        menuToggle.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
        closeMenu();
    } else {
        openMenu();
    }
});

menuClose?.addEventListener("click", closeMenu);

menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

// 메뉴 외부 클릭 시 닫기
document.addEventListener("pointerdown", (event) => {
    const sideNav = document.querySelector(".side-nav");

    if (
        sideNav &&
        !sideNav.contains(event.target) &&
        menuToggle?.getAttribute("aria-expanded") === "true"
    ) {
        closeMenu();
    }
});

// ESC 키로 메뉴 닫기
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

/* =========================
   3. PROJECT DATA
========================= */

const projects = [
    {
        id: 1,
        title: "PROJECT ONE",
        description: "사용자 경험을 고려한 웹사이트 리디자인",
        tags: ["HTML", "CSS", "JavaScript"],
        image: "./images/projects/project-01.jpg",
        link: "./project/project-01.html",
        alt: "첫 번째 프로젝트 대표 이미지",
    },
    {
        id: 2,
        title: "PROJECT TWO",
        description: "브랜드 아이덴티티를 담은 반응형 웹",
        tags: ["Responsive", "UI/UX"],
        image: "./images/projects/project-02.jpg",
        link: "./project/project-02.html",
        alt: "두 번째 프로젝트 대표 이미지",
    },
    {
        id: 3,
        title: "PROJECT THREE",
        description: "JavaScript를 활용한 인터랙티브 페이지",
        tags: ["JavaScript", "Interaction"],
        image: "./images/projects/project-03.jpg",
        link: "./project/project-03.html",
        alt: "세 번째 프로젝트 대표 이미지",
    },
    {
        id: 4,
        title: "PROJECT FOUR",
        description: "정보 구조와 시각적 위계를 개선한 웹",
        tags: ["HTML", "Accessibility"],
        image: "./images/projects/project-04.jpg",
        link: "./project/project-04.html",
        alt: "네 번째 프로젝트 대표 이미지",
    },
    {
        id: 5,
        title: "PROJECT FIVE",
        description: "새로운 인터페이스를 탐구한 개인 작업",
        tags: ["CSS", "UI Design"],
        image: "./images/projects/project-05.jpg",
        link: "./project/project-05.html",
        alt: "다섯 번째 프로젝트 대표 이미지",
    },
    {
        id: 6,
        title: "PROJECT SIX",
        description: "데이터를 활용한 콘텐츠 탐색 경험",
        tags: ["JavaScript", "Web"],
        image: "./images/projects/project-06.jpg",
        link: "./project/project-06.html",
        alt: "여섯 번째 프로젝트 대표 이미지",
    },
];

const projectGrid = document.querySelector("#project-grid");
const moreButton = document.querySelector("#more-button");

const INITIAL_PROJECT_COUNT = 4;
let isExpanded = false;

function createProjectCard(project) {
    const article = document.createElement("article");
    article.className = "project-card";

    const image = document.createElement("img");
    image.className = "project-card__image";
    image.src = project.image;
    image.alt = project.alt;
    image.loading = "lazy";

    const overlay = document.createElement("div");
    overlay.className = "project-card__overlay";

    const title = document.createElement("h3");
    title.className = "project-card__title";
    title.textContent = project.title;

    const description = document.createElement("p");
    description.className = "project-card__description";
    description.textContent = project.description;

    const tags = document.createElement("div");
    tags.className = "project-card__tags";

    project.tags.forEach((tagText) => {
        const tag = document.createElement("span");
        tag.className = "project-card__tag";
        tag.textContent = tagText;
        tags.appendChild(tag);
    });

    const link = document.createElement("a");
    link.className = "project-card__link";
    link.href = project.link;
    link.setAttribute(
        "aria-label",
        `${project.title} 상세 프로젝트 보기`
    );
    link.innerHTML = '<span aria-hidden="true">↗</span>';

    overlay.append(title, description, tags);
    article.append(image, overlay, link);

    return article;
}

function renderProjects() {
    if (!projectGrid || !moreButton) return;

    projectGrid.replaceChildren();

    projects.forEach((project, index) => {
        const card = createProjectCard(project);

        if (!isExpanded && index >= INITIAL_PROJECT_COUNT) {
            card.hidden = true;
        }

        projectGrid.appendChild(card);
    });

    // 펼칠 프로젝트가 없으면 버튼을 표시하지 않음
    moreButton.hidden = projects.length <= INITIAL_PROJECT_COUNT;

    moreButton.textContent = isExpanded ? "LESS" : "MORE";

    moreButton.setAttribute(
        "aria-expanded",
        String(isExpanded)
    );
}

moreButton?.addEventListener("click", () => {
    isExpanded = !isExpanded;
    renderProjects();

    if (!isExpanded) {
        document.querySelector("#project")?.scrollIntoView({
            behavior: reduceMotion.matches ? "auto" : "smooth",
            block: "start",
        });
    }
});

renderProjects();

/* =========================
   4. ACTIVE SECTION MENU
========================= */

const sections = document.querySelectorAll(
    "#about, #project, #skill, #contact"
);

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            menuLinks.forEach((link) => {
                const isCurrent =
                    link.getAttribute("href") === `#${entry.target.id}`;

                if (isCurrent) {
                    link.classList.add("is-active");
                    link.setAttribute("aria-current", "location");
                } else {
                    link.classList.remove("is-active");
                    link.removeAttribute("aria-current");
                }
            });
        });
    },
    {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0,
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});