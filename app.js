// Modern Scripting for Agent-X Marketing Hub

document.addEventListener("DOMContentLoaded", () => {
    initSandbox();
    initCaptchaDemo();
    initComparisonTabs();
    initQuickStartTabs();
    initCopyButtons();
    initAnalyticsTracking();
});

// ==========================================
// 1. Scraper Sandbox Simulator
// ==========================================
function initSandbox() {
    const btnScrape = document.getElementById("btn-sandbox-scrape");
    const inputUrl = document.getElementById("sandbox-url");
    const viewport = document.getElementById("viewport-screen");
    const consoleLogs = document.getElementById("sandbox-console-logs");
    const btnClear = document.getElementById("btn-clear-console");

    if (!btnScrape || !inputUrl || !viewport || !consoleLogs) return;

    // Clear console logs
    if (btnClear) {
        btnClear.addEventListener("click", () => {
            consoleLogs.innerHTML = '<div class="con-line text-muted">// Console logs cleared. Ready...</div>';
        });
    }

    btnScrape.addEventListener("click", async () => {
        // Prevent double click
        btnScrape.disabled = true;
        inputUrl.disabled = true;
        const targetUrl = inputUrl.value.trim() || "https://example.com";

        // Initial Reset
        consoleLogs.innerHTML = "";
        
        // --- 1. Navigation Phase ---
        writeLog(consoleLogs, `[BOOT] Initiating Agent-X stealth worker...`, "info");
        await sleep(400);
        writeLog(consoleLogs, `[DATABASE] Read-Lock verify on agent_os.db: OK`, "success");
        await sleep(300);
        writeLog(consoleLogs, `[PROXY] Shielding Local IP... Geolocation cache: valid`, "info");
        await sleep(300);
        
        // Random proxy IP
        const randomIP = `185.${randInt(10, 250)}.${randInt(1, 254)}.${randInt(1, 254)}`;
        writeLog(consoleLogs, `[PROXY] Rotating IP... Connected to: ${randomIP}:3128 [US-West residential]`, "success");
        await sleep(500);
        
        writeLog(consoleLogs, `[BROWSER] Launching Patchright Chromium browser context...`, "info");
        await sleep(400);
        writeLog(consoleLogs, `[STEALTH] navigator.webdriver patched to undefined`, "success");
        writeLog(consoleLogs, `[STEALTH] Audio & Canvas WebGL fingerprint signatures randomized`, "success");
        await sleep(400);

        // Update Viewport to Navigating Loader
        viewport.innerHTML = `
            <div class="scrape-simulation-wrapper">
                <div class="sim-loader">
                    <div class="spinner"></div>
                    <div class="sim-loading-title">Navigating...</div>
                    <div class="sim-loading-desc">${targetUrl}</div>
                </div>
            </div>
        `;
        writeLog(consoleLogs, `[BROWSER] Connecting to: ${targetUrl}`, "info");
        await sleep(1500);

        // --- 2. Challenge / WAF Bypass Phase ---
        writeLog(consoleLogs, `[WAF] Cloudflare Turnstile Challenge Detected!`, "warning");
        await sleep(400);
        writeLog(consoleLogs, `[STEALTH] Applying GodMode CDP Script Injectors...`, "success");
        await sleep(300);
        writeLog(consoleLogs, `[HUMAN] Computing mouse vector paths...`, "info");

        // Render Cloudflare check challenge in Viewport
        viewport.innerHTML = `
            <div class="scrape-simulation-wrapper">
                <div class="waf-challenge-box">
                    <div class="waf-logo">Cloudflare</div>
                    <div class="waf-title">Verifying your browser...</div>
                    <div class="waf-desc">Please check the box below to verify you are human.</div>
                    
                    <div class="waf-interactive-checkbox" id="waf-checkbox">
                        <div class="check-ring" id="waf-ring"></div>
                        <div class="check-label">I am human</div>
                        <!-- Simulated Cursor -->
                        <div class="cursor-pointer-sim" id="sim-cursor"></div>
                    </div>
                </div>
            </div>
        `;
        await sleep(600);

        // Run cursor mouse mimicry animation
        const cursor = document.getElementById("sim-cursor");
        const checkbox = document.getElementById("waf-checkbox");
        const ring = document.getElementById("waf-ring");

        if (cursor && checkbox && ring) {
            // Mouse pointer animation coords
            cursor.style.top = "-80px";
            cursor.style.left = "-180px";
            cursor.style.opacity = "1";
            await sleep(200);

            // Move cursor to checkbox coordinates smoothly
            cursor.style.top = "12px";
            cursor.style.left = "18px";
            writeLog(consoleLogs, `[HUMAN] Mouse trace path: cursor moving to coordinates (168, 240)`, "info");
            await sleep(1300);

            // Click action
            cursor.style.transform = "scale(0.85)";
            ring.style.borderColor = "var(--accent-cyan)";
            ring.style.background = "rgba(0, 240, 255, 0.1)";
            await sleep(150);
            cursor.style.transform = "none";
            
            // Checkmark verified
            ring.style.borderColor = "var(--accent-green)";
            ring.style.background = "rgba(57, 255, 20, 0.1)";
            ring.innerHTML = `<span style="color: var(--accent-green); font-size: 0.8rem; font-weight: bold;">✓</span>`;
            
            writeLog(consoleLogs, `[CAPTCHA] Simulated click registered. Challenge verified.`, "success");
            await sleep(400);
            writeLog(consoleLogs, `[WAF] Cookie cf_clearance cached. Bypass complete in 2.15s.`, "success");
        }
        await sleep(1000);

        // --- 3. Scrape Success & Output Phase ---
        writeLog(consoleLogs, `[BROWSER] Page DOM fully parsed. Scraping data fields...`, "info");
        await sleep(600);
        writeLog(consoleLogs, `[RESULT] Extracted reviews & structured parameters. Success (Code 200)`, "success");

        // Format Date
        const dateStr = new Date().toISOString();
        const mockJSON = {
            status: "success",
            target_url: targetUrl,
            scraped_at: dateStr,
            proxy_routing: `${randomIP}:3128`,
            security_bypass: "Cloudflare Turnstile",
            page_data: {
                title: "Agent-X Developer Reviews",
                rating: "4.95 / 5.00",
                source: "G2 Review Platform",
                extracted_reviews: [
                    { reviewer: "alex_dev_99", comment: "The Patchright engine is flawless. Bypassed Cloudflare turnstile instantly.", stars: 5 },
                    { reviewer: "scraping_lead", comment: "We migrated our scrapers from Selenium to Agent-X. Server load dropped by 40% and zero write lock failures.", stars: 5 }
                ]
            }
        };

        // Render json output inside viewport
        viewport.innerHTML = `
            <div class="json-result-pane">
                <div class="json-header">
                    <span>OUTPUT DATA EXTRACT</span>
                    <span>JSON FORMAT</span>
                </div>
                <pre><code style="color: #52b788;">${JSON.stringify(mockJSON, null, 2)}</code></pre>
            </div>
        `;

        writeLog(consoleLogs, `[SYSTEM] Browser worker context closed. Idle.`, "info");

        // Enable inputs back
        btnScrape.disabled = false;
        inputUrl.disabled = false;
    });
}

function writeLog(container, text, type) {
    const line = document.createElement("div");
    line.className = "con-line";
    
    if (type === "info") line.className += " con-info";
    else if (type === "success") line.className += " con-success";
    else if (type === "warning") line.className += " con-warning";
    else if (type === "error") line.className += " con-error";

    line.textContent = text;
    container.appendChild(line);
    container.scrollTop = container.scrollHeight;
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ==========================================
// 2. Interactive CAPTCHA Demo Loop
// ==========================================
function initCaptchaDemo() {
    const cells = document.querySelectorAll(".grid-cell");
    const logs = document.querySelector(".captcha-logs");
    if (cells.length === 0 || !logs) return;

    let cycle = 0;

    setInterval(() => {
        if (cycle === 0) {
            cells.forEach(c => c.classList.remove("select-active"));
            logs.innerHTML = '<div class="cap-line">> Captcha challenge detected. Processing...</div>';
            
            setTimeout(() => {
                logs.innerHTML += '<div class="cap-line">> Analyzing image features (Vision ML)...</div>';
            }, 800);

            cycle = 1;
        } else if (cycle === 1) {
            cells[1].classList.add("select-active");
            logs.innerHTML += '<div class="cap-line">> Selecting coordinate cell #2...</div>';
            
            setTimeout(() => {
                cells[3].classList.add("select-active");
                logs.innerHTML += '<div class="cap-line">> Selecting coordinate cell #4...</div>';
            }, 500);
            
            cycle = 2;
        } else {
            setTimeout(() => {
                logs.innerHTML += '<div class="cap-line success">> Solutions matched cell grids (2, 4). Clicking (142, 385)...</div>';
            }, 400);

            setTimeout(() => {
                logs.innerHTML += '<div class="cap-line success">> Challenge bypassed!</div>';
            }, 1000);

            cycle = 0;
        }
    }, 3000);
}

// ==========================================
// 3. Playwright vs Patchright Tabs
// ==========================================
function initComparisonTabs() {
    const tabs = document.querySelectorAll(".comp-tab");
    const panels = document.querySelectorAll(".comparison-panel");
    if (tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            panels.forEach(p => p.classList.remove("active"));

            tab.classList.add("active");
            const type = tab.getAttribute("data-type");
            document.getElementById(`panel-${type}`).classList.add("active");
        });
    });
}

// ==========================================
// 4. Quick Start Onboarding Tabs
// ==========================================
function initQuickStartTabs() {
    const btns = document.querySelectorAll(".tab-btn");
    const panes = document.querySelectorAll(".tab-pane");
    if (btns.length === 0) return;

    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            btns.forEach(b => b.classList.remove("active"));
            panes.forEach(p => p.classList.remove("active"));

            btn.classList.add("active");
            const tabName = btn.getAttribute("data-tab");
            document.getElementById(`tab-${tabName}`).classList.add("active");
        });
    });
}

// ==========================================
// 5. Copy-To-Clipboard Script Buttons
// ==========================================
function initCopyButtons() {
    setupCopyAction("btn-copy-win", "Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/unknownsorcerer007/Agent-X/main/install.ps1'))");
    setupCopyAction("btn-copy-docker", "docker compose up -d");
    setupCopyAction("btn-copy-linux", "curl -sSL https://raw.githubusercontent.com/unknownsorcerer007/Agent-X/main/setup.sh | bash");
}

function setupCopyAction(btnId, textToCopy) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    btn.addEventListener("click", () => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = btn.textContent;
            btn.textContent = "Copied! ✓";
            btn.classList.add("copied");

            trackClick("copy_quickstart", btnId);

            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove("copied");
            }, 2500);
        }).catch(err => {
            console.error("Failed to copy command text: ", err);
        });
    });
}

// ==========================================
// 6. Analytics & Referral Telemetry Tracking
// ==========================================
function initAnalyticsTracking() {
    const ctas = [
        { id: "cta_header_github", name: "header_github_star" },
        { id: "cta_hero_github", name: "hero_github_clone" },
        { id: "cta_banner_github", name: "banner_github_star" }
    ];

    ctas.forEach(cta => {
        const el = document.getElementById(cta.id);
        if (el) {
            el.addEventListener("click", () => {
                trackClick("cta_button_click", cta.name);
            });
        }
    });
}

function trackClick(eventType, elementId) {
    const payload = {
        event: eventType,
        element: elementId,
        referrer: document.referrer || "direct",
        timestamp: new Date().toISOString(),
        url: window.location.href
    };
    
    console.info("[TELEMETRY] Logging conversion event:", payload);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
