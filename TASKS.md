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
├── agents/              # DONE: Agents documentation
│   ├── _meta.json
│   ├── overview.md
│   └── getting-started.md
├── drive/               # DONE: Drive documentation
│   ├── _meta.json
│   ├── overview.md
│   └── api-reference.md
├── collections/         # NEW: Collections & Tables documentation
│   ├── _meta.json
│   ├── overview.md
│   ├── creating-collections.md
│   └── querying-data.md
└── api/
    ├── _meta.json
    └── reference.md
```

- [x] Remove blocks/ and workflows/ directories (not current features)
- [x] Update _meta.js navigation
- [x] Review Scout OS changelog for Agents & Drive features
- [x] Document Agents functionality
- [x] Document Drive functionality
- [x] Document Collections & Tables functionality (create detailed guides)
- [ ] **Redefine "What is Scout" page** - Position Scout as an "agentic workforce studio" that enables technical and non-technical users to create and run autonomous agents
- [ ] **Research Scout blog for documentation insights** - Review https://www.scoutos.com/blog for topics, examples, and use cases to improve docs
- [ ] **Review Scout changelog for feature updates** - Analyze https://www.scoutos.com/changelog and create plan to update docs with new features
- [ ] **Document Scout Skills** - Create documentation for https://github.com/scoutos/scout-skills (skill system, available skills, creating custom skills)
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