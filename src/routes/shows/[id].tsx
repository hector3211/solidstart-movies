import { For, Show } from "solid-js";
import { createRouteData, RouteDataArgs, useRouteData } from "solid-start";
import ActorCaoursel from "~/components/ActorCaousel";
import { getActorsForShows, getSelectedShow } from "~/utils/actions";

export function routeData({ params }: RouteDataArgs) {
  const show = createRouteData(async () => {
    try {
      return await getSelectedShow(Number(params.id));
    } catch (error) {
      throw new Error(`Failed to gather Data from Api error: ${error}`);
    }
  });
  const actors = createRouteData(async () => {
    try {
      return await getActorsForShows(Number(params.id));
    } catch (error) {
      throw new Error(`Failed to gather Data from Api error: ${error}`);
    }
  });
  return { show, actors };
}

export default function Shows() {
  const { show, actors } = useRouteData<typeof routeData>();

  return (
    <main class="flex flex-col">
      <div class="sm:hidden lg:text-white lg:block lg:w-1/3 lg:bg-transparent lg:backdrop-blur-2xl lg:text-3xl lg:absolute lg:top-[18%] lg:left-5 lg:outline lg:outline-2 lg:outline-offset-2 lg:outline-primary lg:rounded-md lg:p-3 lg:h-52">
        <p>{show()?.original_name}</p>
        <p>{show()?.vote_average}</p>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${
          show()?.backdrop_path
        }`}
        alt={`Poster for movie`}
        class="sm:h-[400px] lg:h-[500px] object-left object-cover w-screen"
      />
      <div class="flex bg-neutral lg:pb-5 lg:items-center ">
        <img
          src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${
            show()?.poster_path
          }`}
          alt={` poster for movie ${show()?.original_name}`}
          class="sm:hidden lg:block lg:ml-5 lg:rounded-md lg:outline lg:outline-2 lg:outline-offset-2 lg:outline-primary w-80 object-cover object-top transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-400 hover:cursor-pointer"
        />
        <div class="lg:ml-10 lg:mt-5 sm:p-8 lg:text-2xl text-lg flex justify-start w-full lg:w-1/3">
          <div class="flex flex-col">
            <p class="">Title</p>
            <p class="">Rating</p>
            <p class="">Seasons</p>
            <p class="">Episodes</p>
            <p class="">Genre</p>
            <p class="">Released</p>
            <p class="">language</p>
          </div>
          <div class="flex flex-col ml-8 w-3/4">
            <p>{show()?.name}</p>
            <p>{show()?.vote_average.toFixed(1)}</p>
            <p>{show()?.number_of_seasons}</p>
            <p>{show()?.number_of_episodes}</p>
            <div class="flex">
              <For each={show()?.genres}>
                {(genre) => <p class="px-1">{genre.name}</p>}
              </For>
            </div>
            <p>{show()?.first_air_date}</p>
            <p>{show()?.original_language}</p>
          </div>
        </div>
      </div>
      <div class="mb-5">
        <Show when={actors()?.cast}>
          <ActorCaoursel actors={actors()?.cast} type={"shows"} />
        </Show>
      </div>
    </main>
  );
}
