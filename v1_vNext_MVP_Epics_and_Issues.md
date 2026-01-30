# vNext_MVP_Epics_and_Issues.md
HUSHPair — vNext++ / vNext-MVP (90 gün) Epics & Issues
Date: 2026-01-30
Prepared for: HermesThot

---

## Özet: vNext-MVP (90 gün) — Milestones & Metinsel Dependency Grafiği

- Milestone: vNext-MVP (90 days)
  - Sprint 0 (setup, infra, security baseline) — 2 hafta
  - Sprint 1–3 (core features, M21 & M22 primary) — 6 hafta
  - Sprint 4–6 (M16 MVP + M18/M19/M20) — 6 hafta
  - Sprint 7–8 (polish, M17/M23/Core integrations, QA, hardening) — 4 hafta

Öncelik sırası (yüksek → düşük):
1. M21 — Event-Based Matching Engine
2. M22 — Ticketing & Event Commerce Gateway
3. M16 — Couple Experiences Engine
4. M18 — Scenario-Based Matching Orchestrator
5. M19 — Event Intelligence Hub
6. M20 — Announcement & Personalization Engine
7. M17 — Device Capability & Compatibility
8. M23 — Event Gifting & Gestures
9. Core — Trust Graph, Policy Engine, Token & Treasury (devam eden, paralel)

Metinsel bağımlılık grafiği (basit):
- Core (Trust Graph, Policy Engine, Auth) -> required by M21, M16, M18
- M19 (Event Intelligence) -> provides canonical events -> consumed by M21, M22, M20
- M22 (Ticketing) -> integrates with M23 (gifting/ticket upgrades), M21 (event context)
- M21 (Event-Based Matching) -> must be live before M16 scale & M20 targeting
- M16 (Couple Experiences) -> depends on M21 (matching & trust gating) + M17 (device capabilities optional)
- M18 (Scenario Matching) -> leverages M21 + M19
- M20 (Announcement) -> consumes M19, feeds M21 discovery signals
- M23 (Gifting) -> depends on M22 (commerce) + Core treasury/token
- M17 (Device Capabilities) -> supports M16 sessions, optional for MVP but needed for safety
- Core Treasury/Token -> required for escrow-like flows in M22/M23 (may be stubbed for MVP)

---

## Kullanım Notu
- Her "Epic" bölümü: kısa tanım, MVP acceptance criteria, security notes, dependencies, ardından 6 adet import'a hazır issue (task list).
- Bu markdown doğrudan GitHub issue import araçlarına veya manual copy/paste ile repo’ya aktarılabilir.

---

# Epic: M21 — Event-Based Matching Engine
Priority: P0 (1st)
Milestone: vNext-MVP (Sprint 1–3)

Description:
Etkinlik odaklı eşleşme; aynı etkinlikte bulunma niyeti, event thread'leri, event-based trust gating ve safety context sunar.

Epic-level Acceptance Criteria:
- Kullanıcılar aynı etkinlik içinde "same-event" intent ile eşleşme isteği gönderebilir/alarak eşleşir.
- Event-context (venue, organizer, time window) eşleşme kararına dahil edilir.
- Trust gating: yalnızca Trust Graph kriterlerini sağlayan hesaplar event-matching'e dahil olabilir (configurable).
- Event thread oluşturulup, güvenlik meta verisi (venue safety score, organizer reputation) match payload’ında gelir.

Security Notes:
- Event metadata şeması doğrulanmalı; 3rd-party event kaynaklarına gelen veriler imzalanmalı veya canonical registry ile doğrulanmalı.
- Rate-limit match attempts per-event per-user; abuse/farming detection policy engine kuralları zorunlu.
- PII minimal tutulmalı; sadece event-context ile eşleşme yapılmalı, kesin konum detayları ifşa edilmemeli.

Dependencies:
- Core Trust Graph & Policy Engine
- M19 Event Intelligence Hub (canonical event IDs)
- M22 Ticketing (optional: deep-linking & proof of attendance)

Issues (import-ready checklist):
1. [ ] M21-001: API — EventMatch: Create / Query / Cancel endpoints  
   - Description: REST/GraphQL API spec to request same-event matching and query status.  
   - Acceptance: API spec + OpenAPI schema; happy path request/response examples.
2. [ ] M21-002: Event Match Decision Engine (core logic)  
   - Description: Implement match scoring based on trust, event context, mutual intent.  
   - Acceptance: Unit tests covering trust gating, event time-window, scoring thresholds.
3. [ ] M21-003: Event Thread & Safety Context model  
   - Description: Data model for event-thread, includes venueScore, organizerScore, canonicalEventId.  
   - Acceptance: DB schema + migration + sample seed data for tests.
4. [ ] M21-004: Policy Engine rules for event matching (abuse/farming)  
   - Description: Policies to block suspicious mass-match behavior per-event.  
   - Acceptance: Rules written, test harness to simulate abuse patterns.
5. [ ] M21-005: Integration: consume canonical events from M19 (adapter)  
   - Description: Adapter service to fetch/normalize canonicalEventId and metadata.  
   - Acceptance: End-to-end test: canonical event -> match uses canonical ID.
6. [ ] M21-006: Telemetry & Audit for matching decisions  
   - Description: Emit match decision logs and metrics for SIEM/analytics.  
   - Acceptance: Structured logs implemented; dashboards: matches/sec, rejection reasons.

---

# Epic: M22 — Ticketing & Event Commerce Gateway
Priority: P0 (2nd)
Milestone: vNext-MVP (Sprint 1–3)

Description:
Bilet ve event commerce entegrasyonu: deep-links, affiliate tracking, inventory redirects, conversion reconciliation, ve escrow-like delivery rules.

Epic-level Acceptance Criteria:
- External ticket vendor deep-links ve canonical ticket metadata çekilebilmeli.
- Affiliate & deep-link paramları korunmalı ve conversion reconciliation raporu üretilebilmeli.
- Basit escrow şeması ile "venue redeemable gift" veya ticket-upgrade işlemleri desteklenebilmeli (token/fiat stub için dev mod).
- Inventory redirect: kullanıcılara doğru vendor’a yönlendiren fallback mekanizması çalışmalı.

Security Notes:
- Payment/ticket API anahtarları secret manager’da saklanmalı; PCI scope minimal tutulmalı (redirect-based checkout tercih edilir).
- Webhook doğrulama (HMAC) ve replay protection uygulanmalı.
- Escrow iş akışları finansal veriye girdiği için mutlaka immutable audit trail olmalı.

Dependencies:
- M19 (event canonical registry)
- Core Treasury/Token (escrow) — can be stubbed for MVP but API contract required
- M23 (gifting) integration for redeem flows

Issues (import-ready checklist):
1. [ ] M22-001: Ticketing Gateway API spec & adapter for primary vendor(s)  
   - Description: Adapter pattern + OpenAPI contract for vendor integration.  
   - Acceptance: Adapter for at least 1 vendor mocked; integration tests.
2. [ ] M22-002: Deep-link & affiliate param tracking pipeline  
   - Description: Capture utm/affiliate params and persist for reconciliation.  
   - Acceptance: End-to-end capture -> conversion entry in DB.
3. [ ] M22-003: Webhook handler + verification + replay protection  
   - Description: Secure webhook receiver for vendor events (purchase, refund).  
   - Acceptance: Tests for signature verification & idempotency.
4. [ ] M22-004: Escrow flow (stubbed treasury) for ticket upgrades / venue-redeemable items  
   - Description: Implement escrow state machine with transitions and audit logs.  
   - Acceptance: State transitions tested; audit entries immutable.
5. [ ] M22-005: Conversion reconciliation job & dashboard  
   - Description: Scheduled job to reconcile affiliate conversions with vendor reports.  
   - Acceptance: Reconciliation report generated; example discrepancies flagged.
6. [ ] M22-006: Failover & inventory redirect logic  
   - Description: Rules to redirect to alternate vendor or show inventory status.  
   - Acceptance: Simulated vendor outage -> correct redirect behavior.

---

# Epic: M16 — Couple Experiences Engine
Priority: P0 (3rd)
Milestone: vNext-MVP (Sprint 4–6)

Description:
Uzaktan çift deneyimleri: event-based private rooms, co-watch (synced video), co-play (turn-based), session orchestration, reconnect, abuse limits.

Epic-level Acceptance Criteria:
- Private room lifecycle (create/join/leave) ve invite mekanizması çalışır.
- Co-watch: playback control senkronizasyonu; state replication tolerable latency hedefi <500ms (best-effort).
- Session reconnect: dropped client yeniden bağlandığında state restore edilir.
- Abuse limits: misuses (spam invites, rapid reconnect) policy engine ile kısıtlanır.

Security Notes:
- Session auth must validate Trust Graph membership & event context before allowing room create.
- Media/RTC signalling must be authenticated and rate-limited; TURN usage privacy considerations.
- Device capability handshake (M17) data sanitized; do not store raw haptics or biometric capabilities.

Dependencies:
- M21 Event-Based Matching (gating & invites)
- M17 Device Capability (optional enhancement)
- Core Auth & Policy Engine
- Telemetry/Logging & SIEM

Issues (import-ready checklist):
1. [ ] M16-001: Room service API (CreateRoom / JoinRoom / LeaveRoom / Invite)  
   - Description: REST/WS endpoints and basic ACL for rooms.  
   - Acceptance: Room create/join e2e test; invite URL contains ephemeral token.
2. [ ] M16-002: Signaling service (WebSocket/RTC handshake skeleton)  
   - Description: Signaling channel to orchestrate P2P or SFU session establishment.  
   - Acceptance: Signaling handshake tested across two clients.
3. [ ] M16-003: Co-watch state replication protocol (play/pause/seek sync)  
   - Description: Lightweight protocol to replicate playback state across participants.  
   - Acceptance: Sync correctness test; conflict resolution defined.
4. [ ] M16-004: Session reconnect & state restore  
   - Description: Persist minimal session state and enable reconnection flow.  
   - Acceptance: Client reconnect within window -> session resumed with state.
5. [ ] M16-005: Abuse limits & rate-limiting rules for rooms  
   - Description: Policies to limit invites, rapid reconnects, and creation spamming.  
   - Acceptance: Policy tests show blocked scenarios.
6. [ ] M16-006: Privacy & consent flows (recording, sharing controls)  
   - Description: UX+API for consent to record/share sessions; store consents.  
   - Acceptance: Consent enforced before any recording endpoint is enabled.

---

# Epic: M18 — Scenario-Based Matching Orchestrator
Priority: P1
Milestone: vNext-MVP (Sprint 4–6)

Description:
Senaryo bazlı eşleşme: go-with (event), meet-up, co-experience intent ve senaryo state machine’leri ile eşleşme orkestrasyonu.

Epic-level Acceptance Criteria:
- Senaryo modelleri (Go-With, Meet-up, Co-experience) tanımlanır ve instancelenebilir.
- Senaryo state machine’leri nesnel ve test edilebilir olmalı (proposed → accepted → scheduled → completed).
- Senaryo bazlı öneriler M21 eşleşmeleri ile entegre olmalı.

Security Notes:
- Meet-up senaryoları için location privacy: kesin koordinatlar asla open profile’da paylaşılmamalı.
- Senaryo davetleri expiry ve replay protection içermeli.

Dependencies:
- M21 Event-Based Matching
- M19 Event Intelligence (to tie scenarios to canonical events)
- M16 (for co-experience orchestration)

Issues (import-ready checklist):
1. [ ] M18-001: Scenario model definitions & state machine spec  
   - Description: Define states/transitions for Go-With, Meet-up, Co-experience.  
   - Acceptance: State diagrams + unit tests for transitions.
2. [ ] M18-002: Scenario API: create / invite / accept / schedule  
   - Description: Endpoints to operate on scenario instances.  
   - Acceptance: API tests for each transition and access control.
3. [ ] M18-003: Scenario → Match integration adapter (M21)  
   - Description: Map scenario intents to matching engine inputs.  
   - Acceptance: Scenario-created -> matching queries triggered.
4. [ ] M18-004: Location privacy wrapper for meet-up scheduling  
   - Description: Abstraction to expose coarse location (city-based) only.  
   - Acceptance: Tests show coarse location used in invites.
5. [ ] M18-005: Expiry & replay protection for scenario invites  
   - Description: Tokens with TTL + single-use semantics.  
   - Acceptance: Expired token attempts rejected.
6. [ ] M18-006: Telemetry for scenario lifecycles  
   - Description: Metrics for scenario create/accept/cancel rates.  
   - Acceptance: Dashboard shows scenario funnel.

---

# Epic: M19 — Event Intelligence Hub
Priority: P1
Milestone: vNext-MVP (Sprint 4–6)

Description:
Global etkinlik keşfi ve normalizasyonu: ticketing platform adaptörleri, venue/organizer takvimleri, canonical event registry ve quality scoring.

Epic-level Acceptance Criteria:
- Canonical event registry oluşturulur; farklı kaynaklardan gelen aynı-event’ler normalize edilip tek canonical ID ile temsil edilir.
- Venue & organizer metadata ve quality score üretilir.
- API: canonicalEventId lookup ve canonical event enrichment sağlanır.

Security Notes:
- 3rd-party connectors rate-limited ve credentials secure-store’da tutulmalı.
- Normalization heuristics veriden kaynaklanan yanlış eşlemeleri minimize edecek; manuel override/curation süreçleri olmalı.

Dependencies:
- M22 (ticketing adapters)
- External vendor API keys / connectors
- M21, M20 (consumers of canonical IDs)

Issues (import-ready checklist):
1. [ ] M19-001: Canonical event data model & dedupe algorithm spec  
   - Description: Schema + matching heuristics for dedupe.  
   - Acceptance: Testcases for duplicate detection accuracy.
2. [ ] M19-002: Connector: Ticket Vendor adapter (mocked vendor v1)  
   - Description: Adapter to ingest events from ticketing vendor.  
   - Acceptance: Ingest pipeline working with sample feed.
3. [ ] M19-003: Venue & organizer scoring engine (quality metrics)  
   - Description: Produce venueScore and organizerScore.  
   - Acceptance: Scoring outputs + unit tests for scoring edge cases.
4. [ ] M19-004: Canonical event lookup API (read-only for MVP)  
   - Description: Endpoint to get canonicalEventId & metadata.  
   - Acceptance: API responses consistent with registry.
5. [ ] M19-005: Manual curation UI/CLI for resolving ambiguous matches  
   - Description: Minimal admin tool to merge/split events.  
   - Acceptance: Admin can merge two event records.
6. [ ] M19-006: Data lineage & audit trail for event normalization  
   - Description: Store provenance (source, ingestion timestamp).  
   - Acceptance: Provenance visible in registry entries.

---

# Epic: M20 — Announcement & Personalization Engine
Priority: P1
Milestone: vNext-MVP (Sprint 5–6)

Description:
Lokasyon ve ilgi bazlı event duyuruları; country/city segmentation, noise budget, opt-in, ve multi-channel routing (in-app / push / email).

Epic-level Acceptance Criteria:
- Segmentation (country/city + interest tags) ile hedeflenmiş announcements oluşturulabilir.
- Noise budget per-user per-channel uygulanır.
- Opt-in/opt-out mekanizmaları ve kanala özel throttling çalışır.

Security Notes:
- Opt-in / consent logged immutable; GDPR/CPRA compliance checklist.
- Announcement content must be sanitized; no PII leakage into push payloads.

Dependencies:
- M19 (events feed)
- User profile/interests store (Core)
- Push service provider & email provider integrations (3rd party)

Issues (import-ready checklist):
1. [ ] M20-001: Announcement schema & segmentation rules  
   - Description: Define targeting taxonomy and schema.  
   - Acceptance: Example segments + sample announcement.
2. [ ] M20-002: Noise budget enforcement engine (per-user)  
   - Description: Rule system to cap messages across channels.  
   - Acceptance: Tests demonstrate caps enforced.
3. [ ] M20-003: Channel router (in-app / push / email) + templates  
   - Description: Router that sends to correct provider with templating.  
   - Acceptance: End-to-end send simulation.
4. [ ] M20-004: Opt-in/opt-out UI + consent logging  
   - Description: APIs for users to manage preferences; store consents.  
   - Acceptance: Consent appear in audit logs.
5. [ ] M20-005: Campaign scheduling & targeting UI (admin)  
   - Description: Minimal admin flow to schedule announcement campaigns.  
   - Acceptance: Campaign runs and triggers messages.
6. [ ] M20-006: Metrics & reporting (delivery / open / conversion)  
   - Description: Track delivery and conversion tied to announcements.  
   - Acceptance: Reporting dashboard or CSV export.

---

# Epic: M17 — Device Capability & Compatibility
Priority: P2
Milestone: vNext-MVP (Sprint 7–8, soft MVP)

Description:
Cihaz yeteneklerinin tanımı, capability handshake (RTC, haptics, bandwidth), device trust ve compatibility matrix; multi-device session safety.

Epic-level Acceptance Criteria:
- Capability handshake exchange prototipi (client -> server) tanımlı ve güvenli.
- Device capability matrix ile basit eşleşme/compatibility check yapılabiliyor.
- Multi-device safety: aynı user hesabından birden fazla device session sınırları konfigüre edilebilir.

Security Notes:
- Device fingerprinting minimal olmalı; hassas donanım kimlikleri toplanmamalı.
- Capability assertions signed/nonce-limited to prevent replay.

Dependencies:
- Core Auth & Trust Graph
- M16 (Couple Experiences) consumes capability info

Issues (import-ready checklist):
1. [ ] M17-001: Device capability schema & handshake protocol spec  
   - Description: Define capability model (RTC, codec, haptics class, bw class).  
   - Acceptance: Spec + sample JSON handshake.
2. [ ] M17-002: Server-side capability store & indexing  
   - Description: Store capabilities per device with TTL.  
   - Acceptance: Read/write tests.
3. [ ] M17-003: Compatibility check service (matrix)  
   - Description: Given two devices, return compatibility rating.  
   - Acceptance: Deterministic checks + tests.
4. [ ] M17-004: Multi-device session safety policies  
   - Description: Rules to limit concurrent sessions and detect suspicious patterns.  
   - Acceptance: Policy simulation tests.
5. [ ] M17-005: Secure capability handshake implementation (basic)  
   - Description: Implement handshake with nonce + auth.  
   - Acceptance: Replay protection tests.
6. [ ] M17-006: Privacy compliance & data retention policy for device data  
   - Description: Retention TTL and purge job.  
   - Acceptance: Purge test and docs.

---

# Epic: M23 — Event Gifting & Gestures
Priority: P2
Milestone: vNext-MVP (Sprint 7–8)

Description:
Event-contextual hediye sistemi: dijital jestler, venue-redeemable gifts, ticket upgrades, escrow-like delivery & refund rules.

Epic-level Acceptance Criteria:
- Users aynı event-match içinde gifting yapabilir; bağlam dışına çıkamaz.
- Escrow-like delivery: hediye teslim kayıtları ve refund kuralları tanımlı.
- Venue-redeemable gift: QR/claim kodu üretimi ve vendor doğrulama akışı.

Security Notes:
- Gift redemption ve code issuance güvenli token’larla yapılmalı; replay & brute-force koruması.
- Financial actions require treasury/token integration or a stubbed safe flow for MVP.

Dependencies:
- M22 (ticketing & commerce)
- Core Treasury/Token (escrow)
- M21 (event-match context)

Issues (import-ready checklist):
1. [ ] M23-001: Gift data model & state machine (issued -> claimed -> redeemed -> refunded)  
   - Description: Define states and transitions with audit trail.  
   - Acceptance: State tests + audit log creation.
2. [ ] M23-002: Gift issuance API (event-scoped)  
   - Description: Create gifts bound to canonicalEventId and match context.  
   - Acceptance: API tests enforce event-context binding.
3. [ ] M23-003: Redemption token generator & verification service  
   - Description: Produce one-time QR/claim tokens and verification endpoint.  
   - Acceptance: Tokens single-use + TTL enforced.
4. [ ] M23-004: Refund & dispute rules integration with policy engine  
   - Description: Rules for partial/full refunds based on conditions.  
   - Acceptance: Policy-driven refund simulation.
5. [ ] M23-005: Vendor-facing redeem flow (minimal)  
   - Description: Endpoint for vendors to validate redeemable gifts and mark redeemed.  
   - Acceptance: Vendor auth & idempotent redeem call.
6. [ ] M23-006: Treasury integration stub & audit for escrow flows  
   - Description: Stubbed contract for escrow operations with logs.  
   - Acceptance: Escrow operations recorded and reconcilable.

---

# Epic: Core — Trust Graph, Policy Engine, Token & Treasury Integration
Priority: P2
Milestone: vNext-MVP (ongoing across sprints)

Description:
Core altyapı: Trust Graph (user reputation/links), Policy Engine (global behavior guarantees, abuse/spam rules), Token & Treasury (escrow, gifting, micropayments) ve security infra (SIEM, KMS, secret manager).

Epic-level Acceptance Criteria:
- Minimal Trust Graph to support trust gating for M21 & M16.
- Policy Engine can express & enforce main rules (rate limits, context constraints).
- Treasury/Token interface defined and stub implemented for M22/M23 flows.
- SIEM logging + key management baseline in place.

Security Notes:
- KMS/Secrets + 2FA for admin UIs.
- SIEM ingestion for match/commerce events; retention policy defined.
- Policy engine must be auditable; rules versioned.

Dependencies:
- All modules depend on Core for auth, policy and treasury functions.

Issues (import-ready checklist):
1. [ ] CORE-001: Trust Graph minimal model & API (friend/trust edges, reputation score)  
   - Description: Provide queries used by M21/M16 for gating.  
   - Acceptance: API works in sample scenarios.
2. [ ] CORE-002: Policy Engine initial ruleset & runtime (rate-limit, no-cross-event-gifting)  
   - Description: Implement rules DSL and enforcement hooks.  
   - Acceptance: Rules enforced in simulated flows.
3. [ ] CORE-003: Treasury/Token interface spec & stub service  
   - Description: Define escrow APIs and implement stub for MVP.  
   - Acceptance: M22/M23 escrow workflows call stub successfully.
4. [ ] CORE-004: SIEM / structured logging baseline (audit events list)  
   - Description: Define events to log for compliance and security.  
   - Acceptance: Logs emitted to dev SIEM endpoint.
5. [ ] CORE-005: Secret management & KMS integration plan  
   - Description: Integrate cloud secret manager and KMS wrap/unwrap flows.  
   - Acceptance: Secrets stored & retrieved securely in dev.
6. [ ] CORE-006: Security review checklist & automated tests  
   - Description: Run threat model / checklist; basic automated security tests.  
   - Acceptance: Checklist completed, findings triaged.

---

## Son Notlar / İçe Aktarım (Import) İpuçları
- Her checklist maddesini GitHub Issues'a yapıştırırken başlığı (ör. "M21-001: API — EventMatch...") issue başlığı olarak kullan; açıklama bölümüne satır altındaki Description / Acceptance detaylarını koy.
- Labels önerisi: epic / area/<module> / priority/<high|medium|low> / type/{bug,feature,task,security}
- Milestone: vNext-MVP (90 days) oluştur ve sprint-lara ayır.
- Bağımlılıklar issue-level olarak cross-reference (e.g., "Depends on M19-001") şeklinde eklenebilir.

---

Prepared by: Copilot-style automated spec generator for HUSHPair vNext-MVP
