# Telemetry Database Schema

This document details the relational database schema designed to track campaigns, referrals, and user onboarding metrics for the **Agent-X Marketing Hub**. It includes ASCII ER diagrams, SQL schema creation scripts, indexes, and analytical queries.

---

## 1. Relational ER Diagram

```
   ┌────────────────┐            ┌─────────────────┐
   │    visitors    │            │   page_views    │
   ├────────────────┤            ├─────────────────┤
   │ visitor_id PK  │1──────────*│ view_id PK      │
   │ ip_hash        │            │ visitor_id FK   │
   │ user_agent     │            │ path            │
   │ country        │            │ utm_source      │
   │ referrer_domain│            │ utm_medium      │
   │ created_at     │            │ utm_campaign    │
   └───────┬────────┘            │ viewed_at       │
           │                     └─────────────────┘
           │ 1
           │
           │ *
   ┌───────▼────────┐            ┌─────────────────┐
   │  click_events  │            │   cta_buttons   │
   ├────────────────┤            ├─────────────────┤
   │ event_id PK    │            │ cta_id PK       │
   │ visitor_id FK  │*──────────1│ element_id      │
   │ cta_id FK      │            │ label           │
   │ time_on_page   │            │ target_url      │
   │ clicked_at     │            └─────────────────┘
   └────────────────┘
```

---

## 2. Table Creation Scripts (PostgreSQL)

Below are the SQL statements required to initialize the database tables, complete with foreign keys, constraints, and cascading rules.

```sql
-- Enable UUID extension if not already present
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table 1: Visitors
-- Stores unique user metadata
CREATE TABLE visitors (
    visitor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_hash VARCHAR(64) NOT NULL, -- SHA256 hashed IP for GDPR compliance
    user_agent TEXT,
    country VARCHAR(10),
    referrer_domain TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table 2: Page Views
-- Tracks paths visited by users along with UTM campaign parameters
CREATE TABLE page_views (
    view_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id UUID NOT NULL REFERENCES visitors(visitor_id) ON DELETE CASCADE,
    path VARCHAR(255) NOT NULL,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table 3: CTA Buttons
-- Catalog of all Call-To-Action (CTA) elements mapped on the landing page
CREATE TABLE cta_buttons (
    cta_id SERIAL PRIMARY KEY,
    element_id VARCHAR(100) UNIQUE NOT NULL,
    label VARCHAR(100) NOT NULL,
    target_url TEXT NOT NULL
);

-- Table 4: Click Events
-- Logs when a user clicks a registered CTA element
CREATE TABLE click_events (
    event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id UUID NOT NULL REFERENCES visitors(visitor_id) ON DELETE CASCADE,
    cta_id INT NOT NULL REFERENCES cta_buttons(cta_id) ON DELETE RESTRICT,
    time_on_page_seconds INT,
    clicked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Database Indexes

Adding performance indexes is critical for fast retrieval of page analytics over large volumes of telemetry data:

```sql
-- Index on visitors creation for monthly report sorting
CREATE INDEX idx_visitors_created_at ON visitors(created_at DESC);

-- Index on page_views to quickly find campaign conversions
CREATE INDEX idx_page_views_campaign ON page_views(utm_source, utm_campaign);

-- Composite index to optimize visitor flow audits
CREATE INDEX idx_page_views_visitor ON page_views(visitor_id, viewed_at DESC);

-- Index on click_events to aggregate CTA popularity
CREATE INDEX idx_click_events_cta ON click_events(cta_id, clicked_at DESC);
```

---

## 4. Common Operational Queries

Below are typical SQL queries used to calculate landing page performance metrics.

### 4.1 Seed Tracking Definitions
Populate the database with the tracking elements mapped in the landing page HTML structure:
```sql
INSERT INTO cta_buttons (element_id, label, target_url) VALUES
('cta_header_github', 'Star on GitHub (Header)', 'https://github.com/unknownsorcerer007/Agent-X'),
('cta_hero_github', 'Clone Repository (Hero)', 'https://github.com/unknownsorcerer007/Agent-X'),
('cta_quickstart_docker', 'Copy Docker Run (Quickstart)', 'https://github.com/unknownsorcerer007/Agent-X#quick-start'),
('cta_quickstart_manual', 'Copy Manual Install (Quickstart)', 'https://github.com/unknownsorcerer007/Agent-X#manual-installation'),
('cta_footer_github', 'Star Agent-X (Footer)', 'https://github.com/unknownsorcerer007/Agent-X')
ON CONFLICT (element_id) DO NOTHING;
```

### 4.2 Overall Conversion Rate Calculation
Tracks what percentage of unique visitors clicked at least one CTA:
```sql
SELECT 
    COUNT(DISTINCT v.visitor_id) as total_visitors,
    COUNT(DISTINCT c.visitor_id) as converting_visitors,
    ROUND(
        (COUNT(DISTINCT c.visitor_id)::NUMERIC / COUNT(DISTINCT v.visitor_id)::NUMERIC) * 100, 
        2
    ) as overall_conversion_rate_percentage
FROM visitors v
LEFT JOIN click_events c ON v.visitor_id = c.visitor_id;
```

### 4.3 UTM Campaign Conversion Breakdown
Measures which campaign drives the highest number of conversions:
```sql
SELECT 
    pv.utm_source,
    pv.utm_campaign,
    COUNT(DISTINCT pv.visitor_id) as unique_clicks,
    COUNT(DISTINCT ce.visitor_id) as distinct_conversions,
    ROUND(
        (COUNT(DISTINCT ce.visitor_id)::NUMERIC / COUNT(DISTINCT pv.visitor_id)::NUMERIC) * 100,
        2
    ) as campaign_conversion_rate
FROM page_views pv
LEFT JOIN click_events ce ON pv.visitor_id = ce.visitor_id
WHERE pv.utm_source IS NOT NULL
GROUP BY pv.utm_source, pv.utm_campaign
ORDER BY distinct_conversions DESC;
```

### 4.4 Popularity of Individual CTA elements
Tracks which buttons convert most frequently:
```sql
SELECT 
    b.label,
    b.element_id,
    COUNT(e.event_id) as total_clicks
FROM cta_buttons b
LEFT JOIN click_events e ON b.cta_id = e.cta_id
GROUP BY b.cta_id, b.label, b.element_id
ORDER BY total_clicks DESC;
```
