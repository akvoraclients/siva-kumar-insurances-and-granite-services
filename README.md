# SIVA SERVICES — Digital Customer Acquisition & Web Portal

> **SIVA SERVICES** (`siva-services` v0.1.0) is a high-performance, bilingual (English & Tamil) web platform and digital customer acquisition portal built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. It is statically exported for fast edge delivery, serving as the customer-facing interface for **SIVA SERVICES** and its two operating divisions: **Insurance Agency Services** and **Siva Granites** based in Hosur, Tamil Nadu.

---

## 1. Project Title

**SIVA SERVICES Web Platform**  
*Internal Package Name*: `siva-services`  
*Target Companion System*: **Siva Business Hub** (Internal CRM & Operations Platform — Planned)  
*Operating Headquarters*: Hosur, Krishnagiri District, Tamil Nadu, India  
*Principal Lead / Business Owner*: Siva Kumar  

---

## 2. Project Overview

SIVA SERVICES is an independent professional firm based in Hosur, Tamil Nadu, uniting two distinct commercial service divisions under a unified, trusted brand identity:

1. **Insurance Agency Advisory & Customer Assistance**: Personal assistance and policy guidance representing three statutory and public-sector/private insurance institutions:
   - **Life Insurance Corporation of India (LIC)**: Life insurance consultation, official portal application guidance, renewal tracking, death and maturity claim documentation.
   - **The New India Assurance Co. Ltd.**: General insurance (Motor, Property, Marine, Commercial Liability).
   - **Star Health and Allied Insurance Co. Ltd.**: Individual, family, and senior citizen health insurance, cashless network guidance, hospitalization claim paperwork.
   *Regulatory Compliance*: Siva Kumar acts strictly as an insurance agent and facilitator. SIVA SERVICES is not an insurance underwriter. All applications, premium payments, and policy issuances are executed directly on official insurer portals.
2. **Siva Granites (Hosur Natural Stone Coordination & Sourcing)**: Leveraging Hosur's strategic positioning as one of Asia's primary natural granite processing hubs:
   - Active coordination with **20–25 established granite processing companies and showrooms** in Hosur.
   - Assisting residential builders, architects, commercial developers, and individual homeowners across Tamil Nadu with slab selection, surface finish evaluations (Polished, Leather, Flamed, Honed), transparent per-square-foot quotation coordination, batch quality inspection, and direct site logistics.

The codebase is architected as an **SSG (Static Site Generation / Static HTML Export)** application deployed to static CDNs or web servers (such as Nginx, Cloudflare Pages, AWS S3/CloudFront, or Vercel). It features a zero-runtime-server footprint, instant TTFB, and built-in resilience against traffic spikes.

---

## 3. Objectives

- **Brand Consolidation & Trust**: Present a unified, professional brand image for both insurance and granite coordination, highlighting ~18 years of combined professional experience.
- **Bilingual Accessibility**: Deliver full parity across English (`en`) and Tamil (`ta`), with localized typography, cultural phrasing, and SEO metadata.
- **Factual & Compliant Disclosures**: Prevent regulatory liability under IRDAI guidelines by ensuring clear agency disclaimers, prohibiting the collection of sensitive data (Aadhaar, passwords, medical records), and emphasizing that all policy contracts are underwritten solely by the insurance companies.
- **Defensive Contact & Lead Capture**: Prevent broken customer interactions by guarding phone numbers, WhatsApp links, and Web3Forms submissions behind explicit configuration state flags. Unconfigured channels gracefully display informative pending indicators.
- **Zero-Latency Static Delivery**: Pre-render all localized routes at build time using Next.js `output: "export"`, optimizing performance on mobile devices over Indian cellular networks.
- **Foundation for Siva Business Hub**: Serve as the public customer acquisition funnel that will feed inbound leads into the planned internal operations platform (*Siva Business Hub*).

---

## 4. Main Features

### 4.1. Bilingual Routing & Dynamic Language Switcher
- Client-side language detection and persistent preference storage (`localStorage.getItem('siva_lang')`).
- Static route pre-rendering for both locales (`/en` and `/ta`) via `generateStaticParams()`.
- Interactive language toggle ([`LanguageSwitcher.tsx`](file:///d:/BS/BS/src/components/layout/LanguageSwitcher.tsx)) that preserves the current relative path while switching languages.
- Safe `<noscript>` fallback on the root landing page forwarding directly to `/en/`.

### 4.2. Dual Division Experience
- **Dedicated Insurance Portal ([`/[lang]/insurance`](file:///d:/BS/BS/src/app/[lang]/insurance/page.tsx))**:
  - Independent institutional cards for LIC, New India Assurance, and Star Health.
  - 6-step scope of assistance breakdown (New Policy Enquiries, Portal Application Support, Renewals, Claims Assistance, Policy Information Updates, Ongoing Servicing).
  - 4-step transparent consultation workflow.
  - 7 comprehensive bilingual FAQs addressing underwriting boundaries, premium payments, and coverage scopes.
  - Statutory IRDAI-aligned compliance notice ([`ComplianceNotice.tsx`](file:///d:/BS/BS/src/components/insurance/ComplianceNotice.tsx)).
- **Dedicated Granite Portal ([`/[lang]/granites`](file:///d:/BS/BS/src/app/[lang]/granites/page.tsx))**:
  - 6 visual category overviews (Black, White & Light, Grey, Brown, Red, and Surface Finishes).
  - 6-pillar service capabilities (Selection, Supplier Coordination, Sq. Ft. Quotations, Order Supervision, Payment Terms, Transport Logistics).
  - 4-step procurement journey from selection to site delivery.
  - Interactive square-foot estimation guide (Known Area Method vs. Room Dimension Method).
  - Wastage, edge profiling, and cutting allowance advisories.
  - Overview of the 20–25 Hosur showroom coordination network.
  - 8 specific customer FAQs on site delivery, pricing factors, and yard visits.

### 4.3. Digital Granite Catalogue Explorer ([`/[lang]/granites/catalogue`](file:///d:/BS/BS/src/app/[lang]/granites/catalogue/page.tsx))
- Interactive stone exploration component ([`GraniteCatalogueExplorer.tsx`](file:///d:/BS/BS/src/components/granite/GraniteCatalogueExplorer.tsx)).
- Real-time client-side multi-filter system:
  - **Colour Filter**: All, Black, White & Light, Grey, Brown, Red / Natural.
  - **Finish Filter**: All, Polished, Leather, Flamed, Honed.
- 10 curated commercial stone varieties with localized descriptions, pattern breakdowns, suggested applications, and available finishes:
  1. *Absolute Black Style* (Black, Polished/Honed/Leather)
  2. *Black Galaxy Style* (Black with golden specks, Polished/Honed)
  3. *Kashmir White Style* (White with garnet flecks, Polished/Honed)
  4. *Colonial White Style* (Off-white with amber accents, Polished/Leather)
  5. *Steel Grey Style* (Gunmetal grey, Polished/Flamed/Leather/Honed)
  6. *Sadarahalli Grey Style* (Salt-and-pepper South Indian grey, Polished/Flamed)
  7. *Tan Brown Style* (Earthy brown with feldspar orbs, Polished/Leather)
  8. *Desert Brown Style* (Golden sand and brown, Polished/Flamed/Honed)
  9. *Jhansi Red Style* (Ruby red/crimson, Polished/Flamed)
  10. *Multi Red / Paradiso Style* (Lilac/purplish wave striations, Polished/Leather)
- Deep linking: Query parameters (`?colour=black&style=Absolute%20Black`) auto-populate into quotation enquiry forms.

### 4.4. Lead Capture & Serverless Form Architecture
- Three dedicated enquiry forms:
  1. **General Enquiry Form** ([`EnquiryForm.tsx`](file:///d:/BS/BS/src/components/forms/EnquiryForm.tsx)) on [`/[lang]/contact`](file:///d:/BS/BS/src/app/[lang]/contact/page.tsx).
  2. **Granite Quotation Form** ([`GraniteEnquiryForm.tsx`](file:///d:/BS/BS/src/components/forms/GraniteEnquiryForm.tsx)) on [`/[lang]/granites#enquiry`](file:///d:/BS/BS/src/app/[lang]/granites/page.tsx).
  3. **Insurance Consultation Form** ([`InsuranceEnquiryForm.tsx`](file:///d:/BS/BS/src/components/forms/InsuranceEnquiryForm.tsx)) on [`/[lang]/insurance#enquiry`](file:///d:/BS/BS/src/app/[lang]/insurance/page.tsx).
- Prepared for direct **Web3Forms** integration (`https://api.web3forms.com/submit`).
- Defensive configuration checking: When `WEB3FORMS_ACCESS_KEY_PLACEHOLDER` contains `'PLACEHOLDER'`, forms disable submit buttons and render a clear status notice preventing broken transmissions.
- Honeypot anti-spam protection (`<input type="checkbox" name="botcheck" className="hidden" />`).
- Strict privacy safeguard banners reminding users never to submit Aadhaar numbers, PAN, medical records, or banking credentials.

### 4.5. Defensive Contact Channels
- Direct Telephone Call button ([`PhoneButton.tsx`](file:///d:/BS/BS/src/components/contact/PhoneButton.tsx)).
- WhatsApp Direct Click-to-Chat button ([`WhatsAppButton.tsx`](file:///d:/BS/BS/src/components/contact/WhatsAppButton.tsx)) with pre-filled localized messages tailored to the service division.
- Mobile Sticky Contact Bar ([`QuickContactButtons.tsx`](file:///d:/BS/BS/src/components/contact/QuickContactButtons.tsx)) optimized for Android smartphones.
- Zero-broken-link policy: When phone numbers or WhatsApp are unconfigured in [`src/lib/constants.ts`](file:///d:/BS/BS/src/lib/constants.ts), buttons render non-clickable pending indicators or automatically hide.

### 4.6. Strict Social Proof & Verification Framework
- Professional owner profile card ([`OwnerProfile.tsx`](file:///d:/BS/BS/src/components/common/OwnerProfile.tsx)) rendering verified photography ([`sivakumar.png`](file:///d:/BS/BS/public/images/siva-kumar/sivakumar.png)).
- Combined ~18 years professional experience highlight ([`ExperienceHighlight.tsx`](file:///d:/BS/BS/src/components/common/ExperienceHighlight.tsx)).
- Zero-fabrication award gallery ([`RecognitionGallery.tsx`](file:///d:/BS/BS/src/components/common/RecognitionGallery.tsx)): Automatically suppresses display unless authentic awards are marked `isVerified: true` with physical photographs in `/public/images/awards/`.

---

## 5. Technology Stack

| Technology | Version | Purpose | Usage / Location |
| :--- | :--- | :--- | :--- |
| **Node.js** | `>= 20.x` | Runtime Environment | Development, tooling, and build execution |
| **Next.js** | `15.1.7` | Web Framework (App Router, SSG) | Entire application structure (`src/app/`, `next.config.ts`) |
| **React** | `19.0.0` | UI Library | Component composition, Hooks, DOM rendering |
| **React DOM** | `19.0.0` | DOM Renderer for React | Web rendering layer |
| **TypeScript** | `5.7.3` | Type Safety & Interfaces | All source files in `src/**/*.ts`, `src/**/*.tsx` |
| **Tailwind CSS** | `3.4.17` | Utility-First Styling System | `tailwind.config.ts`, `src/app/globals.css` |
| **PostCSS** | `8.5.1` | CSS Processing | `postcss.config.mjs` |
| **Autoprefixer**| `10.4.20` | Vendor Prefixing | PostCSS pipeline |
| **Lucide React**| `0.475.0` | Modern SVG Iconography | Icon components throughout `src/components/` |
| **clsx** | `2.1.1` | Conditional Class Merging | Utility styling |
| **tailwind-merge**| `2.6.0` | Tailwind Class Deduplication | Utility styling |
| **Web3Forms API**| `v1` (Cloud) | Serverless Form Submissions | `https://api.web3forms.com/submit` in forms |

---

## 6. System Architecture

The following diagram illustrates the deployment topology, static generation pipeline, client routing, and third-party communication paths:

```
+---------------------------------------------------------------------------------------------------+
|                                      BUILD & EXPORT PIPELINE                                      |
|                                                                                                   |
|  [TypeScript / TSX Sources] + [Bilingual Dictionaries (en.json, ta.json)] + [Granite Catalogue]  |
|                                                  |                                                |
|                                                  v                                                |
|                                        next build (Next.js 15)                                    |
|                                                  |                                                |
|                                                  v                                                |
|                               Static HTML Export (output: 'export')                              |
|                                                  |                                                |
|                                                  v                                                |
|                 /out Directory (13 Static HTML Pages + Optimized SVGs/PNG Assets)                 |
+---------------------------------------------------------------------------------------------------+
                                                   |
                                                   v Deployed to
+---------------------------------------------------------------------------------------------------+
|                                 EDGE HOSTING / STATIC WEB SERVER                                  |
|                                  (Cloudflare / Nginx / Vercel)                                    |
+---------------------------------------------------------------------------------------------------+
                                                   |
                       +---------------------------+---------------------------+
                       |                                                       |
                       v                                                       v
+----------------------------------------------+       +--------------------------------------------+
|             DESKTOP BROWSER                  |       |          MOBILE ANDROID CLIENT             |
|  - Full Navigation Bar                       |       |  - Hamburger Slide-out Drawer              |
|  - Floating WhatsApp Widget (when enabled)   |       |  - Sticky Bottom Contact Bar (44px touch)  |
|  - Multi-column Responsive Layout            |       |  - Single-column Adaptive Viewports       |
+----------------------------------------------+       +--------------------------------------------+
                       |                                                       |
                       +---------------------------+---------------------------+
                                                   |
                                                   v Client Interactions
+---------------------------------------------------------------------------------------------------+
|                                    THIRD-PARTY INTEGRATION TIERS                                  |
|                                                                                                   |
|  1. Form Delivery:  POST payload  -->  Web3Forms API  -->  Owner Inbound Email / Dashboard        |
|  2. Direct Call:    tel: link     -->  Native Smartphone Dialer (when configured)                 |
|  3. WhatsApp Chat:  wa.me link    -->  Native WhatsApp Messenger with Pre-filled Text             |
|  4. Official Apps:  Outbound Link -->  Official LIC, Star Health, & New India Portals             |
+---------------------------------------------------------------------------------------------------+
```

---

## 7. Complete Folder Structure

```
d:/BS/BS
├── .gitignore                                   # Standard git exclusions (node_modules, out, .next)
├── next-env.d.ts                               # Next.js TypeScript ambient type definitions
├── next.config.ts                              # Next.js configuration (static export, unoptimized images)
├── package.json                                # Project dependencies, scripts, and metadata
├── package-lock.json                           # Deterministic dependency lockfile
├── postcss.config.mjs                          # PostCSS plugin pipeline (Tailwind CSS, Autoprefixer)
├── SIVA_Services_Business_Growth...docx        # Planning baseline specification (Siva Business Hub v1.0)
├── tailwind.config.ts                          # Custom brand color palette, fonts, and responsive breakpoints
├── tsconfig.json                               # TypeScript strict compiler options & path aliases (@/*)
│
├── public/                                     # Static public assets directly served from root
│   ├── favicon.ico                             # Fallback legacy browser icon
│   ├── favicon.svg                             # Modern vector SVG icon
│   └── images/
│       ├── granite-hero.svg                    # Vector graphic for granite section headers
│       ├── insurance-hero.svg                  # Vector graphic for insurance section headers
│       ├── awards/                             # Directory for genuine award photography
│       │   ├── granite/.gitkeep                # Granite supplier appreciation photography
│       │   ├── lic/.gitkeep                    # LIC agency recognition certificates
│       │   ├── new-india/.gitkeep              # New India Assurance service certificates
│       │   └── star-health/.gitkeep            # Star Health performance awards
│       ├── granite/                            # Vector illustrations for catalogue stone families
│       │   ├── black-granite.svg               # Illustrative slab graphic (Absolute Black, Galaxy)
│       │   ├── brown-granite.svg               # Illustrative slab graphic (Tan Brown, Desert Brown)
│       │   ├── granite-finishes.svg            # Explanatory finish comparison (Polished/Leather/etc.)
│       │   ├── grey-granite.svg                # Illustrative slab graphic (Steel Grey, Sadarahalli)
│       │   ├── red-granite.svg                 # Illustrative slab graphic (Jhansi Red, Paradiso)
│       │   └── white-granite.svg               # Illustrative slab graphic (Kashmir White, Colonial)
│       └── siva-kumar/                         # Authentic business owner photography
│           ├── .gitkeep
│           └── sivakumar.png                   # Verified portrait photo of Siva Kumar
│
└── src/                                        # Application source code
    ├── app/                                    # Next.js App Router root
    │   ├── globals.css                         # CSS reset, brand CSS variables, accessible focus rings
    │   ├── layout.tsx                          # Root layout rendering <html>, <body>, viewports, global meta
    │   ├── page.tsx                            # Client-side router detecting language & redirecting
    │   └── [lang]/                             # Dynamic locale route segment ('en' | 'ta')
    │       ├── layout.tsx                      # Localized layout rendering Header, Footer, & sticky actions
    │       ├── page.tsx                        # High-converting Dual-Division Homepage
    │       ├── about/
    │       │   └── page.tsx                    # Professional journey, operating principles, & bio
    │       ├── contact/
    │       │   └── page.tsx                    # Office location, telephone status, & general enquiry form
    │       ├── granites/
    │       │   ├── page.tsx                    # Siva Granites core overview, procurement steps, & quote form
    │       │   └── catalogue/
    │       │       └── page.tsx                # Interactive 10-variety stone catalogue & finish guide
    │       └── insurance/
    │           └── page.tsx                    # Insurance agency advisory, insurer cards, FAQs, & form
    │
    ├── components/                             # Reusable modular React UI components
    │   ├── common/                             # Shared components across all divisions
    │   │   ├── AwardRecognitionCard.tsx        # Individual verified award card with aspect ratio lock
    │   │   ├── Button.tsx                      # Versatile button/link component supporting 6 variants
    │   │   ├── Container.tsx                   # Responsive layout container (narrow, default, wide)
    │   │   ├── ExperienceHighlight.tsx         # Combined ~18 years experience highlight card
    │   │   ├── IconButton.tsx                  # Accessible icon action button with minimum touch target
    │   │   ├── Logo.tsx                        # Brand SVG logo mark with interlocking 'S' geometry
    │   │   ├── OwnerProfile.tsx                # Siva Kumar profile card (compact, hero, and about variants)
    │   │   ├── RecognitionGallery.tsx          # Conditional social proof gallery (suppresses unverified)
    │   │   ├── SectionHeader.tsx               # Standardized section header with badge, title, & rule
    │   │   └── ServiceCard.tsx                 # Modular card highlighting feature lists and CTAs
    │   │
    │   ├── contact/                            # Direct customer contact buttons
    │   │   ├── PhoneButton.tsx                 # Telephone button with graceful fallback when unconfigured
    │   │   ├── QuickContactButtons.tsx         # Action container for call & WhatsApp (row, stack, sticky)
    │   │   └── WhatsAppButton.tsx              # WhatsApp button with contextual pre-filled messages
    │   │
    │   ├── forms/                              # Interactive customer lead generation forms
    │   │   ├── EnquiryForm.tsx                 # General enquiry form for contact page
    │   │   ├── GraniteEnquiryForm.tsx          # Comprehensive square-footage & variety quotation form
    │   │   └── InsuranceEnquiryForm.tsx        # Consultation form for life, health, and general policies
    │   │
    │   ├── granite/                            # Domain-specific granite components
    │   │   ├── GraniteCard.tsx                 # Variety display card with tone and finish badges
    │   │   ├── GraniteCatalogueExplorer.tsx    # Interactive client-side filtered catalogue explorer
    │   │   └── GraniteCategoryBadge.tsx        # Micro-badge displaying stone tones and surface finishes
    │   │
    │   ├── insurance/                          # Domain-specific insurance components
    │   │   ├── ComplianceNotice.tsx            # Statutory IRDAI disclosure and underwriting note
    │   │   └── InsurerCard.tsx                 # Dedicated profile card for represented insurance firms
    │   │
    │   └── layout/                             # Site-wide chrome and structure
    │       ├── Footer.tsx                      # Global footer with navigation, office status, & legal text
    │       ├── Header.tsx                      # Sticky top header with location micro-bar & desktop nav
    │       ├── LanguageSwitcher.tsx            # Interactive toggle between EN and தமிழ்
    │       ├── MobileNavigation.tsx            # Slide-out drawer navigation for mobile devices
    │       └── Navigation.tsx                  # Desktop link row with active underline indicators
    │
    ├── dictionaries/                           # Static i18n translation dictionaries
    │   ├── en.json                             # Complete English strings (46 KB, 861 lines)
    │   └── ta.json                             # Complete Tamil translations (103 KB)
    │
    ├── lib/                                    # Utilities, domain models, and constants
    │   ├── constants.ts                        # Business info, disclaimers, WhatsApp templates, keys
    │   ├── dictionary.ts                       # Dictionary loader resolving dictionary by locale
    │   ├── granite-catalogue.ts                # Master catalogue data for 10 stone styles & finishes
    │   ├── recognition.ts                      # Owner profile metadata & verified awards registry
    │   └── seo.ts                              # Next.js Metadata generator for canonical URLs & OpenGraph
    │
    └── types/                                  # Central TypeScript interfaces and type declarations
        └── index.ts                            # Core types (SupportedLanguage, ServiceCategory, Payloads)
```

---

## 8. Frontend Architecture

### 8.1. Entry Points & Route Hierarchy
- **Root Entry Point ([`src/app/layout.tsx`](file:///d:/BS/BS/src/app/layout.tsx))**: Global HTML shell configuring standard viewports, meta viewport scale constraints (`maximumScale: 5`), theme color (`#17324D`), and base stylesheets.
- **Root Redirection ([`src/app/page.tsx`](file:///d:/BS/BS/src/app/page.tsx))**: Client-side execution checking `window.localStorage.getItem('siva_lang')`. If `'ta'`, redirects to `/ta`; otherwise defaults to `/en`. Includes `<noscript><meta httpEquiv="refresh" content="0;url=/en/" /></noscript>` for search indexers and non-JS clients.
- **Localized Shell ([`src/app/[lang]/layout.tsx`](file:///d:/BS/BS/src/app/[lang]/layout.tsx))**:
  - Validates `params.lang` against `['en', 'ta']`, invoking `notFound()` on invalid segments.
  - Loads the appropriate dictionary via `getDictionary(lang)`.
  - Injects [`Header`](file:///d:/BS/BS/src/components/layout/Header.tsx), `<main className="flex-1 pb-20 md:pb-0">`, and [`Footer`](file:///d:/BS/BS/src/components/layout/Footer.tsx).
  - Renders floating desktop WhatsApp trigger and mobile sticky bottom bar.

### 8.2. Page Routing Map
All pages are fully pre-rendered during build into the `/out` directory:

| Public Route | Source Component File | Page Description |
| :--- | :--- | :--- |
| `/` | [`src/app/page.tsx`](file:///d:/BS/BS/src/app/page.tsx) | Client-side locale redirector |
| `/en/` | [`src/app/[lang]/page.tsx`](file:///d:/BS/BS/src/app/[lang]/page.tsx) | Homepage (English) |
| `/ta/` | [`src/app/[lang]/page.tsx`](file:///d:/BS/BS/src/app/[lang]/page.tsx) | Homepage (Tamil) |
| `/en/about/` | [`src/app/[lang]/about/page.tsx`](file:///d:/BS/BS/src/app/[lang]/about/page.tsx) | About SIVA SERVICES & Siva Kumar (English) |
| `/ta/about/` | [`src/app/[lang]/about/page.tsx`](file:///d:/BS/BS/src/app/[lang]/about/page.tsx) | About SIVA SERVICES & Siva Kumar (Tamil) |
| `/en/insurance/` | [`src/app/[lang]/insurance/page.tsx`](file:///d:/BS/BS/src/app/[lang]/insurance/page.tsx) | Insurance Agency Services & Advisory (English) |
| `/ta/insurance/` | [`src/app/[lang]/insurance/page.tsx`](file:///d:/BS/BS/src/app/[lang]/insurance/page.tsx) | Insurance Agency Services & Advisory (Tamil) |
| `/en/granites/` | [`src/app/[lang]/granites/page.tsx`](file:///d:/BS/BS/src/app/[lang]/granites/page.tsx) | Siva Granites Overview & Sourcing (English) |
| `/ta/granites/` | [`src/app/[lang]/granites/page.tsx`](file:///d:/BS/BS/src/app/[lang]/granites/page.tsx) | Siva Granites Overview & Sourcing (Tamil) |
| `/en/granites/catalogue/` | [`src/app/[lang]/granites/catalogue/page.tsx`](file:///d:/BS/BS/src/app/[lang]/granites/catalogue/page.tsx) | Digital Granite Catalogue Explorer (English) |
| `/ta/granites/catalogue/` | [`src/app/[lang]/granites/catalogue/page.tsx`](file:///d:/BS/BS/src/app/[lang]/granites/catalogue/page.tsx) | Digital Granite Catalogue Explorer (Tamil) |
| `/en/contact/` | [`src/app/[lang]/contact/page.tsx`](file:///d:/BS/BS/src/app/[lang]/contact/page.tsx) | Direct Contact Channels & Enquiry Form (English) |
| `/ta/contact/` | [`src/app/[lang]/contact/page.tsx`](file:///d:/BS/BS/src/app/[lang]/contact/page.tsx) | Direct Contact Channels & Enquiry Form (Tamil) |

### 8.3. State Management & Data Flow
1. **Zero External Store**: The application intentionally does not use heavy state management libraries (Redux, Zustand) because state requirements are localized.
2. **Dictionary State**: Dictionaries are loaded synchronously at layout render time via [`getDictionary(lang)`](file:///d:/BS/BS/src/lib/dictionary.ts) and passed down to components via props.
3. **Filter State in Catalogue**: Handled inside [`GraniteCatalogueExplorer.tsx`](file:///d:/BS/BS/src/components/granite/GraniteCatalogueExplorer.tsx) via `useState<GraniteColour | 'all'>('all')` and `useState<GraniteFinish | 'all'>('all')`. Filtered items are derived through `useMemo()`.
4. **Form Field State**: Managed locally in each form component via controlled React state. Deep link URL parameters (`?colour=...&style=...`) are parsed inside `useEffect` to pre-populate enquiry inputs.

### 8.4. Styling System & Brand Identity
Custom extended properties in [`tailwind.config.ts`](file:///d:/BS/BS/tailwind.config.ts):
- **Primary Navy (`#17324D`)**: Core brand color, conveys corporate trust, financial integrity, and insurance stability.
- **Secondary Teal (`#278C83`)**: Conveys health, well-being, renewal, and modern customer guidance.
- **Granite Sandstone (`#C2A27C`)**: Conveys natural stone minerals, earthiness, architectural prestige, and warmth.
- **Charcoal (`#30343B`)**: Represents raw granite slab textures, high-contrast readable typography, and dark UI backgrounds.
- **Light (`#F7F8FA`)**: Clean, anti-glare off-white background ensuring high legibility in mobile sunlight.
- **Accessibility**: Minimum interactive element height of `44px` on mobile screens, explicit `:focus-visible` outlines (`2px solid #278C83`), and color contrast ratios exceeding WCAG AA standards.

---

## 9. Backend Architecture

### 9.1. Current Architectural Paradigm: Static Export (SSG)
In accordance with `output: "export"` in [`next.config.ts`](file:///d:/BS/BS/next.config.ts), **there is currently no Node.js server runtime running on the web server**.
- **No Node.js Server Process**: Pages are pre-rendered into static HTML/CSS/JS.
- **No Dynamic Next.js API Routes**: There are no `/api/*` endpoints inside `src/app/`.
- **Form Submission Backend**: Leverages **Web3Forms** as a serverless form endpoint (`https://api.web3forms.com/submit`). Forms submit standard `multipart/form-data` or `application/x-www-form-urlencoded` payloads over HTTPS.

### 9.2. Planned Backend Architecture: Siva Business Hub
According to the baseline specification ([`SIVA_Services_Business_Growth_and_Software_Plan_v1.docx`](file:///d:/BS/BS/SIVA_Services_Business_Growth_and_Software_Plan_v1.docx)), an internal operations platform named **Siva Business Hub** will be developed to handle backend operations:
- **Core Operations**: Customer Relationship Management (CRM), Insurance policy renewal calendar, Granite supplier directory (20–25 vendors), Per-sq-ft quotation calculation engine, Expense logging, and Commission tracking.
- **Deployment**: Single-owner Android smartphone app or authenticated web dashboard.

---

## 10. Database Architecture

### 10.1. Current Client-Side Data Architecture
Because the portal operates as a Static HTML Export, it does not connect to a live SQL or NoSQL database. Instead, structured data is managed through type-safe in-memory TypeScript definitions and static JSON registries:

1. **Business Master Information ([`src/lib/constants.ts`](file:///d:/BS/BS/src/lib/constants.ts))**:
   - `BUSINESS_INFO: BusinessDetails`
   - `INSURANCE_COMPANIES: InsuranceServiceInfo[]`
   - `GRANITE_SERVICES: GraniteServiceInfo[]`
   - `WHATSAPP_MESSAGES: Record<SupportedLanguage, Record<ServiceCategory, string>>`
   - `REGULATORY_DISCLAIMER: Record<SupportedLanguage, string>`
2. **Granite Varieties Master Catalog ([`src/lib/granite-catalogue.ts`](file:///d:/BS/BS/src/lib/granite-catalogue.ts))**:
   - `GRANITE_CATALOGUE_ITEMS: GraniteCatalogueItem[]` (10 fully detailed stone entries with finishes, localized descriptions, and asset paths).
3. **Recognition & Profile Master ([`src/lib/recognition.ts`](file:///d:/BS/BS/src/lib/recognition.ts))**:
   - `OWNER_PROFILE: OwnerProfileInfo`
   - `COMPANY_RECOGNITION_AWARDS: AwardItem[]`
4. **Bilingual Strings Repositories ([`src/dictionaries/`](file:///d:/BS/BS/src/dictionaries/))**:
   - `en.json` (English translation graph)
   - `ta.json` (Tamil translation graph)

---

## 11. Database Schema Documentation

### 11.1. TypeScript Schemas (Implemented in Codebase)

The following interfaces in [`src/types/index.ts`](file:///d:/BS/BS/src/types/index.ts) and [`src/lib/granite-catalogue.ts`](file:///d:/BS/BS/src/lib/granite-catalogue.ts) define the data models:

#### `BusinessDetails`
```typescript
interface BusinessDetails {
  name: string;                   // "SIVA SERVICES"
  owner: string;                  // "Siva Kumar"
  location: string;               // "Hosur, Tamil Nadu, India"
  phone: string | null;           // Telephone string or null if unconfigured
  whatsapp: string | null;        // WhatsApp digits or null if unconfigured
  email: string | null;           // Official email or null
  address: string | null;         // Office street address or null
  isPhoneConfigured: boolean;     // Activation flag for telephone links
  isWhatsAppConfigured: boolean;  // Activation flag for WhatsApp links
  isEmailConfigured: boolean;     // Activation flag for email links
  isAddressConfigured: boolean;   // Activation flag for physical address
}
```

#### `GraniteCatalogueItem`
```typescript
interface GraniteCatalogueItem {
  id: string;                     // Unique slug (e.g., 'absolute-black')
  name: { en: string; ta: string };
  colour: 'black' | 'white' | 'grey' | 'brown' | 'red';
  finishes: ('polished' | 'leather' | 'flamed' | 'honed')[];
  imageSrc: string;               // Path to SVG visual in /public/images/granite/
  imageAlt: { en: string; ta: string };
  colourDescription: { en: string; ta: string };
  patternDescription: { en: string; ta: string };
  suggestedUsage: { en: string; ta: string };
  finishNotes: { en: string; ta: string };
}
```

#### `AwardItem`
```typescript
interface AwardItem {
  id: string;                     // Unique award identifier
  category: 'lic' | 'new-india' | 'star-health' | 'granite';
  companyName: string;            // Official issuing entity
  imageSrc: string;               // Path to verified image in /public/images/awards/
  altText: { en: string; ta: string };
  title?: { en: string; ta: string };
  year?: string;
  caption?: { en: string; ta: string };
  isVerified: boolean;            // STRICT: Must be true to render
}
```

#### `Web3FormsPayload`
```typescript
interface Web3FormsPayload {
  access_key: string;             // Web3Forms API Access Key
  subject: string;                // Notification email subject
  from_name: string;              // Sender header title
  name: string;                   // Customer full name
  phone: string;                  // 10-digit mobile number
  email?: string;                 // Customer email (optional)
  service_category: 'insurance' | 'granite' | 'general';
  specific_requirement?: string;  // Detailed requirement description
  location?: string;              // Customer city/district
  message?: string;               // Additional message or notes
  botcheck?: boolean;             // Honeypot spam trap
}
```

### 11.2. Planned Relational Schema (Siva Business Hub)
Based on the planning document ([`SIVA_Services_Business_Growth_and_Software_Plan_v1.docx`](file:///d:/BS/BS/SIVA_Services_Business_Growth_and_Software_Plan_v1.docx)), the following relational schema is planned for the backend:

```
+-----------------------------------+        +-----------------------------------+
|             CUSTOMERS             |        |             SUPPLIERS             |
+-----------------------------------+        +-----------------------------------+
| id: UUID [PK]                     |        | id: UUID [PK]                     |
| full_name: VARCHAR(255)           |        | company_name: VARCHAR(255)        |
| phone: VARCHAR(20) [INDEX]        |        | contact_person: VARCHAR(255)      |
| alternate_phone: VARCHAR(20)      |        | phone: VARCHAR(20)                |
| district: VARCHAR(100)            |        | location: VARCHAR(255) (Hosur)    |
| address: TEXT                     |        | stone_varieties: TEXT[]           |
| lead_source: VARCHAR(50)          |        | rating: DECIMAL(2,1)              |
| created_at: TIMESTAMP             |        | notes: TEXT                       |
+-----------------------------------+        +-----------------------------------+
          |                      |                             |
          | 1:N                  | 1:N                         | 1:N
          v                      v                             v
+-----------------------+  +-----------------------+  +-----------------------+
|  INSURANCE_POLICIES   |  |   GRANITE_QUOTES      |  |    GRANITE_ORDERS     |
+-----------------------+  +-----------------------+  +-----------------------+
| id: UUID [PK]         |  | id: UUID [PK]         |  | id: UUID [PK]         |
| customer_id: UUID[FK] |  | customer_id: UUID[FK] |  | quote_id: UUID [FK]   |
| insurer_name: VARCHAR |  | stone_variety: VARCHAR|  | supplier_id: UUID [FK]|
| policy_number: VARCHAR|  | sqft_area: DECIMAL    |  | total_amount: DECIMAL |
| plan_name: VARCHAR    |  | finish_type: VARCHAR  |  | advance_paid: DECIMAL |
| premium_amount: DEC   |  | rate_per_sqft: DECIMAL|  | balance_due: DECIMAL  |
| renewal_date: DATE    |  | estimated_total: DEC  |  | delivery_status: ENUM |
| commission_rate: DEC  |  | status: ENUM          |  | site_address: TEXT    |
+-----------------------+  +-----------------------+  +-----------------------+
```

---

## 12. API Documentation

Because SIVA SERVICES is built as an SSG client, all API interactions are outbound client-to-cloud communications. There are no local endpoints hosted on this server.

### Outbound Third-Party Endpoints

| Method | Target Endpoint | Purpose | Authentication | Request Body / Payload | Expected Response |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `https://api.web3forms.com/submit` | General customer enquiry submission | Web3Forms Access Key (`access_key`) | `FormData`: `access_key`, `name`, `phone`, `service_category`, `message`, `subject`, `from_name`, `botcheck` | JSON `{ success: true, message: "Form submitted successfully" }` |
| `POST` | `https://api.web3forms.com/submit` | Granite quotation enquiry submission | Web3Forms Access Key (`access_key`) | `FormData`: `access_key`, `name`, `phone`, `district`, `area`, `measurementAssistance`, `colour`, `finish`, `usageArea`, `message`, `botcheck` | JSON `{ success: true, message: "Form submitted successfully" }` |
| `POST` | `https://api.web3forms.com/submit` | Insurance consultation enquiry submission | Web3Forms Access Key (`access_key`) | `FormData`: `access_key`, `name`, `phone`, `company`, `category`, `location`, `message`, `botcheck` | JSON `{ success: true, message: "Form submitted successfully" }` |
| `GET` | `https://wa.me/{phone}?text={encoded}` | Direct WhatsApp enquiry initiation | None (Client URL redirect) | URL Query: Pre-filled UTF-8 encoded text message based on service category | Opens WhatsApp native mobile client or WhatsApp Web chat |
| `GET` | `tel:{phone}` | Direct mobile dialer invocation | None (OS Protocol) | URI phone digits | Triggers device phone dialer |

---

## 13. Authentication & Authorization

### 13.1. Public Web Portal (Current Codebase)
- **Zero Authentication Required**: The public web portal is designed for prospective and existing customers. All marketing pages, catalogues, and enquiry forms are publicly accessible without authentication.
- **Client Security & Anti-Abuse**:
  - Hidden honeypot fields (`botcheck`) prevent basic spam submissions.
  - Form validation on required fields (`name`, `phone`, `district`).
  - Privacy notices prevent the capture of sensitive identification numbers.

### 13.2. Internal Platform Authentication (Planned: Siva Business Hub)
- **Role-Based Single Owner Login**: Siva Kumar will have sole administrative access to the internal platform.
- **Planned Stack**: Supabase Auth or NextAuth.js with phone OTP or email/password authentication and session token storage.

---

## 14. Important Application Workflows

### 14.1. Language Selection & Switching Workflow
```
User visits /
  │
  ├─► [src/app/page.tsx] checks localStorage.getItem('siva_lang')
  │     ├─► If 'ta' ──► router.replace('/ta')
  │     └─► Default ──► router.replace('/en')
  │
User on any page (e.g. /en/granites/catalogue) clicks "தமிழ்" in LanguageSwitcher
  │
  ├─► onClick writes localStorage.setItem('siva_lang', 'ta')
  └─► Link routes to /ta/granites/catalogue (preserving route path)
```

### 14.2. Granite Catalogue Discovery & Quotation Workflow
```
User navigates to /[lang]/granites/catalogue/
  │
  ├─► User applies filters (e.g. Colour: Black, Finish: Polished)
  │     └─► GraniteCatalogueExplorer filters 10 items in real-time
  │
  ├─► User selects "Absolute Black Style" and clicks "Request Quotation"
  │     └─► Navigates to /[lang]/granites#enquiry?colour=black&style=Absolute%20Black
  │
  ├─► GraniteEnquiryForm parses query params in useEffect()
  │     └─► Pre-populates 'colour' input and 'message' textarea
  │
  └─► Form submission check:
        ├─► If WEB3FORMS_ACCESS_KEY is PLACEHOLDER:
        │     └─► Submission blocked, status notice displayed
        └─► If configured:
              └─► POST payload sent to Web3Forms API
```

### 14.3. Direct Contact Initiation Workflow (Call / WhatsApp)
```
User taps "Call" or "WhatsApp" button on any page
  │
  ├─► Component inspects BUSINESS_INFO.isPhoneConfigured / isWhatsAppConfigured
  │
  ├─► IF FALSE (Current State):
  │     ├─► Desktop/Inline Button: Renders disabled button with "(Pending)" badge
  │     ├─► Floating WhatsApp Widget: Returns null (hidden)
  │     └─► Mobile Sticky Bottom Bar: Returns null (hidden, saves screen real estate)
  │
  └─► IF TRUE (Once Configured):
        ├─► Telephone Button: Generates active tel:+91XXXXXXXXXX link
        └─► WhatsApp Button: Generates https://wa.me/91XXXXXXXXXX?text=Hello%20Siva...
```

---

## 15. Third-Party Integrations

1. **Web3Forms API (`api.web3forms.com`)**:
   - *Role*: Serverless form endpoint forwarding customer enquiries directly to the owner's email without requiring an active backend server.
   - *Configuration*: Requires an access key in `WEB3FORMS_ACCESS_KEY_PLACEHOLDER` ([`src/lib/constants.ts`](file:///d:/BS/BS/src/lib/constants.ts)).
2. **WhatsApp Direct API (`wa.me`)**:
   - *Role*: Direct communication link opening customer conversations with pre-filled inquiries.
   - *Configuration*: Controlled via `BUSINESS_INFO.whatsapp` and `isWhatsAppConfigured` in [`src/lib/constants.ts`](file:///d:/BS/BS/src/lib/constants.ts).
3. **Official Insurance Portals**:
   - *Institutions*: LIC of India, The New India Assurance Co. Ltd., Star Health and Allied Insurance.
   - *Role*: Outbound referral targets for official policy processing and premium payments.

---

## 16. Environment Variables

The project currently does not require a `.env` file for core static building because public constants and placeholders are centralized in [`src/lib/constants.ts`](file:///d:/BS/BS/src/lib/constants.ts).

### Recommended Environment Configuration for Production

To externalize configuration without hardcoding constants in source files, the following environment variables can be utilized:

```bash
# Web3Forms API Access Key for inbound contact form emails
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY="your-actual-web3forms-access-key-here"

# Business Telephone & WhatsApp (10 digits without spaces or leading zero)
NEXT_PUBLIC_BUSINESS_PHONE="+919876543210"
NEXT_PUBLIC_BUSINESS_WHATSAPP="919876543210"

# Business Email Address
NEXT_PUBLIC_BUSINESS_EMAIL="contact@sivaservices.in"

# Physical Office Address
NEXT_PUBLIC_BUSINESS_ADDRESS="Near Bus Stand, Bagalur Road, Hosur, Tamil Nadu 635109"

# Production Canonical Base URL
NEXT_PUBLIC_SITE_URL="https://sivaservices.in"
```

> [!IMPORTANT]
> Never commit live production secrets, private keys, or API tokens to source control.

---

## 17. Installation & Setup

### Prerequisites
- **Node.js**: Version `20.x` or higher (LTS recommended)
- **npm**: Version `10.x` or higher (packaged with Node.js)
- **Git**: For version control

### Step-by-Step Installation

1. **Clone or Open the Repository**:
   ```bash
   cd d:/BS/BS
   ```

2. **Verify Node.js Version**:
   ```bash
   node -v
   npm -v
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

---

## 18. Running the Application

### Development Server
Starts the Next.js development server with hot-module reloading and TypeScript checking:

```bash
npm run dev
```

- Local URL: `http://localhost:3000`
- Network URL: Displayed in the terminal output.

### Testing Language Routes Locally
- English Homepage: `http://localhost:3000/en/`
- Tamil Homepage: `http://localhost:3000/ta/`
- Granite Catalogue: `http://localhost:3000/en/granites/catalogue/`
- Insurance Overview: `http://localhost:3000/en/insurance/`

---

## 19. Build & Deployment

### Production Build & Static Export

The project is configured for static export (`output: "export"` in `next.config.ts`). Running the build script compiles the code and generates the static assets into the `/out` directory:

```bash
npm run build
```

Build execution steps performed by Next.js:
1. `next build` parses all pages in `src/app/`.
2. Static parameters from `generateStaticParams()` generate HTML for `['en', 'ta']`.
3. Client bundles are minified and optimized into `.next/static/`.
4. The static export engine generates all HTML files, SVGs, and text manifests into the `out/` directory.

### Serving the Production Export Locally

To test the exported static site locally without running the Next.js dev server:

```bash
# Using npx serve
npx serve out

# Or using Python's built-in HTTP server
python -m http.server --directory out 8080
```

### Production Deployment Options

1. **Vercel / Netlify**: Connect the Git repository and set the publish directory to `out`.
2. **Cloudflare Pages**: Connect the Git repository, set build command to `npm run build`, and set build output directory to `out`.
3. **Nginx / Apache Server**: Copy the contents of `/out` directly to the web server's root directory (e.g., `/var/www/html`).
4. **AWS S3 + CloudFront**: Sync `/out` to an S3 bucket configured for static website hosting with CloudFront CDN distribution.

---

## 20. Testing

### Current Status
- Unit and end-to-end testing frameworks (such as Jest, Vitest, or Playwright) are not currently configured in `package.json`.
- Type checking is enforced during build via TypeScript (`tsc --noEmit`).

### Recommended Verification Commands

1. **TypeScript Type Check**:
   ```bash
   npx tsc --noEmit
   ```

2. **Linting Verification**:
   ```bash
   npx next lint
   ```

3. **Recommended Test Suite Additions**:
   - `vitest` + `@testing-library/react` for unit testing components like `GraniteCatalogueExplorer` and `LanguageSwitcher`.
   - `playwright` for cross-browser testing of bilingual route transitions and form submission flows.

---

## 21. Known Issues & Technical Debt

### Verified Implementation Findings

1. **Web3Forms Submissions Inactive by Design**:
   - `WEB3FORMS_ACCESS_KEY_PLACEHOLDER` in [`src/lib/constants.ts`](file:///d:/BS/BS/src/lib/constants.ts) is set to `'YOUR_WEB3FORMS_ACCESS_KEY_PLACEHOLDER'`.
   - Forms correctly block submissions and show an informational pending badge. A genuine key must be configured before production launch.
2. **Direct Contact Links Disabled by Design**:
   - Phone, WhatsApp, email, and street address in `BUSINESS_INFO` are set to `null` with configuration flags set to `false`.
   - Direct call/chat links correctly render pending indicators to avoid dead links. Real numbers must be configured before marketing rollout.
3. **Award Recognition Gallery Empty**:
   - `COMPANY_RECOGNITION_AWARDS` in [`src/lib/recognition.ts`](file:///d:/BS/BS/src/lib/recognition.ts) is an empty array with sample items commented out.
   - The UI correctly suppresses award sections on the live site until verified certificates are supplied.
4. **Static Stone Visuals**:
   - Catalogue stone images in `/public/images/granite/` are clean vector SVGs representing stone color families. High-resolution slab photographs can be added in future iterations.

### Potential Architectural Risks

1. **Client-Side Form Submissions**: Directly submitting forms from the client to Web3Forms relies on the client's network connectivity to `api.web3forms.com`.
2. **Large Tamil Translation Dictionary**: `ta.json` is ~103 KB. While statically baked into the pre-rendered HTML, maintaining it requires careful structural synchronization with `en.json`.

---

## 22. Future Improvements & Planned Roadmap

As outlined in the baseline planning specification ([`SIVA_Services_Business_Growth_and_Software_Plan_v1.docx`](file:///d:/BS/BS/SIVA_Services_Business_Growth_and_Software_Plan_v1.docx)), the following enhancements are planned:

### Phase 1: Launch Readiness
- [ ] Configure live Web3Forms Access Key for lead routing.
- [ ] Add genuine telephone, WhatsApp, and office address details.
- [ ] Add authentic award and recognition photographs to `/public/images/awards/`.
- [ ] Replace illustrative SVG stone graphics with high-resolution photography of physical slabs from Hosur yards.

### Phase 2: Siva Business Hub (Internal Operations Platform)
- [ ] **Customer Relationship Management (CRM)**: Track client interactions across insurance and granite inquiries.
- [ ] **Insurance Policy Management**: Renewal reminder calendar, claim tracking, and commission recording.
- [ ] **Granite Sourcing & Quotation Engine**: Supplier registry of 20–25 Hosur showrooms, real-time per-sq-ft rate calculator, and PDF quotation generator.
- [ ] **Financial & Expense Tracking**: Private owner dashboard tracking monthly net profit toward the 12-month 3X growth target.

---

## 23. Important Files & Their Responsibilities

| File Path | Primary Responsibility |
| :--- | :--- |
| [`next.config.ts`](file:///d:/BS/BS/next.config.ts) | Configures static export mode (`output: "export"`), image settings, and trailing slashes |
| [`tailwind.config.ts`](file:///d:/BS/BS/tailwind.config.ts) | Defines custom color tokens (navy, teal, sandstone, charcoal) and font stacks |
| [`src/types/index.ts`](file:///d:/BS/BS/src/types/index.ts) | Core TypeScript interfaces for business details, awards, forms, and navigation |
| [`src/lib/constants.ts`](file:///d:/BS/BS/src/lib/constants.ts) | Single source of truth for business details, regulatory disclaimers, and contact templates |
| [`src/lib/dictionary.ts`](file:///d:/BS/BS/src/lib/dictionary.ts) | Dictionary resolution module serving `en.json` or `ta.json` |
| [`src/lib/granite-catalogue.ts`](file:///d:/BS/BS/src/lib/granite-catalogue.ts) | Master dataset of 10 commercial granite varieties, descriptions, and finish options |
| [`src/lib/recognition.ts`](file:///d:/BS/BS/src/lib/recognition.ts) | Owner profile metadata and verified award filtering logic |
| [`src/lib/seo.ts`](file:///d:/BS/BS/src/lib/seo.ts) | Dynamic Next.js Metadata generator for canonical URLs, OpenGraph, and language alternates |
| [`src/app/page.tsx`](file:///d:/BS/BS/src/app/page.tsx) | Root client-side redirector with `localStorage` language detection and `<noscript>` fallback |
| [`src/app/[lang]/layout.tsx`](file:///d:/BS/BS/src/app/[lang]/layout.tsx) | Locale layout wrapper with `generateStaticParams()`, header, footer, and contact buttons |
| [`src/app/[lang]/page.tsx`](file:///d:/BS/BS/src/app/[lang]/page.tsx) | High-converting homepage introducing both business divisions and key workflows |
| [`src/app/[lang]/granites/page.tsx`](file:///d:/BS/BS/src/app/[lang]/granites/page.tsx) | Siva Granites overview, 6-pillar capabilities, sq. ft. calculation guide, and quotation form |
| [`src/app/[lang]/granites/catalogue/page.tsx`](file:///d:/BS/BS/src/app/[lang]/granites/catalogue/page.tsx) | Digital granite variety exploration page with finish guides and interactive filters |
| [`src/app/[lang]/insurance/page.tsx`](file:///d:/BS/BS/src/app/[lang]/insurance/page.tsx) | Insurance agency services page for LIC, New India, and Star Health |
| [`src/app/[lang]/about/page.tsx`](file:///d:/BS/BS/src/app/[lang]/about/page.tsx) | Detailed professional profile of Siva Kumar and ~18-year journey narrative |
| [`src/app/[lang]/contact/page.tsx`](file:///d:/BS/BS/src/app/[lang]/contact/page.tsx) | Direct communication channels, office information, and general enquiry form |
| [`src/components/granite/GraniteCatalogueExplorer.tsx`](file:///d:/BS/BS/src/components/granite/GraniteCatalogueExplorer.tsx) | Interactive client component for filtering granite varieties by color and finish |
| [`src/components/forms/GraniteEnquiryForm.tsx`](file:///d:/BS/BS/src/components/forms/GraniteEnquiryForm.tsx) | Granite inquiry form with measurement options and deep link parameter prefill |
| [`src/components/forms/InsuranceEnquiryForm.tsx`](file:///d:/BS/BS/src/components/forms/InsuranceEnquiryForm.tsx) | Insurance inquiry form with company and service category selection |
| [`src/components/contact/PhoneButton.tsx`](file:///d:/BS/BS/src/components/contact/PhoneButton.tsx) | Defensive call button with automatic fallback when unconfigured |
| [`src/components/contact/WhatsAppButton.tsx`](file:///d:/BS/BS/src/components/contact/WhatsAppButton.tsx) | Defensive WhatsApp button with service-specific prefilled messages |

---

## 24. Developer Guide

### How to Add a New Granite Variety

1. Open [`src/lib/granite-catalogue.ts`](file:///d:/BS/BS/src/lib/granite-catalogue.ts).
2. Append a new `GraniteCatalogueItem` object to `GRANITE_CATALOGUE_ITEMS`:
   ```typescript
   {
     id: 'paradiso-classic',
     name: {
       en: 'Paradiso Classic Style',
       ta: 'பாரடைசோ கிளாசிக் பாணி',
     },
     colour: 'red',
     finishes: ['polished', 'leather'],
     imageSrc: '/images/granite/red-granite.svg',
     imageAlt: {
       en: 'Paradiso Classic granite slab sample',
       ta: 'பாரடைசோ கிளாசிக் கிரானைட் மாதிரி தோற்றம்',
     },
     colourDescription: {
       en: 'Multi-colour wave pattern with purple, grey and violet hues.',
       ta: 'ஊதா, சாம்பல் மற்றும் பலவண்ண அலை வரிகள் கொண்ட இயற்கை அமைப்பு.',
     },
     patternDescription: {
       en: 'Metamorphic swirling mineral veins across the slab.',
       ta: 'கல்லின் குறுக்கே சுழலும் இயற்கை கனிம நதி போன்ற அமைப்பு.',
     },
     suggestedUsage: {
       en: 'Staircase risers, living room borders, and feature walls.',
       ta: 'படிக்கட்டுகள், வரவேற்பறை பார்டர்கள் மற்றும் முகப்பு சுவர்கள்.',
     },
     finishNotes: {
       en: 'Polished brings out contrast; leather gives a tactile finish.',
       ta: 'பாலிஷ் வண்ணங்களை எடுப்பாக காட்டும்; லெதர் தொடு உணர்வை தரும்.',
     },
   }
   ```
3. Run `npm run build` to verify type safety and pre-render the new variety into `/out`.

### How to Add Verified Company Recognition Awards

1. Place the genuine photograph in the appropriate subfolder:
   - LIC: `/public/images/awards/lic/filename.webp`
   - Star Health: `/public/images/awards/star-health/filename.webp`
   - New India Assurance: `/public/images/awards/new-india/filename.webp`
   - Siva Granites: `/public/images/awards/granite/filename.webp`
2. Open [`src/lib/recognition.ts`](file:///d:/BS/BS/src/lib/recognition.ts).
3. Add a new `AwardItem` entry to `COMPANY_RECOGNITION_AWARDS` with `isVerified: true`:
   ```typescript
   {
     id: 'lic-branch-recognition-2024',
     category: 'lic',
     companyName: 'Life Insurance Corporation of India (LIC)',
     imageSrc: '/images/awards/lic/lic-recognition-2024.webp',
     altText: {
       en: 'Siva Kumar receiving recognition from LIC branch officials',
       ta: 'எல்.ஐ.சி அதிகாரிகளிடம் இருந்து பாராட்டு பெறும் சிவகுமார்',
     },
     title: {
       en: 'Performance Recognition',
       ta: 'சிறந்த சேவை அங்கீகாரம்',
     },
     year: '2024',
     caption: {
       en: 'Presented for consistent policyholder service in Hosur.',
       ta: 'ஓசூரில் வாடிக்கையாளர் சேவைக்காக வழங்கப்பட்ட அங்கீகாரம்.',
     },
     isVerified: true,
   }
   ```
4. The award will now automatically render in [`RecognitionGallery`](file:///d:/BS/BS/src/components/common/RecognitionGallery.tsx) across the website.

### How to Activate Direct Contact Channels & Online Forms

1. Open [`src/lib/constants.ts`](file:///d:/BS/BS/src/lib/constants.ts).
2. Configure genuine contact credentials in `BUSINESS_INFO`:
   ```typescript
   export const BUSINESS_INFO: BusinessDetails = {
     name: 'SIVA SERVICES',
     owner: 'Siva Kumar',
     location: 'Hosur, Tamil Nadu, India',
     phone: '+919876543210',
     whatsapp: '919876543210',
     email: 'contact@sivaservices.in',
     address: 'Near Bus Stand, Bagalur Road, Hosur, Tamil Nadu 635109',
     isPhoneConfigured: true,
     isWhatsAppConfigured: true,
     isEmailConfigured: true,
     isAddressConfigured: true,
   };
   ```
3. Update `WEB3FORMS_ACCESS_KEY_PLACEHOLDER` with the live access key:
   ```typescript
   export const WEB3FORMS_ACCESS_KEY_PLACEHOLDER = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
   ```
4. Rebuild the application:
   ```bash
   npm run build
   ```
   All call buttons, WhatsApp triggers, and forms will activate across the site.

---

*Documentation compiled and verified against application source code by Senior Software Architect & Codebase Analyst.*

