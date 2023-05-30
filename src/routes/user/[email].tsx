import { For, Show } from "solid-js";
import { RouteDataArgs, useParams, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { logInDrizzle } from "~/utils/dbActions";

export function routeData({ params }: RouteDataArgs) {
  return createServerData$(
    async ([email]) => {
      const query = await logInDrizzle(email.toString());
      if (!query) {
        return {};
      }
      console.log(`${query}`);
      const data: User = query[0];
      return data;
    },
    { key: () => [params.email] }
  );
}

export default function UserProfile() {
  const userData = useRouteData<typeof routeData>();
  return (
    <div>
      <Show when={userData()} fallback={<p>No User Info</p>}>
        <p>{userData()?.id}</p>
        <p>{userData()?.email}</p>
        <For each={userData()?.likedMovies}>
          {(movie) => <p>{movie.name}</p>}
        </For>
        <div class="flex">
          <p>Member since</p>
          <p>{userData()?.createdAt?.toLocaleString()}</p>
        </div>
      </Show>
    </div>
  );
}
