# Play Console Setup — step by step

Everything here needs your own Google account, so these are steps for you to
click through. I've prepared all the content/assets referenced below.

## 1. Create the app entry
In [Play Console](https://play.google.com/console) → **All apps** → **Create app**
- App name: `Natyam AI: Bharatanatyam Coach` (or shorter `Natyam AI`, up to you)
- Default language: English (India) or English (United States)
- App or game: **App**
- Free or paid: **Free**
- Confirm the declarations checkboxes, then Create app.

## 2. Store listing
Go to **Grow → Store presence → Main store listing** and paste in the content
from `PLAY_STORE_LISTING.md` in this folder (app name, short/full description).

Upload these assets from `store-assets/` in this folder:
- `hi-res-icon.png` → App icon
- `feature-graphic.png` → Feature graphic
- `screenshots/*.jpg` → Phone screenshots (need at least 2 — you've got 5 real on-device ones, including an actual analysis result, which is the strongest one to lead with)

## 3. Privacy policy
Under **App content → Privacy policy**, enter:
```
https://natyam.dance/ai-app/privacy.html
```

## 4. Data safety form
Under **App content → Data safety**, use the answers in the "Data Safety
form" section of `PLAY_STORE_LISTING.md`. The key point: declare
Photos/Videos as collected, shared with Anthropic, for app functionality
only, not sold, not used for ads.

## 5. Content rating
Under **App content → Content rating**, fill out the questionnaire. Given
there's no violence, user-generated content, chat, or ads, this should land
in the lowest rating tier — see notes in `PLAY_STORE_LISTING.md`.

## 6. Target audience
Under **App content → Target audience and content**, you'll be asked if the
app is designed for children. Even though it's *usable* by kids, if it's not
*primarily/exclusively* marketed at under-13s you'd typically select an age
range that includes teens/general audience rather than "Primarily child-
directed" — this changes Play's ad/tracking policies. Worth a quick read of
Google's guidance here since it affects what's required; happy to talk
through it with you.

## 7. Upload the build
Two ways to get the AAB into Play Console:

**Option A — manual (simplest, no extra setup):**
Once the EAS build finishes, download the `.aab` file from the build page
and upload it directly under **Release → Testing → Internal testing**
(recommended for the very first release, before going to Production) →
**Create new release**.

**Option B — automatic via `eas submit` (needs one extra setup step):**
1. In [Google Cloud Console](https://console.cloud.google.com/), on the
   project linked to your Play Console account: **IAM & Admin → Service
   Accounts → Create Service Account**. Give it a name like `eas-submit`.
2. Grant it access in Play Console: **Users and permissions → Invite new
   users** → paste the service account's email → grant **Admin (all
   permissions)** or a custom role with release-management access.
3. Back in Cloud Console, on that service account: **Keys → Add key → Create
   new key → JSON**. This downloads a `.json` file — save it as
   `google-service-account.json` in this project folder (it's already
   gitignored, won't get committed).
4. Tell me once that file exists and I can run
   `eas submit --platform android --profile production` to upload it for you
   directly, going forward.

For the very first release, I'd actually recommend **Option A** (manual) —
it's one click, and Play Console's own review flow for a brand-new app has
some steps (like verifying you're testing with real testers) that are worth
seeing directly in the console anyway.

## 8. Internal testing → Production
Start with an **Internal testing** release (up to 100 testers, no review
wait) so you and any beta testers can install straight from a Play-hosted
link. Once you're happy, promote the same build to **Production**, which
does go through Google's review (typically a few hours to a few days for a
first submission).
