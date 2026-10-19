// Controlador principal del sitio: Navegación, Estado, Presentación de Diapositivas

const STORAGE_KEY = "ucab_cpp_junior_course_progress_v1";
const TITLES_STORAGE_KEY = "ucab_cpp_junior_course_seen_titles_v1";
let seenTitles = loadSeenTitles();

function loadSeenTitles() {
  try {
    const value = JSON.parse(localStorage.getItem(TITLES_STORAGE_KEY) || "[]");
    return new Set(Array.isArray(value) ? value.filter(key => typeof key === "string") : []);
  } catch {
    return new Set();
  }
}

function rememberTitle(key) {
  seenTitles.add(key);
  try {
    localStorage.setItem(TITLES_STORAGE_KEY, JSON.stringify([...seenTitles]));
  } catch { /* Si el almacenamiento no está disponible, recordar durante esta sesión. */ }
}

const ICONS = {
  terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>`,
  cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
  reset: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,
  monitor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.997.107-.776.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.04 22.27c-1.93 0-3.83-.515-5.486-1.488l-.394-.234-4.083 1.071 1.09-3.978-.256-.408a10.18 10.18 0 0 1-1.567-5.452C1.345 6.165 6.135 1.378 12.044 1.378c2.864 0 5.557 1.116 7.583 3.142a10.65 10.65 0 0 1 3.13 7.566c-.002 5.91-4.792 10.694-10.713 10.694m9.106-19.846A12.13 12.13 0 0 0 12.044 0C5.495 0 .16 5.335.158 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.86 11.86 0 0 0 5.677 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.83 11.83 0 0 0-3.477-8.41"/></svg>`,
  email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  webIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
};

const CONTACT_ICONS = {
  whatsapp: ICONS.whatsapp,
  email: ICONS.email,
  github: ICONS.github,
  web: ICONS.webIcon,
};

/* ============ Manejo del progreso en localStorage ============ */
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(prog) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prog));
}

let progress = loadProgress();

function getAllTopics() {
  const topics = [];
  for (const chapter of COURSE.chapters) {
    for (const topic of chapter.topics) topics.push(topic);
  }
  return topics;
}

function getStatus(topicId) {
  return progress[topicId]?.status || "not-started";
}

function setStatus(topicId, status) {
  progress[topicId] = progress[topicId] || {};
  progress[topicId].status = status;
  saveProgress(progress);
}

function setSlideIndex(topicId, index) {
  progress[topicId] = progress[topicId] || {};
  progress[topicId].slideIndex = index;
  saveProgress(progress);
}

function getSlideIndex(topicId) {
  return progress[topicId]?.slideIndex || 0;
}

function computePercent() {
  const topics = getAllTopics();
  if (topics.length === 0) return 0;
  const completed = topics.filter((t) => getStatus(t.id) === "completed").length;
  return Math.round((completed / topics.length) * 100);
}

function pillForStatus(status) {
  const labels = {
    "not-started": "No iniciado",
    "in-progress": "En progreso",
    "completed": "Completado",
  };
  const cls = {
    "not-started": "pill-not-started",
    "in-progress": "pill-in-progress",
    "completed": "pill-completed",
  };
  return `<span class="pill ${cls[status]}"><span class="dot"></span>${labels[status]}</span>`;
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
window.escapeHtml = escapeHtml;

function attrEscape(str) {
  return escapeHtml(str);
}

function formatLine(line) {
  let out = escapeHtml(line);
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/`(.+?)`/g, "<code>$1</code>");
  return out;
}

/* ============ Encabezado ============ */
function renderHeader() {
  const pct = computePercent();
  return `
    <header class="site-header" id="header-root">
      <div class="site-header__inner">
        <div class="site-header__brand">
          <div class="brand-chip" title="Curso Intensivo de C++ — UCAB">
            <img src="img/fallout/vault_tec_logo.svg" alt="Vault-Tec" style="width:24px;height:24px;">
          </div>
          <div class="brand-text">
            <h1>${COURSE.title}</h1>
            <div class="brand-by">
              por <a href="https://www.ucab.edu.ve" target="_blank" rel="noopener"><img src="img/ucab_wide.webp" alt="UCAB"></a>
            </div>
          </div>
        </div>
        <div class="site-header__progress">
          <span class="progress-label">Progreso</span>
          <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
          <span class="progress-pct">${pct}%</span>
        </div>
      </div>
    </header>
  `;
}

/* ============ Home View ============ */
function renderHome() {
  const topics = getAllTopics();
  const anyStarted = topics.some((t) => getStatus(t.id) !== "not-started");
  const startLabel = anyStarted ? "Continuar Curso" : "Iniciar Curso";

  let firstIncomplete = topics.find((t) => getStatus(t.id) !== "completed") || topics[0];

  let rows = "";
  for (const chapter of COURSE.chapters) {
    rows += `
      <tr class="chapter-row">
        <td colspan="4">${ICONS.book.replace("<svg ", '<svg class="chapter-icon" ')}<span>${escapeHtml(chapter.title)}</span></td>
      </tr>
    `;
    for (const topic of chapter.topics) {
      const status = getStatus(topic.id);
      const numStr = String(topic.num).padStart(2, "0");
      rows += `
        <tr class="topic-row" data-topic-id="${topic.id}">
          <td class="col-num">${numStr}</td>
          <td class="col-title">${escapeHtml(topic.title)}</td>
          <td class="col-desc">${escapeHtml(topic.description)}</td>
          <td class="col-progress">
            <div class="col-actions">
              ${pillForStatus(status)}
              <button class="icon-btn" data-open-topic="${topic.id}" title="Abrir presentación">${ICONS.monitor}</button>
            </div>
          </td>
        </tr>
      `;
    }
  }

  return `
    <main class="home">
      <div class="home-hero">
        <div class="home-hero__content">
          <div class="home-hero__badge">
            <img src="img/fallout/radiation.svg" alt="Radiation" style="width:14px;height:14px;display:inline-block;vertical-align:middle;">
            UCAB · CURSO INTENSIVO DE C++ PARA JUNIORS
          </div>
          <h2 class="home-hero__title">Construye la interfaz del Pip-Boy 3000</h2>
          <p class="home-hero__desc">
            Curso intensivo de C++ para juniors en la UCAB. Domina la semántica de memoria, abstracciones de cero coste, ciclo REPL y el puente con llamadas al sistema POSIX construyendo la interfaz interactiva del Pip-Boy.
          </p>
          <div class="home__actions" style="margin-top:1rem;">
            <button class="btn btn-primary" id="btn-start">${ICONS.play}${startLabel}</button>
            <a class="btn btn-dark" id="btn-assets" href="downloads/pipboy-bios.zip" download>${ICONS.download}Descargar Código BIOS (.zip)</a>
            <a class="btn btn-dark" id="btn-solutions" href="https://github.com/alfosua/ucab-pipboy-bios" target="_blank" rel="noopener">${ICONS.github}Repositorio GitHub</a>
            <button class="btn btn-outline" id="btn-share">${ICONS.share}Compartir</button>
            <button class="btn btn-outline" id="btn-reset">${ICONS.reset}Reiniciar</button>
          </div>
        </div>
        <div class="home-hero__image">
          <img src="img/fallout/vault_boy.png" alt="Vault Boy Thumbs Up">
        </div>
      </div>

      <div class="home__head">
        <h2>Plan de Estudio Detallado</h2>
      </div>

      <div class="plan-card">
        <table class="plan-table">
          <thead>
            <tr>
              <th class="col-num">#</th>
              <th>Tema</th>
              <th>Descripción</th>
              <th class="col-progress">Progreso</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>

      <footer class="home-footer">
        <div>Creado por <strong>Alfonso Suarez</strong> · <a href="https://alfosua.com" target="_blank" rel="noopener">alfosua.com</a></div>
        <div class="home-footer__ucab">
          <a href="https://www.ucab.edu.ve" target="_blank" rel="noopener">
            Universidad Católica Andrés Bello <img src="img/ucab_wide.webp" alt="UCAB">
          </a>
        </div>
      </footer>
    </main>
  `;
}

function attachHomeEvents() {
  const topics = getAllTopics();
  let firstIncomplete = topics.find((t) => getStatus(t.id) !== "completed") || topics[0];

  document.getElementById("btn-start")?.addEventListener("click", () => {
    openPresentation(firstIncomplete.id, getSlideIndex(firstIncomplete.id), { fromMenu: true });
  });

  document.getElementById("btn-share")?.addEventListener("click", showShareModal);

  document.getElementById("btn-reset")?.addEventListener("click", () => {
    if (confirm("¿Seguro que deseas reiniciar todo tu progreso del curso?")) {
      seenTitles.clear();
      try { localStorage.removeItem(TITLES_STORAGE_KEY); } catch { /* Sin persistencia. */ }
      progress = {};
      saveProgress(progress);
      render();
    }
  });

  document.querySelectorAll(".topic-row").forEach((row) => {
    row.addEventListener("click", (e) => {
      if (e.target.closest("[data-open-topic]")) return;
      const id = parseInt(row.dataset.topicId, 10);
      openPresentation(id, getSlideIndex(id), { fromMenu: true });
    });
  });

  document.querySelectorAll("[data-open-topic]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.openTopic, 10);
      openPresentation(id, getSlideIndex(id), { fromMenu: true });
    });
  });
}

/* ============ Presentation overlay ============ */
let currentTopicIndex = -1;
let currentSlideIndex = 0;

function findTopicById(id) {
  for (let ci = 0; ci < COURSE.chapters.length; ci++) {
    const chapter = COURSE.chapters[ci];
    for (let ti = 0; ti < chapter.topics.length; ti++) {
      if (chapter.topics[ti].id === id) {
        return { chapter, topic: chapter.topics[ti], chapterIndex: ci, topicIndexInChapter: ti };
      }
    }
  }
  return null;
}

function renderSlideContent(slide, topic) {
  let html = "";

  if (slide.logo) {
    html += `<div class="slide-logo"><img src="${escapeHtml(slide.logo)}" alt="Logo"></div>`;
  }

  html += `<h2>${escapeHtml(slide.title)}</h2><div class="slide__content">`;

  for (const line of slide.content || []) {
    if (line.startsWith("nota:")) {
      html += `<p class="note">${formatLine(line.replace(/^nota:\s*/, ""))}</p>`;
    } else if (line.startsWith("robco:")) {
      html += `<p>${formatLine(line.replace(/^robco:\s*/, ""))}</p>`;
    } else if (line.startsWith("tarea:") || line.startsWith("reto:")) {
      html += `
        <div class="homework-card">
          <div class="homework-title">${ICONS.check} Sugerencia de Tarea / Reto para Casa</div>
          <p>${formatLine(line.replace(/^(tarea|reto):\s*/, ""))}</p>
        </div>
      `;
    } else {
      html += `<p>${formatLine(line)}</p>`;
    }
  }
  html += `</div>`;

  if (slide.sources) {
    html += `<p class="slide-sources">Fuentes: ${slide.sources.map((source) =>
      `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener">${escapeHtml(source.name)}</a>`
    ).join(" · ")}</p>`;
  }

  if (slide.code) {
    const filename = slide.filename || "main.cpp";
    const variant = slide.variant || "cpp";
    const download = slide.download || "";
    html += `<code-window filename="${escapeHtml(filename)}" variant="${escapeHtml(variant)}" download="${escapeHtml(download)}" code="${attrEscape(slide.code)}"></code-window>`;
  }

  if (slide.terminal) {
    html += `<code-window variant="terminal" code="${attrEscape(slide.terminal)}"></code-window>`;
  }

  if (slide.multiFile) {
    html += `<multi-file-viewer data-files="${attrEscape(JSON.stringify(slide.multiFile))}"></multi-file-viewer>`;
  }

  if (slide.quiz) {
    html += `<quiz-question data-quiz="${attrEscape(JSON.stringify(slide.quiz))}"></quiz-question>`;
  }

  if (slide.cards) {
    html += `<div class="card-grid">`;
    for (const card of slide.cards) {
      html += `
        <a class="resource-card" href="${escapeHtml(card.url)}" target="_blank" rel="noopener">
          ${card.icon ? `<img src="${escapeHtml(card.icon)}" alt="${escapeHtml(card.name)}">` : ICONS.external}
          <div class="resource-card__name">${escapeHtml(card.name)}</div>
          ${card.description ? `<div class="resource-card__desc">${escapeHtml(card.description)}</div>` : ""}
          <div class="resource-card__url">${escapeHtml(card.url.replace(/^https?:\/\//, ""))}</div>
        </a>
      `;
    }
    html += `</div>`;
  }

  if (slide.table) {
    html += `
      <div class="plan-card slide-table-card" style="margin-top:1.25rem;">
        <table class="plan-table${slide.table.nowrapFirstColumn ? " slide-table--syntax" : ""}">
          <thead>
            <tr>${slide.table.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${slide.table.rows.map((row) => `<tr>${row.map((cell) => `<td>${formatLine(cell)}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  if (slide.image) {
    html += `
      <div class="gif-card" style="margin-top:1.25rem;text-align:center;">
        <img src="${escapeHtml(slide.image.src)}" alt="${escapeHtml(slide.image.caption || slide.title)}" style="max-height:${Math.max(1, Number(slide.image.maxHeight) || 320)}px;border-radius:var(--radius-lg);">
        ${slide.image.caption ? `<div class="gif-caption">${escapeHtml(slide.image.caption)}</div>` : ""}
      </div>
    `;
  }

  if (slide.downloadCard) {
    html += `
      <div class="download-card">
        <a class="download-btn" href="${escapeHtml(slide.downloadCard.href)}" download>${ICONS.download}${escapeHtml(slide.downloadCard.label)}</a>
        ${slide.downloadCard.hint ? `<div class="download-hint">${escapeHtml(slide.downloadCard.hint)}</div>` : ""}
      </div>
    `;
  }

  if (slide.contact) {
    const c = slide.contact;
    html += `
      <div class="contact-card">
        ${c.logo ? `<img class="logo" src="${escapeHtml(c.logo)}" alt="UCAB">` : ""}
        ${c.heading ? `<h3>${escapeHtml(c.heading)}</h3>` : ""}
        <div class="contact-name">${escapeHtml(c.name)}</div>
        ${c.subtitle ? `<div class="contact-subtitle">${escapeHtml(c.subtitle)}</div>` : ""}
        <div class="contact-grid">
          ${c.items.map((item) => {
            const icon = CONTACT_ICONS[item.icon] || "";
            const inner = `${icon}<span>${escapeHtml(item.value)}</span>`;
            return item.url
              ? `<a class="contact-chip" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">${inner}</a>`
              : `<div class="contact-chip">${inner}</div>`;
          }).join("")}
        </div>
      </div>
    `;
  }

  return html;
}

function fitSlideCodeBlocks() {
  const overlay = document.getElementById("overlay");
  if (!overlay || overlay.hidden) return;
  const body = overlay.querySelector(".overlay-body");
  const article = overlay.querySelector(".slide");
  const blocks = [...article.querySelectorAll(".code-window pre")];
  if (!blocks.length) return;

  // Mide el texto y los controles; el espacio restante pertenece al código.
  for (const block of blocks) block.style.removeProperty("max-height");
  const padding = getComputedStyle(body);
  const available = body.clientHeight - parseFloat(padding.paddingTop) - parseFloat(padding.paddingBottom);
  const codeHeight = blocks.reduce((height, block) => height + block.getBoundingClientRect().height, 0);
  const fixedHeight = article.getBoundingClientRect().height - codeHeight;
  const minimum = article.querySelector(".quiz-code") && article.querySelector(".quiz-feedback") ? 128 : 160;
  const maxHeight = Math.max(minimum, Math.floor((available - fixedHeight - 2) / blocks.length));
  for (const block of blocks) block.style.maxHeight = `${maxHeight}px`;
}

window.addEventListener("resize", fitSlideCodeBlocks);
document.fonts?.ready.then(fitSlideCodeBlocks);

function navLabels(topic, slideIndex, slidesCount, chapterIndex, topicIndexInChapter) {
  const isFirstSlide = slideIndex === 0;
  const isLastSlide = slideIndex === slidesCount - 1;
  const chapter = COURSE.chapters[chapterIndex];
  const isFirstTopicInChapter = topicIndexInChapter === 0;
  const isFirstChapter = chapterIndex === 0;
  const isLastTopicInChapter = topicIndexInChapter === chapter.topics.length - 1;
  const isLastChapter = chapterIndex === COURSE.chapters.length - 1;

  let prevLabel = "Anterior";
  let prevDisabled = false;
  if (isFirstSlide) {
    if (isFirstTopicInChapter && isFirstChapter) {
      prevDisabled = true;
      prevLabel = "Anterior";
    } else if (isFirstTopicInChapter) {
      prevLabel = "Capítulo Anterior";
    } else {
      prevLabel = "Tema Anterior";
    }
  }

  let nextLabel = "Siguiente";
  let nextPrimary = false;
  if (isLastSlide) {
    nextPrimary = true;
    if (isLastTopicInChapter && isLastChapter) {
      nextLabel = "Finalizar Curso";
    } else if (isLastTopicInChapter) {
      nextLabel = "Siguiente Capítulo";
    } else {
      nextLabel = "Siguiente Tema";
    }
  }

  return { prevLabel, prevDisabled, nextLabel, nextPrimary };
}

let transitionTimer = null;
let transitionExitTimer = null;
let transitionQueue = [];
let menuOpenAnimation = null;
let menuCloseAnimation = null;

function clearTitleTransition() {
  clearTimeout(transitionTimer);
  clearTimeout(transitionExitTimer);
  transitionExitTimer = null;
  transitionTimer = null;
  transitionQueue = [];
  document.getElementById("title-transition")?.remove();
}

function advanceTitleTransition() {
  const current = document.getElementById("title-transition");
  if (current?.classList.contains("title-transition--leaving")) return;
  clearTimeout(transitionTimer);
  if (current) {
    current.classList.add("title-transition--leaving");
    if (transitionQueue.length) current.classList.add("title-transition--between-titles");
    transitionExitTimer = setTimeout(() => {
      current.remove();
      transitionExitTimer = null;
      showNextTitleTransition();
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300);
    return;
  }
  showNextTitleTransition();
}

function showNextTitleTransition() {
  const entry = transitionQueue.shift();
  if (!entry) {
    transitionTimer = null;
    document.getElementById("overlay-close")?.focus({ preventScroll: true });
    requestAnimationFrame(fitSlideCodeBlocks);
    return;
  }
  rememberTitle(entry.key);
  const screen = document.createElement("button");
  screen.id = "title-transition";
  screen.className = "title-transition";
  screen.type = "button";
  screen.setAttribute("aria-label", `${entry.label}: ${entry.title}. Continuar`);
  const label = document.createElement("span");
  label.className = "title-transition__label";
  label.textContent = entry.label;
  const title = document.createElement("span");
  title.className = "title-transition__title";
  title.innerHTML = escapeHtml(entry.title).replace(/C\+\+(?:\d{2})?/g,
    match => `<span class="text-nowrap">${match}</span>`);
  const progress = document.createElement("span");
  progress.className = "title-transition__progress";
  progress.setAttribute("aria-hidden", "true");
  screen.append(label, title, progress);
  screen.addEventListener("click", advanceTitleTransition);
  document.body.appendChild(screen);
  screen.focus({ preventScroll: true });
  transitionTimer = setTimeout(advanceTitleTransition, 5000);
}

function openPresentation(topicId, slideIndex = 0, opts = {}) {
  const found = findTopicById(topicId);
  if (!found) return;
  const enteringTopic = currentTopicIndex !== topicId;
  if (menuCloseAnimation) {
    menuCloseAnimation.onfinish = null;
    menuCloseAnimation.cancel();
    menuCloseAnimation = null;
  }
  menuOpenAnimation?.cancel();
  clearTitleTransition();
  currentTopicIndex = topicId;
  currentSlideIndex = Math.max(0, Math.min(slideIndex, found.topic.slides.length - 1));

  if (getStatus(topicId) === "not-started") {
    setStatus(topicId, "in-progress");
  }

  renderOverlay({ animate: false });
  document.getElementById("overlay").hidden = false;
  document.body.style.overflow = "hidden";
  updateHash();
  renderHeaderInPlace();
  if (enteringTopic && opts.transitions !== false) {
    const chapterKey = `chapter-${found.chapter.id}`;
    const topicKey = `topic-${found.topic.id}`;
    if (!seenTitles.has(chapterKey)) {
      transitionQueue.push({ key: chapterKey, label: "Capítulo", title: found.chapter.title });
    }
    if (!seenTitles.has(topicKey)) {
      transitionQueue.push({ key: topicKey, label: "Sección", title: found.topic.title });
    }
    if (transitionQueue.length) advanceTitleTransition();
  }
  if (opts.fromMenu && !document.getElementById("title-transition") &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    menuOpenAnimation = document.getElementById("overlay").animate([
      { opacity: 0, transform: "translateY(18px)" },
      { opacity: 1, transform: "translateY(0)" }
    ], { duration: 280, easing: "cubic-bezier(.2,.7,.3,1)" });
  }
}

function closePresentation({ preserveHash = false } = {}) {
  if (menuCloseAnimation) return;
  menuOpenAnimation?.cancel();
  clearTitleTransition();
  const overlay = document.getElementById("overlay");
  currentTopicIndex = -1;
  if (!preserveHash) clearHash();
  render();
  const finish = () => {
    overlay.hidden = true;
    document.body.style.overflow = "";
    menuCloseAnimation = null;
  };
  if (overlay.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finish();
    return;
  }
  menuCloseAnimation = overlay.animate([
    { opacity: 1, transform: "translateY(0)" },
    { opacity: 0, transform: "translateY(18px)" }
  ], { duration: 220, easing: "ease-in" });
  menuCloseAnimation.onfinish = finish;
}

function goToSlide(newIndex, direction = "next") {
  const found = findTopicById(currentTopicIndex);
  if (!found) return;
  const { chapter, topic, chapterIndex, topicIndexInChapter } = found;
  const slidesCount = topic.slides.length;

  if (newIndex >= 0 && newIndex < slidesCount) {
    currentSlideIndex = newIndex;
    setSlideIndex(topic.id, currentSlideIndex);
    if (currentSlideIndex === slidesCount - 1) {
      setStatus(topic.id, "completed");
    }
    renderOverlay({ animate: true, direction });
    updateHash();
    renderHeaderInPlace();
    return;
  }

  if (newIndex < 0) {
    if (topicIndexInChapter > 0) {
      const prevTopic = chapter.topics[topicIndexInChapter - 1];
      openPresentation(prevTopic.id, prevTopic.slides.length - 1);
    } else if (chapterIndex > 0) {
      const prevChapter = COURSE.chapters[chapterIndex - 1];
      const prevTopic = prevChapter.topics[prevChapter.topics.length - 1];
      openPresentation(prevTopic.id, prevTopic.slides.length - 1);
    }
    return;
  }

  if (newIndex >= slidesCount) {
    setStatus(topic.id, "completed");
    if (topicIndexInChapter < chapter.topics.length - 1) {
      const nextTopic = chapter.topics[topicIndexInChapter + 1];
      openPresentation(nextTopic.id, 0);
    } else if (chapterIndex < COURSE.chapters.length - 1) {
      const nextChapter = COURSE.chapters[chapterIndex + 1];
      const nextTopic = nextChapter.topics[0];
      openPresentation(nextTopic.id, 0);
    } else {
      closePresentation();
      showToast("¡Felicitaciones! Has completado el Curso Intensivo de C++ para Juniors.", { duration: 4000 });
    }
  }
}

function renderOverlay({ animate, direction }) {
  const found = findTopicById(currentTopicIndex);
  if (!found) return;
  const { chapter, topic, chapterIndex, topicIndexInChapter } = found;
  const slide = topic.slides[currentSlideIndex];
  const slidesCount = topic.slides.length;
  const pct = Math.round(((currentSlideIndex + 1) / slidesCount) * 100);

  const { prevLabel, prevDisabled, nextLabel, nextPrimary } = navLabels(
    topic,
    currentSlideIndex,
    slidesCount,
    chapterIndex,
    topicIndexInChapter
  );

  let slideClass = "slide";
  if (animate) {
    slideClass += direction === "prev" ? " slide--enter-left" : " slide--enter-right";
  }

  const overlay = document.getElementById("overlay");
  overlay.innerHTML = `
    <header class="overlay-header">
      <div class="overlay-header__left">
        <div class="overlay-header__title">${escapeHtml(topic.title)}</div>
        <div class="overlay-header__counter">DIAPOSITIVA ${currentSlideIndex + 1} DE ${slidesCount}</div>
      </div>
      <button class="overlay-close" id="overlay-close" title="Cerrar presentación (Esc)">${ICONS.close}</button>
    </header>

    <div class="overlay-body">
      <div class="slide-wrap${slide.layout === "code" ? " slide-wrap--code" : ""}">
        <article class="${slideClass}">
          ${renderSlideContent(slide, topic)}
        </article>
      </div>
    </div>

    <footer class="overlay-footer">
      <div class="overlay-progress"><div class="overlay-progress__fill" style="width:${pct}%"></div></div>
      <div class="overlay-footer__inner">
        <button class="btn btn-outline" id="nav-prev" ${prevDisabled ? "disabled" : ""}>
          ${ICONS.arrowLeft}${prevLabel}
        </button>
        <button class="btn ${nextPrimary ? "btn-primary" : "btn-dark"}" id="nav-next">
          ${nextLabel}${ICONS.arrowRight}
        </button>
      </div>
    </footer>
  `;

  document.getElementById("overlay-close").addEventListener("click", closePresentation);
  document.getElementById("nav-prev").addEventListener("click", () => goToSlide(currentSlideIndex - 1, "prev"));
  document.getElementById("nav-next").addEventListener("click", () => goToSlide(currentSlideIndex + 1, "next"));
  requestAnimationFrame(fitSlideCodeBlocks);
}

/* ============ Teclado ============ */
document.addEventListener("keydown", (e) => {
  if (document.getElementById("title-transition")) {
    e.preventDefault();
    e.stopPropagation();
    if (!e.repeat) advanceTitleTransition();
    return;
  }
  const overlay = document.getElementById("overlay");
  if (!overlay || overlay.hidden) return;

  if (menuCloseAnimation) return;

  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
  if (e.target.closest(".code-window pre") && e.key !== "Escape") return;

  if (e.key === "ArrowLeft") {
    e.preventDefault();
    goToSlide(currentSlideIndex - 1, "prev");
  } else if (e.key === "ArrowRight" || e.key === " ") {
    e.preventDefault();
    goToSlide(currentSlideIndex + 1, "next");
  } else if (e.key === "Escape") {
    e.preventDefault();
    closePresentation();
  }
});

/* ============ Hash / Deep Linking ============ */
function updateHash() {
  if (currentTopicIndex >= 0) {
    location.hash = `topic-${currentTopicIndex}-slide-${currentSlideIndex + 1}`;
  }
}

function clearHash() {
  history.replaceState(null, null, " ");
}

function handleHash() {
  const match = location.hash.match(/^#topic-(\d+)(?:-slide-(\d+))?$/);
  if (match) {
    const topicId = parseInt(match[1], 10);
    const slideNum = match[2] ? parseInt(match[2], 10) - 1 : 0;
    if (currentTopicIndex !== topicId || currentSlideIndex !== slideNum) {
      openPresentation(topicId, slideNum);
    }
  } else if (currentTopicIndex >= 0) {
    closePresentation({ preserveHash: true });
  }
}

/* ============ Toast Notifications ============ */
function showToast(msg, opts = {}) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 200);
  }, opts.duration || 3000);
}

/* ============ Share Modal ============ */
function showShareModal() {
  const url = window.location.href.split("#")[0];
  const shareText = `¡Explora el Curso Intensivo de C++ para Juniors de la UCAB! ${url}`;

  const el = document.createElement("div");
  el.className = "share-modal";
  el.innerHTML = `
    <div class="share-modal__backdrop"></div>
    <div class="share-modal__card">
      <button class="share-modal__close" title="Cerrar modal">${ICONS.close}</button>
      <div class="share-modal__badge">COMPARTIR CURSO</div>
      <h3 class="share-modal__title">Invita a tus compañeros</h3>
      <p class="share-modal__desc">Comparte este curso práctico con tus colegas para dominar C++ antes del proyecto de microshell.</p>

      <div class="share-modal__link-box">
        <input class="share-modal__input" readonly value="${escapeHtml(url)}">
        <button class="share-modal__copy-btn" id="share-copy-btn">${ICONS.link} Copiar Enlace</button>
      </div>

      <div class="share-modal__actions" style="margin-top:1.25rem;display:flex;gap:0.75rem;flex-wrap:wrap;">
        <a class="btn btn-primary" href="https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}" target="_blank" rel="noopener">
          ${ICONS.whatsapp} WhatsApp
        </a>
        <a class="btn btn-dark" href="mailto:?subject=${encodeURIComponent("Curso C++ para Juniors UCAB")}&body=${encodeURIComponent(shareText)}" target="_blank" rel="noopener">
          ${ICONS.email} Correo
        </a>
      </div>
    </div>
  `;

  document.body.appendChild(el);

  const close = () => el.remove();
  el.querySelector(".share-modal__backdrop").addEventListener("click", close);
  el.querySelector(".share-modal__close").addEventListener("click", close);
  el.querySelector("#share-copy-btn").addEventListener("click", () => {
    navigator.clipboard.writeText(url).then(() => {
      showToast("¡Enlace copiado al portapapeles!");
      close();
    });
  });
}

/* ============ Renderizado principal ============ */
function renderHeaderInPlace() {
  const root = document.getElementById("header-root");
  if (root) root.outerHTML = renderHeader();
}

function render() {
  const app = document.getElementById("app");
  app.innerHTML = renderHeader() + renderHome();
  attachHomeEvents();
}

// Iniciar aplicación
document.addEventListener("DOMContentLoaded", () => {
  render();
  handleHash();
});
window.addEventListener("hashchange", handleHash);
