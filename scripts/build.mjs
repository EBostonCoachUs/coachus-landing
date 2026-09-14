import { spawnSync } from "node:child_process";
const release = process.argv.includes("--release");
const env = {
  ...process.env,
  VITE_RELEASE_APPROVED: release ? "true" : "false",
};
if (release) {
  const check = spawnSync(process.execPath, ["scripts/release-check.mjs"], {
    stdio: "inherit",
    env,
  });
  if (check.status !== 0) process.exit(check.status || 1);
}
// A plain build always produces a safe, non-sending review, even if a local env file says otherwise.
for (const args of [
  ["node_modules/vite/bin/vite.js", "build"],
  ["scripts/prerender.mjs"],
]) {
  const result = spawnSync(process.execPath, args, { stdio: "inherit", env });
  if (result.status !== 0) process.exit(result.status || 1);
}
