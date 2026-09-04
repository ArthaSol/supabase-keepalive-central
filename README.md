# Supabase Keep-Alive Central Manager 🚀

This repository handles automated write heartbeats to prevent multiple Supabase Free Tier databases from automatically pausing.

---

## 📊 Tracked Supabase Projects Inventory

| # | App / Project Name | Supabase Subdomain / Ref | Account Login Email | Ownership & Access | GitHub Secret Name | Status |
|---|-------------------|--------------------------|----------------------|-------------------|--------------------|--------|
| **1** | **SriVenkateswara** | `pwgeppfxgxdpgzfoulfn` | `mbhargava.c@gmail.com` | **Self Owned** | `PWGEPPFXGXDPGZFOULFN_SERVICE_ROLE` | 🟢 Active |
| **2** | **Srini_New** *(Srinivasam)* | `audmwkalkloomrltijop` | `bhargav.madhun1@gmail.com` | **Self Owned** | `AUDMWKALKLOOMRLTIJOP_SERVICE_ROLE` | 🟢 Active |
| **3** | **Sangam** *(BSA)* | `lbegyddwuysusivvjvxy` | `bhargav.madhun1@gmail.com` | **Self Owned** | `LBEGYDDWUYSUSIVVJVXY_SERVICE_ROLE` | 🟢 Active |
| **4** | **Anjaneyam App** | `dydrioldiibdhzkliscz` | `bhargav.madhun1@gmail.com` | **Shared** *(Owner: `bhargava.madhunapantula@gmail.com`)* | `DYDRIOLDIIBDHZKLISCZ_SERVICE_ROLE` | 🟢 Active |
| **5** | **Durga** | `uxcanmlpenlwvedboyga` | `bhargav.madhun1@gmail.com` | **Shared** *(Owner: `bhargava.madhunapantula@gmail.com`)* | `UXCANMLPENLWVEDBOYGA_SERVICE_ROLE` | 🟢 Active |
| **6** | **SriAnjaneyam** | `yzmmxjaozqziqoyrehjr` | `mbhargava.c@gmail.com` | **Self Owned** | `YZMMXJAOZQZIQOYREHJR_SERVICE_ROLE` | 🟢 Active |

---

## 🛠️ Step-by-Step Setup for Adding a New Database

To add a new Supabase project to this manager:

### 1. Create the Heartbeat Table
Run this SQL script in your Supabase SQL Editor for the target project:
```sql
CREATE TABLE IF NOT EXISTS public.heartbeat (
    id bigint PRIMARY KEY DEFAULT 1,
    last_ping timestamptz DEFAULT now()
);
INSERT INTO public.heartbeat (id, last_ping) VALUES (1, now()) ON CONFLICT (id) DO NOTHING;
ALTER TABLE public.heartbeat ENABLE ROW LEVEL SECURITY;
```

### 2. Copy the Service Role Key
Copy the `service_role / secret` key from your Supabase Dashboard (*Project Settings ➔ API*).

### 3. Add GitHub Repository Secret
Go to this repository's **Settings ➔ Secrets and variables ➔ Actions** on GitHub, and add a secret matching your project ref (e.g. `<PROJECT_REF>_SERVICE_ROLE`).

### 4. Update Workflow
Add the corresponding ping step in `.github/workflows/keepalive-all.yml`.

---

## 🚀 Schedule & Execution
* **Automated Schedule**: Twice daily at **5:30 AM IST** & **5:30 PM IST** (`00:00 UTC` & `12:00 UTC`).
* **Retry Policy**: 5x retries per project with 5-second delays and connection failure protection.
* **Manual Trigger**: Go to **Actions** ➔ **Centralized Supabase Keep Alive** ➔ **Run workflow**.
