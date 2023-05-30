import { onMount, Show } from "solid-js";
import {
  createRouteData,
  refetchRouteData,
  RouteDataArgs,
  useParams,
  useRouteData,
} from "solid-start";
import MovieCaoursel from "~/components/MovieCoursel";
import {
  getActorInfo,
  getActorsPastMovies,
  getSelectedMovie,
  getSelectedShow,
} from "~/utils/actions";

export function routeData({ params }: RouteDataArgs) {
  const pastMovies = createRouteData(async () => {
    try {
      const pastMovies: People | undefined = await getActorsPastMovies(
        Number(params.id)
      );
      if (!pastMovies) {
        return;
      }
      return pastMovies;
    } catch (error) {
      throw new Error(`Failed to gather Data from Api error: ${error}`);
    }
  });

  const actorInfo = createRouteData(async () => {
    try {
      const actorInfo: Actor | undefined = await getActorInfo(
        Number(params.id)
      );
      if (!actorInfo) {
        return;
      }
      return actorInfo;
    } catch (error) {
      throw new Error(`Failed to gather Data from Api error: ${error}`);
    }
  });

  return {
    pastMovies,
    actorInfo,
  };
}

export default function ActorPage() {
  const { pastMovies, actorInfo } = useRouteData<typeof routeData>();
  const params = useParams();
  const contentType = params.type as VideoType;

  return (
    <main class="flex flex-col mt-4">
      <Show when={pastMovies() && actorInfo()} fallback={<p>Loading...</p>}>
        <div class=" flex justify-around">
          <img
            src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${
              actorInfo()?.profile_path
            }`}
            alt={` poster for star ${actorInfo()?.name}`}
            class="md:h-fit rounded-md outline outline-2 outline-offset-2 outline-primary w-80 object-cover object-top"
          />
          <div class="flex justify-between items-center">
            <div>
              <p>Name:</p>
              <p>Birthday:</p>
              <p>Place Of Birth:</p>
            </div>
            <div>
              <p>{actorInfo()?.name}</p>
              <p>{actorInfo()?.birthday}</p>
              <p>{actorInfo()?.place_of_birth}</p>
            </div>
          </div>
        </div>
        <div class=" mt-4">
          <MovieCaoursel movies={pastMovies()?.cast} type={contentType} />
        </div>
      </Show>
    </main>
  );
}
