import { onMount, Show } from "solid-js";
import { A, refetchRouteData, useRouteData } from "solid-start";
import { Form, FormError } from "solid-start/data/Form";
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

export default function LoginModal() {
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

  return (
    <div class="absolute rounded-md flex justify-center bg-base-300 w-80 h-40 top-10 right-1/2 z-50">
      <label
        for="my-modal-3"
        class="btn btn-sm btn-circle absolute right-2 top-2"
      >
        ✕
      </label>
      <Form class="flex flex-col items-center justify-center drop-shadow-2xl mt-5">
        <input
          type="text"
          placeholder=" Email"
          name="email"
          class=" rounded-md outline outline-2 outline-accent-focus"
        />
        <div class="w-full flex justify-between mt-3">
          <label>
            <input type="radio" name="loginType" value={"login"} /> Login
          </label>
          <label>
            <input type="radio" name="loginType" value={"signup"} /> SignUp
          </label>
        </div>
        <Show when={loggingIn.error}>
          <p role="alert" id="error-message">
            {loggingIn.error.message}
          </p>
        </Show>
        <button class="btn btn-primary btn-sm w-full mt-3" type="submit">
          Submit
        </button>
      </Form>
    </div>
  );
}
