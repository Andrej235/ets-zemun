### Website

- **NEXT_PUBLIC_WEBSITE_URL** - URL of the locally hosted website, if hosted on the same machine `http://your-local-ip:3000`
- **NEXT_PUBLIC_API_URL** - URL of the locally hosted backend, if hosted on the same machine `http://your-local-ip:5000`

---

### Admin

- **NEXT_PUBLIC_API_URL** - URL of the locally hosted backend, if hosted on the same machine `http://your-local-ip:5000`

---

### Backend

- **ConnectionStrings.DefaultConnection** - PostgreSQL connection string. Example: Host=localhost;Port=5432;Database=ets-zemun;Username=your-username;Password=your-password
- **Brevo.ApiKey** - Brevo API key
- **Brevo.SenderEmail** - Brevo sender email with a domain authorized on Brevo
- **Brevo.SenderName** - Brevo sender name
- **FrontendUrl** - URL of the admin panel, if hosted on the same machine `http://your-local-ip:3000`
- **AllowedOrigins** - List of allowed origins for CORS, should contain the URL of the website and admin panel
