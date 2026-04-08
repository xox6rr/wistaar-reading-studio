
Goal: restore login access and make sure authors can actually reach the books they uploaded.

What I found
- There is an immediate backend issue right now: the project is still waking up, and the database is not accepting connections yet. While that is happening, login can fail even if the app code is correct.
- There is also a real app bug in the author flow:
  - `/author/submit` only checks that a user is signed in.
  - The current insert rule for `book_submissions` only checks `author_id = auth user`.
  - But `/author/dashboard` blocks users unless they have `user_roles.role = 'author'`.
- Result: a signed-in user can submit a book without a proper author role, then later get locked out from the dashboard that should show their uploaded books.
- There is also a UX gap: there is no obvious Author Dashboard link in navigation, and the Publish page stays in “marketing mode” even for logged-in authors.
- One more expected-but-confusing behavior: uploaded books only become public after admin approval, so pending books will not appear in Explore.

Plan
1. Fix the immediate login path
- First re-test after Lovable Cloud fully wakes up.
- If login only fails in preview after the backend is healthy, treat it as a preview-only auth issue; do not try to “fix” it with CORS changes or fetch overrides.
- Improve auth error handling so the app clearly distinguishes:
  - backend unavailable
  - email not confirmed
  - wrong credentials

2. Repair the author access flow
- Replace the fragile `localStorage`-only author bootstrap with a reusable “ensure author access” helper.
- On author sign-in / author onboarding, make it idempotently:
  - create the `author` role if missing
  - update the profile name if needed
- Keep roles in `user_roles` as the source of truth.

3. Restore access for people who already uploaded books
- Add a migration that backfills missing `author` roles for any user who already owns rows in `book_submissions`.
- This is the key step to recover existing accounts that can upload but cannot access their own author area.

4. Enforce the same rule everywhere
- Tighten the `book_submissions` insert policy so only real authors can submit books.
- Add the same author-role check in `BookSubmit.tsx` before uploads begin, with a redirect/toast to author onboarding if needed.

5. Make uploaded books reachable in the UI
- Add an Author Dashboard link in navigation when the user is an author.
- Make `Publish.tsx` context-aware:
  - author: “Go to dashboard” / “Submit new book”
  - logged-in non-author: “Become an author”
  - signed-out user: author signup
- In `AuthorDashboard.tsx`, add clear actions:
  - approved: view live book / read
  - pending or rejected: view submission details and clear status messaging
- Explicitly state that pending books are private until approved.

6. Fix the adjacent purchase/notification regression
- The current purchase flow tries to create a self-notification from the client, but notification inserts are now admin-only.
- That should be fixed too, because it can break post-purchase access to premium books.

Files likely touched
- `src/hooks/useAuth.tsx`
- `src/pages/Auth.tsx`
- `src/pages/AuthorSignup.tsx`
- `src/pages/AuthorDashboard.tsx`
- `src/pages/BookSubmit.tsx`
- `src/components/Navigation.tsx`
- `src/pages/Publish.tsx`
- `src/hooks/usePurchases.ts`
- new backend migration(s) for `user_roles`, `book_submissions`, and `notifications`

Technical details
- Backfill before tightening permissions, so existing authors are not locked out.
- Keep public book visibility limited to approved books; the fix is author access and clearer UI, not making draft submissions public.
- Do not edit the generated backend client file.
- Do not try to fix preview auth failures with CORS or custom fetch hacks.

Success checks
- Existing user with uploaded books can open Author Dashboard and see submissions.
- New author can sign up, verify, sign in, and submit without getting stuck.
- Non-authors cannot successfully submit books until they become authors.
- Pending books are visible to their author in dashboard but not in Explore.
- Buying a premium book still unlocks access and notifications work correctly.
