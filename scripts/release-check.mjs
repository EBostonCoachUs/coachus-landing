import { readFile } from "node:fs/promises";
import { legalDrafts, legalEffectiveDate } from "../src/data/legal.js";
const approvals = JSON.parse(await readFile("review/legal-status.json", "utf8"));
const websiteCopy = JSON.stringify([legalDrafts.website, legalDrafts.terms, legalDrafts.cookies]);
if (!approvals.websitePrivacyApproved || !approvals.websiteTermsApproved || !approvals.websiteCookiesApproved || !approvals.liveWebsitePracticesVerified || !approvals.approvedBy || !approvals.approvedDate || !/^\d{4}-\d{2}-\d{2}$/.test(legalEffectiveDate) || /FACT REQUIRED BEFORE PUBLISHING|LEGAL REVIEW REQUIRED/.test(websiteCopy)) {
  console.error("Release blocked: verify live website practices, approve the three website notices, and set the actual effective date. The application draft is not part of this website-only release. Use pnpm build for the non-sending review version.");
  process.exit(1);
}
if (process.env.VITE_RELEASE_APPROVED !== "true") {
  console.error("Release configuration is incomplete.");
  process.exit(1);
}
