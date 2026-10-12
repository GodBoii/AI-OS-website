# Aetheria black-theme redesign

Implemented on `codex/black-star-experience`.

## Experience

The homepage uses a black background, Outfit display type, Instrument Serif accents, and a pale green action color. The four-point logo is reconstructed as an interactive metal sculpture with a surrounding ring. It supports pointer tilt, mouse dragging, and a keyboard-accessible rotation button.

Application screenshots and recordings are replaced by code-native marketing illustrations. Expanding panels describe conversation, code, computer tasks, and connected tools. Their interfaces are labelled as illustrations.

The playground contains three browser examples:

- Build a page produces a self-contained HTML document with responsive styles.
- Make a brief groups six sample updates into completed work, decisions, and next steps.
- Clean a sheet normalizes six sample contacts and removes duplicate email addresses.

Visitors can pause, resume, cancel, switch tasks, inspect source, and download the result. The site explicitly describes these as illustrative workflows with sample data. They do not call a live agent backend.

ChatGPT, Claude, and Gemini have selectable descriptions with links to their documented capabilities. The comparison explains approaches; it does not claim benchmark results or invent missing competitor features.

The wayfinder offers a contextual tour and reacts to example selection, execution, cancellation, and completion. It offers one inactivity suggestion per page session, suppresses hints while typing, and remembers explicit dismissal in session storage. Voice uses the browser's speech synthesis only after the visitor enables it. It does not use a microphone.

## Motion and fallbacks

The wayfinder is available across shared pages, with contextual explanations for downloads, pricing, integrations, account forms, and policy pages. Page changes close its panel and stop voice playback.

GSAP connects the manifesto text and workspace entrance to native scrolling. The tool strip is pausable. Reduced-motion preferences disable decorative movement while preserving the workflow controls and output.

The 3D scene renders on demand and pauses offscreen or in a hidden tab. A vector mark remains available before loading, when WebGL is unavailable, and after context loss.

The same palette carries into downloads, pricing, integration pages, and account screens. Existing authentication, API behavior, plan values, and installer destinations remain in place.

A new 1200 × 630 social image uses the rendered marketing hero. Default metadata points to it, and canonical URLs omit query strings and section fragments.

## Local review

The production review server uses `http://localhost:3012`.

To create an isolated review build in PowerShell:

```powershell
$env:AETHERIA_REVIEW = '1'
npm.cmd run build
node node_modules/next/dist/bin/next start -p 3012
```

This writes to the ignored `.next-review` directory. Ordinary development continues to use `.next`, so a development server cannot overwrite the production review build.

## Verification

Production builds and TypeScript checks pass.

Browser checks cover:

- Homepage layouts at 320, 390, 768, 1024, 1440, and 1920 pixels.
- Visible 3D rendering and the rotation control.
- Mouse dragging, context-loss fallback and restoration, and operation with WebGL disabled.
- Pause, resume, cancellation, and switching examples during playback.
- All three downloaded files, including CSV deduplication and document contents.
- Workspace and competitor selection.
- Guide reactions, tour navigation, dismissal, and Escape focus return.
- Shared-page guidance, cross-page navigation, an actual inactivity hint, and dismissal after reloading.
- Mobile navigation and keyboard-operated questions.
- The tool-strip pause control and reduced-motion mode.
- Pricing, downloads, integrations, login, signup, contact, privacy, and terms at 320 and 1440 pixels.
- No horizontal document overflow, browser exceptions, or failing local requests during the interaction suite.
- Text contrast on the homepage, pricing, downloads, contact, and login.
- The social image response and canonical URL after section navigation.

Authenticated account operations, payments, and remote installer downloads were not exercised. Audible speech depends on the browser and installed voices and requires manual listening. Field performance data is not yet available.

The repository's pre-existing edits to `components/ForYouSection.tsx` and `styles/studio.css` were preserved and excluded from redesign commits. Existing untracked business documents and data files were also excluded.
