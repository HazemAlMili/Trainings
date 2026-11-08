# NovaTova 2.0 — Full Website Prototype: Content, IA, Interaction & Conversion Blueprint
Version: 1.0 • Audit date: 8 November 2026 • Format: implementation-ready prototype specification
IMPORTANT: This is the proposed, rewritten website content and interactive prototype structure — not a verbatim transcript of every current site page. Section A documents currently visible material; sections B–Q define the upgraded experience. Any user testimonials, teacher profiles, certifications, performance figures, guarantees, or policy text not independently approved must be visually marked as placeholder / pending verification and must never be presented as factual. Audience-facing Arabic below is intentionally Palestinian / Arab 48, not Egyptian or Saudi Arabic.

## A. What exists now: source inventory and decisions
Public routes inspected:
- `/` — general four-language home, language cards, six-step process, why choose us (repeated), student video stories, session packages, FAQs.
- `/pricing` — 25-/55-minute selection, 15/25/50/100-session cards, warranties and FAQ; prominent prices for 25 minutes.
- `/how-it-works` — four-step description, guarantees, FAQs.
- `/for-parents` — parent problem/benefits, parent portal illustration, testimonials, guarantees.
- `/for-students` — child-facing colorful games/rewards content.
- `/about` — story, values, testimonials, metrics.
- `/testimonials` — testimonial filters, featured stories, video section.
- `/faq` — search, category tabs, FAQ accordion (question list public; open-answer text not completely extractable).
- `/contact` — phone, WhatsApp, email, contact form incl. reason dropdown.
- `/blog`, `/blog/1` — blog search, categories/tags, sample articles. Current content is partly generic and inconsistent; rebuild.
- `/courses` — public course catalogue with inflated/unsupported metrics, USD prices and irrelevant topics; replace with goal-based learning paths; do not copy unverified cards.
- `/for-teachers` — teacher recruitment and application CTA; its CTA currently routes to registration unavailable page.
- `/teachers` — currently redirects to /login?redirect=/teachers; introduce a public preview teacher listing instead without exposing private platform data.
- `/onboarding-temporarily-unavailable?action=free-trial` — current free-trial button leads to intermediary telling visitors to use WhatsApp; remove from prototype marketing funnel.
- `/login` — existing account login, not new acquisition path.
- `/privacy-policy`, `/terms-of-service`, `/cookie-policy` — public legal pages requiring legal owner review.

### Critical mismatches to resolve before launch:
1. Current `/pricing` states refund for unused credits within 30 days; project-approved commercial offer says 100% refund if dissatisfied within first 14 days, no questions asked. Other terms say 14 days subject to conditions. Do not publish contradictory claims. Prototype uses a provisional wording with a visible [POLICY_REVIEW] admin flag; confirm exact terms legally.
2. Existing pages say “no lesson video recording,” while there are operational Zoom recordings. Replace with truthful interim copy: “سياسة تسجيل الحصص والاحتفاظ بها بتوضحها إلكم إدارة المنصة قبل الحجز، وبنراعي موافقة الأهل وخصوصية الأطفال.” Finalize policy and permissions before publishing.
3. Current pages disagree on which ages fit 25 vs 55 minutes and mention 40/45-minute options; project strategy prioritizes ages 9–14 with 25-minute default. Keep 55 for appropriate older/committed learners; don't advertise unapproved 40/45 price.
4. Do not reuse numeric claims like 5,000 students, 50,000 students, 500 teachers, 93% confidence, 100% satisfaction, ₪150 teacher hourly compensation, security badges, 1,200 courses, 99.9% uptime without verified support. Current-site teachers page conflicts with internal tutor economics.
5. Do not assert official academic/Yael exam prep, guaranteed grades, guaranteed fluency, job placement, certificates, or specific teacher accreditation without proof.
6. Current public contact details differ (hello@novatova.com vs contact@novatova.com). Use CONFIG.contactEmail approved by owner. No made-up phone numbers or teacher identities.
7. Buttons must not dead-end at registration-unavailable or fake checkout. All purchase actions initiate human assistance or open the plan enquiry with context. Existing purchasers use sign-in separately.

What is confirmed in NovaTova project modules: 1:1 online lessons, Hebrew as leading commercial offer, four languages offered on current website; kids 9–14 are primary segment; adult conversation secondary; work/interview test only; first trial free (each child can trial); manual trial booking via WhatsApp; 25-minute kids sessions; 55-minute sessions available; family-shared credits via parent account; flexible teacher switching; teacher trial reports; post-trial human closer and payment links; package pricing below; Palestinian Arabic copy. The 14-day full refund policy was confirmed internally but has conflicting public copy and needs harmonization.

## B. Brand identity and design system
- Brand platform: “NovaTova — تعلّم لغة. احكي بثقة.” / “Your language. Your pace. Real connection.”
- Personality: warm, confident, respectful, attentive, premium, human-led. NOT childish-only, not a gamified Novakid copy, not a generic LMS template.
- Ownable visual signature: two rounded speech paths converging into a rising progress arc; use as a subtle graphic motif, progress bar, section divider and motion transition. Do not mimic Novakid’s space/planet/mascot artwork.
- Proposed tokens:
  - Deep Ocean `#16344B` (headings, main dark)
  - Growth Teal `#118F86` (CTA and progress; ensure accessible contrast against white)
  - Warm Apricot `#FFC77A` (illustrative accents)
  - Warm White `#F7F9F6` (page background)
  - Cloud `#EAF1F2` (surfaces)
  - Ink `#132B36`; Muted `#566974`; Danger `#C14343`; Success `#146D58`.
  - Type: Arabic IBM Plex Sans Arabic or Noto Sans Arabic; English Inter or equivalent.
  - Spacing: 8px grid; radii 12/18/28px.

## C. Routes & Navigation
Routes: `/`, `/languages/hebrew`, `/languages/english`, `/languages/german`, `/languages/french`, `/for-parents`, `/for-kids`, `/for-adults`, `/for-work`, `/how-it-works`, `/pricing`, `/teachers`, `/teachers/:slug`, `/stories`, `/stories/:slug`, `/trial`, `/trial/preview`, `/about`, `/blog`, `/blog/:slug`, `/faq`, `/contact`, `/teach-with-us`, `/privacy`, `/terms`, `/cookies`, `/login-preview`, `/not-found`, `/prototype-index`.

## H. Pricing Table (Confirmed internal economics)
| Package | Sessions | 25 min total | 25 min / session | 55 min total | 55 min / session |
|---|---|---|---|---|---|
| باقة البداية | 15 | ₪390 | ₪26 | ₪750 | ₪50 |
| باقة التقدّم | 25 | ₪600 | ₪24 | ₪1,125 | ₪45 |
| باقة الاستمرار | 50 | ₪1,000 | ₪20 | ₪2,100 | ₪42 |
| باقة العيلة | 100 | ₪1,800 | ₪18 | ₪3,900 | ₪39 |

