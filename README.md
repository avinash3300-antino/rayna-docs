# Rayna AI Assistant — Technical Glossary & Architecture Reference

This document explains every technical term, library, and service used in this project.

---

## Table of Contents

1. [Frontend Stack](#1-frontend-stack)
2. [Backend Stack](#2-backend-stack)
3. [AI & LLM Layer](#3-ai--llm-layer)
4. [RAG Pipeline](#4-rag-pipeline)
5. [MCP Tools](#5-mcp-tools)
6. [Data & Caching](#6-data--caching)
7. [Infrastructure & DevOps](#7-infrastructure--devops)
8. [Async Workers & Jobs](#8-async-workers--jobs)
9. [Security](#9-security)
10. [Architecture Concepts](#10-architecture-concepts)

---

## 1. Frontend Stack

### React
A JavaScript library for building user interfaces using reusable components. This project uses **React 18+** which adds `useTransition` and `Suspense` for smooth streaming chat bubbles without full page re-renders.

### useState
A React **hook** that lets a component remember and update values (state) without refreshing the whole page. Used here to manage the active tab in the Tech Stack section.

### JSX
A syntax extension for JavaScript that lets you write HTML-like code inside JavaScript files. React converts it into real HTML at build time.

### Next.js (App Router)
A React framework that adds **server-side rendering (SSR)** and streaming UI. The App Router (introduced in Next.js 14) enables React Server Components and native support for streaming LLM responses via SSE.

### TypeScript
A superset of JavaScript that adds **static type checking**. Catches bugs before runtime. This project uses TypeScript across the frontend with types shared from the backend via auto-generated OpenAPI clients.

### Tailwind CSS
A **utility-first CSS framework** — instead of writing custom CSS, you apply pre-built class names directly in HTML/JSX. Supports RTL (right-to-left) layouts for Arabic interfaces via a plugin.

### Radix UI
A set of **headless, accessible UI components** (no default styling). Used as the base for components like ProductCard, QuotationCard, and the ThinkingMode toggle. "Headless" means you control all the styling.

### Framer Motion
A **React animation library**. Used here for the token-by-token streaming animation — each word from the LLM appears with a smooth entry effect.

### EventSource API (SSE Client)
Built into the browser. Listens to a **Server-Sent Events (SSE)** stream from the backend to receive LLM tokens one at a time, creating the "typing" effect. Handles reconnection automatically.

### Zustand
A **lightweight global state management** library for React. Stores chat history, session state, and the thinking mode toggle. Much simpler than Redux.

### TanStack Query (React Query)
A **server state management** library. Used for non-streaming endpoints like loading product cards, quotation status, and booking data — handles caching, background refetching, and loading states automatically.

### React Native
A framework for building **native iOS and Android apps** using React and JavaScript. Uses the New Architecture (JSI — JavaScript Interface) for better SSE streaming performance on mobile.

### Expo
A toolchain built on top of React Native that simplifies mobile development. Provides **OTA (Over-The-Air) updates** (push app updates without going through the App Store), push notifications, and deep-link URL scheme support.

### PWA (Progressive Web App)
A web application that behaves like a native app — can be installed on a phone home screen, works offline partially, and receives push notifications. Listed as one of the client types.

---

## 2. Backend Stack

### Python
The primary programming language of the backend. Chosen for its **async-first ecosystem** and best-in-class AI/ML library support.

### FastAPI
A modern **Python web framework** for building APIs. Key features used here:
- Native **SSE streaming** support (streams LLM tokens to the frontend)
- **Pydantic** integration for automatic request validation
- Auto-generates **OpenAPI docs** at `/docs`
- 3× faster than Flask at handling concurrent connections

### ASGI (Asynchronous Server Gateway Interface)
A standard interface between Python async web frameworks and servers. FastAPI is an ASGI framework, which is what enables it to handle thousands of simultaneous connections efficiently.

### Uvicorn
The **ASGI server** that runs FastAPI. Runs 4 workers per pod. Efficiently handles async SSE connections (long-lived HTTP connections streaming tokens).

### Pydantic v2
A Python **data validation library**. Automatically validates and converts all incoming API request data and outgoing LLM outputs based on defined schemas. Version 2 is significantly faster than v1.

### httpx
An **async HTTP client** for Python. Used to make HTTP calls to MCP tools (the Rayna APIs). Supports timeouts, retries, and connection pooling. Replaces the older `requests` library in async contexts.

### tenacity
A Python library for **retrying failed operations** with exponential backoff. Applied to every MCP tool call — if an API call fails, it retries up to 3 times with increasing wait times between attempts.

### asyncio
Python's built-in **async/await concurrency library**. The key usage here is `asyncio.gather` — this runs multiple MCP tool calls **in parallel simultaneously** instead of one-by-one, reducing total wait time from ~1s to ~300ms.

### Kong Gateway
An **API gateway** deployed on EKS (Kubernetes). Acts as the main entry point for all API traffic. Handles:
- **JWT** authentication plugin
- **Rate limiting** per user tier
- Request transformation
- Circuit breaker

### AWS API Gateway
Amazon's managed edge entry point. Routes incoming HTTPS requests to Kong on EKS. Handles **SSL termination** (decrypting HTTPS traffic) and regional routing.

### JWT (JSON Web Token)
A compact, signed **authentication token** sent with every API request. The payload contains claims like `user_type` (guest, customer, agent, staff). This project uses **RS256** (RSA Signature with SHA-256) — an asymmetric algorithm where the server signs with a private key and verifies with a public key.

### PyJWT + python-jose
Python libraries for **creating and validating JWT tokens** in FastAPI middleware. `python-jose` adds RS256 asymmetric signing support.

### Authlib
A Python library for **OAuth 2.0** flows — the login system used for agent and staff portals. Handles token issuance and refresh tokens.

### OAuth 2.0
An **authorization framework** that lets users log in securely without sharing passwords. Used for agent and staff portal authentication (e.g., "Login with company SSO").

### SQLAlchemy (async)
Python's most popular **ORM (Object-Relational Mapper)**. Lets you work with the PostgreSQL database using Python objects instead of writing raw SQL. The async version is used to avoid blocking the event loop.

### Alembic
A **database migration tool** for SQLAlchemy. Tracks changes to database table schemas over time — like version control for your database structure.

---

## 3. AI & LLM Layer

### LLM (Large Language Model)
An AI model trained on massive text data that can understand and generate human language. Examples: Claude, GPT-4, Gemini. In this project, the LLM receives a **system prompt + conversation history + retrieved context** and generates the reply.

### LiteLLM
A **unified interface library** for calling multiple LLM providers (Claude, GPT, Gemini, Grok) with the same API format. Also provides:
- Fallback chains (if Claude fails, try GPT)
- Retry logic
- Provider-level circuit breakers
- Cost tracking per model

### Claude (Anthropic)
Anthropic's LLM family used as the **primary model** in this project:
- **Claude Haiku** — STANDARD tier (fast, cheap, good quality)
- **Claude Sonnet** — COMPLEX tier (better reasoning, quotation building)
- **Claude Opus** — THINKING mode (highest capability, most expensive)

### Gemini Flash 2.0
Google's fastest LLM. Used for the **SIMPLE tier** (product searches, FAQs). ~10× cheaper than GPT-4o. Routes ~80% of all queries, making it the primary cost-saving mechanism.

### GPT-4o / GPT-4o-mini
OpenAI's models used as **fallback** when Claude is unavailable. GPT-4o-mini for STANDARD fallback, GPT-4o for COMPLEX fallback.

### Grok (xAI)
Elon Musk's xAI model. Available as a **user-selectable alternative** for THINKING mode, especially for real-time data queries.

### distilBERT
A **smaller, faster version of BERT** (a Google AI model for text understanding). Used in Stage 2 of the intent classifier — classifies ambiguous queries into intent types in ~30ms. Much cheaper than calling a full LLM for classification.

### Semantic Cache (GPTCache)
Instead of exact-match caching, this checks if a new query is **semantically similar** (same meaning, different words) to a cached query. Uses **cosine similarity** — if similarity score > 0.92, return the cached response. Eliminates 40–60% of LLM calls entirely.

### Cosine Similarity
A mathematical measure of how similar two vectors (embeddings) are, ranging from 0 (completely different) to 1 (identical). Used by the semantic cache to compare query meanings.

### LLMLingua
A **prompt compression tool** that removes low-information tokens from RAG context before feeding it to the LLM. Reduces token count by 30–40% without significant quality loss, directly reducing API costs.

### SSE (Server-Sent Events)
A web technology for **one-way streaming** from server to browser over HTTP. Used here to stream LLM tokens one-by-one to the frontend as they're generated, creating the real-time typing effect. More efficient than WebSocket for this use case since communication is one-directional.

### WebSocket
A **two-way real-time communication** protocol. Listed as a supported connection type for clients that need bidirectional communication (unlike SSE which is server→client only).

### NLU (Natural Language Understanding)
A subfield of AI focused on **extracting structured meaning from free text**. The quotation engine uses NLU to extract parameters like `pax:4`, `dest:Dubai`, `nights:5` from a message like "quote me 4 pax Dubai 5 days".

### Thinking Mode
A special high-capability mode using **Claude Opus or OpenAI o1** for complex reasoning tasks that require multi-step thinking before answering. More expensive but more accurate for complex queries.

---

## 4. RAG Pipeline

### RAG (Retrieval-Augmented Generation)
A technique that **retrieves relevant information from a knowledge base and injects it into the LLM prompt** before generating a response. Prevents the LLM from hallucinating (making up) facts about Rayna's products, policies, and pricing.

**Flow:** User query → search knowledge base → find relevant chunks → inject into prompt → LLM answers using real data.

### Pinecone
A **vector database** (serverless) used to store and search document embeddings. When a query comes in, Pinecone finds the top-5 most semantically relevant document chunks in under 50ms. Organized into namespaces (tours, hotels, faq, policies, etc.).

### Embedding / text-embedding-3-small
Converting text into a **numerical vector** (a list of 1,536 numbers) that captures its semantic meaning. OpenAI's `text-embedding-3-small` model is used for both ingestion (converting documents) and retrieval (converting queries). **Critical:** the same model MUST be used for both — mixing models breaks similarity search.

### BM25 (Best Match 25)
A classic **keyword-based search algorithm** (TF-IDF variant). Runs in parallel with Pinecone's vector search. Good at exact keyword matches where semantic search might miss.

### Hybrid Search
Combining **dense retrieval (Pinecone/vector)** and **sparse retrieval (BM25/keyword)** search results. Improves overall recall (finding relevant documents) by ~15% compared to either method alone.

### RRF (Reciprocal Rank Fusion)
An algorithm that **merges ranked result lists** from multiple search systems (Pinecone + BM25) into a single ranked list. A document ranked highly by both systems gets a much higher combined score.

### Chunking (RecursiveTextSplitter)
Breaking large documents into **smaller pieces (chunks)** before storing in Pinecone. Uses 512 tokens per chunk with 50 tokens of overlap between chunks. LangChain's `RecursiveTextSplitter` splits on paragraphs, then sentences, then words — preserving semantic boundaries.

### Metadata Tagger
Adds structured information to each chunk: `source_url`, `doc_type`, `language`, `product_id`, `scraped_at`. Enables **filtered search** (e.g., search only in `namespace:tours` for a tour query).

### Playwright
A Python/Node.js library for **browser automation**. Used here as a web scraper to visit raynatours.com, wait for JavaScript to render, and extract the page content. Runs headless (no visible browser window) on Kubernetes.

### BeautifulSoup4
A Python library for **parsing HTML**. After Playwright fetches a rendered page, BeautifulSoup extracts structured text and product data from the HTML.

### APScheduler
A Python library for **scheduling recurring jobs** within the FastAPI process. Runs the RAG content refresh every 6 hours, quotation expiry cleanup, and cache warm-up jobs.

### Ingestion Pipeline
The **offline process** that scrapes raynatours.com every 6 hours, chunks the content, generates embeddings, and upserts (insert or update) them into Pinecone and the BM25 index.

---

## 5. MCP Tools

### MCP (Model Context Protocol)
A protocol for **giving LLMs access to external tools and data sources**. The LLM can decide to "call" a tool (like `search_products`) and receive structured data back, which it then incorporates into its response.

### Tool Call (function calling)
When the LLM emits a special JSON response like `{"tool": "get_pricing", "params": {"product_id": "123"}}` instead of a text reply. The backend intercepts this, executes the actual API call, and feeds the result back to the LLM.

### MCP Tool Router
The system that receives a tool call from the LLM, **validates the schema**, checks the user's permission for that tool, checks the Redis cache, and dispatches the actual HTTP call to the Rayna API.

### The 18 MCP Tools
Wrapper functions around existing Rayna backend APIs, organized into 3 groups:
- **Product & Discovery:** `search_products`, `check_availability`, `get_pricing`, `fetch_reviews`, `check_weather`, `check_visa_req`
- **Booking & Financial:** `create_booking`, `process_payment`, `modify_booking`, `cancel_booking`, `generate_invoice`, `track_commission`
- **Ops & Delivery:** `generate_voucher`, `send_notification`, `build_itinerary`, `calculate_markup`, `create_deep_link`, `escalate_human`

### TTL (Time-To-Live)
How long a cached result stays valid before it's automatically deleted. Different tools have different TTLs based on how fast the data changes:
- Live pricing: 60 seconds (prices change frequently)
- Product catalog: 5 minutes
- RAG content: 24 hours (descriptions rarely change)
- Booking/payment: 0 — **never cached** (always fetch fresh)

### Exponential Backoff
A retry strategy where each retry **waits longer than the previous one**. Example: wait 1s, then 2s, then 4s before giving up. Prevents overwhelming a struggling API with immediate retries.

### Deep Link
A URL that opens the **raynatours.com booking page** for a specific product with pre-filled parameters. The bot never processes payments directly — it always redirects users to the real website via a deep link.

### CRM (Customer Relationship Management)
The system managing customer data and interactions. `escalate_human` sends a handoff to the CRM when the bot can't resolve an issue and a human agent needs to take over.

---

## 6. Data & Caching

### Redis
An **in-memory key-value store** (cache database). Extremely fast (100K operations/second). Used here for:
- Session storage (30-minute TTL)
- Response cache (exact-match query cache)
- Rate limit counters (sliding window algorithm)
- JWT denylist (for logged-out tokens)
- MCP tool result cache

### ElastiCache
Amazon's **managed Redis service**. Runs as an `r7g.xlarge` cluster with 3 read replicas. No need to manage Redis servers manually.

### Session Manager
The component that **maintains conversation continuity** despite LLMs being stateless (no memory between API calls). On every request: loads history from Redis → appends new message → fires LLM → saves response back to Redis.

### History Window
The number of recent conversation turns injected into each LLM call. Limited per user type (Guest: 5 turns, Staff: 15 turns) to control token costs — every token in history is paid for on every call.

### Long Session Compression
When conversation history exceeds the window limit, oldest turns are dropped but a **compressed summary** (e.g., "Dubai 4pax Desert Safari") is kept to preserve context.

### PostgreSQL (RDS)
A powerful open-source **relational database**. Stores bookings, user accounts, agent data, and financial transactions. Runs on Amazon RDS (managed service) in Multi-AZ (two availability zones for high availability).

### DynamoDB
Amazon's fully managed **NoSQL document database**. Used for chat history (full transcripts), staff audit logs (immutable, append-only), and session metadata. Offers single-digit millisecond performance at any scale.

### S3 (Simple Storage Service)
Amazon's **object storage service**. Stores large files: quotation PDFs, vouchers, tickets, conversation transcripts, and raw scraped content archives. Lifecycle rules automatically archive old files to cheaper storage tiers.

### asyncpg
A fast **async PostgreSQL driver** for Python. Used by SQLAlchemy's async engine to avoid blocking the event loop during database queries.

### pgvector
A PostgreSQL extension that adds **vector similarity search** capabilities. Available as a supplement to Pinecone if needed.

---

## 7. Infrastructure & DevOps

### AWS (Amazon Web Services)
The primary **cloud provider**. Deployed in `me-south-1` (UAE region) for data residency compliance with local regulations.

### EKS (Elastic Kubernetes Service)
Amazon's **managed Kubernetes service**. Runs all the microservice pods (FastAPI, LiteLLM, Kong, Celery workers) in containers.

### Kubernetes
An open-source system for **orchestrating containers** — automatically deploying, scaling, and managing containerized applications across a cluster of machines.

### HPA (Horizontal Pod Autoscaler)
A Kubernetes feature that **automatically scales the number of running pods** based on load metrics (CPU usage, queue depth, requests per second). Example: FastAPI scales from 10 to 60 pods when CPU exceeds 60%.

### Pod
The **smallest deployable unit in Kubernetes** — essentially a running container (or group of containers). Multiple pods of the same service run in parallel to handle load.

### Docker
A tool for **packaging applications into containers** — isolated, reproducible environments that run the same everywhere. Uses multi-stage builds and a Python 3.12-slim base image to keep image sizes small.

### Terraform
**Infrastructure as Code (IaC)** tool. All AWS resources (EKS clusters, RDS databases, Redis clusters, etc.) are defined in version-controlled `.tf` files. Enables reproducible, auditable infrastructure changes. Uses workspaces for dev/staging/prod environments.

### Helm
**Kubernetes package manager**. Bundles Kubernetes configuration files (YAML manifests) into reusable "charts". Each service (LiteLLM, Kong, FastAPI) is deployed as a Helm chart with environment-specific values files.

### GitHub Actions
**CI/CD (Continuous Integration / Continuous Deployment) pipelines**. Automatically runs tests → builds Docker image → pushes to ECR → deploys to EKS via Helm on every code push. Uses blue/green deployments (two environments, switch traffic instantly with zero downtime).

### ECR (Elastic Container Registry)
Amazon's **Docker image registry**. Stores all the built container images. Scans images for security vulnerabilities on push and auto-deletes old images via lifecycle policies.

### Datadog
A **monitoring and observability platform**. Provides:
- APM (Application Performance Monitoring) — traces every request
- Infrastructure metrics — CPU, memory, network
- LLM token cost tracking per model/user/intent
- Custom dashboards for p95 latency, cache hit rates, circuit breaker states

### p95 Latency
The **95th percentile response time** — 95% of requests complete within this time. A better metric than average because it captures slow outliers. Alert threshold here: p95 > 5 seconds.

### PagerDuty
An **on-call alerting platform** that pages the engineering team immediately when Datadog detects critical issues (error rate > 1%, circuit breaker open, cost spike, etc.).

### ELK Stack
Three tools used together for **centralised log management**:
- **Elasticsearch** — stores and indexes all logs for fast search
- **Logstash** — collects and transforms log data
- **Kibana** — web UI for visualizing and searching logs

### CloudWatch
AWS's native **monitoring service**. Monitors EKS cluster health, RDS performance, and ElastiCache memory usage. Feeds data into Datadog.

---

## 8. Async Workers & Jobs

### SQS (Simple Queue Service)
Amazon's managed **message queue service**. Decouples slow tasks (PDF generation, email sending, WhatsApp notifications) from the main request flow. Uses **FIFO queues** (First In, First Out — guaranteed ordering) and **DLQ** (Dead Letter Queue — captures messages that fail repeatedly).

### Celery
A **distributed task queue** for Python. Workers pick up tasks from SQS/Redis queues and execute them asynchronously. Scales from 5 to 40 workers automatically via HPA. Used for: PDF generation, email dispatch, WhatsApp notifications, and scraper runs.

### Celery Beat
A **distributed cron scheduler** built into Celery. Runs heavy periodic jobs: web scraping, embedding batch jobs, commission report generation — all on a schedule.

### kombu
A Python messaging library that Celery uses as an **abstraction layer over message brokers** (SQS, Redis, RabbitMQ). Enables the hybrid broker strategy (Redis for speed, SQS for reliability).

### Amazon SES (Simple Email Service)
Amazon's **transactional email service**. Sends quotation PDFs, booking confirmations, and vouchers. High deliverability rates in the UAE/GCC region.

### WhatsApp Business API (Cloud API)
Meta's official API for **sending WhatsApp messages programmatically**. Used to send booking confirmations and vouchers. Dispatched via the `send_notification` MCP tool through a Celery worker.

### WeasyPrint
A Python library that converts **HTML/CSS to PDF**. Used by Celery workers to generate quotation PDFs and vouchers. Supports QR codes embedded in the PDF.

---

## 9. Security

### AWS WAF (Web Application Firewall)
Sits in front of CloudFront and **filters malicious web traffic** — blocks SQL injection attempts, bad bots, scrapers, and suspicious IP addresses before they reach the application.

### DDoS Shield (AWS Shield Standard)
Amazon's always-on **DDoS (Distributed Denial of Service) protection**. Automatically detects and absorbs volumetric attacks targeting CloudFront and API Gateway at no extra cost.

### CloudFront (CDN)
Amazon's **Content Delivery Network**. Serves static assets (JavaScript, CSS, images) from edge locations close to users worldwide, reducing load times. Also acts as the first layer of traffic filtering with WAF.

### Rate Limiting
Restricting **how many requests a user/client can make in a given time window**. Implemented in Redis with a sliding window counter. Tiers:
- Guest: 20 requests/minute
- Customer: 60 requests/minute
- Agent: 200 requests/minute
- Staff: 500 requests/minute

### AWS Secrets Manager
A service for **securely storing and rotating secrets** — API keys (Claude, OpenAI, Gemini, Grok), database passwords, and JWT private keys. Applications fetch secrets at runtime; they're never hardcoded in code.

### JWT Denylist
A Redis set of **invalidated JWT tokens** (from logged-out users). Every request checks this list so that a stolen token from a logged-out session is immediately rejected.

---

## 10. Architecture Concepts

### Intent Classifier
A two-stage system that determines **what the user wants** before routing to the appropriate model and data source:
1. **Stage 1 — Keyword gate:** Fast regex/keyword rules (<5ms). Catches ~50% of queries cheaply.
2. **Stage 2 — distilBERT:** ML classifier (~30ms). Only runs for ambiguous queries Stage 1 couldn't classify.

Output: `intent_type` + `tier` (SIMPLE/STANDARD/COMPLEX/THINKING) + `data_source`.

### Permission Guard
Checks the authenticated user's `user_type` against **what tools and data they're allowed to access**. Agents can access agent-rate pricing; guests cannot trigger booking operations.

### Prompt Builder
Assembles the **full LLM prompt** from: system instructions + user type context + conversation history (from session manager) + RAG retrieved chunks + MCP tool results.

### Circuit Breaker Pattern
A **fault tolerance pattern** borrowed from electrical engineering. Three states:
- **CLOSED** (normal) — all calls pass through
- **OPEN** (failing) — 5 failures in 10 seconds triggers OPEN state; traffic is routed to fallback provider (Claude → GPT → Gemini → degraded mode)
- **HALF-OPEN** (recovering) — after 30 seconds, sends one probe request; if successful, returns to CLOSED

### Rate Resolver
Determines **which price to show** based on user type:
- B2C guest/customer → retail price
- Agent → net rate (wholesale)
- Staff acting for agent → agent rate on behalf

### Quotation Assembler
Combines results from parallel MCP calls (`check_availability`, `get_pricing`, `calculate_markup`) into a **structured quotation** with line items, total, and 24-hour validity. Simultaneously outputs: (1) an inline chat card via SSE and (2) a PDF via SQS → Celery → WeasyPrint → S3 → SES.

### Blue/Green Deployment
A **zero-downtime deployment strategy** with two identical production environments (blue and green). New code deploys to the inactive environment; traffic switches instantly. If something breaks, roll back by switching traffic back.

### Hybrid Broker Strategy
Using **both Redis and SQS as Celery message brokers** for different task types:
- Redis: low-latency, fire-and-forget tasks (fast but not durable)
- SQS: durable, reliable tasks where message delivery must be guaranteed even if workers crash

### Token Budget
A **hard limit on how many LLM tokens** a user tier can consume per request. Prevents runaway costs from very long prompts or responses. THINKING mode has a higher budget than SIMPLE tier.

### Multi-AZ (Multiple Availability Zones)
Deploying services across **multiple isolated data centers** (availability zones) within the same AWS region. If one zone has an outage, traffic automatically fails over to another zone with no downtime.

### On-Demand Billing (DynamoDB)
A pricing model where you **pay only for what you use** (reads/writes), with no need to pre-provision capacity. DynamoDB scales automatically to any load.

### SSR (Server-Side Rendering)
Generating the **HTML on the server** before sending it to the browser (as opposed to client-side rendering where JavaScript builds the HTML in the browser). Next.js uses SSR to improve initial page load speed and SEO.

### OpenAPI
A standard specification for **describing REST APIs** in JSON/YAML. FastAPI auto-generates an OpenAPI spec from the code, which can be used to auto-generate type-safe client libraries for the frontend.

---

## Project Structure

```
source-code/
├── src/
│   ├── index.js          # React app entry point
│   └── App.js            # Full architecture documentation UI
├── public/
│   └── index.html        # HTML shell for the React app
├── package.json          # Dependencies and npm scripts
├── .gitignore            # Files excluded from git
└── README.md             # This file
```

## Running the Project

```bash
npm install       # Install dependencies
npm start         # Start development server at http://localhost:3000
npm run build     # Create production build
```
