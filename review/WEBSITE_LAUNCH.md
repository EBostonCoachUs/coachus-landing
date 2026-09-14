# Website launch — September 14, 2026

## Confirmed by Matt today
- CoachUS LLC is a North Carolina LLC.
- Use matt.cady@coachus.com for inquiries and privacy requests; Matt receives this mailbox.
- Launch is for U.S. dealership inquiries and the waitlist only.
- No advertising pixels, visitor analytics, session replay, SMS campaigns, or automated promotional email sequence.
- Business mailing address remains to be supplied. Do not insert Jason’s address or publish Matt’s home address by assumption.

## Pages completed for review
Privacy, Terms of Service, and Cookie Policy use Jason’s materials as a starting point, rewritten for this launch. Public routes: /privacy, /terms, /cookies. Vercel aliases: /privacy-policy, /terms-of-service, /cookie-policy. Footer and contact page use Matt’s verified address. Existing approved homepage and headshot are preserved.

Removed unsupported advertising/SMS/account-registration claims, a nonexistent cookie preference panel, blanket consent, and universal regional rights. Added retention criteria, request handling, separate website/application scope, and North Carolina governing law. No arbitration, invented certification, or absolute security guarantee.

The private preview still displays a review notice. Clean policy body copy contains no internal FACT REQUIRED instructions. It describes the intended public launch, not a completed audit of the current coachus.com deployment. It is not an attorney approval or a certification of compliance.

## Boston’s remaining launch work
1. **Verify the deployment against the notices.** Inspect actual hosting, email/mailbox, database and anti-abuse services, their contracts, logs, locations and cookie behavior. Proposed code uses Vercel, Resend, Supabase and Turnstile; configuration is not evidence of deployment. Confirm no injected analytics, advertising, replay or optional tracking. Check existing waitlist records and any old phone numbers or exports. Adjust the notices if the actual flow differs.
2. **Make inquiries work end to end.** Configure backend/environment secrets and the database; test a submission, persistence, verification message and confirmation, internal notification to Matt, failures/retries, duplicate handling and rate limiting. Authenticate the sending domain. Review outbound messages for CAN-SPAM; an email is not automatically exempt because it is called a verification or requested follow-up. Until tested, keep review mode on. Static Sites hosting does not run the Vercel API handlers.
3. **Adopt privacy operations.** Matt owns requests arriving at his email. Maintain a restricted request log; verify identity proportionately; find relevant database, mailbox, vendor and export records; correct/delete as appropriate; preserve legal holds and contact suppression; respond within applicable deadlines, documenting exceptions. Set a recurring retention review and vendor/backup deletion rules before promising those operations. Do not claim that this operational process has already been tested.
4. **Final public-site QA and approval.** Check all routes and footer links, mobile layouts, keyboard navigation/focus, form labels and errors, contrast, HTTPS and security headers. Verify canonical URLs, redirects, sitemap and robots on coachus.com. Set legalEffectiveDate to the actual publication date; record owner approval and verified deployment facts in review/legal-status.json. Only then run the release build and deploy to the intended public host. Review-date copy and review banners must not ship publicly.

## Mailing address and email
A business address is still needed before commercial promotional email is sent. FTC guidance permits a properly registered PO box or qualifying private mailbox; do not substitute an unverified address. The lack of a street address is not by itself a reason to invent one in this website-only notice. Assess any additional contact disclosures if the business expands its audience or services. No promotional automation is part of this launch.

## Separate product launch
The application privacy notice is still unfinished and excluded from public website routes/sitemap in release mode. This website policy must not be represented as covering dealership employee/customer feeds, AI processing or a Fortellis application. Before application onboarding or marketplace submission, reconcile actual data fields, vendor/dealer agreements, security, retention and required application notices. Certification-in-progress is not approval.

## Research and limits
- Jason’s source: https://skaivision.com/privacy-policy ; https://skaivision.com/terms-of-service ; https://skaivision.com/cookie-policy . User supplied full policy text and authorized adaptation. His advertised cookies, SMS and blanket regional wording do not establish CoachUS practices.
- California posting/content requirements: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22575. (policy categories, disclosures, request process, changes, effective date and tracking information where applicable).
- CCPA applicability and request rules: https://oag.ca.gov/privacy/ccpa . Do not copy the source policy’s one-month CCPA deadline or state that every visitor has all GDPR rights. Applicable-law assessment remains separate from copy editing.
- FTC email: https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business . Includes B2B commercial messages; postal address and opt-out obligations depend on message purpose, not automation alone.
- FTC operations: https://www.ftc.gov/business-guidance/resources/protecting-personal-information-guide-business . Inventory, minimize, secure, dispose and prepare incident response.

No further generic legal pages are proposed for this limited marketing launch. A cookie banner, SMS terms, a GDPR-style consent system or a SOC 2 badge should not be added merely because another site has them. Change the assessment if tracking, audience, data practices or product access changes. The Terms’ liability and governing-law provisions are proposed drafting, not a conclusion about enforceability.

Boston comparison: the linked Vercel deployment was fetched successfully on September 14. Its public script contains a seven-section draft covering website and future product use, naming Vercel and Resend, optional phone collection, and info@coachus.com. It is explicitly not an approved final notice. The replacement narrows website scope and adds retention, requests, tracking, children, change notification, and confirmed contact details.

Verification this revision: build passed; all 15 existing intake/email tests passed; the three prerendered legal pages contain the right titles, contact and footer links, and no internal FACT REQUIRED markers or SKAI branding. Live backend/email, browser/mobile, provider cookie inventory and privacy-request deletion have not been tested.
