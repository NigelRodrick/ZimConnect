# Zim-Connect Technology Stack Document

## Goal

Define a pragmatic, scalable, and Zimbabwe-context-aware technology stack for building and operating the Zim-Connect super app.

## 1) Stack Summary (Recommended)

### Frontend

- **Mobile App**: Flutter (Dart)
- **Web Portals (Merchant/Admin/Support)**: Next.js + TypeScript
- **Design System**: Token-driven component system aligned to Modern Heritage

### Backend

- **Primary Runtime**: Node.js + TypeScript
- **Architecture**: Modular monolith for MVP -> service extraction by domain at scale
- **API Layer**: REST-first + selective GraphQL aggregation for complex client views

### Data Layer

- **Primary Database**: PostgreSQL
- **Cache/Queues**: Redis
- **Search**: OpenSearch/Elasticsearch
- **Blob Storage**: S3-compatible object storage

### Real-time and Async

- **Realtime Messaging**: WebSockets
- **Event Backbone**: Kafka or managed pub/sub (as scale grows)
- **Background Jobs**: BullMQ / queue workers

### Security and Identity

- **Auth**: OAuth2/OIDC (JWT access + rotating refresh tokens)
- **Secrets and Keys**: KMS + secret manager
- **Encryption**: TLS in transit + field-level encryption for sensitive records

### Platform and DevOps

- **Containerization**: Docker
- **Orchestration**: Kubernetes (or managed container platform)
- **CI/CD**: GitHub Actions
- **Observability**: OpenTelemetry + Prometheus/Grafana + centralized logging

## 2) Why This Stack

- Flutter reduces mobile delivery cost with one high-quality codebase.
- Next.js + TypeScript supports fast internal portal development with strong typing.
- Node.js + TypeScript enables rapid iteration and shared language across teams.
- PostgreSQL is ideal for transactional integrity (wallet, orders, bookings).
- Redis improves low-latency reads and event-driven workflows.
- OpenSearch supports unified search across products, providers, and content.

## 3) Module-by-Module Technology Mapping

### Chat and Social

- WebSocket gateway for real-time chat delivery
- PostgreSQL for message metadata + indexes
- Object storage for media/voice note assets
- Optional stream processing for moderation and analytics

### Wallet and Payments

- PostgreSQL ledger with strict double-entry accounting
- Idempotent payment APIs and reconciliation workers
- FX rate service with signed source feeds
- Fraud scoring pipeline (rules first, ML later)

### Mall and Commerce

- Product/catalog APIs with search index sync
- Order management with event-driven status transitions
- Merchant analytics via OLAP replica or warehouse sync

### Service Verticals (Health, Housing, Transport, Education)

- Shared platform primitives + domain-specific service modules
- Sensitive domains (health) isolated with stronger encryption and access boundaries
- Booking/ticketing engines use transactional writes + async notifications

## 4) Environment Strategy

- **Local**: Docker Compose + seeded dev data
- **Staging**: production-like integrations with test credentials
- **Production**: multi-zone deployment, managed database, strict secrets policy

## 5) Release Strategy

- Trunk-based development with short-lived branches
- Feature flags for high-risk rollout
- Mobile phased rollout by cohort
- Backend canary deployment for critical services (wallet/payments/chat)

## 6) Data and Compliance Strategy

- Data classification tiers: public, internal, sensitive, regulated
- PII minimization and retention policies
- Immutable audit trails for wallet and health actions
- Compliance-ready logging and traceability for dispute resolution

## 7) Testing Stack

- **Unit tests**: Vitest/Jest
- **API integration tests**: Supertest + test containers
- **E2E (web)**: Playwright
- **Mobile tests**: Flutter widget + integration tests
- **Contract testing**: OpenAPI contract validation across clients/services

## 8) Performance and Reliability Targets

- API p95 latency target: < 300 ms for core read paths
- Chat delivery success: >= 99.9%
- Wallet payment success: >= 99.95%
- Core platform uptime target: >= 99.9%

## 9) Alternative Options Considered

- **React Native** instead of Flutter:
  - Pros: JS/TS reuse
  - Cons: plugin/platform consistency risk at scale
- **Go** for backend instead of Node:
  - Pros: high concurrency performance
  - Cons: slower product iteration in early-stage teams
- **Pure GraphQL** instead of REST-first:
  - Pros: flexible client querying
  - Cons: added complexity in auth, caching, and observability for MVP

## 10) Final Recommendation

Adopt the recommended stack as the default implementation baseline:

- Flutter mobile clients
- Next.js web portals
- Node.js/TypeScript backend
- PostgreSQL + Redis + OpenSearch
- Docker + Kubernetes + OpenTelemetry

Then evolve architecture incrementally:
- start with a modular monolith to maximize speed
- split to domain services when clear scale or ownership boundaries emerge

