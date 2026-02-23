# Scout Docs 2 - Project Tasks

**Project:** Scout Documentation (Nextra 4)  
**Created:** Feb 23, 2026  
**Goal:** Modern, searchable documentation for Scout OS

---

## Phase 1: Setup & Foundation

- [x] Install dependencies (`pnpm install`)
- [x] Verify dev server works (`pnpm dev`)
- [x] Configure deployment (onhyper.io)
- [ ] Publish to GitHub (`github.com/scoutos/scout-docs-2`)

## Phase 2: Content Planning

### Documentation Structure (Draft)

```
pages/
├── index.md              # Landing page
├── getting-started/
│   ├── _meta.json
│   ├── what-is-scout.md
│   ├── quick-start.md
│   └── core-concepts.md
├── workflows/
│   ├── _meta.json
│   ├── overview.md
│   ├── creating-workflows.md
│   └── templates.md
├── blocks/
│   ├── _meta.json
│   ├── input-output.md
│   ├── ai-processing.md
│   ├── control-flow.md
│   └── communication.md
├── collections/
│   ├── _meta.json
│   └── tables.md
└── api/
    ├── _meta.json
    └── reference.md
```

- [ ] Migrate content from docs.scoutos.com
- [ ] Audit for outdated/missing info
- [ ] Add code examples and screenshots
- [ ] Create API reference section

## Phase 3: Customization

- [ ] Custom Scout branding (logo, colors)
- [ ] Navigation structure
- [ ] Search configuration (Algolia or Nextra built-in)
- [ ] Dark/light mode defaults

## Phase 4: Deployment

- [ ] Deploy to Vercel
- [ ] Configure custom domain (docs.scoutos.com)
- [ ] Set up redirects from old docs
- [ ] Analytics integration

---

## Notes

- Using Nextra 4 docs theme
- Base template: `shuding/nextra-docs-template`
- Stack: Next.js + Nextra + TypeScript

---

## References

- Current docs: https://docs.scoutos.com
- Nextra docs: https://nextra.site
- Template: https://github.com/shuding/nextra-docs-template