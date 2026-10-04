# JR Intelligence

Marketing site for JR Intelligence. The company builds websites and webshops for other businesses, and automates work that already runs through those sites.

The interface is in Dutch. Pages:

- Home, with the services menu under **Diensten**
- Webshop bouwen, Website bouwen, and Automatisering
- Over ons
- Contact, which opens a prepared email to `hallo@jrintelligence.nl`
- Tab App Builder at `/builder`: a black grid where widgets and `app/screen.tsx` stay in sync, including across two open tabs

Starting prices live in [`lib/services.ts`](lib/services.ts). The contact address lives in [`lib/site.ts`](lib/site.ts).

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

```bash
npm run lint
npm run build
```
