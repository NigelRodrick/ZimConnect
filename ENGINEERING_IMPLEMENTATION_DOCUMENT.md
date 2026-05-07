# Zim-Connect Engineering Implementation Document

## Objective

Define a practical engineering blueprint to implement the Zim-Connect super app from prototype screens into a production-ready platform.

## 1) Recommended Technology Stack

### Client Applications

- **Mobile app**: Flutter (single codebase for Android + iOS)
- **Web admin/merchant portal**: Next.js + TypeScript
- **Shared design system**: tokenized component library aligned to Modern Heritage

### Backend Platform

- **API gateway**: BFF layer with REST/GraphQL federation
- **Core services**: Node.js (TypeScript) microservices (or modular monolith for MVP)
- **Data stores**:
  - PostgreSQL for transactional domains
  - Redis for caching, queues, and session acceleration
  - Object storage for media/documents
- **Real-time**: WebSocket infrastructure for chat/presence/events
- **Search**: OpenSearch/Elasticsearch for global search and listings

### Security and Infrastructure

- OAuth2/OIDC identity provider
- KMS-backed encryption key management
- Containerized deployment (Kubernetes or managed serverless containers)
- CI/CD with automated tests, security scanning, and release gates

## 2) Domain Architecture

Implement as modular domains with shared platform services.

### Shared Platform Services

- Identity and Authentication
- User Profile and Verification (gold-check)
- Wallet and Ledger
- Notifications
- Search and Discovery
- Media/File Service
- Audit and Compliance

### Product Domains

- Chat and Social (`chat-service`, `moments-service`, `official-accounts-service`)
- Commerce (`catalog-service`, `cart-service`, `order-service`, `merchant-service`)
- Wallet (`payments-service`, `ledger-service`, `fx-service`, `p2p-service`)
- Services verticals:
  - Health (`health-service`, `booking-service`, `vault-service`)
  - Housing (`listing-service`, `match-service`)
  - Transport (`route-service`, `ticketing-service`)
  - Education (`fees-service`, `learning-service`)

## 3) Core User Flows (MVP Critical)

1. User onboarding -> account creation -> profile completion
2. Home discovery -> launch mini-program/module
3. Chat send/receive (text + voice note + translation)
4. Wallet funding/linking -> QR pay -> transaction receipt
5. Mall shopping -> checkout with wallet -> order tracking
6. Merchant receives order -> updates status -> customer notified

## 4) Data Model Foundations

### Identity

- `users`
- `profiles`
- `verifications`
- `devices`
- `consents`

### Chat and Social

- `conversations`
- `conversation_members`
- `messages`
- `message_attachments`
- `moments_posts`
- `moments_interactions`

### Wallet

- `wallet_accounts`
- `wallet_balances` (USD, ZiG)
- `ledger_entries` (double-entry)
- `payment_intents`
- `payment_transactions`
- `fx_rates`
- `p2p_transfers`

### Commerce

- `merchants`
- `products`
- `inventory_items`
- `carts`
- `orders`
- `order_items`
- `shipments`

### Health Vault (sensitive data partition)

- `patients`
- `medical_records`
- `prescriptions`
- `vaccination_cards`
- `insurance_policies`

## 5) API Surface (Initial Contract)

### Identity

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/verify-otp`
- `GET /me`

### Chat

- `GET /conversations`
- `POST /conversations`
- `GET /conversations/{id}/messages`
- `POST /conversations/{id}/messages`
- `POST /messages/{id}/translate`

### Wallet

- `GET /wallet/balances`
- `POST /wallet/link-account`
- `POST /wallet/payments/qr`
- `POST /wallet/transfers/p2p`
- `GET /wallet/transactions`

### Commerce

- `GET /mall/products`
- `POST /mall/cart/items`
- `POST /mall/checkout`
- `GET /orders/{id}`
- `POST /merchant/orders/{id}/status`

### Health

- `GET /health/providers`
- `POST /health/appointments`
- `GET /health/vault/records`
- `POST /health/vault/records`

## 6) Security, Privacy, and Compliance Controls

- End-to-end encryption for chat payload paths
- Field-level encryption for medical records and PII
- Role-based access control (consumer, merchant, provider, admin)
- Immutable audit logs for wallet, health, and verification actions
- Fraud/risk controls:
  - transaction limits by KYC tier
  - anomaly detection for wallet abuse
  - merchant dispute workflows

## 7) Observability and Reliability

- Standard telemetry: logs, metrics, traces (OpenTelemetry)
- SLOs:
  - API p95 latency
  - chat delivery success rate
  - wallet payment success rate
  - uptime per critical service
- Incident readiness:
  - runbooks per domain
  - alert routing and on-call
  - rollback strategy for mobile + backend releases

## 8) Delivery Plan

### Phase 0 - Foundation (2-3 weeks)

- Repo setup, CI/CD, environments
- Auth baseline and app shell navigation
- Shared UI kit and design tokens

### Phase 1 - Social + Wallet Core (4-6 weeks)

- Chat MVP (text/voice notes)
- Wallet ledger and balances
- QR payments and transaction history

### Phase 2 - Mall + Merchant Operations (4-6 weeks)

- Product catalog, cart, checkout
- Merchant hub basics (inventory + order state updates)
- Order tracking and notifications

### Phase 3 - First Vertical Service (3-5 weeks)

- Implement one deep service module (recommended: Zim-Health)
- Add booking + secure record vault basics

### Phase 4 - Scale and Hardening (ongoing)

- Translation quality improvements
- FX optimization and settlement resilience
- Security hardening and compliance audits

## 9) Team Topology

- Platform team: auth, wallet core, shared infra
- Social team: chat, moments, official accounts
- Commerce team: mall + merchant tools
- Services team: health/housing/transport/education modules
- SRE/Security: observability, reliability, compliance, incident management

## 10) MVP Exit Criteria

MVP is considered launch-ready when:

- onboarding to first transaction works end-to-end
- chat, wallet QR pay, and one commerce checkout flow are stable
- merchant can receive and process orders
- one service vertical is functional with real users
- p95 latency and success-rate SLOs meet agreed thresholds
- security controls (encryption, auditability, RBAC) pass review

