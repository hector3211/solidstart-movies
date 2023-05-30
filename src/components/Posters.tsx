import { Show } from "solid-js";

type PosterProps = {
  path: string | undefined | null;
};

export default function Poster({ path }: PosterProps) {
  return (
    <Show when={path} fallback={<p>Loading...</p>}>
      <img
        src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${path}`}
        alt={` poster for movie`}
        class="h-60 w-48 object-fill rounded-md hover:scale-105 hover:z-50"
      />
    </Show>
  );
}
