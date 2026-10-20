# Bounty Objective: [Bug] Successful GitHub login redirects to /home which returns 404
Target: algora-io/algora Issue #329
URL: https://github.com/algora-io/algora/issues/329

## Issue Description
## Summary

After signing in with GitHub, authentication succeeds and my account is created correctly, but Algora redirects me to `/home`, which returns a 404 page.

## Account

GitHub username: Youngboy1609

## What works

* Login with GitHub succeeds
* https://algora.io/bounties loads correctly
* Transactions / payout pages load correctly
* Account information is visible in the top-right corner

## What fails

* https://algora.io/home
* https://algora.io/dashboard
* https://algora.io/profile
* https://algora.io/settings
* https://algora.io/users/Youngboy1609

All return 404.

## Steps to reproduce

1. Sign in with GitHub
2. Authentication succeeds
3. Redirect occurs to https://algora.io/home
4. Page returns 404

## Troubleshooting already performed

* Verified GitHub email
* Revoked Algora OAuth access and re-authorized
* Cleared cookies
* Tested in incognito mode
* Tested multiple URLs manually

## Observed behavior

Authentication appears successful because bounties and payout pages work normally, but the post-login redirect target appears broken or unavailable.

## Expected behavior

Users should be redirected to a valid dashboard, profile, or landing page after successful login.

## Instructions for Kuro (Autonomous Solver):
1. Use skills: `systematic-debugging` and `code-review-and-quality`.
2. Inspect the repository structure, locate relevant files, and understand the bug/feature.
3. Apply the minimal, robust fix or implementation.
4. Run any existing test suites or linters in the workspace.
5. Ensure the fix adheres to the project's existing code style.
6. When done, output a summary of files modified and verification results.
