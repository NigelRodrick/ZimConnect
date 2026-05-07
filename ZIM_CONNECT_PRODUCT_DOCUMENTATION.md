# Zim-Connect: Functional Overview & Ecosystem Architecture

## Product Vision

Zim-Connect is a Zimbabwe-focused super app that unifies communication, social networking, commerce, healthcare, and financial services into one mobile-first ecosystem. The platform follows an all-in-one model inspired by WeChat, with shared identity, wallet, and navigation across modules.

## Design and Experience Principles

- Unified design language: **Modern Heritage**
- One account identity across all modules
- One payment rail (`Zim-Wallet`) across all transaction flows
- Mini-program architecture: deep vertical features inside one app

## 1) Core Architecture and Navigation

### Central Hub (Home)

The Home screen is the universal entry point for service discovery and daily actions.

Key elements:
- Global search across services and mini-programs
- Quick actions for high-frequency tasks (for example: Scan to Pay, Wallet, News)
- Personalized "Recent Updates" feed

### Global Navigation

A persistent bottom navigation bar provides direct access to the five product pillars:

- **Home**: dashboard and service discovery
- **Chat**: communication and social interactions
- **Wallet**: payments, balances, transaction controls
- **Mall**: commerce and shopping ecosystem
- **Services**: specialized modules (Health, Housing, Education, Tourism, etc.)

## 2) Communication and Social Layer (Social Glue)

Communication is the retention engine and also a commerce enabler.

### Advanced Messaging

- Text, media, and high-quality voice notes
- Voice-to-text transcription for accessibility and convenience
- Real-time translation between Shona/Ndebele and English

### Zim-Moments (Private Social Feed)

- Private feed for personal updates
- Interactions (likes/comments) visible only to mutual friends
- Privacy-first trust model aligned to local social dynamics

### Official Accounts

Verified channels for businesses, government agencies, and public figures to:
- broadcast updates
- provide support
- run customer engagement inside the app

Examples: ZIMRA, ZETDC, major brands, healthcare providers.

## 3) Financial Ecosystem (Zim-Wallet)

Zim-Wallet is the transactional engine for all ecosystem commerce.

### Unified Payments

- Link bank accounts and mobile money (including EcoCash)
- QR-based payments from informal traders to enterprise merchants
- Utility and bill payments from one flow

### Multi-Currency Native Support

- Zimbabwe-optimized support for USD and ZiG
- Real-time exchange-rate visibility
- Currency switching at payment and settlement touchpoints

### Cultural Gifting (Red Envelopes)

- In-chat "Lucky Money" transfers
- Fast peer-to-peer gifting for family and social use-cases

### Personal File Transfer

- Secure self-chat workflow for device-to-desktop transfer
- Documents, images, and files through encrypted messaging channels

## 4) Commerce and Marketplace (Zim-Mall)

Zim-Mall is a layered commerce system serving consumers, individual sellers, and businesses.

### B2C Supermarket

- Grocery and essentials purchasing
- Delivery tracking
- Price comparison and bulk-buy mechanics

### C2C Marketplace

- Peer-to-peer listings and sales
- Wallet-backed escrow-like payment protection

### B2B Sourcing

- Wholesale and bulk order workflows
- Cross-city logistics orchestration

### Merchant Hub

Merchant control center for:
- inventory management
- customer chat support
- sales and performance analytics

## 5) Specialized Service Mini-Programs

Mini-programs provide sector-specific depth without separate app installs.

### Zim-Health

- Find and book doctors by specialty
- Verified provider profiles, reviews, and tele-health options
- Family Health Vault for household records, vaccine cards, and prescriptions
- Medical aid integration with automated co-payment estimation (e.g. CIMAS, PSMAS)

### Zim-Housing

- Verified residential and commercial listings
- USD-native property pricing
- Student housing and roommate discovery near universities

### Zim-Transport

- Real-time route and availability data
- Digital ticket purchase and management
- Bus booking and trip tracking

### Zim-Education

- School fee payments
- E-learning content access
- University application workflow support

## 6) Trust, Identity, and Security

### Verified Accounts

- Gold-check verification for businesses and professionals
- Priority verification classes: doctors, lawyers, public agencies, licensed merchants

### End-to-End Encryption

- Private chat encryption
- Enhanced protections for sensitive medical records in Health Vault

### Secure QR Identity

- User/merchant personalized QR profiles
- QR used as both payment identifier and digital business card

## Ecosystem Interaction Model

The system is designed as a closed-loop value network:

- **Chat** drives discovery and trust
- **Wallet** powers transactions across all modules
- **Mall** and **Services** create daily utility and retention
- **Official Accounts** connect institutions to citizens and customers
- **Verification + encryption** reduce fraud and increase confidence

## Proposed Engineering Translation (High Level)

To implement this product vision, engineering should map features into modular domains with shared platform services:

- Shared platform: auth, profiles, KYC/verification, wallet, notifications, search
- Domain modules: chat, social, commerce, health, housing, transport, education
- Cross-cutting concerns: encryption, compliance, audit trails, risk controls
- Common UI primitives: nav shell, cards, lists, status chips, QR actions

## Suggested MVP Prioritization

1. Core shell (Home + navigation + identity)
2. Chat + Official Accounts baseline
3. Wallet core (balance, QR pay, P2P send)
4. Mall baseline (catalog, checkout, order tracking)
5. One service vertical (recommended: Zim-Health or Zim-Housing)

## Open Product Decisions to Finalize

- KYC depth by account tier (consumer vs merchant vs professional)
- Wallet compliance model and transaction limits
- Escrow policy in C2C flows
- Data residency and health-record governance requirements
- Launch sequence by city/region and partner readiness

