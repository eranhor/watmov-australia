# Watmov Site Copywriting Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline execution) to implement this plan task-by-task.

**Goal:** Replace the existing website copy with the conversion-focused B2B content provided in the user's feedback deck across Hero, Value Pillars, Advantage, Engagement, and Portfolio sections.

**Architecture:** Copy is stored inline in React components. The plan updates the relevant component data constants and JSX text nodes, preserving existing styling, animation hooks, and component structure.

**Tech Stack:** React 19, TypeScript, Vite, inline styles.

---

### Task 1: Hero Section (`site/src/components/Hero.tsx`)

**Files:**
- Modify: `site/src/components/Hero.tsx`

- [ ] **Step 1.1: Update headline `<h1>`**
  Replace the current headline with:
  ```tsx
  Scalable Design & Drafting for Complex Water Infrastructure
  ```
  Remove the colored word spans; keep the `<h1>` styling.

- [ ] **Step 1.2: Update subheadline `<p>`**
  Replace the current `<p>` text with:
  ```tsx
  Eliminate capacity bottlenecks. We integrate directly with your engineering teams to deliver compliant, asset-owner-ready designs on time and within budget.
  ```

- [ ] **Step 1.3: Update primary CTA**
  Change the first button label from "Our Capabilities" to "Secure Drafting Capacity" and keep scroll target `#capabilities`.

- [ ] **Step 1.4: Update secondary CTA**
  Change the second button label from "Start a Project" to "View Project Portfolio" and keep scroll target `#work`.

- [ ] **Step 1.5: Replace stat row with trust banner**
  Replace the three-stat div (Global Team, Scaled Capacity, AS/NZS) with:
  ```tsx
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: 'rgba(141, 198, 63, 0.08)',
    borderRadius: '100px',
    border: '1px solid rgba(141, 198, 63, 0.15)',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--green-dark)',
  }}>
    <span>⚡</span>
    <span>Built to Local Utility & Regional Council Standards</span>
  </div>
  ```
  Position it where the stats row currently sits, inside the container below the CTA buttons.

---

### Task 2: Value Pillars (`site/src/components/About.tsx`)

**Files:**
- Modify: `site/src/components/About.tsx`

- [ ] **Step 2.1: Update section header and subhead**
  Replace the `section-header` content:
  - `<h2>`: `Engineering Support, Built to Scale`
  - `<p>`: `Don't let internal resource constraints dictate your project capacity. We plug seamlessly into your existing workflows.`

- [ ] **Step 2.2: Update the three value cards**
  Replace the `values` array with:
  ```ts
  const values = [
    {
      icon: Zap,
      title: 'Instant Capacity Relief',
      desc: 'Scale your drafting output up or down instantly. Stop turning down major design tenders or stalling active infrastructure projects due to local engineering talent shortages.',
    },
    {
      icon: ShieldCheck,
      title: 'Asset-Owner Compliance',
      desc: 'We design and draft strictly to local water authority, municipal, and regional specifications—minimizing standard markup cycles and accelerating your engineering approvals.',
    },
    {
      icon: Workflow,
      title: 'Seamless Workflow Integration',
      desc: 'Zero friction. We rapidly adapt to your exact CAD layers, corporate drafting standards, and internal document control systems from day one, acting as a natural extension of your office.',
    },
  ];
  ```
  Import `Zap` and `Workflow` from `lucide-react` alongside existing `ShieldCheck`.

- [ ] **Step 2.3: Preserve lower content**
  Leave the "Australian Onshore / Indian Delivery" block and the compliance disclaimer unchanged.

---

### Task 3: Core Differentiation Grid (`site/src/components/Advantage.tsx`)

**Files:**
- Modify: `site/src/components/Advantage.tsx`

- [ ] **Step 3.1: Update section header**
  - `<h2>`: `Engineered for Technical Reliability`
  - `<p>`: `A multi-layered approach to quality, compliance, and delivery predictability.`

- [ ] **Step 3.2: Replace the six advantage cards**
  Replace the `advantages` array with:
  ```ts
  const advantages = [
    {
      icon: ClipboardCheck,
      title: 'Rigorous Quality Assurance',
      desc: 'Multi-tier internal review processes ensure that every schematic, long-section, layout, and cross-section is verified for geometric and standard compliance before it ever reaches your desk.',
      highlight: true,
    },
    {
      icon: Timer,
      title: 'Rapid Turnaround Times',
      desc: 'Optimized, dedicated resource allocation means your urgent project timelines stay firmly on track, even under compressed delivery schedules or unexpected design modifications.',
      highlight: false,
    },
    {
      icon: GraduationCap,
      title: 'Deep Sector Expertise',
      desc: 'A highly specialized, exclusive focus on water infrastructure assets—spanning pump station configurations, complex pipeline alignments, treatment plant layouts, and reticulation networks.',
      highlight: false,
    },
    {
      icon: Receipt,
      title: 'Predictable Costing Models',
      desc: 'No hidden variations, administrative overheads, or surprise billing. Choose between transparent fixed-scope project estimates or scalable, dedicated resource agreements.',
      highlight: true,
    },
    {
      icon: Monitor,
      title: 'Modern CAD Infrastructure',
      desc: 'Utilizing industry-standard design platforms paired with strict data security and backup protocols to keep your proprietary project files safe, synchronized, and audit-ready.',
      highlight: false,
    },
    {
      icon: Users,
      title: 'Long-Term Continuity',
      desc: 'We deliberately retain asset and project-specific knowledge. The technical specialists assigned to your initial project are retained to support your future iterations and upcoming tenders.',
      highlight: false,
    },
  ];
  ```
  Update imports from `lucide-react` to include `ClipboardCheck`, `Timer`, `GraduationCap`, `Receipt`, `Monitor`, and `Users`.

---

### Task 4: Engagement Models (`site/src/components/Engagement.tsx`)

**Files:**
- Modify: `site/src/components/Engagement.tsx`

- [ ] **Step 4.1: Update section header and subhead**
  - `<h2>`: `Flexible Commercial Alignment`
  - `<p>`: `Select the operational framework that matches your current project pipeline and procurement rules.`

- [ ] **Step 4.2: Replace the engagement model cards**
  Replace the `models` array with:
  ```ts
  const models = [
    {
      icon: Briefcase,
      title: 'Fixed-Scope Project Delivery',
      subtitle: 'Lump-Sum Pricing',
      description: 'Ideal for clearly defined scopes of work, individual tender preparations, or structured project overflows.',
      features: [
        'Guaranteed lump-sum commercial pricing based tightly on agreed deliverables',
        'Defined project milestones with bound, contractual delivery schedules',
        'Perfect for mitigating temporary spikes in drafting volume without overhead',
      ],
      cta: 'Request a Project Quote',
      href: 'mailto:info@watmov.com.au?subject=Project%20Quote%20-%20Watmov',
      accent: 'var(--blue)',
    },
    {
      icon: UserCheck,
      title: 'Dedicated Resource Agreements',
      subtitle: 'Monthly Capacity',
      description: 'Best for robust, long-term project pipelines requiring continuous, adaptive CAD capacity and priority scheduling.',
      features: [
        'Exclusive, ongoing daily access to specific CAD and infrastructure specialists',
        'Direct real-time communication and native software integration with your team',
        'Maximum commercial efficiency with predictable monthly baseline operational expenditure',
      ],
      cta: 'Secure Your Dedicated Team',
      href: 'mailto:info@watmov.com.au?subject=Dedicated%20Resource%20Enquiry',
      accent: 'var(--green)',
    },
  ];
  ```

---

### Task 5: Portfolio Section (`site/src/components/SampleWork.tsx`)

**Files:**
- Modify: `site/src/components/SampleWork.tsx`

- [ ] **Step 5.1: Update section header and subhead**
  - `<h2>`: `Proven Infrastructure Delivery`
  - `<p>`: `Explore a selection of precise technical drawings executed to exact asset-owner frameworks.`

- [ ] **Step 5.2: Reframe project entries to asset-owner registry style**
  Replace the `projects` array with:
  ```ts
  const projects = [
    {
      title: 'Trunk Main Pipeline Realignment',
      sector: 'WaterNSW / Sydney Water Standard Codes',
      image: '/samples/football-ground.jpg',
      description: 'Pressure main realignment with hydrant tie-ins, valve assemblies, and service boundary coordination.',
    },
    {
      title: 'Reticulation Network Upgrade',
      sector: 'Regional Council / Local Water Authority',
      image: '/samples/park-drainage.jpg',
      description: 'Residential and commercial service connection upgrades with property boundary setback compliance.',
    },
    {
      title: 'Road Reserve Bulk Water Transfer',
      sector: 'Council Road Corridor / Bulk Water Utility',
      image: '/samples/median-road-landscape.jpg',
      description: 'Long-section and cross-section design for bulk water pipeline within road reserve corridor.',
    },
    {
      title: 'Pump Station & Rising Main Proposal',
      sector: 'Sewerage Authority / Hydraulic Standard',
      image: '/samples/pump-station.jpg',
      description: 'Pump station layout, rising main alignment, elevation profiles, and highway crossing details.',
    },
    {
      title: 'Treatment Plant Process Layout',
      sector: 'Water Treatment / Municipal Standard',
      image: '/samples/drip-design.jpg',
      description: 'Process flow arrangement, equipment layouts, and hydraulic profile drawings for treatment assets.',
    },
    {
      title: 'Stormwater Retention Pond',
      sector: 'Council Civil / Stormwater Code',
      image: '/samples/pond-design.jpg',
      description: 'Pond design with storage volumes, outlet structures, and civil 3D surface modelling.',
    },
    {
      title: 'Bulk Water Transfer Pipeline',
      sector: 'Regional Water Utility / Pipeline Standard',
      image: '/samples/bulk-water-pipeline.jpg',
      description: 'Major bulk water transfer pipeline — plan, profile, and network hydraulics documentation.',
    },
  ];
  ```

- [ ] **Step 5.3: Update portfolio CTA**
  Change the CTA heading from "Have a project like one of these?" to "Ready to expand your design capacity?" and the paragraph to:
  ```tsx
  Let's review your upcoming tender or active project and confirm how Watmov can integrate with your team.
  ```
  Keep the button label as "Discuss Your Project".

---

### Task 6: Build and Verify

**Files:**
- N/A

- [ ] **Step 6.1: Run the build**
  Run: `cd site && npm run build`
  Expected: TypeScript compiles and Vite builds successfully with no errors.

- [ ] **Step 6.2: Run lint**
  Run: `cd site && npm run lint`
  Expected: ESLint passes (or returns only pre-existing warnings).
