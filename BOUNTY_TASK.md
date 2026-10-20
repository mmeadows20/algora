# Bounty Objective: Bug: Incorrect Profile data
Target: algora-io/algora Issue #168
URL: https://github.com/algora-io/algora/issues/168

## Issue Description
Hi @zcesur, thanks for building Algora.io — I really love the platform!

After signing in, I checked my [profile](https://algora.io/qxprakash) page and noticed something that didn’t quite make sense. The total contributions data appears to be incorrect for one of my repositories I've contributed to i.e. Transloadit . you can cross check this by clicking on the repo card itself where it would navigate you to `"https://github.com/#{owner.provider_login}/#{List.first(contributions).repository.name}/pulls?q=author%3A#{@user.provider_login}+is%3Amerged+"`

After digging through the code locally, I found the section responsible for rendering this:

https://github.com/algora-io/algora/blob/07b974183214b83ac09bfd52c5bac37ce5181b45/lib/algora_web/live/user/profile_live.ex#L273-L276

Any idea what could be causing this?

Also there are a bunch of other repos which I've contributed to in the past why are they not visible ?


## Instructions for Kuro (Autonomous Solver):
1. Use skills: `systematic-debugging` and `code-review-and-quality`.
2. Inspect the repository structure, locate relevant files, and understand the bug/feature.
3. Apply the minimal, robust fix or implementation.
4. Run any existing test suites or linters in the workspace.
5. Ensure the fix adheres to the project's existing code style.
6. When done, output a summary of files modified and verification results.
