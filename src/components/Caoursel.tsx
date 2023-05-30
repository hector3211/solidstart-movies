import { A } from "@solidjs/router";
import { For } from "solid-js";

type CaourselProps = {
  movies: Movie[] | undefined;
  type: VideoType;
};

export default function Caoursel({ movies, type }: CaourselProps) {
  return (
    <div class="flex overflow-x-auto scroll-smooth max-w-full p-4 space-x-2 bg-neutral rounded-box">
      <For each={movies}>
        {(movie, index) => (
          <A href={`./${type}/${movie.id}`} class="min-w-[150px]">
            <img
              src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie.poster_path}`}
              alt={` poster for movie ${index}`}
              class="h-44 w-44 md:h-52 md:w-64  object-cover object-top rounded-md transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-400 hover:cursor-pointer"
            />
          </A>
        )}
      </For>
    </div>
  );
}
