// Interactive Script for Agent-X Marketing Hub

document.addEventListener("DOMContentLoaded", () => {
    initTerminal();
    initCaptchaDemo();
    initComparisonTabs();
    initQuickStartTabs();
    initCopyButtons();
    initAnalyticsTracking();
});

// ==========================================
// 1. Simulated Interactive Terminal Script
// ==========================================
const TERMINAL_SCENARIOS = [
    {
        target: "https://www.target-store.com/offers",
        proxy: "185.220.101.42:3128 [US - New York]",
        steps: [
            { text: "python main.py --headed --mcp-port 8001", type: "input" },
            { text: "[SYSTEM] Booting Agent-X Stealth Core Server...", type: "info" },
            { text: "[DATABASE] Connected to agent_os.db (timeout=30.0s locked-safe)", type: "success" },
            { text: "[STEALTH] Aliasing standard Playwright calls to Patchright namespace", type: "success" },
            { text: "[PROXY] Shielding Local IP... Loaded residential pool. Active: 185.220.101.42", type: "info" },
            { text: "[BROWSER] Launching Stealth Chromium Headless Engine (BoringSSL TLS spoofed)", type: "success" },
            { text: "[BROWSER] Navigating to https://www.target-store.com/offers", type: "info" },
            { text: "[WAF] Cloudflare Managed Challenge Detected! Initializing bypass engine...", type: "warning" },
            { text: "[STEALTH] Applying GodMode CDP Injector...", type: "success" },
            { text: "[HUMAN] Mimicking mouse hover coordinates (X: 142, Y: 382) with random jitter", type: "info" },
            { text: "[CAPTCHA] Local Solver (ddddocr) scanning image challenges...", type: "info" },
            { text: "[CAPTCHA] Success: Text match found: 'x8f7a'. Injecting input...", type: "success" },
            { text: "[WAF] Challenge solved! Cloudflare clearance cookie cached successfully.", type: "success" },
            { text: "[BROWSER] Page fully loaded. Executing DOM extractor 'page-structured'...", type: "info" },
            { text: "[RESULT] Extracted 42 items. Status Code: 200", type: "success" },
            { text: "{\n  \"status\": \"success\",\n  \"data\": [\n    { \"id\": 1, \"item\": \"MacBook Air\", \"price\": \"$999\" },\n    { \"id\": 2, \"item\": \"iPad Pro\", \"price\": \"$799\" }\n  ]\n}", type: "success" }
        ]
    },
    {
        target: "https://github.com/login",
        proxy: "192.168.1.1 [LOCAL IP - SAFETY WARNING]",
        steps: [
            { text: "python main.py --setup", type: "input" },
            { text: "[SETUP] Launching Interactive Setup Wizard...", type: "info" },
            { text: "[WARNING] Running browser on Local IP (No proxy configured). Bot detection risk HIGH.", type: "warning" },
            { text: "[BROWSER] Navigating to https://github.com/login", type: "info" },
            { text: "[AUTH] Fetching encrypted credentials for domain 'github.com'...", type: "info" },
            { text: "[AUTH] AES-256 Decryption successful for user: dev-admin", type: "success" },
            { text: "[BROWSER] Injecting credentials & mimicking keyboard keystroke speeds...", type: "success" },
            { text: "[BROWSER] Submitting form...", type: "info" },
            { text: "[SUCCESS] Login complete. Session cookies written to default.enc", type: "success" }
        ]
    }
];

async function initTerminal() {
    const screen = document.getElementById("terminal-screen");
    if (!screen) return;

    let scenarioIndex = 0;

    while (true) {
        screen.innerHTML = "";
        const scenario = TERMINAL_SCENARIOS[scenarioIndex];
        
        for (const step of scenario.steps) {
            const line = document.createElement("div");
            line.className = "terminal-line";
            
            if (step.type === "input") {
                line.innerHTML = `<span class="t-prompt">$</span> `;
                screen.appendChild(line);
                
                // Type character by character for prompt simulation
                for (let i = 0; i < step.text.length; i++) {
                    line.innerHTML += step.text[i];
                    await sleep(35);
                }
            } else {
                line.textContent = step.text;
                // Add styling class
                if (step.type === "info") line.className += " t-info";
                else if (step.type === "success") line.className += " t-success";
                else if (step.type === "warning") line.className += " t-warning";
                else if (step.type === "error") line.className += " t-error";
                
                // Format multi-line JSON cleanly
                if (step.text.startsWith("{")) {
                    line.style.whiteSpace = "pre";
                }
                
                screen.appendChild(line);
                await sleep(step.text.startsWith("{") ? 800 : 250);
            }
            
            // Auto scroll to bottom
            screen.scrollTop = screen.scrollHeight;
            await sleep(150);
        }
        
        // Wait before starting the next scenario loop
        await sleep(5000);
        scenarioIndex = (scenarioIndex + 1) % TERMINAL_SCENARIOS.length;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ==========================================
// 2. Interactive CAPTCHA Demo Animation
// ==========================================
function initCaptchaDemo() {
    const cells = document.querySelectorAll(".grid-cell");
    const logs = document.querySelector(".captcha-logs");
    if (cells.length === 0 || !logs) return;

    let cycle = 0;

    setInterval(() => {
        if (cycle === 0) {
            // Reset
            cells.forEach(c => c.classList.remove("select-active"));
            logs.innerHTML = '<div class="cap-line">> Captcha detected. Processing...</div>';
            
            setTimeout(() => {
                logs.innerHTML += '<div class="cap-line">> Analyzing image features (Vision ML)...</div>';
            }, 800);

            cycle = 1;
        } else if (cycle === 1) {
            // Select Grid Cells
            cells[1].classList.add("select-active");
            logs.innerHTML += '<div class="cap-line">> Selecting coordinate cell #2...</div>';
            
            setTimeout(() => {
                cells[3].classList.add("select-active");
                logs.innerHTML += '<div class="cap-line">> Selecting coordinate cell #4...</div>';
            }, 500);
            
            cycle = 2;
        } else {
            // Verify
            setTimeout(() => {
                logs.innerHTML += '<div class="cap-line success">> Solutions matched. Clicking bypass...</div>';
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

            // Telemetry trigger mock log
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
// 6. Analytics & Referral Telemetry Mocking
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
    
    // Log telemetry parameters to show how we track conversion campaigns
    console.info("[TELEMETRY] Logging conversion event:", payload);
    
    // In a live server scenario, we would trigger an anonymous fetch call:
    // fetch("https://analytics.agentx.dev/api/v1/event", {
    //     method: "POST",
    //     body: JSON.stringify(payload),
    //     headers: { "Content-Type": "application/json" }
    // }).catch(() => {});
}
