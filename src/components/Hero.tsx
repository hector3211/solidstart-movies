import { Show } from "solid-js";

type HeroProps = {
  // I hate this
  featuredItem: any | undefined;
};

export default function Hero({ featuredItem }: HeroProps) {
  return (
    <div class="relative ">
      <img
        src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${featuredItem?.backdrop_path}`}
        alt={`Poster for movie`}
        class="sm:h-[400px] object-top lg:w-full lg:h-fit"
      />
      <div class=" p-3 bg-transparent backdrop-blur-3xl shadow-lg shadow-indigo-300/30 rounded-lg text-gray-300 ">
        <div class="text-md ml-1">
          <Show when={featuredItem?.title}>
            <h2 class="text-xl lg:text-2xl">{featuredItem?.title}</h2>
          </Show>
          <Show when={featuredItem?.name}>
            <h2 class="text-xl lg:text-2xl">{featuredItem?.name}</h2>
          </Show>
          <Show
            when={featuredItem?.vote_average > 0 || featuredItem?.vote_count}
          >
            <div class="flex items-center py-1">
              <p>⭐{featuredItem?.vote_average?.toFixed(1)}</p>
              <p class="ml-8 text-lg">{featuredItem?.vote_count} Reviews</p>
            </div>
          </Show>
          <Show when={featuredItem?.overview}>
            <p class="text-sm lg:text-lg">{featuredItem?.overview}</p>
          </Show>
        </div>
      </div>
    </div>
  );
}
