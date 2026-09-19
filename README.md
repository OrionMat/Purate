# Purate

A frontend-only media library inspired by the supplied reference, using React, TypeScript, Vite, Tailwind CSS, and lucide-react.

## Run

```sh
npm install
npm run dev
```

Open Vite's printed local URL. Build with `npm run build`; serve the build with `npm run preview`.

Includes 16 movies, 8 TV shows, and 8 books, working search/filter/sort controls, grid/list views, editable details, and localStorage persistence under `tasteai-library`. Curate collects four- and five-star titles. Explore browses the full collection.

## Demo shortcuts

Purate recommendations use local mood-matching rules and a short loading animation. There is no AI service, backend, account, or API key. Import and mobile utilities are informational. Poster images are remote with original CSS fallback artwork. Browser storage is device-local, and URL updates are cosmetic.

Remote poster artwork belongs to its respective owners and is served from the TMDB image CDN and IMP Awards poster archive.

## Publish on Netlify

Run `npm run build`, then upload the `dist` folder at https://app.netlify.com/drop. The included redirect rule supports direct links and refreshes on library routes. Buy or connect a domain in the project's domain settings.

For automatic deployments, connect the Git repository to Netlify. Build and output settings are supplied in `netlify.toml`.

