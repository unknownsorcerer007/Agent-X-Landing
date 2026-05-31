# Technical Requirement Document (TRD)

| Metadata | Details |
|---|---|
| **Project Name** | Agent-X Marketing Hub Technical Architecture |
| **Version** | 2.0.0-Stable |
| **Status** | Approved / Released |
| **Last Updated** | 2026-05-31 |
| **Author** | Antigravity AI (Lead Engineer & Architect) |

---

## 1. System Architecture & Constraints

### 1.1 Serverless Deployment (GitHub Pages)
The entire marketing site is compiled as a static bundle. No active server-side execution runtime is present on the hosting stack.
* **Technology Stack**: Native HTML5, CSS3, ES6+ Javascript.
* **Directory Layout**:
  ```
  agentx-marketing-hub/
  ├── index.html         # Document entry & layout tree
  ├── style.css          # Styled UI tokens & styles
  ├── app.js             # Client simulation script logic
  ├── PRD.md             # Product specs
  ├── TRD.md             # Technical specs
  ├── FLOW.md            # Engine architectural flows
  └── SCHEMA.md          # Database schema specs
  ```

---

## 2. Style Sheet & Design Tokens

`style.css` contains all visual variables mapping to the dark space/cyberpunk design tokens:

```css
:root {
    --bg-color: #03050a;                  /* Deep dark space background */
    --card-bg: rgba(10, 15, 30, 0.5);      /* Transparent glass overlay */
    --card-border: rgba(0, 240, 255, 0.15);/* Neon cyan border grid */
    --text-primary: #e6ebf5;              /* Clean off-white primary */
    --text-secondary: #8e9bb4;            /* Muted slate text secondary */
    --accent-cyan: #00f0ff;               /* Neon cyan highlighting */
    --accent-purple: #9d4edd;             /* Electric purple highlights */
    --accent-green: #39ff14;              /* Success indicators & console logs */
    --accent-red: #ff3366;                /* Critical warning alerts */
    
    /* Font Loading Stack */
    --font-heading: 'Space Grotesk', system-ui, sans-serif;
    --font-body: 'Outfit', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    
    /* Animation Timing */
    --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
```

### 2.1 CSS Layout Rules
* **Bento Grid**: Uses CSS Grid configurations with fluid resizing layout metrics:
  ```css
  .bento-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 2rem;
  }
  ```
* **Backdrop Filters**: Transparent panels utilize CSS backdrop filter blurring for glassmorphism styling:
  ```css
  .bento-card {
      backdrop-filter: blur(10px);
      background: var(--card-bg);
      border: 1px solid var(--card-border);
  }
  ```

---

## 3. Client Javascript State Machine

The client scripting in `app.js` is structured into isolated modules initialized after the DOM is ready:

```javascript
document.addEventListener("DOMContentLoaded", () => {
    initTerminal();
    initCaptchaDemo();
    initComparisonTabs();
    initQuickStartTabs();
    initCopyButtons();
});
```

### 3.1 Terminal Simulation engine
The simulator operates on a state loop utilizing an async loop structure to type characters dynamically:
1. Load a targeting scenario (Target URL, active fake Proxy IP).
2. Type command inputs (simulated by letter index indexing with `setTimeout` intervals of `35ms`).
3. Print server startup outputs (`[SYSTEM] Booting...`).
4. Display Cloudflare turnstile challenge matching coordinate click sequences.
5. Format final extracted values as JSON blocks.
6. Sleep for `5000ms`, reset console, and switch scenarios.

### 3.2 Clipboard Integration
Commands are written into static arrays and copied using the standard `navigator.clipboard.writeText` API. Visual buttons update classes dynamically to change borders to green (`--accent-green`), updating text nodes to show confirmation indicators:
```javascript
navigator.clipboard.writeText(textToCopy).then(() => {
    btn.textContent = "Copied! ✓";
    btn.classList.add("copied");
});
```

---

## 4. Performance & Performance Budgets

To satisfy requirements for fast page loads:
* **Font Optimization**: Google fonts are fetched with `preconnect` link headers to pre-establish secure handshakes. Font family loads use the `&display=swap` parameter to prevent invisible text shifts.
* **Layout Shifts (CLS)**: Visual elements (like the terminal console container and code tabs) specify fixed dimensions or minimum heights (`min-height`) to prevent layout shifting during page loading.
* **Render Blocking**: Javascript scripts are placed at the very end of the `<body>` element (or loaded with `defer` attributes) to avoid blocking HTML parsing.

---

## 5. Deployment & Continuous Integration

* **GitHub Pages Config**: GitHub Pages is configured on the repository root directory (`/`) on the `main` branch.
* **Routing Strategy**: All internal navigation uses standard anchor hashes (e.g. `<a href="#features">`) to avoid Page-Not-Found (404) routing errors.
* **CNAME config**: Optional CNAME files can be written in the root directory to route traffic to custom domain addresses.
