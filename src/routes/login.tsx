import { onMount, Show } from "solid-js";
import { A, refetchRouteData, useRouteData } from "solid-start";
import { FormError } from "solid-start/data/Form";
import {
  createServerData$,
  createServerAction$,
  redirect,
} from "solid-start/server";
import {
  createUserSession,
  getUser,
  logInDrizzle,
  signUpDrizzle,
} from "~/utils/dbActions";

export function routeData() {
  return createServerData$(async (_, { request }) => {
    if (await getUser(request)) {
      throw redirect("/");
    }

    return {};
  });
}

export default function LoginPage() {
  const data = useRouteData<typeof routeData>();
  const [loggingIn, { Form }] = createServerAction$(async (form: FormData) => {
    const loginType = form.get("loginType") as string;
    const email = form.get("email") as string;

    switch (loginType) {
      case "login": {
        const userData = await logInDrizzle(email);
        if (!userData) {
          throw new FormError(`Failed to get ${email} from Database!`);
        }

        return createUserSession(email);
      }
      case "signup": {
        const query = await signUpDrizzle(email);
        if (!query) {
          throw new FormError(`Failed to signUp ${email}`);
        }
        return createUserSession(email);
      }

      default: {
        throw new FormError(`Login Type ${loginType} invalid`);
      }
    }
  });

  onMount(() => {
    refetchRouteData();
  });
  return (
    <main>
      <Form class="flex flex-col h-screen pt-10 bg-neutral items-center justify-start drop-shadow-2xl">
        <input
          type="text"
          placeholder=" Email"
          name="email"
          class="w-3/4 lg:w-1/4 h-1/6 md:h-14 rounded-md outline outline-2 outline-accent-focus"
        />
        <div class="w-3/4 lg:w-1/2 flex justify-center mt-3">
          <label class="mx-4">
            <input type="radio" name="loginType" value={"login"} /> Login
          </label>
          <label class="mx-4">
            <input type="radio" name="loginType" value={"signup"} /> SignUp
          </label>
        </div>
        <Show when={loggingIn.error}>
          <p role="alert" id="error-message">
            {loggingIn.error.message}
          </p>
        </Show>
        <button class="btn btn-primary btn-sm mt-5" type="submit">
          {data() ? "Submit" : ""}
        </button>
      </Form>
      <button class="btn btn-primary btn-wide">
        <A href="/">Home</A>
      </button>
    </main>
  );
}
