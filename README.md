# JR Intelligence

Marketing site for JR Intelligence. The company builds websites and webshops for other businesses, and automates work that already runs through those sites.

The interface is in Dutch. Pages:

- Home, with the services menu under **Diensten**
- Webshop bouwen, Website bouwen, and Automatisering
- Over ons
- Contact, which opens a prepared email to `hallo@jrintelligence.nl`
- Tab App Builder at `/builder`: a black grid where widgets and `app/screen.tsx` stay in sync. The code drawer is Monaco, the canvas is a flow, and the preview can boot a small screen server in the browser
- Agency OS at `/services`, with website, webshop, app, and automatisering

Starting prices live in [`lib/services.ts`](lib/services.ts). The contact address lives in [`lib/site.ts`](lib/site.ts).

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

The builder keeps its document in this browser. To share it across browsers as well:

```bash
npm run collab
```

That starts the collaboration server on port 43124. The builder header says LIVE while that server is reachable, and LOCAL when this browser is keeping the document on its own. Two tabs on the same computer still share the document either way.

```bash
npm run lint
npm run build
```
