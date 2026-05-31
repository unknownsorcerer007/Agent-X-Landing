# Architecture & Process Flow

This document details the internal runtime flows of the **Agent-X Browser Engine**, explaining how different components (Stealth, Proxies, CAPTCHA Solvers, and Database layers) coordinate during execution.

---

## 1. Browser Core Initialization Flow

The sequence below illustrates how Agent-X boots up, selects browser profiles, applies TLS configurations, and attaches stealth parameters:

```
[Agent-X Startup]
       │
       ▼
[Read .env Variables] (Includes Proxy, Port, Keys)
       │
       ▼
[Load Database Context] (SQLite with timeout=30.0s)
       │
       ▼
[Select Browser Profile] (Randomly selects one of 12 profiles)
       │
       ▼
[Apply Custom Arguments] (Disables AutomationControlled, sets window size)
       │
       ▼
[Initialize Proxy Config] (Check Proxy Pool / Paid Proxy Url)
       │
       ▼
[Launch Chromium (Patchright)]
       │
       ▼
[Establish Context] (Inject User-Agent, Locales, Viewports)
       │
       ▼
[CDP Stealth & GodMode Script Injection]
       │
       ▼
[Apply TLS Impersonation] (BoringSSL handshake spoofing)
       │
       ▼
[Browser Ready for Commands]
```

---

## 2. Dynamic CAPTCHA Solver Flow

When navigating to a webpage protected by anti-bot barriers (such as Cloudflare Turnstile or traditional image grids), Agent-X executes the following bypass loop:

```
                  [Navigate to Page]
                          │
                          ▼
             [Captcha Detected on DOM?]
                    /          \
                 YES            NO (Scrape Data)
                  /              
                 ▼
     [Capture Element Screenshot]
                 │
                 ▼
      [Identify Challenge Type]
       /                     \
  [Simple Image]         [Interactive Grid]
       /                       \
      ▼                         ▼
[Run local ddddocr]       [Send to Vision API]
      │                         │
      ▼                         ▼
[Extract Text String]     [Retrieve Match Grid Cells]
      │                         │
      ▼                         ▼
[Type Value to Input]     [Compute Click Coordinates]
      │                         │
      └───────────┬─────────────┘
                  │
                  ▼
   [Apply HumanMimicry mouse paths]
                  │
                  ▼
       [Trigger Click Elements]
                  │
                  ▼
       [Challenge Solved?]
          /          \
       YES            NO (Failover / Firefox Engine)
        /              \
       ▼                ▼
[Cache Clearance Cookie] [Relaunch Session]
```

---

## 3. Database Concurrency Flow (SQLite Lock Safety)

To prevent database-locked failures during concurrent asynchronous tasks, Agent-X wraps database transactions in a retry/timeout sequence:

```
         [Multiple API Requests Received]
                        │
         ┌──────────────┴──────────────┐
         ▼                             ▼
   [Worker Thread 1]             [Worker Thread 2]
         │                             │
   [Try DB Write]                [Try DB Write]
         │                             │
    (Acquires Lock)              (Locked out!)
         │                             │
         │                      [Evaluate Timeout]
         │                       /            \
         │                     < 30s          >= 30s
         │                     /                \
         │             (Wait & Retry)      (Raise Error)
         │                     │
   [Write Finished]            │
   (Release Lock) ◄────────────┘
```
* **Engine Settings**: By specifying `connect_args={"timeout": 30.0}`, SQLite blocks execution threads and waits up to 30 seconds for existing locks to clear instead of throwing immediate lock exceptions.
