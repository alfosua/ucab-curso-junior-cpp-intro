// Web components: <code-window>, <multi-file-viewer>, <quiz-question>

const ICON_COPY = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const ICON_DOWNLOAD_SM = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`;
const ICON_CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
const ICON_FILE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;

/* ============ <code-window> ============ */
class CodeWindow extends HTMLElement {
  connectedCallback() {
    const rawCode = this.getAttribute("code") || this.textContent || "";
    const code = rawCode.replace(/^\n/, "").replace(/\n$/, "");
    const filename = this.getAttribute("filename") || "";
    const variant = this.getAttribute("variant") || "cpp";
    const downloadUrl = this.getAttribute("download") || "";

    let html = "";
    if (variant === "terminal" || variant === "shell") {
      html = window.highlightShell(code);
    } else if (variant === "makefile" || filename.toLowerCase().includes("makefile")) {
      html = window.highlightMakefile(code);
    } else {
      html = window.highlightCpp(code);
    }

    const isTerminal = variant === "terminal" || variant === "shell";
    const headerLeft = isTerminal
      ? `<div class="code-window__dots"><span></span><span></span><span></span></div><div class="code-window__label">ROBCO TERMINAL [BASH / SH]</div>`
      : `<div class="code-window__dots"><span></span><span></span><span></span></div>${filename ? `<div class="code-window__filename">${window.escapeHtml(filename)}</div>` : ""}`;

    let actions = `
      <button class="code-window__action" data-action="copy" title="Copiar código al portapapeles">
        ${ICON_COPY}
        <span class="copied-tip">¡Copiado!</span>
      </button>
    `;

    if (downloadUrl) {
      actions += `
        <a class="code-window__action" href="${window.escapeHtml(downloadUrl)}" download title="Descargar archivo">
          ${ICON_DOWNLOAD_SM}
        </a>
      `;
    }

    this.innerHTML = `
      <div class="code-window ${isTerminal ? "code-window--terminal" : ""}">
        <div class="code-window__header">
          <div class="code-window__header-left">${headerLeft}</div>
          <div class="code-window__header-right">${actions}</div>
        </div>
        <pre tabindex="0" role="region" aria-label="Código fuente"><code>${html}</code></pre>
      </div>
    `;

    requestAnimationFrame(() => window.fitSlideCodeBlocks?.());
    const copyBtn = this.querySelector('[data-action="copy"]');
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        navigator.clipboard?.writeText(code).then(() => {
          const tip = copyBtn.querySelector(".copied-tip");
          tip.classList.add("show");
          setTimeout(() => tip.classList.remove("show"), 1400);
        });
      });
    }
  }
}
customElements.define("code-window", CodeWindow);

/* ============ <multi-file-viewer> ============ */

class MultiFileViewer extends HTMLElement {
  connectedCallback() {
    let filesData = [];
    try {
      const rawData = this.getAttribute("data-files") || "[]";
      filesData = JSON.parse(rawData);
    } catch {
      filesData = [];
    }

    if (!filesData || filesData.length === 0) {
      this.innerHTML = `<div class="p-4 text-slate-500">No hay archivos para mostrar.</div>`;
      return;
    }

    this.files = filesData;
    this.currentIndex = 0;
    this.render();
  }

  render() {
    const current = this.files[this.currentIndex];
    const isMakefile = current.filename.toLowerCase().includes("makefile");
    const displayed = current.code.replace(/\n$/, "");
    const highlighted = isMakefile ? window.highlightMakefile(displayed) : window.highlightCpp(displayed);

    const tabsHtml = this.files.map((file, idx) => {
      const activeCls = idx === this.currentIndex ? "multi-file__tab--active" : "";
      return `
        <button class="multi-file__tab ${activeCls}" data-tab-index="${idx}">
          ${ICON_FILE}
          <span>${window.escapeHtml(file.filename)}</span>
        </button>
      `;
    }).join("");

    this.innerHTML = `
      <div class="multi-file-viewer">
        <div class="multi-file__header">
          <div class="multi-file__tabs">
            ${tabsHtml}
          </div>
          <div class="multi-file__header-actions">
            <button class="multi-file__copy-btn" data-action="copy-file">
              ${ICON_COPY}
              <span>Copiar ${window.escapeHtml(current.filename)} completo</span>
              <span class="copied-tip">¡Copiado!</span>
            </button>
          </div>
        </div>
        ${current.desc ? `
          <div class="multi-file__summary">
            <strong>Descripción del archivo:</strong> ${window.escapeHtml(current.desc)}
          </div>
        ` : ""}
        <div class="code-window">
          <div class="code-window__header">
            <div class="code-window__header-left">
              <div class="code-window__dots"><span></span><span></span><span></span></div>
              <div class="code-window__filename">${window.escapeHtml(current.path || current.filename)}</div>
            </div>
            <div class="code-window__header-right">
              <span class="multi-file__count">Archivo ${this.currentIndex + 1} de ${this.files.length}</span>
            </div>
          </div>
          <pre tabindex="0" role="region" aria-label="Código fuente"><code>${highlighted}</code></pre>
        </div>
      </div>
    `;

    // Event listeners for tabs
    this.querySelectorAll(".multi-file__tab").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(btn.getAttribute("data-tab-index"), 10);
        if (idx !== this.currentIndex) {
          this.currentIndex = idx;
          this.render();
        }
      });
    });

    requestAnimationFrame(() => window.fitSlideCodeBlocks?.());

    // Copy current file code
    const copyBtn = this.querySelector('[data-action="copy-file"]');
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        navigator.clipboard?.writeText(current.code).then(() => {
          const tip = copyBtn.querySelector(".copied-tip");
          tip.classList.add("show");
          setTimeout(() => tip.classList.remove("show"), 1400);
        });
      });
    }
  }
}
customElements.define("multi-file-viewer", MultiFileViewer);

/* ============ <quiz-question> ============ */
class QuizQuestion extends HTMLElement {
  connectedCallback() {
    let quiz = null;
    try {
      quiz = JSON.parse(this.getAttribute("data-quiz") || "{}");
    } catch {
      quiz = null;
    }

    if (!quiz || !quiz.question) {
      return;
    }

    this.quiz = quiz;
    this.selectedOption = null;
    this.submitted = false;

    this.render();
  }

  render() {
    const q = this.quiz;
    const optionsHtml = q.options.map((opt, idx) => {
      let itemCls = "quiz-option";
      if (this.selectedOption === idx) itemCls += " quiz-option--selected";
      if (this.submitted) {
        if (idx === q.correctIndex) {
          itemCls += " quiz-option--correct";
        } else if (this.selectedOption === idx && idx !== q.correctIndex) {
          itemCls += " quiz-option--incorrect";
        }
      }

      return `
        <button class="${itemCls}" data-opt-index="${idx}" ${this.submitted ? "disabled" : ""}>
          <div class="quiz-option__indicator">${String.fromCharCode(65 + idx)}</div>
          <div class="quiz-option__text">${window.escapeHtml(opt)}</div>
        </button>
      `;
    }).join("");

    let feedbackHtml = "";
    if (this.submitted) {
      const isCorrect = this.selectedOption === q.correctIndex;
      const explanation = q.explanation.replace(/^<strong>¡?Correcto!?<\/strong>\s*/i, "");
      feedbackHtml = `
        <div class="quiz-feedback ${isCorrect ? "quiz-feedback--correct" : "quiz-feedback--incorrect"}">
          <div class="quiz-feedback__title">
            ${isCorrect ? "✓ ¡Excelente razonamiento!" : "✗ Respuesta incorrecta"}
          </div>
          ${!isCorrect ? `<div class="quiz-feedback__answer"><strong>Respuesta correcta:</strong> ${window.escapeHtml(q.options[q.correctIndex])}</div>` : ""}
          <div class="quiz-feedback__body">
            ${explanation}
          </div>
          <button class="quiz-retry-btn" data-action="retry">Intentar de nuevo</button>
        </div>
      `;
    }

    this.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-badge">RETRO-TEST DE EVALUACIÓN: FUNDAMENTOS C++</div>
        <h3 class="quiz-question">${window.escapeHtml(q.question)}</h3>
        ${q.code ? `<div class="quiz-code"><code-window code="${window.escapeHtml(q.code)}"></code-window></div>` : ""}
        <div class="quiz-options">
          ${optionsHtml}
        </div>
        ${!this.submitted ? `
          <div class="quiz-actions">
            <button class="quiz-submit-btn" ${this.selectedOption === null ? "disabled" : ""} data-action="submit">
              Verificar respuesta
            </button>
          </div>
        ` : ""}
        ${feedbackHtml}
      </div>
    `;

    // Bind option selection
    this.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.submitted) return;
        this.selectedOption = parseInt(btn.getAttribute("data-opt-index"), 10);
        this.render();
      });
    });

    // Bind submit
    const submitBtn = this.querySelector('[data-action="submit"]');
    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        if (this.selectedOption !== null) {
          this.submitted = true;
          this.render();
        }
      });
    }

    // Bind retry
    const retryBtn = this.querySelector('[data-action="retry"]');
    if (retryBtn) {
      retryBtn.addEventListener("click", () => {
        this.submitted = false;
        this.selectedOption = null;
        this.render();
      });
    }
  }
}
customElements.define("quiz-question", QuizQuestion);
