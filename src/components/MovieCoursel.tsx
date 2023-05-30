import { For, Show } from "solid-js";
import { useNavigate } from "solid-start";

type CaourselProps = {
  movies: PastMovie[] | undefined;
  type: VideoType;
};

export default function MovieCaoursel({ movies, type }: CaourselProps) {
  const navigate = useNavigate();
  return (
    <div class="flex overflow-x-auto scroll-smooth p-4 space-x-2 bg-neutral rounded-box">
      <For each={movies}>
        {(movie) => (
          <Show
            when={movie.poster_path && movie.original_title}
            fallback={<p>Loading...</p>}
          >
            <div
              class="min-w-max"
              typeof="button"
              onclick={() => navigate(`/${type}/${movie.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie.poster_path}`}
                alt={` poster for movie ${movie.original_title}`}
                class="w-40 object-cover object-top rounded-md transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-400 hover:cursor-pointer"
              />
            </div>
          </Show>
        )}
      </For>
    </div>
  );
}
