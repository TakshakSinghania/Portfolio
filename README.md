# Takshak Singhania — Software Engineer

Personal developer portfolio and interactive engineering showcase of Takshak Singhania, a Software Engineering student at IIIT Bhopal specializing in full-stack web applications, backend systems, and interaction design. The website blends Swiss editorial typography and minimalist monochromatic design with spatial 3D interactions and deep, evidence-based engineering case studies.

## 🌐 Live Portfolio

[Visit Live Portfolio](https://portfolio-lake-six-51.vercel.app)

https://portfolio-lake-six-51.vercel.app

## ✨ About

This portfolio showcases production web applications, distributed backend architectures, and algorithmic systems alongside modern creative development techniques. Designed from scratch as an experimental digital piece, it demonstrates:

- **End-to-End Engineering**: Real systems handling database concurrency, row-level locking, asynchronous queues, and real-time WebSockets.
- **Physical Interaction Quality**: Apple-grade spring physics, smooth momentum drag, scroll-driven typography transformations, and 3D CSS perspective card systems.
- **Evidence-Based Storytelling**: In-depth architectural case studies detailing system constraints, failure modes, trade-offs, and verification suites.

## 🚀 Featured Projects

### 01. Sentosa — The Coffee Unit
*Tabletop QR Ordering, Live Kitchen KDS & POS Platform*

- **Description**: A full-stack restaurant QR ordering and kitchen operations platform combining tabletop QR resolution, mobile OTP authentication, and real-time kitchen synchronization.
- **Technical Highlights**:
  - **Server-Authoritative Pricing**: Subtotals, multi-group modifiers, and tax calculations computed entirely server-side via PostgreSQL and Prisma ORM to prevent client-side cart tampering.
  - **Real-Time Synchronization**: Full-duplex WebSocket dispatch (Socket.IO) with room scoping to stream orders to kitchen display systems (KDS) under 150ms latency.
  - **Security & Idempotency**: 16-character cryptographic session tokens preventing cross-table order tampering, paired with Razorpay payment webhooks protected by constant-time HMAC-SHA256 signature verification.
- **Tech Stack**: React, TypeScript, Node.js, Express, PostgreSQL, Prisma, Socket.IO, Razorpay, Tailwind CSS
- **Repository**: [github.com/TakshakSinghania/sentosa-qr-ordering](https://github.com/TakshakSinghania/sentosa-qr-ordering)

### 02. PayFlow
*Payment Lifecycle Engine & Distributed Asynchronous Queue*

- **Description**: A high-reliability payment lifecycle engine and distributed webhook delivery system engineered to prevent race conditions during concurrent captures and refunds.
- **Technical Highlights**:
  - **Row-Level Concurrency Control**: Strict 6-state payment machine (`CREATED`, `AUTHORIZED`, `CAPTURED`, `REFUNDED`, `FAILED`, `VOIDED`) enforced with PostgreSQL `SELECT FOR UPDATE` row locks to eliminate double-capture race conditions.
  - **Distributed Idempotency**: SHA-256 request hashing with database unique constraint indexing to gracefully absorb duplicate submissions without unhandled errors.
  - **Resilient Webhook Dispatch**: Redis and BullMQ job queues featuring a 5-tier exponential backoff retry mechanism (1m, 5m, 15m, 1h, 6h) with HMAC-SHA256 payload signing.
- **Tech Stack**: TypeScript, React, Node.js, PostgreSQL, Redis, BullMQ, Docker
- **Repository**: [github.com/TakshakSinghania/Payflow](https://github.com/TakshakSinghania/Payflow)

### 03. RouteWise
*In-Memory Spatial Graph Engine & 2-Opt Tour Optimizer*

- **Description**: A spatial routing engine built on OpenStreetMap vector data across 5 global downtown districts, modeling 14,000+ street nodes to compute optimal multi-stop delivery tours.
- **Technical Highlights**:
  - **Binary MinHeap Priority Queue**: Custom heap implementation accelerating frontier node extraction to $O(\log V)$ for Dijkstra and A* pathfinding.
  - **2-Opt Local Search Heuristic**: Iteratively resolves multi-waypoint Travelling Salesperson Problem (TSP) tours by untangling crossing road intersections in sub-millisecond runtimes.
  - **Geodesic Distance**: Spherical surface distance calculation via the Haversine formula across latitude/longitude coordinates.
- **Tech Stack**: JavaScript, React, Node.js, Express, OpenStreetMap Vector Data
- **Repository**: [github.com/TakshakSinghania/Routewise](https://github.com/TakshakSinghania/Routewise)

### 04. AI Code Review Platform *(Concept / In Development)*
- **Description**: Developer tooling concept designed to automate semantic GitHub pull request reviews.
- **Technical Highlights**: AST syntax tree diff extraction to isolate functional code modifications from formatting changes, evaluated against security heuristics and LLM contexts.
- **Tech Stack**: TypeScript, Next.js, Gemini API, GitHub Apps, Babel AST Parser

### 05. AI Document Intelligence *(Concept / In Development)*
- **Description**: Hybrid retrieval pipeline engineered for dense technical RFCs, system runbooks, and API specifications.
- **Technical Highlights**: Blends PostgreSQL Full-Text Search (tsvector BM25) with dense vector embeddings (`pgvector`) using Reciprocal Rank Fusion and hierarchical markdown chunking.
- **Tech Stack**: Python, TypeScript, FastAPI, PostgreSQL, pgvector, LangChain

## 🛠️ Tech Stack

- **Frontend & UI**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Animation & Motion**: Framer Motion, Lenis (Smooth Scroll), Lucide Icons
- **Backend & APIs**: Node.js, Express, RESTful APIs, WebSockets (Socket.IO)
- **Databases & Caching**: PostgreSQL, Prisma ORM, Redis
- **Queues & Concurrency**: BullMQ, PostgreSQL Row-Level Locking (`SELECT FOR UPDATE`)
- **DevOps & Tooling**: Docker, Git / GitHub, Vercel, ESLint, PostCSS

## 🎨 Design

The portfolio is built with an intentional, restrained design system inspired by Swiss editorial layouts and Apple-grade fluid interactions:

- **Editorial Aesthetic**: Monumental grotesque typography (`clamp(2.8rem, 9.5vw, 11rem)`) with tight leading (`0.88`) and structured monospace metadata taxonomy.
- **Monochromatic Palette**: High-contrast dark foundation (`#050505`) with crisp off-white typography (`#F5F5F7` / `#F5F5F5`) and subtle structural borders.
- **Interactive 3D Identity Card**: Minimal personal card in the hero with Apple-grade mouse spring physics (`damping: 24, stiffness: 220`), dynamic specular light sheen, and 180° flip between English (`TAKSHAK SINGHANIA`) and Hindi (`तक्षक सिंघानिया`).
- **3D Circular Orbit Carousel**: Project cards arranged along a 3D elliptical orbit supporting momentum drag and scroll rotation, with an instant toggle to a clean **Scattered Grid View**.
- **Scroll-Driven Motion**: Bidirectional typography drift on major section headings (`SELECTED PROJECTS`, `ABOUT & EXPERIENCE`) synchronized with viewport progress.
- **Accessibility & Performance**: Native cursor interaction, reduced-motion media query support, zero layout shift, and independent modal scroll isolation with background lock.

## 📁 Project Structure

```
portfolio/
├── public/                     # Static assets (project schematics, photography, resume)
│   ├── images/
│   │   ├── photography/        # Architectural and silicon SVG/JPG assets
│   │   └── projects/           # High-fidelity project schematics
│   └── resume.pdf              # Downloadable PDF resume
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # CSS tokens, typography classes, 3D utilities
│   │   ├── layout.tsx          # Root layout, metadata, viewport configuration
│   │   └── page.tsx            # Main composite page
│   ├── components/
│   │   ├── about/              # Profile, education, skills, and PDF resume viewer
│   │   ├── architecture/       # Engineering editorial transition section
│   │   ├── hero/               # Hero headline, 3D identity card, spatial photo cards
│   │   ├── layout/             # Navigation header, Hindi/English logo, footer
│   │   ├── projects/           # Circular carousel, scattered grid, case study modal
│   │   ├── providers/          # Lenis smooth scroll context provider
│   │   └── ui/                 # Reusable scroll-driven typography components
│   └── data/
│       ├── projects.ts         # Complete project specifications and technical decisions
│       └── resume.ts           # Education, skills taxonomy, and contact info
├── next.config.ts              # Next.js runtime configuration
├── tailwind.config.ts          # Custom design system colors, fonts, shadows
├── tsconfig.json               # TypeScript compiler options
└── package.json                # Project dependencies and npm scripts
```

## 💻 Local Development

Ensure you have [Node.js](https://nodejs.org/) (version 18 or later) installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TakshakSinghania/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

4. **Lint and type check:**
   ```bash
   npm run lint
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Start production server:**
   ```bash
   npm run start
   ```
