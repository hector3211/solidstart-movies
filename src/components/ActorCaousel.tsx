import { For, Show } from "solid-js";
import { A, Navigate, useNavigate } from "solid-start";

type ActorCaourselProps = {
  actors: CastObject[] | undefined;
  type: VideoType;
};

export default function ActorCaoursel({ actors, type }: ActorCaourselProps) {
  const navigate = useNavigate();
  return (
    <div class=" flex overflow-x-auto scroll-smooth max-w-full p-4 space-x-2 bg-neutral ">
      <For each={actors}>
        {(actor) => (
          <Show when={actor?.profile_path && actor.id}>
            <div
              class="min-w-max"
              typeof="button"
              onclick={() => navigate(`/actor/${actor?.id}/${type}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${actor?.profile_path}`}
                alt={` poster for movie ${actor?.name}`}
                class="w-40 object-cover object-top rounded-md transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-400 hover:cursor-pointer"
              />
              <p class="text-center">{actor?.name}</p>
            </div>
          </Show>
        )}
      </For>
    </div>
  );
}
