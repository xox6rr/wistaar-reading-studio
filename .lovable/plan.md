
# Daily Fresh Reading Content

## What This Does
Instead of showing the same static paragraphs every time you read a chapter, the reading page will display different content every day. Each day brings a unique set of paragraphs, and the content cycles through a large pool without repeating for a long time.

## How It Works
- A large collection of 60+ unique literary paragraphs will be stored in the app, organized into sets
- Each day, the app uses the current date as a "seed" to pick a unique combination of paragraphs for each chapter
- The same day always shows the same content (so refreshing the page won't change it mid-day)
- Different chapters on the same day still show different content from each other
- The content won't repeat for many weeks thanks to the large paragraph pool and date-based rotation

## Technical Details

### 1. Create a content pool file (`src/data/dailyContent.ts`)
- Store 60-70 diverse, high-quality literary paragraphs grouped into thematic sets (morning, journey, discovery, reflection, etc.)
- Export a function `getDailyContent(chapterTitle, bookTitle, chapterNumber)` that:
  - Uses today's date (day of year) as a seed number
  - Combines the seed with the chapter number and book ID to create a unique offset
  - Uses a simple deterministic shuffle (seeded pseudo-random) to select 8-12 paragraphs from the pool
  - Ensures no two chapters on the same day get the same paragraphs

### 2. Update `src/pages/Read.tsx`
- Replace the inline `generateChapterContent` function with an import of `getDailyContent` from the new file
- Pass the book ID and chapter number to ensure uniqueness per chapter
- The footer will show "Page X of Y" and estimated reading time based on the selected content (similar to the screenshot reference)

### 3. Deterministic daily seed algorithm
```text
seed = dayOfYear + (year * 365)
offset = seed + chapterNumber + hash(bookId)
shuffled = seededShuffle(allParagraphs, offset)
selectedParagraphs = shuffled.slice(0, 10)
```

This ensures:
- Same content all day for a given chapter
- Different content tomorrow
- Different content per chapter
- Repeats only after cycling through all combinations (many weeks)
