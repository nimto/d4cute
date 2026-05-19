# live-status branch

This orphan branch is auto-updated by `.github/workflows/live-status.yml`
(cron every 5 min). It exposes `live-status.json` via
`https://raw.githubusercontent.com/<owner>/<repo>/live-status/live-status.json`
so the client-side LiveChannel component can detect YouTube live status
without depending on flaky CORS proxies.

Do NOT edit by hand.
