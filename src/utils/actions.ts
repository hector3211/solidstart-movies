import { tmdbKey, TMDB_API_URL } from "./contants";

export async function getPopularMovies() {
  const res = await fetch(
    `${TMDB_API_URL}/movie/popular?api_key=${tmdbKey}&language=en-US&page=1`
  );
  if (!res.ok) {
    throw new Error("Failed to get movies");
  }
  const data: MovieResponse = await res.json();
  const popularResult = data.results;
  return popularResult;
}

export async function getPopularTvShows() {
  const res = await fetch(
    `${TMDB_API_URL}/tv/popular?api_key=${tmdbKey}&language=en-US&page=1`
  );
  if (!res.ok) {
    throw new Error("Failed to get movies");
  }
  const data: MovieResponse = await res.json();
  const popularResult = data.results;
  return popularResult;
}

export async function getTrendingMovies() {
  const res = await fetch(
    `${TMDB_API_URL}/trending/movie/day?api_key=${tmdbKey}&language=en-US`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch Trending movies!!!");
  }

  const data: MovieResponse = await res.json();
  const trendingResults = data.results;
  return trendingResults;
}

export async function getTrendingTvShows() {
  const res = await fetch(
    `${TMDB_API_URL}/trending/tv/day?api_key=${tmdbKey}&language=en-US`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch Trending movies!!!");
  }

  const data: MovieResponse = await res.json();
  const trendingResults = data.results;
  return trendingResults;
}
export async function getSelectedShow(itemId: number) {
  const res = await fetch(`
    ${TMDB_API_URL}/tv/${itemId}?api_key=${tmdbKey}&language=en-US
`);
  const data: TVShow = await res.json();
  return data;
}
export async function getActorsForShows(movieId: number) {
  const res = await fetch(
    `${TMDB_API_URL}/tv/${movieId}/credits?api_key=${tmdbKey}&language=en-US`
  );
  const data: Cast = await res.json();
  return data;
}

export async function getSelectedMovie(itemId: number) {
  const res = await fetch(`
    ${TMDB_API_URL}/movie/${itemId}?api_key=${tmdbKey}&language=en-US
`);
  const data: Movie = await res.json();
  return data;
}

export async function getActorsForMovies(movieId: number) {
  const res = await fetch(
    `${TMDB_API_URL}/movie/${movieId}/credits?api_key=${tmdbKey}&language=en-US`
  );
  const data: Cast = await res.json();
  return data;
}

export async function getActorInfo(actorId: number) {
  const res = await fetch(
    `${TMDB_API_URL}/person/${actorId}?api_key=${tmdbKey}&language=en-US`
  );
  if (!res.ok) {
    console.log("Failed fetching actors info from api!");
    return;
  }
  const data: Actor = await res.json();
  return data;
}

export async function getActorsPastMovies(actorId: number) {
  const res = await fetch(
    `${TMDB_API_URL}/person/${actorId}/combined_credits?api_key=${tmdbKey}&language=en-US`
  );
  if (!res.ok) {
    console.log("Failed fetching actors past movies! from api!");
    return;
  }
  const data: People = await res.json();
  return data;
}
