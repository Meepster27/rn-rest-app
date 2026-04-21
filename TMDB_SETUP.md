TMDB setup for this project
---------------------------

This project expects the TMDB API key to be available via Expo's config 'extra'.

Local development:
1. Create a `.env` at the project root:
   TMDB_API_KEY=your_api_key_here

2. app.config.js reads `.env` and injects TMDB_API_KEY into Expo's extra.
   Make sure `.env` is in your `.gitignore`.

Usage in code:
- Import helpers from 'src/services/api':
  import { fetchPopularMovies, fetchMovieDetails, getPosterUrl } from './src/services/api';

Security:
- Do NOT commit `.env`. For production, use CI or Expo secrets to inject the key.
