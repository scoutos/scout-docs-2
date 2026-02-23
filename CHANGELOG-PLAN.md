# Scout Documentation Update Plan

**Generated:** February 23, 2026
**Based on:** ScoutOS Changelog (Aug 2025 - Jan 2026)
**Current docs status:** Cover Introduction, Getting Started, Agents, Drive, Collections & Tables, About

---

## Executive Summary

Scout has undergone significant changes in the last 6 months. The platform has shifted from a general-purpose AI workflow tool to a **sales-focused automation platform** with major new capabilities including:

1. **Agent Marketplace** - Self-installing templates for common use cases
2. **Studio Interface Redesign** - Separation of "using" vs "building" experiences
3. **Agent Scheduling** - Native scheduling without workflows
4. **Planning Tools** - CreatePlan, GetNextStep, UpdatePlan for complex tasks
5. **Agent Blocks in Workflows** - Use agents as workflow blocks
6. **Drive Folders & Files** - Full file management with agent read/write
7. **New Integrations** - Pipedrive, Airtable, HubSpot (expanded), Exa.ai, Twilio
8. **Dynamic Mode** - Automatic model failover
9. **Enhanced Tables** - Kanban view, new column types, relations

Several features in the current docs are **outdated** or missing critical new functionality.

---

## Priority 1: Critical Updates (High Impact)

### 1.1 Agent Templates/Marketplace ⭐ **HIGHEST PRIORITY**
**Status:** Not documented
**Released:** January 2026

The agent marketplace is now the primary onboarding experience. Users start with templates, not blank agents.

**What's new:**
- Self-installing agent templates (Meeting Prep, Competitor Intel, Deal Monitor, Seller Guidance, CRM Hygiene)
- Guided setup that walks through configuration
- Pre-built integrations and schedules

**Docs to update:**
- [ ] `agents/getting-started.mdx` - Rewrite to start with marketplace templates
- [ ] `agents/overview.mdx` - Add templates section, explain marketplace concept

**New pages needed:**
- [ ] `agents/templates.mdx` - Catalog of available templates with descriptions
- [ ] `agents/installing-templates.mdx` - Step-by-step template installation guide

**Estimated effort:** 4-6 hours

---

### 1.2 Agent Scheduling (Triggers)
**Status:** Not documented
**Released:** January 2026

Agents can now be scheduled to run automatically without building workflows.

**What's new:**
- Schedule triggers in agent settings
- Daily, weekly, custom cron schedules
- No workflow required for scheduled agents

**Docs to update:**
- [ ] `agents/getting-started.mdx` - Add scheduling section
- [ ] `agents/overview.mdx` - Mention scheduling capability

**New pages needed:**
- [ ] `agents/scheduling.mdx` - Complete scheduling guide

**Estimated effort:** 2-3 hours

---

### 1.3 Planning Tools (CreatePlan, GetNextStep, UpdatePlan)
**Status:** Not documented
**Released:** December 2025

Planning tools help agents tackle complex, multi-step tasks without getting lost.

**What's new:**
- Three new tools: CreatePlan, GetNextStep, UpdatePlan
- Agents can map out approach before executing
- Significant performance gains on complex workflows

**Docs to update:**
- [ ] `agents/getting-started.mdx` - Add planning tools to tools section

**New pages needed:**
- [ ] `agents/planning.mdx` - Guide to using planning tools effectively

**Estimated effort:** 2-3 hours

---

### 1.4 Studio Interface Redesign
**Status:** Not documented
**Released:** December 2025

Complete UI overhaul separating "using" from "building".

**What's new:**
- New main interface focused on using agents
- "Studio" contains all building tools (agents, workflows, tables, integrations)
- Navigation completely changed

**Docs to update:**
- [ ] `getting-started/quick-start.mdx` - Update navigation references
- [ ] `getting-started/what-is-scout.mdx` - Explain new structure
- [ ] `getting-started/core-concepts.mdx` - Add Studio concept
- [ ] `agents/getting-started.mdx` - Update URLs and navigation references
- [ ] All docs with "studio.scoutos.com" URLs - Verify still correct

**Estimated effort:** 2-3 hours

---

## Priority 2: Important Updates

### 2.1 Agent Blocks in Workflows
**Status:** Not documented
**Released:** October 2025

Agents can now be used as blocks within workflows for proactive automation.

**What's new:**
- Drag agent blocks into workflows
- Trigger agents from external events (Fireflies, Calendar, API)
- Run agents on schedules within workflows

**New pages needed:**
- [ ] `workflows/agent-blocks.mdx` - Using agents in workflows

**Estimated effort:** 2-3 hours

---

### 2.2 Drive Folders & File Management
**Status:** Partially documented
**Released:** January 2026

Drive now supports full file management with folders.

**What's new:**
- Create and organize folders
- Agents can read files from Drive
- Agents can write files to Drive
- Enables "skills" and long-term memory for agents

**Docs to update:**
- [ ] `drive/overview.mdx` - Add folders and agent file access sections
- [ ] `drive/api-reference.mdx` - Document folder operations

**Estimated effort:** 2-3 hours

---

### 2.3 Agent Delegation (Agent-to-Agent)
**Status:** Not documented
**Released:** January 2026

Agents can delegate tasks to other agents.

**What's new:**
- Specialized agent orchestration
- Panel of judges pattern for review
- Multi-agent collaboration

**Docs to update:**
- [ ] `agents/overview.mdx` - Mention delegation capability

**New pages needed:**
- [ ] `agents/delegation.mdx` - Agent-to-agent task delegation

**Estimated effort:** 1-2 hours

---

### 2.4 Dynamic Mode
**Status:** Not documented
**Released:** September 2025

Automatic model failover and routing.

**What's new:**
- Automatic failover when providers have outages (OpenAI → Claude → Gemini)
- Optimized model selection based on task complexity
- more reliable than direct API usage

**Docs to update:**
- [ ] `agents/getting-started.mdx` - Add Dynamic Mode to settings section

**Estimated effort:** 1 hour

---

### 2.5 Enhanced Tables Features
**Status:** Partially documented
**Released:** August 2025 - January 2026

Tables have powerful new features.

**What's new:**
- Kanban view for task/status tracking
- Select and Multi-Select column types
- Relation column type (link tables)
- Checkbox column type
- Color-coded options
- Export tables
- Delete rows and tables

**Docs to update:**
- [ ] `collections/overview.mdx` - Add new features section
- [ ] `collections/creating-collections.mdx` - Document new column types

**Estimated effort:** 2-3 hours

---

## Priority 3: New Integrations

### 3.1 Pipedrive Integration
**Status:** Not documented
**Released:** October 2025

Native Pipedrive CRM integration.

**What's new:**
- Full read/write access to Pipedrive
- Same capabilities as Salesforce/HubSpot integrations

**New pages needed:**
- [ ] `integrations/pipedrive.mdx` - Pipedrive integration guide

**Estimated effort:** 1 hour

---

### 3.2 Airtable Integration
**Status:** Not documented
**Released:** October 2025

Native Airtable integration.

**What's new:**
- Read/write to Airtable bases
- Store agent outputs
- Custom database integration

**New pages needed:**
- [ ] `integrations/airtable.mdx` - Airtable integration guide

**Estimated effort:** 1 hour

---

### 3.3 HubSpot Integration (Expanded)
**Status:** Not documented
**Released:** May - February 2025

HubSpot integration has expanded capabilities.

**What's new:**
- Get contact with activities
- Query contacts with filters
- Create contact

**New pages needed:**
- [ ] `integrations/hubspot.mdx` - HubSpot integration guide

**Estimated effort:** 1 hour

---

### 3.4 Twilio Integration
**Status:** Not documented
**Released:** February 2025

SMS capabilities via Twilio.

**What's new:**
- SMS channel integration
- AI-powered SMS automation

**New pages needed:**
- [ ] `integrations/twilio.mdx` - Twilio integration guide

**Estimated effort:** 1 hour

---

### 3.5 Exa.ai Integration
**Status:** Not documented
**Released:** February 2025

Advanced web search capabilities.

**What's new:**
- Live crawling and cached results
- Enhanced web search for agents

**New pages needed:**
- [ ] `integrations/exa.mdx` - Exa.ai integration guide

**Estimated effort:** 1 hour

---

## Priority 4: Additional Features

### 4.1 Multi-Agent Chats
**Status:** Not documented
**Released:** August 2025

Mention multiple agents in a single chat.

**Docs to update:**
- [ ] `agents/overview.mdx` - Mention multi-agent collaboration

**Estimated effort:** 30 minutes

---

### 4.2 Agent Sandbox
**Status:** Not documented
**Released:** August 2025

In-page agent sandbox for testing instructions.

**Docs to update:**
- [ ] `agents/getting-started.mdx` - Add sandbox testing section

**Estimated effort:** 30 minutes

---

### 4.3 Google Gemini Support
**Status:** Not documented
**Released:** August 2025

Gemini 2.5 models now available (Flash Lite, Flash, Pro).

**Docs to update:**
- [ ] `agents/getting-started.mdx` - Mention Gemini in model selection

**Estimated effort:** 15 minutes

---

### 4.4 Workflow Analytics
**Status:** Not documented
**Released:** June 2025

Real-time visibility into workflow performance.

**What's new:**
- Usage & Health metrics
- Collection Strength (RAG performance)
- Latency metrics
- Cost controls

**New pages needed:**
- [ ] `workflows/analytics.mdx` - Workflow analytics guide

**Estimated effort:** 2 hours

---

### 4.5 Scheduled Workflow Runs
**Status:** Not documented
**Released:** July 2025

Built-in scheduling for workflows.

**What's new:**
- Schedule tab in workflows
- Multiple scheduled triggers per workflow
- Custom inputs per schedule

**New pages needed:**
- [ ] `workflows/scheduling.mdx` - Workflow scheduling guide

**Estimated effort:** 1-2 hours

---

### 4.6 JSON Mode
**Status:** Not documented
**Released:** September 2025

Agents can respond in JSON format for programmatic use.

**Docs to update:**
- [ ] `agents/getting-started.mdx` - Add JSON Mode to settings

**Estimated effort:** 30 minutes

---

### 4.7 Gmail Drafting Tool
**Status:** Not documented
**Released:** August 2025

Create, edit, and send Gmail emails from Scout.

**New pages needed:**
- [ ] `integrations/gmail.mdx` - Gmail integration guide

**Estimated effort:** 1 hour

---

### 4.8 Copilot 2.0
**Status:** Not documented
**Released:** January 2025 (rebuilt December 2025)

Embeddable AI assistant for websites.

**What's new:**
- Two lines of code embed
- Initial activities support
- Thinking Block for pending states
- Copilot Message Block for streaming

**New pages needed:**
- [ ] `integrations/copilot.mdx` - Scout Copilot integration guide

**Estimated effort:** 2 hours

---

### 4.9 Scout CLI & Workflows as Code
**Status:** Not documented
**Released:** February 2025

CLI for managing workflows programmatically.

**What's new:**
- Version control with Git
- CI/CD integration
- Deploy workflows from code

**New pages needed:**
- [ ] `cli/overview.mdx` - CLI introduction
- [ ] `cli/getting-started.mdx` - CLI quick start

**Estimated effort:** 2-3 hours

---

### 4.10 Scout Studio (New Product Preview)
**Status:** Not documented
**Announced:** January 2026

Upcoming product for sales teams - single AI teammate with built-in skills.

**What's new:**
- Sales-focused AI assistant
- Native Salesforce integration
- Pre-built skills (CRM management, pipeline monitoring, call prep)

**Action:** Monitor for release, create docs when available.

**Estimated effort:** TBD

---

## Deprecated/Changed Features

### Databases → Collections
**Status:** Reflected in current docs

The transition from "Databases" to "Collections" is documented, but the old terminology may still appear in some places.

**Action:** Audit docs for consistency.

---

## Missing Core Documentation

The following areas need entirely new documentation sections:

### Workflows Section (Not Exist)
Current docs mention workflows but have no dedicated section. Need:
- [ ] `workflows/overview.mdx` - Introduction to workflows
- [ ] `workflows/building.mdx` - Creating workflows
- [ ] `workflows/blocks.mdx` - Block reference
- [ ] `workflows/triggers.mdx` - Trigger types and configuration

### Integrations Section (Not Exist)
Integrations are mentioned but not documented. Need:
- [ ] `integrations/overview.mdx` - Integration gallery
- Individual integration pages (see Priority 3)

### API Reference (Not Exist)
Only Drive API is documented. Need:
- [ ] `api/overview.mdx` - API introduction
- [ ] `api/authentication.mdx` - Authentication guide
- Full endpoint documentation

---

## Summary

| Priority | Category | Estimated Hours |
|----------|----------|-----------------|
| 1 | Critical Updates | 10-15 hours |
| 2 | Important Updates | 8-12 hours |
| 3 | New Integrations | 5 hours |
| 4 | Additional Features | 8-10 hours |
| **Missing Sections** | Workflows, Integrations, API | 15-20 hours |

**Total estimated effort:** 46-62 hours

---

## Recommended Approach

### Phase 1: Critical Agent Updates (Week 1)
1. Rewrite `agents/getting-started.mdx` to feature templates
2. Add scheduling documentation
3. Document planning tools
4. Update UI/navigation references

### Phase 2: Workflows Section (Week 2)
1. Create workflows overview and building guides
2. Document agent blocks
3. Add scheduling documentation
4. Add analytics documentation

### Phase 3: Drive & Tables Updates (Week 2-3)
1. Update Drive docs with folders and agent access
2. Document new table features (Kanban, relations, etc.)

### Phase 4: Integrations Catalog (Week 3-4)
1. Create integrations overview
2. Document each integration (HubSpot, Pipedrive, Airtable, Twilio, Exa, Gmail)

### Phase 5: API Reference (Week 4+)
1. Expand Drive API docs
2. Add Collections API docs
3. Add Agents API docs

---

## Questions for Scout Team

1. **Scout Studio product:** What's the timeline for the new sales product? Should we create placeholder docs?
2. **Copilot 2.0:** Is this still in beta? What's the documentation status?
3. **CLI:** Is the Scout CLI officially supported? Should it be documented?
4. **Recall feature:** The changelog mentions "Recall" for agent memory (Sept 2025). Is this released? Should it be documented?
5. **Workflows section:** Are there existing docs we should migrate, or start fresh?
6. **Screenshots:** Can we get updated screenshots for the new UI?

---

*Plan created by analyzing ScoutOS changelog from February 2025 - January 2026*
