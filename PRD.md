# Product Requirement Document (PRD)

| Metadata | Details |
|---|---|
| **Project Name** | Agent-X Marketing Hub & Landing Platform |
| **Version** | 2.0.0-Stable |
| **Status** | Approved / Released |
| **Last Updated** | 2026-05-31 |
| **Author** | Antigravity AI (Lead Engineer & Architect) |

---

## 1. Executive Summary & Objective

### 1.1 Context
In the modern web scraping and AI browser automation landscape, websites utilize complex anti-bot protection mechanisms (such as Cloudflare Managed Challenges, Datadome, Akamai, and Turnstile). Standard automation libraries (like default Playwright, Selenium, and Puppeteer) fail instantly because they expose automation indicators (e.g. `navigator.webdriver = true`) and carry un-spoofed TLS/BoringSSL handshakes.

### 1.2 Objective
The primary objective of the **Agent-X Marketing Hub** is to design and deploy a premium, open-source landing page that visually demonstrates Agent-X's capabilities to bypass these constraints. The website must attract developer interest, provide complete technical transparency, and convert visitors into active users of the primary [Agent-X repository](https://github.com/unknownsorcerer007/Agent-X).

### 1.3 Scope
* **In-Scope**: A fully responsive static frontend landing page hosted on GitHub Pages, containing an interactive live sandbox scraper simulator, feature bento grids, visual browser-vs-stealth comparisons, tabbed installation configurations, and comprehensive technical documentation.
* **Out-of-Scope**: Active server-side execution of web scraping directly on GitHub Pages (which is client-side only). Instead, we use client-side simulation wrappers that exactly mimic real-world Agent-X inputs, CLI outputs, and JSON extraction logs.

---

## 2. Target Audience & User Personas

The marketing platform targets the following user profiles:

### 2.1 Developer Personas

| Persona | Core Pain Point | Primary Goal | How Agent-X Helps |
|---|---|---|---|
| **AI Integration Engineer** | AI models (LLMs) cannot browse live webpages to retrieve up-to-date data without getting blocked by Cloudflare. | Connect LLMs to the live web via standardized Model Context Protocol (MCP) or SSE ports. | Exposes standard MCP tools (`browser_navigate`, `browser_get_content`) that run under stealth. |
| **Web Scraping Specialist** | High cost of paid proxy rotation services and Anti-Captcha / 2Captcha API keys. | Build scalable, cost-efficient crawlers that run locally. | Dual-solver engine uses local offline `ddddocr` and local Vision LLMs to solve grids/challenges for free. |
| **Security / DevSecOps** | Vulnerability scanning tools get blocked or rate-limited by target WAF networks. | Conduct automated XSS, SQLi, and sensitive data leakage scans on internal/external products. | Bypasses rate limits using stealth routing, human-mimicking scroll paths, and proxy shielding. |

---

## 3. Feature Specifications

The landing page features must be divided into specific, interactive components:

### 3.1 Hero Scraper Sandbox Widget
* **Description**: A visual mockup browser container that serves as the hero element.
* **User Flow**:
  1. User enters a URL (e.g. `https://protected-site.com/data`) in the mockup search bar.
  2. User clicks "Test Scraper".
  3. The mockup browser starts a visual scraping simulation:
     - Shows a "Navigating..." loader.
     - Displays "Bypassing WAF / Managed Challenge...".
     - Triggers a simulated interactive grid captcha solver (lines drawing coordinates, selecting cells).
     - Logs real-time terminal operations on a side panel (e.g. `[PROXY] Rotating IP`, `[STEALTH] navigator.webdriver patched`).
     - Renders a final success checkmark and displays formatted, colored extracted JSON data.

### 3.2 Feature Bento Grid
A responsive grid showing the core modules of Agent-X:
* **Stealth redirection**: Explaining modular namespace aliasing (`playwright` -> `patchright`).
* **SQLite Lock immunity**: Detailing connection timeout values (`30.0s`) to bypass concurrent sqlite locks.
* **Dual CAPTCHA Solver**: Interactive visual grid showing offline `ddddocr` segmentations combined with Vision API coordinate conversions.
* **Proxy Shield**: Detailing local IP exposure warnings and integration of residential proxies.

### 3.3 Dynamic Comparative Analysis
* Tabbed components displaying the detailed runtime environment differences:
  - **Standard Playwright**: Blocked alerts, `navigator.webdriver = true`, standard user-agents, empty plugins.
  - **Agent-X (Patchright)**: Bypassed status, `navigator.webdriver = undefined`, rotated client-hints, WebRTC IP masking, canvas/audio noise filters.

### 3.4 Command Installation Panel
* Interactive code tabs for **Windows (PowerShell)**, **Docker Compose**, and **Linux/MacOS (Bash)**.
* Includes one-click copy buttons that update to "Copied! ✓" and revert after a delay.

---

## 4. Non-Functional Requirements

### 4.1 Page Load Speed (Performance)
* The page must achieve a Lighthouse Performance score of **95+**.
* Minimize large library dependencies; styling must use pure CSS variables, and logic must use vanilla ES6 JavaScript.
* Defer web fonts loading and optimize vector paths.

### 4.2 Aesthetics & User Experience (UX)
* **Design Archetype**: Premium Developer Core (similar to Vercel/Linear). Deep night-blue backgrounds (`#03050a`), neon cyan indicators (`#00f0ff`), subtle glassmorphic blurs (`backdrop-filter: blur(12px)`), and radial glow lights.
* **No AI Clichés**: Avoid boring stock vector illustrations, generic dashboard screenshots with placeholders, or standard templates.
* **Mobile Responsiveness**: Must support viewport scaling down to 320px with custom flex wrap-arounds and collapsible grid elements.

### 4.3 Accessibility (a11y)
* Contrast ratios for all text elements must satisfy **WCAG 2.1 AA** guidelines (minimum 4.5:1 ratio).
* Focus indicators must be clearly visible for keyboard navigation.
* Interactive inputs must contain accessible descriptors (`aria-label`, `aria-describedby`).

---

## 5. SEO & Copywriting Strategy

### 5.1 Semantic Document Structure
The site layout must follow strict HTML5 semantic standards:
* A single `<h1>` tag containing target search keywords.
* Subsections nested inside `<section>` elements with appropriate `<h2>` and `<h3>` tags.
* Footer references inside `<footer>`.

### 5.2 SEO Metadata
```html
<title>Agent-X — Open Source Stealth AI Browser Engine</title>
<meta name="description" content="Bypass WAF blocks, solve captchas offline, and connect LLMs directly to the live web via standard MCP/SSE servers using Agent-X.">
```

### 5.3 OpenGraph and Rich Snippets
Structured Schema.org markup must be embedded in the header to ensure search engines parse the product type, repository URL, and installation commands correctly.

---

## 6. Key Performance Indicators (KPIs)

To measure the effectiveness of this marketing landing page, we track:
* **Traffic Acquisition**: Daily unique visitors and referral source channels.
* **Engagement Time**: Average time spent interacting with the Scraper Sandbox widget.
* **Conversion Rate**: Percentage of users clicking the GitHub primary CTAs ("Star on GitHub", "Clone Repository").
* **Developer Onboarding**: Percentage of users copying the Quick-Start terminal commands.
