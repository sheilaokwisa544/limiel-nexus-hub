# Admin-only access

- Keep the existing staff management screen and move it to `/admin`.
- Make `/dashboard` forward to `/admin` so old links continue working.
- Restrict `/admin` to Admin and Agent roles; other signed-in accounts return to the website.
- Keep one sign-in form, remove public account creation, and send successful sign-ins to `/admin`.
- Rename visible Dashboard links and wording to Admin.
- Verify sign-in and the admin sections still load.
