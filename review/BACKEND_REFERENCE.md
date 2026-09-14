# Backend reference

See DEPLOYMENT.md for the current launch sequence. These implementation details describe supplied code, not configured live services. The form now has three fields: Name, Email, Dealership. Current automated test count is 15.

## Form guarantees and limits

A successful request response follows a committed database transaction containing the lead and an email job. A provider outage leaves the request in the queue. Tokens are random, expire after 24 hours, are checked by hash, and are single-use. Pending email tokens are encrypted in the outbox. A link opens /verify with its token in a fragment; the page removes the fragment and confirms only after an explicit POST. No token is sent to analytics. The verification function and notification insertion share one transaction.

Defaults: no more than 3 new verification jobs/address/24 hours, a 5-minute resend cooldown, a soft 30-attempt shared-IP/10-minute threshold, and 100 accepted/duplicate intake attempts globally/24 hours. Personal domains, single names, Unicode and plus tags are allowed. The email local part is preserved for deduplication; case variants may be distinct. This avoids provider-wide rewriting assumptions, with the tradeoff that global/IP controls still matter. Browser fingerprinting and disposable-domain enrichment are not used. Email verification proves mailbox control, not dealer identity.

Jobs have leases, a maximum of 5 attempts, bounded retry delay, and stable Resend idempotency keys. Retries stop after 23 hours to remain inside the documented 24-hour provider idempotency window. A failed token-delivery job needs operational attention or a fresh user-requested link. A daily digest, marketing nurture, SMS and automatic demo promises are not implemented.

## Prelaunch acceptance checks still required in the real environment

- Desktop, tablet, narrow mobile, keyboard, 200% text enlargement, focus order, form errors, menu Escape, and screen-reader announcements; this task did not run browser interaction or mobile visual QA.
- Real deployment route refreshes, redirects, 404 status, CSP/Turnstile, canonical host, legal URL without login, metadata sharing, and measured Core Web Vitals.
- Submit a dedicated test request. Confirm exactly one durable receipt, a delivered verification email, no confirmation on GET, a successful explicit confirmation, and exactly one internal alert.
- Duplicate, resend cooldown, shared dealership IP, expired/replayed token, sender failure/retry, suppression, and unavailable storage; test the actual services, not only mocks.
- Confirm verified requests are reviewed by Matt and failures are visible to a backup. Review provider log retention and deletion behavior. No production data, credentials, or emails were used during this task’s tests.

