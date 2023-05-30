import { Show } from "solid-js";
import { createRouteData, useRouteData } from "solid-start";
import Caoursel from "~/components/Caoursel";
import Hero from "~/components/Hero";
import {
  getPopularMovies,
  getPopularTvShows,
  getTrendingMovies,
  getTrendingTvShows,
} from "~/utils/actions";

export function routeData() {
  const apiData = createRouteData(async () => {
    try {
      const popularMovies = await getPopularMovies();
      const popularTvShows = await getPopularTvShows();
      const trendingMovies = await getTrendingMovies();
      const treandingTvShows = await getTrendingTvShows();
      let featurd;

      if (trendingMovies && treandingTvShows) {
        const items = [...trendingMovies, ...treandingTvShows];
        const randomPick = items[Math.floor(Math.random() * items.length)];
        featurd = randomPick;
      }

      return {
        popularMovies,
        popularTvShows,
        trendingMovies,
        treandingTvShows,
        featurd,
      };
    } catch (error) {
      throw new Error(`Failed to gather Data from Api error: ${error}`);
    }
  });

  return {
    apiData,
  };
}

export default function Home() {
  const { apiData } = useRouteData<typeof routeData>();

  return (
    <main>
      <Show when={apiData()}>
        <Hero featuredItem={apiData()?.featurd} />
        <div class="mt-10 ml-8">
          <h1>Popular Movies</h1>
          <Caoursel movies={apiData()?.popularMovies} type={"movies"} />
          <h1>Trending Tv Shows</h1>
          <Caoursel movies={apiData()?.treandingTvShows} type={"shows"} />
          <h1>Trending Movies</h1>
          <Caoursel movies={apiData()?.trendingMovies} type={"movies"} />
          <h1>Popular Tv Shows</h1>
          <Caoursel movies={apiData()?.popularTvShows} type={"shows"} />
        </div>
      </Show>
    </main>
  );
}
