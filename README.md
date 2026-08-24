# Supabase Keep-Alive Central Manager

This repository handles automated write heartbeats to prevent multiple Supabase Free Tier databases from automatically pausing.

## 🛠️ Step-by-Step Setup for Each Database

To add a new Supabase project to this manager:

### 1. Create the Heartbeat Table
Run this DDL script in your Supabase SQL Editor for the target project:
```sql
CREATE TABLE IF NOT EXISTS public.heartbeat (
    id int PRIMARY KEY DEFAULT 1,
    last_ping timestamptz DEFAULT now()
);
INSERT INTO public.heartbeat (id, last_ping) VALUES (1, now()) ON CONFLICT (id) DO NOTHING;
ALTER TABLE public.heartbeat ENABLE ROW LEVEL SECURITY;
```

### 2. Copy the Service Role Key
Copy the `service_role / secret` key from your Supabase Dashboard (*Settings ➔ API*).

### 3. Add GitHub Repository Secrets
Go to this repository's **Settings ➔ Secrets and variables ➔ Actions** on GitHub, and add:
* **`PWGEPPFXGXDPGZFOULFN_SERVICE_ROLE`** (Service role key for project pwgeppfxgxdpgzfoulfn)

---

## 🚀 Running the Keep-Alive
The GitHub Action runs automatically every 3 days. To trigger pings manually:
1. Go to the **Actions** tab on your GitHub repository.
2. Select the **Centralized Supabase Keep Alive** workflow.
3. Click the **Run workflow** dropdown and select the branch.
