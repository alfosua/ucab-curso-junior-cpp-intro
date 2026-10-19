// Resaltador de sintaxis para C++, Makefile y Shell (sin dependencias externas)

const CPP_KEYWORDS = new Set([
  "alignas", "alignof", "and", "and_eq", "asm", "atomic_cancel", "atomic_commit",
  "atomic_noexcept", "auto", "bitand", "bitor", "bool", "break", "case", "catch",
  "char", "char8_t", "char16_t", "char32_t", "class", "compl", "concept", "const",
  "consteval", "constexpr", "constinit", "const_cast", "continue", "co_await",
  "co_return", "co_yield", "decltype", "default", "delete", "do", "double",
  "dynamic_cast", "else", "enum", "explicit", "export", "extern", "false", "float",
  "for", "friend", "goto", "if", "inline", "int", "long", "mutable", "namespace",
  "new", "noexcept", "not", "not_eq", "nullptr", "operator", "or", "or_eq",
  "private", "protected", "public", "reflexpr", "register", "reinterpret_cast",
  "requires", "return", "short", "signed", "sizeof", "static", "static_assert",
  "static_cast", "struct", "switch", "synchronized", "template", "this",
  "thread_local", "throw", "true", "try", "typedef", "typeid", "typename",
  "union", "unsigned", "using", "virtual", "void", "volatile", "wchar_t",
  "while", "xor", "xor_eq"
]);

const CPP_TYPES = new Set([
  "std::string", "std::vector", "std::unordered_map", "std::function",
  "std::istringstream", "std::ostringstream", "std::stringstream",
  "std::cout", "std::cin", "std::cerr", "std::endl", "std::flush",
  "std::string_view", "std::clamp", "std::max", "std::min", "std::to_string",
  "std::stoi", "std::signal", "std::setw", "std::strerror",
  "size_t", "pid_t", "int8_t", "int16_t", "int32_t", "int64_t",
  "uint8_t", "uint16_t", "uint32_t", "uint64_t",
  "VaultDweller", "TerminalSession", "CommandProcessor", "BodyCondition", "Limb", "CommandHandler"
]);

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function highlightCpp(code) {
  // Manejo de raw string literals R"(...)" y comentarios multilínea
  const lines = code.split("\n");
  let inRawString = false;
  let inBlockComment = false;

  return lines.map(line => {
    let out = "";
    let i = 0;
    const n = line.length;

    if (inRawString) {
      const endIdx = line.indexOf(')"');
      if (endIdx !== -1) {
        out += `<span class="tok-string">${escapeHtml(line.slice(0, endIdx + 2))}</span>`;
        inRawString = false;
        i = endIdx + 2;
      } else {
        return `<span class="line tok-string">${escapeHtml(line)}</span>`;
      }
    }

    if (inBlockComment) {
      const endIdx = line.indexOf("*/");
      if (endIdx !== -1) {
        out += `<span class="tok-comment">${escapeHtml(line.slice(0, endIdx + 2))}</span>`;
        inBlockComment = false;
        i = endIdx + 2;
      } else {
        return `<span class="line tok-comment">${escapeHtml(line)}</span>`;
      }
    }

    while (i < n) {
      const ch = line[i];

      // Directivas del preprocesador (#include, #pragma, #define)
      if (i === 0 && ch === "#") {
        out += `<span class="tok-preproc">${escapeHtml(line)}</span>`;
        i = n;
        break;
      }

      // Comentario de una línea //
      if (ch === "/" && line[i + 1] === "/") {
        out += `<span class="tok-comment">${escapeHtml(line.slice(i))}</span>`;
        break;
      }

      // Inicio de comentario de bloque /*
      if (ch === "/" && line[i + 1] === "*") {
        const endIdx = line.indexOf("*/", i + 2);
        if (endIdx !== -1) {
          out += `<span class="tok-comment">${escapeHtml(line.slice(i, endIdx + 2))}</span>`;
          i = endIdx + 2;
        } else {
          out += `<span class="tok-comment">${escapeHtml(line.slice(i))}</span>`;
          inBlockComment = true;
          break;
        }
        continue;
      }

      // Raw String Literal: R"(...)"
      if (ch === "R" && line[i + 1] === '"' && line[i + 2] === "(") {
        const endIdx = line.indexOf(')"', i + 3);
        if (endIdx !== -1) {
          out += `<span class="tok-string">${escapeHtml(line.slice(i, endIdx + 2))}</span>`;
          i = endIdx + 2;
        } else {
          out += `<span class="tok-string">${escapeHtml(line.slice(i))}</span>`;
          inRawString = true;
          break;
        }
        continue;
      }

      // Cadenas normales "..."
      if (ch === '"') {
        let j = i + 1;
        while (j < n && line[j] !== '"') {
          if (line[j] === "\\") j++;
          j++;
        }
        j = Math.min(j + 1, n);
        out += `<span class="tok-string">${escapeHtml(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }

      // Caracteres 'c'
      if (ch === "'") {
        let j = i + 1;
        while (j < n && line[j] !== "'") {
          if (line[j] === "\\") j++;
          j++;
        }
        j = Math.min(j + 1, n);
        out += `<span class="tok-string">${escapeHtml(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }

      // Números (enteros, hexadecimales, flotantes)
      if (/[0-9]/.test(ch)) {
        let j = i;
        if (ch === "0" && (line[i + 1] === "x" || line[i + 1] === "X")) {
          j += 2;
          while (j < n && /[0-9a-fA-F]/.test(line[j])) j++;
        } else {
          while (j < n && /[0-9.]/.test(line[j])) j++;
        }
        out += `<span class="tok-number">${escapeHtml(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }

      // Identificadores, palabras clave y tipos
      if (/[A-Za-z_]/.test(ch)) {
        let j = i;
        // Permitir :: dentro de namespaces std::string, robco::...
        while (j < n && (/[A-Za-z0-9_]/.test(line[j]) || (line[j] === ":" && line[j + 1] === ":"))) {
          if (line[j] === ":") j += 2;
          else j++;
        }
        const word = line.slice(i, j);

        if (CPP_KEYWORDS.has(word)) {
          out += `<span class="tok-keyword">${escapeHtml(word)}</span>`;
        } else if (CPP_TYPES.has(word) || word.startsWith("std::") || /^[A-Z][a-zA-Z0-9_]*$/.test(word)) {
          out += `<span class="tok-type">${escapeHtml(word)}</span>`;
        } else if (line[j] === "(") {
          out += `<span class="tok-function">${escapeHtml(word)}</span>`;
        } else {
          out += escapeHtml(word);
        }
        i = j;
        continue;
      }

      // Operadores especiales C++
      if (ch === "-" && line[i + 1] === ">") {
        out += `<span class="tok-operator">-&gt;</span>`;
        i += 2;
        continue;
      }

      out += escapeHtml(ch);
      i++;
    }

    return `<span class="line">${out}</span>`;
  }).join("");
}

function highlightMakefile(code) {
  return code.split("\n").map(line => {
    const escaped = escapeHtml(line);
    if (/^\s*#/.test(line)) {
      return `<span class="line tok-comment">${escaped}</span>`;
    }
    // Variable assignment (CXX := g++)
    if (/^\s*[A-Z_]+\s*[:?+]?=/.test(line)) {
      const match = line.match(/^(\s*[A-Z_]+)(\s*[:?+]?=\s*)(.*)$/);
      if (match) {
        return `<span class="line"><span class="tok-type">${escapeHtml(match[1])}</span><span class="tok-operator">${escapeHtml(match[2])}</span><span class="tok-string">${escapeHtml(match[3])}</span></span>`;
      }
    }
    // Targets (all:, run:, clean:)
    if (/^[\w%. -]+:/.test(line)) {
      const parts = line.split(":");
      return `<span class="line"><span class="tok-function">${escapeHtml(parts[0])}</span>:<span class="tok-keyword">${escapeHtml(parts.slice(1).join(":"))}</span></span>`;
    }
    // Commands inside targets
    if (/^\t/.test(line)) {
      return `<span class="line tok-command">${escaped}</span>`;
    }
    return `<span class="line">${escaped}</span>`;
  }).join("");
}

function highlightShell(code) {
  return code
    .split("\n")
    .map((line) => {
      const escaped = escapeHtml(line);
      if (/^\s*#/.test(line)) {
        return `<span class="line tok-comment">${escaped}</span>`;
      }
      if (/^\$/.test(line)) {
        return `<span class="line"><span class="tok-prompt">$</span>${escaped.slice(1)}</span>`;
      }
      return `<span class="line">${escaped}</span>`;
    })
    .join("");
}

window.highlightCpp = highlightCpp;
window.highlightMakefile = highlightMakefile;
window.highlightShell = highlightShell;
window.escapeHtml = escapeHtml;
