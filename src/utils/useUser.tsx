import { createServerData$, redirect } from "solid-start/server";
import { getUser } from "./dbActions";

export const useUser = () => {
  return createServerData$(async (_, { request }) => {
    const userData = await getUser(request);

    if (!userData) {
      console.log(`UserData failed from useUser.tsx file\n`);
      throw redirect("/");
    }

    return userData;
  });
};
