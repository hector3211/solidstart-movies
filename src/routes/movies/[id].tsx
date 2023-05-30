import { For, Show } from "solid-js";
import { createRouteData, RouteDataArgs, useRouteData } from "solid-start";
import ActorCaoursel from "~/components/ActorCaousel";
import { getActorsForMovies, getSelectedMovie } from "~/utils/actions";

export function routeData({ params }: RouteDataArgs) {
  const movie = createRouteData(async () => {
    try {
      return await getSelectedMovie(Number(params.id));
    } catch (error) {
      throw new Error(`Failed to gather Data from Api error: ${error}`);
    }
  });
  const actors = createRouteData(async () => {
    try {
      return await getActorsForMovies(Number(params.id));
    } catch (error) {
      throw new Error(`Failed to gather Data from Api error: ${error}`);
    }
  });
  return { movie, actors };
}

export default function Movie() {
  const { movie, actors } = useRouteData<typeof routeData>();

  return (
    <main class="flex flex-col">
      <div class="sm:hidden lg:text-white lg:block lg:w-1/3 lg:h-max lg:bg-neutral lg:text-xl lg:absolute lg:top-[18%] lg:left-5 lg:outline lg:outline-2 lg:outline-offset-2 lg:outline-primary lg:rounded-md lg:p-3">
        <p class="underline underline-offset-2">{movie()?.title}</p>
        <p>{movie()?.overview}</p>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${
          movie()?.backdrop_path
        }`}
        alt={`Poster for movie`}
        class="sm:h-[400px] lg:h-[500px] object-left object-cover w-screen"
      />
      <div class="flex justify-center items-center bg-neutral py-3 lg:py-5">
        <img
          src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${
            movie()?.poster_path
          }`}
          alt={` poster for movie ${movie()?.title}`}
          class="sm:hidden lg:block lg:ml-5 lg:rounded-md lg:outline lg:outline-2 lg:outline-offset-2 lg:outline-primary w-80 object-cover object-top transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-400 hover:cursor-pointer"
        />
        <div class="lg:ml-10 lg:mt-5 sm:p-8 lg:text-2xl text-lg flex justify-start items-center w-full">
          <div class="flex flex-col">
            <p class="">Title</p>
            <p class="">Rating</p>
            <p class="">Budget</p>
            <p class="">Genre</p>
            <p class="">Released</p>
            <p class="">language</p>
          </div>
          <div class="flex flex-col ml-8">
            <p>{movie()?.title}</p>
            <p>{movie()?.vote_average.toFixed(1)}</p>
            <p>
              {movie()?.budget.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <div class="flex">
              <For each={movie()?.genres}>
                {(genre) => <p class="px-0.5">{genre.name}</p>}
              </For>
            </div>
            <p>{movie()?.release_date}</p>
            <p>{movie()?.original_language}</p>
          </div>
        </div>
      </div>
      <div class="mb-5">
        <Show when={actors()?.cast}>
          <ActorCaoursel actors={actors()?.cast} type={"movies"} />
        </Show>
      </div>
    </main>
  );
}
