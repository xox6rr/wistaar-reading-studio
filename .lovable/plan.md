

## Problem

The edge function logs show the exact error:

```
Failed to parse AI response: ```json\n[\n  {\n    "chapter_number": 1, ...
```

The AI **is** extracting chapters successfully, but the response is getting **truncated** — the JSON is cut off mid-way, so `JSON.parse()` fails. This happens because:

1. **Large PDFs produce huge JSON** — the full content of every chapter serialized as JSON can exceed the `max_tokens: 100000` limit or hit the model's output cap.
2. **Scanned/image PDFs** — some PDFs contain images instead of text, so the AI gets limited/garbled content via the base64 image approach.

## Fix: Two-pass extraction approach

### Step 1 — Extract chapter structure first (titles + boundaries only)

Change the AI prompt to a **lightweight first pass** that returns only chapter titles and page ranges — no content. This keeps the response small and parseable.

### Step 2 — Extract content per chapter in separate calls

For each chapter, make a focused AI call asking for just that chapter's text. This avoids hitting token limits.

### Step 3 — Better JSON parsing with truncation recovery

Add fallback parsing: if the JSON is truncated, attempt to repair it by closing open strings/arrays/objects. Also add a `finish_reason` check — if the model returns `length` instead of `stop`, we know it was truncated and can retry with smaller scope.

### Step 4 — Handle scanned PDFs

Add a fallback: if the PDF produces poor results via the current approach, use native text extraction first (the Lovable AI stack overflow pattern), and only fall back to vision-based OCR if native extraction yields insufficient text.

## Files to change

- `supabase/functions/extract-chapters/index.ts` — rewrite to use two-pass extraction with per-chapter calls and truncation handling

## What this fixes

- PDFs with many chapters that exceed token limits
- Scanned PDFs that produce garbled or empty text
- The specific `Failed to parse AI response` error you're seeing repeatedly

