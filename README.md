# HUSHPair vNext++ — Website (Next.js)

Kısa: Dark premium, minimal site for Investor/Product/Docs-lite. TR primary with EN toggle.

How to run:
1. Node 18+
2. npm install
3. npm run dev
4. Open http://localhost:3000

What’s included:
- Pages: /, /product, /architecture, /modules, /events, /gifting, /security, /pricing, /company, /contact
- Global design tokens in styles/globals.css
- Reusable components: Nav, Footer, DiagramBox, LangToggle
- Tailwind + PostCSS setup

Notes:
- All copy TR-first concise. EN toggle currently toggles client-side state; production should wire locale routing.
- Integrations (ticketing, treasury, SIEM) are placeholders.
- Accessibility: basic keyboard focus support; recommend an a11y pass before public launch.

Design choices:
- 8pt grid, Space Grotesk headings, Inter body.
- Motion: micro-interactions via CSS transition.

Next steps:
- Replace placeholders (logos, vendor adapters).
- Wire form to backend / CRM.
- Add Lighthouse perf optimizations (images, fonts preload).
