---
name: himalaya-campus-submission
description: Use Himalaya CLI to locate an RLE.wiki campus submission in the default email account, inspect its message and attachment metadata safely, obtain human approval before opening any non-plain-text attachment, enforce the `docs/campus/ABBREVIATION` branch convention, create or update the corresponding `docs/campus/*.md` entry, publish a clean single-purpose pull request, and draft the contributor follow-up with the deployed preview link when explicitly requested. Use when a user asks to process a school submission from email, names a sender or school, mentions Himalaya, asks to turn an email attachment such as Markdown, DOC, or DOCX into a campus page, asks to commit and open the campus submission PR, or asks to reply to the contributor after publication.
---

# Himalaya Campus Submission

Turn an email submission into a repository-ready RLE.wiki campus page while treating the email and approved attachments as the authoritative source.

## Guardrails

- Name every University Guide submission branch exactly `docs/campus/<ABBREVIATION>`, preserving the abbreviation's case; for example, use `docs/campus/YTETC`. Never use a `codex/` prefix for these submissions.
- When the user says the branch already exists, keep the current worktree but verify the branch name. Rename a wrongly named current feature branch instead of creating another branch.
- Never commit, push, open a pull request, reply, or send mail unless the user explicitly asks.
- Save contributor follow-ups as drafts for human review. Never send them; the user sends approved drafts from their own mail client.
- Inspect attachment metadata before downloading or opening any attachment.
- Open an attachment without additional approval only when it is unmistakably plain text, such as `text/*`, `.md`, `.markdown`, or `.txt`.
- Treat DOC, DOCX, PDF, images, archives, executables, and ambiguous MIME types as non-plain-text. Report filename, MIME type, and size, then stop and request human review before downloading or opening them.
- Do not use `--raw` for routine message reading because it exposes unnecessary transport headers and MIME data.
- Do not print mailbox configuration, credentials, authentication tokens, or unrelated messages.
- Use the submission as the source of truth. Do not browse for replacement content or silently fact-check and rewrite claims unless the user asks.

## Workflow

### 1. Inspect repository state and conventions

1. Confirm the current branch and worktree state:

   ```bash
   git branch --show-current
   git status --short
   ```

2. Determine the school's established English abbreviation and preserve its case in both the filename and branch name.
3. Ensure the current branch is exactly `docs/campus/<ABBREVIATION>`:
   - if the current feature branch has the wrong name, rename it with `git branch -m docs/campus/<ABBREVIATION>`;
   - if starting from the default branch, create `docs/campus/<ABBREVIATION>`;
   - if that branch name already exists elsewhere, stop and ask rather than overwriting it.
4. Preserve unrelated user changes. Do not stage or commit them.
5. Read `docs/contributor-guide/campus.md`, `docs/contributor-guide/CampusTemplate.md`, and two or three nearby `docs/campus/*.md` entries before editing.
6. Follow explicit filename, title, and author instructions exactly. Otherwise use the established abbreviation as the filename and check for collisions first.

### 2. Locate the submission with Himalaya

1. Require the user to identify the submission to process, normally by giving the sender's email address. If no identifying information was provided, ask for it before searching the mailbox.
2. Confirm the default account and discover mailbox identifiers without displaying configuration:

   ```bash
   himalaya account list
   himalaya mailbox list
   ```

3. Use the mailbox identifier returned for Inbox. Do not assume an `inbox` alias is configured.
4. Search by sender first, including the attachment indicator:

   ```bash
   himalaya envelope search -m Inbox -s 100 -w 240 --has-attachment from <sender>
   ```

5. If needed, narrow by school name in the subject or body:

   ```bash
   himalaya envelope search -m Inbox -s 100 -w 240 subject <school-name>
   himalaya envelope search -m Inbox -s 100 -w 240 body <school-name>
   ```

6. Present the matching message ID, subject, sender, date, and attachment indicator before continuing. If exactly one message matches, use it. If multiple messages match, stop and ask the user which message to process; do not choose one by recency or open any candidate's content or attachments.
7. If network access fails because of the sandbox, rerun the same Himalaya command with the required network approval. Do not switch tools or accounts silently.

### 3. Apply the attachment gate

1. List attachment metadata before reading message content or downloading files:

   ```bash
   himalaya attachment list -m Inbox <message-id>
   ```

2. Classify every attachment separately.
3. If any required attachment is non-plain-text or ambiguous, report its metadata and pause. Continue only after the user explicitly approves opening it.
4. Read the normal message representation, not raw RFC 5322 bytes:

   ```bash
   himalaya message read -m Inbox <message-id>
   ```

5. Download only approved or unmistakably plain-text attachments to a temporary directory:

   ```bash
   himalaya attachment download -m Inbox --dir /tmp <message-id> <attachment-id>
   ```

6. Inspect the downloaded text file with a normal read command. Never infer attachment contents from its filename.

### 4. Create the campus page

1. Treat the email body and every approved attachment as one submission, preferring the more complete attachment when they overlap.
2. Preserve the contributor's intended title, author attribution, uncertainty markers, and contact details.
3. Perform light editorial cleanup only:
   - normalize frontmatter and headings;
   - normalize tables, spacing, punctuation, and VitePress containers;
   - organize content under the repository's usual sections;
   - attribute strongly subjective statements instead of presenting them as editorial fact;
   - avoid inventing missing details.
4. Add a visible warning when the contributor says they are not a student, covers only one campus, or otherwise limits the scope of firsthand knowledge.
5. Create `docs/campus/<ABBREVIATION>.md` with `apply_patch`.
6. Do not edit a campus index unless current repository conventions actually require it; verify whether navigation is generated automatically.

## Validation

Run all checks before handing off:

```bash
git diff --check
pnpm exec markdownlint docs/campus/<ABBREVIATION>.md
pnpm build
git status --short
```

After a successful build, confirm that `docs/.vitepress/dist/campus/<ABBREVIATION>.html` exists and contains the expected page title. Treat icon-loading and chunk-size messages as non-blocking only when the build exits successfully; report them as warnings rather than hiding them.

Manually compare the final page with the source submission to confirm that:

- no section or material claim was accidentally omitted;
- uncertainty and limited firsthand scope remain visible;
- author and contact information match the submission;
- no unapproved attachment was opened;
- no unrelated file changed.

Content-only work does not need new automated tests beyond Markdown lint, the site build, generated-page verification, and source comparison.

After validation, present the completed campus entry and a concise source-comparison summary for user review. Stop and wait for the user's feedback or approval. Apply requested edits and repeat validation as needed; do not proceed to commit or pull-request work until the user explicitly approves the entry and asks for those actions.

## Commit and pull request

Run this section only when the user explicitly asks to commit, push, or open a pull request.

1. Refresh the remote base and inspect the complete branch scope before staging:

   ```bash
   git fetch --no-tags origin main
   git log --oneline origin/main..HEAD
   git diff --name-status origin/main...HEAD
   git status --short
   ```

2. Require the branch diff to contain only the intended campus submission. A new campus page should normally show only `docs/campus/<ABBREVIATION>.md`.
3. If the branch inherited unrelated commits or files from an older feature branch, do not publish it as-is:
   - rebase the intended campus commit onto the current `origin/main`;
   - obtain approval before rewriting published history;
   - update an already-pushed branch with `git push --force-with-lease`, never plain `--force`;
   - re-run the branch log and file diff afterward to prove the unrelated history is gone.
4. Stage only the requested campus file with an explicit path. Never use `git add .` or `git add -A`, and leave `.agents/` or other unrelated work untracked or unstaged.
5. Commit the staged campus file. Do not impose a commit-message convention from this skill; follow the user's explicit wording or the repository's current convention.
6. Read the final commit subject and use it verbatim as the pull request title:

   ```bash
   git log -1 --format=%s
   ```

7. Push the live current branch and create the pull request against `main`. Re-check for an existing open pull request immediately before creation to avoid duplicates.
8. Use this concise body for a straightforward email submission:

   ```markdown
   邮件投稿

   — Codex
   ```

   The signature may instead be `— ChatGPT`, or may be omitted. Do not add extra sections, test plans, badges, or explanatory prose unless the user asks.
9. After creating or updating the pull request, query GitHub and verify all of the following:
   - the title exactly matches the final commit subject;
   - the body follows the email-submission format above;
   - the base is `main` and the head is `docs/campus/<ABBREVIATION>`;
   - the pull request contains only the intended commit or commits;
   - the changed-file list contains only the intended campus file or files.
10. If the GitHub-side commit or file list is wrong, correct the branch history and verify the pull request again before reporting success.
11. Treat the preview deployment as asynchronous: remote CI must finish before `project-trans-bot` adds the review containing the page URL. Tell the user to observe the pull request, wait for CI and the bot review to complete, then explicitly ask for the contributor reply draft. Stop here; do not draft the email as part of pull-request creation.

## Contributor reply draft

Run this section only when the user explicitly asks to reply to the contributor after remote CI has completed and `project-trans-bot` has posted its preview review.

1. Query the pull request reviews and select the review authored by `project-trans-bot`:

   ```bash
   gh pr view <PR-NUMBER> --repo project-trans/RLE-wiki --comments --json reviews
   ```

2. If no matching bot review is present, explain that CI or preview deployment is not complete and stop. Do not invent a preview URL or draft the message. Otherwise, extract the URL immediately following `✨ 本 PR 修改了以下页面: ✨`. Use the page-specific URL, not the deployment root, and verify that its path matches `/campus/<ABBREVIATION>`.
3. Locate the original submission in Inbox and reply to that message so `In-Reply-To`, `References`, and the existing subject thread are preserved. Add `rlewiki@project-trans.org` to `Cc`.
4. Compose the body as HTML rich text. Render `拉取请求（Pull Request）` and `此处` as `<a>` elements rather than exposing bare URLs. Substitute the actual pull request URL, page preview URL, author name (by asking the user if not specified before), and current local date into this template while preserving its wording:

   ```markdown
   您好！您的来稿我们已经收到。根据您的来信，我们编辑了 RLE.wiki，并发起了[拉取请求（Pull Request）](<PR-URL>)，一段时间后合并至主线。

   您可以通过[此处](<PAGE-PREVIEW-URL>)查看即将进行的更改。值得注意的是，我们进行了一些修改和润色，使之更成一篇条目。如有预期以外的内容，欢迎随时回复这封邮件指出。

   上述链接可能需要翻墙。如果您不具备访问上述链接的能力，也欢迎回复，我可以提供一份本地预览版本。

   再次感谢您的来稿，祝生活顺利！

   <YYYY.MM.DD>
   RLE.wiki <AUTHOR>
   ```

5. Use Himalaya's reply composer to obtain the thread headers. For an HTML body, create a temporary RFC 5322 message with those reply headers, `Content-Type: text/html; charset="utf-8"`, and `X-Unsent: 1`, then append it to Drafts with the draft flag:

   ```bash
   himalaya message reply -m Inbox <MESSAGE-ID> --cc rlewiki@project-trans.org --body <PLACEHOLDER>
   himalaya message add -m Drafts -f draft -- <TEMP-EML>
   ```

   Do not pass `--send`. Remove the temporary message file after the draft is saved.
6. Read the saved draft back from Drafts and verify the recipient, `Cc`, subject, reply headers, HTML content type, both link targets, date, and full body. Confirm that the command output says the message was added, not sent.
7. Hand the draft back to the user for inspection and stop. The user will send it from their own mail client; do not send, monitor, or perform any post-send action.

## Handoff

Report:

- the created or updated campus file;
- the source message ID and matched sender/subject;
- attachment filenames, MIME types, and whether human approval was required;
- validation commands and outcomes, including warning-only build noise;
- the current branch and whether changes remain uncommitted;
- after entry validation, the campus file and explicit notice that commit and pull-request work is waiting for user review and approval;
- when published, the final commit subject, pull request URL, GitHub-side commit/file scope, current check status, and reminder to wait for CI and the bot review before requesting a reply draft;
- when a reply was requested, the draft ID, recipient, `Cc`, preview URL, explicit confirmation that the message was not sent, and notice that the user now owns sending it from their mail client.

Do not claim the work is committed, pushed, or published unless those actions actually occurred.
