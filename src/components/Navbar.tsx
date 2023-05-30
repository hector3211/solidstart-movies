import { BsThreeDots } from "solid-icons/bs";
import { A } from "@solidjs/router";
import { createEffect, onMount, Show } from "solid-js";
import { getUser, getUserId, logoutUser } from "~/utils/dbActions";
import { createServerAction$ } from "solid-start/server";

export default function Nav() {
  const [, logout] = createServerAction$(async (_, { request }) => {
    return await logoutUser(request);
  });

  const [userInfo, getUserInfo] = createServerAction$(
    async (_, { request }) => await getUserId(request)
  );

  createEffect(() => {
    getUserInfo();
  });

  onMount(() => {
    getUserInfo();
  });

  return (
    <div class="navbar  flex justify-between items-center px-10">
      <div class="flex-1">
        <A class="btn btn-ghost normal-case text-2xl lg:text-3xl" href="/">
          Movies
        </A>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <label tabIndex={0} class="btn btn-ghost m-1 text-2xl lg:text-3xl">
            <BsThreeDots />
          </label>
          <ul
            tabIndex={0}
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-5 "
          >
            <li>
              <A href="/" inactiveClass="inactive-link">
                Home
              </A>
            </li>
            <li>
              <Show
                when={userInfo.result}
                fallback={<A href="/login">LogIn / SignUp</A>}
              >
                <button
                  class="btn-ghost"
                  type="submit"
                  name="logout"
                  onclick={() => logout()}
                >
                  Logout
                </button>
              </Show>
            </li>
            <Show when={userInfo.result}>
              <li>
                <A href={`/user/${userInfo.result}/`}>{userInfo.result}</A>
              </li>
            </Show>
          </ul>
        </div>
      </div>
    </div>
  );
}
