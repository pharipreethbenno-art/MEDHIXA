# THE STUDY TREE

A modern educational-platform starter for Classes 1–10, multiple boards, textbook navigation, chapter resources and an AI Study Assistant interface.

## Run locally
1. Install Node.js (LTS).
2. Extract this folder.
3. Open a terminal in this folder.
4. Run `npm install`
5. Run `npm run dev`
6. Open the local URL printed by Vite (usually http://localhost:5173).

## Build for hosting
Run `npm run build`. The production files are created in `dist`.

## Important content and AI notes
- This is a working starter application, not a complete database of every board's textbooks. Only clearly identified sample entries are included. Add verified board/class/subject/book/part/chapter data before claiming full coverage.
- Chapter explanations, textbook images, and worked solutions need to be supplied or authored with appropriate permissions. Do not upload copyrighted full books without permission. Link to official publisher/board resources where appropriate.
- The AI Study Assistant screen is present, but it does not generate AI answers yet. Connect it to a secure server endpoint. Never put an AI API key in frontend code or commit it to GitHub.
- Navigation, selectors, chapter selection and search work with the sample content. Empty combinations clearly say content has not been added; they are not fake chapter links.

## Next development stages
1. Add a database and admin-only content editor.
2. Import verified curriculum metadata for each board and class.
3. Add original notes, solutions, worksheets and question banks.
4. Add a backend AI endpoint with rate limits and age-appropriate safeguards.
5. Add authentication only if student profiles and saved progress are needed.
